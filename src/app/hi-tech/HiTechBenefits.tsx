import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { HT, scrollToHiTechContact } from './tokens';

const steps = [
  {
    n: '01',
    title: 'שיחת היכרות',
    body: 'משאירים פרטים — ונציג חוזר לשיחה קצרה על הרקע שלכם, התעסוקה והמעבר.',
  },
  {
    n: '02',
    title: 'התאמה לתעסוקה ודיור',
    body: 'ממפים הזדמנויות בחברות באזור, אפשרויות דיור ומה שחשוב למשפחה או ליחיד.',
  },
  {
    n: '03',
    title: 'היכרות עם הקהילה',
    body: 'סיור, מפגש וחיבור לאנשים שכבר כאן — כדי להרגיש אם זה באמת מתאים.',
  },
  {
    n: '04',
    title: 'ליווי עד שמרגישים בבית',
    body: 'תמיכה בהשתלבות, קהילה ותעסוקה גם אחרי המעבר.',
  },
];

export function HiTechBenefits() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="benefits"
      ref={ref}
      style={{
        background: HT.white,
        padding: '88px 24px',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p
            style={{
              fontFamily: HT.fontScript,
              fontSize: 22,
              color: HT.terracotta,
              margin: '0 0 8px',
            }}
          >
            איך זה עובד
          </p>
          <h2
            style={{
              fontFamily: HT.fontSans,
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              color: HT.greenDark,
              margin: 0,
            }}
          >
            מה מקבלים כשמצטרפים
          </h2>
        </div>

        <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '72px 1fr',
                gap: 16,
                alignItems: 'start',
                background: HT.cream,
                borderRadius: 18,
                padding: '22px 24px',
              }}
            >
              <span
                style={{
                  fontFamily: HT.fontSans,
                  fontSize: 28,
                  fontWeight: 900,
                  color: HT.greenSage,
                  lineHeight: 1,
                }}
              >
                {s.n}
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: HT.fontSans,
                    fontSize: 20,
                    fontWeight: 700,
                    color: HT.greenDark,
                    margin: '0 0 6px',
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: HT.fontSans,
                    fontSize: 15,
                    color: HT.muted,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {s.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button
            type="button"
            onClick={scrollToHiTechContact}
            style={{
              background: HT.plum,
              color: HT.white,
              border: 'none',
              borderRadius: 999,
              padding: '14px 30px',
              fontFamily: HT.fontSans,
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(168,92,128,0.3)',
            }}
          >
            השאירו פרטים ונחזור אליכם
          </button>
        </div>
      </div>
    </section>
  );
}
