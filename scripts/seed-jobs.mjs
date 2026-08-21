/**
 * One-time seed: loads SEED_HI_TECH_JOBS into Supabase.
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-jobs.mjs
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('Missing SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const SEED = [
  { slug: 'nvidia', title: 'NVIDIA', company: 'NVIDIA', domain: 'employer', domain_label: 'שבבים / AI', level: null, location: 'תל חי', note: 'ענקית טכנולוגיה עולמית; מרכז הפיתוח השני בגודלו מחוץ לארה"ב', apply_url: null, status: 'published', sort_order: 1 },
  { slug: 'plasan', title: 'פלסן סאסא', company: 'פלסן סאסא', domain: 'employer', domain_label: 'מיגון מתקדם / חומרים מרוכבים', level: null, location: 'קיבוץ סאסא', note: 'מובילת שוק עולמית בייצור מיגון; בדרך להנפקה בשווי כמיליארד ₪', apply_url: null, status: 'published', sort_order: 2 },
  { slug: 'shamir-optics', title: 'שמיר תעשיות אופטיקה', company: 'שמיר תעשיות אופטיקה', domain: 'employer', domain_label: 'R&D אופטי - עדשות', level: null, location: 'קיבוץ שמיר', note: 'מובילה עולמית בעדשות מולטיפוקל; אקזיט של חצי מיליארד $ ב-2022', apply_url: null, status: 'published', sort_order: 3 },
  { slug: 'spo', title: 'SPO (Smart Precision Optics)', company: 'SPO', domain: 'employer', domain_label: 'אופטיקה מדויקת - Free Form', level: null, location: 'קיבוץ שמיר', note: 'ספין-אוף של שמיר אופטיקה; היחידה בישראל בתחומה', apply_url: null, status: 'published', sort_order: 4 },
  { slug: 'bental', title: 'בנטל תעשיות', company: 'בנטל תעשיות', domain: 'employer', domain_label: 'מנועים חשמליים לביטחון/תעופה', level: null, location: 'מרום גולן', note: 'לקוחות: אלביט, רפא"ל, התעשייה האווירית, רית\'און', apply_url: null, status: 'published', sort_order: 5 },
  { slug: 'bmc', title: 'BMC Software', company: 'BMC Software', domain: 'employer', domain_label: 'פיתוח תוכנה לארגוני מחשוב', level: null, location: 'גן התעשייה תל חי', note: 'מרכז פיתוח עם 200+ עובדים; חברת הייטק מובילה בעולם', apply_url: null, status: 'published', sort_order: 6 },
  { slug: 'elbit', title: 'אלביט מערכות (תקשוב וסייבר)', company: 'אלביט מערכות', domain: 'employer', domain_label: 'אלקטרוניקה ביטחונית / רדיו תוכנה', level: null, location: 'גן התעשייה תל חי', note: 'מייצרת מערכות רדיו תוכנה Elynx לצה"ל ולצבאות בעולם; כ-200 עובדים', apply_url: null, status: 'published', sort_order: 7 },
  { slug: 'hubayta', title: 'HUBayta by OpenValley', company: 'HUBayta by OpenValley', domain: 'employer', domain_label: 'מתחם חדשנות/הייטק', level: null, location: 'עמק החולה', note: 'כ-20 חברות טכנולוגיה; בשיתוף פעולה עם Google', apply_url: null, status: 'published', sort_order: 8 },
  { slug: 'tel-hai', title: 'תל-חי - אוניברסיטת קריית שמונה בגליל', company: 'תל-חי', domain: 'employer', domain_label: 'השכלה גבוהה + R&D', level: null, location: 'קריית שמונה', note: 'הוכרה כאוניברסיטה ע"י המל"ג בינואר 2026; תקציב 570 מיליון ₪', apply_url: null, status: 'published', sort_order: 9 },
  { slug: 'migal', title: 'מכון מיגל (MIGAL)', company: 'מכון מיגל', domain: 'employer', domain_label: 'מו"פ ביוטק/אגרוטק', level: null, location: 'קריית שמונה', note: '40+ חברות כלקוחות מו"פ, כולל טבע', apply_url: null, status: 'published', sort_order: 10 },
  { slug: 'shamir-research', title: 'מכון שמיר למחקר', company: 'מכון שמיר למחקר', domain: 'employer', domain_label: 'מו"פ אקדמי - חקלאות/סביבה', level: null, location: 'קצרין', note: 'בחסות אוניברסיטת חיפה; 12 מעבדות מולקולריות', apply_url: null, status: 'published', sort_order: 11 },
  { slug: 'galcon', title: 'גלקון (Galcon)', company: 'גלקון', domain: 'employer', domain_label: 'אגרוטק - בקרת השקיה חכמה', level: null, location: 'כפר בלום', note: 'טכנולוגיית ענן ובקרה מתקדמת', apply_url: null, status: 'published', sort_order: 12 },
  { slug: 'margalit', title: 'Margalit Startup City / Workport', company: 'Margalit Startup City', domain: 'employer', domain_label: 'חממת חדשנות', level: null, location: 'קריית שמונה', note: 'מרכז סטארטאפים בגיבוי קרן JVP', apply_url: null, status: 'published', sort_order: 13 },
  { slug: 'shalag', title: 'שלא"ג תעשיות', company: 'שלא"ג תעשיות', domain: 'employer', domain_label: 'טקסטיל תעשייתי מתקדם', level: null, location: 'קיבוץ שמיר', note: 'חברה גלובלית, פעילות גם בארה"ב', apply_url: null, status: 'published', sort_order: 14 },
  { slug: 'rimony', title: 'רימוני תעשיות', company: 'רימוני תעשיות', domain: 'employer', domain_label: 'פלסטיק מדויק / רפואי', level: null, location: 'קריית שמונה', note: 'לקוחות: טבע, HP, BMW, נסטלה', apply_url: null, status: 'published', sort_order: 15 },
  { slug: 'genpact-jr-qa', title: 'QA Automation (JR)', company: 'Genpact', domain: 'qa', domain_label: 'QA Automation', level: 'junior', location: 'גליל עליון (קריית שמונה)', note: null, apply_url: 'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee---jr-qa/22.F6E', status: 'published', sort_order: 16 },
  { slug: 'genpact-jr-developer', title: 'מפתח/ת (JR)', company: 'Genpact', domain: 'dev', domain_label: 'פיתוח תוכנה', level: 'junior', location: 'גליל עליון (קריית שמונה)', note: null, apply_url: 'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee-jr-developer/22.F6A', status: 'published', sort_order: 17 },
  { slug: 'genpact-jr-it-support', title: 'מומחה תמיכה טכנית (JR)', company: 'Genpact', domain: 'support', domain_label: 'IT Support', level: 'junior', location: 'גליל עליון (קריית שמונה)', note: null, apply_url: 'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee---jr_-it-support-specialist/43.F6F', status: 'published', sort_order: 18 },
  { slug: 'genpact-jr-product-owner', title: 'Product Owner (JR)', company: 'Genpact', domain: 'product', domain_label: 'מוצר', level: 'junior', location: 'גליל עליון (קריית שמונה)', note: null, apply_url: 'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee---jr-product-owner/21.F61', status: 'published', sort_order: 19 },
  { slug: 'genpact-jr-qa-eng', title: 'QA Automation, הנדסה (JR)', company: 'Genpact', domain: 'qa', domain_label: 'QA Automation / הנדסה', level: 'junior', location: 'גליל עליון (קריית שמונה)', note: null, apply_url: 'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee---engineering---jr-qa-automation/12.F66', status: 'published', sort_order: 20 },
  { slug: 'genpact-jr-devops', title: 'מהנדס DevOps (JR)', company: 'Genpact', domain: 'devops', domain_label: 'DevOps', level: 'junior', location: 'גליל עליון (קריית שמונה)', note: null, apply_url: 'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee---jr-devops-engineer/11.F65', status: 'published', sort_order: 21 },
  { slug: 'genpact-jr-data-ai', title: 'מהנדס/ת WS, Data/AI (JR)', company: 'Genpact', domain: 'data-ai', domain_label: 'Data & AI', level: 'junior', location: 'גליל עליון (קריית שמונה)', note: null, apply_url: 'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee-dataai---jr-ws-engineer/01.F68', status: 'published', sort_order: 22 },
  { slug: 'genpact-jr-support', title: 'מהנדס תמיכה (JR)', company: 'Genpact', domain: 'support', domain_label: 'תמיכה', level: 'junior', location: 'גליל עליון (קריית שמונה)', note: null, apply_url: 'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee---jr-support-engineer/21.F67', status: 'published', sort_order: 23 },
  { slug: 'genpact-jr-cloud', title: 'מהנדס ענן (JR)', company: 'Genpact', domain: 'cloud', domain_label: 'Cloud', level: 'junior', location: 'גליל עליון (קריית שמונה)', note: null, apply_url: 'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee--cloud---jr-cloud-engineer/22.F60', status: 'published', sort_order: 24 },
  { slug: 'genpact-senior-pm', title: 'מנהל פרויקטים (בכיר)', company: 'Genpact', domain: 'pm', domain_label: 'ניהול פרויקטים', level: 'senior', location: 'גליל עליון (קריית שמונה)', note: null, apply_url: 'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee---senior-project-manager/22.F68', status: 'published', sort_order: 25 },
  { slug: 'genpact-senior-qa', title: 'מהנדס אוטומציה QA (בכיר)', company: 'Genpact', domain: 'qa', domain_label: 'QA Automation / הנדסה', level: 'senior', location: 'גליל עליון (קריית שמונה)', note: null, apply_url: 'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee---engineering---senior-qa-automation-engineer/11.F6B', status: 'published', sort_order: 26 },
  { slug: 'genpact-senior-data-ai', title: 'מהנדס תוכנה, Data/AI (בכיר)', company: 'Genpact', domain: 'data-ai', domain_label: 'Data & AI', level: 'senior', location: 'גליל עליון (קריית שמונה)', note: null, apply_url: 'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee-data--ai--senior-sw-engineer/01.F6F', status: 'published', sort_order: 27 },
  { slug: 'genpact-senior-support', title: 'מהנדס תמיכה (בכיר)', company: 'Genpact', domain: 'support', domain_label: 'תמיכה', level: 'senior', location: 'גליל עליון (קריית שמונה)', note: null, apply_url: 'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee---senior-support-engineer/12.F6C', status: 'published', sort_order: 28 },
];

const now = new Date().toISOString();
const rows = SEED.map((row) => ({
  ...row,
  published_at: row.status === 'published' ? now : null,
}));

const { data: existing } = await supabase.from('hi_tech_jobs').select('slug');
const existingSlugs = new Set((existing ?? []).map((r) => r.slug));

const toInsert = rows.filter((r) => !existingSlugs.has(r.slug));
if (!toInsert.length) {
  console.log('seed-jobs: all rows already exist, nothing to insert');
  process.exit(0);
}

const { error } = await supabase.from('hi_tech_jobs').insert(toInsert);
if (error) {
  console.error('seed-jobs failed:', error.message);
  process.exit(1);
}

console.log(`seed-jobs: inserted ${toInsert.length} jobs`);
