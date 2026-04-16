'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useInView } from '@/lib/useInView';

interface CareerItem {
  period: string;
  title: string;
  body: string;
}

interface ProjectItem {
  name: string;
  body: string;
}

export default function FounderPageClient() {
  const t = useTranslations('founderPage');
  const locale = useLocale();
  const homeHref    = locale === 'en' ? '/en' : '/';
  const contactHref = locale === 'en' ? '/en/contact' : '/contact';

  const career       = t.raw('career') as CareerItem[];
  const achievements = t.raw('achievements') as string[];
  const projects     = t.raw('projects') as ProjectItem[];

  const { ref: layoutRef,       inView: layoutInView }       = useInView<HTMLDivElement>();
  const { ref: careerRef,       inView: careerInView }       = useInView<HTMLDivElement>();
  const { ref: achievementsRef, inView: achievementsInView } = useInView<HTMLDivElement>();
  const { ref: projectsRef,     inView: projectsInView }     = useInView<HTMLDivElement>();
  const { ref: messageRef,      inView: messageInView }      = useInView<HTMLDivElement>();
  const { ref: statsRef,        inView: statsInView }        = useInView<HTMLDivElement>();

  return (
    <main className="fp-main">

      {/* ── Back link ─────────────────────────────── */}
      <div className="fp-nav">
        <Link href={homeHref} className="fp-back">{locale === 'en' ? '← Home' : '← ホームへ'}</Link>
      </div>

      {/* ── Page title ────────────────────────────── */}
      <div className="fp-heading">
        <p className="fp-heading__eyebrow">{t('label')}</p>
        <h1 className="fp-heading__title">
          {locale === 'en' ? 'Founder' : '代表メッセージ'}
        </h1>
        <div className="fp-heading__rule" />
      </div>

      {/* ── 2-column: photo + intro ──────────────── */}
      <div ref={layoutRef} className="fp-layout">

        {/* Photo */}
        <div className={`fp-photo-col reveal${layoutInView ? ' is-in-view' : ''}`}>
          <div className="fp-photo" />
        </div>

        {/* Name + Title + Intro */}
        <div className={`fp-intro-col reveal reveal-delay-1${layoutInView ? ' is-in-view' : ''}`}>
          <p className="fp-intro__name">{t('name')}</p>
          <p className="fp-intro__name-roman">{t('nameRoman')}</p>
          <p className="fp-intro__title">{t('title')}</p>
          <p className="fp-intro__text">{t('intro')}</p>
        </div>

      </div>

      {/* ── Career ────────────────────────────────── */}
      <div ref={careerRef} className={`fp-career reveal${careerInView ? ' is-in-view' : ''}`}>
        <p className="fp-career__label">{t('careerLabel')}</p>
        <div className="fp-career__list">
          {career.map((item, i) => (
            <div key={i} className={`fp-career__item${i === career.length - 1 ? ' fp-career__item--last' : ''}`}>
              <span className="fp-career__period">{item.period}</span>
              <div className="fp-career__content">
                <p className="fp-career__title">{item.title}</p>
                <p className="fp-career__body">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Achievements ──────────────────────────── */}
      <div ref={achievementsRef} className={`fp-achievements reveal${achievementsInView ? ' is-in-view' : ''}`}>
        <p className="fp-achievements__label">{t('achievementsLabel')}</p>
        <div className="fp-achievements__list">
          {achievements.map((item, i) => (
            <p key={i} className="fp-achievements__item">{item}</p>
          ))}
        </div>
      </div>

      {/* ── Current Focus ─────────────────────────── */}
      <div ref={projectsRef} className={`fp-projects reveal${projectsInView ? ' is-in-view' : ''}`}>
        <p className="fp-projects__label">{t('projectsLabel')}</p>
        <div className="fp-projects__grid">
          {projects.map((item, i) => (
            <div key={i} className="fp-projects__card">
              <p className="fp-projects__name">{item.name}</p>
              <p className="fp-projects__body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Message ───────────────────────────────── */}
      <div ref={messageRef} className={`fp-message reveal${messageInView ? ' is-in-view' : ''}`}>
        <p className="fp-message__label">{t('messageLabel')}</p>
        <p className="fp-message__text">{t('message')}</p>
        <p className="fp-message__signature">{t('nameRoman')}</p>
      </div>

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
      <div className="fp-cta">
        <Link href={contactHref} className="fp-cta__button">
          {locale === 'en' ? 'Contact' : 'お問い合わせ'}
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

        /* ── Page title ──────────────────────────── */
        .fp-heading {
          padding: clamp(3.5rem, 7vw, 6rem) clamp(2rem, 8vw, 8rem) clamp(3rem, 5vw, 5rem);
          border-bottom: 1px solid var(--color-line);
        }
        .fp-heading__eyebrow {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.40em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0 0 1.25rem;
        }
        .fp-heading__title {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(3rem, 8vw, 6.5rem);
          line-height: 1;
          color: var(--color-ink);
          margin: 0 0 2.5rem;
          letter-spacing: 0.01em;
        }
        .fp-heading__rule {
          width: 2.5rem;
          height: 1px;
          background: var(--color-accent);
          opacity: 0.45;
        }

        /* ── 2-column layout: photo + intro ──────── */
        .fp-layout {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 0;
          border-bottom: 1px solid var(--color-line);
        }

        /* Photo column */
        .fp-photo-col {
          border-right: 1px solid var(--color-line);
          padding: clamp(4rem, 6vw, 6rem) clamp(2.5rem, 4vw, 4rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.75rem;
        }
        .fp-photo {
          width: 100%;
          aspect-ratio: 3 / 4;
          background-image: url(/images/founder.png);
          background-size: cover;
          background-position: center top;
        }

        /* Intro column */
        .fp-intro-col {
          padding: clamp(3rem, 5vw, 5rem) clamp(2.5rem, 5vw, 5.5rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0;
        }
        .fp-intro__name {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: clamp(1.5rem, 3vw, 2rem);
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
          margin: 0 0 2.5rem;
        }
        .fp-intro__text {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: clamp(0.9375rem, 1.25vw, 1.125rem);
          line-height: 2.35;
          letter-spacing: 0.04em;
          color: var(--color-ink-light);
          margin: 0;
        }

        /* ── Career ──────────────────────────────── */
        .fp-career {
          border-bottom: 1px solid var(--color-line);
          padding: clamp(4rem, 6vw, 6rem) clamp(2rem, 8vw, 8rem);
        }
        .fp-career__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0 0 2.5rem;
        }
        .fp-career__list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .fp-career__item {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 2rem;
          padding: 2rem 0;
          border-bottom: 1px solid var(--color-line);
        }
        .fp-career__item--last {
          border-bottom: none;
        }
        .fp-career__period {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          padding-top: 0.25rem;
        }
        .fp-career__content {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .fp-career__title {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 500;
          font-size: clamp(1rem, 1.4vw, 1.125rem);
          color: var(--color-ink);
          margin: 0;
          line-height: 1.6;
        }
        .fp-career__body {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: clamp(0.875rem, 1.1vw, 1rem);
          line-height: 2.2;
          color: var(--color-ink-light);
          margin: 0;
        }

        /* ── Achievements ────────────────────────── */
        .fp-achievements {
          border-bottom: 1px solid var(--color-line);
          padding: clamp(4rem, 6vw, 6rem) clamp(2rem, 8vw, 8rem);
        }
        .fp-achievements__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0 0 2.5rem;
        }
        .fp-achievements__list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .fp-achievements__item {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: clamp(0.9375rem, 1.25vw, 1.125rem);
          line-height: 1.8;
          color: var(--color-ink);
          margin: 0;
          padding-left: 0;
        }

        /* ── Projects (Current Focus) ────────────── */
        .fp-projects {
          border-bottom: 1px solid var(--color-line);
          padding: clamp(4rem, 6vw, 6rem) clamp(2rem, 8vw, 8rem);
        }
        .fp-projects__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0 0 2.5rem;
        }
        .fp-projects__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }
        .fp-projects__card {
          border-top: 1px solid var(--color-line);
          padding-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .fp-projects__name {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.25rem, 2vw, 1.5rem);
          color: var(--color-ink);
          margin: 0;
          letter-spacing: 0.01em;
        }
        .fp-projects__body {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: clamp(0.875rem, 1.1vw, 1rem);
          line-height: 2.2;
          color: var(--color-ink-light);
          margin: 0;
        }

        /* ── Message ─────────────────────────────── */
        .fp-message {
          border-bottom: 1px solid var(--color-line);
          padding: clamp(4rem, 6vw, 6rem) clamp(2rem, 8vw, 8rem);
          max-width: 760px;
        }
        .fp-message__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0 0 2.5rem;
        }
        .fp-message__text {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: clamp(1rem, 1.3vw, 1.125rem);
          line-height: 2.5;
          color: var(--color-ink);
          margin: 0 0 2.5rem;
        }
        .fp-message__signature {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.625rem, 3vw, 2.5rem);
          color: var(--color-ink-mute);
          margin: 0;
          letter-spacing: 0.04em;
        }

        /* ── Stats ───────────────────────────────── */
        .fp-stats {
          display: flex;
          align-items: center;
          padding: clamp(2.5rem, 4vw, 3.5rem) clamp(2rem, 8vw, 8rem);
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

        /* ── Responsive ──────────────────────────── */
        @media (max-width: 900px) {
          .fp-layout {
            grid-template-columns: 1fr;
          }
          .fp-photo-col {
            border-right: none;
            border-bottom: 1px solid var(--color-line);
          }
          .fp-photo {
            max-width: 320px;
            width: 70%;
          }
          .fp-career__item {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
        }
        @media (max-width: 640px) {
          .fp-stats {
            flex-direction: column;
            gap: 2rem;
            padding: 2.5rem 1.5rem;
          }
          .fp-stat__sep { width: 3rem; height: 1px; }
          .fp-projects__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
