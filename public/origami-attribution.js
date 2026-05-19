(function () {
  var mapApi = window.UtmOrigamiMap;
  if (!mapApi) {
    console.warn('[origami-attribution] UtmOrigamiMap missing — load /utm-origami-map.js first');
    return;
  }

  var FORM_NAME = 'form_69de8238df351';
  var STORAGE_KEY = 'origami_attribution_v1';
  var KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];
  var DEFAULTS = { utm_source: 'direct', utm_medium: 'none' };
  var CSS = 'https://site-files-apps.s3.eu-west-3.amazonaws.com/Origami/origami_form.css.txt';

  function mapField(key, raw) {
    if (!raw) return '';
    if (key === 'utm_source') return mapApi.resolveUtmSource(raw);
    if (key === 'utm_medium') return mapApi.resolveUtmMedium(raw);
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
    var values = {};

    KEYS.forEach(function (key) {
      var fromUrl = (params.get(key) || '').trim();
      var raw = fromUrl || (stored[key] || '').trim() || DEFAULTS[key] || '';
      var mapped = mapField(key, raw);
      if (mapped) values[key] = mapped;
    });

    var inferred = mapApi.inferUtmFromClickIds({
      gclid: params.get('gclid') || stored.gclid,
      fbclid: params.get('fbclid') || stored.fbclid,
      msclkid: params.get('msclkid'),
      ttclid: params.get('ttclid'),
      li_fat_id: params.get('li_fat_id'),
    });
    if (!values.utm_source && inferred.utm_source) {
      values.utm_source = mapApi.resolveUtmSource(inferred.utm_source);
    }
    if (!values.utm_medium && inferred.utm_medium) {
      values.utm_medium = mapApi.resolveUtmMedium(inferred.utm_medium);
    }

    var fields = {};
    KEYS.forEach(function (key) {
      var value = values[key];
      fields[key] = value ? { value: value, hidden: '1' } : { hidden: '1' };
    });
    return fields;
  }

  window.ORIGAMI_FORMS = window.ORIGAMI_FORMS || {};
  window.ORIGAMI_FORMS[FORM_NAME] = {
    css: CSS,
    fields: readAttribution(),
  };
})();
