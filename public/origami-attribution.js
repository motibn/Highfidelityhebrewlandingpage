(function () {
  var FORM_NAME = 'form_69de8238df351';
  var KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];
  var DEFAULTS = { utm_source: 'direct', utm_medium: 'none' };
  var CSS = 'https://site-files-apps.s3.eu-west-3.amazonaws.com/Origami/origami_form.css.txt';
  var params = new URLSearchParams(window.location.search);
  var fields = {};
  KEYS.forEach(function (key) {
    var value = (params.get(key) || '').trim();
    if (value) fields[key] = { value: value, hidden: '1' };
    else if (DEFAULTS[key]) fields[key] = { value: DEFAULTS[key], hidden: '1' };
  });
  window.ORIGAMI_FORMS = window.ORIGAMI_FORMS || {};
  window.ORIGAMI_FORMS[FORM_NAME] = { css: CSS, fields: fields };
})();
