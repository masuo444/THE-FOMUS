'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useInView } from '@/lib/useInView';

export default function FounderPageClient() {
  const t = useTranslations('founderPage');
  const locale = useLocale();
  const homeHref    = locale === 'en' ? '/en' : '/';
  const contactHref = locale === 'en' ? '/en/contact' : '/contact';

  const bodyLines = t.raw('body') as string[];

  const { ref: layoutRef, inView: layoutInView } = useInView<HTMLDivElement>();
  const { ref: statsRef,  inView: statsInView  } = useInView<HTMLDivElement>();

  return (
    <main className="fp-main">

      {/* ── Back link ─────────────────────────────── */}
      <div className="fp-nav">
        <Link href={homeHref} className="fp-back">{locale === 'en' ? '← Home' : '← ホームへ'}</Link>
      </div>

      {/* ── Page title ────────────────────────────── */}
      <div className="fp-heading">
        <p className="fp-heading__eyebrow">{t('label')}</p>
        <h1 className="fp-heading__title">
          {locale === 'en' ? 'Founder Message' : 'ファウンダーメッセージ'}
        </h1>
        <div className="fp-heading__rule" />
      </div>

      {/* ── 2-column: photo + message ─────────────── */}
      <div ref={layoutRef} className="fp-layout">

        {/* Photo */}
        <div className={`fp-photo-col reveal${layoutInView ? ' is-in-view' : ''}`}>
          <div className="fp-photo" />
          <div className="fp-photo-caption">
            <p className="fp-photo-caption__name">{t('name')}</p>
            <p className="fp-photo-caption__title">{t('title')}</p>
          </div>
        </div>

        {/* Message */}
        <div className={`fp-text-col reveal reveal-delay-1${layoutInView ? ' is-in-view' : ''}`}>
          <div className="fp-body">
            {bodyLines.map((para, i) => (
              <p key={i} className="fp-body__para">{para}</p>
            ))}
          </div>
          <p className="fp-signature">{t('nameRoman')}</p>
        </div>

      </div>

      {/* ── Stats ─────────────────────────────────── */}
      <div ref={statsRef} className={`fp-stats reveal${statsInView ? ' is-in-view' : ''}`}>
        <div className="fp-stat">
          <span className="fp-stat__value">{t('stats.countries.value')}</span>
          <span className="fp-stat__label">{t('stats.countries.label')}</span>
        </div>
        <div className="fp-stat__sep" aria-hidden="true" />
        <div className="fp-stat">
          <span className="fp-stat__value">{t('stats.experience.value')}</span>
          <span className="fp-stat__label">{t('stats.experience.label')}</span>
        </div>
        <div className="fp-stat__sep" aria-hidden="true" />
        <div className="fp-stat">
          <span className="fp-stat__value">{t('stats.programs.value')}</span>
          <span className="fp-stat__label">{t('stats.programs.label')}</span>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────── */}
      <div className="fp-cta">
        <Link href={contactHref} className="fp-cta__link">
          <span>{locale === 'en' ? 'Begin the conversation' : '対話を始める'}</span>
          <span className="fp-cta__arrow" aria-hidden="true">→</span>
        </Link>
      </div>

      <style>{`
        /* ── Base ─────────────────────────────────── */
        .fp-main {
          background: var(--color-white);
          padding-top: 64px;
        }

        /* ── Back link ───────────────────────────── */
        .fp-nav {
          padding: 2rem clamp(2rem, 8vw, 8rem);
          border-bottom: 1px solid var(--color-line);
        }
        .fp-back {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .fp-back:hover { color: var(--color-accent); }

        /* ── Page title ──────────────────────────── */
        .fp-heading {
          padding: clamp(3.5rem, 7vw, 6rem) clamp(2rem, 8vw, 8rem) clamp(3rem, 5vw, 5rem);
          border-bottom: 1px solid var(--color-line);
        }
        .fp-heading__eyebrow {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.40em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin: 0 0 1.25rem;
        }
        .fp-heading__title {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(2.5rem, 7vw, 5.5rem);
          line-height: 1;
          color: var(--color-ink);
          margin: 0 0 2.5rem;
          letter-spacing: 0.01em;
        }
        .fp-heading__rule {
          width: 2.5rem;
          height: 1px;
          background: var(--color-accent);
          opacity: 0.45;
        }

        /* ── 2-column layout ─────────────────────── */
        .fp-layout {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 0;
          border-bottom: 1px solid var(--color-line);
        }

        /* Photo column */
        .fp-photo-col {
          border-right: 1px solid var(--color-line);
          padding: clamp(3rem, 5vw, 5rem) clamp(2.5rem, 4vw, 4rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.75rem;
        }
        .fp-photo {
          width: 100%;
          aspect-ratio: 3 / 4;
          background-image: url(/images/founder.png);
          background-size: cover;
          background-position: center top;
        }
        .fp-photo-caption {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .fp-photo-caption__name {
          font-family: var(--font-noto-serif-jp), "Noto Sans JP", sans-serif;
          font-weight: 400;
          font-size: clamp(1.25rem, 2.5vw, 1.75rem);
          color: var(--color-ink);
          letter-spacing: 0.12em;
          margin: 0;
        }
        .fp-photo-caption__title {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0;
        }

        /* Text column */
        .fp-text-col {
          padding: clamp(3rem, 5vw, 5rem) clamp(2.5rem, 5vw, 5.5rem);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .fp-body {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .fp-body__para {
          font-family: var(--font-noto-serif-jp), "Noto Sans JP", sans-serif;
          font-weight: 400;
          font-size: clamp(0.9375rem, 1.3vw, 1.0625rem);
          line-height: 2.2;
          letter-spacing: 0.04em;
          color: var(--color-ink-light);
          margin: 0;
        }
        .fp-signature {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.375rem, 2.5vw, 2rem);
          color: var(--color-ink-mute);
          margin: 3rem 0 0;
          letter-spacing: 0.04em;
        }

        /* ── Stats ───────────────────────────────── */
        .fp-stats {
          display: flex;
          align-items: center;
          padding: clamp(2.5rem, 4vw, 3.5rem) clamp(2rem, 8vw, 8rem);
          border-bottom: 1px solid var(--color-line);
          gap: 0;
        }
        .fp-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.55rem;
          text-align: center;
        }
        .fp-stat__sep {
          width: 1px;
          height: 3rem;
          background: var(--color-line);
          flex-shrink: 0;
        }
        .fp-stat__value {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(2.25rem, 4vw, 3.25rem);
          color: var(--color-accent);
          line-height: 1;
        }
        .fp-stat__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
        }

        /* ── CTA ─────────────────────────────────── */
        .fp-cta {
          display: flex;
          padding: clamp(3.5rem, 6vw, 5rem) clamp(2rem, 8vw, 8rem);
        }
        .fp-cta__link {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.875rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--color-ink);
          text-decoration: none;
          padding: 1.1rem 2.25rem;
          border: 1px solid var(--color-ink);
          transition: background 0.3s ease, color 0.3s ease;
        }
        .fp-cta__link:hover {
          background: var(--color-ink);
          color: var(--color-white);
        }
        .fp-cta__arrow { transition: transform 0.3s ease; }
        .fp-cta__link:hover .fp-cta__arrow { transform: translateX(4px); }

        /* ── Responsive ──────────────────────────── */
        @media (max-width: 900px) {
          .fp-layout {
            grid-template-columns: 1fr;
          }
          .fp-photo-col {
            border-right: none;
            border-bottom: 1px solid var(--color-line);
          }
          .fp-photo {
            max-width: 320px;
            width: 70%;
          }
        }
        @media (max-width: 640px) {
          .fp-stats {
            flex-direction: column;
            gap: 2rem;
            padding: 2.5rem 1.5rem;
          }
          .fp-stat__sep { width: 3rem; height: 1px; }
        }
      `}</style>
    </main>
  );
}
