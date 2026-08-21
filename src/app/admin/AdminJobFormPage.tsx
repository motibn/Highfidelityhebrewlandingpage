import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import {
  createJob,
  fetchJobById,
  slugify,
  updateJob,
} from '../../lib/supabase/jobs';
import { useAdminAuth } from './AdminAuthProvider';
import { JobFormFields, emptyJobForm, type JobFormValues } from './components/JobFormFields';
import { HT } from '../hi-tech/tokens';
import { setPageSEO } from '../utils/seo';
import type { DbHiTechJob } from '../../lib/supabase/types';

function jobToForm(job: DbHiTechJob): JobFormValues {
  return {
    slug: job.slug,
    title: job.title,
    company: job.company,
    domain: job.domain,
    domain_label: job.domain_label,
    level: job.level,
    location: job.location,
    note: job.note ?? '',
    apply_url: job.apply_url ?? '',
    status: job.status,
    sort_order: job.sort_order,
  };
}

export function AdminJobFormPage() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();
  const { user } = useAdminAuth();
  const [values, setValues] = useState<JobFormValues>(emptyJobForm());
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [autoSlug, setAutoSlug] = useState(isNew);

  useEffect(() => {
    setPageSEO({
      title: isNew ? 'משרה חדשה | לוח בקרה' : 'עריכת משרה | לוח בקרה',
      description: 'טופס ניהול משרות',
      canonical: `https://www.k8now.com/admin/jobs/${isNew ? 'new' : id}/`,
      robots: 'noindex, nofollow',
    });
  }, [id, isNew]);

  useEffect(() => {
    if (isNew || !id) return;
    setLoading(true);
    fetchJobById(id)
      .then((job) => {
        if (!job) {
          setError('משרה לא נמצאה');
          return;
        }
        setValues(jobToForm(job));
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'שגיאה'))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  useEffect(() => {
    if (!autoSlug || !isNew) return;
    const base = values.company || values.title;
    if (base) setValues((v) => ({ ...v, slug: slugify(base) }));
  }, [values.title, values.company, autoSlug, isNew]);

  const save = async (publish?: boolean) => {
    if (!user) return;
    setSaving(true);
    setError('');
    try {
      const payload = {
        slug: values.slug.trim(),
        title: values.title.trim(),
        company: values.company.trim(),
        domain: values.domain,
        domain_label: values.domain_label.trim(),
        level: values.domain === 'employer' ? null : values.level,
        location: values.location.trim(),
        note: values.note.trim() || null,
        apply_url: values.apply_url.trim() || null,
        status: publish ? ('published' as const) : values.status,
        sort_order: values.sort_order,
      };

      if (isNew) {
        await createJob(payload, user.id);
      } else if (id) {
        await updateJob(id, payload, user.id);
      }
      navigate('/admin/jobs');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'שגיאה בשמירה');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p style={{ color: HT.muted }}>טוען...</p>;
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: 24 }}>
        <Link to="/admin/jobs" style={{ color: HT.muted, fontSize: 14, textDecoration: 'none' }}>
          ← חזרה לרשימה
        </Link>
        <h1 style={{ margin: '8px 0 0', fontSize: 26, fontWeight: 800, color: HT.greenDark }}>
          {isNew ? 'משרה חדשה' : 'עריכת משרה'}
        </h1>
      </div>

      {error && (
        <p style={{ color: '#8B3A2F', marginBottom: 16, padding: 12, background: 'rgba(207,128,113,0.12)', borderRadius: 10 }}>
          {error}
        </p>
      )}

      <div style={{ background: HT.white, borderRadius: 16, padding: 24, border: '1px solid rgba(52,88,66,0.08)' }}>
        <JobFormFields
          values={values}
          onChange={setValues}
          slugLocked={!isNew}
        />
        {isNew && (
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, fontSize: 13, color: HT.muted }}>
            <input
              type="checkbox"
              checked={autoSlug}
              onChange={(e) => setAutoSlug(e.target.checked)}
            />
            עדכון אוטומטי של slug לפי שם החברה
          </label>
        )}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
        <button type="button" disabled={saving} onClick={() => save(false)} style={btnSecondary}>
          {saving ? 'שומר...' : 'שמירה'}
        </button>
        <button type="button" disabled={saving} onClick={() => save(true)} style={btnPrimary}>
          {saving ? 'שומר...' : 'שמירה ופרסום'}
        </button>
        <Link to="/admin/jobs" style={{ ...btnSecondary, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
          ביטול
        </Link>
      </div>
    </div>
  );
}

const btnPrimary: React.CSSProperties = {
  padding: '12px 22px',
  borderRadius: 12,
  border: 'none',
  background: HT.plum,
  color: HT.white,
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: HT.fontSans,
};

const btnSecondary: React.CSSProperties = {
  padding: '12px 22px',
  borderRadius: 12,
  border: `1px solid ${HT.greenDark}`,
  background: 'transparent',
  color: HT.greenDark,
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: HT.fontSans,
};
