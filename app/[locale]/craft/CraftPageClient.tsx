'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useInView } from '@/lib/useInView';

const SECTIONS = [
  { key: 'history',  bgImage: '/images/masukame.jpg',              bgPos: 'center 35%' },
  { key: 'material', bgImage: '/images/material-philosophy.jpg',   bgPos: 'center' },
  { key: 'partner',  bgImage: '/images/masu-lug-crop.jpg',         bgPos: 'center 55%' },
  { key: 'coating',  bgImage: '/images/masu-top.jpg',              bgPos: 'center 45%' },
  { key: 'marking',  bgImage: '/images/material-philosophy.jpg',   bgPos: 'center' },
] as const;

export default function CraftPageClient() {
  const t = useTranslations('craftPage');
  const locale = useLocale();
  const homeHref    = locale === 'en' ? '/en' : '/';
  const contactHref = locale === 'en' ? '/en/contact' : '/contact';

  const { ref: heroRef, inView: heroInView } = useInView<HTMLDivElement>();
  const { ref: s0Ref,   inView: s0InView   } = useInView<HTMLDivElement>();
  const { ref: s1Ref,   inView: s1InView   } = useInView<HTMLDivElement>();
  const { ref: s2Ref,   inView: s2InView   } = useInView<HTMLDivElement>();
  const { ref: s3Ref,   inView: s3InView   } = useInView<HTMLDivElement>();
  const { ref: s4Ref,   inView: s4InView   } = useInView<HTMLDivElement>();
  const { ref: ctaRef,  inView: ctaInView  } = useInView<HTMLDivElement>();

  const sectionRefs    = [s0Ref, s1Ref, s2Ref, s3Ref, s4Ref];
  const sectionInViews = [s0InView, s1InView, s2InView, s3InView, s4InView];

  return (
    <main className="cp-main">

      {/* ── Hero ──────────────────────────────────── */}
      <div ref={heroRef} className="cp-hero">
        <div className="cp-hero__photo" />
        <div className="cp-hero__overlay" />
        <Link href={homeHref} className="cp-back">{t('backLabel')}</Link>
        <div className={`cp-hero__content reveal${heroInView ? ' is-in-view' : ''}`}>
          <p className="cp-hero__label">{t('heroLabel')}</p>
          <h1 className="cp-hero__title">{t('heroTitle')}</h1>
          <p className="cp-hero__caption">{t('heroCaption')}</p>
        </div>
        <div className="cp-hero__scroll" aria-hidden="true">↓</div>
      </div>

      {/* ── Four content sections ─────────────────── */}
      {SECTIONS.map((sec, i) => {
        const body   = t.raw(`sections.${sec.key}.body`) as string[];
        const isEven = i % 2 === 0;
        return (
          <section
            key={sec.key}
            ref={sectionRefs[i]}
            className={`cp-section${isEven ? '' : ' cp-section--alt'}`}
          >
            <div className={`cp-section__photo reveal${sectionInViews[i] ? ' is-in-view' : ''}`}>
              <div
                className="cp-section__photo-inner"
                style={{ backgroundImage: `url(${sec.bgImage})`, backgroundPosition: sec.bgPos }}
              />
            </div>
            <div className={`cp-section__text reveal reveal-delay-1${sectionInViews[i] ? ' is-in-view' : ''}`}>
              <p className="cp-section__label">
                {t(`sections.${sec.key}.label` as Parameters<typeof t>[0])}
              </p>
              <h2 className="cp-section__title">
                {t(`sections.${sec.key}.title` as Parameters<typeof t>[0])}
              </h2>
              {body.map((para, j) => (
                <p key={j} className="cp-section__body">{para}</p>
              ))}
            </div>
          </section>
        );
      })}

      {/* ── CTA ───────────────────────────────────── */}
      <section ref={ctaRef} className="cp-cta-section">
        <div className="cp-cta-photo" />
        <div className="cp-cta-overlay" />
        <div className="cp-cta-inner">
          <Link href={contactHref} className={`cp-cta-btn reveal${ctaInView ? ' is-in-view' : ''}`}>
            {t('cta')}
          </Link>
        </div>
      </section>

      <style>{`
        .cp-main {
          background: var(--color-white);
          padding-top: 64px;
        }

        /* ── Hero ───────────────────────────────── */
        .cp-hero {
          position: relative;
          height: 88vh;
          min-height: 520px;
          max-height: 900px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
        }
        .cp-hero__photo {
          position: absolute;
          inset: 0;
          background-image: url(/images/masu-lug-crop.jpg);
          background-size: cover;
          background-position: center 55%;
          transition: transform 16s ease;
        }
        .cp-hero:hover .cp-hero__photo { transform: scale(1.03); }
        .cp-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(6,5,4,0.90) 0%, rgba(6,5,4,0.35) 55%, rgba(6,5,4,0.06) 100%);
        }
        .cp-back {
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
        .cp-back:hover { color: var(--color-accent); }
        .cp-hero__content {
          position: relative;
          z-index: 2;
          padding: 0 clamp(2rem, 6vw, 5rem) clamp(3.5rem, 6vw, 5rem);
        }
        .cp-hero__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin: 0 0 1rem;
        }
        .cp-hero__title {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(3rem, 9vw, 7rem);
          line-height: 0.95;
          color: #FFFFFF;
          margin: 0 0 1.25rem;
        }
        .cp-hero__caption {
          font-family: var(--font-noto-serif-jp), "Noto Sans JP", sans-serif;
          font-weight: 400;
          font-size: 1rem;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.50);
          margin: 0;
        }
        .cp-hero__scroll {
          position: absolute;
          bottom: 2rem;
          right: clamp(2rem, 6vw, 5rem);
          z-index: 2;
          color: rgba(255,255,255,0.30);
          font-size: 0.875rem;
          animation: cp-bob 3s ease-in-out infinite;
        }
        @keyframes cp-bob {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(8px); }
        }

        /* ── Content sections ───────────────────── */
        .cp-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 580px;
          border-bottom: 1px solid var(--color-line);
        }
        .cp-section--alt { direction: rtl; }
        .cp-section--alt > * { direction: ltr; }
        .cp-section__photo {
          position: relative;
          overflow: hidden;
        }
        .cp-section__photo-inner {
          position: absolute;
          inset: 0;
          background-size: cover;
          transition: transform 0.8s ease;
        }
        .cp-section__photo:hover .cp-section__photo-inner { transform: scale(1.04); }
        .cp-section__text {
          padding: clamp(4rem, 7vw, 7rem) clamp(3rem, 5vw, 5.5rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 1px solid var(--color-line);
        }
        .cp-section--alt .cp-section__text {
          border-left: none;
          border-right: 1px solid var(--color-line);
        }
        .cp-section__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin: 0 0 1.25rem;
        }
        .cp-section__title {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(2rem, 4vw, 3.25rem);
          line-height: 1.05;
          color: var(--color-ink);
          margin: 0 0 2rem;
        }
        .cp-section__body {
          font-family: var(--font-noto-serif-jp), "Noto Sans JP", sans-serif;
          font-weight: 400;
          font-size: 1rem;
          line-height: 2.1;
          color: var(--color-ink-light);
          margin: 0 0 1.5rem;
        }
        .cp-section__body:last-child { margin-bottom: 0; }

        /* ── CTA ────────────────────────────────── */
        .cp-cta-section {
          position: relative;
          overflow: hidden;
          padding: clamp(6rem, 12vw, 10rem) clamp(2rem, 6vw, 5rem);
          text-align: center;
        }
        .cp-cta-photo {
          position: absolute;
          inset: 0;
          background-image: url(/images/masu-lug-crop.jpg);
          background-size: cover;
          background-position: center;
          transition: transform 12s ease;
        }
        .cp-cta-section:hover .cp-cta-photo { transform: scale(1.04); }
        .cp-cta-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(6,5,4,0.88) 0%, rgba(20,16,10,0.90) 100%);
        }
        .cp-cta-inner {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
        }
        .cp-cta-btn {
          display: inline-block;
          font-family: var(--font-noto-serif-jp), "Noto Sans JP", sans-serif;
          font-weight: 400;
          font-size: 0.9375rem;
          letter-spacing: 0.14em;
          color: #FFFFFF;
          text-decoration: none;
          padding: 1rem 3rem;
          border: 1px solid rgba(255,255,255,0.35);
          transition: border-color 0.35s ease, background 0.35s ease;
        }
        .cp-cta-btn:hover {
          border-color: #FFFFFF;
          background: rgba(255,255,255,0.08);
        }

        /* ── Responsive ──────────────────────────── */
        @media (max-width: 860px) {
          .cp-section,
          .cp-section--alt {
            grid-template-columns: 1fr;
            direction: ltr;
          }
          .cp-section__photo { min-height: 320px; }
          .cp-section__text {
            border-left: none !important;
            border-right: none !important;
            border-top: 1px solid var(--color-line);
          }
        }
        @media (max-width: 640px) {
          .cp-hero { height: 75vh; }
          .cp-stats { grid-template-columns: 1fr; }
          .cp-stats__item { border-right: none; border-bottom: 1px solid var(--color-line); }
          .cp-stats__item:last-child { border-bottom: none; }
        }
      `}</style>
    </main>
  );
}
