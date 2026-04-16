'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useInView } from '@/lib/useInView';

const SUB_ITEMS = [
  {
    key: 'environment',
    bgImage: '/images/material-philosophy.jpg',
    bgPosition: 'center',
    bgOverlay: 'linear-gradient(140deg, rgba(210,225,200,0.42) 0%, rgba(190,210,175,0.42) 100%)',
    hash: '#environment',
  },
  {
    key: 'society',
    bgImage: '/images/masukame.jpg',
    bgPosition: 'center 35%',
    bgOverlay: 'linear-gradient(135deg, rgba(200,210,215,0.40) 0%, rgba(185,198,205,0.40) 100%)',
    hash: '#society',
  },
  {
    key: 'international',
    bgImage: '/images/parure.jpg',
    bgPosition: 'center',
    bgOverlay: 'linear-gradient(130deg, rgba(237,228,207,0.42) 0%, rgba(223,208,176,0.42) 100%)',
    hash: '#international',
  },
];

export default function LegacyGrid() {
  const t = useTranslations('legacySection');
  const locale = useLocale();
  const { ref, inView } = useInView<HTMLDivElement>();
  const base = locale === 'en' ? '/en' : '';
  const sustainBase = `${base}/sustainability`;

  return (
    <section ref={ref}>
      <div className="lg-wrap">
        {/* ── ヘッダーセル（ライト） ─────────────── */}
        <Link
          href={sustainBase}
          className={`lg-header reveal${inView ? ' is-in-view' : ''}`}
        >
          <div className="lg-header__bg" />
          <div className="lg-header__inner">
            <div>
              <h2 className="lg-header__title">{t('sectionLabel')}</h2>
              <p className="lg-header__title-ja">{t('headerTitleJa')}</p>
            </div>
          </div>
          <span className="lg-header__arrow" aria-hidden="true">→</span>
        </Link>

        {/* ── サブセル3つ（ライト） ──────────────── */}
        <div className="lg-sub-grid">
          {SUB_ITEMS.map((item, i) => (
            <Link
              key={item.key}
              href={`${sustainBase}${item.hash}`}
              className={`lg-sub-cell reveal reveal-delay-${i + 1}${inView ? ' is-in-view' : ''}`}
            >
              <div
                className="lg-sub-cell__bg lg-sub-cell__bg--photo"
                style={{
                  backgroundImage: `url(${item.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: item.bgPosition,
                }}
              />
              <div
                className="lg-sub-cell__bg lg-sub-cell__bg--overlay"
                style={{ background: item.bgOverlay }}
              />
              <div className="lg-sub-cell__card">
                <h3 className="lg-sub-cell__title">
                  {t(`items.${item.key}.title` as Parameters<typeof t>[0])}
                </h3>
                <p className="lg-sub-cell__title-ja">
                  {t(`items.${item.key}.titleJa` as Parameters<typeof t>[0])}
                </p>
                <p className="lg-sub-cell__caption">
                  {t(`items.${item.key}.caption` as Parameters<typeof t>[0])}
                </p>
              </div>
              <span className="lg-sub-cell__arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Wrapper ─────────────────────────── */
        .lg-wrap {
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
          background: var(--color-white);
          margin-top: -1px;
        }

        /* ── Header cell ─────────────────────── */
        .lg-header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          border-bottom: 1px solid var(--color-line);
          padding: clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem);
        }
        .lg-header__bg {
          position: absolute;
          inset: 0;
          background-image: url(/images/fomus-architectural.jpg);
          background-size: cover;
          background-position: center 30%;
          opacity: 0.06;
          transition: opacity 0.55s ease;
          pointer-events: none;
        }
        .lg-header:hover .lg-header__bg {
          opacity: 0.14;
        }
        .lg-header__inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.75rem;
        }
        .lg-header__title {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(3rem, 7vw, 5.5rem);
          line-height: 0.95;
          color: var(--color-ink);
          letter-spacing: 0.01em;
          margin: 0;
        }
        .lg-header__title-ja {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.875rem;
          letter-spacing: 0.28em;
          color: var(--color-ink-mute);
          text-transform: uppercase;
          margin: 0;
        }
        .lg-header__arrow {
          position: absolute;
          top: 50%;
          right: clamp(1.5rem, 4vw, 3rem);
          transform: translateY(-50%);
          z-index: 1;
          font-family: var(--font-jost), Jost, sans-serif;
          font-size: 1.25rem;
          color: var(--color-ink-mute);
          opacity: 0.55;
          transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease;
        }
        .lg-header:hover .lg-header__arrow {
          opacity: 1;
          color: var(--color-accent);
          transform: translateY(-50%) translateX(4px);
        }

        /* ── Sub-cell grid ───────────────────── */
        .lg-sub-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }

        /* ── Sub cell ────────────────────────── */
        .lg-sub-cell {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          text-decoration: none;
          color: inherit;
          overflow: hidden;
          cursor: pointer;
          background: var(--color-white);
        }
        .lg-sub-cell:not(:last-child) {
          border-right: 1px solid var(--color-line);
        }
        .lg-sub-cell__bg {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.55s ease;
          pointer-events: none;
        }
        .lg-sub-cell__bg--photo {
          /* photo */
        }
        .lg-sub-cell__bg--overlay {
          z-index: 1;
        }
        .lg-sub-cell:hover .lg-sub-cell__bg {
          opacity: 1;
        }
        .lg-sub-cell__card {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.25rem;
          padding: 2.75rem 2.5rem;
          background: transparent;
          border-radius: 0;
          transition:
            background 0.45s ease,
            border-radius 0.45s ease,
            box-shadow 0.45s ease;
        }
        .lg-sub-cell:hover .lg-sub-cell__card {
          background: rgba(240, 240, 238, 0.88);
          border-radius: 12px;
          box-shadow: 0 6px 30px rgba(0,0,0,0.09);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .lg-sub-cell__title {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.75rem, 3.2vw, 2.5rem);
          color: var(--color-ink);
          letter-spacing: 0.02em;
          line-height: 1.05;
          margin: 0;
        }
        .lg-sub-cell__title-ja {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0.35rem 0 0;
        }
        .lg-sub-cell__caption {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: 0.875rem;
          letter-spacing: 0.12em;
          color: var(--color-ink-mute);
          margin: 0.3rem 0 0;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .lg-sub-cell:hover .lg-sub-cell__caption {
          opacity: 1;
        }
        .lg-sub-cell__arrow {
          position: absolute;
          top: 1.25rem;
          right: 1.5rem;
          z-index: 2;
          font-size: 0.875rem;
          color: var(--color-ink-mute);
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease;
        }
        .lg-sub-cell:hover .lg-sub-cell__arrow {
          opacity: 1;
          transform: translateX(3px);
        }

        /* ── Responsive ─────────────────────── */
        @media (max-width: 720px) {
          .lg-sub-grid { grid-template-columns: 1fr 1fr; }
          .lg-sub-cell:nth-child(2) { border-right: none; }
          .lg-sub-cell:nth-child(1),
          .lg-sub-cell:nth-child(2) { border-bottom: 1px solid var(--color-line); }
          .lg-sub-cell:last-child { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .lg-sub-grid { grid-template-columns: 1fr; }
          .lg-sub-cell { border-right: none !important; }
          .lg-sub-cell:not(:last-child) { border-bottom: 1px solid var(--color-line); }
          .lg-sub-cell:last-child { grid-column: auto; }
        }
      `}</style>
    </section>
  );
}
