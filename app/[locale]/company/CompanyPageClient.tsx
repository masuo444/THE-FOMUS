'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useInView } from '@/lib/useInView';

export default function CompanyPageClient({ locale }: { locale: string }) {
  const t = useTranslations('companyPage');
  const homeHref    = locale === 'en' ? '/en' : '/';
  const contactHref = locale === 'en' ? '/en/contact' : '/contact';

  const body    = t.raw('body') as string[];
  const { ref: layoutRef, inView: layoutInView } = useInView<HTMLDivElement>();
  const { ref: detailRef, inView: detailInView } = useInView<HTMLDivElement>();

  const details = [
    { label: t('details.name.label'),     value: t('details.name.value') },
    { label: t('details.founded.label'),  value: t('details.founded.value') },
    { label: t('details.location.label'), value: t('details.location.value') },
    { label: t('details.business.label'), value: t('details.business.value') },
  ];

  return (
    <main className="co-main">

      {/* ── Back + Header ───────────────────────── */}
      <div className="co-nav">
        <Link href={homeHref} className="co-back">← {locale === 'en' ? 'Home' : 'ホームへ'}</Link>
      </div>

      <div className="co-heading">
        <p className="co-heading__eyebrow">{t('label')}</p>
        <h1 className="co-heading__title">{t('headline')}</h1>
        <div className="co-heading__rule" />
      </div>

      {/* ── Body text ───────────────────────────── */}
      <div ref={layoutRef} className={`co-body reveal${layoutInView ? ' is-in-view' : ''}`}>
        {body.map((para, i) => (
          <p key={i} className="co-body__para">{para}</p>
        ))}
      </div>

      {/* ── Company details ─────────────────────── */}
      <div ref={detailRef} className="co-details">
        <p className={`co-details__label reveal${detailInView ? ' is-in-view' : ''}`}>
          {t('details.label')}
        </p>
        <dl className="co-details__list">
          {details.map(({ label, value }, i) => (
            <div
              key={i}
              className={`co-details__row reveal reveal-delay-${Math.min(i + 1, 4)}${detailInView ? ' is-in-view' : ''}`}
            >
              <dt className="co-details__term">{label}</dt>
              <dd className="co-details__def">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── CTA ─────────────────────────────────── */}
      <div className="co-cta">
        <p className="co-cta__question">{t('ctaQuestion')}</p>
        <p className="co-cta__note">{t('ctaNote')}</p>
        <Link href={contactHref} className="co-cta__link">
          <span>{t('cta')}</span>
        </Link>
      </div>

      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1),
                      transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal.is-in-view { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.10s; }
        .reveal-delay-2 { transition-delay: 0.20s; }
        .reveal-delay-3 { transition-delay: 0.30s; }
        .reveal-delay-4 { transition-delay: 0.40s; }

        .co-main {
          background: var(--color-white);
          padding-top: 64px;
        }

        /* Nav */
        .co-nav {
          padding: 2rem clamp(2rem, 8vw, 8rem);
          border-bottom: 1px solid var(--color-line);
        }
        .co-back {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .co-back:hover { color: var(--color-accent); }

        /* Heading */
        .co-heading {
          padding: clamp(4rem, 8vw, 7rem) clamp(2rem, 8vw, 8rem) clamp(3.5rem, 6vw, 5rem);
          border-bottom: 1px solid var(--color-line);
          max-width: 900px;
        }
        .co-heading__eyebrow {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.40em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0 0 1.25rem;
        }
        .co-heading__title {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(2.5rem, 6vw, 5rem);
          line-height: 1;
          color: var(--color-ink);
          margin: 0 0 2.5rem;
          letter-spacing: 0.01em;
        }
        .co-heading__rule {
          width: 2.5rem;
          height: 1px;
          background: var(--color-accent);
          opacity: 0.45;
        }

        /* Body */
        .co-body {
          padding: clamp(4rem, 7vw, 6.5rem) clamp(2rem, 8vw, 8rem);
          border-bottom: 1px solid var(--color-line);
          max-width: 860px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .co-body__para {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: clamp(0.9375rem, 1.3vw, 1.0625rem);
          line-height: 2.2;
          letter-spacing: 0.04em;
          color: var(--color-ink-light);
          margin: 0;
        }

        /* Details */
        .co-details {
          padding: clamp(4rem, 7vw, 6.5rem) clamp(2rem, 8vw, 8rem);
          border-bottom: 1px solid var(--color-line);
          max-width: 700px;
        }
        .co-details__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.6875rem;
          letter-spacing: 0.40em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          opacity: 0.6;
          margin: 0 0 2.5rem;
        }
        .co-details__list {
          margin: 0;
          padding: 0;
        }
        .co-details__row {
          display: grid;
          grid-template-columns: 8rem 1fr;
          gap: 1.5rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--color-line);
          align-items: baseline;
        }
        .co-details__row:first-child {
          border-top: 1px solid var(--color-line);
        }
        .co-details__term {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
        }
        .co-details__def {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: 1rem;
          letter-spacing: 0.04em;
          color: var(--color-ink);
          margin: 0;
          line-height: 1.75;
        }

        /* CTA */
        .co-cta {
          padding: clamp(5rem, 9vw, 8rem) clamp(2rem, 8vw, 8rem);
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 720px;
        }
        .co-cta__question {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          line-height: 1.4;
          color: var(--color-ink);
          margin: 0;
          letter-spacing: 0.01em;
        }
        .co-cta__note {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: clamp(0.875rem, 1.1vw, 1rem);
          line-height: 2;
          letter-spacing: 0.06em;
          color: var(--color-ink-mute);
          margin: 0;
        }
        .co-cta__link {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.25rem, 2vw, 1.625rem);
          color: var(--color-ink);
          text-decoration: none;
          letter-spacing: 0.02em;
          position: relative;
          padding-bottom: 0.2rem;
          transition: color 0.35s ease;
        }
        .co-cta__link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--color-line-dark);
          transition: background 0.35s ease;
        }
        .co-cta__link:hover { color: var(--color-accent); }
        .co-cta__link:hover::after { background: var(--color-accent); }

        @media (max-width: 640px) {
          .co-details__row { grid-template-columns: 1fr; gap: 0.4rem; }
        }
      `}</style>
    </main>
  );
}
