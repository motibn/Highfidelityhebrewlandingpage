/** Updates title, meta description, canonical, and basic Open Graph tags for client-side route changes. */
export function setPageSEO(opts: {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
}) {
  document.title = opts.title;

  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', opts.description);
  }

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', opts.canonical);

  const ogTitle = opts.ogTitle ?? opts.title;
  const ogDescription = opts.ogDescription ?? opts.description;
  const ogUrl = opts.ogUrl ?? opts.canonical;

  const setMetaProperty = (property: string, content: string) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMetaProperty('og:title', ogTitle);
  setMetaProperty('og:description', ogDescription);
  setMetaProperty('og:url', ogUrl);
}

export const HOME_SEO = {
  title: 'קריית שמונה מחכה לכם | עוברים צפונה, מתחילים מחדש',
  description:
    'גלו למה מעל 200 משפחות בחרו לעבור לקריית שמונה. דירות 3 חדרים מ-750,000 ₪, קהילה חמה, הטבות מס מלאות ואיכות חיים שונה לגמרי. בואו להכיר.',
  canonical: 'https://k8now.com/',
} as const;

export const FAQ_SEO = {
  title: 'שאלות נפוצות – עוברים לקריית שמונה | מחירים, הטבות מס ותהליך מעבר',
  description:
    'עונים על השאלות הנפוצות: כמה עולה דירה בקריית שמונה, אילו הטבות מס קיימות בצפון, איך מתחילים את תהליך המעבר, ולמה לבחור בקריית שמונה כמשפחה.',
  canonical: 'https://k8now.com/faq',
} as const;
