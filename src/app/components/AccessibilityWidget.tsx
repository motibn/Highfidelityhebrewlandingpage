import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { Accessibility } from 'lucide-react';
import { useLegalModal } from './LegalModal';

const STORAGE_KEY = 'a11y:settings:v1';

export type FontScale = 100 | 115 | 130 | 150;
export type ContrastMode = 'light' | 'dark' | 'mono';

export type AccessibilitySettings = {
  fontScale: FontScale;
  contrast: ContrastMode;
  highlightLinks: boolean;
  highlightHeadings: boolean;
  bigCursor: boolean;
  pauseAnimations: boolean;
};

const defaultSettings: AccessibilitySettings = {
  fontScale: 100,
  contrast: 'light',
  highlightLinks: false,
  highlightHeadings: false,
  bigCursor: false,
  pauseAnimations: false,
};

const FONT_CLASSES = ['a11y-font-100', 'a11y-font-115', 'a11y-font-130', 'a11y-font-150'] as const;
const CONTRAST_CLASSES = ['a11y-contrast-light', 'a11y-contrast-dark', 'a11y-contrast-mono'] as const;

function applySettingsToDocument(settings: AccessibilitySettings) {
  const root = document.documentElement;
  FONT_CLASSES.forEach(c => root.classList.remove(c));
  root.classList.add(`a11y-font-${settings.fontScale}`);

  CONTRAST_CLASSES.forEach(c => root.classList.remove(c));
  root.classList.add(`a11y-contrast-${settings.contrast}`);

  root.classList.toggle('a11y-highlight-links', settings.highlightLinks);
  root.classList.toggle('a11y-highlight-headings', settings.highlightHeadings);
  root.classList.toggle('a11y-big-cursor', settings.bigCursor);
  root.classList.toggle('a11y-pause-anim', settings.pauseAnimations);
}

function loadStoredSettings(): AccessibilitySettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;
    const parsed = JSON.parse(raw) as Partial<AccessibilitySettings>;
    return {
      ...defaultSettings,
      ...parsed,
      fontScale: ([100, 115, 130, 150] as const).includes(parsed.fontScale as FontScale)
        ? (parsed.fontScale as FontScale)
        : defaultSettings.fontScale,
      contrast: (['light', 'dark', 'mono'] as const).includes(parsed.contrast as ContrastMode)
        ? (parsed.contrast as ContrastMode)
        : defaultSettings.contrast,
    };
  } catch {
    return defaultSettings;
  }
}

type AccessibilityContextValue = {
  settings: AccessibilitySettings;
  setFontScale: (v: FontScale) => void;
  setContrast: (v: ContrastMode) => void;
  toggleHighlightLinks: () => void;
  toggleHighlightHeadings: () => void;
  toggleBigCursor: () => void;
  togglePauseAnimations: () => void;
  reset: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export function useAccessibility(): AccessibilityContextValue {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return ctx;
}

function AccessibilityToolbar() {
  const {
    settings,
    setFontScale,
    setContrast,
    toggleHighlightLinks,
    toggleHighlightHeadings,
    toggleBigCursor,
    togglePauseAnimations,
    reset,
  } = useAccessibility();
  const { openAccessibility } = useLegalModal();

  const [panelOpen, setPanelOpen] = useState(false);
  const fabRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const closePanel = useCallback(() => {
    setPanelOpen(false);
    fabRef.current?.focus();
  }, []);

  const openPanel = useCallback(() => {
    setPanelOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setPanelOpen(p => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!panelOpen) return;
    const onDocMouse = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || fabRef.current?.contains(t)) return;
      closePanel();
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel();
    };
    document.addEventListener('mousedown', onDocMouse);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocMouse);
      document.removeEventListener('keydown', onEsc);
    };
  }, [panelOpen, closePanel]);

  useEffect(() => {
    if (!panelOpen || !panelRef.current) return;
    const el = panelRef.current.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    (el ?? panelRef.current).focus();
  }, [panelOpen]);

  useEffect(() => {
    if (!panelOpen || !panelRef.current) return;
    const root = panelRef.current;
    const getFocusable = () =>
      Array.from(
        root.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

    const onTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const list = getFocusable();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    root.addEventListener('keydown', onTrap);
    return () => root.removeEventListener('keydown', onTrap);
  }, [panelOpen]);

  const btnBase: React.CSSProperties = {
    fontFamily: "'Heebo', Arial, sans-serif",
    fontSize: '13px',
    fontWeight: 600,
    borderRadius: '10px',
    padding: '8px 10px',
    cursor: 'pointer',
    border: '1px solid rgba(42,67,50,0.2)',
    background: 'transparent',
    color: '#2a4332',
    transition: 'background 0.15s ease, color 0.15s ease',
  };

  const btnActive: React.CSSProperties = {
    background: '#2a4332',
    color: '#f2e8d5',
    borderColor: '#2a4332',
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 700,
    color: '#6b8a5e',
    margin: '0 0 10px 0',
    letterSpacing: '0.4px',
  };

  return (
    <>
      <button
        ref={fabRef}
        type="button"
        className="a11y-fab"
        aria-label="פתיחת תפריט נגישות"
        aria-expanded={panelOpen}
        aria-controls={panelId}
        onClick={() => setPanelOpen(p => !p)}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 99,
          width: '48px',
          height: '48px',
          borderRadius: '14px',
          border: '1px solid rgba(255,255,255,0.15)',
          background: '#2a4332',
          color: '#f2e8d5',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 28px rgba(0,0,0,0.25)',
        }}
      >
        <Accessibility size={24} strokeWidth={2} aria-hidden />
      </button>

      <AnimatePresence>
        {panelOpen && (
          <motion.div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="false"
            aria-label="תפריט נגישות"
            tabIndex={-1}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              bottom: '78px',
              left: '16px',
              zIndex: 99,
              width: 'clamp(280px, 92vw, 360px)',
              maxHeight: 'min(70vh, 520px)',
              overflowY: 'auto',
              background: '#faf7f2',
              border: '1px solid rgba(42,67,50,0.12)',
              borderRadius: '20px',
              boxShadow: '0 30px 80px rgba(0,0,0,0.25), 0 4px 20px rgba(0,0,0,0.1)',
              padding: '20px 18px 16px',
              outline: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '12%',
                right: '12%',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, rgba(194,117,74,0.5), transparent)',
                borderRadius: '0 0 3px 3px',
              }}
            />
            <h2
              style={{
                fontFamily: "'Heebo', Arial, sans-serif",
                fontSize: '18px',
                fontWeight: 800,
                color: '#1e2d27',
                margin: '8px 0 16px 0',
              }}
            >
              נגישות
            </h2>

            <p style={sectionTitle}>גודל טקסט</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
              {([100, 115, 130, 150] as const).map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setFontScale(n)}
                  style={{
                    ...btnBase,
                    flex: '1 1 calc(50% - 4px)',
                    minWidth: '72px',
                    ...(settings.fontScale === n ? btnActive : {}),
                  }}
                >
                  {n}%
                </button>
              ))}
            </div>

            <p style={sectionTitle}>ניגודיות</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
              {(
                [
                  { v: 'light' as const, label: 'רגילה' },
                  { v: 'dark' as const, label: 'כהה' },
                  { v: 'mono' as const, label: 'מונוכרום' },
                ] as const
              ).map(({ v, label }) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setContrast(v)}
                  style={{
                    ...btnBase,
                    width: '100%',
                    ...(settings.contrast === v ? btnActive : {}),
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <p style={sectionTitle}>התאמות נוספות</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
              <button
                type="button"
                onClick={toggleHighlightLinks}
                style={{
                  ...btnBase,
                  width: '100%',
                  ...(settings.highlightLinks ? btnActive : {}),
                }}
              >
                הדגשת קישורים
              </button>
              <button
                type="button"
                onClick={toggleHighlightHeadings}
                style={{
                  ...btnBase,
                  width: '100%',
                  ...(settings.highlightHeadings ? btnActive : {}),
                }}
              >
                הדגשת כותרות
              </button>
              <button
                type="button"
                onClick={toggleBigCursor}
                style={{
                  ...btnBase,
                  width: '100%',
                  ...(settings.bigCursor ? btnActive : {}),
                }}
              >
                סמן גדול
              </button>
              <button
                type="button"
                onClick={togglePauseAnimations}
                style={{
                  ...btnBase,
                  width: '100%',
                  ...(settings.pauseAnimations ? btnActive : {}),
                }}
              >
                עצירת אנימציות
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                reset();
                closePanel();
              }}
              style={{
                ...btnBase,
                width: '100%',
                marginBottom: '10px',
                borderStyle: 'dashed',
                fontWeight: 500,
              }}
            >
              איפוס נגישות
            </button>

            <button
              type="button"
              onClick={() => {
                openAccessibility();
                closePanel();
              }}
              style={{
                ...btnBase,
                width: '100%',
                textDecoration: 'underline',
                border: 'none',
                background: 'rgba(194,117,74,0.12)',
                color: '#8b4a2a',
              }}
            >
              הצהרת נגישות
            </button>

            <p
              style={{
                fontSize: '11px',
                color: 'rgba(74,94,80,0.65)',
                margin: '12px 0 0 0',
                lineHeight: 1.5,
              }}
            >
              קיצור מקלדת: Alt + Shift + A לפתיחת התפריט
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window === 'undefined') return defaultSettings;
    return loadStoredSettings();
  });

  useLayoutEffect(() => {
    applySettingsToDocument(settings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);

  const setFontScale = useCallback((fontScale: FontScale) => {
    setSettings(s => ({ ...s, fontScale }));
  }, []);

  const setContrast = useCallback((contrast: ContrastMode) => {
    setSettings(s => ({ ...s, contrast }));
  }, []);

  const toggleHighlightLinks = useCallback(() => {
    setSettings(s => ({ ...s, highlightLinks: !s.highlightLinks }));
  }, []);

  const toggleHighlightHeadings = useCallback(() => {
    setSettings(s => ({ ...s, highlightHeadings: !s.highlightHeadings }));
  }, []);

  const toggleBigCursor = useCallback(() => {
    setSettings(s => ({ ...s, bigCursor: !s.bigCursor }));
  }, []);

  const togglePauseAnimations = useCallback(() => {
    setSettings(s => ({ ...s, pauseAnimations: !s.pauseAnimations }));
  }, []);

  const reset = useCallback(() => {
    setSettings(defaultSettings);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({
      settings,
      setFontScale,
      setContrast,
      toggleHighlightLinks,
      toggleHighlightHeadings,
      toggleBigCursor,
      togglePauseAnimations,
      reset,
    }),
    [
      settings,
      setFontScale,
      setContrast,
      toggleHighlightLinks,
      toggleHighlightHeadings,
      toggleBigCursor,
      togglePauseAnimations,
      reset,
    ],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      <MotionConfig reducedMotion={settings.pauseAnimations ? 'always' : 'never'}>
        {children}
        <AccessibilityToolbar />
      </MotionConfig>
    </AccessibilityContext.Provider>
  );
}
