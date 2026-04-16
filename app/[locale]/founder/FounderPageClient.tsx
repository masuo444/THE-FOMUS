'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useInView } from '@/lib/useInView';

export default function FounderPageClient() {
  const t = useTranslations('founderPage');
  const locale = useLocale();
  const homeHref    = locale === 'en' ? '/en' : '/';
  const contactHref = locale === 'en' ? '/en/contact' : '/contact';

  const profile  = t.raw('profile') as string[];
  const message  = t.raw('message') as string[];
  const business = t.raw('business') as string[];

  const { ref: contentRef, inView: contentInView } = useInView<HTMLDivElement>();
  const { ref: msgRef,     inView: msgInView }     = useInView<HTMLDivElement>();
  const { ref: bizRef,     inView: bizInView }     = useInView<HTMLDivElement>();

  return (
    <main className="fp-main">

      {/* ── Back link ─────────────────────────────── */}
      <div className="fp-nav">
        <Link href={homeHref} className="fp-back">
          {locale === 'en' ? '← Home' : '← ホームへ'}
        </Link>
      </div>

      {/* ── Photo + Name + Profile — ひとつの流れ ─── */}
      <article className="fp-article">

        <div ref={contentRef} className={`fp-top reveal${contentInView ? ' is-in-view' : ''}`}>
          <div className="fp-photo" />
          <div className="fp-nameblock">
            <p className="fp-nameblock__label">
              <span className="fp-nameblock__label-ja">{t('profileLabel')}</span>
              <span className="fp-nameblock__label-sep">{' | '}</span>
              <span className="fp-nameblock__label-en">{t('profileLabelEn')}</span>
            </p>
            <h1 className="fp-nameblock__name">{t('name')}</h1>
            <p className="fp-nameblock__roman">{t('nameRoman')}</p>
            <p className="fp-nameblock__title">{t('title')}</p>
          </div>
        </div>

        {/* 略歴 — 段落がそのまま続く */}
        <div className="fp-prose">
          {profile.map((para, i) => (
            <p key={`p${i}`} className="fp-prose__para">{para}</p>
          ))}
        </div>

        {/* メッセージ — ラベル+見出しのあと段落が続く */}
        <div ref={msgRef} className={`fp-prose fp-prose--msg reveal${msgInView ? ' is-in-view' : ''}`}>
          <p className="fp-section-label">
            <span className="fp-section-label__ja">{t('messageLabel')}</span>
            <span className="fp-section-label__sep">{' | '}</span>
            <span className="fp-section-label__en">{t('messageLabelEn')}</span>
          </p>
          <p className="fp-prose__headline">{t('messageHeadline')}</p>
          {message.map((para, i) => (
            <p key={`m${i}`} className="fp-prose__para">{para}</p>
          ))}
          <div className="fp-sig">
            <p className="fp-sig__title">{t('messageSignature')}</p>
            <p className="fp-sig__name">{t('messageSignatureName')}</p>
          </div>
        </div>

        {/* THE FOMUS 事業 — 同じ流れの中で */}
        <div ref={bizRef} className={`fp-prose fp-prose--biz reveal${bizInView ? ' is-in-view' : ''}`}>
          <p className="fp-section-label">
            <span className="fp-section-label__en">{t('businessLabel')}</span>
            <span className="fp-section-label__sep">{' | '}</span>
            <span className="fp-section-label__en">{t('businessLabelSub')}</span>
          </p>
          {business.map((para, i) => (
            <p key={`b${i}`} className="fp-prose__para">{para}</p>
          ))}
        </div>

      </article>

      {/* ── CTA ───────────────────────────────────── */}
      <div className="fp-cta">
        <Link href={contactHref} className="fp-cta__button">
          {t('cta')}
        </Link>
      </div>

      <style>{`
        .fp-main {
          background: var(--color-white);
          padding-top: 64px;
        }

        /* ── Nav ──────────────────────────────── */
        .fp-nav {
          padding: 2rem clamp(2rem, 8vw, 8rem);
          border-bottom: 1px solid var(--color-line);
        }
        .fp-back {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .fp-back:hover { color: var(--color-accent); }

        /* ── Article（全体の器）───────────────── */
        .fp-article {
          max-width: 780px;
          margin: 0 auto;
          padding: clamp(3rem, 6vw, 5rem) clamp(2rem, 6vw, 4rem);
        }

        /* ── Top: Photo + Name ────────────────── */
        .fp-top {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: clamp(2rem, 4vw, 3.5rem);
          align-items: end;
          margin-bottom: clamp(3rem, 5vw, 4rem);
        }
        .fp-photo {
          width: 100%;
          aspect-ratio: 3 / 4;
          background-image: url(/images/founder.png);
          background-size: cover;
          background-position: center top;
        }
        .fp-nameblock {
          display: flex;
          flex-direction: column;
        }
        .fp-nameblock__label {
          color: var(--color-ink-mute);
          margin: 0 0 1.25rem;
          display: flex;
          align-items: baseline;
        }
        .fp-nameblock__label-ja {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: 0.8125rem;
        }
        .fp-nameblock__label-sep {
          font-family: var(--font-jost), Jost, sans-serif;
          font-size: 0.6875rem;
          opacity: 0.4;
          margin: 0 0.5rem;
        }
        .fp-nameblock__label-en {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.6875rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }
        .fp-nameblock__name {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: clamp(1.625rem, 3vw, 2.125rem);
          color: var(--color-ink);
          letter-spacing: 0.14em;
          margin: 0 0 0.4rem;
        }
        .fp-nameblock__roman {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(0.9375rem, 1.5vw, 1.125rem);
          color: var(--color-ink-mute);
          letter-spacing: 0.03em;
          margin: 0 0 0.6rem;
        }
        .fp-nameblock__title {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0;
        }

        /* ── Prose（共通の本文スタイル）──────── */
        .fp-prose {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: clamp(3rem, 5vw, 4rem);
        }
        .fp-prose__para {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: clamp(0.9375rem, 1.15vw, 1.0625rem);
          line-height: 2.3;
          letter-spacing: 0.04em;
          color: var(--color-ink-light, var(--color-ink));
          margin: 0;
        }
        .fp-prose__headline {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: clamp(1.125rem, 1.8vw, 1.375rem);
          line-height: 1.7;
          color: var(--color-ink);
          margin: 0;
        }

        /* メッセージ前の余白 */
        .fp-prose--msg {
          padding-top: clamp(2.5rem, 4vw, 3.5rem);
          border-top: 1px solid var(--color-line);
        }

        /* ビジネス前の余白 */
        .fp-prose--biz {
          padding-top: clamp(2.5rem, 4vw, 3.5rem);
          border-top: 1px solid var(--color-line);
        }

        /* ── セクションラベル（小見出し）────── */
        .fp-section-label {
          color: var(--color-ink-mute);
          margin: 0 0 1.5rem;
          display: flex;
          align-items: baseline;
        }
        .fp-section-label__ja {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: 0.8125rem;
        }
        .fp-section-label__sep {
          font-family: var(--font-jost), Jost, sans-serif;
          font-size: 0.6875rem;
          opacity: 0.4;
          margin: 0 0.5rem;
        }
        .fp-section-label__en {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.6875rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        /* ── 署名 ────────────────────────────── */
        .fp-sig {
          text-align: right;
          margin-top: 1.5rem;
        }
        .fp-sig__title {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.6875rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0;
        }
        .fp-sig__name {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: 1rem;
          color: var(--color-ink);
          letter-spacing: 0.1em;
          margin: 0.3rem 0 0;
        }

        /* ── CTA ──────────────────────────────── */
        .fp-cta {
          padding: clamp(3rem, 5vw, 4rem) clamp(2rem, 8vw, 8rem);
          display: flex;
          justify-content: center;
          border-top: 1px solid var(--color-line);
        }
        .fp-cta__button {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.25rem, 2vw, 1.625rem);
          color: var(--color-ink);
          text-decoration: none;
          padding-bottom: 0.25rem;
          border-bottom: 1px solid var(--color-ink);
          transition: color 0.35s ease, border-color 0.35s ease;
        }
        .fp-cta__button:hover {
          color: var(--color-accent);
          border-color: var(--color-accent);
        }

        /* ── Reveal ───────────────────────────── */
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1),
                      transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal.is-in-view {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Responsive ───────────────────────── */
        @media (max-width: 640px) {
          .fp-top {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .fp-photo {
            max-width: 220px;
            margin: 0 auto;
          }
          .fp-nameblock {
            align-items: center;
          }
          .fp-nameblock__label,
          .fp-section-label {
            justify-content: center;
          }
          .fp-sig {
            text-align: center;
          }
        }
      `}</style>
    </main>
  );
}
