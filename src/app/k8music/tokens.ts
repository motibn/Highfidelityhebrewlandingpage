/**
 * Brand tokens for /k8music — analog warm palette (paper, wood, evening light).
 * Homepage and /hi-tech keep their own colors.
 */
export const KM = {
  paper: '#F4EDE3',
  ink: '#2A2118',
  muted: '#6B5344',
  amber: '#C4783A',
  brass: '#B08968',
  plum: '#8B5A6B',
  walnut: '#1C1410',
  white: '#FFFFFF',
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
