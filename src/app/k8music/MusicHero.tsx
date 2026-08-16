import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { KM, scrollToMusicContact } from './tokens';
import { SoundWave, VinylRing } from './MusicDecor';

export function MusicHero() {
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
        background: `linear-gradient(165deg, ${KM.paper} 0%, #EDE4D6 45%, #E6D9C8 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
      }}
    >
      <motion.div style={{ position: 'absolute', inset: 0, y: bgY }}>
        <picture>
          <source media="(max-width: 1024px)" srcSet="/k8music/hero-1280.avif" type="image/avif" />
          <source srcSet="/k8music/hero-1920.avif" type="image/avif" />
          <source media="(max-width: 1024px)" srcSet="/k8music/hero-1280.jpg" type="image/jpeg" />
          <img
            src="/k8music/hero-1920.jpg"
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
              objectPosition: 'center 40%',
              opacity: 0.55,
            }}
          />
        </picture>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(244,237,227,0.82) 0%, rgba(244,237,227,0.55) 50%, rgba(28,20,16,0.25) 100%)',
          }}
        />
      </motion.div>

      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '-80px',
          bottom: '8%',
          width: 'min(280px, 42vw)',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.7,
        }}
      >
        <VinylRing color={KM.brass} opacity={0.35} />
      </div>

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
            fontFamily: KM.fontScript,
            fontSize: 'clamp(22px, 3.2vw, 32px)',
            fontWeight: 500,
            color: KM.plum,
            margin: '0 0 12px',
          }}
        >
          k8music · קהילת המוזיקאים קריית שמונה
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08 }}
          style={{
            fontFamily: KM.fontSans,
            fontSize: 'clamp(34px, 6.2vw, 64px)',
            fontWeight: 900,
            color: KM.ink,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: '0 0 20px',
          }}
        >
          יש אולפן, במה וקהילה.
          <br />
          <span style={{ color: KM.amber }}>והם מגיעים עם טבע וחיים שקטים.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: KM.fontSans,
            fontSize: 'clamp(16px, 2vw, 19px)',
            fontWeight: 400,
            color: KM.muted,
            lineHeight: 1.75,
            maxWidth: 620,
            margin: '0 auto 20px',
          }}
        >
          מוזיקה לא נועדה להיווצר לבד בחדר שינה. הצטרפו לקהילת המוזיקאים של קריית שמונה —
          יצירה משותפת, תעסוקה בחינוך ובתרבות, וליווי אישי למעבר.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.28 }}
          style={{ maxWidth: 320, margin: '0 auto 28px' }}
        >
          <SoundWave color={KM.plum} opacity={0.55} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32 }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button
            type="button"
            onClick={scrollToMusicContact}
            style={{
              background: KM.amber,
              color: KM.white,
              border: 'none',
              borderRadius: 999,
              padding: '16px 34px',
              fontFamily: KM.fontSans,
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 10px 28px rgba(196,120,58,0.35)',
            }}
          >
            הצטרפו לקהילה &gt;
          </button>
          <button
            type="button"
            onClick={() =>
              document.querySelector('#offer')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            style={{
              background: 'rgba(255,255,255,0.55)',
              color: KM.ink,
              border: `1.5px solid rgba(176,137,104,0.45)`,
              borderRadius: 999,
              padding: '16px 34px',
              fontFamily: KM.fontSans,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
            }}
          >
            מה מחכה לכם
          </button>
        </motion.div>
      </div>

      <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, zIndex: 3, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ width: '100%', height: 56, display: 'block' }}>
          <path d="M0,40 C320,70 720,10 1440,48 L1440,64 L0,64 Z" fill={KM.white} />
        </svg>
      </div>
    </section>
  );
}
