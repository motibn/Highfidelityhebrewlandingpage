import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Send, CheckCircle, Phone, Mail, MapPin, Users, Calendar } from 'lucide-react';
import { FloralBorder, LeafCluster, BranchLinework } from './BotanicalElements';

const timingOptions = [
  { value: 'soon', label: 'בחודשים הקרובים' },
  { value: 'half', label: 'בתוך חצי שנה' },
  { value: 'year', label: 'בשנה הקרובה' },
  { value: 'explore', label: 'רק בודקים אפשרות' },
];

const childrenOptions = ['אין ילדים', '1', '2', '3', '4+'];

export const ContactForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    children: '',
    timing: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const inputStyle = (name: string) => ({
    width: '100%',
    padding: '14px 16px',
    background: focused === name
      ? 'rgba(255,255,255,0.7)'
      : 'rgba(255,255,255,0.45)',
    border: focused === name
      ? '1.5px solid rgba(42,67,50,0.4)'
      : '1.5px solid rgba(42,67,50,0.15)',
    borderRadius: '14px',
    fontSize: '15px',
    color: '#1e2d27',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.25s ease',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    boxShadow: focused === name ? '0 0 0 3px rgba(42,67,50,0.1)' : 'none',
    boxSizing: 'border-box' as const,
  });

  if (submitted) {
    return (
      <section id="contact" style={{
        background: 'linear-gradient(160deg, #2a4332 0%, #1e3228 100%)',
        padding: '100px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ width: '100%', height: '70px', display: 'block' }}>
            <path d="M0,70 C250,10 600,50 900,20 C1100,5 1300,30 1440,15 L1440,0 L0,0 Z" fill="#e8dcc8" />
          </svg>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '32px',
            padding: '60px 48px',
            maxWidth: '500px',
          }}
        >
          <CheckCircle size={64} color="#8aaa78" style={{ margin: '0 auto 24px' }} />
          <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#f2e8d5', marginBottom: '16px' }}>
            קיבלנו! נחזור אליכם בקרוב
          </h3>
          <p style={{ fontSize: '16px', color: 'rgba(194,220,180,0.8)', lineHeight: 1.7 }}>
            תודה שפניתם. נציג שלנו יחזור אליכם תוך 24 שעות לשיחה אישית ונעימה.
          </p>
          <div style={{
            marginTop: '32px',
            padding: '16px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.12)',
          }}>
            <div style={{ fontSize: '13px', color: 'rgba(242,232,213,0.7)' }}>
              🌿 קריית שמונה מחכה לכם
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #2a4332 0%, #1e3228 60%, #2a4332 100%)',
        padding: '110px 24px 120px',
        overflow: 'hidden',
      }}
    >
      {/* Paper grain */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
      }} />

      {/* Top edge */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ width: '100%', height: '70px', display: 'block' }}>
          <path d="M0,70 C250,10 600,50 900,20 C1100,5 1300,30 1440,15 L1440,0 L0,0 Z" fill="#f0e8d6" />
        </svg>
      </div>

      {/* Bottom edge */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: '60px', display: 'block' }}>
          <path d="M0,0 C300,50 700,15 1000,38 C1200,52 1350,18 1440,30 L1440,60 L0,60 Z" fill="#1a2a20" />
        </svg>
      </div>

      {/* Botanical accents */}
      <div style={{ position: 'absolute', top: '80px', right: '2%', width: '160px', opacity: 0.12 }}>
        <LeafCluster color="#8aaa78" opacity={1} />
      </div>
      <div style={{ position: 'absolute', bottom: '100px', left: '2%', width: '140px', opacity: 0.1, transform: 'scaleX(-1)' }}>
        <LeafCluster color="#c2754a" opacity={1} />
      </div>
      <div style={{ position: 'absolute', top: '120px', left: '8%', width: '220px', opacity: 0.18 }}>
        <BranchLinework color="rgba(255,255,255,1)" opacity={0.25} />
      </div>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '500px',
        background: 'radial-gradient(ellipse, rgba(194,117,74,0.12) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '880px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'center' }}>
            <FloralBorder color="#8aaa78" opacity={0.5} style={{ width: '240px' }} />
          </div>
          <h2 style={{
            fontSize: 'clamp(30px, 4vw, 52px)',
            fontWeight: 800,
            color: '#f2e8d5',
            lineHeight: 1.15,
            letterSpacing: '-1px',
            marginBottom: '16px',
          }}>
            בואו נדבר ונבדוק אם זה מתאים
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.6vw, 17px)',
            color: 'rgba(194,220,180,0.8)',
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '0 auto',
            fontWeight: 400,
          }}>
            בלי התחייבות, בלי לחץ. רק שיחה אישית כדי להבין מה נכון למשפחה שלכם.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'rgba(245,239,227,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.6)',
            borderRadius: '32px',
            padding: 'clamp(28px, 4vw, 52px)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.25), 0 4px 20px rgba(0,0,0,0.1)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Inner paper texture */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '32px', pointerEvents: 'none',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 60%)',
          }} />

          {/* Top decorative line */}
          <div style={{
            position: 'absolute', top: 0, left: '15%', right: '15%', height: '3px',
            background: 'linear-gradient(90deg, transparent, rgba(194,117,74,0.5), transparent)',
            borderRadius: '0 0 3px 3px',
          }} />

          <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1 }}>
            {/* Row 1: Name + Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  fontSize: '12px', fontWeight: 700, color: '#4a5e50',
                  marginBottom: '8px', letterSpacing: '0.3px',
                }}>
                  <Phone size={12} />
                  שם מלא *
                </label>
                <input
                  type="text"
                  required
                  placeholder="השם שלכם"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  style={inputStyle('name')}
                />
              </div>
              <div>
                <label style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  fontSize: '12px', fontWeight: 700, color: '#4a5e50',
                  marginBottom: '8px', letterSpacing: '0.3px',
                }}>
                  <Phone size={12} />
                  טלפון *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="050-0000000"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  onFocus={() => setFocused('phone')}
                  onBlur={() => setFocused(null)}
                  style={{ ...inputStyle('phone'), direction: 'ltr', textAlign: 'right' }}
                />
              </div>
            </div>

            {/* Row 2: Email + City */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  fontSize: '12px', fontWeight: 700, color: '#4a5e50',
                  marginBottom: '8px', letterSpacing: '0.3px',
                }}>
                  <Mail size={12} />
                  אימייל
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  style={{ ...inputStyle('email'), direction: 'ltr', textAlign: 'right' }}
                />
              </div>
              <div>
                <label style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  fontSize: '12px', fontWeight: 700, color: '#4a5e50',
                  marginBottom: '8px', letterSpacing: '0.3px',
                }}>
                  <MapPin size={12} />
                  עיר מגורים נוכחית
                </label>
                <input
                  type="text"
                  placeholder="תל אביב, חיפה..."
                  value={form.city}
                  onChange={e => setForm({ ...form, city: e.target.value })}
                  onFocus={() => setFocused('city')}
                  onBlur={() => setFocused(null)}
                  style={inputStyle('city')}
                />
              </div>
            </div>

            {/* Children selector */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                fontSize: '12px', fontWeight: 700, color: '#4a5e50',
                marginBottom: '10px', letterSpacing: '0.3px',
              }}>
                <Users size={12} />
                מספר ילדים
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {childrenOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setForm({ ...form, children: opt })}
                    style={{
                      padding: '10px 18px',
                      borderRadius: '50px',
                      border: '1.5px solid',
                      borderColor: form.children === opt ? '#2a4332' : 'rgba(42,67,50,0.2)',
                      background: form.children === opt
                        ? '#2a4332'
                        : 'rgba(255,255,255,0.5)',
                      color: form.children === opt ? 'white' : '#4a5e50',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Timing selector */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                fontSize: '12px', fontWeight: 700, color: '#4a5e50',
                marginBottom: '10px', letterSpacing: '0.3px',
              }}>
                <Calendar size={12} />
                מתי שוקלים מעבר?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                {timingOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm({ ...form, timing: opt.value })}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '14px',
                      border: '1.5px solid',
                      borderColor: form.timing === opt.value ? '#c2754a' : 'rgba(42,67,50,0.15)',
                      background: form.timing === opt.value
                        ? 'linear-gradient(135deg, rgba(194,117,74,0.15), rgba(212,144,106,0.1))'
                        : 'rgba(255,255,255,0.5)',
                      color: form.timing === opt.value ? '#c2754a' : '#5a6e60',
                      fontSize: '13px',
                      fontWeight: form.timing === opt.value ? 700 : 500,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      boxShadow: form.timing === opt.value ? '0 2px 12px rgba(194,117,74,0.2)' : 'none',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div style={{ textAlign: 'center' }}>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                style={{
                  background: loading
                    ? 'rgba(42,67,50,0.5)'
                    : 'linear-gradient(135deg, #c2754a 0%, #d4906a 50%, #c2754a 100%)',
                  backgroundSize: '200% 100%',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '18px 52px',
                  fontSize: '17px',
                  fontWeight: 800,
                  cursor: loading ? 'wait' : 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: loading
                    ? 'none'
                    : '0 10px 36px rgba(194,117,74,0.45), 0 3px 10px rgba(194,117,74,0.25), inset 0 1px 0 rgba(255,255,255,0.25)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  margin: '0 auto',
                  letterSpacing: '0.3px',
                }}
              >
                {loading ? (
                  <>
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '50%',
                      border: '2px solid rgba(255,255,255,0.4)',
                      borderTopColor: 'white',
                      animation: 'spin 0.8s linear infinite',
                    }} />
                    שולחים...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    שלחו לי פרטים
                  </>
                )}
              </motion.button>

              <p style={{
                marginTop: '16px',
                fontSize: '12px',
                color: '#7a8e80',
                fontWeight: 400,
              }}>
                🔒 פרטיות מובטחת · ללא ספאם · מחזירים תוך 24 שעות
              </p>
            </div>
          </form>
        </motion.div>

        {/* Contact details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            marginTop: '40px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { icon: Phone, text: '04-694-0000' },
            { icon: Mail, text: 'info@ks-north.co.il' },
            { icon: MapPin, text: 'קריית שמונה, הצפון' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'rgba(194,220,180,0.7)',
              fontSize: '13px',
              fontWeight: 500,
            }}>
              <item.icon size={14} />
              {item.text}
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};