/**
 * Generates public/utm-origami-map.js from src/app/utils/utmOrigamiMap.ts logic
 * so early origami-attribution.js stays in sync. Run: node scripts/sync-utm-origami-public.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tsPath = join(root, 'src/app/utils/utmOrigamiMap.ts');
const outPath = join(root, 'public/utm-origami-map.js');

const ts = readFileSync(tsPath, 'utf8');

function extractObject(name) {
  const start = ts.indexOf(`export const ${name}`);
  if (start === -1) throw new Error(`Missing ${name}`);
  const braceStart = ts.indexOf('{', start);
  let depth = 0;
  for (let i = braceStart; i < ts.length; i++) {
    if (ts[i] === '{') depth++;
    if (ts[i] === '}') depth--;
    if (depth === 0) return ts.slice(braceStart, i + 1);
  }
  throw new Error(`Unclosed object ${name}`);
}

function extractArray(name) {
  const start = ts.indexOf(`const ${name}`);
  if (start === -1) throw new Error(`Missing ${name}`);
  const bracketStart = ts.indexOf('[', start);
  let depth = 0;
  for (let i = bracketStart; i < ts.length; i++) {
    if (ts[i] === '[') depth++;
    if (ts[i] === ']') depth--;
    if (depth === 0) return ts.slice(bracketStart, i + 1);
  }
  throw new Error(`Unclosed array ${name}`);
}

const sourceExact = extractObject('UTM_SOURCE_EXACT');
const mediumExact = extractObject('UTM_MEDIUM_EXACT');
const sourceContains = extractArray('UTM_SOURCE_CONTAINS');
const mediumContains = extractArray('UTM_MEDIUM_CONTAINS');

const js = `/* AUTO-GENERATED from src/app/utils/utmOrigamiMap.ts — do not edit by hand */
(function (global) {
  var UTM_SOURCE_FALLBACK = 'אתר';
  var UTM_MEDIUM_FALLBACK = 'אחר';
  var UTM_SOURCE_EXACT = ${sourceExact};
  var UTM_MEDIUM_EXACT = ${mediumExact};
  var UTM_SOURCE_CONTAINS = ${sourceContains};
  var UTM_MEDIUM_CONTAINS = ${mediumContains};

  function normalizeKey(raw) {
    return raw.trim().toLowerCase().replace(/\\s+/g, '_');
  }

  function lookupExact(map, raw) {
    var trimmed = raw.trim();
    var lower = normalizeKey(raw);
    return map[lower] || map[trimmed] || map[trimmed.toLowerCase()];
  }

  function resolveUtmSource(raw) {
    var trimmed = (raw || '').trim();
    if (!trimmed) return '';
    var exact = lookupExact(UTM_SOURCE_EXACT, trimmed);
    if (exact) return exact;
    var normalized = normalizeKey(trimmed);
    for (var i = 0; i < UTM_SOURCE_CONTAINS.length; i++) {
      var rule = UTM_SOURCE_CONTAINS[i];
      if (rule.pattern.test(normalized) || rule.pattern.test(trimmed)) return rule.value;
    }
    return UTM_SOURCE_FALLBACK;
  }

  function resolveUtmMedium(raw) {
    var trimmed = (raw || '').trim();
    if (!trimmed) return '';
    var exact = lookupExact(UTM_MEDIUM_EXACT, trimmed);
    if (exact) return exact;
    var normalized = normalizeKey(trimmed);
    for (var i = 0; i < UTM_MEDIUM_CONTAINS.length; i++) {
      var rule = UTM_MEDIUM_CONTAINS[i];
      if (rule.pattern.test(normalized) || rule.pattern.test(trimmed)) return rule.value;
    }
    return UTM_MEDIUM_FALLBACK;
  }

  function inferUtmFromClickIds(params) {
    if ((params.gclid || '').trim()) return { utm_source: 'google', utm_medium: 'cpc' };
    if ((params.fbclid || '').trim()) return { utm_source: 'facebook', utm_medium: 'cpc' };
    if ((params.msclkid || '').trim()) return { utm_source: 'דף נחיתה', utm_medium: 'cpc' };
    if ((params.ttclid || '').trim()) return { utm_source: 'דף נחיתה', utm_medium: 'cpc' };
    if ((params.li_fat_id || '').trim()) return { utm_source: 'לינקדאין', utm_medium: 'cpc' };
    return {};
  }

  global.UtmOrigamiMap = {
    resolveUtmSource: resolveUtmSource,
    resolveUtmMedium: resolveUtmMedium,
    inferUtmFromClickIds: inferUtmFromClickIds,
  };
})(typeof window !== 'undefined' ? window : globalThis);
`;

writeFileSync(outPath, js);
console.log('sync-utm-origami-public: wrote', outPath);
