// Naveloa Supabase client
const NAVELOA_SUPABASE_URL = 'https://zlsqnbnzohzpyqhmfqxa.supabase.co';
const NAVELOA_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_qEkCirGj2hIBTYhbVgpE1A_KTxPBiR_';

const naveloaSupabase = window.supabase.createClient(
  NAVELOA_SUPABASE_URL,
  NAVELOA_SUPABASE_PUBLISHABLE_KEY,
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
);

const NAVELOA_ROLE_PAGES = {
  applicant: 'bewerber.html',
  supported_applicant: 'bewerber.html',
  companion: 'begleitperson.html',
  employer: 'arbeitgeber.html',
  admin: 'admin.html'
};

async function naveloaGetCurrentUser() {
  const { data, error } = await naveloaSupabase.auth.getUser();
  if (error) return null;
  return data.user || null;
}

async function naveloaGetProfile(userId) {
  const { data, error } = await naveloaSupabase
    .from('profiles')
    .select('id, first_name, last_name, role, city, canton, easy_language, read_aloud, dark_mode')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

async function naveloaRedirectForRole(userId) {
  const profile = await naveloaGetProfile(userId);
  const page = NAVELOA_ROLE_PAGES[profile.role];
  if (!page) throw new Error('Unbekannte Benutzerrolle.');
  window.location.href = page;
}

async function naveloaRequireRoles(allowedRoles) {
  const user = await naveloaGetCurrentUser();
  if (!user) {
    window.location.replace('index.html');
    return null;
  }
  try {
    const profile = await naveloaGetProfile(user.id);
    if (!allowedRoles.includes(profile.role)) {
      const destination = NAVELOA_ROLE_PAGES[profile.role] || 'index.html';
      window.location.replace(destination);
      return null;
    }
    return { user, profile };
  } catch (error) {
    console.error(error);
    window.location.replace('index.html');
    return null;
  }
}

async function naveloaSignOut() {
  await naveloaSupabase.auth.signOut();
  window.location.replace('index.html');
}
