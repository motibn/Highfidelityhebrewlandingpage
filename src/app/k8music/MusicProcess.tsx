import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { KM, scrollToMusicContact } from './tokens';

const steps = [
  {
    n: '01',
    title: 'משאירים פרטים',
    body: 'ממלאים את הטופס — פחות משתי דקות. בלי התחייבות, בלי לחץ.',
  },
  {
    n: '02',
    title: 'שיחת היכרות',
    body: 'נציג חוזר לשיחה קצרה על הרקע המוזיקלי, המשפחה, והמעבר לצפון.',
  },
  {
    n: '03',
    title: 'יום מתעניינים',
    body: 'סופ״ש של סיור בעיר, ג׳אם על הבמה, טיול בנחל ושיחות אל תוך הלילה — אצל משפחות מהקהילה.',
  },
  {
    n: '04',
    title: 'ליווי עד שמרגישים בבית',
    body: 'חיבור לדיור, לחינוך ולילדים, למשרות ולקהילה — גם אחרי המעבר.',
  },
];

export function MusicProcess() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="process"
      ref={ref}
      style={{
        background: KM.white,
        padding: '88px 24px',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p
            style={{
              fontFamily: KM.fontScript,
              fontSize: 22,
              color: KM.terracotta,
              margin: '0 0 8px',
            }}
          >
            איך זה עובד
          </p>
          <h2
            style={{
              fontFamily: KM.fontSans,
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              color: KM.greenDark,
              margin: 0,
            }}
          >
            איך מצטרפים
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
                background: KM.cream,
                borderRadius: 18,
                padding: '22px 24px',
              }}
            >
              <span
                style={{
                  fontFamily: KM.fontSans,
                  fontSize: 28,
                  fontWeight: 900,
                  color: KM.greenSage,
                  lineHeight: 1,
                }}
              >
                {s.n}
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: KM.fontSans,
                    fontSize: 20,
                    fontWeight: 700,
                    color: KM.greenDark,
                    margin: '0 0 6px',
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: KM.fontSans,
                    fontSize: 15,
                    color: KM.muted,
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
            onClick={scrollToMusicContact}
            style={{
              background: KM.plum,
              color: KM.white,
              border: 'none',
              borderRadius: 999,
              padding: '14px 30px',
              fontFamily: KM.fontSans,
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
