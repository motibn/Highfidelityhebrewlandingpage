import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { HT, scrollToHiTechContact } from './tokens';

const links = [
  { label: 'למה הייטק בצפון', href: '#why' },
  { label: 'החברות', href: '#companies' },
  { label: 'מה מקבלים', href: '#benefits' },
  { label: 'שאלות', href: '#faq' },
];

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export function HiTechNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isThankYou = location.pathname.includes('thank-you');

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
          background: scrolled || isThankYou ? 'rgba(247,251,245,0.94)' : 'transparent',
          backdropFilter: scrolled || isThankYou ? 'blur(12px)' : undefined,
          boxShadow: scrolled ? '0 8px 28px rgba(52,88,66,0.08)' : 'none',
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
            to="/hi-tech/"
            style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}
            aria-label="קהילת ההייטק — דף הבית"
          >
            <img
              src="/logo-nav.svg"
              alt="הבחירה הצפונית"
              className="ht-nav-logo"
              style={{
                height: 'clamp(56px, 7vw, 72px)',
                width: 'auto',
                maxWidth: 'min(52vw, 340px)',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Link>

          <nav
            aria-label="ניווט ראשי"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
            className="ht-nav-desktop"
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
                    fontFamily: HT.fontSans,
                    fontSize: 14,
                    fontWeight: 500,
                    color: HT.greenDark,
                    padding: '8px 12px',
                  }}
                >
                  {l.label}
                </button>
              ))}
            <button
              type="button"
              onClick={scrollToHiTechContact}
              style={{
                marginInlineStart: 8,
                background: HT.plum,
                color: HT.white,
                border: 'none',
                borderRadius: 999,
                padding: '10px 20px',
                fontFamily: HT.fontSans,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 8px 22px rgba(168,92,128,0.28)',
              }}
            >
              הצטרפו לקהילה
            </button>
          </nav>

          <button
            type="button"
            aria-label={open ? 'סגירת תפריט' : 'פתיחת תפריט'}
            className="ht-nav-burger"
            onClick={() => setOpen((v) => !v)}
            style={{
              display: 'none',
              background: HT.mint,
              border: 'none',
              borderRadius: 12,
              width: 44,
              height: 44,
              alignItems: 'center',
              justifyContent: 'center',
              color: HT.greenDark,
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
              background: 'rgba(26,42,32,0.45)',
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
                background: HT.cream,
                padding: '88px 24px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                boxShadow: '-12px 0 40px rgba(0,0,0,0.15)',
              }}
              aria-label="תפריט מובייל"
            >
              {links.map((l) => (
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
                    fontFamily: HT.fontSans,
                    fontSize: 18,
                    fontWeight: 600,
                    color: HT.greenDark,
                    padding: '14px 8px',
                    cursor: 'pointer',
                  }}
                >
                  {l.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  scrollToHiTechContact();
                }}
                style={{
                  marginTop: 12,
                  background: HT.plum,
                  color: HT.white,
                  border: 'none',
                  borderRadius: 14,
                  padding: '14px 18px',
                  fontFamily: HT.fontSans,
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                הצטרפו לקהילה
              </button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .ht-nav-desktop { display: none !important; }
          .ht-nav-burger { display: flex !important; }
          .ht-nav-logo {
            height: 52px !important;
            max-width: min(68vw, 280px) !important;
          }
        }
      `}</style>
    </>
  );
}
