import React, { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { VideoStory } from './components/VideoStory';
import { Testimonials } from './components/Testimonials';
import { WhyNow } from './components/WhyNow';
import { Stats } from './components/Stats';
import { Process } from './components/Process';
import { ContactForm } from './components/ContactForm';

const Footer = () => (
  <footer style={{
    background: '#1a2a20',
    padding: '48px 24px 36px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
            {['04-694-0000', 'info@ks-north.co.il', 'קריית שמונה, הצפון'].map(link => (
              <div key={link} style={{ fontSize: '13px', color: 'rgba(242,232,213,0.55)', marginBottom: '8px', fontWeight: 400 }}>
                {link}
              </div>
            ))}
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

      <main>
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
