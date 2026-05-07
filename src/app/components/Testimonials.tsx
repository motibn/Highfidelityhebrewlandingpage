import React, { useRef, useCallback, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { FloralBorder, CornerBotanical } from './BotanicalElements';
const IMG_DESKTOP = '/testimonial-1600.avif';
const IMG_MOBILE = '/testimonial-960.avif';

const testimonials = [
  {
    name: 'משפחת לוי',
    origin: 'עברה מתל אביב לפני שנה וחצי',
    quote: 'חשבנו שנצטרך לוותר על משהו. גילינו שלמעשה קיבלנו הרבה יותר. שכנים שמכירים אותנו בשם, ילדים שיוצאים לשחק בחוץ, וחיים שמרגישים אמיתיים.',
    image: IMG_DESKTOP,
    stars: 5,
    highlight: 'הילדים פרחו',
  },
  {
    name: 'משפחת אברהם',
    origin: 'עברה מחיפה לפני שנתיים',
    quote: 'השינוי היה מפחיד בהתחלה. אבל הקהילה קיבלה אותנו בזרועות פתוחות. תוך שבועות הרגשנו שזה הבית שתמיד רצינו. הנוף הוא בונוס שאי אפשר להסביר.',
    image: IMG_DESKTOP,
    stars: 5,
    highlight: 'קהילה שמחה',
  },
  {
    name: 'משפחת כהן',
    origin: 'עברה מרמת גן לפני שמונה חודשים',
    quote: 'שאלנו את עצמנו המון שאלות לפני המעבר. עכשיו, כשאנחנו רואים את הילדים שלנו משחקים בחוץ עם חברים, אנחנו יודעים שעשינו את הצעד הנכון.',
    image: IMG_DESKTOP,
    stars: 5,
    highlight: 'ילדות מושלמת',
  },
  {
    name: 'משפחת גולדברג',
    origin: 'עברה מירושלים לפני שלושה חודשים',
    quote: 'המחיר של הדירה היה חצי ממה שחשבנו אפשרי. אבל מה שלא ציפינו זה כמה עשיר יהיה החיים עצמם. אנחנו חיים חיים שרצינו לחיות.',
    image: IMG_DESKTOP,
    stars: 5,
    highlight: 'איכות חיים',
  },
];

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', direction: 'rtl' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  return (
    <section
      id="testimonials"
      ref={ref}
      style={{
        position: 'relative',
        background: '#f2e8d5',
        padding: '100px 0 120px',
        overflow: 'hidden',
      }}
    >
      {/* Botanical corner decorations */}
      <div style={{ position: 'absolute', top: '40px', right: '20px', width: '160px', opacity: 0.14 }}>
        <CornerBotanical color="#5c7a5a" opacity={1} />
      </div>
      <div style={{ position: 'absolute', bottom: '40px', left: '20px', width: '160px', opacity: 0.12, transform: 'scale(-1,-1)' }}>
        <CornerBotanical color="#c2754a" opacity={1} />
      </div>

      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(42,67,50,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
            <FloralBorder color="#6b8a5e" opacity={0.45} style={{ width: '260px' }} />
          </div>
          <div style={{
            display: 'inline-block',
            background: 'rgba(42,67,50,0.08)',
            borderRadius: '40px',
            padding: '5px 16px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#4d7a5c',
            letterSpacing: '0.5px',
            marginBottom: '16px',
          }}>
            עדויות אמיתיות
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontWeight: 800,
            color: '#1e2d27',
            lineHeight: 1.15,
            letterSpacing: '-1px',
          }}>
            מה אומר מי שכבר כאן?
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div ref={emblaRef} style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: '0' }}>
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  style={{
                    flex: '0 0 min(520px, 85vw)',
                    margin: '0 12px',
                  }}
                >
                  <div style={{
                    background: 'rgba(255,255,255,0.55)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.7)',
                    borderRadius: '28px',
                    padding: '36px',
                    boxShadow: '0 8px 40px rgba(42,67,50,0.1), 0 2px 8px rgba(0,0,0,0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    {/* Paper texture inner */}
                    <div style={{
                      position: 'absolute', inset: 0, borderRadius: '28px', pointerEvents: 'none',
                      backgroundImage: `image-set(url("${IMG_MOBILE}") 1x, url("${t.image}") 2x)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: 0.15,
                    }} />
                    <div style={{
                      position: 'absolute', inset: 0, borderRadius: '28px', pointerEvents: 'none',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(245,239,227,0.2) 100%)',
                    }} />

                    {/* Decorative quote mark */}
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      left: '28px',
                      opacity: 0.1,
                    }}>
                      <Quote size={64} color="#2a4332" />
                    </div>

                    {/* Highlight tag */}
                    <div style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, rgba(194,117,74,0.15), rgba(212,144,106,0.1))',
                      border: '1px solid rgba(194,117,74,0.25)',
                      borderRadius: '20px',
                      padding: '4px 14px',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#c2754a',
                      marginBottom: '20px',
                      position: 'relative',
                      zIndex: 1,
                    }}>
                      {t.highlight}
                    </div>

                    {/* Stars */}
                    <div style={{ display: 'flex', gap: '3px', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
                      {Array(t.stars).fill(0).map((_, si) => (
                        <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill="#c2754a">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote text */}
                    <p style={{
                      fontSize: '16px',
                      color: '#2c2420',
                      lineHeight: 1.8,
                      fontWeight: 400,
                      marginBottom: '28px',
                      position: 'relative',
                      zIndex: 1,
                    }}>
                      ״{t.quote}״
                    </p>

                    {/* Author */}
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e2d27' }}>{t.name}</div>
                      <div style={{ fontSize: '12px', color: '#6b8a5e', fontWeight: 400, marginTop: '2px' }}>{t.origin}</div>
                    </div>

                    {/* Decorative bottom line */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      left: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, transparent, rgba(42,67,50,0.2), rgba(194,117,74,0.3), transparent)',
                      borderRadius: '0 0 28px 28px',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation controls */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '40px' }}>
            <button
              onClick={scrollPrev}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(42,67,50,0.08)',
                border: '1px solid rgba(42,67,50,0.15)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2a4332',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#2a4332';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(42,67,50,0.08)';
                e.currentTarget.style.color = '#2a4332';
              }}
            >
              <ChevronRight size={20} />
            </button>

            <div style={{ display: 'flex', gap: '8px' }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  style={{
                    width: i === selectedIndex ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: i === selectedIndex ? '#c2754a' : 'rgba(42,67,50,0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(42,67,50,0.08)',
                border: '1px solid rgba(42,67,50,0.15)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2a4332',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#2a4332';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(42,67,50,0.08)';
                e.currentTarget.style.color = '#2a4332';
              }}
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};