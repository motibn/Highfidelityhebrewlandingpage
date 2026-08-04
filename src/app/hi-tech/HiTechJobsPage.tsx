import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Briefcase, ExternalLink, MapPin, MessageCircle, Search, X } from 'lucide-react';
import { setPageSEO } from '../utils/seo';
import {
  buildWhatsAppJobUrl,
  HI_TECH_JOBS,
  JOB_DOMAIN_LABELS,
  JOB_LEVEL_LABELS,
  type HiTechJob,
  type JobDomain,
  type JobLevel,
} from './jobs-data';
import { HI_TECH_JOBS_PATH, HI_TECH_JOBS_SEO, HT } from './tokens';

function pushJobCtaEvent(job: HiTechJob, channel: 'comeet' | 'whatsapp'): void {
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: channel === 'comeet' ? 'hi_tech_job_apply' : 'hi_tech_job_whatsapp',
    job_id: job.id,
    job_title: job.title,
    job_company: job.company,
    job_level: job.level,
    job_domain: job.domain,
    page_path: HI_TECH_JOBS_PATH,
    campaign: 'hi-tech',
  });
}

const DOMAIN_OPTIONS = Object.entries(JOB_DOMAIN_LABELS) as [JobDomain, string][];

const chipBase: CSSProperties = {
  fontFamily: HT.fontSans,
  fontSize: 13,
  fontWeight: 600,
  padding: '8px 14px',
  borderRadius: 999,
  border: '1px solid rgba(52,88,66,0.14)',
  cursor: 'pointer',
  transition: 'background 0.2s, color 0.2s, border-color 0.2s',
  whiteSpace: 'nowrap',
};

function levelChipStyle(level: JobLevel | null): CSSProperties {
  if (level === null) {
    return {
      background: 'rgba(52,88,66,0.08)',
      color: HT.greenDark,
      border: '1px solid rgba(52,88,66,0.16)',
      borderRadius: 999,
      padding: '4px 10px',
      fontSize: 12,
      fontWeight: 700,
      fontFamily: HT.fontSans,
    };
  }
  if (level === 'junior') {
    return {
      background: 'rgba(150,186,139,0.22)',
      color: HT.greenDark,
      border: '1px solid rgba(104,146,99,0.35)',
      borderRadius: 999,
      padding: '4px 10px',
      fontSize: 12,
      fontWeight: 700,
      fontFamily: HT.fontSans,
    };
  }
  return {
    background: 'rgba(168,92,128,0.12)',
    color: HT.plum,
    border: '1px solid rgba(168,92,128,0.28)',
    borderRadius: 999,
    padding: '4px 10px',
    fontSize: 12,
    fontWeight: 700,
    fontFamily: HT.fontSans,
  };
}

function levelLabel(level: JobLevel | null): string {
  if (level === null) return 'חברה באזור';
  return JOB_LEVEL_LABELS[level];
}

export function HiTechJobsPage() {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<JobLevel | 'all'>('all');
  const [domain, setDomain] = useState<JobDomain | 'all'>('all');

  useEffect(() => {
    setPageSEO(HI_TECH_JOBS_SEO);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HI_TECH_JOBS.filter((job) => {
      if (level !== 'all' && job.level !== level) return false;
      if (domain !== 'all' && job.domain !== domain) return false;
      if (!q) return true;
      const hay =
        `${job.title} ${job.company} ${job.domainLabel} ${job.location} ${job.note ?? ''}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, level, domain]);

  const hasFilters = query.trim() !== '' || level !== 'all' || domain !== 'all';

  const resetFilters = () => {
    setQuery('');
    setLevel('all');
    setDomain('all');
  };

  return (
    <div style={{ fontFamily: HT.fontSans, background: HT.cream, minHeight: '60vh' }}>
      <section
        style={{
          position: 'relative',
          padding: '120px 24px 48px',
          background: `linear-gradient(165deg, ${HT.mint} 0%, ${HT.cream} 55%, #EEF5EA 100%)`,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 80% 10%, rgba(168,92,128,0.08) 0%, transparent 45%), radial-gradient(ellipse at 10% 80%, rgba(52,88,66,0.06) 0%, transparent 40%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: 920, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              fontFamily: HT.fontScript,
              fontSize: 22,
              color: HT.terracotta,
              margin: '0 0 8px',
            }}
          >
            משרות בהייטק
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{
              fontSize: 'clamp(28px, 4.2vw, 44px)',
              fontWeight: 900,
              color: HT.greenDark,
              margin: '0 0 12px',
              lineHeight: 1.15,
            }}
          >
            הבחירה הצפונית — משרות וחברות בגליל
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: 17,
              color: HT.muted,
              lineHeight: 1.7,
              margin: '0 0 20px',
              maxWidth: 560,
            }}
          >
            משרות פתוחות להגשה ישירה, וחברות באזור — נחבר אתכם בוואטסאפ כשאין קישור הגשה.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: HT.white,
              border: '1px solid rgba(52,88,66,0.1)',
              borderRadius: 999,
              padding: '8px 16px',
              fontSize: 14,
              fontWeight: 700,
              color: HT.greenDark,
              boxShadow: '0 4px 16px rgba(52,88,66,0.06)',
            }}
          >
            <Briefcase size={16} aria-hidden />
            {HI_TECH_JOBS.length} הזדמנויות באזור
          </motion.div>
        </div>
      </section>

      <div
        style={{
          position: 'sticky',
          top: 88,
          zIndex: 40,
          background: 'rgba(247,251,245,0.94)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(52,88,66,0.08)',
          padding: '14px 24px',
        }}
      >
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <label
              style={{
                position: 'relative',
                flex: '1 1 220px',
                minWidth: 180,
              }}
            >
              <span className="sr-only">חיפוש משרות</span>
              <Search
                size={16}
                aria-hidden
                style={{
                  position: 'absolute',
                  right: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: HT.muted,
                  pointerEvents: 'none',
                }}
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="חיפוש לפי תפקיד, חברה או תחום..."
                style={{
                  width: '100%',
                  fontFamily: HT.fontSans,
                  fontSize: 14,
                  padding: '11px 40px 11px 14px',
                  borderRadius: 12,
                  border: '1px solid rgba(52,88,66,0.16)',
                  background: HT.white,
                  color: HT.greenDark,
                  outline: 'none',
                }}
              />
            </label>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }} role="group" aria-label="סינון לפי רמה">
              {(
                [
                  ['all', 'הכל'],
                  ['junior', JOB_LEVEL_LABELS.junior],
                  ['senior', JOB_LEVEL_LABELS.senior],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setLevel(value)}
                  style={{
                    ...chipBase,
                    background: level === value ? HT.greenDark : HT.white,
                    color: level === value ? HT.white : HT.greenDark,
                    borderColor: level === value ? HT.greenDark : 'rgba(52,88,66,0.14)',
                  }}
                  aria-pressed={level === value}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
              marginTop: 10,
              alignItems: 'center',
            }}
            role="group"
            aria-label="סינון לפי תחום"
          >
            <button
              type="button"
              onClick={() => setDomain('all')}
              style={{
                ...chipBase,
                background: domain === 'all' ? HT.plum : HT.white,
                color: domain === 'all' ? HT.white : HT.greenDark,
                borderColor: domain === 'all' ? HT.plum : 'rgba(52,88,66,0.14)',
              }}
              aria-pressed={domain === 'all'}
            >
              כל התחומים
            </button>
            {DOMAIN_OPTIONS.map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setDomain(key)}
                style={{
                  ...chipBase,
                  background: domain === key ? HT.plum : HT.white,
                  color: domain === key ? HT.white : HT.greenDark,
                  borderColor: domain === key ? HT.plum : 'rgba(52,88,66,0.14)',
                }}
                aria-pressed={domain === key}
              >
                {label}
              </button>
            ))}
            {hasFilters && (
              <button
                type="button"
                onClick={resetFilters}
                style={{
                  ...chipBase,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  background: 'transparent',
                  color: HT.muted,
                  borderColor: 'transparent',
                }}
              >
                <X size={14} aria-hidden />
                איפוס
              </button>
            )}
          </div>

          <p
            style={{
              margin: '10px 0 0',
              fontSize: 13,
              color: HT.muted,
              fontWeight: 500,
            }}
            aria-live="polite"
          >
            {filtered.length} מתוך {HI_TECH_JOBS.length} הזדמנויות
          </p>
        </div>
      </div>

      <section id="jobs" style={{ padding: '32px 24px 64px' }} aria-label="רשימת משרות וחברות">
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '48px 24px',
                background: HT.white,
                borderRadius: 20,
                border: '1px solid rgba(52,88,66,0.08)',
              }}
            >
              <p style={{ fontSize: 18, fontWeight: 700, color: HT.greenDark, margin: '0 0 8px' }}>
                לא מצאנו התאמות
              </p>
              <p style={{ fontSize: 15, color: HT.muted, margin: '0 0 20px', lineHeight: 1.6 }}>
                נסו לאפס את הסינון, או השאירו פרטים לליווי אישי במציאת תפקיד.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={resetFilters}
                  style={{
                    fontFamily: HT.fontSans,
                    fontSize: 15,
                    fontWeight: 700,
                    padding: '12px 22px',
                    borderRadius: 14,
                    border: `1.5px solid ${HT.greenDark}`,
                    background: 'transparent',
                    color: HT.greenDark,
                    cursor: 'pointer',
                  }}
                >
                  איפוס סינון
                </button>
                <Link
                  to="/hi-tech/#contact"
                  style={{
                    fontFamily: HT.fontSans,
                    fontSize: 15,
                    fontWeight: 700,
                    padding: '12px 22px',
                    borderRadius: 14,
                    background: HT.plum,
                    color: HT.white,
                    textDecoration: 'none',
                    boxShadow: '0 8px 22px rgba(168,92,128,0.28)',
                  }}
                >
                  ליווי אישי
                </Link>
              </div>
            </div>
          ) : (
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {filtered.map((job, i) => {
                const hasApply = Boolean(job.applyUrl);
                const ctaHref = hasApply ? job.applyUrl! : buildWhatsAppJobUrl(job);
                const showCompanyLine = job.company !== job.title;

                return (
                  <motion.li
                    key={job.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.24) }}
                  >
                    <article
                      style={{
                        background: HT.white,
                        borderRadius: 16,
                        border: '1px solid rgba(52,88,66,0.08)',
                        padding: '20px 22px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 16,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ flex: '1 1 240px', minWidth: 0 }}>
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 8,
                            alignItems: 'center',
                            marginBottom: 6,
                          }}
                        >
                          <span style={levelChipStyle(job.level)}>{levelLabel(job.level)}</span>
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: HT.muted,
                              background: HT.mint,
                              borderRadius: 999,
                              padding: '4px 10px',
                            }}
                          >
                            {job.domain === 'employer'
                              ? job.domainLabel
                              : JOB_DOMAIN_LABELS[job.domain]}
                          </span>
                        </div>
                        <h2
                          style={{
                            fontSize: 'clamp(17px, 2.4vw, 20px)',
                            fontWeight: 800,
                            color: HT.greenDark,
                            margin: '0 0 6px',
                            lineHeight: 1.3,
                            fontFamily: /[A-Za-z]/.test(job.title) ? HT.fontEng : HT.fontSans,
                          }}
                        >
                          {job.title}
                        </h2>
                        {showCompanyLine && (
                          <p
                            style={{
                              margin: '0 0 6px',
                              fontSize: 14,
                              fontWeight: 600,
                              color: HT.greenMid,
                              fontFamily: HT.fontEng,
                            }}
                          >
                            {job.company}
                            <span style={{ color: HT.muted, fontWeight: 500, fontFamily: HT.fontSans }}>
                              {' '}
                              · {job.domainLabel}
                            </span>
                          </p>
                        )}
                        {!showCompanyLine && (
                          <p
                            style={{
                              margin: '0 0 6px',
                              fontSize: 14,
                              fontWeight: 500,
                              color: HT.muted,
                            }}
                          >
                            {job.domainLabel}
                          </p>
                        )}
                        {job.note && (
                          <p
                            style={{
                              margin: '0 0 8px',
                              fontSize: 13,
                              color: HT.muted,
                              lineHeight: 1.5,
                            }}
                          >
                            {job.note}
                          </p>
                        )}
                        <p
                          style={{
                            margin: 0,
                            fontSize: 13,
                            color: HT.muted,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                          }}
                        >
                          <MapPin size={13} aria-hidden />
                          {job.location}
                        </p>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'stretch',
                          gap: 6,
                          flex: '0 0 auto',
                        }}
                      >
                        <a
                          href={ctaHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            pushJobCtaEvent(job, hasApply ? 'comeet' : 'whatsapp')
                          }
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                            fontFamily: HT.fontSans,
                            fontSize: 15,
                            fontWeight: 700,
                            padding: '12px 22px',
                            borderRadius: 14,
                            background: hasApply ? HT.plum : HT.greenDark,
                            color: HT.white,
                            textDecoration: 'none',
                            boxShadow: hasApply
                              ? '0 8px 22px rgba(168,92,128,0.28)'
                              : '0 8px 22px rgba(52,88,66,0.28)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {hasApply ? (
                            <>
                              להגשה
                              <ExternalLink size={15} aria-hidden />
                            </>
                          ) : (
                            <>
                              דברו איתנו בוואטסאפ
                              <MessageCircle size={15} aria-hidden />
                            </>
                          )}
                        </a>
                        <span
                          style={{
                            fontSize: 11,
                            color: HT.muted,
                            textAlign: 'center',
                          }}
                        >
                          {hasApply
                            ? 'ההגשה באתר Genpact'
                            : 'נחבר אתכם להזדמנויות בחברה'}
                        </span>
                      </div>
                    </article>
                  </motion.li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <section
        style={{
          padding: '72px 24px',
          background: `linear-gradient(160deg, ${HT.greenDark} 0%, #2A4A38 55%, ${HT.greenDark} 100%)`,
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(24px, 3.5vw, 32px)',
              fontWeight: 800,
              color: HT.cream,
              margin: '0 0 12px',
              lineHeight: 1.25,
            }}
          >
            לא מצאתם התאמה?
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'rgba(217,227,210,0.88)',
              lineHeight: 1.7,
              margin: '0 0 28px',
            }}
          >
            נלווה אתכם במציאת תפקיד מתאים ובמעבר לצפון — השאירו פרטים ונחזור אליכם.
          </p>
          <Link
            to="/hi-tech/#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: HT.fontSans,
              fontSize: 16,
              fontWeight: 700,
              padding: '14px 28px',
              borderRadius: 14,
              background: HT.plum,
              color: HT.white,
              textDecoration: 'none',
              boxShadow: '0 8px 22px rgba(168,92,128,0.35)',
            }}
          >
            ליווי אישי למעבר
          </Link>
        </div>
      </section>

      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </div>
  );
}
