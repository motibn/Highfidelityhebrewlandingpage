import { useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { FloralBorder, LeafCluster, BranchLinework } from '../components/BotanicalElements';
import { setPageSEO } from '../utils/seo';

const THANK_YOU_SEO = {
  title: 'תודה שנרשמתם | קריית שמונה מחכה לכם',
  description: 'קיבלנו את הפנייה שלכם. נציג שלנו יחזור אליכם בהקדם.',
  canonical: 'https://www.k8now.com/thank-you',
} as const;

function pushLeadConversionEvent(): void {
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: 'origami_lead_submit',
    form_source: 'origami',
    page_path: '/thank-you',
  });
}

export function ThankYouLeadPage() {
  useEffect(() => {
    setPageSEO(THANK_YOU_SEO);
  }, []);

  useEffect(() => {
    pushLeadConversionEvent();
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #2a4332 0%, #1e3228 60%, #2a4332 100%)',
        padding: 'clamp(72px, 12vw, 120px) 24px 100px',
        minHeight: '58vh',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
      }} />

      <div style={{ position: 'absolute', top: '72px', right: '3%', width: '140px', opacity: 0.12 }}>
        <LeafCluster color="#8aaa78" opacity={1} />
      </div>
      <div style={{ position: 'absolute', bottom: '80px', left: '3%', width: '130px', opacity: 0.1, transform: 'scaleX(-1)' }}>
        <LeafCluster color="#c2754a" opacity={1} />
      </div>
      <div style={{ position: 'absolute', top: '100px', left: '6%', width: '200px', opacity: 0.16 }}>
        <BranchLinework color="rgba(255,255,255,1)" opacity={0.28} />
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
            <FloralBorder color="#8aaa78" opacity={0.55} style={{ width: '220px' }} />
          </div>

          <div
            style={{
              margin: '0 auto 20px',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(138,170,120,0.2)',
              border: '2px solid rgba(194,220,180,0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c2dcaf',
            }}
            aria-hidden="true"
          >
            <CheckCircle2 size={30} strokeWidth={2} />
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 4.2vw, 44px)',
            fontWeight: 800,
            color: '#f2e8d5',
            lineHeight: 1.2,
            letterSpacing: '-0.5px',
            margin: '0 0 16px',
          }}>
            שמחים שנרשמתם
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 2vw, 19px)',
            color: 'rgba(194,220,180,0.88)',
            lineHeight: 1.75,
            margin: '0 0 8px',
            fontWeight: 500,
          }}>
            נציג שלנו יחזור אליכם בהקדם
          </p>
          <p style={{
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            color: 'rgba(194,220,180,0.65)',
            lineHeight: 1.65,
            margin: '0 0 36px',
            fontWeight: 400,
            maxWidth: '420px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            בינתיים אפשר לעיין שוב בדף ולקרוא עוד על העיר, הקהילה וההטבות.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          style={{
            background: 'rgba(250,247,242,0.97)',
            border: '1px solid rgba(255,255,255,0.55)',
            borderRadius: '28px',
            padding: 'clamp(24px, 4vw, 36px)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '200px',
              padding: '14px 28px',
              fontSize: '16px',
              fontWeight: 700,
              color: '#faf7f2',
              background: 'linear-gradient(135deg, #2a4332, #3d5c47)',
              borderRadius: '14px',
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(42,67,50,0.35)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 28px rgba(42,67,50,0.42)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(42,67,50,0.35)';
            }}
          >
            חזרה לדף הבית
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
