import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { PenLine, CalendarDays, ScanSearch, Handshake } from 'lucide-react';
import { FloralBorder, LeafCluster } from './BotanicalElements';

const steps = [
  {
    num: '01',
    icon: PenLine,
    title: 'משאירים פרטים',
    body: 'ממלאים את הטופס המהיר — פחות מ-2 דקות. בלי התחייבות, בלי לחץ.',
    desc: 'שיחה קצרה להיכרות ראשונית',
    color: '#4d7a5c',
    bg: 'rgba(77,122,92,0.1)',
  },
  {
    num: '02',
    icon: CalendarDays,
    title: 'קובעים סיור',
    body: 'מגיעים לראות את העיר והאפשרויות.',
    desc: 'מגיעים לראות את העיר והאפשרויות',
    color: '#c2754a',
    bg: 'rgba(194,117,74,0.1)',
  },
  {
    num: '03',
    icon: ScanSearch,
    title: 'בודקים התאמה',
    body: 'מבינים אם זה נכון לכם.',
    desc: 'מבינים אם זה נכון לכם',
    color: '#3a6147',
    bg: 'rgba(58,97,71,0.1)',
  },
  {
    num: '04',
    icon: Handshake,
    title: 'מתקדמים יחד',
    body: 'בליווי מלא, בקצב שלכם.',
    desc: 'בליווי מלא, בקצב שלכם',
    color: '#7a5538',
    bg: 'rgba(122,85,56,0.1)',
  },
];

export const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="process"
      ref={ref}
      style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #e8dcc8 0%, #f0e8d6 50%, #e6dac6 100%)',
        padding: '110px 24px 120px',
        overflow: 'hidden',
      }}
    >
      {/* Paper grain */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
      }} />

      {/* Botanical decor */}
      <div style={{ position: 'absolute', top: '60px', right: '3%', width: '160px', opacity: 0.12 }}>
        <LeafCluster color="#5c7a5a" opacity={1} />
      </div>
      <div style={{ position: 'absolute', bottom: '80px', left: '3%', width: '140px', opacity: 0.1 }}>
        <LeafCluster color="#c2754a" opacity={1} />
      </div>

      {/* Background hills silhouette */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, opacity: 0.06, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ width: '100%', height: '200px', display: 'block' }}>
        </svg>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '35px' }}
        >
          <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'center' }}>
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
            פשוט להתחיל
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontWeight: 800,
            color: '#1e2d27',
            lineHeight: 1.15,
            letterSpacing: '-1px',
            marginBottom: '10px',
          }}>
            הבחירה להתקדם
          </h2>
        </motion.div>

        {/* Steps with horizontal curved journey */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', overflowX: 'auto', overflowY: 'visible' }}>
          <div style={{ position: 'relative', minWidth: '680px', height: '320px', direction: 'rtl' }}>

            {/* Curved SVG journey path — mirrored for RTL */}
            <svg
              viewBox="0 0 100 320"
              preserveAspectRatio="none"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
            >
              <path
                d="M 87.5,83 C 80,115 72,141 62.5,173 C 53,141 47,115 37.5,83 C 30,115 20,141 12.5,173"
                fill="none"
                stroke="#b8c4bb"
                strokeWidth="0.8"
                strokeDasharray="1.5 5"
                strokeLinecap="round"
              />
            </svg>

            {/* Step columns */}
            <div style={{ display: 'flex', height: '100%', position: 'relative', zIndex: 1 }}>
              {steps.map((step, i) => {
                const StepIcon = step.icon;
                const isTop = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: isTop ? -24 : 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.75, delay: i * 0.16 + 0.2 }}
                    style={{ flex: 1, position: 'relative' }}
                  >
                    {(() => {
                      const lineYs = [80, 170, 80, 170];
                      const lineY = lineYs[i];
                      const pinTop = lineY - 70;
                      const textTop = pinTop + 72 + 20;

                      return (
                        <>
                          {/* Checkpoint — outlined icon + number badge, no pin shell */}
                          <div style={{
                            position: 'absolute',
                            top: `${pinTop}px`,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 3,
                          }}>
                            <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                              {/* Icon circle */}
                              <div style={{
                                width: '52px',
                                height: '52px',
                                borderRadius: '50%',
                                border: `2px solid ${step.color}`,
                                background: `${step.color}12`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: `0 6px 20px ${step.color}30`,
                              }}>
                                <StepIcon size={22} color={step.color} strokeWidth={1.8} />
                              </div>
                              {/* Step number badge */}
                              <div style={{
                                position: 'absolute',
                                top: '-8px',
                                left: '-8px',
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                background: step.color,
                                border: '2.5px solid #e8dcc8',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '9px',
                                fontWeight: 900,
                                color: 'white',
                                fontFamily: 'system-ui, sans-serif',
                              }}>
                                {i + 1}
                              </div>
                            </div>
                          </div>

                          {/* Text — anchored just below its own checkpoint */}
                          <div style={{
                            position: 'absolute',
                            top: `${textTop}px`,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 'calc(100% - 16px)',
                            textAlign: 'center',
                          }}>
                            <div style={{ fontSize: '17px', fontWeight: 700, color: step.color, marginBottom: '6px', lineHeight: 1.25 }}>
                              {step.title}
                            </div>
                            <p style={{ fontSize: '14.5px', color: '#5a6e60', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                          </div>
                        </>
                      );
                    })()}
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: '40px' }}
        >
          <p style={{ fontSize: '16px', color: '#4a5e50', marginBottom: '24px', fontWeight: 400 }}>
            מוכנים להתחיל? השלב הראשון קצר ופשוט.
          </p>
          <button
            onClick={() => {
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              background: 'linear-gradient(135deg, #2a4332, #4d7a5c)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '16px 40px',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: '0 8px 28px rgba(42,67,50,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 14px 40px rgba(42,67,50,0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(42,67,50,0.3), inset 0 1px 0 rgba(255,255,255,0.15)';
            }}
          >
            אני רוצה להתחיל
          </button>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-step { margin-top: 0 !important; }
          .process-path { display: none; }
        }
      `}</style>
    </section>
  );
};
