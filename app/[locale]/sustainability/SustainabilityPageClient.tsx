'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useInView } from '@/lib/useInView';

const SECTIONS = [
  { key: 'environment', bgImage: '/images/material-philosophy.jpg', bgPos: 'center' },
  { key: 'society',     bgImage: '/images/masukame.jpg',              bgPos: 'center 35%' },
  { key: 'international', bgImage: '/images/parure.jpg',              bgPos: 'center' },
] as const;

export default function SustainabilityPageClient() {
  const t = useTranslations('sustainabilityPage');
  const locale = useLocale();
  const homeHref    = locale === 'en' ? '/en' : '/';
  const contactHref = locale === 'en' ? '/en/contact' : '/contact';

  const { ref: heroRef, inView: heroInView } = useInView<HTMLDivElement>();
  const { ref: s0Ref,   inView: s0InView   } = useInView<HTMLDivElement>();
  const { ref: s1Ref,   inView: s1InView   } = useInView<HTMLDivElement>();
  const { ref: s2Ref,   inView: s2InView   } = useInView<HTMLDivElement>();
  const { ref: ctaRef,  inView: ctaInView  } = useInView<HTMLDivElement>();

  const sectionRefs    = [s0Ref, s1Ref, s2Ref];
  const sectionInViews = [s0InView, s1InView, s2InView];

  return (
    <main className="sp-main">

      {/* ── Hero ──────────────────────────────────── */}
      <div ref={heroRef} className="sp-hero">
        <div className="sp-hero__photo" />
        <div className="sp-hero__overlay" />
        <Link href={homeHref} className="sp-back">{t('backLabel')}</Link>
        <div className={`sp-hero__content reveal${heroInView ? ' is-in-view' : ''}`}>
          <p className="sp-hero__label">{t('heroLabel')}</p>
          <h1 className="sp-hero__title">{t('heroTitle')}</h1>
          <p className="sp-hero__caption">{t('heroCaption')}</p>
        </div>
        <div className="sp-hero__scroll" aria-hidden="true">↓</div>
      </div>

      {/* ── Three sections ────────────────────────── */}
      {SECTIONS.map((sec, i) => {
        const body   = t.raw(`sections.${sec.key}.body`) as string[];
        const isEven = i % 2 === 0;
        return (
          <section
            key={sec.key}
            ref={sectionRefs[i]}
            className={`sp-section${isEven ? '' : ' sp-section--alt'}`}
          >
            <div className={`sp-section__photo reveal${sectionInViews[i] ? ' is-in-view' : ''}`}>
              <div
                className="sp-section__photo-inner"
                style={{ backgroundImage: `url(${sec.bgImage})`, backgroundPosition: sec.bgPos }}
              />
            </div>
            <div className={`sp-section__text reveal reveal-delay-1${sectionInViews[i] ? ' is-in-view' : ''}`}>
              <p className="sp-section__label">
                {t(`sections.${sec.key}.label` as Parameters<typeof t>[0])}
              </p>
              <h2 className="sp-section__title">
                {t(`sections.${sec.key}.title` as Parameters<typeof t>[0])}
              </h2>
              {body.map((para, j) => (
                <p key={j} className="sp-section__body">{para}</p>
              ))}
            </div>
          </section>
        );
      })}

      {/* ── CTA ───────────────────────────────────── */}
      <section ref={ctaRef} className="sp-cta-section">
        <div className="sp-cta-photo" />
        <div className="sp-cta-overlay" />
        <div className="sp-cta-inner">
          <p className={`sp-cta-note reveal${ctaInView ? ' is-in-view' : ''}`}>{t('heroCaption')}</p>
          <Link href={contactHref} className={`sp-cta-btn reveal reveal-delay-1${ctaInView ? ' is-in-view' : ''}`}>
            {t('cta')}
          </Link>
        </div>
      </section>

      <style>{`
        .sp-main {
          background: var(--color-white);
          padding-top: 64px;
        }

        /* ── Hero ───────────────────────────────── */
        .sp-hero {
          position: relative;
          height: 92vh;
          min-height: 520px;
          max-height: 900px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
        }
        .sp-hero__photo {
          position: absolute;
          inset: 0;
          background-image: url(/images/fomus-architectural.jpg);
          background-size: cover;
          background-position: center 30%;
          transition: transform 16s ease;
        }
        .sp-hero:hover .sp-hero__photo { transform: scale(1.03); }
        .sp-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(6,5,4,0.90) 0%, rgba(6,5,4,0.35) 55%, rgba(6,5,4,0.06) 100%);
        }
        .sp-back {
          position: absolute;
          top: 2.25rem;
          left: clamp(2rem, 6vw, 5rem);
          z-index: 3;
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .sp-back:hover { color: var(--color-accent); }
        .sp-hero__content {
          position: relative;
          z-index: 2;
          padding: 0 clamp(2rem, 6vw, 5rem) clamp(3.5rem, 6vw, 5rem);
        }
        .sp-hero__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin: 0 0 1rem;
        }
        .sp-hero__title {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(3rem, 9vw, 7rem);
          line-height: 0.95;
          color: #FFFFFF;
          margin: 0 0 1.25rem;
        }
        .sp-hero__caption {
          font-family: var(--font-noto-serif-jp), "Noto Sans JP", sans-serif;
          font-weight: 400;
          font-size: 1rem;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.50);
          margin: 0;
        }
        .sp-hero__scroll {
          position: absolute;
          bottom: 2rem;
          right: clamp(2rem, 6vw, 5rem);
          z-index: 2;
          color: rgba(255,255,255,0.30);
          font-size: 0.875rem;
          animation: sp-bob 3s ease-in-out infinite;
        }
        @keyframes sp-bob {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(8px); }
        }

        /* ── Content sections ───────────────────── */
        .sp-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 640px;
          border-bottom: 1px solid var(--color-line);
        }
        .sp-section--alt { direction: rtl; }
        .sp-section--alt > * { direction: ltr; }
        .sp-section__photo {
          position: relative;
          overflow: hidden;
        }
        .sp-section__photo-inner {
          position: absolute;
          inset: 0;
          background-size: cover;
          transition: transform 0.8s ease;
        }
        .sp-section__photo:hover .sp-section__photo-inner { transform: scale(1.04); }
        .sp-section__text {
          padding: clamp(4rem, 7vw, 7rem) clamp(3rem, 5vw, 5.5rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 1px solid var(--color-line);
        }
        .sp-section--alt .sp-section__text {
          border-left: none;
          border-right: 1px solid var(--color-line);
        }
        .sp-section__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0 0 1.25rem;
        }
        .sp-section__title {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.75rem, 3.5vw, 2.75rem);
          line-height: 1.05;
          color: var(--color-ink);
          margin: 0 0 2rem;
        }
        .sp-section__body {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: 1rem;
          line-height: 2.3;
          letter-spacing: 0.05em;
          color: var(--color-ink-light);
          margin: 0 0 1.5rem;
        }
        .sp-section__body:last-child { margin-bottom: 0; }

        /* ── CTA ────────────────────────────────── */
        .sp-cta-section {
          position: relative;
          overflow: hidden;
          padding: clamp(6rem, 12vw, 10rem) clamp(2rem, 6vw, 5rem);
          text-align: center;
        }
        .sp-cta-photo {
          position: absolute;
          inset: 0;
          background-image: url(/images/masukame.jpg);
          background-size: cover;
          background-position: center 35%;
          transition: transform 12s ease;
        }
        .sp-cta-section:hover .sp-cta-photo { transform: scale(1.04); }
        .sp-cta-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(6,5,4,0.88) 0%, rgba(20,16,10,0.90) 100%);
        }
        .sp-cta-inner {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
        }
        .sp-cta-note {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: clamp(0.875rem, 1.2vw, 1rem);
          letter-spacing: 0.12em;
          color: rgba(240,240,238,0.5);
          margin: 0;
          position: relative;
          z-index: 2;
        }
        .sp-cta-btn {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.375rem, 2.2vw, 1.75rem);
          color: rgba(240,240,238,0.88);
          text-decoration: none;
          letter-spacing: 0.03em;
          position: relative;
          padding-bottom: 0.25rem;
          transition: color 0.35s ease;
        }
        .sp-cta-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: rgba(240,240,238,0.4);
          transition: background 0.35s ease;
        }
        .sp-cta-btn:hover { color: #FFFFFF; }
        .sp-cta-btn:hover::after { background: rgba(255,255,255,0.85); }

        /* ── Responsive ──────────────────────────── */
        @media (max-width: 860px) {
          .sp-section,
          .sp-section--alt {
            grid-template-columns: 1fr;
            direction: ltr;
          }
          .sp-section__photo { min-height: 320px; }
          .sp-section__text {
            border-left: none !important;
            border-right: none !important;
            border-top: 1px solid var(--color-line);
          }
        }
        @media (max-width: 640px) {
          .sp-hero { height: 75vh; }
        }
      `}</style>
    </main>
  );
}
