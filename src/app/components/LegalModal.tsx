import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { X } from 'lucide-react';

export type LegalDocType = 'terms' | 'privacy' | 'accessibility';

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export type LegalDocument = {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
};

/** Placeholder — replace after legal review */
export const TERMS_CONTENT: LegalDocument = {
  title: 'תנאי שימוש',
  lastUpdated: 'עודכן לאחרונה: מאי 2026',
  sections: [
    {
      heading: 'כללי',
      paragraphs: [
        'ברוכים הבאים לאתר מרכזה צפון (להלן: "האתר"). השימוש באתר כפוף לתנאים המפורטים להלן. אם אינכם מסכימים לתנאים — הנכם מתבקשים שלא לעשות שימוש באתר.',
        'האתר מספק מידע כללי בנוגע לפרויקט קהילתי וליווי משפחות המעוניינות במידע על מעבר לצפון ולקריית שמונה. המידע אינו מהווה ייעוץ משפטי, מס או פיננסי, אלא כללי בלבד.',
      ],
    },
    {
      heading: 'שימוש מותר',
      paragraphs: [
        'מותר לגלוש באתר, לצפות בתכנים ולשלוח פניות באמצעות טופס יצירת הקשר, ובלבד שהשימוש יהיה לגיטימי, שלא יפר זכויות צד שלישי ושלא יפגע בתפקוד האתר או באבטחתו.',
        'אסור להעתיק, לשכפל, למכור או לעשות שימוש מסחרי בתכני האתר ללא הסכמה מראש ובכתב מ-מרכזה צפון, למעט שימוש אישי ולא מסחרי סביר.',
      ],
    },
    {
      heading: 'קניין רוחני',
      paragraphs: [
        'זכויות היוצרים, סימני המסחר, העיצוב, הטקסטים, התמונות והקוד באתר שייכים ל-מרכזה צפון או לצדדים שלישיים שהעניקו רישיון. אין להסיר הודעות זכויות יוצרים או קרדיטים מהאתר.',
      ],
    },
    {
      heading: 'אחריות',
      paragraphs: [
        'האתר והתכנים בו מוצגים "כמות שהם" (AS IS). אנו משתדלים לעדכן מידע, אך ייתכנו טעויות או אי-עדכון. השימוש באתר הוא באחריות המשתמש בלבד.',
        'אנו לא נהיה אחראים לכל נזק ישיר או עקיף הנובע מהסתמכות על מידע באתר, מתקלות טכניות, או משימוש בקישורים לאתרים חיצוניים.',
      ],
    },
    {
      heading: 'שינויים בתנאים',
      paragraphs: [
        'אנו רשאים לעדכן את תנאי השימוש מעת לעת. המשך שימוש באתר לאחר פרסום השינוי מהווה הסכמה לתנאים המעודכנים. מומלץ לעיין בעמוד זה מעת לעת.',
      ],
    },
    {
      heading: 'דין ושיפוט',
      paragraphs: [
        'על תנאים אלה יחולו דיני מדינת ישראל בלבד. סמכות השיפוט הבלעדית בכל מחלוקת הנוגעת לאתר תהיה בבתי המשפט המוסמכים בישראל.',
      ],
    },
    {
      heading: 'יצירת קשר',
      paragraphs: [
        'לשאלות בנוגע לתנאי השימוש ניתן לפנות ל-מרכזה צפון בכתובת שדרות תל חי 98, קרית שמונה או במייל Info@north-il.center.',
      ],
    },
  ],
};

/** Placeholder — replace after legal review */
export const PRIVACY_CONTENT: LegalDocument = {
  title: 'מדיניות פרטיות',
  lastUpdated: 'עודכן לאחרונה: מאי 2026',
  sections: [
    {
      heading: 'מבוא',
      paragraphs: [
        'אנו ב-מרכזה צפון (להלן: "אנחנו") מכבדים את פרטיותכם. מדיניות זו מסבירה אילו מידעים אנו עשויים לאסוף בעת השימוש באתר ובטופס יצירת הקשר, וכיצד אנו משתמשים בהם.',
        'השימוש באתר מהווה הסכמה למדיניות זו, בכפוף לזכויותיכם על פי דין.',
      ],
    },
    {
      heading: 'איזה מידע נאסוף',
      paragraphs: [
        'בעת מילוי טופס "השארת פרטים" / הרשמה באתר, ייתכן שנאסוף פרטים כגון: שם מלא, מספר טלפון, כתובת דוא"ל, והודעה חופשית שתבחרו לצרף — בהתאם לשדות הטופס.',
        'בנוסף, שרתי האחסון והאנליטיקה של האתר עשויים לאסוף מידע טכני אוטומטי (כגון כתובת IP, סוג דפדפן, מערכת הפעלה וזמני גישה), לצורכי אבטחה ושיפור השירות.',
      ],
    },
    {
      heading: 'מטרות השימוש במידע',
      paragraphs: [
        'נשתמש במידע שתמסרו כדי ליצור עמכם קשר, לענות על פניות, לתאם מפגשים או סיורים, ולשלוח עדכונים רלוונטיים לפרויקט — ובהתאם להסכמתכם ובכפוף לדין.',
        'לא נשתמש במידע למטרות שאינן תואמות את מטרת הפנייה, אלא אם קיבלנו את הסכמתכם או אם הדין מחייב אחרת.',
      ],
    },
    {
      heading: 'שיתוף עם צדדים שלישיים',
      paragraphs: [
        'ייתכן שנעביר מידע לספקי שירות הפועלים מטעמנו (למשל: אחסון אתר, שליחת מיילים, או ספק טופסים חיצוני המוטמע באתר), ובלבד שהם מחויבים לסודיות ולאבטחת מידע.',
        'לא נמכור את פרטיכם לצדדים שלישיים לשיווק ישיר שלהם. שיתוף נוסף ייעשה רק ככל שהדין מחייב או בהסכמתכם.',
      ],
    },
    {
      heading: 'עוגיות (Cookies)',
      paragraphs: [
        'האתר עשוי להשתמש בעוגיות או בטכנולוגיות דומות לצורך תפקוד תקין, אבטחה, סטטיסטיקה או העדפות. ניתן לנהל חלק מהעוגיות בהגדרות הדפדפן.',
      ],
    },
    {
      heading: 'אבטחת מידע',
      paragraphs: [
        'אנו נוקטים באמצעים סבירים להגנה על המידע. עם זאת, אין מערכת חסינה לחלוטין; העברת מידע באינטרנט כרוכה בסיכון מסוים.',
      ],
    },
    {
      heading: 'זכויות נושא המידע',
      paragraphs: [
        'בהתאם לחוק הגנת הפרטיות, התשמ"א–1981, ולתיקונים החלים עליו, ייתכן שתהיו זכאים לעיין במידע שנשמר עליכם, לבקש תיקון או מחיקה, או להתנגד לשימוש מסוים — כפי שהדין קובע.',
        'לפניות בנושא פרטיות: Info@north-il.center או שדרות תל חי 98, קרית שמונה, בציון "בקשה בנושא פרטיות".',
      ],
    },
    {
      heading: 'שמירת מידע',
      paragraphs: [
        'נשמור מידע רק ככל שנדרש למטרות שפורטו למעלה, לצורכי עמידה בדין, או לתקופה סבירה לצורך הגנה על זכויותינו — לפי שיקול דעתנו ובהתאם לדין.',
      ],
    },
    {
      heading: 'שינויים במדיניות',
      paragraphs: [
        'ייתכן שנעדכן מדיניות זו מעת לעת. גרסה מעודכנת תפורסם באתר. מומלץ לעיין בעמוד זה מעת לעת.',
      ],
    },
  ],
};

export const ACCESSIBILITY_CONTENT: LegalDocument = {
  title: 'הצהרת נגישות',
  lastUpdated: 'עודכן לאחרונה: מאי 2026',
  sections: [
    {
      heading: 'המחויבות שלנו',
      paragraphs: [
        'מרכזה צפון משקיעים מאמץ רב בהנגשת האתר לכלל המשתמשים, כולל אנשים עם מוגבלויות. אנו מאמינים שלכל אדם מגיעה הזכות לקבל מידע ושירותים בצורה נוחה, שוויונית ומכבדת.',
      ],
    },
    {
      heading: 'מה כולל תפריט הנגישות באתר',
      paragraphs: [
        'באתר זה הוטמע תפריט נגישות המאפשר התאמות כגון: הגדלת גודל הטקסט, מצבי ניגודיות (כולל מצב כהה ומונוכרום), הדגשת קישורים וכותרות, הגדלת סמן העכבר, ועצירת אנימציות. ניתן לאפס את כל ההגדרות בכל עת.',
        'ניתן לפתוח את תפריט הנגישות גם באמצעות קיצור מקלדת: Alt + Shift + A.',
      ],
    },
    {
      heading: 'תאימות וטכנולוגיות',
      paragraphs: [
        'האתר נבנה תוך התחשבות בשימוש בדפדפנים מודרניים ובטכנולוגיות מסייעות (כגון קוראי מסך). אנו משתדלים לשמור על מבנה ברור, כותרות מסודרות וטקסטים קריאים.',
      ],
    },
    {
      heading: 'מגבלות ידועות',
      paragraphs: [
        'חלק מתכני צד שלישי המוטמעים באתר (למשל טופס יצירת קשר חיצוני) עשויים שלא לרשת באופן מלא את כל התאמות הנגישות שבחרתם. במקרים כאלה ההגדרות עשויות להשפיע בעיקר על תוכן האתר שבנוי אצלנו. אנו פועלים לשיפור מתמיד ונשמח לקבל פניות בנושא.',
      ],
    },
    {
      heading: 'פנייה ובקשות נגישות',
      paragraphs: [
        'אם נתקלתם בקושי בגלישה באתר או שיש לכם הצעה לשיפור — נשמח לשמוע מכם.',
        'מרכזה צפון, שדרות תל חי 98, קרית שמונה. דוא"ל: Info@north-il.center.',
      ],
    },
  ],
};

type LegalModalContextValue = {
  openTerms: () => void;
  openPrivacy: () => void;
  openAccessibility: () => void;
  close: () => void;
};

const LegalModalContext = createContext<LegalModalContextValue | null>(null);

export function useLegalModal(): LegalModalContextValue {
  const ctx = useContext(LegalModalContext);
  if (!ctx) {
    throw new Error('useLegalModal must be used within LegalModalProvider');
  }
  return ctx;
}

const DOCS: Record<LegalDocType, LegalDocument> = {
  terms: TERMS_CONTENT,
  privacy: PRIVACY_CONTENT,
  accessibility: ACCESSIBILITY_CONTENT,
};

function usePauseAnimationsFromHtmlClass() {
  const [pause, setPause] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('a11y-pause-anim'),
  );

  useEffect(() => {
    const el = document.documentElement;
    const sync = () => setPause(el.classList.contains('a11y-pause-anim'));
    const obs = new MutationObserver(sync);
    obs.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  return pause;
}

function LegalModalShell({
  open,
  docType,
  onClose,
  onExitComplete,
}: {
  open: boolean;
  docType: LegalDocType | null;
  onClose: () => void;
  onExitComplete: () => void;
}) {
  const isAccessibilityDoc = docType === 'accessibility';
  const pauseAnimations = usePauseAnimationsFromHtmlClass();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const doc = docType ? DOCS[docType] : null;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open && panelRef.current) {
      const focusable = panelRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      (focusable ?? panelRef.current).focus();
    }
  }, [open, docType]);

  if (!doc) return null;

  return (
    <MotionConfig reducedMotion={pauseAnimations ? 'always' : 'never'}>
    <AnimatePresence onExitComplete={onExitComplete}>
      {open && (
        <>
          <motion.div
            key="legal-overlay"
            role="presentation"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'rgba(26,42,32,0.6)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />
          <motion.div
            key="legal-dialog-wrap"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 101,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              pointerEvents: 'none',
            }}
          >
            <motion.div
              ref={panelRef}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                pointerEvents: 'auto',
                position: 'relative',
                width: '100%',
                maxWidth: '720px',
                maxHeight: '85vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                background: '#faf7f2',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.6)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.25), 0 4px 20px rgba(0,0,0,0.1)',
                outline: 'none',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '12%',
                  right: '12%',
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent, rgba(194,117,74,0.5), transparent)',
                  borderRadius: '0 0 3px 3px',
                }}
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="סגור"
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  zIndex: 2,
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  border: '1px solid rgba(42,67,50,0.12)',
                  background: 'rgba(255,255,255,0.85)',
                  color: '#2a4332',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s ease',
                }}
              >
                <X size={20} strokeWidth={2} />
              </button>

              <div
                style={{
                  overflowY: 'auto',
                  padding: 'clamp(24px, 4vw, 40px)',
                  paddingTop: '52px',
                }}
              >
                <h2
                  id={titleId}
                  style={{
                    fontFamily: "'Playpen Sans Hebrew', cursive",
                    fontSize: 'clamp(24px, 3vw, 32px)',
                    fontWeight: 400,
                    color: '#1e2d27',
                    margin: '0 0 8px 0',
                    lineHeight: 1.25,
                  }}
                >
                  {doc.title}
                </h2>
                <p
                  style={{
                    fontFamily: "'Heebo', Arial, sans-serif",
                    fontSize: '13px',
                    color: 'rgba(74,94,80,0.75)',
                    margin: '0 0 28px 0',
                  }}
                >
                  {doc.lastUpdated}
                </p>

                {doc.sections.map(section => (
                  <section key={section.heading} style={{ marginBottom: '28px' }}>
                    <h3
                      style={{
                        fontFamily: "'Heebo', Arial, sans-serif",
                        fontSize: '17px',
                        fontWeight: 700,
                        color: '#2a4332',
                        margin: '0 0 12px 0',
                        lineHeight: 1.35,
                      }}
                    >
                      {section.heading}
                    </h3>
                    {section.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        style={{
                          fontFamily: "'Heebo', Arial, sans-serif",
                          fontSize: '15px',
                          lineHeight: 1.75,
                          color: '#4a5e50',
                          margin: '0 0 12px 0',
                        }}
                      >
                        {p}
                      </p>
                    ))}
                  </section>
                ))}

                <p
                  style={{
                    fontFamily: "'Heebo', Arial, sans-serif",
                    fontSize: '12px',
                    lineHeight: 1.6,
                    color: 'rgba(74,94,80,0.65)',
                    margin: '8px 0 0 0',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(42,67,50,0.1)',
                  }}
                >
                  {isAccessibilityDoc
                    ? 'אנו ממשיכים לשפר את חוויית הנגישות באתר. אם משהו חסר או לא נוח — אנא פנו אלינו ונשמח לסייע.'
                    : 'מסמך זה נועד למידע כללי בלבד ואינו מהווה ייעוץ משפטי. מומלץ לעיין בעורך דין לפני פרסום סופי.'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </MotionConfig>
  );
}

export function LegalModalProvider({ children }: { children: React.ReactNode }) {
  const [docType, setDocType] = useState<LegalDocType | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const openTerms = useCallback(() => {
    setDocType('terms');
    setPanelOpen(true);
  }, []);

  const openPrivacy = useCallback(() => {
    setDocType('privacy');
    setPanelOpen(true);
  }, []);

  const openAccessibility = useCallback(() => {
    setDocType('accessibility');
    setPanelOpen(true);
  }, []);

  const close = useCallback(() => {
    setPanelOpen(false);
  }, []);

  const onExitComplete = useCallback(() => {
    setDocType(null);
  }, []);

  const value = useMemo(
    () => ({ openTerms, openPrivacy, openAccessibility, close }),
    [openTerms, openPrivacy, openAccessibility, close],
  );

  return (
    <LegalModalContext.Provider value={value}>
      {children}
      <LegalModalShell
        open={panelOpen && docType !== null}
        docType={docType}
        onClose={close}
        onExitComplete={onExitComplete}
      />
    </LegalModalContext.Provider>
  );
}
