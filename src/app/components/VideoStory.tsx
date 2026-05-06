import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Play } from 'lucide-react';
import { BranchLinework, LeafCluster, FloralBorder } from './BotanicalElements';

const VIDEO_POSTER = 'https://images.unsplash.com/photo-1619588191166-b2ee00a4c314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHZhbGxleSUyMHJpdmVyJTIwbGFuZHNjYXBlJTIwYWVyaWFsfGVufDF8fHx8MTc3NjAxMTk5Mnww&ixlib=rb-4.1.0&q=80&w=1080';

export const VideoStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="video"
      ref={ref}
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #2a4332 0%, #1e3228 100%)',
        padding: '0px 24px 120px',
        overflow: 'hidden',
      }}
    >
      {/* Paper grain on dark */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        opacity: 1,
      }} />



      {/* Bottom paper-cut edge */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', overflow: 'hidden' }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: '100%', height: '80px', display: 'block' }}>
          <path d="M0,0 C250,60 500,20 720,45 C940,70 1200,20 1440,40 L1440,80 L0,80 Z" fill="#f2e8d5" />
        </svg>
      </div>

      {/* Botanical corner accents */}
      <div style={{ position: 'absolute', top: '100px', right: '3%', width: '140px', opacity: 0.15 }}>
        <LeafCluster color="#8aaa78" opacity={1} />
      </div>
      <div style={{ position: 'absolute', bottom: '100px', left: '3%', width: '140px', opacity: 0.12, transform: 'scaleX(-1)' }}>
        <LeafCluster color="#c2754a" opacity={1} />
      </div>

      {/* Branch decorations */}
      <div style={{ position: 'absolute', top: '110px', left: '8%', width: '260px', transform: 'scaleX(-1)' }}>
        <BranchLinework color="rgba(255,255,255,0.3)" opacity={0.3} />
      </div>
      <div style={{ position: 'absolute', bottom: '110px', right: '6%', width: '240px' }}>
        <BranchLinework color="rgba(255,255,255,0.3)" opacity={0.25} />
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <div style={{ marginBottom: '12px' }}>
            <FloralBorder color="#8aaa78" opacity={0.5} className="mx-auto" style={{ width: '280px' }} />
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 58px)',
            fontWeight: 800,
            color: '#f2e8d5',
            lineHeight: 1.15,
            letterSpacing: '-1px',
            marginBottom: '16px',
          }}>
            הבחירה האמיתית
          </h2>
          <p style={{
            fontSize: 'clamp(15px, 1.8vw, 19px)',
            color: 'rgba(194,220,180,0.85)',
            lineHeight: 1.7,
            maxWidth: '870px',
            margin: '0 auto',
            fontWeight: 400,
          }}>
            לא סיסמאות, אנשים. משפחות שכבר עשו את המעבר משתפות איך זה נראה באמת:<br />
            מההתלבטות, דרך ההחלטה ועד החיים עצמם.
          </p>
        </motion.div>

        {/* Video container */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative' }}
        >
          {/* Decorative frame shadow */}
          <div style={{
            position: 'absolute',
            inset: '-12px',
            borderRadius: '32px',
            background: 'rgba(194,117,74,0.15)',
            filter: 'blur(20px)',
          }} />
          
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              aspectRatio: '16/9',
              cursor: 'pointer',
              boxShadow: '0 30px 80px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            onClick={() => setPlaying(true)}
          >
            {/* Video poster */}
            <img
              src={VIDEO_POSTER}
              alt="סרטון סיפור קריית שמונה"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.75) saturate(1.1)' }}
            />

            {/* Dark gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(30,50,40,0.2) 0%, rgba(30,50,40,0.5) 100%)',
            }} />

            {/* Landscape texture overlay */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
              background: 'linear-gradient(to top, rgba(30,50,40,0.7), transparent)',
            }} />

            {/* Play button */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '2px solid rgba(255,255,255,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 0 12px rgba(255,255,255,0.06)',
                  transition: 'all 0.3s ease',
                }}
              >
                <Play size={30} fill="white" color="white" style={{ marginRight: '-3px' }} />
              </motion.div>
            </div>

            {/* Bottom info strip */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '20px 28px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '10px',
                padding: '8px 14px',
              }}>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>משך</div>
                <div style={{ fontSize: '14px', color: 'white', fontWeight: 700 }}>4:32</div>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>סרטון תיעודי</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>קריית שמונה 2025</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom supporting copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            textAlign: 'center',
            marginTop: '40px',
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { icon: '🌿', text: 'יום-יום איכותי' },
            { icon: '🤝', text: 'קהילה אמיתית' },
            { icon: '🏡', text: 'בית ועתיד' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              color: 'rgba(194,220,180,0.8)',
              fontSize: '14px',
              fontWeight: 500,
            }}>
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};