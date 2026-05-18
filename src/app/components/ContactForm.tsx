import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Mail, MapPin } from 'lucide-react';
import { FloralBorder, LeafCluster, BranchLinework } from './BotanicalElements';
import { useLegalModal } from './LegalModal';

const ORIGAMI_LOADER_SRC_PREFIX = 'https://live-public.origamicloud.ms/web_forms/js';
const ORIGAMI_FORM_NAME = 'form_69de8238df351';
const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
] as const;
const ATTRIBUTION_DEFAULTS: Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>> = {
  utm_source: 'direct',
  utm_medium: 'none',
};

type OrigamiFieldConfig = { value: string; hidden: string };
type OrigamiFormConfig = { fields?: Record<string, OrigamiFieldConfig> };
type OrigamiGlobal = Record<string, OrigamiFormConfig> & { init?: () => void };

type WindowWithOrigami = Window & { ORIGAMI_FORMS?: OrigamiGlobal };

function readAttributionFromUrl(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of ATTRIBUTION_KEYS) {
    const raw = (params.get(key) ?? '').trim();
    if (raw) out[key] = raw;
    else if (ATTRIBUTION_DEFAULTS[key]) out[key] = ATTRIBUTION_DEFAULTS[key]!;
  }
  return out;
}

function configureOrigamiFields(): void {
  const w = window as WindowWithOrigami;
  w.ORIGAMI_FORMS = w.ORIGAMI_FORMS || ({} as OrigamiGlobal);
  const attribution = readAttributionFromUrl();
  const fields: Record<string, OrigamiFieldConfig> = {};
  for (const [k, v] of Object.entries(attribution)) {
    fields[k] = { value: v, hidden: '1' };
  }
  const prev = w.ORIGAMI_FORMS[ORIGAMI_FORM_NAME] ?? {};
  w.ORIGAMI_FORMS[ORIGAMI_FORM_NAME] = { ...prev, fields };
}

function bootstrapOrigamiAfterLoad(): void {
  if (document.readyState !== 'complete') return;
  const { ORIGAMI_FORMS } = window as WindowWithOrigami;
  ORIGAMI_FORMS?.init?.();
}

export const ContactForm = () => {
  const ref = useRef(null);
  const origamiContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [shouldLoadOrigamiScript, setShouldLoadOrigamiScript] = useState(false);
  const { openTerms, openPrivacy } = useLegalModal();

  useEffect(() => {
    if (isInView) {
      setShouldLoadOrigamiScript(true);
    }
  }, [isInView]);

  /**
   * Origami registers window "load" + myInit. On SPAs load already fired before this script injects —
   * myInit never runs unless we call ORIGAMI_FORMS.init() after the loader executes.
   */
  useEffect(() => {
    if (!shouldLoadOrigamiScript) return;

    configureOrigamiFields();

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src^="${ORIGAMI_LOADER_SRC_PREFIX}"]`,
    );

    if (existingScript) {
      if (typeof (window as WindowWithOrigami).ORIGAMI_FORMS?.init === 'function') {
        bootstrapOrigamiAfterLoad();
      } else {
        existingScript.addEventListener('load', bootstrapOrigamiAfterLoad);
        return () => existingScript.removeEventListener('load', bootstrapOrigamiAfterLoad);
      }
      return undefined;
    }

    const script = document.createElement('script');
    script.src = `${ORIGAMI_LOADER_SRC_PREFIX}`;
    script.async = true;
    script.onload = () => bootstrapOrigamiAfterLoad();
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [shouldLoadOrigamiScript]);

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
            מוזמנות ומוזמנים למפגש מתעניינים!
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.6vw, 17px)',
            color: 'rgba(194,220,180,0.8)',
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '0 auto',
            fontWeight: 400,
          }}>
            השאירו פרטים ונחזור אליכם לשיחה קצרה, אישית וללא התחייבות.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'rgba(250,247,242,0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.6)',
            borderRadius: '32px',
            padding: 'clamp(28px, 4vw, 52px)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.25), 0 4px 20px rgba(0,0,0,0.1)',
            position: 'relative',
            overflow: 'visible',
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

          {/* Origami Cloud form */}
          <div className="origami-form-wrapper" style={{ position: 'relative', zIndex: 1 }}>
            <div
              ref={origamiContainerRef}
              data-origamiformname={ORIGAMI_FORM_NAME}
              data-origamiformid="64fe36895a4af3e076fd231678d20a4423e961c0a1c4aeb15e1260e3a57a928466be8f7a72fe42947cbefc4a948ae556d6438f5839fafa8b696d9de545b811ebGTOxJqCWiPDDu6ZRP9chdrwXIiPoIAeZ/rfVrg4zoGF/t4xXucR6m1qsni/kjtPbUKf7TErt/1Sk8NPhqCJOKUsZ3TXeUVlUKDRDNnulTRkDMMn+uEZRbcdbWS0agqsg"
            />
          </div>
        </motion.div>

        <p
          style={{
            textAlign: 'center',
            marginTop: '16px',
            marginBottom: 0,
            fontSize: '12px',
            lineHeight: 1.65,
            color: 'rgba(242,232,213,0.65)',
            fontWeight: 400,
            maxWidth: '420px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          בלחיצה על «הירשם» אני מסכים/ה ל
          <button
            type="button"
            onClick={openTerms}
            style={{
              color: '#c2754a',
              textDecoration: 'underline',
              background: 'none',
              border: 'none',
              padding: 0,
              font: 'inherit',
              cursor: 'pointer',
            }}
          >
            תנאי השימוש
          </button>
          {' '}ו{' '}
          <button
            type="button"
            onClick={openPrivacy}
            style={{
              color: '#c2754a',
              textDecoration: 'underline',
              background: 'none',
              border: 'none',
              padding: 0,
              font: 'inherit',
              cursor: 'pointer',
            }}
          >
            מדיניות הפרטיות
          </button>
          .
        </p>

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
            borderTop: '1px solid rgba(42,67,50,0.1)',
            paddingTop: '24px',
          }}
        >
          <a
            href="mailto:Info@north-il.center"
            aria-label="שליחת אימייל ל-Info@north-il.center"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'rgba(194,220,180,0.7)',
              fontSize: '13px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#f2e8d5';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(194,220,180,0.7)';
            }}
          >
            <Mail size={14} aria-hidden="true" />
            <span style={{ direction: 'ltr', unicodeBidi: 'isolate' }}>Info@north-il.center</span>
          </a>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(194,220,180,0.7)',
            fontSize: '13px',
            fontWeight: 500,
          }}>
            <MapPin size={14} aria-hidden="true" />
            קריית שמונה, הצפון
          </div>
        </motion.div>
      </div>

      <style>{`
        .origami-form-wrapper {
          direction: rtl;
          font-family: inherit;
          width: 100%;
          min-height: 480px;
        }
        .origami-form-wrapper > div {
          width: 100%;
        }
        .origami-form-wrapper iframe {
          width: 100% !important;
          min-width: 100% !important;
          max-width: 100% !important;
          border: none !important;
          display: block !important;
          min-height: 480px !important;
          border-radius: 16px !important;
          background: white !important;
        }
        @media (max-width: 640px) {
          #contact {
            padding: 80px 16px 100px !important;
          }
          .origami-form-wrapper {
            min-height: 560px;
            margin: 0;
            overflow-x: hidden;
          }
          .origami-form-wrapper iframe {
            min-height: 560px !important;
            border-radius: 12px !important;
          }
        }
      `}</style>
    </section>
  );
};