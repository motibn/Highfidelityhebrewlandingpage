import { Link, Outlet, useLocation } from 'react-router';
import { Briefcase, LogOut } from 'lucide-react';
import { signOut } from '../../lib/supabase/auth';
import { HT } from '../hi-tech/tokens';

const nav = [{ to: '/admin/jobs', label: 'משרות' }];

export function AdminLayout() {
  const location = useLocation();

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/admin/login';
  };

  return (
    <div
      dir="rtl"
      lang="he"
      style={{
        minHeight: '100vh',
        display: 'flex',
        fontFamily: HT.fontSans,
        background: HT.cream,
      }}
    >
      <aside
        style={{
          width: 240,
          flexShrink: 0,
          background: HT.greenDark,
          color: HT.cream,
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
        className="admin-sidebar"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, padding: '0 8px' }}>
          <Briefcase size={22} aria-hidden />
          <span style={{ fontWeight: 800, fontSize: 16 }}>לוח משרות</span>
        </div>
        {nav.map((item) => {
          const active = location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              style={{
                display: 'block',
                padding: '10px 12px',
                borderRadius: 10,
                textDecoration: 'none',
                color: active ? HT.greenDark : HT.cream,
                background: active ? HT.mint : 'transparent',
                fontWeight: active ? 700 : 500,
                fontSize: 14,
              }}
            >
              {item.label}
            </Link>
          );
        })}
        <div style={{ flex: 1 }} />
        <button
          type="button"
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 12px',
            border: 'none',
            borderRadius: 10,
            background: 'rgba(255,255,255,0.08)',
            color: HT.cream,
            cursor: 'pointer',
            fontFamily: HT.fontSans,
            fontSize: 14,
          }}
        >
          <LogOut size={16} aria-hidden />
          התנתקות
        </button>
      </aside>
      <main style={{ flex: 1, padding: '32px 28px', overflow: 'auto' }}>
        <Outlet />
      </main>
      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar { width: 100%; flex-direction: row; flex-wrap: wrap; align-items: center; }
        }
      `}</style>
    </div>
  );
}
