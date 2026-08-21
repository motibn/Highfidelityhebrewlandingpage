import type { JobStatus } from '../../lib/supabase/types';

const styles: Record<JobStatus, { bg: string; color: string; label: string }> = {
  draft: { bg: 'rgba(52,88,66,0.1)', color: '#345842', label: 'טיוטה' },
  published: { bg: 'rgba(150,186,139,0.25)', color: '#345842', label: 'פורסם' },
  archived: { bg: 'rgba(74,94,80,0.12)', color: '#4A5E50', label: 'בארכיון' },
};

export function JobStatusBadge({ status }: { status: JobStatus }) {
  const s = styles[status];
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 12,
        fontWeight: 700,
        padding: '4px 10px',
        borderRadius: 999,
        background: s.bg,
        color: s.color,
      }}
    >
      {s.label}
    </span>
  );
}
