import type { JobDomain, JobLevel } from '../../app/hi-tech/jobs-data';

export type JobStatus = 'draft' | 'published' | 'archived';

export interface DbHiTechJob {
  id: string;
  slug: string;
  title: string;
  company: string;
  domain: JobDomain;
  domain_label: string;
  level: JobLevel | null;
  location: string;
  note: string | null;
  apply_url: string | null;
  status: JobStatus;
  sort_order: number;
  apply_clicks: number;
  whatsapp_clicks: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  updated_by: string | null;
}

export interface DbJobAuditLog {
  id: string;
  job_id: string | null;
  job_slug: string | null;
  action: string;
  changes: Record<string, unknown> | null;
  user_id: string | null;
  created_at: string;
}

export type JobInsert = Omit<
  DbHiTechJob,
  | 'id'
  | 'apply_clicks'
  | 'whatsapp_clicks'
  | 'created_at'
  | 'updated_at'
  | 'published_at'
  | 'updated_by'
> & {
  id?: string;
  apply_clicks?: number;
  whatsapp_clicks?: number;
  published_at?: string | null;
  updated_by?: string | null;
};

export type JobUpdate = Partial<
  Omit<DbHiTechJob, 'id' | 'created_at' | 'apply_clicks' | 'whatsapp_clicks'>
>;

export interface Database {
  public: {
    Tables: {
      hi_tech_jobs: {
        Row: DbHiTechJob;
        Insert: JobInsert;
        Update: JobUpdate;
      };
      user_roles: {
        Row: { user_id: string; role: string };
        Insert: { user_id: string; role?: string };
        Update: { role?: string };
      };
      job_audit_log: {
        Row: DbJobAuditLog;
        Insert: Omit<DbJobAuditLog, 'id' | 'created_at'> & { id?: string };
        Update: Partial<DbJobAuditLog>;
      };
    };
    Functions: {
      increment_job_clicks: {
        Args: { job_slug: string; channel: string };
        Returns: void;
      };
      is_coordinator: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
  };
}
