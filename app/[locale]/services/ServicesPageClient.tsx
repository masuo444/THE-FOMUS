'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useInView } from '@/lib/useInView';

const SERVICE_ITEMS = [
  { key: 'corporateGift',  slug: 'corporate-gift', bgImage: '/images/masu-top.jpg',            bgPosition: 'center',     num: '01' },
  { key: 'culturalSpace',  slug: 'cultural-space',  bgImage: '/images/architectural.jpg',       bgPosition: 'center',     num: '02' },
  { key: 'hotelBranding',  slug: 'hotel-branding',  bgImage: '/images/masukame.jpg',            bgPosition: 'center 40%', num: '03' },
  { key: 'bespoke',        slug: 'bespoke',           bgImage: '/images/parure.jpg',              bgPosition: 'center',     num: '04' },
];

export default function ServicesPageClient() {
  const t = useTranslations('programs');
  const locale = useLocale();
  const base = locale === 'en' ? '/en' : '';
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <main className="sv-main">

      {/* ── Page header ─────────────────────────── */}
      <div className="sv-header">
        <div className="sv-header__inner">
          <p className="sv-header__label">{t('sectionLabel')}</p>
          <h1 className="sv-header__title">Services</h1>
        </div>
      </div>

      {/* ── Grid ────────────────────────────────── */}
      <div ref={ref} className="sv-grid">
        {SERVICE_ITEMS.map((item, i) => (
          <Link
            key={item.key}
            href={`${base}/programs/${item.slug}`}
            className={`sv-cell reveal reveal-delay-${Math.min(i + 1, 4)}${inView ? ' is-in-view' : ''}`}
          >
            {/* Background photo — visible on hover */}
            <div
              className="sv-cell__photo"
              style={{ backgroundImage: `url(${item.bgImage})`, backgroundPosition: item.bgPosition }}
            />
            <div className="sv-cell__photo-overlay" />

            {/* Content */}
            <div className="sv-cell__body">
              <span className="sv-cell__num">{item.num}</span>
              <div className="sv-cell__text">
                <p className="sv-cell__name">
                  {t(`items.${item.key}.name` as Parameters<typeof t>[0])}
                </p>
                <p className="sv-cell__name-ja">
                  {t(`items.${item.key}.nameJa` as Parameters<typeof t>[0])}
                </p>
              </div>
              <span className="sv-cell__arrow" aria-hidden="true">›</span>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .sv-main {
          background: var(--color-white);
          padding-top: 64px;
          min-height: 100vh;
        }

        /* ── Header ────────────────────────────────── */
        .sv-header {
          padding: clamp(4rem, 8vw, 7rem) clamp(2rem, 6vw, 5rem) clamp(3rem, 6vw, 5rem);
          border-bottom: 1px solid var(--color-line);
        }
        .sv-header__inner {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .sv-header__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0;
        }
        .sv-header__title {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(3.5rem, 8vw, 6.5rem);
          line-height: 1;
          color: var(--color-ink);
          margin: 0;
        }

        /* ── Grid ──────────────────────────────────── */
        .sv-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        /* ── Cell ──────────────────────────────────── */
        .sv-cell {
          position: relative;
          text-decoration: none;
          color: inherit;
          overflow: hidden;
          border-bottom: 1px solid var(--color-line);
          min-height: 300px;
          display: flex;
          align-items: stretch;
        }
        .sv-cell:nth-child(odd) {
          border-right: 1px solid var(--color-line);
        }

        /* Photo — fades in on hover */
        .sv-cell__photo {
          position: absolute;
          inset: 0;
          background-size: cover;
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.8s ease;
        }
        .sv-cell__photo-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10,8,6,0.42);
          opacity: 0;
          transition: opacity 0.6s ease;
          z-index: 1;
        }
        .sv-cell:hover .sv-cell__photo {
          opacity: 1;
          transform: scale(1.04);
        }
        .sv-cell:hover .sv-cell__photo-overlay {
          opacity: 1;
        }

        /* Body */
        .sv-cell__body {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: clamp(2.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3.5rem);
          display: flex;
          align-items: flex-end;
          gap: 1.5rem;
        }
        .sv-cell__num {
          position: absolute;
          top: clamp(1.5rem, 3vw, 2rem);
          left: clamp(2rem, 4vw, 3.5rem);
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: var(--color-ink-mute);
          transition: color 0.3s ease;
        }
        .sv-cell:hover .sv-cell__num {
          color: rgba(255,255,255,0.45);
        }
        .sv-cell__text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .sv-cell__name {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(2rem, 4vw, 3.25rem);
          line-height: 1.05;
          color: var(--color-ink);
          margin: 0;
          transition: color 0.3s ease;
        }
        .sv-cell:hover .sv-cell__name {
          color: #FFFFFF;
        }
        .sv-cell__name-ja {
          font-family: var(--font-noto-serif-jp), "Noto Sans JP", sans-serif;
          font-weight: 400;
          font-size: 0.9375rem;
          letter-spacing: 0.12em;
          color: var(--color-ink-mute);
          margin: 0;
          transition: color 0.3s ease;
        }
        .sv-cell:hover .sv-cell__name-ja {
          color: rgba(255,255,255,0.6);
        }

        /* Arrow */
        .sv-cell__arrow {
          font-size: 1.5rem;
          color: var(--color-accent);
          line-height: 1;
          align-self: flex-end;
          transition: transform 0.3s ease, color 0.3s ease;
          flex-shrink: 0;
        }
        .sv-cell:hover .sv-cell__arrow {
          transform: translateX(5px);
          color: #FFFFFF;
        }

        /* ── Responsive ────────────────────────────── */
        @media (max-width: 680px) {
          .sv-grid { grid-template-columns: 1fr; }
          .sv-cell:nth-child(odd) { border-right: none; }
          .sv-cell { min-height: 220px; }
        }
      `}</style>
    </main>
  );
}
