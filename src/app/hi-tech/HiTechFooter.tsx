import { HT } from './tokens';
import { useLegalModal } from '../components/LegalModal';

export function HiTechFooter() {
  const { openTerms, openPrivacy, openAccessibility } = useLegalModal();

  return (
    <footer
      style={{
        background: HT.footer,
        padding: '48px 24px 36px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        fontFamily: HT.fontSans,
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <p
          style={{
            fontFamily: HT.fontScript,
            fontSize: 'clamp(22px, 3vw, 30px)',
            color: HT.cream,
            margin: '0 0 8px',
          }}
        >
          קריית שמונה
        </p>
        <p style={{ fontSize: 15, color: HT.greenLight, margin: '0 0 28px', fontWeight: 500 }}>
          קרוב לכל מה שטוב
        </p>
        <p
          style={{
            fontSize: 13,
            color: 'rgba(217,227,210,0.55)',
            lineHeight: 1.7,
            maxWidth: 420,
            margin: '0 auto 28px',
          }}
        >
          הבחירה הצפונית · המטה לצמיחה דמוגרפית קהילתית — קריית שמונה
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 20,
            marginBottom: 24,
          }}
        >
          {[
            { label: 'תנאי שימוש', onClick: openTerms },
            { label: 'פרטיות', onClick: openPrivacy },
            { label: 'נגישות', onClick: openAccessibility },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(242,232,213,0.55)',
                fontSize: 13,
                cursor: 'pointer',
                fontFamily: HT.fontSans,
                textDecoration: 'underline',
              }}
            >
              {item.label}
            </button>
          ))}
          <a
            href="mailto:Info@north-il.center"
            style={{
              color: 'rgba(242,232,213,0.55)',
              fontSize: 13,
              textDecoration: 'none',
              direction: 'ltr',
              unicodeBidi: 'isolate',
            }}
          >
            Info@north-il.center
          </a>
        </div>

        <p style={{ fontSize: 12, color: 'rgba(217,227,210,0.35)', margin: 0 }}>
          © {new Date().getFullYear()} הבחירה הצפונית
        </p>
      </div>
    </footer>
  );
}
