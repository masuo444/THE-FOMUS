'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useInView } from '@/lib/useInView';

interface ContactCTAProps {
  locale: string;
}

export default function ContactCTA({ locale }: ContactCTAProps) {
  const t = useTranslations('contact');
  const { ref, inView } = useInView<HTMLAnchorElement>();
  const contactHref = locale === 'en' ? '/en/contact' : '/contact';

  return (
    <>
      <Link
        href={contactHref}
        ref={ref}
        className={`sc-ct-cell reveal${inView ? ' is-in-view' : ''}`}
      >
        {/* 背景写真 */}
        <div className="sc-ct-bg sc-ct-bg--photo" />
        <div className="sc-ct-bg sc-ct-bg--overlay" />

        {/* ラベル */}
        <span className="sc-ct-label">{t('sectionLabel')}</span>

        {/* フローティングカード */}
        <div className="sc-ct-card">
          <div className="sc-ct-title-row">
            <h2 className="sc-ct-name">{t('headline')}</h2>
            <span className="sc-ct-chevron" aria-hidden="true">→</span>
          </div>
          <div className="sc-ct-sub">
            <p className="sc-ct-sub-en">{t('headlineEn')}</p>
            <p className="sc-ct-sub-text">{t('note')}</p>
            <p className="sc-ct-link-hint">{t('cta')}</p>
          </div>
        </div>
      </Link>

      <style>{`
        .sc-ct-cell {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 380px;
          text-decoration: none;
          color: inherit;
          overflow: hidden;
          cursor: pointer;
          border-top: 1px solid var(--color-line);
          margin-top: -1px;
          background-color: var(--color-ink);
        }
        .sc-ct-bg {
          position: absolute;
          inset: 0;
          transition: opacity 0.55s ease;
          pointer-events: none;
        }
        .sc-ct-bg--photo {
          background-image: url(/images/fomus-architectural.jpg);
          background-size: cover;
          background-position: center 35%;
          opacity: 0.18;
        }
        .sc-ct-bg--overlay {
          z-index: 1;
          opacity: 1;
          background:
            radial-gradient(ellipse at 50% 50%, rgba(28,58,95,0.07) 0%, transparent 60%),
            linear-gradient(160deg, rgba(14,12,9,0.72) 0%, rgba(26,24,20,0.65) 100%);
        }
        .sc-ct-cell:hover .sc-ct-bg--photo {
          opacity: 0.30;
        }
        .sc-ct-label {
          position: absolute;
          top: 1.5rem;
          left: 1.75rem;
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(28,58,95,0.45);
          z-index: 2;
        }
        .sc-ct-card {
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
            border-radius 0.45s ease;
          max-width: 760px;
        }
        .sc-ct-cell:hover .sc-ct-card {
          background: rgba(240, 240, 238, 0.06);
          border-radius: 14px;
        }
        .sc-ct-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .sc-ct-name {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: clamp(1.375rem, 2.8vw, 2rem);
          line-height: 1.7;
          color: var(--color-white);
          letter-spacing: 0.08em;
          margin: 0;
        }
        .sc-ct-chevron {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(28,58,95,0.4);
          color: var(--color-accent);
          font-family: var(--font-jost), Jost, sans-serif;
          font-size: 0.75rem;
          flex-shrink: 0;
          transition:
            background 0.3s ease,
            transform 0.3s ease;
        }
        .sc-ct-cell:hover .sc-ct-chevron {
          background: rgba(28,58,95,0.15);
          transform: translateX(3px);
        }
        .sc-ct-sub {
          margin-top: 0.75rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .sc-ct-sub-en {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(0.875rem, 1.3vw, 1rem);
          color: var(--color-accent-mid);
          letter-spacing: 0.12em;
          margin: 0;
          opacity: 0.80;
        }
        .sc-ct-sub-text {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(240,240,238,0.35);
          margin: 0;
        }
        .sc-ct-link-hint {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.875rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(240,240,238,0.35);
          margin: 0.5rem 0 0;
        }
        @media (max-width: 640px) {
          .sc-ct-cell { min-height: 320px; }
          .sc-ct-card { padding: 2rem 1.5rem; }
          .sc-ct-name { font-size: clamp(1.25rem, 5vw, 1.625rem); }
        }
      `}</style>
    </>
  );
}
