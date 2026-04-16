'use client';

import type { CSSProperties } from 'react';
import { useInView } from '@/lib/useInView';

interface WinColumn {
  role: string;
  roleEn: string;
  descJa: string;
  descEn: string;
}

const COLUMNS: WinColumn[] = [
  {
    role: 'クライアント',
    roleEn: 'Client',
    descJa: '文化を、ブランドの力に変える。',
    descEn: 'Culture becomes brand equity.',
  },
  {
    role: 'THE FOMUS',
    roleEn: 'THE FOMUS',
    descJa: '想いを、体験の形に設計する。',
    descEn: 'Intent becomes experience.',
  },
  {
    role: 'エンドユーザー',
    roleEn: 'End User',
    descJa: '記念日が、記憶になる。',
    descEn: 'A moment becomes a memory.',
  },
];

const COLUMN_IMAGES: CSSProperties[] = [
  {
    background: [
      'radial-gradient(ellipse at 38% 52%, rgba(28,58,95,0.14) 0%, transparent 58%)',
      'radial-gradient(ellipse at 70% 30%, rgba(28,58,95,0.06) 0%, transparent 44%)',
      'linear-gradient(150deg, #252018 0%, #171410 100%)',
    ].join(', '),
  },
  {
    background: [
      'radial-gradient(ellipse at 50% 45%, rgba(28,58,95,0.20) 0%, transparent 60%)',
      'radial-gradient(ellipse at 25% 70%, rgba(160,120,50,0.08) 0%, transparent 48%)',
      'linear-gradient(155deg, #221d14 0%, #15120c 100%)',
    ].join(', '),
  },
  {
    background: [
      'radial-gradient(ellipse at 55% 55%, rgba(28,58,95,0.11) 0%, transparent 55%)',
      'radial-gradient(ellipse at 30% 35%, rgba(28,58,95,0.05) 0%, transparent 42%)',
      'linear-gradient(148deg, #1e1b14 0%, #111009 100%)',
    ].join(', '),
  },
];

const DELAY_CLASSES = ['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'] as const;

export default function WinWinWin() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: 'var(--color-ink)',
        paddingTop: 'clamp(5rem, 10vw, 8rem)',
        paddingBottom: 'clamp(5rem, 10vw, 8rem)',
      }}
    >
      <div className="container-content">
        {/* セクションラベル */}
        <p
          className={`reveal${inView ? ' is-in-view' : ''}`}
          style={{
            fontFamily: 'var(--font-jost), Jost, sans-serif',
            fontWeight: 300,
            fontSize: '0.6875rem',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            margin: '0 0 clamp(3rem, 6vw, 5rem)',
            opacity: 0.85,
          }}
        >
          WIN — WIN — WIN
        </p>

        {/* 3カラムグリッド */}
        <div
          className="www-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
          }}
        >
          {COLUMNS.map((col, i) => (
            <div
              key={col.role}
              className={`reveal ${DELAY_CLASSES[i]}${inView ? ' is-in-view' : ''}`}
              style={{
                borderLeft: i === 0 ? 'none' : '1px solid rgba(28,58,95,0.15)',
                paddingLeft: i === 0 ? 0 : 'clamp(2rem, 4vw, 3.5rem)',
                paddingRight: i === COLUMNS.length - 1 ? 0 : 'clamp(2rem, 4vw, 3.5rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.75rem',
              }}
            >
              {/* 画像プレースホルダー */}
              <div
                aria-hidden="true"
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  maxWidth: '280px',
                  ...COLUMN_IMAGES[i],
                }}
              />

              {/* ロール名 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-noto-serif-jp), "Noto Serif JP", serif',
                    fontWeight: 300,
                    fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
                    color: 'var(--color-white)',
                    margin: 0,
                    letterSpacing: '0.08em',
                    lineHeight: 1.4,
                  }}
                >
                  {col.role}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-jost), Jost, sans-serif',
                    fontWeight: 300,
                    fontSize: '0.6875rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(212,180,131,0.55)',
                    margin: 0,
                  }}
                >
                  {col.roleEn}
                </p>
              </div>

              {/* 区切りライン */}
              <div
                style={{
                  width: '24px',
                  height: '1px',
                  backgroundColor: 'var(--color-accent)',
                  opacity: 0.5,
                }}
                aria-hidden="true"
              />

              {/* 説明文 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-noto-serif-jp), "Noto Serif JP", serif',
                    fontWeight: 300,
                    fontSize: 'clamp(0.875rem, 1.3vw, 1rem)',
                    color: 'rgba(240,240,238,0.7)',
                    margin: 0,
                    lineHeight: 1.9,
                    letterSpacing: '0.06em',
                  }}
                >
                  {col.descJa}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: 'clamp(0.8125rem, 1.1vw, 0.9375rem)',
                    color: 'rgba(212,180,131,0.5)',
                    margin: 0,
                    letterSpacing: '0.04em',
                    lineHeight: 1.8,
                  }}
                >
                  {col.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* モバイル対応 */}
      <style>{`
        @media (max-width: 767px) {
          .www-grid {
            grid-template-columns: 1fr !important;
          }
          .www-grid > * {
            border-left: none !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            border-top: 1px solid rgba(28,58,95,0.15);
            padding-top: 2.5rem;
          }
          .www-grid > *:first-child {
            border-top: none;
            padding-top: 0;
          }
        }
      `}</style>
    </section>
  );
}
