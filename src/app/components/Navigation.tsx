import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
const logo = '/logo-1.png';

type NavLinkItem =
  | { label: string; href: string }
  | { label: string; to: string };

const navLinks: NavLinkItem[] = [
  { label: 'הסיפור שלנו', href: '#video' },
  { label: 'משפחות שכבר כאן', href: '#testimonials' },
  { label: 'למה עכשיו', href: '#why-now' },
  { label: 'המספרים', href: '#stats' },
  { label: 'איך זה עובד', href: '#process' },
  { label: 'שאלות נפוצות', href: '#faq' },
];

const scrollToSection = (href: string) => {
  const el = document.querySelector(href);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

function isRouteLink(link: NavLinkItem): link is { label: string; to: string } {
  return 'to' in link;
}

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const goHomeAndScroll = (hash: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(() => scrollToSection(hash), 80);
    } else {
      scrollToSection(hash);
    }
  };

  const handleLogoClick = () => {
    goHomeAndScroll('#hero');
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          left: 0,
          zIndex: 100,
          transition: 'all 0.4s ease',
        }}
      >
        {/* Header background with upward arc */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '110px',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: scrolled ? '0 4px 30px rgba(42,67,50,0.08)' : 'none',
          zIndex: 0,
        }}>
          <svg
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
            }}
            viewBox="0 0 1440 110"
            preserveAspectRatio="none"
          >
            <path
              d="M 0,0 L 0,86 Q 720,62 1440,86 L 1440,0 Z"
              fill={scrolled ? 'rgba(245, 239, 227, 0.92)' : 'rgba(245, 239, 227, 0.55)'}
            />
          </svg>
        </div>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
            
            {/* Logo - Right side in RTL */}
            <div
              role="button"
              tabIndex={0}
              aria-label="הבחירה הצפונית – דף הבית"
              onClick={handleLogoClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleLogoClick();
                }
              }}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 20, alignSelf: 'center' }}
            >
              <img
                src={logo}
                alt="הבחירה הצפונית – קריית שמונה"
                style={{
                  height: '56px',
                  objectFit: 'contain',
                  display: 'block',
                  position: 'relative',
                  zIndex: 20,
                }}
              />
            </div>

            {/* Desktop Nav Links - Center */}
            <nav style={{ display: 'flex', gap: '6px', alignItems: 'center' }} className="hidden-mobile">
              {navLinks.map((link) =>
                isRouteLink(link) ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '8px 14px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#3a5c42',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit',
                      textDecoration: 'none',
                      display: 'inline-block',
                    }}
                    onMouseEnter={e => {
                      (e.target as HTMLElement).style.background = 'rgba(42,67,50,0.08)';
                      (e.target as HTMLElement).style.color = '#2a4332';
                    }}
                    onMouseLeave={e => {
                      (e.target as HTMLElement).style.background = 'none';
                      (e.target as HTMLElement).style.color = '#3a5c42';
                    }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => goHomeAndScroll(link.href)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '8px 14px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#3a5c42',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={e => {
                      (e.target as HTMLElement).style.background = 'rgba(42,67,50,0.08)';
                      (e.target as HTMLElement).style.color = '#2a4332';
                    }}
                    onMouseLeave={e => {
                      (e.target as HTMLElement).style.background = 'none';
                      (e.target as HTMLElement).style.color = '#3a5c42';
                    }}
                  >
                    {link.label}
                  </button>
                ),
              )}
            </nav>

            {/* CTA Button - Left side in RTL + Hamburger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={() => goHomeAndScroll('#contact')}
                className="hidden-mobile"
                style={{
                  background: 'linear-gradient(135deg, #c2754a, #d4906a)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '40px',
                  padding: '10px 24px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: '0 4px 18px rgba(194,117,74,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.3px',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.boxShadow = '0 6px 28px rgba(194,117,74,0.5)';
                  el.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.boxShadow = '0 4px 18px rgba(194,117,74,0.35), inset 0 1px 0 rgba(255,255,255,0.2)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                אני רוצה לשמוע עוד
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="show-mobile"
                style={{
                  background: 'rgba(42,67,50,0.1)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '8px',
                  cursor: 'pointer',
                  display: 'none',
                  color: '#2a4332',
                }}
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              background: 'rgba(18, 30, 22, 0.55)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '320px',
                background: 'rgba(245, 242, 234, 0.96)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderLeft: '1px solid rgba(42,67,50,0.12)',
                boxShadow: '-20px 0 80px rgba(42,67,50,0.25)',
                display: 'flex',
                flexDirection: 'column',
                padding: '28px 28px 40px',
              }}
            >
              {/* Close button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{ background: 'rgba(42,67,50,0.1)', border: 'none', borderRadius: '10px', padding: '8px', cursor: 'pointer', color: '#2a4332' }}
                >
                  <X size={20} />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#2a4332' }}>קריית שמונה</div>
                  <ImageWithFallback
                    src={logo}
                    alt="הבחירה הצפונית – קריית שמונה"
                    style={{
                      width: '32px',
                      height: '32px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              </div>

              {/* Nav links */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                {navLinks.map((link, i) =>
                  isRouteLink(link) ? (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 + 0.15, duration: 0.4 }}
                      style={{ borderBottom: '1px solid rgba(42,67,50,0.08)' }}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display: 'block',
                          background: 'none',
                          border: 'none',
                          textAlign: 'right',
                          cursor: 'pointer',
                          padding: '16px 12px',
                          fontSize: '18px',
                          fontWeight: 600,
                          color: '#2a4332',
                          borderRadius: '10px',
                          fontFamily: 'inherit',
                          textDecoration: 'none',
                          transition: 'background 0.2s',
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.button
                      key={link.label}
                      type="button"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 + 0.15, duration: 0.4 }}
                      onClick={() => {
                        goHomeAndScroll(link.href);
                        setMobileOpen(false);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        textAlign: 'right',
                        cursor: 'pointer',
                        padding: '16px 12px',
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#2a4332',
                        borderRadius: '10px',
                        fontFamily: 'inherit',
                        borderBottom: '1px solid rgba(42,67,50,0.08)',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(42,67,50,0.06)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                    >
                      {link.label}
                    </motion.button>
                  ),
                )}
              </nav>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <div style={{ marginBottom: '12px', fontSize: '12px', color: '#6b8a5e', textAlign: 'center', fontWeight: 500 }}>
                  הצעד הראשון הוא פשוט — בואו נדבר
                </div>
                <button
                  type="button"
                  onClick={() => {
                    goHomeAndScroll('#contact');
                    setMobileOpen(false);
                  }}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #c2754a, #d4906a)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '40px',
                    padding: '16px 24px',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    boxShadow: '0 6px 24px rgba(194,117,74,0.4)',
                  }}
                >
                  אני רוצה לשמוע עוד
                </button>
              </motion.div>

              {/* Botanical decoration */}
              <div style={{ position: 'absolute', bottom: '120px', left: '20px', width: '80px', opacity: 0.12 }}>
                <svg viewBox="0 0 80 120" fill="none">
                  <path d="M40 120 Q40 80 40 60 Q40 40 40 20" stroke="#2a4332" strokeWidth="2" fill="none" />
                  <ellipse cx="28" cy="50" rx="16" ry="9" fill="#2a4332" transform="rotate(-30 28 50)" />
                  <ellipse cx="52" cy="70" rx="16" ry="9" fill="#2a4332" transform="rotate(30 52 70)" />
                  <ellipse cx="25" cy="80" rx="14" ry="8" fill="#2a4332" transform="rotate(-25 25 80)" />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
};