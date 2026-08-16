import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KM, scrollToMusicContact } from './tokens';

/** Sticky mobile CTA — button only, scrolls to form */
export function MusicStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector('#hero');
      const contact = document.querySelector('#contact');
      if (!hero || !contact) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      const contactTop = contact.getBoundingClientRect().top;
      const pastHero = heroBottom < 80;
      const contactVisible = contactTop < window.innerHeight * 0.85;
      setVisible(pastHero && !contactVisible && window.innerWidth < 900);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.28 }}
          style={{
            position: 'fixed',
            bottom: 16,
            left: 16,
            right: 16,
            zIndex: 90,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            type="button"
            onClick={scrollToMusicContact}
            style={{
              width: '100%',
              maxWidth: 420,
              background: KM.plum,
              color: KM.white,
              border: 'none',
              borderRadius: 16,
              padding: '16px 20px',
              fontFamily: KM.fontSans,
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 12px 36px rgba(52,88,66,0.35)',
            }}
          >
            הצטרפו לקהילת המוזיקאים
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
