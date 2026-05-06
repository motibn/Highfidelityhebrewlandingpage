import React, { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { VideoStory } from './components/VideoStory';
import { Testimonials } from './components/Testimonials';
import { WhyNow } from './components/WhyNow';
import { Stats } from './components/Stats';
import { Process } from './components/Process';
import { ContactForm } from './components/ContactForm';

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

const Footer = () => (
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
            {['אודות', 'סיפורים', 'למה עכשיו', 'איך זה עובד', 'צרו קשר'].map(link => (
              <div key={link} style={{ fontSize: '13px', color: 'rgba(242,232,213,0.55)', marginBottom: '8px', cursor: 'pointer', fontWeight: 400 }}>
                {link}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#8aaa78', letterSpacing: '0.5px', marginBottom: '12px' }}>
              יצירת קשר
            </div>
            {['info@ks-north.co.il', 'קריית שמונה, הצפון'].map(link => (
              <div key={link} style={{ fontSize: '13px', color: 'rgba(242,232,213,0.55)', marginBottom: '8px', fontWeight: 400 }}>
                {link}
              </div>
            ))}
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
        <div style={{ display: 'flex', gap: '20px' }}>
          {['תנאי שימוש', 'מדיניות פרטיות'].map(link => (
            <span key={link} style={{ fontSize: '12px', color: 'rgba(194,220,180,0.35)', cursor: 'pointer', fontWeight: 400 }}>
              {link}
            </span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'he');
    document.title = 'קריית שמונה מחכה לכם | עוברים צפונה, מתחילים מחדש';
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
      <Navigation />

      <main style={{ position: 'relative' }}>
        <Hero />
        <VideoStory />
        <Testimonials />
        <WhyNow />
        <Stats />
        <Process />
        <ContactForm />
      </main>

      <Footer />

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
      `}</style>
    </div>
  );
}