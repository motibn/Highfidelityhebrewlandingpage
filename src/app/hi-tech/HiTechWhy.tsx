import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Briefcase, Home, Users, Trees } from 'lucide-react';
import { HT, scrollToHiTechContact } from './tokens';

const points = [
  {
    icon: Briefcase,
    title: 'קריירה בהייטק',
    body: 'עבודה בחברות מובילות באזור — במשרד, היברידי או מרחוק — בלי לוותר על מסלול מקצועי.',
  },
  {
    icon: Trees,
    title: 'טבע מתחת לבית',
    body: 'נחלים, נוף ומרחב ירוק במרחק דקות מהעבודה. קצב חיים אחר, בלי להתנתק מהעולם.',
  },
  {
    icon: Users,
    title: 'קהילה חזקה',
    body: 'קהילת הייטק ומעבר שגדלה יחד — שייכות, עשייה והיכרות עם אנשים שמגיעים מאותו סיפור.',
  },
  {
    icon: Home,
    title: 'ליווי אישי למעבר',
    body: 'סיוע בתעסוקה, דיור והשתלבות חברתית — מהשיחה הראשונה ועד שמרגישים בבית.',
  },
];

export function HiTechWhy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="why"
      ref={ref}
      style={{
        background: `linear-gradient(180deg, ${HT.mint} 0%, ${HT.cream} 100%)`,
        padding: '88px 24px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48, maxWidth: 680, marginInline: 'auto' }}>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{
              fontFamily: HT.fontSans,
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              color: HT.greenDark,
              margin: '0 0 14px',
              lineHeight: 1.2,
            }}
          >
            למה הייטק בקריית שמונה?
          </motion.h2>
          <p
            style={{
              fontFamily: HT.fontSans,
              fontSize: 17,
              color: HT.muted,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            מחפשים את ההזדמנות הבאה בהייטק? כאן אפשר להמשיך לפתח קריירה וליהנות מחיים ירוקים,
            שקטים ומרווחים — עם ליווי אמיתי למעבר.
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
                  background: HT.white,
                  borderRadius: 20,
                  padding: '28px 24px',
                  border: `1px solid rgba(52,88,66,0.08)`,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: HT.mint,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: HT.greenDark,
                    marginBottom: 16,
                  }}
                >
                  <Icon size={22} strokeWidth={2} aria-hidden />
                </div>
                <h3
                  style={{
                    fontFamily: HT.fontSans,
                    fontSize: 20,
                    fontWeight: 700,
                    color: HT.greenDark,
                    margin: '0 0 8px',
                  }}
                >
                  {p.title}
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
                  {p.body}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <button
            type="button"
            onClick={scrollToHiTechContact}
            style={{
              background: HT.greenDark,
              color: HT.white,
              border: 'none',
              borderRadius: 999,
              padding: '14px 30px',
              fontFamily: HT.fontSans,
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
