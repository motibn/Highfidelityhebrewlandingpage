/**
 * Brand tokens for /hi-tech campaign (from brand book palette).
 * Homepage keeps its own hardcoded colors — these are hi-tech only.
 */
export const HT = {
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

export const HI_TECH_SEO = {
  title: 'הצטרפו לקהילת ההייטק בקריית שמונה | הבחירה הצפונית',
  description:
    'יש עבודה בהייטק בקריית שמונה — בחברות מובילות, עם קהילה, טבע וליווי אישי למעבר. השאירו פרטים למפגש.',
  canonical: 'https://www.k8now.com/hi-tech/',
  robots: 'noindex, follow',
} as const;

export const HI_TECH_THANK_YOU_SEO = {
  title: 'תודה! | קהילת ההייטק בקריית שמונה',
  description: 'קיבלנו את הפרטים. נציג יחזור אליכם בהקדם לשיחה על קהילת ההייטק בקריית שמונה.',
  canonical: 'https://www.k8now.com/hi-tech/thank-you/',
  robots: 'noindex, follow',
} as const;

export const HI_TECH_JOBS_SEO = {
  title: 'משרות הייטק בגליל | הבחירה הצפונית',
  description:
    'משרות פתוחות בהייטק באזור קריית שמונה — Genpact ועוד. סננו לפי תחום ורמה והגישו ישירות באתר המעסיק.',
  canonical: 'https://www.k8now.com/hi-tech/jobs/',
  robots: 'noindex, follow',
} as const;

export const HI_TECH_THANK_YOU_PATH = '/hi-tech/thank-you/';
export const HI_TECH_JOBS_PATH = '/hi-tech/jobs/';

export const COMPANY_NAMES = [
  'NVIDIA',
  'Genpact',
  'BMC Software',
  'Elbit Systems',
  'Shamir',
] as const;

export function scrollToHiTechContact() {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
