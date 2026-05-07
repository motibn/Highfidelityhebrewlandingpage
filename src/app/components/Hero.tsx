import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { HeroLandscape, BranchLinework, CornerBotanical } from './BotanicalElements';
const HERO_IMG = '/young-family-with-two-small-children-walking-on-me-2026-03-10-02-01-47-utc.jpg';
const LOGO_KS = '/לוגו-קריית-שמונה.png';
const LOGO_MAKOM = '/מקום.png';
const LOGO_MINISTRY = '/משרד-הנגב-הגלול-והחוסן-הלאומי.png';
const LOGO_MATNAS = '/עדכון-לוגו-מתנס.png';
const LOGO_KAKAL = '/KakalLogo.png';
const LOGO_JNF = '/logo_jnf.svg';

const scrollToSection = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
    layoutEffect: false,
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const hillsY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
          background: 'linear-gradient(165deg, #f7f1e5 0%, #eee4d0 35%, #ddd0b8 70%, #c8bba0 100%)',
        }}
      >
        {/* Paper grain overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
          opacity: 1,
        }} />

        {/* Background nature image with parallax */}
        <motion.div style={{ position: 'absolute', inset: 0, zIndex: 0, y: bgY }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url("${HERO_IMG}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            opacity: 0.55,
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(247,241,229,0.75) 0%, rgba(238,228,208,0.6) 50%, rgba(238,228,208,0.2) 80%, transparent 100%)',
          }} />
          <div style={{
            position: 'absolute',
            top: '-10%',
            right: '10%',
            width: '60%',
            height: '70%',
            background: 'radial-gradient(ellipse, rgba(255,240,200,0.35) 0%, transparent 70%)',
            borderRadius: '50%',
          }} />
        </motion.div>

        {/* Decorative corner botanicals */}
        <div style={{ position: 'absolute', top: '80px', right: '-20px', width: '200px', zIndex: 2, transform: 'scaleX(-1)' }}>
          <CornerBotanical opacity={0.18} />
        </div>
        <div style={{ position: 'absolute', top: '100px', left: '-10px', width: '180px', zIndex: 2 }}>
          <CornerBotanical color="#c2754a" opacity={0.12} />
        </div>

        {/* Branch linework decorations */}
        <div style={{ position: 'absolute', top: '160px', left: '5%', width: '280px', zIndex: 2 }}>
          <BranchLinework opacity={0.22} />
        </div>

        {/* Main Hero Content */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '120px 24px 200px',
            y: contentY,
          }}
        >
          <div style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}>

            {/* Partner logos */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 'clamp(16px, 3vw, 48px)',
                marginBottom: '50px',
              }}
            >
              {[
                { img: LOGO_KS, alt: 'עיריית קריית שמונה' },
                { img: LOGO_MAKOM, alt: 'מקום - עמותה לפיתוח הצפון' },
                { img: LOGO_MINISTRY, alt: 'משרד הנגב, הגליל והחוסן הלאומי' },
                { img: LOGO_MATNAS, alt: 'מתנ"ס קריית שמונה' },
                { img: LOGO_JNF, alt: 'JNF - הקרן הקיימת לישראל' },
                { img: LOGO_KAKAL, alt: 'קק"ל - הקרן הקיימת לישראל' },
              ].map((logo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  style={{
                    height: 'clamp(36px, 5vw, 60px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'default',
                  }}
                >
                  <img
                    src={logo.img}
                    alt={logo.alt}
                    style={{ height: '100%', width: 'auto', objectFit: 'contain', maxWidth: 'clamp(70px, 12vw, 120px)' }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: 'clamp(44px, 7vw, 96px)',
                fontWeight: 800,
                color: '#1e2d27',
                lineHeight: 1.1,
                letterSpacing: '-2px',
                marginBottom: '24px',
              }}
            >הבחירה הצפונית.<br /><span style={{
                background: 'linear-gradient(135deg, #2a4332 0%, #4d7a5c 50%, #c2754a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>בואו איתנו לקריית שמונה.</span></motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              style={{
                fontSize: '18px',
                fontWeight: 400,
                color: '#4a5e50',
                lineHeight: 1.7,
                maxWidth: '680px',
                margin: '0 auto 44px',
              }}
            >
              יש רגע שבו מתחילים לשאול ברצינות איך רוצים שהחיים ייראו.<br />
              איפה נכון לגדל את הילדים ואיזה קצב באמת מתאים לכם.<br />
              <br />
              קריית שמונה מציעה היום הזדמנות אמיתית לבנות חיים חדשים:<br />
              קהילה צומחת, איכות חיים גבוהה וסביבה שמתפתחת בפועל.<br />
              <br />
              זה כבר קורה. והשאלה היא אם זה נכון גם לכם. בואו להכיר, לראות ולבדוק מקרוב.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              {/* Primary CTA */}
              <button
                onClick={() => scrollToSection('#contact')}
                style={{
                  background: 'linear-gradient(135deg, #c2754a 0%, #d4906a 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '16px 36px',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: '0 8px 30px rgba(194,117,74,0.4), 0 2px 8px rgba(194,117,74,0.2), inset 0 1px 0 rgba(255,255,255,0.25)',
                  transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 14px 40px rgba(194,117,74,0.55), 0 4px 12px rgba(194,117,74,0.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(194,117,74,0.4), 0 2px 8px rgba(194,117,74,0.2), inset 0 1px 0 rgba(255,255,255,0.25)';
                }}
              >
                למפגש המשפחות הקרוב &gt;
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => scrollToSection('#testimonials')}
                style={{
                  background: 'rgba(255,255,255,0.35)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: '#2a4332',
                  border: '1.5px solid rgba(42,67,50,0.25)',
                  borderRadius: '50px',
                  padding: '16px 36px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.55)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.borderColor = 'rgba(42,67,50,0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.35)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(42,67,50,0.25)';
                }}
              >
                לסיפורים של משפחות
              </button>
            </motion.div>

          </div>
        </motion.div>

        {/* Layered Landscape at bottom with parallax */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 5,
            y: hillsY,
          }}
        >
          <HeroLandscape />
        </motion.div>

        {/* Seal bottom gap */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: '#1e3228',
          zIndex: 10,
        }} />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '1px' }}>
            גללו לגלות עוד
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)' }}
          />
        </motion.div>
      </section>
    </div>
  );
};