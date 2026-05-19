export const ORIGAMI_FORM_NAME = 'form_69de8238df351';
export const ORIGAMI_FORM_CSS =
  'https://site-files-apps.s3.eu-west-3.amazonaws.com/Origami/origami_form.css.txt';

const ATTRIBUTION_STORAGE_KEY = 'origami_attribution_v1';

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
type OrigamiFormConfig = { css?: string; fields?: Record<string, OrigamiFieldConfig> };
export type OrigamiGlobal = Record<string, OrigamiFormConfig> & { init?: () => void };

export type WindowWithOrigami = Window & { ORIGAMI_FORMS?: OrigamiGlobal };

type WrappedOrigamiInit = (() => void) & { __origamiWrapped?: boolean };

/** Keep UTM across in-page navigation (e.g. /?utm_* → /#contact drops query string). */
export function persistAttributionFromUrl(): void {
  const params = new URLSearchParams(window.location.search);
  const stored: Record<string, string> = {};
  let hasAny = false;
  for (const key of ATTRIBUTION_KEYS) {
    const raw = (params.get(key) ?? '').trim();
    if (raw) {
      stored[key] = raw;
      hasAny = true;
    }
  }
  if (!hasAny) return;
  try {
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // sessionStorage unavailable (private mode quota, etc.)
  }
}

function readStoredAttribution(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Record<string, string>;
  } catch {
    // ignore parse / access errors
  }
  return {};
}

function readAttributionFromUrl(): Record<string, string> {
  persistAttributionFromUrl();
  const params = new URLSearchParams(window.location.search);
  const stored = readStoredAttribution();
  const out: Record<string, string> = {};
  for (const key of ATTRIBUTION_KEYS) {
    const fromUrl = (params.get(key) ?? '').trim();
    const raw = fromUrl || (stored[key] ?? '').trim();
    if (raw) out[key] = raw;
    else if (ATTRIBUTION_DEFAULTS[key]) out[key] = ATTRIBUTION_DEFAULTS[key]!;
  }
  return out;
}

export function configureOrigamiFields(): void {
  const w = window as WindowWithOrigami;
  w.ORIGAMI_FORMS = w.ORIGAMI_FORMS || ({} as OrigamiGlobal);
  const attribution = readAttributionFromUrl();
  const fields: Record<string, OrigamiFieldConfig> = {};
  for (const [k, v] of Object.entries(attribution)) {
    fields[k] = { value: v, hidden: '1' };
  }
  const prev = w.ORIGAMI_FORMS[ORIGAMI_FORM_NAME] ?? {};
  w.ORIGAMI_FORMS[ORIGAMI_FORM_NAME] = {
    ...prev,
    css: ORIGAMI_FORM_CSS,
    fields,
  };
}

/**
 * Origami loader starts with `var ORIGAMI_FORMS = {}` which wipes pre-set fields.
 * Wrap init so configureOrigamiFields runs immediately before the form reads ORIGAMI_FORMS.
 */
export function wrapOrigamiInit(): void {
  const w = window as WindowWithOrigami;
  if (!w.ORIGAMI_FORMS || typeof w.ORIGAMI_FORMS.init !== 'function') return;

  const originalInit = w.ORIGAMI_FORMS.init as WrappedOrigamiInit;
  if (originalInit.__origamiWrapped) return;

  const wrapped: WrappedOrigamiInit = () => {
    configureOrigamiFields();
    originalInit();
  };
  wrapped.__origamiWrapped = true;
  w.ORIGAMI_FORMS.init = wrapped;
}
