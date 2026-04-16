'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useInView } from '@/lib/useInView';

export default function MasuGrid() {
  const t = useTranslations('masuSection');
  const locale = useLocale();
  const { ref, inView } = useInView<HTMLDivElement>();
  const base = locale === 'en' ? '/en' : '';
  const masuBase = `${base}/craft`;

  return (
    <section ref={ref}>
      <div className="mg-wrap">
        <Link
          href={masuBase}
          className={`mg-header reveal${inView ? ' is-in-view' : ''}`}
        >
          {/* ── Left: text ── */}
          <div className="mg-header__left">
            <p className="mg-header__eyebrow">{t('sectionLabel')}</p>
            <h2 className="mg-header__title">{t('headerTitleJa')}</h2>
            <p className="mg-header__caption">{t('headerCaption')}</p>
            <span className="mg-header__arrow" aria-hidden="true">→</span>
          </div>

          {/* ── Right: photo ── */}
          <div className="mg-header__photo">
            <div className="mg-header__photo-inner" />
          </div>
        </Link>
      </div>

      <style>{`
        /* ── Wrapper ─────────────────────────── */
        .mg-wrap {
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
          background: var(--color-white);
        }

        /* ── Header ──────────────────────────── */
        .mg-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 380px;
          text-decoration: none;
          color: inherit;
          overflow: hidden;
        }

        /* ── Left panel ──────────────────────── */
        .mg-header__left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1rem;
          padding: clamp(3.5rem, 7vw, 6rem) clamp(2.5rem, 6vw, 5rem);
          background: var(--color-white);
          transition: background 0.4s ease;
        }
        .mg-header:hover .mg-header__left {
          background: #f9f8f6;
        }
        .mg-header__eyebrow {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin: 0;
        }
        .mg-header__title {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(3rem, 7vw, 5.5rem);
          line-height: 0.95;
          color: var(--color-ink);
          letter-spacing: 0.01em;
          margin: 0;
        }
        .mg-header__caption {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.875rem;
          letter-spacing: 0.20em;
          color: var(--color-ink-mute);
          text-transform: uppercase;
          margin: 0;
        }
        .mg-header__arrow {
          font-family: var(--font-jost), Jost, sans-serif;
          font-size: 1rem;
          color: var(--color-accent);
          opacity: 0.5;
          transition: opacity 0.3s ease, transform 0.3s ease;
          display: inline-block;
          margin-top: 0.5rem;
        }
        .mg-header:hover .mg-header__arrow {
          opacity: 1;
          transform: translateX(5px);
        }

        /* ── Right panel ─────────────────────── */
        .mg-header__photo {
          position: relative;
          overflow: hidden;
          border-left: 1px solid var(--color-line);
        }
        .mg-header__photo-inner {
          position: absolute;
          inset: 0;
          background-image: url(/images/masu-lug-crop.jpg);
          background-size: cover;
          background-position: center 55%;
          transition: transform 0.8s ease;
        }
        .mg-header:hover .mg-header__photo-inner {
          transform: scale(1.04);
        }

        /* ── Responsive ─────────────────────── */
        @media (max-width: 720px) {
          .mg-header {
            grid-template-columns: 1fr;
          }
          .mg-header__photo {
            min-height: 260px;
            border-left: none;
            border-top: 1px solid var(--color-line);
          }
        }
      `}</style>
    </section>
  );
}
