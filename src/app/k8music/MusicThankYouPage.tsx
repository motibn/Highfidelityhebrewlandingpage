import { useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { setPageSEO } from '../utils/seo';
import { K8MUSIC_PATH, K8MUSIC_THANK_YOU_SEO, KM } from './tokens';

function pushLeadConversionEvent(): void {
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: 'origami_lead_submit',
    form_source: 'origami',
    page_path: '/k8music/thank-you/',
    campaign: 'k8music',
  });
}

export function MusicThankYouPage() {
  useEffect(() => {
    setPageSEO(K8MUSIC_THANK_YOU_SEO);
  }, []);

  useEffect(() => {
    pushLeadConversionEvent();
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        background: `linear-gradient(160deg, ${KM.greenDark} 0%, #2A4A38 55%, ${KM.greenDark} 100%)`,
        fontFamily: KM.fontSans,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(168,92,128,0.18) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(150,186,139,0.12) 0%, transparent 45%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 560, width: '100%', position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              margin: '0 auto 20px',
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'rgba(150,186,139,0.22)',
              border: '2px solid rgba(150,186,139,0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: KM.greenLight,
            }}
            aria-hidden
          >
            <CheckCircle2 size={30} strokeWidth={2} />
          </div>

          <p
            style={{
              fontFamily: KM.fontScript,
              fontSize: 26,
              color: KM.terracotta,
              margin: '0 0 8px',
            }}
          >
            תודה
          </p>

          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 900,
              color: KM.cream,
              margin: '0 0 14px',
              lineHeight: 1.2,
            }}
          >
            שמחים שהצטרפתם לדרך
          </h1>

          <p
            style={{
              fontSize: 17,
              color: 'rgba(217,227,210,0.9)',
              lineHeight: 1.7,
              margin: '0 0 36px',
            }}
          >
            קיבלנו את הפרטים. נציג יחזור אליכם בהקדם לשיחה על קהילת המוזיקאים בקריית שמונה — ואולי לסופ״ש ג׳אם.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            background: 'rgba(247,251,245,0.97)',
            borderRadius: 24,
            padding: '28px 24px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.22)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <Link
            to={K8MUSIC_PATH}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 220,
              padding: '14px 28px',
              fontSize: 16,
              fontWeight: 700,
              color: KM.white,
              background: KM.plum,
              borderRadius: 14,
              textDecoration: 'none',
              fontFamily: KM.fontSans,
              boxShadow: '0 8px 22px rgba(168,92,128,0.35)',
            }}
          >
            חזרה לדף הקהילה
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
