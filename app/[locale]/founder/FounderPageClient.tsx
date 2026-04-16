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

  const { ref: introRef,    inView: introInView }    = useInView<HTMLDivElement>();
  const { ref: profileRef,  inView: profileInView }  = useInView<HTMLDivElement>();
  const { ref: messageRef,  inView: messageInView }  = useInView<HTMLDivElement>();
  const { ref: businessRef, inView: businessInView } = useInView<HTMLDivElement>();
  const { ref: statsRef,    inView: statsInView }    = useInView<HTMLDivElement>();
  const { ref: ctaRef,      inView: ctaInView }      = useInView<HTMLDivElement>();

  return (
    <main className="fp-main">

      {/* ── Back link ─────────────────────────────── */}
      <div className="fp-nav">
        <Link href={homeHref} className="fp-back">
          {locale === 'en' ? '← Home' : '← ホームへ'}
        </Link>
      </div>

      {/* ── Hero ──────────────────────────────────── */}
      <section className="fp-hero">
        <p className="fp-hero__eyebrow">{t('label')}</p>
        <h1 className="fp-hero__title">
          {locale === 'en' ? 'Founder' : '代表メッセージ'}
        </h1>
      </section>

      {/* ── Photo + Name ──────────────────────────── */}
      <section ref={introRef} className={`fp-intro reveal${introInView ? ' is-in-view' : ''}`}>
        <div className="fp-intro__photo" />
        <div className="fp-intro__body">
          <p className="fp-intro__name">{t('name')}</p>
          <p className="fp-intro__name-roman">{t('nameRoman')}</p>
          <p className="fp-intro__title">{t('title')}</p>
        </div>
      </section>

      {/* ── Profile（代表略歴）────────────────────── */}
      <section ref={profileRef} className={`fp-profile reveal${profileInView ? ' is-in-view' : ''}`}>
        <p className="fp-profile__label">
          <span className="fp-profile__label-ja">{t('profileLabel')}</span>
          <span className="fp-profile__label-sep">{' | '}</span>
          <span className="fp-profile__label-en">{t('profileLabelEn')}</span>
        </p>
        <div className="fp-profile__body">
          {profile.map((para, i) => (
            <p key={i} className="fp-profile__para">{para}</p>
          ))}
        </div>
      </section>

      {/* ── Message（代表メッセージ）───────────────── */}
      <section ref={messageRef} className={`fp-message reveal${messageInView ? ' is-in-view' : ''}`}>
        <p className="fp-message__label">
          <span className="fp-message__label-ja">{t('messageLabel')}</span>
          <span className="fp-message__label-sep">{' | '}</span>
          <span className="fp-message__label-en">{t('messageLabelEn')}</span>
        </p>
        <p className="fp-message__headline">{t('messageHeadline')}</p>
        <div className="fp-message__body">
          {message.map((para, i) => (
            <p key={i} className="fp-message__para">{para}</p>
          ))}
        </div>
        <div className="fp-message__sig">
          <p className="fp-message__sig-title">{t('messageSignature')}</p>
          <p className="fp-message__sig-name">{t('messageSignatureName')}</p>
        </div>
      </section>

      {/* ── Business（THE FOMUS — ダーク背景）──────── */}
      <section ref={businessRef} className={`fp-business reveal${businessInView ? ' is-in-view' : ''}`}>
        <p className="fp-business__label">{t('businessLabel')}</p>
        <p className="fp-business__sub">{t('businessLabelSub')}</p>
        <div className="fp-business__content">
          {business.map((para, i) => (
            <p key={i} className="fp-business__para">{para}</p>
          ))}
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────── */}
      <div ref={statsRef} className={`fp-stats reveal${statsInView ? ' is-in-view' : ''}`}>
        <div className="fp-stat">
          <span className="fp-stat__value">{t('stats.countries.value')}</span>
          <span className="fp-stat__label">{t('stats.countries.label')}</span>
        </div>
        <div className="fp-stat__sep" aria-hidden="true" />
        <div className="fp-stat">
          <span className="fp-stat__value">{t('stats.events.value')}</span>
          <span className="fp-stat__label">{t('stats.events.label')}</span>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────── */}
      <div ref={ctaRef} className={`fp-cta reveal${ctaInView ? ' is-in-view' : ''}`}>
        <Link href={contactHref} className="fp-cta__button">
          {t('cta')}
        </Link>
      </div>

      <style>{`
        /* ── Base ─────────────────────────────────── */
        .fp-main {
          background: var(--color-white);
          padding-top: 64px;
        }

        /* ── Back link ───────────────────────────── */
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

        /* ── Hero（Company と揃える）─────────────── */
        .fp-hero {
          padding: clamp(6rem, 12vw, 11rem) clamp(2rem, 8vw, 8rem) clamp(5rem, 10vw, 9rem);
          text-align: center;
        }
        .fp-hero__eyebrow {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0 0 1.5rem;
        }
        .fp-hero__title {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(3.5rem, 9vw, 7rem);
          line-height: 1;
          color: var(--color-ink);
          margin: 0;
          letter-spacing: 0.01em;
        }

        /* ── Photo + Name（2カラム）──────────────── */
        .fp-intro {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: clamp(3rem, 5vw, 5rem);
          max-width: 960px;
          margin: 0 auto;
          padding: clamp(4rem, 7vw, 6rem) clamp(2rem, 8vw, 8rem);
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
          align-items: center;
        }
        .fp-intro__photo {
          width: 100%;
          aspect-ratio: 3 / 4;
          background-image: url(/images/founder.png);
          background-size: cover;
          background-position: center top;
        }
        .fp-intro__body {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .fp-intro__name {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: clamp(1.5rem, 2.5vw, 1.875rem);
          color: var(--color-ink);
          letter-spacing: 0.12em;
          margin: 0 0 0.5rem;
        }
        .fp-intro__name-roman {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1rem, 1.8vw, 1.25rem);
          color: var(--color-ink-mute);
          letter-spacing: 0.04em;
          margin: 0 0 0.75rem;
        }
        .fp-intro__title {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0;
        }

        /* ── Profile（代表略歴）──────────────────── */
        .fp-profile {
          padding: clamp(4rem, 7vw, 6rem) clamp(2rem, 8vw, 8rem);
          border-bottom: 1px solid var(--color-line);
          max-width: 800px;
          margin: 0 auto;
        }
        .fp-profile__label {
          color: var(--color-ink-mute);
          margin: 0 0 2.5rem;
          display: flex;
          align-items: baseline;
          gap: 0;
        }
        .fp-profile__label-ja {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: 0.875rem;
        }
        .fp-profile__label-sep {
          font-family: var(--font-jost), Jost, sans-serif;
          font-size: 0.75rem;
          opacity: 0.5;
          margin: 0 0.5rem;
        }
        .fp-profile__label-en {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }
        .fp-profile__body {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .fp-profile__para {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: clamp(0.9375rem, 1.2vw, 1.0625rem);
          line-height: 2.3;
          color: var(--color-ink-light, var(--color-ink-mute));
          margin: 0;
        }

        /* ── Message（代表メッセージ）────────────── */
        .fp-message {
          padding: clamp(4rem, 7vw, 6rem) clamp(2rem, 8vw, 8rem);
          border-bottom: 1px solid var(--color-line);
          background: #fafaf8;
        }
        .fp-message__label {
          color: var(--color-ink-mute);
          margin: 0 0 2.5rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 2.5rem;
          display: flex;
          align-items: baseline;
          gap: 0;
        }
        .fp-message__label-ja {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: 0.875rem;
        }
        .fp-message__label-sep {
          font-family: var(--font-jost), Jost, sans-serif;
          font-size: 0.75rem;
          opacity: 0.5;
          margin: 0 0.5rem;
        }
        .fp-message__label-en {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }
        .fp-message__headline {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: clamp(1.25rem, 2vw, 1.625rem);
          color: var(--color-ink);
          line-height: 1.6;
          margin: 0 auto 2.5rem;
          max-width: 800px;
        }
        .fp-message__body {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .fp-message__para {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: clamp(0.9375rem, 1.2vw, 1.0625rem);
          line-height: 2.3;
          color: var(--color-ink-light, var(--color-ink-mute));
          margin: 0;
        }
        .fp-message__sig {
          text-align: right;
          margin-top: 3rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        .fp-message__sig-title {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0;
        }
        .fp-message__sig-name {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: 1.125rem;
          color: var(--color-ink);
          letter-spacing: 0.1em;
          margin: 0.35rem 0 0;
        }

        /* ── Business（ダーク背景）──────────────── */
        .fp-business {
          background: var(--color-ink, #1c3a5f);
          padding: clamp(5rem, 8vw, 7rem) clamp(2rem, 8vw, 8rem);
          text-align: center;
        }
        .fp-business__label {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(2rem, 4vw, 3rem);
          color: rgba(240, 240, 238, 0.9);
          margin: 0;
          letter-spacing: 0.01em;
        }
        .fp-business__sub {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.6875rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(240, 240, 238, 0.35);
          margin: 0.5rem 0 0;
        }
        .fp-business__content {
          max-width: 780px;
          margin: 3rem auto 0;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          text-align: left;
        }
        .fp-business__para {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: clamp(0.9375rem, 1.2vw, 1.0625rem);
          line-height: 2.3;
          color: rgba(240, 240, 238, 0.75);
          margin: 0;
        }

        /* ── Stats ───────────────────────────────── */
        .fp-stats {
          display: flex;
          align-items: center;
          padding: clamp(2.5rem, 4vw, 3.5rem) clamp(2rem, 8vw, 8rem);
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
          gap: 0;
        }
        .fp-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.55rem;
          text-align: center;
        }
        .fp-stat__sep {
          width: 1px;
          height: 3rem;
          background: var(--color-line);
          flex-shrink: 0;
        }
        .fp-stat__value {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(2.25rem, 4vw, 3.25rem);
          color: var(--color-accent);
          line-height: 1;
        }
        .fp-stat__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
        }

        /* ── CTA ─────────────────────────────────── */
        .fp-cta {
          padding: clamp(4rem, 7vw, 6rem) clamp(2rem, 8vw, 8rem);
          display: flex;
          justify-content: center;
        }
        .fp-cta__button {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.25rem, 2vw, 1.625rem);
          color: var(--color-ink);
          text-decoration: none;
          letter-spacing: 0.02em;
          padding-bottom: 0.25rem;
          border-bottom: 1px solid var(--color-ink);
          transition: color 0.35s ease, border-color 0.35s ease;
        }
        .fp-cta__button:hover {
          color: var(--color-accent);
          border-color: var(--color-accent);
        }

        /* ── Reveal animation ────────────────────── */
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.is-in-view {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Responsive ──────────────────────────── */
        @media (max-width: 900px) {
          .fp-intro {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .fp-intro__photo {
            max-width: 280px;
            margin: 0 auto;
          }
          .fp-intro__body {
            align-items: center;
          }
          .fp-profile__label,
          .fp-message__label {
            justify-content: center;
          }
        }
        @media (max-width: 640px) {
          .fp-stats {
            flex-direction: column;
            gap: 2rem;
            padding: 2.5rem 1.5rem;
          }
          .fp-stat__sep { width: 3rem; height: 1px; }
        }
      `}</style>
    </main>
  );
}
