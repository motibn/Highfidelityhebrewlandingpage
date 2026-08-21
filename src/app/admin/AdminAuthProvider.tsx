import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { getSupabase } from '../../lib/supabase/client';
import { isCoordinator } from '../../lib/supabase/auth';

interface AdminAuthContextValue {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isCoordinator: boolean;
  refresh: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [coordinator, setCoordinator] = useState(false);

  const refresh = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setSession(null);
      setCoordinator(false);
      setLoading(false);
      return;
    }

    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    if (data.session?.user) {
      setCoordinator(await isCoordinator(data.session.user.id));
    } else {
      setCoordinator(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    const supabase = getSupabase();
    if (!supabase) return;

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);
      if (nextSession?.user) {
        setCoordinator(await isCoordinator(nextSession.user.id));
      } else {
        setCoordinator(false);
      }
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, [refresh]);

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      isCoordinator: coordinator,
      refresh,
    }),
    [session, loading, coordinator, refresh],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
