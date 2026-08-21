import {
  JOB_DOMAIN_LABELS,
  JOB_LEVEL_LABELS,
  type JobDomain,
  type JobLevel,
} from '../../hi-tech/jobs-data';
import type { JobStatus } from '../../../lib/supabase/types';
import { HT } from '../../hi-tech/tokens';

export interface JobFormValues {
  slug: string;
  title: string;
  company: string;
  domain: JobDomain;
  domain_label: string;
  level: JobLevel | null;
  location: string;
  note: string;
  apply_url: string;
  status: JobStatus;
  sort_order: number;
}

export const emptyJobForm = (): JobFormValues => ({
  slug: '',
  title: '',
  company: '',
  domain: 'dev',
  domain_label: '',
  level: 'junior',
  location: 'גליל עליון (קריית שמונה)',
  note: '',
  apply_url: '',
  status: 'draft',
  sort_order: 100,
});

interface JobFormFieldsProps {
  values: JobFormValues;
  onChange: (values: JobFormValues) => void;
  slugLocked?: boolean;
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 6,
  color: HT.greenDark,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 10,
  border: '1px solid rgba(52,88,66,0.2)',
  fontFamily: HT.fontSans,
  fontSize: 14,
};

export function JobFormFields({ values, onChange, slugLocked }: JobFormFieldsProps) {
  const set = <K extends keyof JobFormValues>(key: K, val: JobFormValues[K]) => {
    onChange({ ...values, [key]: val });
  };

  const levelKind = values.domain === 'employer' ? 'employer' : values.level;

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <label>
          <span style={labelStyle}>כותרת *</span>
          <input
            required
            value={values.title}
            onChange={(e) => set('title', e.target.value)}
            style={inputStyle}
          />
        </label>
        <label>
          <span style={labelStyle}>חברה *</span>
          <input
            required
            value={values.company}
            onChange={(e) => set('company', e.target.value)}
            style={inputStyle}
          />
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <label>
          <span style={labelStyle}>מזהה (slug) *</span>
          <input
            required
            disabled={slugLocked}
            value={values.slug}
            onChange={(e) => set('slug', e.target.value)}
            style={{ ...inputStyle, opacity: slugLocked ? 0.6 : 1 }}
            dir="ltr"
          />
        </label>
        <label>
          <span style={labelStyle}>סדר תצוגה</span>
          <input
            type="number"
            value={values.sort_order}
            onChange={(e) => set('sort_order', Number(e.target.value) || 0)}
            style={inputStyle}
          />
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        <label>
          <span style={labelStyle}>תחום *</span>
          <select
            value={values.domain}
            onChange={(e) => {
              const domain = e.target.value as JobDomain;
              const next = { ...values, domain };
              if (domain === 'employer') {
                next.level = null;
                next.domain_label = next.domain_label || 'חברות באזור';
              } else if (next.level === null) {
                next.level = 'junior';
              }
              onChange(next);
            }}
            style={inputStyle}
          >
            {(Object.entries(JOB_DOMAIN_LABELS) as [JobDomain, string][]).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span style={labelStyle}>תיאור תחום *</span>
          <input
            required
            value={values.domain_label}
            onChange={(e) => set('domain_label', e.target.value)}
            style={inputStyle}
          />
        </label>
        <label>
          <span style={labelStyle}>רמה</span>
          <select
            value={levelKind === 'employer' ? 'employer' : (values.level ?? 'junior')}
            onChange={(e) => {
              const v = e.target.value;
              if (v === 'employer') {
                onChange({ ...values, domain: 'employer', level: null });
              } else {
                onChange({ ...values, level: v as JobLevel, domain: values.domain === 'employer' ? 'dev' : values.domain });
              }
            }}
            style={inputStyle}
          >
            <option value="employer">חברה באזור</option>
            <option value="junior">{JOB_LEVEL_LABELS.junior}</option>
            <option value="senior">{JOB_LEVEL_LABELS.senior}</option>
          </select>
        </label>
        <label>
          <span style={labelStyle}>סטטוס</span>
          <select
            value={values.status}
            onChange={(e) => set('status', e.target.value as JobStatus)}
            style={inputStyle}
          >
            <option value="draft">טיוטה</option>
            <option value="published">פורסם</option>
            <option value="archived">בארכיון</option>
          </select>
        </label>
      </div>

      <label>
        <span style={labelStyle}>מיקום *</span>
        <input
          required
          value={values.location}
          onChange={(e) => set('location', e.target.value)}
          style={inputStyle}
        />
      </label>

      <label>
        <span style={labelStyle}>הערה</span>
        <textarea
          rows={3}
          value={values.note}
          onChange={(e) => set('note', e.target.value)}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </label>

      <label>
        <span style={labelStyle}>קישור הגשה (Comeet)</span>
        <input
          type="url"
          value={values.apply_url}
          onChange={(e) => set('apply_url', e.target.value)}
          placeholder="https://www.comeet.com/jobs/..."
          style={inputStyle}
          dir="ltr"
        />
        <span style={{ fontSize: 12, color: HT.muted, marginTop: 4, display: 'block' }}>
          {values.apply_url.trim()
            ? 'CTA: להגשה באתר Genpact'
            : 'CTA: וואטסאפ לעמותה (טקסט מותאם אוטומטית)'}
        </span>
      </label>
    </div>
  );
}
