'use client';

import { useTranslations } from 'next-intl';
import { useInView } from '@/lib/useInView';

export default function Statement() {
  const t = useTranslations('statement');
  const { ref, inView } = useInView<HTMLDivElement>();

  const lines = [t('line1'), t('line2'), t('line3'), t('line4')];

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

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {lines.map((line, i) => (
            <p
              key={i}
              className={`reveal reveal-delay-${i + 1}${inView ? ' is-in-view' : ''}`}
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
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
