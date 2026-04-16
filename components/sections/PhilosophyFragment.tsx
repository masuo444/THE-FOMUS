'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useInView } from '@/lib/useInView';

export default function PhilosophyFragment() {
  const t = useTranslations('philosophy');
  const locale = useLocale();
  const { ref, inView } = useInView<HTMLAnchorElement>();
  const quote = t('quote');
  const lines = quote.split('\n');
  const philosophyHref = locale === 'en' ? '/en/philosophy' : '/philosophy';

  return (
    <>
      <Link
        href={philosophyHref}
        ref={ref}
        className={`sc-ph-cell reveal${inView ? ' is-in-view' : ''}`}
      >
        {/* 背景写真 */}
        <div className="sc-ph-bg sc-ph-bg--photo" />
        <div className="sc-ph-bg sc-ph-bg--overlay" />

        {/* ラベル */}
        <span className="sc-ph-label">{t('sectionLabel')}</span>

        {/* フローティングカード */}
        <div className="sc-ph-card">
          <div className="sc-ph-title-row">
            <h2 className="sc-ph-name">{lines[0]}</h2>
            <span className="sc-ph-chevron" aria-hidden="true">→</span>
          </div>
          <div className="sc-ph-sub">
            {lines.slice(1).map((line, i) => (
              <p key={i} className="sc-ph-sub-text">{line}</p>
            ))}
            <p className="sc-ph-link-hint">{t('link')}</p>
          </div>
        </div>
      </Link>

      <style>{`
        .sc-ph-cell {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 340px;
          text-decoration: none;
          color: inherit;
          overflow: hidden;
          cursor: pointer;
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
          background-color: var(--color-white);
        }
        .sc-ph-bg {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.55s ease;
          pointer-events: none;
        }
        .sc-ph-bg--photo {
          background-image: url(/images/material-philosophy.jpg);
          background-size: cover;
          background-position: center;
        }
        .sc-ph-bg--overlay {
          z-index: 1;
          background: linear-gradient(140deg, rgba(237,228,207,0.45) 0%, rgba(223,208,176,0.45) 100%);
        }
        .sc-ph-cell:hover .sc-ph-bg {
          opacity: 1;
        }
        .sc-ph-label {
          position: absolute;
          top: 1.5rem;
          left: 1.75rem;
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--color-line-dark);
          z-index: 2;
        }
        .sc-ph-card {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2.5rem 3.5rem;
          background: transparent;
          border-radius: 0;
          transition:
            background 0.45s ease,
            border-radius 0.45s ease,
            box-shadow 0.45s ease;
          max-width: 760px;
        }
        .sc-ph-cell:hover .sc-ph-card {
          background: rgba(240, 240, 238, 0.88);
          border-radius: 14px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.10);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .sc-ph-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .sc-ph-name {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: clamp(1.25rem, 2.5vw, 1.875rem);
          line-height: 1.7;
          color: var(--color-ink);
          letter-spacing: 0.08em;
          margin: 0;
        }
        .sc-ph-chevron {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--color-line);
          color: var(--color-ink-mute);
          font-family: var(--font-jost), Jost, sans-serif;
          font-size: 0.75rem;
          flex-shrink: 0;
          transition:
            border-color 0.3s ease,
            color 0.3s ease,
            background 0.3s ease,
            transform 0.3s ease;
        }
        .sc-ph-cell:hover .sc-ph-chevron {
          border-color: var(--color-accent);
          color: var(--color-accent);
          background: rgba(28,58,95,0.08);
          transform: translateX(3px);
        }
        .sc-ph-sub {
          margin-top: 0.75rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }
        .sc-ph-sub-text {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: clamp(0.75rem, 1.1vw, 0.875rem);
          letter-spacing: 0.08em;
          color: var(--color-ink-mute);
          margin: 0;
          line-height: 1.85;
        }
        .sc-ph-link-hint {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin: 0.5rem 0 0;
        }
        @media (max-width: 640px) {
          .sc-ph-cell { min-height: 280px; }
          .sc-ph-card { padding: 2rem 1.5rem; }
          .sc-ph-name { font-size: clamp(1.125rem, 5vw, 1.5rem); }
        }
      `}</style>
    </>
  );
}
