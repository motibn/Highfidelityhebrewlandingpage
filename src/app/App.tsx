import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { LegalModalProvider, useLegalModal } from './components/LegalModal';
import { AccessibilityProvider } from './components/AccessibilityWidget';
import { CookieConsent } from './components/CookieConsent';

// TikTok SVG icon (not in lucide-react)
const TikTokIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.79 1.52V6.76a4.85 4.85 0 0 1-1.02-.07z" />
  </svg>
);

const FacebookIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none" />
  </svg>
);

const Footer = ({
  onTermsClick,
  onPrivacyClick,
  onAccessibilityClick,
}: {
  onTermsClick: () => void;
  onPrivacyClick: () => void;
  onAccessibilityClick: () => void;
}) => (
  <footer style={{
    background: '#1a2a20',
    padding: '48px 24px 36px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

      {/* Centred cursive title */}
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
        <p style={{
          fontSize: 'clamp(22px, 3vw, 34px)',
          color: '#f2e8d5',
          margin: 0,
          lineHeight: 1.4,
        }}><span style={{
            fontFamily: "'Playpen Sans Hebrew', cursive",
            fontStyle: 'normal',
            fontWeight: 400,
          }}>מרגישה לי נכונה</span><span style={{ fontWeight: 400 }}>. קריית שמונה.</span></p>
        <div style={{ width: '60px', height: '1px', background: 'rgba(194,220,180,0.25)', margin: '16px auto 0' }} />
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '32px',
        flexWrap: 'wrap',
        marginBottom: '40px',
      }}>
        {/* Brand */}
        <div style={{ maxWidth: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #2a4332, #4d7a5c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L8 8L2 9L6 14L5 20L12 17L19 20L18 14L22 9L16 8L12 2Z" fill="white" opacity="0.9" />
              </svg>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#f2e8d5' }}>
              קריית שמונה · הצפון מחכה
            </div>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(194,220,180,0.55)', lineHeight: 1.7, fontWeight: 400 }}>
            פרויקט קהילתי לעידוד משפחות עם זיקה לישראל לבחור בחיים איכותיים בצפון.
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#8aaa78', letterSpacing: '0.5px', marginBottom: '12px' }}>
              הדף
            </div>
            {[
              { label: 'דף הבית', href: '/' },
              { label: 'שאלות נפוצות', href: '/#faq' },
              { label: 'סיפורים', href: '/#testimonials' },
              { label: 'למה עכשיו', href: '/#why-now' },
              { label: 'איך זה עובד', href: '/#process' },
              { label: 'צרו קשר', href: '/#contact' },
            ].map(({ label, href }) => (
              <div key={label} style={{ marginBottom: '8px' }}>
                <a
                  href={href}
                  style={{ fontSize: '13px', color: 'rgba(242,232,213,0.55)', fontWeight: 400, textDecoration: 'none' }}
                >
                  {label}
                </a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#8aaa78', letterSpacing: '0.5px', marginBottom: '12px' }}>
              יצירת קשר
            </div>
            <div style={{ marginBottom: '8px' }}>
              <a
                href="mailto:info@ks-north.co.il"
                style={{
                  fontSize: '13px',
                  color: 'rgba(242,232,213,0.55)',
                  fontWeight: 400,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  direction: 'ltr',
                  display: 'inline-block',
                  unicodeBidi: 'isolate',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#f2e8d5';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(242,232,213,0.55)';
                }}
              >
                info@ks-north.co.il
              </a>
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(242,232,213,0.55)', marginBottom: '8px', fontWeight: 400 }}>
              קריית שמונה, הצפון
            </div>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '14px', marginTop: '18px' }}>
              {[
                { Icon: FacebookIcon, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61573872525864' },
                { Icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/growingk8?igsh=MWMzdDB3ZmxudW1z&utm_source=qr' },
                { Icon: TikTokIcon, label: 'TikTok', href: 'https://www.tiktok.com/@k8isnow?_r=1&_t=ZS-95tT8tqpFhd' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(194,220,180,0.7)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.15)';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#f2e8d5';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(194,220,180,0.7)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={17} color="currentColor" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '24px' }} />

      {/* Bottom bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div style={{ fontSize: '12px', color: 'rgba(194,220,180,0.4)', fontWeight: 400 }}>
          © 2025 קריית שמונה מחכה לכם. כל הזכויות שמורות.
        </div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onTermsClick}
            style={{
              fontSize: '12px',
              color: 'rgba(194,220,180,0.35)',
              cursor: 'pointer',
              fontWeight: 400,
              background: 'none',
              border: 'none',
              padding: 0,
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(194,220,180,0.7)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(194,220,180,0.35)';
            }}
          >
            תנאי שימוש
          </button>
          <button
            type="button"
            onClick={onPrivacyClick}
            style={{
              fontSize: '12px',
              color: 'rgba(194,220,180,0.35)',
              cursor: 'pointer',
              fontWeight: 400,
              background: 'none',
              border: 'none',
              padding: 0,
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(194,220,180,0.7)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(194,220,180,0.35)';
            }}
          >
            מדיניות פרטיות
          </button>
          <button
            type="button"
            onClick={onAccessibilityClick}
            style={{
              fontSize: '12px',
              color: 'rgba(194,220,180,0.35)',
              cursor: 'pointer',
              fontWeight: 400,
              background: 'none',
              border: 'none',
              padding: 0,
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(194,220,180,0.7)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(194,220,180,0.35)';
            }}
          >
            הצהרת נגישות
          </button>
        </div>
      </div>
    </div>
  </footer>
);

function AppContent() {
  const { openTerms, openPrivacy, openAccessibility } = useLegalModal();

  useEffect(() => {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'he');
  }, []);

  return (
    <div
      dir="rtl"
      lang="he"
      style={{
        position: 'relative',
        fontFamily: "'Heebo', 'Arial', sans-serif",
        overflowX: 'hidden',
        background: '#f2e8d5',
        minHeight: '100vh',
      }}
    >
      <a
        href="#main-content"
        className="skip-to-content"
        aria-label="דלג ישירות לתוכן הראשי"
      >
        דלג לתוכן
      </a>

      <Navigation />

      <main id="main-content" tabIndex={-1} style={{ position: 'relative', outline: 'none' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>

      <Footer
        onTermsClick={openTerms}
        onPrivacyClick={openPrivacy}
        onAccessibilityClick={openAccessibility}
      />

      <CookieConsent />

      <style>{`
        * {
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        ::selection {
          background: rgba(42, 67, 50, 0.2);
          color: #1e2d27;
        }

        input::placeholder,
        textarea::placeholder {
          color: rgba(74, 94, 80, 0.5);
        }

        /* Smooth scroll offset for sticky nav */
        section[id] {
          scroll-margin-top: 72px;
        }

        :focus-visible {
          outline: 2px solid #c2754a;
          outline-offset: 3px;
        }

        #main-content:focus:not(:focus-visible) {
          outline: none;
        }

        #main-content:focus-visible {
          outline: 2px solid #c2754a;
          outline-offset: 4px;
        }

        .skip-to-content {
          position: absolute;
          top: -120px;
          right: 16px;
          z-index: 200;
          padding: 10px 16px;
          background: #2a4332;
          color: #f2e8d5;
          font-weight: 700;
          font-size: 14px;
          font-family: 'Heebo', Arial, sans-serif;
          text-decoration: none;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }

        .skip-to-content:focus {
          top: 12px;
          outline: 2px solid #c2754a;
          outline-offset: 2px;
        }

        html.a11y-font-100 { font-size: 100%; }
        html.a11y-font-115 { font-size: 115%; }
        html.a11y-font-130 { font-size: 130%; }
        html.a11y-font-150 { font-size: 150%; }

        html[class*="a11y-font-"] body {
          font-size: 1em;
        }

        html.a11y-contrast-dark body {
          filter: invert(0.92) hue-rotate(180deg);
        }

        html.a11y-contrast-dark body img,
        html.a11y-contrast-dark body video,
        html.a11y-contrast-dark body iframe,
        html.a11y-contrast-dark body svg {
          filter: invert(1) hue-rotate(180deg);
        }

        html.a11y-contrast-mono body {
          filter: grayscale(1) contrast(1.05);
        }

        html.a11y-contrast-mono body img,
        html.a11y-contrast-mono body video,
        html.a11y-contrast-mono body iframe {
          filter: grayscale(0) contrast(1);
        }

        html.a11y-highlight-links a,
        html.a11y-highlight-links button[type="button"],
        html.a11y-highlight-links button[type="submit"] {
          text-decoration: underline !important;
          font-weight: 700 !important;
          text-underline-offset: 2px;
        }

        html.a11y-highlight-headings :is(h1, h2, h3) {
          background: rgba(42, 67, 50, 0.08);
          padding: 4px 8px;
          border-radius: 6px;
          outline: 1px dashed rgba(42, 67, 50, 0.45);
          outline-offset: 2px;
        }

        html.a11y-big-cursor,
        html.a11y-big-cursor * {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath fill='%232a4332' stroke='%23f2e8d5' stroke-width='1.5' d='M4 4l10 22 3-9 9-3L4 4z'/%3E%3C/svg%3E") 4 4, auto !important;
        }

        html.a11y-pause-anim *,
        html.a11y-pause-anim *::before,
        html.a11y-pause-anim *::after {
          animation-duration: 0ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0ms !important;
          scroll-behavior: auto !important;
        }

        html.cookie-banner-visible .a11y-fab {
          bottom: 110px;
        }

        .cookie-consent-inner {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: stretch;
        }

        .cookie-consent-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: flex-start;
        }

        @media (min-width: 768px) {
          .cookie-consent-inner {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
          }

          .cookie-consent-text-row {
            flex: 1;
            min-width: 0;
          }

          .cookie-consent-actions {
            flex-wrap: nowrap;
            justify-content: flex-end;
            flex-shrink: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <LegalModalProvider>
      <AccessibilityProvider>
        <AppContent />
      </AccessibilityProvider>
    </LegalModalProvider>
  );
}
