# לוח בקרה משרות הייטק — מדריך לרכז התעסוקה

## כניסה

1. גלשו ל-[https://www.k8now.com/admin/login/](https://www.k8now.com/admin/login/)
2. הזינו אימייל וסיסמה (מוגדרים על ידי מנהל המערכת)
3. אחרי התחברות תגיעו ללוח **ניהול משרות**

## הוספת משרה חדשה

1. לחצו **משרה חדשה**
2. מלאו: כותרת, חברה, תחום, מיקום
3. **קישור הגשה (Comeet)** — אם יש; אם ריק, המערכת תציג כפתור וואטסאפ לעמותה
4. **רמה**: כניסה / בכיר / חברה באזור
5. **סטטוס**:
   - **טיוטה** — לא מוצג בדף הציבורי
   - **פורסם** — מוצג מיד ב-[דף המשרות](/hi-tech/jobs/)
6. שמרו או **שמירה ופרסום**

## עריכה / הסתרה / ארכיון

- **עריכה** — עדכון פרטים
- **פרסום** — מעבר לטיוטה → פורסם
- **הסתרה** — חזרה לטיוטה (לא נראה בציבור)
- **ארכיון** — משרה ישנה שלא רלוונטית
- **מחיקה** — הסרה לצמיתות (זהירות)

## מעקב לחיצות

בטבלה מופיעות לחיצות **הגשה** (Comeet) ו-**וואטסאפ** לכל משרה.  
נתונים נוספים זמינים גם ב-Google Analytics (אירועי GTM).

## פעילות אחרונה

בתחתית הלוח מוצג לוג שינויים: יצירה, עדכון, מחיקה.

---

## הגדרה ראשונית (מנהל מערכת)

### 1. Supabase

1. פרויקט ב-[Supabase](https://supabase.com) (אפשר להשתמש בפרויקט הקיים `kileypqjwcuwciqxzcpv` או ליצור חדש)
2. הריצו SQL מ-[supabase/migrations/001_hi_tech_jobs.sql](../supabase/migrations/001_hi_tech_jobs.sql) ב-SQL Editor
3. Authentication → Users → צרו משתמש לרכז
4. SQL להוספת הרשאה:

```sql
INSERT INTO user_roles (user_id, role)
VALUES ('UUID-OF-AUTH-USER', 'coordinator');
```

### 2. Seed משרות קיימות

```bash
SUPABASE_URL=https://xxx.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=eyJ... \
node scripts/seed-jobs.mjs
```

### 3. Vercel / build

בפרויקט ב-[Vercel Dashboard](https://vercel.com) → Settings → Environment Variables הוסיפו (Production + Preview):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

**לא** להוסיף `SUPABASE_SERVICE_ROLE_KEY` ל-Vercel.

אחרי שמירה — Redeploy (או push ל-git). עדכוני משרות מהלוח **מיידיים** — אין צורך ב-build חוזר לכל עריכה.

### 4. אבטחה

- אל תשתפו `SUPABASE_SERVICE_ROLE_KEY`
- `anon key` בטוח לדפדפן עם RLS
- `/admin` מסומן `noindex` — אין קישור ציבורי מהאתר
