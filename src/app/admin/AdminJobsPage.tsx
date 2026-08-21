import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Plus, RefreshCw } from 'lucide-react';
import { fetchAllJobsAdmin, setJobStatus, deleteJob, fetchAuditLog } from '../../lib/supabase/jobs';
import type { DbHiTechJob, DbJobAuditLog, JobStatus } from '../../lib/supabase/types';
import { useAdminAuth } from './AdminAuthProvider';
import { JobStatusBadge } from './components/JobStatusBadge';
import { HT } from '../hi-tech/tokens';
import { setPageSEO } from '../utils/seo';
import { JOB_DOMAIN_LABELS } from '../hi-tech/jobs-data';

export function AdminJobsPage() {
  const { user } = useAdminAuth();
  const [jobs, setJobs] = useState<DbHiTechJob[]>([]);
  const [audit, setAudit] = useState<DbJobAuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'all'>('all');

  useEffect(() => {
    setPageSEO({
      title: 'ניהול משרות | לוח בקרה',
      description: 'לוח בקרה לרכז התעסוקה',
      canonical: 'https://www.k8now.com/admin/jobs/',
      robots: 'noindex, nofollow',
    });
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [jobsData, auditData] = await Promise.all([fetchAllJobsAdmin(), fetchAuditLog(20)]);
      setJobs(jobsData);
      setAudit(auditData);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'שגיאה בטעינה');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(() => {
    const published = jobs.filter((j) => j.status === 'published').length;
    const draft = jobs.filter((j) => j.status === 'draft').length;
    const archived = jobs.filter((j) => j.status === 'archived').length;
    const employers = jobs.filter((j) => j.domain === 'employer').length;
    const openRoles = jobs.filter((j) => j.domain !== 'employer').length;
    const totalClicks = jobs.reduce((s, j) => s + j.apply_clicks + j.whatsapp_clicks, 0);
    return { total: jobs.length, published, draft, archived, employers, openRoles, totalClicks };
  }, [jobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((j) => {
      if (statusFilter !== 'all' && j.status !== statusFilter) return false;
      if (!q) return true;
      return `${j.title} ${j.company} ${j.domain_label} ${j.location}`.toLowerCase().includes(q);
    });
  }, [jobs, query, statusFilter]);

  const handleStatus = async (job: DbHiTechJob, status: JobStatus) => {
    if (!user) return;
    try {
      await setJobStatus(job, status, user.id);
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'שגיאה');
    }
  };

  const handleDelete = async (job: DbHiTechJob) => {
    if (!user) return;
    if (!confirm(`למחוק את "${job.title}"?`)) return;
    try {
      await deleteJob(job.id, job.slug, user.id);
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'שגיאה');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: HT.greenDark, flex: 1 }}>
          ניהול משרות
        </h1>
        <button type="button" onClick={load} style={ghostBtn}>
          <RefreshCw size={16} aria-hidden />
          רענון
        </button>
        <Link to="/admin/jobs/new" style={primaryBtn}>
          <Plus size={16} aria-hidden />
          משרה חדשה
        </Link>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 12,
          marginBottom: 28,
        }}
      >
        {[
          ['סה"כ', stats.total],
          ['פורסמו', stats.published],
          ['טיוטה', stats.draft],
          ['בארכיון', stats.archived],
          ['חברות', stats.employers],
          ['משרות פתוחות', stats.openRoles],
          ['לחיצות CTA', stats.totalClicks],
        ].map(([label, val]) => (
          <div key={String(label)} style={statCard}>
            <div style={{ fontSize: 22, fontWeight: 800, color: HT.greenDark }}>{val}</div>
            <div style={{ fontSize: 12, color: HT.muted, marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        <input
          type="search"
          placeholder="חיפוש..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ ...inputStyle, flex: '1 1 200px', maxWidth: 320 }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as JobStatus | 'all')}
          style={inputStyle}
        >
          <option value="all">כל הסטטוסים</option>
          <option value="published">פורסם</option>
          <option value="draft">טיוטה</option>
          <option value="archived">בארכיון</option>
        </select>
      </div>

      {error && <p style={{ color: '#8B3A2F', marginBottom: 16 }}>{error}</p>}
      {loading ? (
        <p style={{ color: HT.muted }}>טוען...</p>
      ) : (
        <div style={{ overflowX: 'auto', background: HT.white, borderRadius: 14, border: '1px solid rgba(52,88,66,0.08)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: HT.mint, textAlign: 'right' }}>
                {['כותרת', 'חברה', 'תחום', 'סטטוס', 'לחיצות', 'עודכן', 'פעולות'].map((h) => (
                  <th key={h} style={{ padding: '12px 14px', fontWeight: 700, color: HT.greenDark }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((job) => (
                <tr key={job.id} style={{ borderTop: '1px solid rgba(52,88,66,0.06)' }}>
                  <td style={td}>{job.title}</td>
                  <td style={td}>{job.company}</td>
                  <td style={td}>{JOB_DOMAIN_LABELS[job.domain] ?? job.domain}</td>
                  <td style={td}>
                    <JobStatusBadge status={job.status} />
                  </td>
                  <td style={td}>
                    {job.apply_clicks} / {job.whatsapp_clicks}
                    <span style={{ fontSize: 11, color: HT.muted, display: 'block' }}>הגשה / וואטסאפ</span>
                  </td>
                  <td style={td}>
                    {new Date(job.updated_at).toLocaleDateString('he-IL')}
                  </td>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>
                    <Link to={`/admin/jobs/${job.id}/edit`} style={linkBtn}>
                      עריכה
                    </Link>
                    {job.status !== 'published' && (
                      <button type="button" style={linkBtn} onClick={() => handleStatus(job, 'published')}>
                        פרסום
                      </button>
                    )}
                    {job.status === 'published' && (
                      <button type="button" style={linkBtn} onClick={() => handleStatus(job, 'draft')}>
                        הסתרה
                      </button>
                    )}
                    {job.status !== 'archived' && (
                      <button type="button" style={linkBtn} onClick={() => handleStatus(job, 'archived')}>
                        ארכיון
                      </button>
                    )}
                    <button type="button" style={{ ...linkBtn, color: '#8B3A2F' }} onClick={() => handleDelete(job)}>
                      מחיקה
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filtered.length && (
            <p style={{ padding: 24, textAlign: 'center', color: HT.muted }}>אין תוצאות</p>
          )}
        </div>
      )}

      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: HT.greenDark, marginBottom: 12 }}>
          פעילות אחרונה
        </h2>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {audit.map((entry) => (
            <li
              key={entry.id}
              style={{
                padding: '10px 14px',
                background: HT.white,
                borderRadius: 10,
                marginBottom: 8,
                fontSize: 13,
                border: '1px solid rgba(52,88,66,0.06)',
              }}
            >
              <strong>{entry.action}</strong>
              {entry.job_slug && <> · {entry.job_slug}</>}
              <span style={{ color: HT.muted, marginInlineStart: 8 }}>
                {new Date(entry.created_at).toLocaleString('he-IL')}
              </span>
            </li>
          ))}
          {!audit.length && !loading && (
            <li style={{ color: HT.muted, fontSize: 13 }}>אין רשומות עדיין</li>
          )}
        </ul>
      </section>
    </div>
  );
}

const statCard: React.CSSProperties = {
  background: '#fff',
  borderRadius: 12,
  padding: '16px 18px',
  border: '1px solid rgba(52,88,66,0.08)',
};

const td: React.CSSProperties = { padding: '12px 14px', verticalAlign: 'top' };

const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderRadius: 10,
  border: '1px solid rgba(52,88,66,0.2)',
  fontFamily: HT.fontSans,
  fontSize: 14,
};

const primaryBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '10px 18px',
  borderRadius: 12,
  background: HT.plum,
  color: HT.white,
  fontWeight: 700,
  textDecoration: 'none',
  fontSize: 14,
};

const ghostBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '10px 14px',
  borderRadius: 12,
  border: `1px solid ${HT.greenDark}`,
  background: 'transparent',
  color: HT.greenDark,
  cursor: 'pointer',
  fontFamily: HT.fontSans,
  fontSize: 14,
};

const linkBtn: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: HT.plum,
  cursor: 'pointer',
  fontFamily: HT.fontSans,
  fontSize: 13,
  fontWeight: 600,
  marginInlineEnd: 10,
  textDecoration: 'underline',
  padding: 0,
};
