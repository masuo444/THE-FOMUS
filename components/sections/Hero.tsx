'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect, useCallback, useRef } from 'react';

const BG_IMAGES = [
  { src: '/images/masu-lug-crop.jpg',        pos: 'center 45%' },
  { src: '/images/masukame.jpg',              pos: 'center 35%' },
  { src: '/images/material-philosophy.jpg',  pos: 'center'     },
];

const SLIDE_DURATION = 6000;

type State = 'current' | 'next' | 'prev' | 'ready';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const slides = t.raw('slides') as Array<{ label: string; title: string }>;

  const [states, setStates] = useState<State[]>(
    BG_IMAGES.map((_, i) => (i === 0 ? 'current' : i === 1 ? 'next' : 'ready'))
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentIdxRef = useRef(0);

  const goTo = useCallback((nextIdx: number) => {
    currentIdxRef.current = nextIdx;
    setCurrentIdx(nextIdx);
    const n = BG_IMAGES.length;
    const afterNextIdx = (nextIdx + 1) % n;

    setStates((prev) =>
      prev.map((s, i) => {
        if (i === nextIdx)      return 'current';
        if (i === afterNextIdx) return 'next';
        if (s === 'current')    return 'prev';
        return 'ready';
      })
    );

    // Clean up prev after exit animation
    if (prevTimerRef.current) clearTimeout(prevTimerRef.current);
    prevTimerRef.current = setTimeout(() => {
      setStates((s) => s.map((st) => (st === 'prev' ? 'ready' : st)));
    }, 2600);
  }, []);

  // Cleanup prevTimer on unmount
  useEffect(() => {
    return () => { if (prevTimerRef.current) clearTimeout(prevTimerRef.current); };
  }, []);

  const advance = useCallback(() => {
    const next = (currentIdxRef.current + 1) % BG_IMAGES.length;
    goTo(next);
  }, [goTo]);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setTimeout(advance, SLIDE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [currentIdx, advance]);

  return (
    <section className="hc-hero">
      <div className="hc-carousel">

        {BG_IMAGES.map((bg, i) => {
          const state = states[i];
          const slide = slides[i] ?? slides[0];
          return (
            <div key={i} className={`hc-item hc-item--${state}`}>
              {/* Image + mask */}
              <div className="hc-img">
                <div className="hc-mask">
                  <div
                    className="hc-bg"
                    style={{ backgroundImage: `url(${bg.src})`, backgroundPosition: bg.pos }}
                  />
                </div>
              </div>

              {/* Text */}
              <div className="hc-text">
                <div className="hc-text__inner">
                  <p className="hc-text__label">{slide.label}</p>
                  <h1 className="hc-text__title">
                    {slide.title.split('\n').map((line, j) => (
                      <span key={j}>{line}</span>
                    ))}
                  </h1>
                </div>
              </div>
            </div>
          );
        })}

        {/* Pager */}
        <ol className="hc-pager" aria-label={locale === 'en' ? 'Slide pager' : 'スライドページャー'}>
          {BG_IMAGES.map((_, i) => (
            <li
              key={i}
              className={`hc-pager__item${i === currentIdx ? ' hc-pager__item--current' : ''}`}
            >
              <button
                onClick={() => { if (timerRef.current) clearTimeout(timerRef.current); goTo(i); }}
                aria-label={locale === 'en' ? `Slide ${i + 1}` : `スライド ${i + 1}`}
              >
                <span className="hc-pager__progress" />
              </button>
            </li>
          ))}
        </ol>

      </div>

      {/* Scroll indicator */}
      <div className="hc-scroll" aria-hidden="true">
        <span className="hc-scroll__label">scroll</span>
        <div className="hc-scroll__line" />
      </div>

      <style>{`
        /* ── Container ─────────────────────────────── */
        .hc-hero {
          position: relative;
          height: 100dvh;
          min-height: 640px;
          background: #000;
          overflow: hidden;
        }
        .hc-carousel {
          position: relative;
          height: 100%;
          overflow: hidden;
        }

        /* ── Slide item ────────────────────────────── */
        .hc-item {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .hc-item--ready  { visibility: hidden; z-index: 1; }
        .hc-item--current { z-index: 2; }
        .hc-item--next   { z-index: 1; }
        .hc-item--prev   { z-index: 3; } /* above current while exiting */

        /* ── Image wrapper (translateX) ─────────────── */
        .hc-img {
          position: absolute;
          inset: 0;
          transform: translateX(0);
          transition: transform 1.1s 0.6s cubic-bezier(0.4, 0, 0.22, 1);
        }
        .hc-img::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 50%;
          background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%);
          pointer-events: none;
        }

        /* next: pre-positioned off-screen right, no transition */
        .hc-item--next .hc-img {
          transform: translateX(100%);
          transition: none;
        }
        /* prev: exits to left */
        .hc-item--prev .hc-img {
          transform: translateX(-100%);
          transition: transform 1.1s 0.6s cubic-bezier(0.4, 0, 0.22, 1);
        }
        /* ready: snap back to default (hidden) */
        .hc-item--ready .hc-img {
          transform: translateX(0);
          transition: none;
        }

        /* ── Mask (scale + border-radius reveal) ─────── */
        .hc-mask {
          overflow: hidden;
          position: absolute;
          inset: 0;
          border-radius: 0;
          transform: scale(1);
          transition:
            border-radius 0.6s 1.6s cubic-bezier(0.4, 0, 0.22, 1),
            transform     0.6s 1.6s cubic-bezier(0.4, 0, 0.22, 1);
        }
        .hc-item--next .hc-mask {
          border-radius: 30px;
          transform: scale(0.55);
          transition: none;
        }
        .hc-item--prev .hc-mask {
          border-radius: 30px;
          transform: scale(0.55);
          transition:
            border-radius 0.6s cubic-bezier(0.4, 0, 0.22, 1),
            transform     0.6s cubic-bezier(0.4, 0, 0.22, 1);
        }
        .hc-item--ready .hc-mask {
          border-radius: 0;
          transform: scale(1);
          transition: none;
        }

        /* ── Background image (counter-scale) ──────── */
        .hc-bg {
          position: absolute;
          inset: 0;
          background-repeat: no-repeat;
          background-size: cover;
          transform: scale(1);
          transition: transform 0.6s 1.6s cubic-bezier(0.4, 0, 0.22, 1);
        }
        .hc-item--next .hc-bg {
          transform: scale(1.25);
          transition: none;
        }
        .hc-item--prev .hc-bg {
          transform: scale(1.25);
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.22, 1);
        }
        .hc-item--ready .hc-bg {
          transform: scale(1);
          transition: none;
        }

        /* ── Text layer (translateX, same as img) ─── */
        .hc-text {
          position: absolute;
          inset: 0;
          transform: translateX(0);
          transition: transform 1.1s 0.5s cubic-bezier(0.4, 0, 0.22, 1);
          color: #fff;
          pointer-events: none;
        }
        .hc-item--next .hc-text {
          transform: translateX(100%);
          transition: none;
        }
        .hc-item--prev .hc-text {
          transform: translateX(-100%);
          transition: transform 1.1s 0.5s cubic-bezier(0.4, 0, 0.22, 1);
        }
        .hc-item--ready .hc-text {
          transform: translateX(0);
          transition: none;
        }

        .hc-text__inner {
          position: absolute;
          left: clamp(2rem, 6vw, 94px);
          right: clamp(2rem, 6vw, 94px);
          bottom: clamp(5rem, 10vh, 100px);
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }
        .hc-text__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.6875rem;
          letter-spacing: 0.40em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.50);
          margin: 0;
        }
        .hc-text__title {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: clamp(1.875rem, 4.5vw, 3.75rem);
          line-height: 1.55;
          color: #fff;
          letter-spacing: 0.08em;
          margin: 0;
          display: flex;
          flex-direction: column;
        }

        /* ── Pager ──────────────────────────────────── */
        .hc-pager {
          position: absolute;
          bottom: clamp(1.5rem, 4vh, 2.5rem);
          right: clamp(2rem, 6vw, 94px);
          z-index: 10;
          display: flex;
          gap: 0.625rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .hc-pager__item button {
          display: block;
          width: 32px;
          height: 2px;
          background: rgba(255,255,255,0.25);
          border: none;
          cursor: pointer;
          padding: 6px 0;
          background-clip: content-box;
          position: relative;
          overflow: hidden;
        }
        .hc-pager__progress {
          position: absolute;
          top: 6px; left: 0;
          height: 2px;
          width: 0%;
          background: rgba(255,255,255,0.90);
        }
        .hc-pager__item--current .hc-pager__progress {
          animation: hc-prog ${SLIDE_DURATION}ms linear forwards;
        }
        @keyframes hc-prog {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* ── Scroll indicator ───────────────────────── */
        .hc-scroll {
          position: absolute;
          bottom: clamp(1.5rem, 4vh, 2.5rem);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          z-index: 10;
        }
        .hc-scroll__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-size: 0.5625rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.40);
        }
        .hc-scroll__line {
          width: 1px;
          height: 44px;
          background: rgba(255,255,255,0.30);
          animation: hc-bob 2.5s ease-in-out infinite;
        }
        @keyframes hc-bob {
          0%, 100% { transform: scaleY(1); transform-origin: top; }
          50%       { transform: scaleY(0.6); transform-origin: top; }
        }

        /* ── Responsive ─────────────────────────────── */
        @media (max-width: 640px) {
          .hc-text__inner {
            bottom: clamp(4.5rem, 12vh, 7rem);
          }
          .hc-pager { right: 1.5rem; }
        }
      `}</style>
    </section>
  );
}
