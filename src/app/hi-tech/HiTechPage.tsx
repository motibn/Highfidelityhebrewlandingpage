import { Suspense, lazy, useEffect } from 'react';
import { setPageSEO } from '../utils/seo';
import { HiTechBenefits } from './HiTechBenefits';
import { HiTechCompanies } from './HiTechCompanies';
import { HiTechFaq } from './HiTechFaq';
import { HiTechHero } from './HiTechHero';
import { HiTechStickyCta } from './HiTechStickyCta';
import { HiTechWhy } from './HiTechWhy';
import { HI_TECH_SEO, HI_TECH_THANK_YOU_PATH, HT } from './tokens';

const ContactForm = lazy(() =>
  import('../components/ContactForm').then((m) => ({ default: m.ContactForm })),
);

export function HiTechPage() {
  useEffect(() => {
    setPageSEO({
      ...HI_TECH_SEO,
      ogTitle: HI_TECH_SEO.title,
      ogDescription: HI_TECH_SEO.description,
      ogUrl: HI_TECH_SEO.canonical,
    });

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    const prev = ogImage.getAttribute('content');
    ogImage.setAttribute('content', 'https://www.k8now.com/hi-tech/og-image.png');
    return () => {
      if (prev) ogImage?.setAttribute('content', prev);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    window.setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }, []);

  return (
    <div style={{ fontFamily: HT.fontSans, background: HT.cream }}>
      <HiTechHero />
      <HiTechCompanies />
      <HiTechWhy />
      <HiTechBenefits />
      <HiTechFaq />
      <Suspense fallback={<div style={{ minHeight: 320, background: HT.greenDark }} aria-hidden />}>
        <ContactForm
          variant="hi-tech"
          thankYouPath={HI_TECH_THANK_YOU_PATH}
          headline="הצטרפו לקהילת ההייטק"
          subheadline="השאירו פרטים ונחזור אליכם לשיחה קצרה על תעסוקה, דיור וקהילה — ללא התחייבות."
        />
      </Suspense>
      <HiTechStickyCta />
    </div>
  );
}
