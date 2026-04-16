'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useInView } from '@/lib/useInView';

interface CraftVisualProps {
  locale: string;
}

export default function CraftVisual({ locale }: CraftVisualProps) {
  const t = useTranslations('craftSection');
  const { ref, inView } = useInView<HTMLDivElement>();
  const philosophyHref = locale === 'en' ? '/en/philosophy' : '/philosophy';

  const headlineLines = t('headline').split('\n');
  const subheadlineLines = t('subheadline').split('\n');

  return (
    <section
      style={{
        position: 'relative',
        height: 'clamp(520px, 82vh, 860px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'var(--color-ink)',
      }}
    >
      {/* 写真プレースホルダー — 枡の職人作業の実写に置き換え予定 */}
      <div
        aria-hidden="true"
        className="image-ph--warm"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />

      {/* 上下のグラデーション — 前後セクションへの自然なブレンド */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(26,24,20,0.55) 0%, transparent 22%, transparent 78%, rgba(26,24,20,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* テキストオーバーレイ */}
      <div
        ref={ref}
        style={{
          position: 'relative',
          textAlign: 'center',
          padding: '0 2rem',
          maxWidth: '760px',
          width: '100%',
        }}
      >
        {/* Eyebrow */}
        <p
          className={`reveal reveal-fade${inView ? ' is-in-view' : ''}`}
          style={{
            fontFamily: 'var(--font-jost), Jost, sans-serif',
            fontWeight: 300,
            fontSize: '0.625rem',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            margin: '0 0 1.75rem',
          }}
        >
          {t('eyebrow')}
        </p>

        {/* Gold hairline */}
        <div
          aria-hidden="true"
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.25rem' }}
        >
          <span
            className={`gold-hairline gold-hairline--center reveal-line${inView ? ' is-in-view' : ''}`}
            style={{ animationDelay: '0.1s' }}
          />
        </div>

        {/* メインヘッドライン */}
        <h2
          className={`reveal reveal-delay-1${inView ? ' is-in-view' : ''}`}
          style={{
            fontFamily: 'var(--font-noto-serif-jp), "Noto Serif JP", serif',
            fontWeight: 300,
            fontSize: 'clamp(1.625rem, 3.5vw, 2.625rem)',
            lineHeight: 1.75,
            color: 'var(--color-white)',
            letterSpacing: '0.1em',
            margin: '0 0 2rem',
          }}
        >
          {headlineLines.map((line, i) => (
            <span key={i} style={{ display: 'block' }}>{line}</span>
          ))}
        </h2>

        {/* サブヘッドライン */}
        <p
          className={`reveal reveal-delay-2${inView ? ' is-in-view' : ''}`}
          style={{
            fontFamily: 'var(--font-noto-serif-jp), "Noto Serif JP", serif',
            fontWeight: 300,
            fontSize: 'clamp(0.875rem, 1.3vw, 1rem)',
            lineHeight: 2.1,
            color: 'var(--color-accent-mid)',
            letterSpacing: '0.08em',
            margin: '0 0 3.5rem',
            opacity: 0.85,
          }}
        >
          {subheadlineLines.map((line, i) => (
            <span key={i} style={{ display: 'block' }}>{line}</span>
          ))}
        </p>

        {/* ピルCTA（Hacoa参照） */}
        <div className={`reveal reveal-delay-3${inView ? ' is-in-view' : ''}`}>
          <Link href={philosophyHref} className="btn-pill">
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
