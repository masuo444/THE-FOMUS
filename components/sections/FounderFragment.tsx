'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useInView } from '@/lib/useInView';

export default function FounderFragment() {
  const t = useTranslations('founder');
  const locale = useLocale();
  const { ref, inView } = useInView<HTMLDivElement>();
  const founderHref = locale === 'en' ? '/en/founder' : '/founder';
  const messageBody = t.raw('messageBody') as string[];

  return (
    <>
      <section ref={ref} className="fo-section">

        {/* ── Left: identity panel ──────────────────── */}
        <div className={`fo-identity reveal${inView ? ' is-in-view' : ''}`}>
          <div className="fo-identity__photo-wrap">
            <div className="fo-identity__photo" />
          </div>
          <p className="fo-eyebrow">{t('sectionLabel')}</p>
          <h2 className="fo-name">{t('founderName')}</h2>
          <p className="fo-title">{t('founderTitle')}</p>
        </div>

        {/* ── Right: message panel ──────────────────── */}
        <div className={`fo-message reveal reveal-delay-1${inView ? ' is-in-view' : ''}`}>
          <div className="fo-message__inner">
            <h3 className="fo-message__title">{t('messageTitle')}</h3>
            {messageBody.map((para, i) => (
              <p key={i} className="fo-message__body">{para}</p>
            ))}
            <Link href={founderHref} className="fo-link">
              <span>{t('link')}</span>
              <span className="fo-link__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

      </section>

      <style>{`
        /* ── Section ──────────────────────────────── */
        .fo-section {
          display: grid;
          grid-template-columns: 5fr 7fr;
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
          margin-top: -1px;
          min-height: 560px;
          background: var(--color-white);
        }

        /* ── Identity panel (left) ────────────────── */
        .fo-identity {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          padding: clamp(3rem, 6vw, 5rem) clamp(2rem, 4vw, 3.5rem);
          background: var(--color-white);
          border-right: 1px solid var(--color-line);
        }
        .fo-identity__photo-wrap {
          width: 72%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
        }
        .fo-identity__photo {
          width: 100%;
          height: 100%;
          background-image: url(/images/founder.png);
          background-size: cover;
          background-position: center top;
        }

        /* Eyebrow */
        .fo-eyebrow {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin: 0.5rem 0 0;
        }

        /* Name */
        .fo-name {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1;
          color: var(--color-ink);
          margin: 0;
          letter-spacing: 0.01em;
        }

        /* Title */
        .fo-title {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0;
        }

        /* ── Message panel (right) ────────────────── */
        .fo-message {
          display: flex;
          align-items: center;
          border-left: 1px solid var(--color-line);
        }
        .fo-message__inner {
          padding: clamp(3rem, 6vw, 5.5rem) clamp(2.5rem, 5vw, 5rem);
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Message title */
        .fo-message__title {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.375rem, 2.5vw, 2rem);
          line-height: 1.35;
          color: var(--color-ink);
          margin: 0 0 2rem;
          letter-spacing: 0.01em;
        }

        /* Body paragraphs */
        .fo-message__body {
          font-family: var(--font-noto-serif-jp), "Noto Sans JP", sans-serif;
          font-weight: 400;
          font-size: 1rem;
          line-height: 2;
          color: var(--color-ink-light);
          margin: 0 0 1.375rem;
        }
        .fo-message__body:last-of-type {
          margin-bottom: 2.5rem;
        }

        /* Link */
        .fo-link {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--color-ink);
          text-decoration: none;
          border-bottom: 1px solid var(--color-line);
          padding-bottom: 0.4rem;
          width: fit-content;
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .fo-link:hover {
          color: var(--color-accent);
          border-color: var(--color-accent);
        }
        .fo-link__arrow {
          transition: transform 0.3s ease;
        }
        .fo-link:hover .fo-link__arrow {
          transform: translateX(4px);
        }

        /* ── Responsive ────────────────────────────── */
        @media (max-width: 860px) {
          .fo-section {
            grid-template-columns: 1fr;
          }
          .fo-identity {
            border-right: none;
            border-bottom: 1px solid var(--color-line);
          }
          .fo-identity__photo-wrap {
            width: 52%;
            aspect-ratio: 3 / 4;
          }
          .fo-message {
            border-left: none;
          }
        }
        @media (max-width: 480px) {
          .fo-identity__photo-wrap {
            width: 70%;
          }
        }
      `}</style>
    </>
  );
}
