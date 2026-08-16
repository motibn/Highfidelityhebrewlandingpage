/**
 * Brand tokens for /k8music campaign (same palette as hi-tech / brand book).
 * Homepage keeps its own hardcoded colors — these are k8music only.
 */
export const KM = {
  greenDark: '#345842',
  greenMid: '#679263',
  greenLight: '#96BA8B',
  greenSage: '#84A87E',
  mint: '#D9E3D2',
  cream: '#F7FBF5',
  white: '#FFFFFF',
  plum: '#A85C80',
  terracotta: '#CF8071',
  sand: '#F5D7A1',
  charcoal: '#1E2A22',
  muted: '#4A5E50',
  footer: '#1A2A20',
  fontSans: "'Fb Tamlil', 'Heebo', Arial, sans-serif",
  fontScript: "'Fb Marzipan', 'Playpen Sans Hebrew', cursive",
  fontEng: "'Fb Tamlil Eng', 'Fb Tamlil', Arial, sans-serif",
} as const;

export const K8MUSIC_SEO = {
  title: 'קהילת המוזיקאים בקריית שמונה | k8music',
  description:
    'אולפן קהילתי, במה וג׳אם בקריית שמונה — תעסוקה בחינוך, קהילה וטבע בצפון. השאירו פרטים לשיחה קצרה.',
  canonical: 'https://www.k8now.com/k8music/',
  robots: 'index, follow',
} as const;

export const K8MUSIC_THANK_YOU_SEO = {
  title: 'תודה! | קהילת המוזיקאים בקריית שמונה',
  description: 'קיבלנו את הפרטים. נציג יחזור אליכם בהקדם לשיחה על קהילת המוזיקאים בקריית שמונה.',
  canonical: 'https://www.k8now.com/k8music/thank-you/',
  robots: 'noindex, follow',
} as const;

export const K8MUSIC_PATH = '/k8music/';
export const K8MUSIC_THANK_YOU_PATH = '/k8music/thank-you/';

export function scrollToMusicContact() {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
