import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { FAQ_SEO, HOME_SEO, setPageSEO } from '../utils/seo';

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: 'כמה עולה דירה בקריית שמונה?',
    a:
      'לפי הנתונים המוצגים באתר, דירות 3 חדרים מתחילות מכ־750,000 ₪. המחיר הסופי תלוי בפרויקט, בגודל הדירה ובמיקום. מומלץ להשאיר פרטים בטופס יצירת הקשר לקבלת מידע עדכני ומותאם למצבכם.',
  },
  {
    q: 'אילו הטבות מס קיימות למעבר לצפון?',
    a:
      'באתר מצוין כי יש זכאות להטבות מס באזור—כולל קבוצות יעד בערים קבועות כמו קריית שמונה. הפרטים משתנים לפי חוק, שנת מס וזכאות אישית. השאירו פרטים ונחזור אליכם עם כיוון והפניה למקורות רשמיים.',
  },
  {
    q: 'איך מתחילים את תהליך המעבר לקריית שמונה?',
    a:
      'התהליך כולל פרטים ראשוניים, סיור והיכרות עם העיר, התאמה לצרכי המשפחה, והמשך ליווי. זה בדיוק מה שמופיע בקטע "הבחירה להתקדם" בדף הבית—אפשר להתחיל בטופס "השאירו פרטים" או בבקשה למפגש מתעניינים.',
  },
  {
    q: 'למה לבחור בקריית שמונה במיוחד עם משפחה?',
    a:
      'מעל ל־200 משפחות הצטרפו בשנתיים האחרונות, קהילה צומחת, איכות חיים גבוהה וקרבה לטבע (למשל באזור הבניאס ותל דן תוך כ־10 דקות לפי הנתון באתר). זו בחירה שמשלבת דיור נגיש, קהילה ופיתוח אזורי.',
  },
  {
    q: 'איך יוצרים קשר עם צוות הפרויקט?',
    a:
      'באפשרותך למלא את טופס יצירת הקשר בדף הבית, או לכתוב לכתובת info@ks-north.co.il. נשמח לחזור אליכם ולתאם מפגש או סיור.',
  },
];

export function FAQPage() {
  useEffect(() => {
    setPageSEO(FAQ_SEO);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', 'faq-jsonld');
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    });
    document.head.appendChild(script);

    return () => {
      document.querySelector('script[data-seo="faq-jsonld"]')?.remove();
      setPageSEO(HOME_SEO);
    };
  }, []);

  return (
    <section
      style={{
        padding: '120px 24px 80px',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <p style={{ fontSize: '13px', fontWeight: 600, color: '#6b8a5e', marginBottom: '12px', letterSpacing: '0.5px' }}>
        קידום אורגני · שאלות נפוצות
      </p>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#1e2d27', marginBottom: '16px', lineHeight: 1.2 }}>
        שאלות נפוצות על מעבר לקריית שמונה
      </h1>
      <p style={{ fontSize: '17px', lineHeight: 1.75, color: '#4a5e50', marginBottom: '40px' }}>
        מידע כללי המבוסס על התוכן באתר. לפרטים אישיים והצעה מעודכנת —{' '}
        <Link to="/#contact" style={{ color: '#c2754a', fontWeight: 600 }}>
          השאירו פרטים
        </Link>{' '}
        או חזרו ל
        <Link to="/" style={{ color: '#c2754a', fontWeight: 600, marginRight: '4px' }}>
          דף הבית
        </Link>
        .
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {FAQ_ITEMS.map((item) => (
          <article
            key={item.q}
            style={{
              paddingBottom: '28px',
              borderBottom: '1px solid rgba(42,67,50,0.12)',
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#2a4332', marginBottom: '12px', lineHeight: 1.35 }}>
              {item.q}
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.75, color: '#4a5e50', margin: 0 }}>
              {item.a}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
