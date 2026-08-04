export type JobLevel = 'junior' | 'senior';

export type JobDomain =
  | 'qa'
  | 'dev'
  | 'devops'
  | 'data-ai'
  | 'cloud'
  | 'support'
  | 'product'
  | 'pm'
  | 'employer';

export interface HiTechJob {
  id: string;
  title: string;
  company: string;
  domain: JobDomain;
  domainLabel: string;
  /** null = חברה/מוסד ללא משרה פתוחה מפורסמת */
  level: JobLevel | null;
  location: string;
  note?: string;
  /** קישור Comeet — אם חסר, משתמשים ב-WhatsApp */
  applyUrl?: string;
}

export const JOB_DOMAIN_LABELS: Record<JobDomain, string> = {
  qa: 'QA',
  dev: 'פיתוח',
  devops: 'DevOps',
  'data-ai': 'Data & AI',
  cloud: 'Cloud',
  support: 'תמיכה',
  product: 'מוצר',
  pm: 'ניהול פרויקטים',
  employer: 'חברות באזור',
};

export const JOB_LEVEL_LABELS: Record<JobLevel, string> = {
  junior: 'רמת כניסה',
  senior: 'בכיר',
};

export const HI_TECH_WHATSAPP = '972552135965';

export function buildWhatsAppJobUrl(job: HiTechJob): string {
  const text = [
    'שלום, הגעתי מדף המשרות של הבחירה הצפונית',
    `ואשמח למידע על הזדמנויות תעסוקה ב־${job.company}`,
    `(${job.domainLabel}) באזור ${job.location}.`,
  ].join(' ');
  return `https://wa.me/${HI_TECH_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

/** כל הפריטים מהאקסל — חברות ואז משרות Genpact */
export const HI_TECH_JOBS: HiTechJob[] = [
  {
    id: 'nvidia',
    title: 'NVIDIA',
    company: 'NVIDIA',
    domain: 'employer',
    domainLabel: 'שבבים / AI',
    level: null,
    location: 'תל חי',
    note: 'ענקית טכנולוגיה עולמית; מרכז הפיתוח השני בגודלו מחוץ לארה"ב',
  },
  {
    id: 'plasan',
    title: 'פלסן סאסא',
    company: 'פלסן סאסא',
    domain: 'employer',
    domainLabel: 'מיגון מתקדם / חומרים מרוכבים',
    level: null,
    location: 'קיבוץ סאסא',
    note: 'מובילת שוק עולמית בייצור מיגון; בדרך להנפקה בשווי כמיליארד ₪',
  },
  {
    id: 'shamir-optics',
    title: 'שמיר תעשיות אופטיקה',
    company: 'שמיר תעשיות אופטיקה',
    domain: 'employer',
    domainLabel: 'R&D אופטי - עדשות',
    level: null,
    location: 'קיבוץ שמיר',
    note: 'מובילה עולמית בעדשות מולטיפוקל; אקזיט של חצי מיליארד $ ב-2022',
  },
  {
    id: 'spo',
    title: 'SPO (Smart Precision Optics)',
    company: 'SPO',
    domain: 'employer',
    domainLabel: 'אופטיקה מדויקת - Free Form',
    level: null,
    location: 'קיבוץ שמיר',
    note: 'ספין-אוף של שמיר אופטיקה; היחידה בישראל בתחומה',
  },
  {
    id: 'bental',
    title: 'בנטל תעשיות',
    company: 'בנטל תעשיות',
    domain: 'employer',
    domainLabel: 'מנועים חשמליים לביטחון/תעופה',
    level: null,
    location: 'מרום גולן',
    note: 'לקוחות: אלביט, רפא"ל, התעשייה האווירית, רית\'און',
  },
  {
    id: 'bmc',
    title: 'BMC Software',
    company: 'BMC Software',
    domain: 'employer',
    domainLabel: 'פיתוח תוכנה לארגוני מחשוב',
    level: null,
    location: 'גן התעשייה תל חי',
    note: 'מרכז פיתוח עם 200+ עובדים; חברת הייטק מובילה בעולם',
  },
  {
    id: 'elbit',
    title: 'אלביט מערכות (תקשוב וסייבר)',
    company: 'אלביט מערכות',
    domain: 'employer',
    domainLabel: 'אלקטרוניקה ביטחונית / רדיו תוכנה',
    level: null,
    location: 'גן התעשייה תל חי',
    note: 'מייצרת מערכות רדיו תוכנה Elynx לצה"ל ולצבאות בעולם; כ-200 עובדים',
  },
  {
    id: 'hubayta',
    title: 'HUBayta by OpenValley',
    company: 'HUBayta by OpenValley',
    domain: 'employer',
    domainLabel: 'מתחם חדשנות/הייטק',
    level: null,
    location: 'עמק החולה',
    note: 'כ-20 חברות טכנולוגיה; בשיתוף פעולה עם Google',
  },
  {
    id: 'tel-hai',
    title: 'תל-חי - אוניברסיטת קריית שמונה בגליל',
    company: 'תל-חי',
    domain: 'employer',
    domainLabel: 'השכלה גבוהה + R&D',
    level: null,
    location: 'קריית שמונה',
    note: 'הוכרה כאוניברסיטה ע"י המל"ג בינואר 2026; תקציב 570 מיליון ₪',
  },
  {
    id: 'migal',
    title: 'מכון מיגל (MIGAL)',
    company: 'מכון מיגל',
    domain: 'employer',
    domainLabel: 'מו"פ ביוטק/אגרוטק',
    level: null,
    location: 'קריית שמונה',
    note: '40+ חברות כלקוחות מו"פ, כולל טבע',
  },
  {
    id: 'shamir-research',
    title: 'מכון שמיר למחקר',
    company: 'מכון שמיר למחקר',
    domain: 'employer',
    domainLabel: 'מו"פ אקדמי - חקלאות/סביבה',
    level: null,
    location: 'קצרין',
    note: 'בחסות אוניברסיטת חיפה; 12 מעבדות מולקולריות',
  },
  {
    id: 'galcon',
    title: 'גלקון (Galcon)',
    company: 'גלקון',
    domain: 'employer',
    domainLabel: 'אגרוטק - בקרת השקיה חכמה',
    level: null,
    location: 'כפר בלום',
    note: 'טכנולוגיית ענן ובקרה מתקדמת',
  },
  {
    id: 'margalit',
    title: 'Margalit Startup City / Workport',
    company: 'Margalit Startup City',
    domain: 'employer',
    domainLabel: 'חממת חדשנות',
    level: null,
    location: 'קריית שמונה',
    note: 'מרכז סטארטאפים בגיבוי קרן JVP',
  },
  {
    id: 'shalag',
    title: 'שלא"ג תעשיות',
    company: 'שלא"ג תעשיות',
    domain: 'employer',
    domainLabel: 'טקסטיל תעשייתי מתקדם',
    level: null,
    location: 'קיבוץ שמיר',
    note: 'חברה גלובלית, פעילות גם בארה"ב',
  },
  {
    id: 'rimony',
    title: 'רימוני תעשיות',
    company: 'רימוני תעשיות',
    domain: 'employer',
    domainLabel: 'פלסטיק מדויק / רפואי',
    level: null,
    location: 'קריית שמונה',
    note: 'לקוחות: טבע, HP, BMW, נסטלה',
  },
  {
    id: 'genpact-jr-qa',
    title: 'QA Automation (JR)',
    company: 'Genpact',
    domain: 'qa',
    domainLabel: 'QA Automation',
    level: 'junior',
    location: 'גליל עליון (קריית שמונה)',
    applyUrl: 'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee---jr-qa/22.F6E',
  },
  {
    id: 'genpact-jr-developer',
    title: 'מפתח/ת (JR)',
    company: 'Genpact',
    domain: 'dev',
    domainLabel: 'פיתוח תוכנה',
    level: 'junior',
    location: 'גליל עליון (קריית שמונה)',
    applyUrl: 'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee-jr-developer/22.F6A',
  },
  {
    id: 'genpact-jr-it-support',
    title: 'מומחה תמיכה טכנית (JR)',
    company: 'Genpact',
    domain: 'support',
    domainLabel: 'IT Support',
    level: 'junior',
    location: 'גליל עליון (קריית שמונה)',
    applyUrl:
      'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee---jr_-it-support-specialist/43.F6F',
  },
  {
    id: 'genpact-jr-product-owner',
    title: 'Product Owner (JR)',
    company: 'Genpact',
    domain: 'product',
    domainLabel: 'מוצר',
    level: 'junior',
    location: 'גליל עליון (קריית שמונה)',
    applyUrl: 'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee---jr-product-owner/21.F61',
  },
  {
    id: 'genpact-jr-qa-eng',
    title: 'QA Automation, הנדסה (JR)',
    company: 'Genpact',
    domain: 'qa',
    domainLabel: 'QA Automation / הנדסה',
    level: 'junior',
    location: 'גליל עליון (קריית שמונה)',
    applyUrl:
      'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee---engineering---jr-qa-automation/12.F66',
  },
  {
    id: 'genpact-jr-devops',
    title: 'מהנדס DevOps (JR)',
    company: 'Genpact',
    domain: 'devops',
    domainLabel: 'DevOps',
    level: 'junior',
    location: 'גליל עליון (קריית שמונה)',
    applyUrl: 'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee---jr-devops-engineer/11.F65',
  },
  {
    id: 'genpact-jr-data-ai',
    title: 'מהנדס/ת WS, Data/AI (JR)',
    company: 'Genpact',
    domain: 'data-ai',
    domainLabel: 'Data & AI',
    level: 'junior',
    location: 'גליל עליון (קריית שמונה)',
    applyUrl:
      'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee-dataai---jr-ws-engineer/01.F68',
  },
  {
    id: 'genpact-jr-support',
    title: 'מהנדס תמיכה (JR)',
    company: 'Genpact',
    domain: 'support',
    domainLabel: 'תמיכה',
    level: 'junior',
    location: 'גליל עליון (קריית שמונה)',
    applyUrl:
      'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee---jr-support-engineer/21.F67',
  },
  {
    id: 'genpact-jr-cloud',
    title: 'מהנדס ענן (JR)',
    company: 'Genpact',
    domain: 'cloud',
    domainLabel: 'Cloud',
    level: 'junior',
    location: 'גליל עליון (קריית שמונה)',
    applyUrl:
      'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee--cloud---jr-cloud-engineer/22.F60',
  },
  {
    id: 'genpact-senior-pm',
    title: 'מנהל פרויקטים (בכיר)',
    company: 'Genpact',
    domain: 'pm',
    domainLabel: 'ניהול פרויקטים',
    level: 'senior',
    location: 'גליל עליון (קריית שמונה)',
    applyUrl:
      'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee---senior-project-manager/22.F68',
  },
  {
    id: 'genpact-senior-qa',
    title: 'מהנדס אוטומציה QA (בכיר)',
    company: 'Genpact',
    domain: 'qa',
    domainLabel: 'QA Automation / הנדסה',
    level: 'senior',
    location: 'גליל עליון (קריית שמונה)',
    applyUrl:
      'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee---engineering---senior-qa-automation-engineer/11.F6B',
  },
  {
    id: 'genpact-senior-data-ai',
    title: 'מהנדס תוכנה, Data/AI (בכיר)',
    company: 'Genpact',
    domain: 'data-ai',
    domainLabel: 'Data & AI',
    level: 'senior',
    location: 'גליל עליון (קריית שמונה)',
    applyUrl:
      'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee-data--ai--senior-sw-engineer/01.F6F',
  },
  {
    id: 'genpact-senior-support',
    title: 'מהנדס תמיכה (בכיר)',
    company: 'Genpact',
    domain: 'support',
    domainLabel: 'תמיכה',
    level: 'senior',
    location: 'גליל עליון (קריית שמונה)',
    applyUrl:
      'https://www.comeet.com/jobs/genpact/B9.008/upper-galilee---senior-support-engineer/12.F6C',
  },
];
