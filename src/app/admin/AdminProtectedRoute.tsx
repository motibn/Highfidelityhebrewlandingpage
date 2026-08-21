import { Navigate, useLocation } from 'react-router';
import { useAdminAuth } from './AdminAuthProvider';

export function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading, isCoordinator } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ padding: 48, textAlign: 'center', color: '#4A5E50' }}>טוען...</div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (!isCoordinator) {
    return (
      <div style={{ padding: 48, maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: 22, color: '#345842' }}>אין הרשאה</h1>
        <p style={{ color: '#4A5E50', lineHeight: 1.6 }}>
          החשבון שלכם לא מוגדר כרכז תעסוקה. פנו למנהל המערכת להוספת הרשאה ב-Supabase.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
