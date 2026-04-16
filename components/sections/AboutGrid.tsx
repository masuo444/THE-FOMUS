'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useInView } from '@/lib/useInView';

const ITEMS = [
  {
    key: 'founder',
    bgImage: '/images/founder.png',
    bgPosition: 'center top',
    bgOverlay: 'linear-gradient(140deg, rgba(230,220,200,0.38) 0%, rgba(210,200,175,0.38) 100%)',
  },
] as const;

export default function AboutGrid() {
  const t = useTranslations('aboutSection');
  const locale = useLocale();
  const { ref, inView } = useInView<HTMLDivElement>();
  const base = locale === 'en' ? '/en' : '';

  const hrefs = {
    founder: `${base}/founder`,
  };

  return (
    <section style={{ backgroundColor: 'var(--color-white)' }}>
      <div ref={ref} className="ab-wrap">
        <div className="ab-grid">

          {/* ── Header ─────────────────────────── */}
          <div className={`ab-header reveal${inView ? ' is-in-view' : ''}`}>
            <div className="ab-header__bg" />
            <div className="ab-header__inner">
              <p className="ab-header__eyebrow">{t('sectionLabel')}</p>
              <h2 className="ab-header__title">About</h2>
              <p className="ab-header__caption">{t('headerCaption')}</p>
            </div>
          </div>

          {/* ── Cells ──────────────────────────── */}
          {ITEMS.map((item, i) => (
            <Link
              key={item.key}
              href={hrefs[item.key]}
              className={`ab-cell reveal reveal-delay-${i + 1}${inView ? ' is-in-view' : ''}`}
            >
              <div
                className="ab-cell__bg"
                style={{
                  backgroundImage: `url(${item.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: item.bgPosition,
                }}
              />
              <div
                className="ab-cell__bg ab-cell__bg--overlay"
                style={{ background: item.bgOverlay }}
              />
              <span className="ab-cell__num">{String(i + 1).padStart(2, '0')}</span>
              <div className="ab-cell__card">
                <div className="ab-cell__title-row">
                  <h3 className="ab-cell__name">
                    {t(`items.${item.key}.name` as Parameters<typeof t>[0])}
                  </h3>
                  <span className="ab-cell__chevron" aria-hidden="true">→</span>
                </div>
                <p className="ab-cell__name-ja">
                  {t(`items.${item.key}.nameJa` as Parameters<typeof t>[0])}
                </p>
              </div>
            </Link>
          ))}

        </div>
      </div>

      <style>{`
        .ab-wrap {
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
          margin-top: -1px;
        }
        .ab-grid {
          display: grid;
          grid-template-columns: 1fr;
        }

        /* ── Header ─────────────────────────── */
        .ab-header {
          grid-column: 1 / -1;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--color-line);
          padding: clamp(3.5rem, 7vw, 6rem) 0;
          display: block;
        }
        .ab-header__bg {
          position: absolute;
          inset: 0;
          background-image: url(/images/masu-lug-crop.jpg);
          background-size: cover;
          background-position: center 55%;
          opacity: 0.07;
          pointer-events: none;
        }
        .ab-header__inner {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.75rem;
        }
        .ab-header__eyebrow {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin: 0;
        }
        .ab-header__title {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(3rem, 7vw, 6rem);
          line-height: 1;
          color: var(--color-ink);
          letter-spacing: 0.01em;
          margin: 0;
        }
        .ab-header__caption {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.875rem;
          letter-spacing: 0.25em;
          color: var(--color-ink-mute);
          margin: 0;
          text-transform: uppercase;
        }

        /* ── Cell ───────────────────────────── */
        .ab-cell {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 320px;
          text-decoration: none;
          color: inherit;
          overflow: hidden;
          cursor: pointer;
        }
        .ab-cell:first-of-type {
          border-right: 1px solid var(--color-line);
        }
        .ab-cell__bg {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.55s ease;
          pointer-events: none;
        }
        .ab-cell__bg--overlay { z-index: 1; }
        .ab-cell:hover .ab-cell__bg { opacity: 1; }

        .ab-cell__num {
          position: absolute;
          top: 1.5rem;
          left: 1.75rem;
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.25em;
          color: var(--color-line-dark);
          z-index: 2;
          transition: color 0.3s ease;
        }

        .ab-cell__card {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2.25rem 3rem;
          background: transparent;
          border-radius: 0;
          transition:
            background 0.45s ease,
            border-radius 0.45s ease,
            box-shadow 0.45s ease;
        }
        .ab-cell:hover .ab-cell__card {
          background: rgba(240,240,238,0.88);
          border-radius: 14px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.10);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .ab-cell__title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .ab-cell__name {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-weight: 400;
          font-style: italic;
          font-size: clamp(1.875rem, 3.8vw, 3.25rem);
          line-height: 1.05;
          color: var(--color-ink);
          letter-spacing: 0.01em;
          margin: 0;
        }
        .ab-cell__chevron {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--color-line);
          color: var(--color-ink-mute);
          font-style: normal;
          font-family: var(--font-jost), Jost, sans-serif;
          font-size: 0.75rem;
          flex-shrink: 0;
          transition:
            border-color 0.3s ease,
            color 0.3s ease,
            background 0.3s ease,
            transform 0.3s ease;
        }
        .ab-cell:hover .ab-cell__chevron {
          border-color: var(--color-accent);
          color: var(--color-accent);
          background: rgba(28,58,95,0.08);
          transform: translateX(3px);
        }
        .ab-cell__name-ja {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: 1.0625rem;
          letter-spacing: 0.18em;
          color: var(--color-ink-mute);
          margin: 0.6rem 0 0;
        }

        /* ── Responsive ─────────────────────── */
        @media (max-width: 640px) {
          .ab-grid { grid-template-columns: 1fr; }
          .ab-cell { min-height: 240px; border-right: none !important; }
          .ab-cell:first-of-type { border-right: none; border-bottom: 1px solid var(--color-line); }
        }
      `}</style>
    </section>
  );
}
