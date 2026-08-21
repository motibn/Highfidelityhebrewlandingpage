-- Hi-tech jobs admin dashboard schema
-- Run in Supabase SQL Editor or via supabase db push

CREATE TYPE job_status AS ENUM ('draft', 'published', 'archived');

CREATE TABLE IF NOT EXISTS hi_tech_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  company text NOT NULL,
  domain text NOT NULL,
  domain_label text NOT NULL,
  level text CHECK (level IN ('junior', 'senior') OR level IS NULL),
  location text NOT NULL,
  note text,
  apply_url text,
  status job_status NOT NULL DEFAULT 'draft',
  sort_order int NOT NULL DEFAULT 0,
  apply_clicks int NOT NULL DEFAULT 0,
  whatsapp_clicks int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz,
  updated_by uuid REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS user_roles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'coordinator' CHECK (role = 'coordinator')
);

CREATE TABLE IF NOT EXISTS job_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES hi_tech_jobs(id) ON DELETE SET NULL,
  job_slug text,
  action text NOT NULL,
  changes jsonb,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_hi_tech_jobs_status ON hi_tech_jobs(status);
CREATE INDEX IF NOT EXISTS idx_hi_tech_jobs_sort ON hi_tech_jobs(sort_order);
CREATE INDEX IF NOT EXISTS idx_job_audit_log_job_id ON job_audit_log(job_id);

CREATE OR REPLACE FUNCTION set_hi_tech_jobs_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS hi_tech_jobs_updated_at ON hi_tech_jobs;
CREATE TRIGGER hi_tech_jobs_updated_at
  BEFORE UPDATE ON hi_tech_jobs
  FOR EACH ROW EXECUTE FUNCTION set_hi_tech_jobs_updated_at();

CREATE OR REPLACE FUNCTION is_coordinator()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'coordinator'
  );
$$;

CREATE OR REPLACE FUNCTION increment_job_clicks(job_slug text, channel text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF channel = 'comeet' THEN
    UPDATE hi_tech_jobs
    SET apply_clicks = apply_clicks + 1
    WHERE slug = job_slug AND status = 'published';
  ELSIF channel = 'whatsapp' THEN
    UPDATE hi_tech_jobs
    SET whatsapp_clicks = whatsapp_clicks + 1
    WHERE slug = job_slug AND status = 'published';
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION increment_job_clicks(text, text) TO anon, authenticated;

ALTER TABLE hi_tech_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_audit_log ENABLE ROW LEVEL SECURITY;

-- Public: published jobs only
CREATE POLICY hi_tech_jobs_public_select ON hi_tech_jobs
  FOR SELECT USING (status = 'published');

-- Coordinators: full access
CREATE POLICY hi_tech_jobs_coordinator_select ON hi_tech_jobs
  FOR SELECT USING (is_coordinator());

CREATE POLICY hi_tech_jobs_coordinator_insert ON hi_tech_jobs
  FOR INSERT WITH CHECK (is_coordinator());

CREATE POLICY hi_tech_jobs_coordinator_update ON hi_tech_jobs
  FOR UPDATE USING (is_coordinator());

CREATE POLICY hi_tech_jobs_coordinator_delete ON hi_tech_jobs
  FOR DELETE USING (is_coordinator());

CREATE POLICY user_roles_read_own ON user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY job_audit_log_coordinator_select ON job_audit_log
  FOR SELECT USING (is_coordinator());

CREATE POLICY job_audit_log_coordinator_insert ON job_audit_log
  FOR INSERT WITH CHECK (is_coordinator());
