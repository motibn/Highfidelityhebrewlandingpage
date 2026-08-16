import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Music2, Trees, Users, Home } from 'lucide-react';
import { KM, scrollToMusicContact } from './tokens';
import { StaffLines } from './MusicDecor';

const points = [
  {
    icon: Music2,
    title: 'סצנה שנבנית מאפס',
    body: 'לא מחכים שהסצנה תקרה בתל אביב. כאן מקימים קהילת מוזיקאים, אולפן ובמה — ואתם יכולים להיות מייסדים.',
  },
  {
    icon: Trees,
    title: 'טבע מתחת לבית',
    body: 'לכתוב בבוקר על שפת הנחל ולהופיע בערב מול קהל מחבק. קצב חיים אחר, בלי להתנתק מהעשייה.',
  },
  {
    icon: Users,
    title: 'קהילה, לא בדידות',
    body: 'עשרות אמנים ב-Hub שיתופי. ג׳אם, הפקות מקור וחברים שנשארים — במקום עוד חדר שינה בעיר הגדולה.',
  },
  {
    icon: Home,
    title: 'משפחה בלי לוותר על המוזיקה',
    body: 'מקום ירוק לגדל בו ילדים, משרה יציבה בחינוך, הטבות מס — וקהילה שדואגת גם לאולפן וגם לבמה.',
  },
];

export function MusicWhy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="why"
      ref={ref}
      style={{
        background: `linear-gradient(180deg, #EDE4D6 0%, ${KM.paper} 100%)`,
        padding: '88px 24px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48, maxWidth: 680, marginInline: 'auto' }}>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{
              fontFamily: KM.fontSans,
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              color: KM.ink,
              margin: '0 0 14px',
              lineHeight: 1.2,
            }}
          >
            למה מוזיקה בקריית שמונה?
          </motion.h2>
          <div style={{ maxWidth: 260, margin: '0 auto 16px' }}>
            <StaffLines color={KM.brass} opacity={0.25} />
          </div>
          <p
            style={{
              fontFamily: KM.fontSans,
              fontSize: 17,
              color: KM.muted,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            עזבו את מרוץ העכברים. כאן אפשר ליצור, להופיע ולגדל משפחה — עם ליווי אמיתי למעבר ולקהילה שנבנית עכשיו.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
          }}
        >
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
                style={{
                  background: KM.white,
                  borderRadius: 20,
                  padding: '28px 24px',
                  border: '1px solid rgba(42,33,24,0.08)',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: KM.paper,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: KM.brass,
                    marginBottom: 16,
                  }}
                >
                  <Icon size={22} strokeWidth={2} aria-hidden />
                </div>
                <h3
                  style={{
                    fontFamily: KM.fontSans,
                    fontSize: 20,
                    fontWeight: 700,
                    color: KM.ink,
                    margin: '0 0 8px',
                  }}
                >
                  {p.title}
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
                  {p.body}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <button
            type="button"
            onClick={scrollToMusicContact}
            style={{
              background: KM.amber,
              color: KM.white,
              border: 'none',
              borderRadius: 999,
              padding: '14px 30px',
              fontFamily: KM.fontSans,
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            למפגש אישי &gt;
          </button>
        </div>
      </div>
    </section>
  );
}
