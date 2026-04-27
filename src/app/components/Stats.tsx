import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Home, Hammer, Clock, BookOpen } from 'lucide-react';

const stats = [
  {
    icon: Home,
    number: 30,
    suffix: '',
    prefix: 'כ-',
    displayText: null as string | null,
    label: 'משפחות כבר עברו',
    desc: 'ומתחברות לקהילה גדלה',
    color: '#4d7a5c',
    accent: 'rgba(77,122,92,0.1)',
  },
  {
    icon: Hammer,
    number: 0,
    suffix: '',
    prefix: '',
    displayText: 'מ-750,000 ₪' as string | null,
    label: 'דירות 3 חדרים',
    desc: 'מחירים שעדיין אפשריים',
    color: '#c2754a',
    accent: 'rgba(194,117,74,0.1)',
  },
  {
    icon: BookOpen,
    number: 0,
    suffix: '',
    prefix: '',
    displayText: '✓' as string | null,
    label: 'הטבות מס לתושבי האזור',
    desc: 'לפי החוק',
    color: '#7a5538',
    accent: 'rgba(122,85,56,0.1)',
  },
  {
    icon: Clock,
    number: 10,
    suffix: '',
    prefix: 'כ-',
    displayText: null as string | null,
    label: 'דקות מהבניאס ותל דן',
    desc: 'טבע פראי בדלת הבית',
    color: '#3a6147',
    accent: 'rgba(58,97,71,0.1)',
  },
];

const useCounter = (end: number, isInView: boolean, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);
  return count;
};

const StatCard = ({ stat, index, isInView }: { stat: typeof stats[0]; index: number; isInView: boolean }) => {
  const count = useCounter(stat.number, isInView);

  const isPrice = stat.displayText && stat.displayText.includes('₪');
  const isCheck = stat.displayText === '✓';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="w-full sm:w-auto"
      style={{
        flex: '1 1 220px',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '24px',
        padding: 'clamp(20px, 4vw, 36px) clamp(16px, 3vw, 28px)',
        textAlign: 'center',
        boxShadow: '0 8px 40px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        top: '-30px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
        filter: 'blur(20px)',
        pointerEvents: 'none',
      }} />

      {/* Top accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '25%',
        right: '25%',
        height: '3px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
        borderRadius: '0 0 3px 3px',
      }} />

      {/* Icon */}
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.15)',
        border: '1px solid rgba(255,255,255,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        position: 'relative',
        zIndex: 1,
      }}>
        <stat.icon size={24} color="white" />
      </div>

      {/* Fixed-height value area — keeps all cards aligned */}
      <div style={{
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '12px',
        position: 'relative',
        zIndex: 1,
      }}>
        {isCheck ? (
          // Tax benefits — badge style
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255,255,255,0.15)',
            border: '1.5px solid rgba(255,255,255,0.3)',
            borderRadius: '40px',
            padding: '10px 20px',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7.5" stroke="white" strokeWidth="1.2" />
              <path d="M4.5 8.5L6.5 10.5L11.5 5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>זכאות מלאה</span>
          </div>
        ) : isPrice ? (
          // Price card — two-line display
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.65)',
              marginBottom: '4px',
              letterSpacing: '0.3px',
            }}>
              החל מ-
            </div>
            <div style={{
              fontSize: 'clamp(28px, 3vw, 38px)',
              fontWeight: 900,
              color: 'white',
              lineHeight: 1,
              letterSpacing: '-1px',
            }}>
              750,000 ₪
            </div>
          </div>
        ) : (
          // Counter cards
          <div style={{
            fontSize: 'clamp(42px, 5vw, 60px)',
            fontWeight: 900,
            color: 'white',
            lineHeight: 1,
            letterSpacing: '-2px',
          }}>
            {stat.prefix}{count}{stat.suffix}
          </div>
        )}
      </div>

      {/* Label */}
      <div style={{
        fontSize: '15px',
        fontWeight: 700,
        color: 'white',
        marginBottom: '6px',
        lineHeight: 1.3,
        position: 'relative',
        zIndex: 1,
      }}>
        {stat.label}
      </div>

      {/* Description */}
      <div style={{
        fontSize: '12px',
        color: 'rgba(255,255,255,0.6)',
        fontWeight: 400,
        position: 'relative',
        zIndex: 1,
      }}>
        {stat.desc}
      </div>
    </motion.div>
  );
};

export const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="stats"
      ref={ref}
      style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #2a4332 0%, #1e3228 60%, #2a4332 100%)',
        padding: '100px 24px 110px',
        overflow: 'hidden',
      }}
    >
      {/* Paper grain on dark */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
      }} />

      {/* Top edge */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ width: '100%', height: '70px', display: 'block' }}>
          <path d="M0,70 C300,10 600,50 900,20 C1100,5 1300,30 1440,15 L1440,0 L0,0 Z" fill="#f0e7d5" />
        </svg>
      </div>

      {/* Bottom edge */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ width: '100%', height: '70px', display: 'block' }}>
          <path d="M0,0 C300,60 700,15 1000,40 C1200,55 1350,20 1440,35 L1440,70 L0,70 Z" fill="#e8dcc8" />
        </svg>
      </div>

      {/* Background tree silhouettes */}
      <div style={{ position: 'absolute', bottom: '60px', right: '3%', opacity: 0.07 }}>
        <svg width="100" height="250" viewBox="0 0 80 200" fill="white">
          <rect x="34" y="155" width="12" height="45" rx="2" />
          <polygon points="40,10 22,58 58,58" />
          <polygon points="40,38 16,95 64,95" />
          <polygon points="40,68 10,140 70,140" />
          <polygon points="40,100 6,165 74,165" />
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: '60px', left: '5%', opacity: 0.06 }}>
        <svg width="80" height="200" viewBox="0 0 60 200" fill="white">
          <rect x="25" y="165" width="10" height="35" rx="2" />
          <polygon points="30,10 14,60 46,60" />
          <polygon points="30,42 8,110 52,110" />
          <polygon points="30,78 4,160 56,160" />
        </svg>
      </div>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '400px',
        background: 'radial-gradient(ellipse, rgba(194,117,74,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '40px',
            padding: '5px 16px',
            fontSize: '11px',
            fontWeight: 600,
            color: 'rgba(194,220,180,0.8)',
            letterSpacing: '0.5px',
            marginBottom: '16px',
          }}>
            בנתונים
          </div>
          <h2 style={{
            fontSize: 'clamp(30px, 4vw, 52px)',
            fontWeight: 800,
            color: '#f2e8d5',
            lineHeight: 1.15,
            letterSpacing: '-1px',
          }}>
            המספרים שמספרים את הסיפור
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Bottom CTA note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{ textAlign: 'center', marginTop: '56px' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '40px',
            padding: '12px 24px',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c2754a' }} />
            <span style={{ fontSize: '13px', color: 'rgba(242,232,213,0.75)', fontWeight: 500 }}>
              הנתונים מתעדכנים ברציפות · המקור: עיריית קריית שמונה ומשרד הבינוי
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};