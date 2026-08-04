import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { COMPANY_NAMES, HT } from './tokens';

export function HiTechCompanies() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="companies"
      ref={ref}
      style={{
        background: HT.white,
        padding: '72px 24px 64px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: HT.fontSans,
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 800,
            color: HT.plum,
            lineHeight: 1.3,
            margin: '0 0 12px',
          }}
        >
          הצטרפו לקהילת ההייטק של קריית שמונה
          <br />
          בחברות המובילות
        </motion.h2>
        <p
          style={{
            fontFamily: HT.fontSans,
            fontSize: 16,
            color: HT.muted,
            margin: '0 0 40px',
            lineHeight: 1.6,
          }}
        >
          הזדמנויות תעסוקה בהייטק — ליד הבית, עם איכות חיים של הצפון
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'clamp(16px, 3vw, 36px)',
          }}
        >
          {COMPANY_NAMES.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.08 * i }}
              style={{
                fontFamily: HT.fontEng,
                fontSize: 'clamp(15px, 2vw, 20px)',
                fontWeight: 700,
                color: HT.greenDark,
                letterSpacing: '0.02em',
                padding: '14px 22px',
                background: HT.mint,
                borderRadius: 14,
                minWidth: 120,
              }}
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
