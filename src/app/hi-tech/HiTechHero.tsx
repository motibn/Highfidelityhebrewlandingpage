import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { HT, scrollToHiTechContact } from './tokens';

export function HiTechHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
    layoutEffect: false,
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: `linear-gradient(165deg, ${HT.mint} 0%, ${HT.cream} 45%, #E8F0E4 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '110px 24px 80px',
      }}
    >
      <motion.div style={{ position: 'absolute', inset: 0, y: bgY }}>
        <picture>
          <source media="(max-width: 1024px)" srcSet="/hi-tech/hero-1280.avif" type="image/avif" />
          <img
            src="/hi-tech/hero-1920.avif"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 35%',
              opacity: 0.42,
            }}
          />
        </picture>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(217,227,210,0.88) 0%, rgba(247,251,245,0.72) 48%, rgba(247,251,245,0.55) 100%)',
          }}
        />
      </motion.div>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 820,
          textAlign: 'center',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: HT.fontScript,
            fontSize: 'clamp(22px, 3.2vw, 32px)',
            fontWeight: 500,
            color: HT.plum,
            margin: '0 0 12px',
          }}
        >
          קריית שמונה · קרוב לכל מה שטוב
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08 }}
          style={{
            fontFamily: HT.fontSans,
            fontSize: 'clamp(34px, 6.2vw, 64px)',
            fontWeight: 900,
            color: HT.greenDark,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: '0 0 20px',
          }}
        >
          יש עבודה בהייטק.
          <br />
          <span style={{ color: HT.plum }}>והיא מגיעה עם קהילה וטבע.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: HT.fontSans,
            fontSize: 'clamp(16px, 2vw, 19px)',
            fontWeight: 400,
            color: HT.muted,
            lineHeight: 1.75,
            maxWidth: 620,
            margin: '0 auto 36px',
          }}
        >
          הצטרפו לקהילת ההייטק של קריית שמונה בחברות המובילות.
          <br />
          ליווי אישי לתעסוקה, דיור והשתלבות — בלי לוותר על הקריירה.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32 }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button
            type="button"
            onClick={scrollToHiTechContact}
            style={{
              background: HT.plum,
              color: HT.white,
              border: 'none',
              borderRadius: 999,
              padding: '16px 34px',
              fontFamily: HT.fontSans,
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 10px 28px rgba(168,92,128,0.35)',
            }}
          >
            הצטרפו לקהילת ההייטק &gt;
          </button>
          <button
            type="button"
            onClick={() =>
              document.querySelector('#companies')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            style={{
              background: 'rgba(255,255,255,0.55)',
              color: HT.greenDark,
              border: `1.5px solid rgba(52,88,66,0.22)`,
              borderRadius: 999,
              padding: '16px 34px',
              fontFamily: HT.fontSans,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
            }}
          >
            החברות באזור
          </button>
        </motion.div>
      </div>

      {/* Soft wave into next section */}
      <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, zIndex: 3, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ width: '100%', height: 56, display: 'block' }}>
          <path d="M0,40 C320,70 720,10 1440,48 L1440,64 L0,64 Z" fill={HT.white} />
        </svg>
      </div>
    </section>
  );
}
