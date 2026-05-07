import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FloralBorder, LeafCluster, BranchLinework } from './BotanicalElements';

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: 'כמה עולה דירה בקריית שמונה?',
    a:
      'לפי הנתונים המוצגים באתר, דירות 3 חדרים מתחילות מכ־750,000 ₪. המחיר הסופי תלוי בפרויקט, בגודל הדירה ובמיקום. מומלץ להשאיר פרטים בטופס יצירת הקשר לקבלת מידע עדכני ומותאם למצבכם.',
  },
  {
    q: 'אילו הטבות מס קיימות למעבר לצפון?',
    a:
      'באתר מצוין כי יש זכאות להטבות מס באזור—כולל קבוצות יעד בערים קבועות כמו קריית שמונה. הפרטים משתנים לפי חוק, שנת מס וזכאות אישית. השאירו פרטים ונחזור אליכם עם כיוון והפניה למקורות רשמיים.',
  },
  {
    q: 'איך מתחילים את תהליך המעבר לקריית שמונה?',
    a:
      'התהליך כולל פרטים ראשוניים, סיור והיכרות עם העיר, התאמה לצרכי המשפחה, והמשך ליווי. זה בדיוק מה שמופיע בקטע "הבחירה להתקדם" בדף הבית—אפשר להתחיל בטופס "השאירו פרטים" או בבקשה למפגש מתעניינים.',
  },
  {
    q: 'למה לבחור בקריית שמונה במיוחד עם משפחה?',
    a:
      'מעל ל־200 משפחות הצטרפו בשנתיים האחרונות, קהילה צומחת, איכות חיים גבוהה וקרבה לטבע (למשל באזור הבניאס ותל דן תוך כ־10 דקות לפי הנתון באתר). זו בחירה שמשלבת דיור נגיש, קהילה ופיתוח אזורי.',
  },
  {
    q: 'איך יוצרים קשר עם צוות הפרויקט?',
    a:
      'באפשרותך למלא את טופס יצירת הקשר בדף הבית, או לכתוב לכתובת info@ks-north.co.il. נשמח לחזור אליכם ולתאם מפגש או סיור.',
  },
];

export const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', 'faq-jsonld');
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    });
    document.head.appendChild(script);

    return () => {
      document.querySelector('script[data-seo="faq-jsonld"]')?.remove();
    };
  }, []);

  return (
    <section
      id="faq"
      ref={ref}
      style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #f8f3ea 0%, #eee4ce 50%, #f0e7d5 100%)',
        padding: '110px 24px 120px',
        overflow: 'hidden',
      }}
      className="faq-section"
      aria-labelledby="faq-heading"
    >
      {/* Paper grain */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
      }} />

      {/* Botanical decor */}
      <div style={{ position: 'absolute', top: '70px', right: '3%', width: '160px', opacity: 0.12, pointerEvents: 'none' }}>
        <LeafCluster color="#5c7a5a" opacity={1} />
      </div>
      <div style={{ position: 'absolute', bottom: '90px', left: '3%', width: '150px', opacity: 0.1, pointerEvents: 'none', transform: 'scaleX(-1)' }}>
        <LeafCluster color="#c2754a" opacity={1} />
      </div>
      <div style={{ position: 'absolute', top: '38%', left: '4%', width: '180px', opacity: 0.1, pointerEvents: 'none' }}>
        <BranchLinework color="#2a4332" opacity={1} />
      </div>

      {/* Soft ambient circle */}
      <div style={{
        position: 'absolute',
        top: '-220px',
        right: '-220px',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(42,67,50,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '880px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
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
            כל מה שרציתם לדעת
          </div>
          <h2
            id="faq-heading"
            style={{
              fontSize: 'clamp(30px, 4.2vw, 52px)',
              fontWeight: 800,
              color: '#1e2d27',
              lineHeight: 1.15,
              letterSpacing: '-1px',
              marginBottom: '14px',
            }}
          >
            שאלות נפוצות
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.6vw, 17px)',
            color: '#4a5e50',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto',
            fontWeight: 400,
          }}>
            ריכזנו לכם את התשובות לשאלות שהכי מטרידות משפחות לפני המעבר. לא מצאתם תשובה?{' '}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              style={{ color: '#c2754a', fontWeight: 600, textDecoration: 'none' }}
            >
              השאירו פרטים
            </a>
            {' '}ונחזור אליכם.
          </p>
        </motion.div>

        {/* Accordion list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.07 + 0.15 }}
                style={{
                  background: isOpen ? 'rgba(255,255,255,0.85)' : 'rgba(250,247,242,0.7)',
                  border: `1px solid ${isOpen ? 'rgba(42,67,50,0.18)' : 'rgba(42,67,50,0.1)'}`,
                  borderRadius: '18px',
                  overflow: 'hidden',
                  boxShadow: isOpen
                    ? '0 12px 32px rgba(42,67,50,0.08)'
                    : '0 2px 10px rgba(42,67,50,0.04)',
                  transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.3s ease',
                }}
              >
                <button
                  type="button"
                  id={`faq-q-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="faq-question"
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '20px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    textAlign: 'right',
                    fontFamily: 'inherit',
                    color: '#1e2d27',
                    fontSize: 'clamp(15px, 1.6vw, 18px)',
                    fontWeight: 700,
                    lineHeight: 1.45,
                    minHeight: '60px',
                  }}
                >
                  <span style={{ flex: 1, minWidth: 0 }}>{item.q}</span>
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: isOpen ? 'rgba(194,117,74,0.12)' : 'rgba(42,67,50,0.08)',
                      color: isOpen ? '#c2754a' : '#4d7a5c',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease, background 0.25s ease, color 0.25s ease',
                    }}
                  >
                    <ChevronDown size={18} strokeWidth={2.2} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          padding: '0 22px 22px',
                          borderTop: '1px solid rgba(42,67,50,0.08)',
                          marginTop: '-1px',
                        }}
                      >
                        <p style={{
                          fontSize: 'clamp(14px, 1.5vw, 16px)',
                          lineHeight: 1.8,
                          color: '#4a5e50',
                          margin: '16px 0 0',
                          fontWeight: 400,
                        }}>
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq-question:hover {
          background: rgba(42,67,50,0.03) !important;
        }
        .faq-question:focus-visible {
          outline: 2px solid #c2754a;
          outline-offset: -2px;
        }
        @media (max-width: 640px) {
          .faq-section {
            padding: 80px 16px 90px !important;
          }
          .faq-question {
            padding: 16px 18px !important;
            min-height: 56px !important;
          }
        }
      `}</style>
    </section>
  );
};
