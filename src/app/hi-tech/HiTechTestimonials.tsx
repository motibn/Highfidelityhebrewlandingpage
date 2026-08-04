import { useRef, useCallback, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { HT } from './tokens';

const testimonials = [
  {
    name: 'משפחת לוי',
    origin: 'עברה מתל אביב לפני שנה וחצי',
    quote:
      'חשבנו שנצטרך לוותר על משהו. גילינו שלמעשה קיבלנו הרבה יותר. שכנים שמכירים אותנו בשם, ילדים שיוצאים לשחק בחוץ, וחיים שמרגישים אמיתיים.',
    stars: 5,
    highlight: 'הילדים פרחו',
  },
  {
    name: 'משפחת אברהם',
    origin: 'עברה מחיפה לפני שנתיים',
    quote:
      'השינוי היה מפחיד בהתחלה. אבל הקהילה קיבלה אותנו בזרועות פתוחות. תוך שבועות הרגשנו שזה הבית שתמיד רצינו. הנוף הוא בונוס שאי אפשר להסביר.',
    stars: 5,
    highlight: 'קהילה שמחה',
  },
  {
    name: 'משפחת כהן',
    origin: 'עברה מרמת גן לפני שמונה חודשים',
    quote:
      'שאלנו את עצמנו המון שאלות לפני המעבר. עכשיו, כשאנחנו רואים את הילדים שלנו משחקים בחוץ עם חברים, אנחנו יודעים שעשינו את הצעד הנכון.',
    stars: 5,
    highlight: 'ילדות מושלמת',
  },
  {
    name: 'משפחת גולדברג',
    origin: 'עברה מירושלים לפני שלושה חודשים',
    quote:
      'המחיר של הדירה היה חצי ממה שחשבנו אפשרי. אבל מה שלא ציפינו זה כמה עשיר יהיה החיים עצמם. אנחנו חיים חיים שרצינו לחיות.',
    stars: 5,
    highlight: 'איכות חיים',
  },
];

export function HiTechTestimonials() {
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
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      id="testimonials"
      ref={ref}
      style={{
        position: 'relative',
        background: HT.cream,
        padding: '88px 0 100px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${HT.mint}88 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
        aria-hidden
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <div
            style={{
              display: 'inline-block',
              background: HT.mint,
              borderRadius: 40,
              padding: '5px 16px',
              fontSize: 11,
              fontWeight: 600,
              fontFamily: HT.fontSans,
              color: HT.greenDark,
              letterSpacing: '0.5px',
              marginBottom: 16,
            }}
          >
            עדויות אמיתיות
          </div>
          <h2
            style={{
              fontFamily: HT.fontSans,
              fontSize: 'clamp(28px, 4.5vw, 48px)',
              fontWeight: 800,
              color: HT.plum,
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            מה אומר מי שכבר כאן?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div ref={emblaRef} style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex' }}>
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  style={{
                    flex: '0 0 min(520px, 85vw)',
                    margin: '0 12px',
                  }}
                >
                  <article
                    style={{
                      background: HT.white,
                      border: `1px solid ${HT.mint}`,
                      borderRadius: 24,
                      padding: 36,
                      boxShadow: '0 8px 32px rgba(52, 88, 66, 0.08)',
                      position: 'relative',
                      overflow: 'hidden',
                      minHeight: 280,
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 20,
                        left: 28,
                        opacity: 0.12,
                      }}
                      aria-hidden
                    >
                      <Quote size={64} color={HT.greenDark} />
                    </div>

                    <div
                      style={{
                        display: 'inline-block',
                        background: `${HT.plum}18`,
                        border: `1px solid ${HT.plum}33`,
                        borderRadius: 20,
                        padding: '4px 14px',
                        fontSize: 11,
                        fontWeight: 700,
                        fontFamily: HT.fontSans,
                        color: HT.plum,
                        marginBottom: 20,
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {t.highlight}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        gap: 3,
                        marginBottom: 16,
                        position: 'relative',
                        zIndex: 1,
                      }}
                      aria-label={`${t.stars} כוכבים`}
                    >
                      {Array(t.stars)
                        .fill(0)
                        .map((_, si) => (
                          <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill={HT.plum} aria-hidden>
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                    </div>

                    <p
                      style={{
                        fontFamily: HT.fontSans,
                        fontSize: 16,
                        color: HT.charcoal,
                        lineHeight: 1.8,
                        fontWeight: 400,
                        margin: '0 0 28px',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      ״{t.quote}״
                    </p>

                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div
                        style={{
                          fontFamily: HT.fontSans,
                          fontSize: 15,
                          fontWeight: 700,
                          color: HT.greenDark,
                        }}
                      >
                        {t.name}
                      </div>
                      <div
                        style={{
                          fontFamily: HT.fontSans,
                          fontSize: 12,
                          color: HT.muted,
                          fontWeight: 400,
                          marginTop: 2,
                        }}
                      >
                        {t.origin}
                      </div>
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        left: 0,
                        height: 3,
                        background: `linear-gradient(90deg, transparent, ${HT.mint}, ${HT.plum}55, transparent)`,
                        borderRadius: '0 0 24px 24px',
                      }}
                      aria-hidden
                    />
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
              marginTop: 40,
            }}
          >
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="עדות קודמת"
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: `${HT.greenDark}12`,
                border: `1px solid ${HT.greenDark}22`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: HT.greenDark,
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = HT.greenDark;
                e.currentTarget.style.color = HT.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${HT.greenDark}12`;
                e.currentTarget.style.color = HT.greenDark;
              }}
            >
              <ChevronRight size={20} />
            </button>

            <div style={{ display: 'flex', gap: 8 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`עבור לעדות ${i + 1}`}
                  aria-current={i === selectedIndex ? 'true' : undefined}
                  style={{
                    width: i === selectedIndex ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === selectedIndex ? HT.plum : `${HT.greenDark}33`,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={scrollNext}
              aria-label="עדות הבאה"
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: `${HT.greenDark}12`,
                border: `1px solid ${HT.greenDark}22`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: HT.greenDark,
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = HT.greenDark;
                e.currentTarget.style.color = HT.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${HT.greenDark}12`;
                e.currentTarget.style.color = HT.greenDark;
              }}
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
