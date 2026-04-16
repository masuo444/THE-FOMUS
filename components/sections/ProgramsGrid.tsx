'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useInView } from '@/lib/useInView';

interface Program {
  key: string;
  slug: string;
  bgImage: string;
  bgOverlay: string;
  bgPosition?: string;
  fullWidth?: boolean;
}

const PROGRAMS: Program[] = [
  {
    key: 'corporateGift',
    slug: 'corporate-gift',
    bgImage: '/images/masu-top.jpg',
    bgOverlay: 'linear-gradient(135deg, rgba(240,234,216,0.45) 0%, rgba(232,223,200,0.45) 100%)',
    bgPosition: 'center',
  },
  {
    key: 'culturalSpace',
    slug: 'cultural-space',
    bgImage: '/images/architectural.jpg',
    bgOverlay: 'linear-gradient(145deg, rgba(221,227,232,0.35) 0%, rgba(205,213,220,0.35) 100%)',
    bgPosition: 'center',
  },
  {
    key: 'hotelBranding',
    slug: 'hotel-branding',
    bgImage: '/images/masukame.jpg',
    bgOverlay: 'linear-gradient(130deg, rgba(242,232,208,0.40) 0%, rgba(230,216,184,0.40) 100%)',
    bgPosition: 'center 40%',
  },
  {
    key: 'bespoke',
    slug: 'bespoke',
    bgImage: '/images/parure.jpg',
    bgOverlay: 'linear-gradient(135deg, rgba(28,58,95,0.12) 0%, rgba(20,16,10,0.15) 100%)',
    bgPosition: 'center',
  },
];

export default function ProgramsGrid() {
  const t = useTranslations('programs');
  const locale = useLocale();
  const { ref, inView } = useInView<HTMLDivElement>();
  const base = locale === 'en' ? '/en' : '';
  const servicesHref = `${base}/services`;

  return (
    <section id="programs" style={{ backgroundColor: 'var(--color-white)' }}>
      {/* Grid */}
      <div ref={ref} className="pg-wrap">
        <div className="pg-grid">
          {/* Services header — full-width clickable banner */}
          <Link
            href={servicesHref}
            className={`pg-services-header reveal${inView ? ' is-in-view' : ''}`}
          >
            <div className="pg-services-header__bg" aria-hidden="true" />
            <div className="pg-services-header__inner">
              <p className="label-text pg-services-header__label">{t('sectionLabel')}</p>
              <h2 className="pg-services-header__title">Services</h2>
              <p className="pg-services-header__caption">{t('sectionCaption')}</p>
            </div>
            <span className="pg-services-header__arrow" aria-hidden="true">→</span>
          </Link>

          {PROGRAMS.map((program, index) => (
            <ProgramCell
              key={program.key}
              index={index + 1}
              href={`${base}/programs/${program.slug}`}
              name={t(`items.${program.key}.name` as Parameters<typeof t>[0])}
              nameJa={t(`items.${program.key}.nameJa` as Parameters<typeof t>[0])}
              priceLabel={t(`items.${program.key}.priceLabel` as Parameters<typeof t>[0])}
              bgImage={program.bgImage}
              bgOverlay={program.bgOverlay}
              bgPosition={program.bgPosition}
              fullWidth={program.fullWidth}
              inView={inView}
              delayIndex={Math.min(index + 1, 5)}
            />
          ))}
        </div>
      </div>

      <style>{`
        /* ── Services header ──────────────────────────── */
        .pg-services-header {
          grid-column: 1 / -1;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--color-line);
          padding: clamp(3.5rem, 7vw, 6rem) 0;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          display: block;
          transition: background 0.35s ease;
        }
        .pg-services-header:hover {
          background: var(--color-off-white);
        }
        .pg-services-header__bg {
          position: absolute;
          inset: 0;
          background-image: url(/images/masu-lug-crop.jpg);
          background-size: cover;
          background-position: center 55%;
          opacity: 0.07;
          pointer-events: none;
          transition: opacity 0.45s ease;
        }
        .pg-services-header:hover .pg-services-header__bg {
          opacity: 0.14;
        }
        .pg-services-header__inner {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.75rem;
        }
        .pg-services-header__label {
          margin: 0;
        }
        .pg-services-header__title {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(3rem, 7vw, 6rem);
          line-height: 1;
          color: var(--color-ink);
          letter-spacing: 0.01em;
          margin: 0;
          transition: color 0.3s ease;
        }
        .pg-services-header__caption {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.875rem;
          letter-spacing: 0.25em;
          color: var(--color-ink-mute);
          margin: 0;
          text-transform: uppercase;
        }
        .pg-services-header__arrow {
          position: absolute;
          top: 50%;
          right: clamp(1.5rem, 4vw, 3rem);
          transform: translateY(-50%);
          font-family: var(--font-jost), Jost, sans-serif;
          font-size: 1.25rem;
          color: var(--color-ink-mute);
          opacity: 0.5;
          transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease;
        }
        .pg-services-header:hover .pg-services-header__arrow {
          opacity: 1;
          color: var(--color-accent);
          transform: translateY(-50%) translateX(4px);
        }
        @media (max-width: 640px) {
          .pg-services-header__arrow { display: none; }
        }

        /* ── Outer wrapper ────────────────────────────── */
        .pg-wrap {
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
        }

        /* ── Grid ─────────────────────────────────────── */
        .pg-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        /* ── Cell ─────────────────────────────────────── */
        .pg-cell {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 320px;
          text-decoration: none;
          color: inherit;
          overflow: hidden;
          border-bottom: 1px solid var(--color-line);
          cursor: pointer;
        }
        .pg-cell:nth-child(odd):not(.pg-cell--full) {
          border-right: 1px solid var(--color-line);
        }
        .pg-cell--full {
          grid-column: 1 / -1;
          min-height: 220px;
          border-bottom: none;
        }

        /* ── Hover background ─────────────────────────── */
        .pg-cell__bg {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.55s ease;
          pointer-events: none;
        }
        .pg-cell__bg--overlay {
          z-index: 1;
        }
        .pg-cell:hover .pg-cell__bg {
          opacity: 1;
        }

        /* ── Floating card ────────────────────────────── */
        .pg-cell__card {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2.25rem 3rem;
          border-radius: 0px;
          background: transparent;
          transition:
            background 0.45s ease,
            border-radius 0.45s ease,
            box-shadow 0.45s ease,
            padding 0.45s ease;
        }
        .pg-cell:hover .pg-cell__card {
          background: rgba(240, 240, 238, 0.88);
          border-radius: 14px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.10);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        /* Bespoke: dark bg — card stays light */
        .pg-cell--full .pg-cell__card {
          flex-direction: row;
          align-items: center;
          gap: 3rem;
          padding: 2rem 3.5rem;
        }
        .pg-cell--full:hover .pg-cell__card {
          background: rgba(240, 240, 238, 0.10);
          box-shadow: none;
        }

        /* ── Title row ────────────────────────────────── */
        .pg-cell__title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .pg-cell__name {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-weight: 400;
          font-style: italic;
          font-size: clamp(1.875rem, 3.8vw, 3.25rem);
          line-height: 1.05;
          color: var(--color-ink);
          letter-spacing: 0.01em;
          margin: 0;
          transition: color 0.3s ease;
        }
        .pg-cell--full .pg-cell__name {
          color: var(--color-white);
          font-size: clamp(2rem, 3.5vw, 3rem);
        }
        .pg-cell__chevron {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-ink-mute);
          font-style: normal;
          font-family: var(--font-jost), Jost, sans-serif;
          font-size: 0.875rem;
          flex-shrink: 0;
          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }
        .pg-cell:hover .pg-cell__chevron {
          color: var(--color-accent);
          transform: translateX(3px);
        }
        .pg-cell--full .pg-cell__chevron {
          color: rgba(240,240,238,0.5);
        }
        .pg-cell--full:hover .pg-cell__chevron {
          color: rgba(240,240,238,0.8);
        }

        /* ── Subtitle area ────────────────────────────── */
        .pg-cell__sub {
          margin-top: 0.6rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
        }
        .pg-cell--full .pg-cell__sub {
          align-items: flex-start;
          margin-top: 0;
        }
        .pg-cell__name-ja {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: 1.0625rem;
          letter-spacing: 0.18em;
          color: var(--color-ink-mute);
          margin: 0;
        }
        .pg-cell--full .pg-cell__name-ja {
          color: rgba(240,240,238,0.55);
        }
        .pg-cell__price {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.875rem;
          letter-spacing: 0.2em;
          color: var(--color-ink-mute);
          margin: 0;
        }

        /* ── Index number ─────────────────────────────── */
        .pg-cell__num {
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
        .pg-cell--full .pg-cell__num {
          color: rgba(28,58,95,0.45);
        }

        /* ── Responsive ───────────────────────────────── */
        @media (max-width: 640px) {
          .pg-grid {
            grid-template-columns: 1fr;
          }
          .pg-cell {
            min-height: 240px;
            border-right: none !important;
          }
          .pg-cell--full {
            min-height: 200px;
          }
          .pg-cell--full .pg-cell__card {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          .pg-cell--full .pg-cell__sub {
            align-items: center;
          }
          .pg-cell__name {
            font-size: clamp(1.5rem, 7vw, 2.25rem);
          }
        }
      `}</style>
    </section>
  );
}

interface ProgramCellProps {
  index: number;
  href: string;
  name: string;
  nameJa: string;
  priceLabel: string;
  bgImage: string;
  bgOverlay: string;
  bgPosition?: string;
  fullWidth?: boolean;
  inView: boolean;
  delayIndex: number;
}

function ProgramCell({
  index,
  href,
  name,
  nameJa,
  priceLabel,
  bgImage,
  bgOverlay,
  bgPosition = 'center',
  fullWidth,
  inView,
  delayIndex,
}: ProgramCellProps) {
  return (
    <Link
      href={href}
      className={`pg-cell${fullWidth ? ' pg-cell--full' : ''} reveal reveal-delay-${delayIndex}${inView ? ' is-in-view' : ''}`}
    >
      {/* Background photo */}
      <div
        className="pg-cell__bg"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: bgPosition,
        }}
      />
      {/* Colour overlay on top of photo */}
      <div
        className="pg-cell__bg pg-cell__bg--overlay"
        style={{ background: bgOverlay }}
      />

      {/* Index */}
      <span className="pg-cell__num">{String(index).padStart(2, '0')}</span>

      {/* Floating card */}
      <div className="pg-cell__card">
        <div className="pg-cell__title-row">
          <h3 className="pg-cell__name">{name}</h3>
          <span className="pg-cell__chevron" aria-hidden="true">→</span>
        </div>
        <div className="pg-cell__sub">
          <p className="pg-cell__name-ja">{nameJa}</p>
        </div>
      </div>
    </Link>
  );
}
