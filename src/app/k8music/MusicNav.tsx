import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { KM, K8MUSIC_PATH, scrollToMusicContact } from './tokens';

const links = [
  { label: 'מה מחכה', href: '#offer' },
  { label: 'שגרה', href: '#rhythm' },
  { label: 'למה כאן', href: '#why' },
  { label: 'איך מצטרפים', href: '#process' },
  { label: 'שאלות', href: '#faq' },
];

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export function MusicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isThankYou = location.pathname.includes('thank-you');
  const solidNav = scrolled || isThankYou;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          left: 0,
          zIndex: 100,
          transition: 'background 0.35s ease, box-shadow 0.35s ease',
          background: solidNav ? 'rgba(244,237,227,0.94)' : 'transparent',
          backdropFilter: solidNav ? 'blur(12px)' : undefined,
          boxShadow: scrolled ? '0 8px 28px rgba(42,33,24,0.08)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '12px 20px',
            minHeight: 88,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <Link
            to={K8MUSIC_PATH}
            style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}
            aria-label="קהילת המוזיקאים — דף הבית"
          >
            <picture>
              <source srcSet="/brand-logo.webp" type="image/webp" />
              <img
                src="/brand-logo.png"
                alt="הבחירה הצפונית"
                className="km-nav-logo"
                style={{
                  height: 'clamp(52px, 6vw, 64px)',
                  width: 'auto',
                  maxWidth: 'min(52vw, 300px)',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </picture>
          </Link>

          <nav
            aria-label="ניווט ראשי"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
            className="km-nav-desktop"
          >
            {!isThankYou &&
              links.map((l) => (
                <button
                  key={l.href}
                  type="button"
                  onClick={() => scrollTo(l.href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: KM.fontSans,
                    fontSize: 14,
                    fontWeight: 500,
                    color: KM.ink,
                    padding: '8px 12px',
                  }}
                >
                  {l.label}
                </button>
              ))}
            {isThankYou ? (
              <Link
                to="/k8music/#contact"
                style={{
                  marginInlineStart: 8,
                  background: KM.amber,
                  color: KM.white,
                  borderRadius: 999,
                  padding: '10px 20px',
                  fontFamily: KM.fontSans,
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 8px 22px rgba(196,120,58,0.28)',
                }}
              >
                הצטרפו לקהילה
              </Link>
            ) : (
              <button
                type="button"
                onClick={scrollToMusicContact}
                style={{
                  marginInlineStart: 8,
                  background: KM.amber,
                  color: KM.white,
                  border: 'none',
                  borderRadius: 999,
                  padding: '10px 20px',
                  fontFamily: KM.fontSans,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 8px 22px rgba(196,120,58,0.28)',
                }}
              >
                הצטרפו לקהילה
              </button>
            )}
          </nav>

          <button
            type="button"
            aria-label={open ? 'סגירת תפריט' : 'פתיחת תפריט'}
            className="km-nav-burger"
            onClick={() => setOpen((v) => !v)}
            style={{
              display: 'none',
              background: KM.paper,
              border: 'none',
              borderRadius: 12,
              width: 44,
              height: 44,
              alignItems: 'center',
              justifyContent: 'center',
              color: KM.ink,
              cursor: 'pointer',
            }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(28,20,16,0.45)',
            }}
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: 'min(320px, 86vw)',
                background: KM.paper,
                padding: '88px 24px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                boxShadow: '-12px 0 40px rgba(0,0,0,0.15)',
              }}
              aria-label="תפריט מובייל"
            >
              {!isThankYou &&
                links.map((l) => (
                  <button
                    key={l.href}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      scrollTo(l.href);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      textAlign: 'right',
                      fontFamily: KM.fontSans,
                      fontSize: 18,
                      fontWeight: 600,
                      color: KM.ink,
                      padding: '14px 8px',
                      cursor: 'pointer',
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              {isThankYou ? (
                <Link
                  to="/k8music/#contact"
                  onClick={() => setOpen(false)}
                  style={{
                    marginTop: 12,
                    background: KM.amber,
                    color: KM.white,
                    borderRadius: 14,
                    padding: '14px 18px',
                    fontFamily: KM.fontSans,
                    fontSize: 16,
                    fontWeight: 700,
                    textDecoration: 'none',
                    textAlign: 'center',
                  }}
                >
                  הצטרפו לקהילה
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    scrollToMusicContact();
                  }}
                  style={{
                    marginTop: 12,
                    background: KM.amber,
                    color: KM.white,
                    border: 'none',
                    borderRadius: 14,
                    padding: '14px 18px',
                    fontFamily: KM.fontSans,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  הצטרפו לקהילה
                </button>
              )}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .km-nav-desktop { display: none !important; }
          .km-nav-burger { display: flex !important; }
          .km-nav-logo {
            height: 48px !important;
            max-width: min(68vw, 260px) !important;
          }
        }
      `}</style>
    </>
  );
}
