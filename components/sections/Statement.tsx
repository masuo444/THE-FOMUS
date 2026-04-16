'use client';

import { useTranslations } from 'next-intl';
import { useInView } from '@/lib/useInView';

export default function Statement() {
  const t = useTranslations('statement');
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      className="section-gap"
      style={{ backgroundColor: 'var(--color-white)' }}
    >
      <div ref={ref} className="container-narrow" style={{ maxWidth: '780px' }}>
        {/* 上部の金ライン（スライドイン） */}
        <div aria-hidden="true" style={{ marginBottom: '3.25rem' }}>
          <span
            className={`gold-hairline reveal-line${inView ? ' is-in-view' : ''}`}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* eyebrow */}
          <p
            className={`reveal reveal-delay-1${inView ? ' is-in-view' : ''}`}
            style={{
              fontFamily: 'var(--font-jost), Jost, sans-serif',
              fontWeight: 400,
              fontSize: '0.8125rem',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              margin: 0,
            }}
          >
            {t('eyebrow')}
          </p>

          {/* body */}
          <p
            className={`reveal reveal-delay-2${inView ? ' is-in-view' : ''}`}
            style={{
              fontFamily: 'var(--font-noto-serif-jp), "Noto Serif JP", serif',
              fontWeight: 300,
              fontSize: 'clamp(1.0625rem, 1.85vw, 1.3125rem)',
              lineHeight: 2.25,
              color: 'var(--color-ink)',
              letterSpacing: '0.075em',
              margin: 0,
            }}
          >
            {t('body')}
          </p>

          {/* closing lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '0.5rem' }}>
            {(['closing1', 'closing2'] as const).map((key, i) => (
              <p
                key={key}
                className={`reveal reveal-delay-${i + 3}${inView ? ' is-in-view' : ''}`}
                style={{
                  fontFamily: 'var(--font-noto-serif-jp), "Noto Serif JP", serif',
                  fontWeight: 300,
                  fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)',
                  lineHeight: 2,
                  color: 'var(--color-ink-mute)',
                  letterSpacing: '0.075em',
                  margin: 0,
                }}
              >
                {t(key)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
