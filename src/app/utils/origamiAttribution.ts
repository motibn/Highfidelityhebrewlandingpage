export const ORIGAMI_FORM_NAME = 'form_69de8238df351';
export const ORIGAMI_FORM_CSS =
  'https://site-files-apps.s3.eu-west-3.amazonaws.com/Origami/origami_form.css.txt';

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
