(function () {
  var FORM_NAME = 'form_69de8238df351';
  var STORAGE_KEY = 'origami_attribution_v1';
  var KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];
  var DEFAULTS = { utm_source: 'direct', utm_medium: 'none' };
  var CSS = 'https://site-files-apps.s3.eu-west-3.amazonaws.com/Origami/origami_form.css.txt';

  var UTM_SOURCE_TO_ORIGAMI = {
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

  var UTM_MEDIUM_TO_ORIGAMI = {
    cpc: 'cpc',
    ppc: 'cpc',
    none: 'אחר',
    direct: 'אחר',
    organic: 'אינטרנט',
    internet: 'אינטרנט',
    phone: 'טלפון',
    referral: 'קשר אישי',
  };

  function mapUtmValue(key, raw) {
    var normalized = (raw || '').trim().toLowerCase();
    if (!normalized) return '';
    if (key === 'utm_source') return UTM_SOURCE_TO_ORIGAMI[normalized] || raw.trim();
    if (key === 'utm_medium') return UTM_MEDIUM_TO_ORIGAMI[normalized] || raw.trim();
    return raw.trim();
  }

  function persistFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var stored = {};
    var hasAny = false;
    KEYS.forEach(function (key) {
      var value = (params.get(key) || '').trim();
      if (value) {
        stored[key] = value;
        hasAny = true;
      }
    });
    if (hasAny) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      } catch (e) {}
    }
  }

  function readStored() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {};
  }

  function readAttribution() {
    persistFromUrl();
    var params = new URLSearchParams(window.location.search);
    var stored = readStored();
    var fields = {};
    KEYS.forEach(function (key) {
      var fromUrl = (params.get(key) || '').trim();
      var raw = fromUrl || (stored[key] || '').trim() || DEFAULTS[key] || '';
      var mapped = mapUtmValue(key, raw);
      fields[key] = mapped ? { value: mapped, hidden: '1' } : { hidden: '1' };
    });
    return fields;
  }

  window.ORIGAMI_FORMS = window.ORIGAMI_FORMS || {};
  window.ORIGAMI_FORMS[FORM_NAME] = {
    css: CSS,
    fields: readAttribution(),
  };
})();
