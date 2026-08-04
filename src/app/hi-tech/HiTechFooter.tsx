import { HT } from './tokens';
import { useLegalModal } from '../components/LegalModal';

const TikTokIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.79 1.52V6.76a4.85 4.85 0 0 1-1.02-.07z" />
  </svg>
);

const FacebookIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none" />
  </svg>
);

const PAGE_LINKS = [
  { label: 'דף הקמפיין', href: '/hi-tech/' },
  { label: 'החברות', href: '/hi-tech/#companies' },
  { label: 'עדויות', href: '/hi-tech/#testimonials' },
  { label: 'למה הייטק', href: '/hi-tech/#why' },
  { label: 'מה מקבלים', href: '/hi-tech/#benefits' },
  { label: 'שאלות', href: '/hi-tech/#faq' },
  { label: 'משרות', href: '/hi-tech/jobs/' },
  { label: 'צרו קשר', href: '/hi-tech/#contact' },
  { label: 'דף הבית', href: '/' },
] as const;

const SOCIALS = [
  {
    Icon: FacebookIcon,
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61573872525864',
  },
  {
    Icon: InstagramIcon,
    label: 'Instagram',
    href: 'https://www.instagram.com/growingk8?igsh=MWMzdDB3ZmxudW1z&utm_source=qr',
  },
  {
    Icon: TikTokIcon,
    label: 'TikTok',
    href: 'https://www.tiktok.com/@k8isnow?_r=1&_t=ZS-95tT8tqpFhd',
  },
] as const;

const linkMuted = 'rgba(242,232,213,0.55)';
const linkHover = HT.cream;
const legalMuted = 'rgba(194,220,180,0.35)';
const legalHover = 'rgba(194,220,180,0.7)';

export function HiTechFooter() {
  const { openTerms, openPrivacy, openAccessibility } = useLegalModal();
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: HT.footer,
        padding: '48px 24px 36px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        fontFamily: HT.fontSans,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <p
            style={{
              fontFamily: HT.fontScript,
              fontSize: 'clamp(22px, 3vw, 34px)',
              color: HT.cream,
              margin: 0,
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            קריית שמונה · קרוב לכל מה שטוב
          </p>
          <div
            style={{
              width: 60,
              height: 1,
              background: 'rgba(217,227,210,0.35)',
              margin: '16px auto 0',
            }}
            aria-hidden
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 32,
            flexWrap: 'wrap',
            marginBottom: 40,
          }}
        >
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <picture>
                <source srcSet="/brand-logo.webp" type="image/webp" />
                <img
                  src="/brand-logo.png"
                  alt="הבחירה הצפונית"
                  width={40}
                  height={40}
                  style={{
                    display: 'block',
                    width: 40,
                    height: 40,
                    objectFit: 'contain',
                  }}
                />
              </picture>
              <div style={{ fontSize: 14, fontWeight: 700, color: HT.cream }}>
                קהילת ההייטק · קריית שמונה
              </div>
            </div>
            <p
              style={{
                fontSize: 13,
                color: 'rgba(194,220,180,0.55)',
                lineHeight: 1.7,
                fontWeight: 400,
                margin: 0,
              }}
            >
              הזדמנויות תעסוקה בהייטק ליד הבית — עם ליווי אישי למעבר, דיור והשתלבות בקהילה.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            <nav aria-label="ניווט באתר">
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: HT.greenLight,
                  letterSpacing: '0.5px',
                  marginBottom: 12,
                }}
              >
                הדף
              </div>
              {PAGE_LINKS.map(({ label, href }) => (
                <div key={label} style={{ marginBottom: 8 }}>
                  <a
                    href={href}
                    style={{
                      fontSize: 13,
                      color: linkMuted,
                      fontWeight: 400,
                      textDecoration: 'none',
                    }}
                  >
                    {label}
                  </a>
                </div>
              ))}
            </nav>

            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: HT.greenLight,
                  letterSpacing: '0.5px',
                  marginBottom: 12,
                }}
              >
                יצירת קשר
              </div>
              <div style={{ marginBottom: 8 }}>
                <a
                  href="mailto:Info@north-il.center"
                  style={{
                    fontSize: 13,
                    color: linkMuted,
                    fontWeight: 400,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    direction: 'ltr',
                    display: 'inline-block',
                    unicodeBidi: 'isolate',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = linkHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = linkMuted;
                  }}
                >
                  Info@north-il.center
                </a>
              </div>
              <div style={{ fontSize: 13, color: linkMuted, marginBottom: 8, fontWeight: 400 }}>
                קריית שמונה, הצפון
              </div>
              <div style={{ display: 'flex', gap: 14, marginTop: 18 }}>
                {SOCIALS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(194,220,180,0.7)',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                      e.currentTarget.style.color = HT.cream;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                      e.currentTarget.style.color = 'rgba(194,220,180,0.7)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Icon size={17} color="currentColor" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 24 }} aria-hidden />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div style={{ fontSize: 12, color: 'rgba(194,220,180,0.4)', fontWeight: 400 }}>
            © {year} הבחירה הצפונית. כל הזכויות שמורות.
          </div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {[
              { label: 'תנאי שימוש', onClick: openTerms },
              { label: 'מדיניות פרטיות', onClick: openPrivacy },
              { label: 'הצהרת נגישות', onClick: openAccessibility },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                style={{
                  fontSize: 12,
                  color: legalMuted,
                  cursor: 'pointer',
                  fontWeight: 400,
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = legalHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = legalMuted;
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
