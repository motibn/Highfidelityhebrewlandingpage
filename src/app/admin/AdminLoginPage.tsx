import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { signIn } from '../../lib/supabase/auth';
import { isSupabaseConfigured } from '../../lib/supabase/client';
import { setPageSEO } from '../utils/seo';
import { useAdminAuth } from './AdminAuthProvider';
import { HT } from '../hi-tech/tokens';

export function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { session, isCoordinator, loading } = useAdminAuth();

  const from = (location.state as { from?: string } | null)?.from ?? '/admin/jobs';

  useEffect(() => {
    setPageSEO({
      title: 'התחברות | לוח משרות',
      description: 'כניסה ללוח בקרה לרכז התעסוקה',
      canonical: 'https://www.k8now.com/admin/login/',
      robots: 'noindex, nofollow',
    });
  }, []);

  if (!loading && session && isCoordinator) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בהתחברות');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isSupabaseConfigured()) {
    return (
      <div style={{ padding: 48, maxWidth: 480, margin: '0 auto', fontFamily: HT.fontSans }}>
        <h1 style={{ color: HT.greenDark }}>Supabase לא מוגדר</h1>
        <p style={{ color: HT.muted, lineHeight: 1.6 }}>
          הוסיפו <code>VITE_SUPABASE_URL</code> ו-<code>VITE_SUPABASE_ANON_KEY</code> לקובץ{' '}
          <code>.env</code> ובצעו build מחדש.
        </p>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      lang="he"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(165deg, ${HT.mint}, ${HT.cream})`,
        fontFamily: HT.fontSans,
        padding: 24,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: 400,
          background: HT.white,
          borderRadius: 20,
          padding: '32px 28px',
          boxShadow: '0 16px 48px rgba(52,88,66,0.12)',
        }}
      >
        <h1 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: HT.greenDark }}>
          לוח משרות — התחברות
        </h1>
        <p style={{ margin: '0 0 24px', fontSize: 14, color: HT.muted }}>
          כניסה לרכזי התעסוקה בלבד
        </p>

        {error && (
          <p
            role="alert"
            style={{
              margin: '0 0 16px',
              padding: '10px 12px',
              borderRadius: 10,
              background: 'rgba(207,128,113,0.15)',
              color: '#8B3A2F',
              fontSize: 14,
            }}
          >
            {error}
          </p>
        )}

        <label style={{ display: 'block', marginBottom: 16 }}>
          <span style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: HT.greenDark }}>
            אימייל
          </span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </label>

        <label style={{ display: 'block', marginBottom: 24 }}>
          <span style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: HT.greenDark }}>
            סיסמה
          </span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: '12px 20px',
            borderRadius: 12,
            border: 'none',
            background: HT.plum,
            color: HT.white,
            fontWeight: 700,
            fontSize: 16,
            cursor: submitting ? 'wait' : 'pointer',
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? 'מתחבר...' : 'התחברות'}
        </button>

        <p style={{ margin: '20px 0 0', textAlign: 'center', fontSize: 13 }}>
          <Link to="/hi-tech/jobs/" style={{ color: HT.muted }}>
            חזרה לדף המשרות
          </Link>
        </p>
      </form>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: 10,
  border: '1px solid rgba(52,88,66,0.2)',
  fontFamily: 'inherit',
  fontSize: 15,
};
