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
  const globalItems    = t.raw('global') as GlobalItem[];
  const representative = t.raw('representative') as Representative;

  const { ref: aboutRef,   inView: aboutInView }   = useInView<HTMLDivElement>();
  const { ref: detailRef,  inView: detailInView }   = useInView<HTMLDivElement>();
  const { ref: globalRef,  inView: globalInView }   = useInView<HTMLDivElement>();
  const { ref: repRef,     inView: repInView }       = useInView<HTMLDivElement>();

  return (
    <main className="co-main">

      {/* ── Back ────────────────────────────────── */}
      <div className="co-nav">
        <Link href={homeHref} className="co-back">← {locale === 'en' ? 'Home' : 'ホームへ'}</Link>
      </div>

      {/* ── Hero heading ────────────────────────── */}
      <section className="co-hero">
        <p className="co-hero__eyebrow">{t('label')}</p>
        <h1 className="co-hero__title">{t('headline')}</h1>
      </section>

      {/* ── About (full-width statement) ─────────── */}
      <section ref={aboutRef} className={`co-about reveal${aboutInView ? ' is-in-view' : ''}`}>
        <div className="co-about__inner">
          {about.map((para, i) => (
            <p key={i} className={`co-about__para${i === 0 ? ' co-about__para--lead' : ''}`}>{para}</p>
          ))}
        </div>
      </section>

      {/* ── Global Presence (wide 3-col) ─────────── */}
      <section ref={globalRef} className="co-global">
        <p className={`co-global__label reveal${globalInView ? ' is-in-view' : ''}`}>{t('globalLabel')}</p>
        <div className="co-global__grid">
          {globalItems.map((item, i) => (
            <div key={i} className={`co-global__card reveal reveal-delay-${i + 1}${globalInView ? ' is-in-view' : ''}`}>
              <span className="co-global__num">{'0' + (i + 1)}</span>
              <h3 className="co-global__city">{item.city}</h3>
              <p className="co-global__role">{item.role}</p>
              <p className="co-global__desc">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Representative (editorial 2-col) ──────── */}
      <section ref={repRef} className={`co-rep reveal${repInView ? ' is-in-view' : ''}`}>
        <div className="co-rep__layout">
          <div className="co-rep__photo-wrap">
            <div className="co-rep__photo" />
          </div>
          <div className="co-rep__content">
            <p className="co-rep__eyebrow">{t('representativeLabel')}</p>
            <p className="co-rep__name">{representative.name}</p>
            <p className="co-rep__name-roman">{representative.nameRoman}</p>
            <p className="co-rep__title-text">{representative.title}</p>
            <p className="co-rep__bio">{representative.bio}</p>
            <Link href={founderHref} className="co-rep__link">
              {locale === 'en' ? 'Read full story →' : 'ストーリーを読む →'}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Company Information (clean table) ────── */}
      <section ref={detailRef} className="co-details">
        <div className={`co-details__inner reveal${detailInView ? ' is-in-view' : ''}`}>
          <p className="co-details__label">{t('detailsLabel')}</p>
          <dl className="co-details__list">
            {details.map(({ label, value }, i) => (
              <div key={i} className="co-details__row">
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
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section className="co-cta">
        <Link href={contactHref} className="co-cta__button">
          {t('cta')}
        </Link>
      </section>

      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1),
                      transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal.is-in-view { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.12s; }
        .reveal-delay-2 { transition-delay: 0.24s; }
        .reveal-delay-3 { transition-delay: 0.36s; }

        .co-main {
          background: var(--color-white);
          padding-top: 64px;
        }

        /* ── Nav ──────────────────────────────── */
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

        /* ── Hero ─────────────────────────────── */
        .co-hero {
          padding: clamp(6rem, 12vw, 11rem) clamp(2rem, 8vw, 8rem) clamp(5rem, 10vw, 9rem);
          text-align: center;
        }
        .co-hero__eyebrow {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0 0 1.5rem;
        }
        .co-hero__title {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(3.5rem, 9vw, 7rem);
          line-height: 1;
          color: var(--color-ink);
          margin: 0;
          letter-spacing: 0.01em;
        }

        /* ── About ────────────────────────────── */
        .co-about {
          padding: clamp(4rem, 7vw, 6rem) clamp(2rem, 8vw, 8rem);
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
        }
        .co-about__inner {
          max-width: 780px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .co-about__para {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: clamp(0.9375rem, 1.2vw, 1.0625rem);
          line-height: 2.3;
          letter-spacing: 0.04em;
          color: var(--color-ink-light);
          margin: 0;
        }
        .co-about__para--lead {
          font-size: clamp(1.0625rem, 1.4vw, 1.1875rem);
          color: var(--color-ink);
          font-weight: 300;
        }

        /* ── Global Presence ──────────────────── */
        .co-global {
          padding: clamp(5rem, 8vw, 7rem) clamp(2rem, 8vw, 8rem);
          background: #fafaf8;
          border-bottom: 1px solid var(--color-line);
        }
        .co-global__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.40em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0 0 clamp(2.5rem, 4vw, 3.5rem);
          text-align: center;
        }
        .co-global__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          max-width: 1100px;
          margin: 0 auto;
        }
        .co-global__card {
          padding: clamp(2rem, 3vw, 3rem);
          text-align: center;
          position: relative;
        }
        .co-global__card:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0;
          top: 15%;
          height: 70%;
          width: 1px;
          background: var(--color-line);
        }
        .co-global__num {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: 0.875rem;
          color: var(--color-ink-mute);
          opacity: 0.5;
          display: block;
          margin-bottom: 1rem;
        }
        .co-global__city {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          color: var(--color-ink);
          margin: 0;
          line-height: 1.1;
        }
        .co-global__role {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.6875rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0.6rem 0 0;
        }
        .co-global__desc {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: clamp(0.8125rem, 1vw, 0.875rem);
          line-height: 2;
          color: var(--color-ink-light);
          margin: 1.25rem 0 0;
        }

        /* ── Representative ───────────────────── */
        .co-rep {
          padding: clamp(5rem, 8vw, 7rem) clamp(2rem, 8vw, 8rem);
          border-bottom: 1px solid var(--color-line);
        }
        .co-rep__layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: clamp(3rem, 5vw, 5rem);
          max-width: 960px;
          margin: 0 auto;
          align-items: center;
        }
        .co-rep__photo-wrap {
          position: relative;
        }
        .co-rep__photo {
          width: 100%;
          aspect-ratio: 3 / 4;
          background-image: url(/images/founder.png);
          background-size: cover;
          background-position: center top;
        }
        .co-rep__content {
          display: flex;
          flex-direction: column;
        }
        .co-rep__eyebrow {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.6875rem;
          letter-spacing: 0.40em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0 0 2rem;
        }
        .co-rep__name {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: clamp(1.5rem, 2.5vw, 1.875rem);
          color: var(--color-ink);
          letter-spacing: 0.12em;
          margin: 0;
        }
        .co-rep__name-roman {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1rem, 1.5vw, 1.125rem);
          color: var(--color-ink-mute);
          margin: 0.4rem 0 0;
          letter-spacing: 0.03em;
        }
        .co-rep__title-text {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0.75rem 0 0;
        }
        .co-rep__bio {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: clamp(0.9375rem, 1.2vw, 1.0625rem);
          line-height: 2.3;
          color: var(--color-ink-light);
          margin: 2rem 0 0;
        }
        .co-rep__link {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1rem, 1.4vw, 1.125rem);
          color: var(--color-ink);
          text-decoration: none;
          padding-bottom: 0.2rem;
          border-bottom: 1px solid var(--color-ink);
          margin: 2rem 0 0;
          align-self: flex-start;
          transition: color 0.35s ease, border-color 0.35s ease;
        }
        .co-rep__link:hover {
          color: var(--color-accent);
          border-color: var(--color-accent);
        }

        /* ── Details ──────────────────────────── */
        .co-details {
          padding: clamp(5rem, 8vw, 7rem) clamp(2rem, 8vw, 8rem);
          border-bottom: 1px solid var(--color-line);
        }
        .co-details__inner {
          max-width: 720px;
          margin: 0 auto;
        }
        .co-details__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.40em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0 0 2.5rem;
          text-align: center;
        }
        .co-details__list {
          margin: 0;
          padding: 0;
        }
        .co-details__row {
          display: grid;
          grid-template-columns: 11rem 1fr;
          gap: 2rem;
          padding: 1.4rem 0;
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
          font-size: 0.9375rem;
          letter-spacing: 0.04em;
          color: var(--color-ink);
          margin: 0;
          line-height: 1.85;
        }

        /* ── CTA ──────────────────────────────── */
        .co-cta {
          padding: clamp(4rem, 7vw, 6rem) clamp(2rem, 8vw, 8rem);
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
          padding-bottom: 0.25rem;
          border-bottom: 1px solid var(--color-ink);
          transition: color 0.35s ease, border-color 0.35s ease;
        }
        .co-cta__button:hover {
          color: var(--color-accent);
          border-color: var(--color-accent);
        }

        /* ── Responsive ───────────────────────── */
        @media (max-width: 900px) {
          .co-rep__layout {
            grid-template-columns: 1fr;
            max-width: 560px;
          }
          .co-rep__photo {
            max-width: 280px;
          }
        }
        @media (max-width: 768px) {
          .co-global__grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .co-global__card {
            padding: clamp(2rem, 4vw, 2.5rem) 0;
            text-align: left;
            border-bottom: 1px solid var(--color-line);
          }
          .co-global__card:not(:last-child)::after {
            display: none;
          }
          .co-global__card:last-child {
            border-bottom: none;
          }
        }
        @media (max-width: 640px) {
          .co-details__row {
            grid-template-columns: 1fr;
            gap: 0.35rem;
          }
        }
      `}</style>
    </main>
  );
}
