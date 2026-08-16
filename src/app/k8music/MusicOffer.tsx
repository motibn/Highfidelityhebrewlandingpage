import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Music2, AudioLines, Briefcase, Disc3, Radio } from 'lucide-react';
import { KM } from './tokens';
import { StaffLines } from './MusicDecor';

const offers = [
  {
    icon: Music2,
    title: 'אולפן קהילתי',
    body: 'אולפן מקצועי במודל שיתופי — במקום 300 ₪ לשעה במרכז, כאן יוצרים באולפן בשווי מאות אלפי שקלים במחיר קהילתי.',
  },
  {
    icon: Radio,
    title: 'במת כיכר חרמון',
    body: 'במת הופעות קבועה בלב העיר. ימי חמישי — ערבי חשיפה, במה פתוחה ומרחב ביטוי למוזיקאים חדשים וותיקים.',
  },
  {
    icon: AudioLines,
    title: 'מועדון הפטיפון',
    body: 'ג׳אם פתוח ומפגשי קהילה קבועים בימי שלישי — העוגן החברתי של הסצנה, לא עוד יצירה לבד בחדר שינה.',
  },
  {
    icon: Briefcase,
    title: 'משרות בחינוך ובתרבות',
    body: 'רכז תעסוקה שממפה משרות מוזיקליות ותרבותיות בעיר — כולל הוראה במערכת החינוך — ומחבר אותן למעבר למגורים כאן.',
  },
  {
    icon: Disc3,
    title: 'הפקות מקור',
    body: 'אלבומים ופרויקטים משותפים באולפן הקהילתי. רכז הפקות ובוקינג שמשבץ הופעות בשכר בתוך העיר ומחוצה לה.',
  },
];

export function MusicOffer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="offer"
      ref={ref}
      style={{
        background: KM.white,
        padding: '72px 24px 64px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48, maxWidth: 680, marginInline: 'auto' }}>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: KM.fontSans,
              fontSize: 'clamp(24px, 3.5vw, 36px)',
              fontWeight: 800,
              color: KM.ink,
              lineHeight: 1.3,
              margin: '0 0 12px',
            }}
          >
            מה מחכה לכם בקהילה
          </motion.h2>
          <div style={{ maxWidth: 240, margin: '0 auto 12px' }}>
            <StaffLines color={KM.brass} opacity={0.25} />
          </div>
          <p
            style={{
              fontFamily: KM.fontSans,
              fontSize: 16,
              color: KM.muted,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            תשתית יצירה, במה חיה ומשרות — לא עוד מרוץ עכברים במרכז
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
          }}
        >
          {offers.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.07 * i }}
                style={{
                  background: KM.paper,
                  borderRadius: 20,
                  padding: '28px 24px',
                  border: '1px solid rgba(176,137,104,0.28)',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: 'rgba(176,137,104,0.16)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: KM.amber,
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
                  {item.title}
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
                  {item.body}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
