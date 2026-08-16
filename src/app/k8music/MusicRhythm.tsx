import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { KM } from './tokens';
import { SoundWave } from './MusicDecor';

const days = [
  {
    n: 'שלישי',
    title: 'ג׳אם בפטיפון',
    body: 'מפגש קהילה וג׳אם פתוח במועדון הפטיפון — העוגן השבועי של מי שנושמים מוזיקה.',
  },
  {
    n: 'חמישי',
    title: 'במה בכיכר חרמון',
    body: 'הופעות חיות, חשיפת חומרים ובמה פתוחה. בירה, קהל מחבק, ומי שדואג לבוקינג.',
  },
  {
    n: 'שישי',
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
        background: KM.cream,
        padding: '88px 24px',
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p
            style={{
              fontFamily: KM.fontScript,
              fontSize: 22,
              color: KM.terracotta,
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
              color: KM.greenDark,
              margin: '0 0 16px',
            }}
          >
            השגרה של הסצנה
          </h2>
          <div style={{ maxWidth: 220, margin: '0 auto' }}>
            <SoundWave color={KM.greenSage} opacity={0.5} />
          </div>
        </div>

        <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {days.map((d, i) => (
            <motion.li
              key={d.n}
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(88px, auto) 1fr',
                gap: 16,
                alignItems: 'start',
                background: KM.white,
                borderRadius: 18,
                padding: '22px 24px',
                border: '1px solid rgba(52,88,66,0.08)',
              }}
            >
              <span
                style={{
                  fontFamily: KM.fontSans,
                  fontSize: 16,
                  fontWeight: 800,
                  color: KM.plum,
                  lineHeight: 1.3,
                  paddingTop: 2,
                }}
              >
                {d.n}
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
