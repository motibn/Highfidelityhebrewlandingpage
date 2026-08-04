export type JobLevel = 'junior' | 'senior';

export type JobDomain =
  | 'qa'
  | 'dev'
  | 'devops'
  | 'data-ai'
  | 'cloud'
  | 'support'
  | 'product'
  | 'pm';

export interface HiTechJob {
  id: string;
  title: string;
  company: string;
  domain: JobDomain;
  domainLabel: string;
  level: JobLevel;
  location: string;
  applyUrl: string;
}

export interface HiTechCompany {
  id: string;
  name: string;
  field: string;
  location: string;
  note: string;
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
};

export const JOB_LEVEL_LABELS: Record<JobLevel, string> = {
  junior: 'רמת כניסה',
  senior: 'בכיר',
};

export const HI_TECH_JOBS: HiTechJob[] = [
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

export const HI_TECH_COMPANIES: HiTechCompany[] = [
  {
    id: 'nvidia',
    name: 'NVIDIA',
    field: 'שבבים / AI',
    location: 'תל חי',
    note: 'ענקית טכנולוגיה עולמית; מרכז הפיתוח השני בגודלו מחוץ לארה"ב',
  },
  {
    id: 'plasan',
    name: 'פלסן סאסא',
    field: 'מיגון מתקדם / חומרים מרוכבים',
    location: 'קיבוץ סאסא',
    note: 'מובילת שוק עולמית בייצור מיגון; בדרך להנפקה בשווי כמיליארד ₪',
  },
  {
    id: 'shamir-optics',
    name: 'שמיר תעשיות אופטיקה',
    field: 'R&D אופטי - עדשות',
    location: 'קיבוץ שמיר',
    note: 'מובילה עולמית בעדשות מולטיפוקל; אקזיט של חצי מיליארד $ ב-2022',
  },
  {
    id: 'spo',
    name: 'SPO (Smart Precision Optics)',
    field: 'אופטיקה מדויקת - Free Form',
    location: 'קיבוץ שמיר',
    note: 'ספין-אוף של שמיר אופטיקה; היחידה בישראל בתחומה',
  },
  {
    id: 'bental',
    name: 'בנטל תעשיות',
    field: 'מנועים חשמליים לביטחון/תעופה',
    location: 'מרום גולן',
    note: 'לקוחות: אלביט, רפא"ל, התעשייה האווירית, רית\'און',
  },
  {
    id: 'bmc',
    name: 'BMC Software',
    field: 'פיתוח תוכנה לארגוני מחשוב',
    location: 'גן התעשייה תל חי',
    note: 'מרכז פיתוח עם 200+ עובדים; חברת הייטק מובילה בעולם',
  },
  {
    id: 'elbit',
    name: 'אלביט מערכות (תקשוב וסייבר)',
    field: 'אלקטרוניקה ביטחונית / רדיו תוכנה',
    location: 'גן התעשייה תל חי',
    note: 'מייצרת מערכות רדיו תוכנה Elynx לצה"ל ולצבאות בעולם; כ-200 עובדים',
  },
  {
    id: 'hubayta',
    name: 'HUBayta by OpenValley',
    field: 'מתחם חדשנות/הייטק',
    location: 'עמק החולה',
    note: 'כ-20 חברות טכנולוגיה; בשיתוף פעולה עם Google',
  },
  {
    id: 'tel-hai',
    name: 'תל-חי - אוניברסיטת קריית שמונה בגליל',
    field: 'השכלה גבוהה + R&D',
    location: 'קריית שמונה',
    note: 'הוכרה כאוניברסיטה ע"י המל"ג בינואר 2026; תקציב 570 מיליון ₪',
  },
  {
    id: 'migal',
    name: 'מכון מיגל (MIGAL)',
    field: 'מו"פ ביוטק/אגרוטק',
    location: 'קריית שמונה',
    note: '40+ חברות כלקוחות מו"פ, כולל טבע',
  },
  {
    id: 'shamir-research',
    name: 'מכון שמיר למחקר',
    field: 'מו"פ אקדמי - חקלאות/סביבה',
    location: 'קצרין',
    note: 'בחסות אוניברסיטת חיפה; 12 מעבדות מולקולריות',
  },
  {
    id: 'galcon',
    name: 'גלקון (Galcon)',
    field: 'אגרוטק - בקרת השקיה חכמה',
    location: 'כפר בלום',
    note: 'טכנולוגיית ענן ובקרה מתקדמת',
  },
  {
    id: 'margalit',
    name: 'Margalit Startup City / Workport',
    field: 'חממת חדשנות',
    location: 'קריית שמונה',
    note: 'מרכז סטארטאפים בגיבוי קרן JVP',
  },
  {
    id: 'shalag',
    name: 'שלא"ג תעשיות',
    field: 'טקסטיל תעשייתי מתקדם',
    location: 'קיבוץ שמיר',
    note: 'חברה גלובלית, פעילות גם בארה"ב',
  },
  {
    id: 'rimony',
    name: 'רימוני תעשיות',
    field: 'פלסטיק מדויק / רפואי',
    location: 'קריית שמונה',
    note: 'לקוחות: טבע, HP, BMW, נסטלה',
  },
];
