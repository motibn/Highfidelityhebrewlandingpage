import type { HiTechJob } from '../../app/hi-tech/jobs-data';
import { SEED_HI_TECH_JOBS } from '../../app/hi-tech/jobs-data';
import { getSupabase, isSupabaseConfigured } from './client';
import type { DbHiTechJob, JobInsert, JobStatus, JobUpdate } from './types';

export function dbJobToHiTechJob(row: DbHiTechJob): HiTechJob {
  return {
    id: row.slug,
    title: row.title,
    company: row.company,
    domain: row.domain,
    domainLabel: row.domain_label,
    level: row.level,
    location: row.location,
    note: row.note ?? undefined,
    applyUrl: row.apply_url ?? undefined,
  };
}

export async function fetchPublishedJobs(): Promise<HiTechJob[]> {
  const supabase = getSupabase();
  if (!supabase) return SEED_HI_TECH_JOBS;

  const { data, error } = await supabase
    .from('hi_tech_jobs')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true });

  if (error || !data?.length) {
    console.warn('[jobs] Supabase fetch failed, using seed fallback', error?.message);
    return SEED_HI_TECH_JOBS;
  }

  return data.map(dbJobToHiTechJob);
}

export async function fetchAllJobsAdmin(): Promise<DbHiTechJob[]> {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase לא מוגדר');

  const { data, error } = await supabase
    .from('hi_tech_jobs')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function fetchJobById(id: string): Promise<DbHiTechJob | null> {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase לא מוגדר');

  const { data, error } = await supabase.from('hi_tech_jobs').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function createJob(
  job: JobInsert,
  userId: string,
): Promise<DbHiTechJob> {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase לא מוגדר');

  const payload = {
    ...job,
    updated_by: userId,
    published_at: job.status === 'published' ? new Date().toISOString() : null,
  };

  const { data, error } = await supabase.from('hi_tech_jobs').insert(payload).select().single();
  if (error) throw error;

  await logAudit(data.id, data.slug, 'create', { job: payload }, userId);
  return data;
}

export async function updateJob(
  id: string,
  updates: JobUpdate,
  userId: string,
  existing?: DbHiTechJob,
): Promise<DbHiTechJob> {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase לא מוגדר');

  const payload: JobUpdate = {
    ...updates,
    updated_by: userId,
  };

  if (updates.status === 'published' && existing?.status !== 'published') {
    payload.published_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('hi_tech_jobs')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  await logAudit(data.id, data.slug, 'update', { updates: payload }, userId);
  return data;
}

export async function deleteJob(id: string, slug: string, userId: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase לא מוגדר');

  const { error } = await supabase.from('hi_tech_jobs').delete().eq('id', id);
  if (error) throw error;

  await logAudit(id, slug, 'delete', null, userId);
}

export async function setJobStatus(
  job: DbHiTechJob,
  status: JobStatus,
  userId: string,
): Promise<DbHiTechJob> {
  return updateJob(job.id, { status }, userId, job);
}

export async function incrementJobClick(slug: string, channel: 'comeet' | 'whatsapp'): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const supabase = getSupabase();
  if (!supabase) return;

  const rpcChannel = channel === 'comeet' ? 'comeet' : 'whatsapp';
  await supabase.rpc('increment_job_clicks', { job_slug: slug, channel: rpcChannel });
}

export async function fetchAuditLog(limit = 50) {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('job_audit_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

async function logAudit(
  jobId: string,
  jobSlug: string,
  action: string,
  changes: Record<string, unknown> | null,
  userId: string,
): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  await supabase.from('job_audit_log').insert({
    job_id: jobId,
    job_slug: jobSlug,
    action,
    changes,
    user_id: userId,
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u0590-\u05FF\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}
