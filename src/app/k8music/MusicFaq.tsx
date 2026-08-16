import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { KM, scrollToMusicContact } from './tokens';

const ITEMS = [
  {
    q: 'למי מיועדת קהילת המוזיקאים בקריית שמונה?',
    a: 'למוזיקאים ומוזיקאיות — בעיקר בני 22–35, וגם למשפחות של יוצרים — שמחפשים אולפן, במה וקהילה, יחד עם איכות חיים בצפון וליווי למעבר.',
  },
  {
    q: 'מה האולפן הקהילתי ולמי הוא פתוח?',
    a: 'אולפן מקצועי שמופעל במודל שיתופי על ידי חברי הקהילה. במקום לשלם מאות שקלים לשעה במרכז, חברי הקהילה יוצרים כאן במחיר קהילתי — כולל הפקות מקור משותפות.',
  },
  {
    q: 'יש עבודה למוזיקאים בקריית שמונה?',
    a: 'כן. רכז תעסוקה ממפה משרות מוזיקליות ותרבותיות בעיר — כולל הוראה במערכת החינוך — ומחבר אותן למעבר למגורים. בנוסף, רכז הפקות משבץ הופעות בשכר בתוך העיר ומחוצה לה.',
  },
  {
    q: 'מה עם משפחה וילדים?',
    a: 'המעבר כולל ליווי מול דיור ומוסדות חינוך. הרעיון הוא לגדל ילדים במקום ירוק ורגוע בלי לוותר על הקריירה המוזיקלית — קהילה, אולפן ובמה ליד הבית.',
  },
  {
    q: 'איך מתחילים?',
    a: 'משאירים פרטים בטופס בדף. נציג חוזר לשיחה קצרה וללא התחייבות, ואפשר לתאם יום מתעניינים: סיור, ג׳אם על הבמה וטיול בנחל.',
  },
];

export function MusicFaq() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', 'k8music-faq-jsonld');
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: ITEMS.map((item) => ({
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
      document.querySelector('script[data-seo="k8music-faq-jsonld"]')?.remove();
    };
  }, []);

  return (
    <section
      id="faq"
      ref={ref}
      style={{
        background: `linear-gradient(160deg, ${KM.mint} 0%, #EEF4EA 100%)`,
        padding: '88px 24px',
      }}
    >
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: KM.fontSans,
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 800,
            color: KM.greenDark,
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
                  background: KM.white,
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid rgba(52,88,66,0.08)',
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
                    fontFamily: KM.fontSans,
                    fontSize: 16,
                    fontWeight: 700,
                    color: KM.greenDark,
                    textAlign: 'right',
                  }}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    size={20}
                    style={{
                      flexShrink: 0,
                      color: isOpen ? KM.plum : KM.greenMid,
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
                          fontFamily: KM.fontSans,
                          fontSize: 15,
                          color: KM.muted,
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
            onClick={scrollToMusicContact}
            style={{
              background: 'transparent',
              color: KM.plum,
              border: `2px solid ${KM.plum}`,
              borderRadius: 999,
              padding: '12px 26px',
              fontFamily: KM.fontSans,
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
