/**
 * Maps marketing UTM values to Origami CRM dropdown options.
 * Origami utm_source: דף נחיתה | אתר | פייסבוק | אינסטגרם | לינקדאין | google | facebook | organic
 * Origami utm_medium: אינטרנט | טלפון | קשר אישי | אחר | ייבוא | cpc
 */

export const UTM_SOURCE_FALLBACK = 'אתר';
export const UTM_MEDIUM_FALLBACK = 'אחר';

/** Exact match (lowercase ASCII + Hebrew labels). */
export const UTM_SOURCE_EXACT: Record<string, string> = {
  // Google / Search
  google: 'google',
  googleads: 'google',
  google_ads: 'google',
  adwords: 'google',
  gads: 'google',
  gdn: 'google',
  search: 'google',
  sem: 'google',
  youtube: 'google',
  yt: 'google',
  dv360: 'google',
  doubleclick: 'google',
  display_google: 'google',
  גוגל: 'google',

  // Meta / Facebook / Instagram
  facebook: 'facebook',
  fb: 'facebook',
  meta: 'facebook',
  messenger: 'facebook',
  an: 'facebook',
  audience_network: 'facebook',
  instagram: 'אינסטגרם',
  insta: 'אינסטגרם',
  ig: 'אינסטגרם',
  פייסבוק: 'facebook',
  אינסטגרם: 'אינסטגרם',

  // LinkedIn
  linkedin: 'לינקדאין',
  li: 'לינקדאין',
  לינקדאין: 'לינקדאין',

  // Organic / site / direct
  organic: 'organic',
  seo: 'organic',
  direct: 'אתר',
  '(none)': 'אתר',
  site: 'אתר',
  website: 'אתר',
  web: 'אתר',
  homepage: 'אתר',
  internal: 'אתר',
  qr: 'אתר',
  k8now: 'אתר',
  north: 'אתר',
  אתר: 'אתר',

  // Landing / paid external (not in source dropdown)
  landing: 'דף נחיתה',
  landingpage: 'דף נחיתה',
  landing_page: 'דף נחיתה',
  lp: 'דף נחיתה',
  'דף נחיתה': 'דף נחיתה',
  campaign: 'דף נחיתה',
  ads: 'דף נחיתה',
  paid: 'דף נחיתה',

  // Other ad platforms → דף נחיתה (paid traffic to landing)
  tiktok: 'דף נחיתה',
  tik_tok: 'דף נחיתה',
  tt: 'דף נחיתה',
  snapchat: 'דף נחיתה',
  snap: 'דף נחיתה',
  pinterest: 'דף נחיתה',
  pin: 'דף נחיתה',
  twitter: 'דף נחיתה',
  x: 'דף נחיתה',
  bing: 'דף נחיתה',
  microsoft: 'דף נחיתה',
  msn: 'דף נחיתה',
  taboola: 'דף נחיתה',
  outbrain: 'דף נחיתה',
  yahoo: 'דף נחיתה',
  reddit: 'דף נחיתה',
  telegram: 'דף נחיתה',
  whatsapp: 'דף נחיתה',
  waze: 'דף נחיתה',
  email: 'דף נחיתה',
  newsletter: 'דף נחיתה',
  mailchimp: 'דף נחיתה',
  sms: 'דף נחיתה',
};

export const UTM_MEDIUM_EXACT: Record<string, string> = {
  // Paid click
  cpc: 'cpc',
  ppc: 'cpc',
  paid: 'cpc',
  paidsearch: 'cpc',
  paid_search: 'cpc',
  search: 'cpc',
  sem: 'cpc',
  cpa: 'cpc',
  cpv: 'cpc',
  cpm: 'cpc',
  cpl: 'cpc',
  display: 'cpc',
  banner: 'cpc',
  remarketing: 'cpc',
  retargeting: 'cpc',
  social: 'cpc',
  social_paid: 'cpc',
  'paid-social': 'cpc',
  paid_social: 'cpc',
  video: 'cpc',
  native: 'cpc',
  performance: 'cpc',
  ads: 'cpc',

  // Organic / web
  organic: 'אינטרנט',
  seo: 'אינטרנט',
  internet: 'אינטרנט',
  web: 'אינטרנט',
  online: 'אינטרנט',
  אינטרנט: 'אינטרנט',

  // Phone
  phone: 'טלפון',
  call: 'טלפון',
  tel: 'טלפון',
  טלפון: 'טלפון',

  // Referral / personal
  referral: 'קשר אישי',
  refer: 'קשר אישי',
  affiliate: 'קשר אישי',
  partner: 'קשר אישי',
  קשר: 'קשר אישי',
  'קשר אישי': 'קשר אישי',

  // Import / lists
  import: 'ייבוא',
  ייבוא: 'ייבוא',
  crm: 'ייבוא',
  list: 'ייבוא',
  database: 'ייבוא',

  // Default bucket
  none: 'אחר',
  direct: 'אחר',
  other: 'אחר',
  אחר: 'אחר',
  email: 'אחר',
  e_mail: 'אחר',
  'e-mail': 'אחר',
  newsletter: 'אחר',
  mail: 'אחר',
  sms: 'אחר',
  push: 'אחר',
  notification: 'אחר',
  offline: 'אחר',
  print: 'אחר',
  radio: 'אחר',
  tv: 'אחר',
  event: 'אחר',
  qr: 'אחר',
  link: 'אחר',
  bio: 'אחר',
  story: 'אחר',
  reel: 'אחר',
};

/** Substring rules when exact match fails (order matters). */
const UTM_SOURCE_CONTAINS: Array<{ pattern: RegExp; value: string }> = [
  { pattern: /google|adwords|gads|gdn|youtube|yt|dv360|doubleclick|pmax|performance\s*max/i, value: 'google' },
  { pattern: /facebook|meta|fb|messenger|audience/i, value: 'facebook' },
  { pattern: /instagram|insta/i, value: 'אינסטגרם' },
  { pattern: /\binstagram\b|\binsta\b|\big\b/i, value: 'אינסטגרם' },
  { pattern: /linkedin/i, value: 'לינקדאין' },
  { pattern: /organic|seo/i, value: 'organic' },
  { pattern: /tiktok|snapchat|pinterest|taboola|outbrain|reddit/i, value: 'דף נחיתה' },
  { pattern: /bing|microsoft|msn/i, value: 'דף נחיתה' },
  { pattern: /twitter|^x$|tweet/i, value: 'דף נחיתה' },
  { pattern: /landing|campaign|promo/i, value: 'דף נחיתה' },
  { pattern: /email|newsletter|mail|sms|whatsapp|telegram/i, value: 'דף נחיתה' },
];

const UTM_MEDIUM_CONTAINS: Array<{ pattern: RegExp; value: string }> = [
  { pattern: /cpc|ppc|paid|sem|display|remarketing|retarget|social|video|native|cpm|cpa|cpl|cpv|banner|ads/i, value: 'cpc' },
  { pattern: /organic|seo|internet|online|web/i, value: 'אינטרנט' },
  { pattern: /phone|call|tel|טלפון/i, value: 'טלפון' },
  { pattern: /refer|affiliate|partner|קשר/i, value: 'קשר אישי' },
  { pattern: /import|crm|list|ייבוא/i, value: 'ייבוא' },
];

function normalizeKey(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, '_');
}

function lookupExact(map: Record<string, string>, raw: string): string | undefined {
  const trimmed = raw.trim();
  const lower = normalizeKey(raw);
  return map[lower] ?? map[trimmed] ?? map[trimmed.toLowerCase()];
}

export function resolveUtmSource(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';

  const exact = lookupExact(UTM_SOURCE_EXACT, trimmed);
  if (exact) return exact;

  const normalized = normalizeKey(trimmed);
  for (const { pattern, value } of UTM_SOURCE_CONTAINS) {
    if (pattern.test(normalized) || pattern.test(trimmed)) return value;
  }

  return UTM_SOURCE_FALLBACK;
}

export function resolveUtmMedium(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';

  const exact = lookupExact(UTM_MEDIUM_EXACT, trimmed);
  if (exact) return exact;

  const normalized = normalizeKey(trimmed);
  for (const { pattern, value } of UTM_MEDIUM_CONTAINS) {
    if (pattern.test(normalized) || pattern.test(trimmed)) return value;
  }

  return UTM_MEDIUM_FALLBACK;
}

/** Infer source/medium from click IDs when UTM params are missing. */
export function inferUtmFromClickIds(params: {
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  ttclid?: string;
  li_fat_id?: string;
}): { utm_source?: string; utm_medium?: string } {
  if (params.gclid?.trim()) {
    return { utm_source: 'google', utm_medium: 'cpc' };
  }
  if (params.fbclid?.trim()) {
    return { utm_source: 'facebook', utm_medium: 'cpc' };
  }
  if (params.msclkid?.trim()) {
    return { utm_source: 'דף נחיתה', utm_medium: 'cpc' };
  }
  if (params.ttclid?.trim()) {
    return { utm_source: 'דף נחיתה', utm_medium: 'cpc' };
  }
  if (params.li_fat_id?.trim()) {
    return { utm_source: 'לינקדאין', utm_medium: 'cpc' };
  }
  return {};
}
