import { Suspense, lazy, useEffect } from 'react';
import { setPageSEO } from '../utils/seo';
import { MusicFaq } from './MusicFaq';
import { MusicHero } from './MusicHero';
import { MusicOffer } from './MusicOffer';
import { MusicProcess } from './MusicProcess';
import { MusicRhythm } from './MusicRhythm';
import { MusicStickyCta } from './MusicStickyCta';
import { MusicWhy } from './MusicWhy';
import { K8MUSIC_SEO, K8MUSIC_THANK_YOU_PATH, KM } from './tokens';

const ContactForm = lazy(() =>
  import('../components/ContactForm').then((m) => ({ default: m.ContactForm })),
);

export function MusicPage() {
  useEffect(() => {
    setPageSEO({
      ...K8MUSIC_SEO,
      ogTitle: K8MUSIC_SEO.title,
      ogDescription: K8MUSIC_SEO.description,
      ogUrl: K8MUSIC_SEO.canonical,
    });

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    const prev = ogImage.getAttribute('content');
    ogImage.setAttribute('content', 'https://www.k8now.com/og-image.png');
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
    <div style={{ fontFamily: KM.fontSans, background: KM.paper }}>
      <MusicHero />
      <MusicOffer />
      <MusicRhythm />
      <MusicWhy />
      <MusicProcess />
      <MusicFaq />
      <Suspense fallback={<div style={{ minHeight: 320, background: KM.walnut }} aria-hidden />}>
        <ContactForm
          variant="k8music"
          thankYouPath={K8MUSIC_THANK_YOU_PATH}
          headline="בואו לסופ״ש ג׳אם"
          subheadline="השאירו פרטים — נחזור לשיחה קצרה, בלי התחייבות."
        />
      </Suspense>
      <MusicStickyCta />
    </div>
  );
}
