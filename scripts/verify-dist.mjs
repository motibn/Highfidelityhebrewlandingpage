/**
 * נכשל אם אחרי vite build חסרים קבצים קריטיים לפריסת SPA ב־RunCloud/Apache.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const required = ['index.html', '.htaccess'];

let ok = true;
for (const name of required) {
  const file = path.join(dist, name);
  if (!fs.existsSync(file)) {
    console.error(`verify-dist: חסר הקובץ ${path.relative(root, file)}`);
    ok = false;
  }
}

const assetsDir = path.join(dist, 'assets');
if (!fs.existsSync(assetsDir)) {
  console.error('verify-dist: חסרה תיקיית dist/assets');
  ok = false;
}

const thankYouIndex = path.join(dist, 'thank-you', 'index.html');
if (!fs.existsSync(thankYouIndex)) {
  console.error(`verify-dist: חסר ${path.relative(root, thankYouIndex)} (נדרש ל־NGINX סטטי בלי SPA rewrite)`);
  ok = false;
}

const hiTechIndex = path.join(dist, 'hi-tech', 'index.html');
if (!fs.existsSync(hiTechIndex)) {
  console.error(`verify-dist: חסר ${path.relative(root, hiTechIndex)} (נדרש ל־/hi-tech/)`);
  ok = false;
}

const hiTechThankYouIndex = path.join(dist, 'hi-tech', 'thank-you', 'index.html');
if (!fs.existsSync(hiTechThankYouIndex)) {
  console.error(`verify-dist: חסר ${path.relative(root, hiTechThankYouIndex)} (נדרש ל־/hi-tech/thank-you/)`);
  ok = false;
}

if (!ok) {
  process.exit(1);
}

console.log('verify-dist: dist תקין (index.html, thank-you/, hi-tech/, hi-tech/thank-you/, .htaccess, assets/)');
