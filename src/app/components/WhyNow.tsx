import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { TrendingUp, Users, Leaf, Heart } from 'lucide-react';
import { BranchLinework, FloralBorder, CornerBotanical } from './BotanicalElements';
import { ImageWithFallback } from './figma/ImageWithFallback';
import HOUSE_IMG from '@/imports/4b8fdbae-ad78-49c0-b13b-88320eec281d.jpeg';

const reasons = [
  {
    icon: TrendingUp,
    title: 'תנופה אמיתית באזור',
    body: 'קריית שמונה נמצאת בתהליך פיתוח ממשלתי מואץ. פרויקטים חדשים, תשתיות, ותעסוקה — הכול קורה עכשיו, לא בעוד שנה.',
    color: '#4d7a5c',
    bg: 'rgba(77,122,92,0.08)',
    accent: '#c2754a',
  },
  {
    icon: Users,
    title: 'הזדמנות להצטרף בשלב משמעותי',
    body: 'משפחות שמגיעות היום מגיעות בזמן שהקהילה עדיין נבנית. יש כאן מקום לעצב, להשפיע ולהיות חלק מהסיפור.',
    color: '#3a6147',
    bg: 'rgba(58,97,71,0.08)',
    accent: '#c2754a',
  },
  {
    icon: Leaf,
    title: 'איכות חיים וקהילה',
    body: 'נוף, מרחב, אוויר — ופשוט יותר קל לחיות כאן. הילדים יש להם מרחב לצמוח, וההורים מרגישים פחות לחץ ויותר זמן.',
    color: '#5c7a5a',
    bg: 'rgba(92,122,90,0.08)',
    accent: '#c2754a',
  },
  {
    icon: Heart,
    title: 'חיבור לערכים, לאנשים ולמקום',
    body: 'קריית שמונה היא לא רק עיר — היא בית לאנשים עם ערכים משותפים. שייכות, עשייה קהילתית ואהבה למקום.',
    color: '#c2754a',
    bg: 'rgba(194,117,74,0.08)',
    accent: '#c2754a',
  },
];

export const WhyNow = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="why-now"
      ref={ref}
      style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #f8f3ea 0%, #eee4ce 50%, #f0e7d5 100%)',
        padding: '110px 24px 120px',
        overflow: 'hidden',
      }}
    >
      {/* Paper grain */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
      }} />

      {/* Decorative elements */}
      <div style={{ position: 'absolute', top: '60px', left: '4%', width: '200px', opacity: 0.15 }}>
        <CornerBotanical color="#2a4332" opacity={1} />
      </div>
      <div style={{ position: 'absolute', bottom: '80px', right: '3%', width: '180px', opacity: 0.12, transform: 'rotate(180deg)' }}>
        <CornerBotanical color="#c2754a" opacity={1} />
      </div>
      <div style={{ position: 'absolute', top: '40%', right: '2%', width: '200px', opacity: 0.1 }}>
        <BranchLinework color="#2a4332" opacity={1} />
      </div>

      {/* Large background circle */}
      <div style={{
        position: 'absolute',
        top: '-200px',
        right: '-200px',
        width: '700px',
        height: '700px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(42,67,50,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '70px' }}
        >
          <div style={{ marginBottom: '14px', display: 'flex' }}>
            <FloralBorder color="#6b8a5e" opacity={0.4} style={{ width: '240px' }} />
          </div>
          <div style={{
            display: 'inline-block',
            background: 'rgba(42,67,50,0.08)',
            borderRadius: '40px',
            padding: '5px 16px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#4d7a5c',
            letterSpacing: '0.5px',
            marginBottom: '16px',
          }}>
            ההזדמנות שלכם
          </div>
          <h2 style={{
            fontSize: 'clamp(34px, 4.5vw, 58px)',
            fontWeight: 800,
            color: '#1e2d27',
            lineHeight: 1.15,
            letterSpacing: '-1px',
            maxWidth: '600px',
          }}>
            למה דווקא עכשיו
          </h2>
        </motion.div>

        {/* Two column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '48px',
          alignItems: 'center',
        }} className="why-now-grid">
          {/* Left column - image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{ position: 'relative' }}
            className="why-now-image"
          >
            {/* Decorative frame */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '-16px',
              bottom: '-16px',
              left: '16px',
              borderRadius: '28px',
              background: 'rgba(42,67,50,0.12)',
              zIndex: 0,
            }} />
            <div style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(42,67,50,0.2)',
              zIndex: 1,
            }}>
              <ImageWithFallback
                src={HOUSE_IMG}
                alt="חיים חדשים בצפון"
                style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 50%, rgba(30,45,39,0.6) 100%)',
              }} />
              {/* Caption card */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                left: '20px',
                background: 'rgba(245,239,227,0.92)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '16px 20px',
                border: '1px solid rgba(255,255,255,0.6)',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e2d27' }}>
                  ״הגענו לגור. נשארנו לחיות.״
                </div>
                <div style={{ fontSize: '11px', color: '#6b8a5e', marginTop: '4px', fontWeight: 400 }}>
                  — מעל 200 משפחות בשנתיים האחרונות
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column - reasons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {reasons.map((reason, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 + 0.3 }}
                style={{
                  background: 'rgba(255,255,255,0.5)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.7)',
                  borderRadius: '20px',
                  padding: '24px 28px',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                  boxShadow: '0 4px 20px rgba(42,67,50,0.07)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(42,67,50,0.12)' }}
              >
                {/* Left accent line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  width: '3px',
                  background: `linear-gradient(to bottom, ${reason.color}, transparent)`,
                  borderRadius: '0 20px 20px 0',
                }} />

                {/* Icon */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: reason.bg,
                  border: `1px solid ${reason.color}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <reason.icon size={22} color={reason.color} />
                </div>

                {/* Text */}
                <div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#1e2d27',
                    marginBottom: '8px',
                    lineHeight: 1.3,
                  }}>
                    {reason.title}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#5a6e60',
                    lineHeight: 1.7,
                    fontWeight: 400,
                  }}>
                    {reason.body}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .why-now-image { display: none; }
          .why-now-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};