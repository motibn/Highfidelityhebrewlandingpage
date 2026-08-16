import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { KM } from './tokens';
import { SoundWave, StaffLines } from './MusicDecor';

const days = [
  {
    n: '01',
    day: 'שלישי',
    title: 'ג׳אם בפטיפון',
    body: 'מפגש קהילה וג׳אם פתוח במועדון הפטיפון — העוגן השבועי של מי שנושמים מוזיקה.',
  },
  {
    n: '02',
    day: 'חמישי',
    title: 'במה בכיכר חרמון',
    body: 'הופעות חיות, חשיפת חומרים ובמה פתוחה. בירה, קהל מחבק, ומי שדואג לבוקינג.',
  },
  {
    n: '03',
    day: 'שישי',
    title: 'נחל וחזון',
    body: 'לכתוב שיר בבוקר על שפת הנחל, ואז שיחת עומק על בניית עיר מוזיקלית — לא חלום, זו קריית שמונה.',
  },
];

export function MusicRhythm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="rhythm"
      ref={ref}
      style={{
        background: KM.paper,
        padding: '88px 24px',
      }}
    >
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <p
            style={{
              fontFamily: KM.fontScript,
              fontSize: 22,
              color: KM.amber,
              margin: '0 0 8px',
            }}
          >
            איך נראית השבוע
          </p>
          <h2
            style={{
              fontFamily: KM.fontSans,
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              color: KM.ink,
              margin: '0 0 12px',
            }}
          >
            השגרה של הסצנה
          </h2>
          <div style={{ maxWidth: 280, margin: '0 auto 10px' }}>
            <StaffLines color={KM.brass} opacity={0.28} />
          </div>
          <div style={{ maxWidth: 220, margin: '0 auto' }}>
            <SoundWave color={KM.plum} opacity={0.5} />
          </div>
        </div>

        <ol
          style={{
            listStyle: 'none',
            margin: '36px 0 0',
            padding: '8px 0',
            background: KM.white,
            borderRadius: 20,
            border: `1px solid rgba(176,137,104,0.28)`,
            boxShadow: '0 12px 32px rgba(42,33,24,0.06)',
          }}
        >
          {days.map((d, i) => (
            <motion.li
              key={d.n}
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '64px 1fr',
                gap: 12,
                alignItems: 'start',
                padding: '22px 28px',
                borderBottom: i < days.length - 1 ? `1px solid rgba(176,137,104,0.22)` : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: KM.fontSans,
                  fontSize: 15,
                  fontWeight: 800,
                  color: KM.amber,
                  lineHeight: 1.4,
                  letterSpacing: '0.04em',
                }}
              >
                {d.n}
                <span style={{ display: 'block', fontSize: 12, fontWeight: 600, color: KM.brass, marginTop: 2 }}>
                  {d.day}
                </span>
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: KM.fontSans,
                    fontSize: 20,
                    fontWeight: 700,
                    color: KM.ink,
                    margin: '0 0 6px',
                  }}
                >
                  {d.title}
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
                  {d.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
