export const ORIGAMI_FORM_NAME = 'form_69de8238df351';
export const ORIGAMI_FORM_CSS =
  'https://site-files-apps.s3.eu-west-3.amazonaws.com/Origami/origami_form.css.txt';
export const THANK_YOU_PATH = '/thank-you/';

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

/** Map URL/default values to Origami dropdown options (Hebrew labels from form config). */
const UTM_SOURCE_TO_ORIGAMI: Record<string, string> = {
  google: 'google',
  facebook: 'facebook',
  fb: 'facebook',
  organic: 'organic',
  instagram: 'אינסטגרם',
  linkedin: 'לינקדאין',
  direct: 'אתר',
  site: 'אתר',
  website: 'אתר',
};

const UTM_MEDIUM_TO_ORIGAMI: Record<string, string> = {
  cpc: 'cpc',
  ppc: 'cpc',
  none: 'אחר',
  direct: 'אחר',
  organic: 'אינטרנט',
  internet: 'אינטרנט',
  phone: 'טלפון',
  referral: 'קשר אישי',
};

type OrigamiFieldConfig = { value?: string; hidden: string };
type OrigamiFormConfig = { css?: string; fields?: Record<string, OrigamiFieldConfig> };
export type OrigamiGlobal = Record<string, OrigamiFormConfig> & { init?: () => void };

export type WindowWithOrigami = Window & { ORIGAMI_FORMS?: OrigamiGlobal };

type WrappedOrigamiInit = (() => void) & { __origamiWrapped?: boolean };

type XhrWithOrigamiUrl = XMLHttpRequest & { _origamiUrl?: string };

function mapUtmValue(key: (typeof ATTRIBUTION_KEYS)[number], raw: string): string {
  const normalized = raw.trim().toLowerCase();
  if (!normalized) return '';

  if (key === 'utm_source') {
    return UTM_SOURCE_TO_ORIGAMI[normalized] ?? raw.trim();
  }
  if (key === 'utm_medium') {
    return UTM_MEDIUM_TO_ORIGAMI[normalized] ?? raw.trim();
  }
  return raw.trim();
}

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
    const raw = fromUrl || (stored[key] ?? '').trim() || ATTRIBUTION_DEFAULTS[key] || '';
    const mapped = mapUtmValue(key, raw);
    if (mapped) out[key] = mapped;
  }
  return out;
}

export function configureOrigamiFields(): void {
  const w = window as WindowWithOrigami;
  w.ORIGAMI_FORMS = w.ORIGAMI_FORMS || ({} as OrigamiGlobal);
  const attribution = readAttributionFromUrl();
  const fields: Record<string, OrigamiFieldConfig> = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = attribution[key];
    fields[key] = value ? { value, hidden: '1' } : { hidden: '1' };
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

function resolveThankYouUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/')) return `${window.location.origin}${url}`;
  return `${window.location.origin}/${url}`;
}

/**
 * Redirect parent window after successful Origami save_form (backup if Origami thank_you_page redirect fails).
 */
export function installOrigamiSaveRedirect(onSuccess: (url: string) => void): () => void {
  const xhrProto = XMLHttpRequest.prototype;
  const origOpen = xhrProto.open;
  const origSend = xhrProto.send;

  xhrProto.open = function (
    method: string,
    url: string | URL,
    async?: boolean,
    username?: string | null,
    password?: string | null,
  ) {
    const xhr = this as XhrWithOrigamiUrl;
    xhr._origamiUrl = typeof url === 'string' ? url : url.toString();
    return origOpen.call(this, method, url, async ?? true, username, password);
  };

  xhrProto.send = function (body?: Document | XMLHttpRequestBodyInit | null) {
    this.addEventListener('load', function onLoad(this: XMLHttpRequest) {
      const requestUrl = (this as XhrWithOrigamiUrl)._origamiUrl;
      if (!requestUrl?.includes('/web_forms/save_form') || this.status < 200 || this.status >= 300) {
        return;
      }
      try {
        const data = JSON.parse(this.responseText) as {
          error?: unknown;
          success?: unknown;
          thank_you_page?: string;
        };
        if (!data.error && data.success) {
          onSuccess(data.thank_you_page || THANK_YOU_PATH);
        }
      } catch {
        // ignore non-JSON responses
      }
    });
    return origSend.call(this, body);
  };

  return () => {
    xhrProto.open = origOpen;
    xhrProto.send = origSend;
  };
}

export function navigateToThankYou(url: string): void {
  window.location.assign(resolveThankYouUrl(url));
}
