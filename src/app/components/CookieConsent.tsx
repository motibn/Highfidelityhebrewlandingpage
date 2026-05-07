import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Cookie, X } from 'lucide-react';
import { useLegalModal } from './LegalModal';

const STORAGE_KEY = 'cookie:consent:v1';
export type CookieConsentValue = 'all' | 'essential';

function readStoredConsent(): CookieConsentValue | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'all' || v === 'essential') return v;
    return null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const { openPrivacy } = useLegalModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readStoredConsent() === null);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (visible) {
      root.classList.add('cookie-banner-visible');
      return () => {
        root.classList.remove('cookie-banner-visible');
      };
    }
    root.classList.remove('cookie-banner-visible');
    return undefined;
  }, [visible]);

  const setConsent = useCallback((value: CookieConsentValue) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent<CookieConsentValue>('cookie-consent', { detail: value }));
    setVisible(false);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="region"
          aria-label="הודעת שימוש בעוגיות"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 98,
            background: 'rgba(250, 247, 242, 0.97)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderTop: '1px solid rgba(42,67,50,0.1)',
            boxShadow: '0 -8px 24px rgba(0,0,0,0.08)',
            padding: '16px 24px',
            paddingTop: '20px',
            paddingBottom: 'max(16px, env(safe-area-inset-bottom, 0px))',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <button
              type="button"
              onClick={() => setConsent('essential')}
              aria-label="סגירה — עוגיות הכרחיות בלבד"
              style={{
                position: 'absolute',
                top: '-4px',
                left: '0',
                width: '36px',
                height: '36px',
                border: 'none',
                background: 'transparent',
                color: '#4a5e50',
                cursor: 'pointer',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={20} strokeWidth={2} aria-hidden />
            </button>

            <div className="cookie-consent-inner">
              <div
                className="cookie-consent-text-row"
                style={{
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                  paddingLeft: '40px',
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: '#2a4332',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f2e8d5',
                  }}
                  aria-hidden
                >
                  <Cookie size={22} strokeWidth={2} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h2
                    style={{
                      fontFamily: "'Heebo', Arial, sans-serif",
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#1e2d27',
                      margin: '0 0 8px 0',
                      lineHeight: 1.35,
                    }}
                  >
                    שימוש בעוגיות באתר
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Heebo', Arial, sans-serif",
                      fontSize: '13px',
                      lineHeight: 1.65,
                      color: 'rgba(74,94,80,0.85)',
                      margin: 0,
                    }}
                  >
                    אנו משתמשים בעוגיות ובאחסון מקומי לצורכי תפעול, העדפות והמשך שימוש נוח באתר. אפשר לקבל הכול או להסתפק בעוגיות הכרחיות בלבד.{' '}
                    <button
                      type="button"
                      onClick={openPrivacy}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        font: 'inherit',
                        color: '#c2754a',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        textUnderlineOffset: '2px',
                        fontWeight: 600,
                      }}
                    >
                      מדיניות הפרטיות המלאה
                    </button>
                  </p>
                </div>
              </div>

              <div className="cookie-consent-actions">
                <button
                  type="button"
                  onClick={() => setConsent('all')}
                  style={{
                    fontFamily: "'Heebo', Arial, sans-serif",
                    fontSize: '14px',
                    fontWeight: 700,
                    padding: '10px 18px',
                    borderRadius: '12px',
                    border: 'none',
                    background: '#2a4332',
                    color: '#f2e8d5',
                    cursor: 'pointer',
                    flex: '1 1 auto',
                    minWidth: 'min(100%, 200px)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = '#1e3228';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = '#2a4332';
                  }}
                >
                  קבלת כל העוגיות
                </button>
                <button
                  type="button"
                  onClick={() => setConsent('essential')}
                  style={{
                    fontFamily: "'Heebo', Arial, sans-serif",
                    fontSize: '14px',
                    fontWeight: 700,
                    padding: '10px 18px',
                    borderRadius: '12px',
                    border: '1px solid rgba(42,67,50,0.25)',
                    background: 'transparent',
                    color: '#2a4332',
                    cursor: 'pointer',
                    flex: '1 1 auto',
                    minWidth: 'min(100%, 200px)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(42,67,50,0.06)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  }}
                >
                  עוגיות הכרחיות בלבד
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
