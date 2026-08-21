import { getSupabase } from './client';

export async function signIn(email: string, password: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase לא מוגדר — הוסיפו VITE_SUPABASE_URL ו-VITE_SUPABASE_ANON_KEY');

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const supabase = getSupabase();
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getSession() {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function isCoordinator(userId: string): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) return false;
  return data?.role === 'coordinator';
}
