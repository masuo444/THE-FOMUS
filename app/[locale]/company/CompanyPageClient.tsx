'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useInView } from '@/lib/useInView';

interface DetailItem {
  label: string;
  value: string;
}

interface GlobalItem {
  city: string;
  role: string;
  description: string;
}

interface Representative {
  name: string;
  nameRoman: string;
  title: string;
  bio: string;
}

export default function CompanyPageClient({ locale }: { locale: string }) {
  const t = useTranslations('companyPage');
  const homeHref    = locale === 'en' ? '/en' : '/';
  const contactHref = locale === 'en' ? '/en/contact' : '/contact';
  const founderHref = locale === 'en' ? '/en/founder' : '/founder';

  const about          = t.raw('about') as string[];
  const details        = t.raw('details') as DetailItem[];
  const global         = t.raw('global') as GlobalItem[];
  const representative = t.raw('representative') as Representative;

  const { ref: aboutRef,   inView: aboutInView }   = useInView<HTMLDivElement>();
  const { ref: detailRef,  inView: detailInView }   = useInView<HTMLDivElement>();
  const { ref: globalRef,  inView: globalInView }   = useInView<HTMLDivElement>();
  const { ref: repRef,     inView: repInView }       = useInView<HTMLDivElement>();
  const { ref: ctaRef,     inView: ctaInView }       = useInView<HTMLDivElement>();

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

      {/* ── About ───────────────────────────────── */}
      <div ref={aboutRef} className={`co-about reveal${aboutInView ? ' is-in-view' : ''}`}>
        <p className="co-about__label">{t('aboutLabel')}</p>
        {about.map((para, i) => (
          <p key={i} className="co-about__para">{para}</p>
        ))}
      </div>

      {/* ── Company Information ──────────────────── */}
      <div ref={detailRef} className="co-details">
        <p className={`co-details__label reveal${detailInView ? ' is-in-view' : ''}`}>
          {t('detailsLabel')}
        </p>
        <dl className="co-details__list">
          {details.map(({ label, value }, i) => (
            <div
              key={i}
              className={`co-details__row reveal reveal-delay-${Math.min(i + 1, 4)}${detailInView ? ' is-in-view' : ''}`}
            >
              <dt className="co-details__term">{label}</dt>
              <dd className="co-details__def">
                {value.includes('\n')
                  ? value.split('\n').map((line, j) => (
                      <span key={j}>
                        {line}
                        {j < value.split('\n').length - 1 && <br />}
                      </span>
                    ))
                  : value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── Global Presence ──────────────────────── */}
      <div ref={globalRef} className={`co-global reveal${globalInView ? ' is-in-view' : ''}`}>
        <p className="co-global__label">{t('globalLabel')}</p>
        <div className="co-global__grid">
          {global.map((item, i) => (
            <div key={i} className={`co-global__card reveal reveal-delay-${Math.min(i + 1, 4)}${globalInView ? ' is-in-view' : ''}`}>
              <h3 className="co-global__city">{item.city}</h3>
              <p className="co-global__role">{item.role}</p>
              <p className="co-global__desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Representative ───────────────────────── */}
      <div ref={repRef} className={`co-rep reveal${repInView ? ' is-in-view' : ''}`}>
        <p className="co-rep__label">{t('representativeLabel')}</p>
        <div className="co-rep__layout">
          <div className="co-rep__photo" />
          <div className="co-rep__info">
            <p className="co-rep__name">{representative.name}</p>
            <p className="co-rep__name-roman">{representative.nameRoman}</p>
            <p className="co-rep__title">{representative.title}</p>
            <p className="co-rep__bio">{representative.bio}</p>
            <Link href={founderHref} className="co-rep__link">
              {locale === 'en' ? 'Read more' : '詳しく見る'}
            </Link>
          </div>
        </div>
      </div>

      {/* ── CTA ─────────────────────────────────── */}
      <div ref={ctaRef} className={`co-cta reveal${ctaInView ? ' is-in-view' : ''}`}>
        <Link href={contactHref} className="co-cta__button">
          {t('cta')}
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
          background: var(--color-ink-mute);
          opacity: 0.45;
        }

        /* About */
        .co-about {
          padding: clamp(4rem, 7vw, 6.5rem) clamp(2rem, 8vw, 8rem);
          border-bottom: 1px solid var(--color-line);
          max-width: 860px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .co-about__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.6875rem;
          letter-spacing: 0.40em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0 0 0.5rem;
        }
        .co-about__para {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
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
          max-width: 780px;
        }
        .co-details__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.6875rem;
          letter-spacing: 0.40em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0 0 2.5rem;
        }
        .co-details__list {
          margin: 0;
          padding: 0;
        }
        .co-details__row {
          display: grid;
          grid-template-columns: 10rem 1fr;
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
          font-weight: 300;
          font-size: 1rem;
          letter-spacing: 0.04em;
          color: var(--color-ink);
          margin: 0;
          line-height: 1.75;
          white-space: pre-line;
        }

        /* Global Presence */
        .co-global {
          padding: clamp(4rem, 7vw, 6.5rem) clamp(2rem, 8vw, 8rem);
          border-bottom: 1px solid var(--color-line);
        }
        .co-global__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.6875rem;
          letter-spacing: 0.40em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0 0 2.5rem;
        }
        .co-global__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
        }
        .co-global__card {
          border-top: 1px solid var(--color-line);
          padding-top: 1.5rem;
        }
        .co-global__city {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          color: var(--color-ink);
          margin: 0;
          line-height: 1.2;
        }
        .co-global__role {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.6875rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0.25rem 0 0;
        }
        .co-global__desc {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: clamp(0.875rem, 1.1vw, 0.9375rem);
          line-height: 2;
          color: var(--color-ink-light);
          margin: 1rem 0 0;
        }

        /* Representative */
        .co-rep {
          padding: clamp(4rem, 7vw, 6.5rem) clamp(2rem, 8vw, 8rem);
          border-bottom: 1px solid var(--color-line);
        }
        .co-rep__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.6875rem;
          letter-spacing: 0.40em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0 0 2.5rem;
        }
        .co-rep__layout {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 3rem;
          align-items: start;
        }
        .co-rep__photo {
          width: 100%;
          aspect-ratio: 3 / 4;
          background-image: url(/images/founder.png);
          background-size: cover;
          background-position: center top;
        }
        .co-rep__info {
          display: flex;
          flex-direction: column;
        }
        .co-rep__name {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: clamp(1.25rem, 2vw, 1.5rem);
          color: var(--color-ink);
          letter-spacing: 0.1em;
          margin: 0;
        }
        .co-rep__name-roman {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(0.9rem, 1.3vw, 1rem);
          color: var(--color-ink-mute);
          margin: 0.35rem 0 0;
        }
        .co-rep__title {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0.5rem 0 0;
        }
        .co-rep__bio {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: clamp(0.9375rem, 1.3vw, 1.0625rem);
          line-height: 2.2;
          color: var(--color-ink-light);
          margin: 1.5rem 0 0;
        }
        .co-rep__link {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1rem, 1.5vw, 1.125rem);
          color: var(--color-ink);
          text-decoration: none;
          padding-bottom: 0.2rem;
          border-bottom: 1px solid var(--color-line-dark, var(--color-ink));
          margin: 1.5rem 0 0;
          align-self: flex-start;
          transition: color 0.35s ease, border-color 0.35s ease;
        }
        .co-rep__link:hover {
          color: var(--color-accent);
          border-color: var(--color-accent);
        }

        /* CTA */
        .co-cta {
          padding: clamp(4rem, 7vw, 6rem);
          display: flex;
          justify-content: center;
        }
        .co-cta__button {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.25rem, 2vw, 1.625rem);
          color: var(--color-ink);
          text-decoration: none;
          padding-bottom: 0.2rem;
          border-bottom: 1px solid var(--color-ink);
          transition: color 0.35s ease, border-color 0.35s ease;
        }
        .co-cta__button:hover {
          color: var(--color-accent);
          border-color: var(--color-accent);
        }

        /* Mobile */
        @media (max-width: 768px) {
          .co-global__grid { grid-template-columns: 1fr; }
          .co-rep__layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .co-rep__photo {
            max-width: 200px;
            margin: 0 auto;
          }
        }
        @media (max-width: 640px) {
          .co-details__row { grid-template-columns: 1fr; gap: 0.4rem; }
        }
      `}</style>
    </main>
  );
}
