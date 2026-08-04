import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { HT, scrollToHiTechContact } from './tokens';

const ITEMS = [
  {
    q: 'למי מיועדת קהילת ההייטק בקריית שמונה?',
    a: 'לאנשי ונשות הייטק, משפחות ויחידים שמחפשים הזדמנות תעסוקתית בחברות מובילות — יחד עם איכות חיים, קהילה וליווי למעבר לצפון.',
  },
  {
    q: 'אילו חברות פועלות באזור?',
    a: 'בין היתר פועלות באזור חברות כמו NVIDIA, Genpact, BMC Software, Elbit Systems ו-Shamir. נשמח לעדכן על הזדמנויות רלוונטיות לפי הרקע שלכם.',
  },
  {
    q: 'האם אפשר לעבוד היברידי או מרחוק?',
    a: 'כן — בהתאם למעסיק ולתפקיד. רבים משלבים עבודה במשרד / היברידית עם מגורים בקריית שמונה וסביבתה.',
  },
  {
    q: 'איזה ליווי מקבלים במעבר?',
    a: 'ליווי אישי שכולל כיוון תעסוקתי, פתרונות דיור והשתלבות קהילתית — מהשיחה הראשונה ועד שמרגישים בבית.',
  },
  {
    q: 'איך מתחילים?',
    a: 'משאירים פרטים בטופס בדף — ונציג חוזר לשיחה קצרה וללא התחייבות, או לתיאום מפגש אישי.',
  },
];

export function HiTechFaq() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      ref={ref}
      style={{
        background: `linear-gradient(160deg, ${HT.mint} 0%, #EEF4EA 100%)`,
        padding: '88px 24px',
      }}
    >
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: HT.fontSans,
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 800,
            color: HT.greenDark,
            textAlign: 'center',
            margin: '0 0 36px',
          }}
        >
          שאלות נפוצות
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.05 * i }}
                style={{
                  background: HT.white,
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: `1px solid rgba(52,88,66,0.08)`,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    padding: '18px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: HT.fontSans,
                    fontSize: 16,
                    fontWeight: 700,
                    color: HT.greenDark,
                    textAlign: 'right',
                  }}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    size={20}
                    style={{
                      flexShrink: 0,
                      color: isOpen ? HT.plum : HT.greenMid,
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.25s ease',
                    }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p
                        style={{
                          fontFamily: HT.fontSans,
                          fontSize: 15,
                          color: HT.muted,
                          lineHeight: 1.7,
                          margin: 0,
                          padding: '0 20px 18px',
                        }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button
            type="button"
            onClick={scrollToHiTechContact}
            style={{
              background: 'transparent',
              color: HT.plum,
              border: `2px solid ${HT.plum}`,
              borderRadius: 999,
              padding: '12px 26px',
              fontFamily: HT.fontSans,
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            עוד שאלות? דברו איתנו
          </button>
        </div>
      </div>
    </section>
  );
}
