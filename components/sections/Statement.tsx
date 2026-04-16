'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useInView } from '@/lib/useInView';

export default function Statement() {
  const t = useTranslations('statement');
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section style={{ backgroundColor: 'var(--color-white)' }}>
      <div ref={ref} className="st-wrap">

        {/* ── Left: Image ─────────────────────── */}
        <div className={`st-img-col reveal${inView ? ' is-in-view' : ''}`}>
          <Image
            src="/images/masukame.jpg"
            alt="THE FOMUS"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes="(max-width: 768px) 100vw, 55vw"
            priority
          />
        </div>

        {/* ── Right: Text ─────────────────────── */}
        <div className="st-text-col">
          <p className={`st-eyebrow reveal reveal-delay-1${inView ? ' is-in-view' : ''}`}>
            {t('eyebrow')}
          </p>

          <h2 className={`st-heading reveal reveal-delay-2${inView ? ' is-in-view' : ''}`}>
            {t('heading')}
          </h2>

          <p className={`st-body reveal reveal-delay-3${inView ? ' is-in-view' : ''}`}>
            {t('body')}
          </p>

          <p className={`st-closing1 reveal reveal-delay-4${inView ? ' is-in-view' : ''}`}>
            {t('closing1')}
          </p>

          <p className={`st-closing2 reveal reveal-delay-5${inView ? ' is-in-view' : ''}`}>
            {t('closing2')}
          </p>
        </div>

      </div>

      <style>{`
        .st-wrap {
          display: grid;
          grid-template-columns: 55fr 45fr;
          min-height: 600px;
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
          margin-top: -1px;
        }

        /* ── Image column ───────────────────── */
        .st-img-col {
          position: relative;
          overflow: hidden;
          min-height: 480px;
        }

        /* ── Text column ────────────────────── */
        .st-text-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(3rem, 6vw, 5rem) clamp(2.5rem, 5vw, 4.5rem);
          border-left: 1px solid var(--color-line);
        }

        .st-eyebrow {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0 0 1.75rem;
        }

        .st-heading {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.875rem, 3.2vw, 2.75rem);
          line-height: 1.25;
          color: var(--color-ink);
          letter-spacing: 0.01em;
          margin: 0 0 2rem;
        }

        .st-body {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: clamp(0.9375rem, 1.35vw, 1.0625rem);
          line-height: 2.2;
          color: var(--color-ink);
          letter-spacing: 0.06em;
          margin: 0 0 2rem;
        }

        .st-closing1 {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: clamp(0.875rem, 1.2vw, 1rem);
          line-height: 2;
          color: var(--color-ink-mute);
          letter-spacing: 0.06em;
          margin: 0 0 0.5rem;
        }

        .st-closing2 {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: clamp(0.875rem, 1.2vw, 1rem);
          line-height: 2;
          color: var(--color-ink-mute);
          letter-spacing: 0.06em;
          margin: 0;
        }

        /* ── Responsive ─────────────────────── */
        @media (max-width: 768px) {
          .st-wrap {
            grid-template-columns: 1fr;
          }
          .st-img-col {
            min-height: 300px;
          }
          .st-text-col {
            border-left: none;
            border-top: 1px solid var(--color-line);
          }
        }
      `}</style>
    </section>
  );
}
