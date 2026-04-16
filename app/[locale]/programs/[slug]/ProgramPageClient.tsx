'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useInView } from '@/lib/useInView';

interface ProgramPageClientProps {
  slug: string;
  programKey: string;
  locale: string;
}

const HERO_IMAGES: Record<string, { src: string; pos: string }> = {
  corporateGift: { src: '/images/masu-top.jpg',            pos: 'center 40%' },
  culturalSpace:  { src: '/images/cultural-space-hero.jpg', pos: 'center' },
  hotelBranding:  { src: '/images/masukame.jpg',            pos: 'center 35%' },
  sakeMasu:       { src: '/images/material-philosophy.jpg', pos: 'center' },
  bespoke:        { src: '/images/parure.jpg',              pos: 'center' },
};

const ACCENT_IMAGES: Record<string, { src: string; pos: string }> = {
  corporateGift: { src: '/images/masukame.jpg',            pos: 'center 35%' },
  culturalSpace:  { src: '/images/sagishima-wall.png',      pos: 'center 30%' },
  hotelBranding:  { src: '/images/material-philosophy.jpg', pos: 'center' },
  sakeMasu:       { src: '/images/masu-lug-crop.jpg',       pos: 'center 40%' },
  bespoke:        { src: '/images/masu-top.jpg',            pos: 'center' },
};

/* ── Per-program metrics ─────────────────────────────────────────────────── */
/* ── Space types (Cultural Space only) ──────────────────────────────── */
const SPACE_TYPES: { en: string; ja: string }[] = [
  { en: 'Corporate Office',      ja: 'コーポレートオフィス・応接室' },
  { en: 'Hotel & Hospitality',   ja: 'ホテル・ラグジュアリー施設' },
  { en: 'Embassy & Government',  ja: '大使館・政府機関' },
  { en: 'Museum & Gallery',      ja: 'ミュージアム・ギャラリー' },
  { en: 'Convention & Event',    ja: 'コンベンション・イベント会場' },
  { en: 'Cultural Institution',  ja: '文化施設・公共施設' },
];


export default function ProgramPageClient({ programKey, locale }: ProgramPageClientProps) {
  const t = useTranslations('programPages');

  const { ref: heroRef,    inView: heroInView    } = useInView<HTMLDivElement>();
  const { ref: editRef,    inView: editInView    } = useInView<HTMLDivElement>();
  const { ref: inclRef,    inView: inclInView    } = useInView<HTMLDivElement>();
  const { ref: forWhomRef, inView: forWhomInView } = useInView<HTMLDivElement>();
  const { ref: spacesRef,  inView: spacesInView  } = useInView<HTMLDivElement>();
  const { ref: ctaRef,     inView: ctaInView     } = useInView<HTMLDivElement>();
  const { ref: diptychRef, inView: diptychInView } = useInView<HTMLDivElement>();

  const key = <K extends string>(path: K) =>
    `items.${programKey}.${path}` as Parameters<typeof t>[0];

  const bodyParagraphs = t.raw(key('body'))           as string[];
  const includesItems  = t.raw(key('includes.items')) as string[];
  const forWhomItems   = t.raw(key('forWhom.items'))  as string[];

  const hero   = HERO_IMAGES[programKey]   ?? HERO_IMAGES.corporateGift;
  const accent = ACCENT_IMAGES[programKey] ?? ACCENT_IMAGES.corporateGift;

  const servicesHref = locale === 'en' ? '/en/services' : '/services';
  const contactHref  = locale === 'en' ? '/en/contact'  : '/contact';

  /* ── Corporate Gift: dedicated premium layout ─────────────────────────── */
  if (programKey === 'corporateGift') {
    return (
      <main className="cg-main">

        {/* ── Hero ── */}
        <div ref={heroRef} className="cg-hero">
          <div
            className="cg-hero__photo"
            style={{ backgroundImage: 'url(/images/masu-lug-crop.jpg)' }}
          />
          <div className="cg-hero__overlay" />
          <Link href={servicesHref} className="cg-back">
            ← {t('backLabel')}
          </Link>
          <div className={`cg-hero__content reveal${heroInView ? ' is-in-view' : ''}`}>
            <p className="cg-hero__label">{t(key('label'))}</p>
            <h1 className="cg-hero__name">{t(key('name'))}</h1>
            <p className="cg-hero__sub">{t(key('nameJa'))}</p>
          </div>
          <div className="cg-scroll-hint" aria-hidden="true">↓</div>
        </div>

        {/* ── Diptych: product photo left, craft attrs + all body text right ── */}
        <section ref={editRef} className="cg-diptych">
          <div
            className="cg-diptych__photo"
            style={{ backgroundImage: 'url(/images/masu-top.jpg)' }}
          />
          <div className={`cg-diptych__side reveal${editInView ? ' is-in-view' : ''}`}>
            <div className="cg-attrs">
              {[
                { en: 'Hinoki',     ja: '天然檜・無垢材' },
                { en: 'Artisan',    ja: '国内職人・手仕上げ' },
                { en: 'Full Order', ja: '完全オーダーメイド' },
              ].map(({ en, ja }, i) => (
                <div key={i} className="cg-attr">
                  <span className="cg-attr__en">{en}</span>
                  <span className="cg-attr__ja">{ja}</span>
                </div>
              ))}
            </div>
            <div className="cg-diptych__body">
              {bodyParagraphs.map((para, i) => (
                <p key={i} className="cg-diptych__para">{para}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ── Includes ── */}
        <section ref={inclRef} className="cg-incl">
          <div className="cg-incl__inner">
            <div className={`cg-incl__header reveal${inclInView ? ' is-in-view' : ''}`}>
              <p className="cg-incl__eyebrow">{t(key('includes.label'))}</p>
            </div>
            <ul className="cg-incl__list">
              {includesItems.map((item, i) => (
                <li
                  key={i}
                  className={`cg-incl__item reveal reveal-delay-${Math.min(i + 1, 5)}${inclInView ? ' is-in-view' : ''}`}
                >
                  <span className="cg-incl__text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="cg-process">
          <div className="cg-process__inner">
            <p className="cg-process__label">{t('processLabel')}</p>
            <div className="cg-process__steps">
              {(['step1','step2','step3'] as const).map((step) => (
                <div key={step} className="cg-process__step">
                  <div className="cg-process__dot" aria-hidden="true" />
                  <p className="cg-process__step-label">{t(`process.${step}.label` as Parameters<typeof t>[0])}</p>
                  <p className="cg-process__step-body">{t(`process.${step}.body` as Parameters<typeof t>[0])}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section ref={ctaRef} className="cg-cta">
          <div className={`cg-cta__inner reveal${ctaInView ? ' is-in-view' : ''}`}>
            <p className="cg-cta__question">{t(key('ctaQuestion'))}</p>
            <p className="cg-cta__note">{t('ctaBodyNote')}</p>
            <Link href={contactHref} className="cg-cta__link">
              {t('ctaLinkLabel')}
            </Link>
          </div>
        </section>

        <style>{`
          /* ── Reveal system ─────────────────────────────────────────── */
          .reveal {
            opacity: 0;
            transform: translateY(28px);
            transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1),
                        transform 0.85s cubic-bezier(0.22,1,0.36,1);
          }
          .reveal.is-in-view { opacity: 1; transform: translateY(0); }
          .reveal-delay-1 { transition-delay: 0.12s; }
          .reveal-delay-2 { transition-delay: 0.22s; }
          .reveal-delay-3 { transition-delay: 0.32s; }
          .reveal-delay-4 { transition-delay: 0.42s; }
          .reveal-delay-5 { transition-delay: 0.52s; }

          /* ── Base ──────────────────────────────────────────────────── */
          .cg-main {
            background: var(--color-white);
            padding-top: 64px;
          }

          /* ── Back link ─────────────────────────────────────────────── */
          .cg-back {
            position: absolute;
            top: 2.25rem;
            left: clamp(2rem, 6vw, 5rem);
            z-index: 3;
            font-family: var(--font-jost), Jost, sans-serif;
            font-weight: 400;
            font-size: 0.8125rem;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: rgba(240,240,238,0.35);
            text-decoration: none;
            transition: color 0.3s ease;
          }
          .cg-back:hover { color: var(--color-accent); }

          /* ── Hero ──────────────────────────────────────────────────── */
          .cg-hero {
            position: relative;
            height: 100vh;
            min-height: 600px;
            max-height: 1080px;
            overflow: hidden;
            display: flex;
            align-items: flex-end;
          }
          .cg-hero__photo {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center 45%;
            transition: transform 20s ease;
          }
          .cg-hero:hover .cg-hero__photo { transform: scale(1.04); }
          .cg-hero__overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to top,
              rgba(6,5,4,0.96) 0%,
              rgba(6,5,4,0.52) 42%,
              rgba(6,5,4,0.08) 100%
            );
          }
          .cg-hero__content {
            position: relative;
            z-index: 2;
            padding: 0 clamp(2rem, 6vw, 5.5rem) clamp(4.5rem, 7vw, 6.5rem);
            width: 100%;
          }
          .cg-hero__label {
            font-family: var(--font-jost), Jost, sans-serif;
            font-weight: 400;
            font-size: 0.6875rem;
            letter-spacing: 0.52em;
            text-transform: uppercase;
            color: var(--color-accent);
            margin: 0 0 1.5rem;
          }
          .cg-hero__name {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(4.5rem, 11vw, 9.5rem);
            line-height: 0.87;
            color: #F0F0EE;
            letter-spacing: -0.02em;
            margin: 0 0 1.75rem;
          }
          .cg-hero__sub {
            font-family: var(--font-noto-serif-jp), sans-serif;
            font-weight: 300;
            font-size: 0.8125rem;
            letter-spacing: 0.26em;
            color: rgba(240,240,238,0.36);
            margin: 0;
          }
          .cg-scroll-hint {
            position: absolute;
            bottom: 2.5rem;
            right: clamp(2rem, 6vw, 5.5rem);
            z-index: 2;
            font-size: 0.875rem;
            color: var(--color-accent);
            opacity: 0.28;
            animation: cg-bob 3.5s ease-in-out infinite;
          }
          @keyframes cg-bob {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(9px); }
          }

          /* ── Diptych ───────────────────────────────────────────────── */
          .cg-diptych {
            display: grid;
            grid-template-columns: 50% 50%;
            min-height: 0;
          }
          .cg-diptych__photo {
            background-size: cover;
            background-position: center 30%;
            min-height: 480px;
          }
          .cg-diptych__side {
            background: var(--color-white);
            padding: clamp(3rem, 5vw, 5rem) clamp(2.5rem, 5vw, 5rem);
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: clamp(2rem, 3.5vw, 3rem);
            border-left: 1px solid var(--color-line);
          }
          .cg-attrs {
            display: flex;
            flex-direction: column;
            border-top: 1px solid var(--color-line);
          }
          .cg-attr {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            padding: clamp(0.75rem, 1.5vw, 1.125rem) 0;
            border-bottom: 1px solid var(--color-line);
          }
          .cg-attr__en {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.375rem, 2.2vw, 1.875rem);
            line-height: 1;
            letter-spacing: -0.01em;
            color: var(--color-ink);
          }
          .cg-attr__ja {
            font-family: var(--font-noto-serif-jp), sans-serif;
            font-weight: 300;
            font-size: 0.6875rem;
            letter-spacing: 0.2em;
            color: var(--color-ink-mute);
          }
          .cg-diptych__body {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            padding-top: 0.5rem;
            border-top: 1px solid var(--color-line);
          }
          .cg-diptych__para {
            font-family: var(--font-noto-serif-jp), sans-serif;
            font-weight: 400;
            font-size: clamp(0.8125rem, 1vw, 0.875rem);
            line-height: 2.2;
            letter-spacing: 0.04em;
            color: var(--color-ink-light);
            margin: 0;
          }

          /* ── Includes ──────────────────────────────────────────────── */
          .cg-incl {
            background: var(--color-white);
            border-top: 1px solid var(--color-line);
            padding: clamp(5rem, 9vw, 8rem) 0;
          }
          .cg-incl__inner {
            max-width: 860px;
            margin: 0 auto;
            padding: 0 clamp(2rem, 6vw, 5rem);
          }
          .cg-incl__header {
            margin-bottom: clamp(2.5rem, 5vw, 4rem);
          }
          .cg-incl__eyebrow {
            font-family: var(--font-jost), Jost, sans-serif;
            font-weight: 400;
            font-size: 0.6875rem;
            letter-spacing: 0.46em;
            text-transform: uppercase;
            color: var(--color-accent);
            opacity: 0.72;
            margin: 0;
          }
          .cg-incl__list {
            list-style: none;
            padding: 0;
            margin: 0;
            border-top: 1px solid var(--color-line);
          }
          .cg-incl__item {
            display: flex;
            align-items: baseline;
            padding: 1.5rem 0;
            border-bottom: 1px solid var(--color-line);
          }
          .cg-incl__text {
            font-family: var(--font-noto-serif-jp), sans-serif;
            font-weight: 400;
            font-size: 1rem;
            line-height: 1.9;
            letter-spacing: 0.03em;
            color: var(--color-ink);
          }

          /* ── Process ──────────────────────────────────────────────── */
          .cg-process {
            background: var(--color-white);
            border-top: 1px solid var(--color-line);
            padding: clamp(5rem, 9vw, 7rem) clamp(2rem, 6vw, 5.5rem);
          }
          .cg-process__inner {
            max-width: 1000px;
            margin: 0 auto;
          }
          .cg-process__label {
            font-family: var(--font-jost), Jost, sans-serif;
            font-weight: 400;
            font-size: 0.6875rem;
            letter-spacing: 0.46em;
            text-transform: uppercase;
            color: var(--color-accent);
            opacity: 0.72;
            margin: 0 0 3rem;
          }
          .cg-process__steps {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
          }
          .cg-process__step {
            padding: 0 clamp(1.5rem, 3vw, 3rem) 0 0;
            position: relative;
          }
          .cg-process__step:not(:first-child) {
            padding-left: clamp(1.5rem, 3vw, 3rem);
            border-left: 1px solid var(--color-line);
          }
          .cg-process__dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--color-accent);
            opacity: 0.6;
            margin-bottom: 1.25rem;
          }
          .cg-process__step-label {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.25rem, 2vw, 1.625rem);
            color: var(--color-ink);
            margin: 0 0 0.75rem;
            line-height: 1.1;
          }
          .cg-process__step-body {
            font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
            font-weight: 400;
            font-size: 0.875rem;
            line-height: 2;
            letter-spacing: 0.04em;
            color: var(--color-ink-mute);
            margin: 0;
          }
          @media (max-width: 768px) {
            .cg-process__steps { grid-template-columns: 1fr; gap: 2.5rem; }
            .cg-process__step:not(:first-child) { padding-left: 0; border-left: none; border-top: 1px solid var(--color-line); padding-top: 2.5rem; }
          }

          /* ── CTA ───────────────────────────────────────────────────── */
          .cg-cta {
            background: var(--color-white);
            border-top: 1px solid var(--color-line);
            padding: clamp(6rem, 11vw, 9rem) clamp(2rem, 6vw, 5.5rem);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .cg-cta__inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            text-align: center;
            max-width: 680px;
          }
          .cg-cta__question {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.75rem, 3.5vw, 3rem);
            line-height: 1.3;
            color: var(--color-ink);
            margin: 0;
            letter-spacing: 0.01em;
          }
          .cg-cta__note {
            font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
            font-weight: 400;
            font-size: clamp(0.875rem, 1.2vw, 1rem);
            letter-spacing: 0.1em;
            color: var(--color-ink-mute);
            margin: 0;
            line-height: 2;
          }
          .cg-cta__link {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.375rem, 2.2vw, 1.75rem);
            color: var(--color-ink);
            text-decoration: none;
            letter-spacing: 0.03em;
            position: relative;
            padding-bottom: 0.25rem;
            transition: color 0.35s ease;
          }
          .cg-cta__link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: var(--color-line-dark);
            transition: background 0.35s ease;
          }
          .cg-cta__link:hover { color: var(--color-accent); }
          .cg-cta__link:hover::after { background: var(--color-accent); }

          /* ── Responsive ────────────────────────────────────────────── */
          @media (max-width: 900px) {
            .cg-diptych {
              grid-template-columns: 1fr;
              min-height: auto;
              max-height: none;
            }
            .cg-diptych__photo {
              height: 65vw;
              min-height: 300px;
              max-height: 500px;
            }
          }
          @media (max-width: 640px) {
            .cg-hero { height: 80vh; }
            .cg-hero__name { font-size: clamp(3.25rem, 14vw, 5rem); }
            .cg-forwhom__item {
              grid-template-columns: 2.5rem 1fr;
            }
          }
        `}</style>
      </main>
    );
  }

  /* ── BESPOKE: ultra-minimal typographic layout ───────────────────── */
  if (programKey === 'bespoke') {
    return (
      <main className="be-main">

        {/* ── Hero ── */}
        <div ref={heroRef} className="be-hero">
          <div
            className="be-hero__photo"
            style={{ backgroundImage: `url(${hero.src})`, backgroundPosition: hero.pos }}
          />
          <div className="be-hero__overlay" />
          <Link href={servicesHref} className="be-back">← {t('backLabel')}</Link>
          <div className={`be-hero__content reveal${heroInView ? ' is-in-view' : ''}`}>
            <p className="be-hero__label">{t(key('label'))}</p>
            <h1 className="be-hero__name">{t(key('name'))}</h1>
            <p className="be-hero__sub">{t(key('nameJa'))}</p>
            <p className="be-hero__exclusivity">{t(key('exclusivity'))}</p>
          </div>
        </div>

        {/* ── Statement: large typographic anchor ── */}
        <section ref={editRef} className="be-statement">
          <div className={`be-statement__inner reveal${editInView ? ' is-in-view' : ''}`}>
            <p className="be-statement__text">{t(key('lead'))}</p>
          </div>
        </section>

        {/* ── Body: narrow centered column ── */}
        <section className="be-body-section">
          <div className="be-body-inner">
            {bodyParagraphs.map((para, i) => (
              <p key={i} className="be-body__para">{para}</p>
            ))}
          </div>
        </section>

        {/* ── Process ── */}
        <section className="be-process">
          <div className="be-process__inner">
            <p className="be-process__label">{t('processLabel')}</p>
            <div className="be-process__steps">
              {(['step1','step2','step3'] as const).map((step) => (
                <div key={step} className="be-process__step">
                  <div className="be-process__dot" aria-hidden="true" />
                  <p className="be-process__step-label">{t(`process.${step}.label` as Parameters<typeof t>[0])}</p>
                  <p className="be-process__step-body">{t(`process.${step}.body` as Parameters<typeof t>[0])}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA: private, left-aligned ── */}
        <section ref={ctaRef} className="be-cta">
          <div className={`be-cta__inner reveal${ctaInView ? ' is-in-view' : ''}`}>
            <p className="be-cta__question">{t(key('ctaQuestion'))}</p>
            <p className="be-cta__note">{t('ctaBodyNote')}</p>
            <Link href={contactHref} className="be-cta__link">
              {t('ctaLinkLabel')}
            </Link>
          </div>
        </section>

        <style>{`
          .reveal {
            opacity: 0;
            transform: translateY(22px);
            transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1),
                        transform 0.9s cubic-bezier(0.22,1,0.36,1);
          }
          .reveal.is-in-view { opacity: 1; transform: translateY(0); }
          .reveal-delay-1 { transition-delay: 0.12s; }

          .be-main { background: var(--color-white); padding-top: 64px; }

          .be-back {
            position: absolute;
            top: 2.25rem;
            left: clamp(2rem, 6vw, 5rem);
            z-index: 3;
            font-family: var(--font-jost), Jost, sans-serif;
            font-size: 0.8125rem;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: rgba(240,240,238,0.32);
            text-decoration: none;
            transition: color 0.3s ease;
          }
          .be-back:hover { color: var(--color-accent); }

          .be-hero {
            position: relative;
            height: 100vh;
            min-height: 600px;
            max-height: 1080px;
            overflow: hidden;
            display: flex;
            align-items: flex-end;
          }
          .be-hero__photo {
            position: absolute;
            inset: 0;
            background-size: cover;
            transition: transform 20s ease;
          }
          .be-hero:hover .be-hero__photo { transform: scale(1.03); }
          .be-hero__overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to top,
              rgba(4,3,2,0.97) 0%,
              rgba(4,3,2,0.55) 45%,
              rgba(4,3,2,0.12) 100%
            );
          }
          .be-hero__content {
            position: relative;
            z-index: 2;
            padding: 0 clamp(2rem, 8vw, 10rem) clamp(5rem, 8vw, 7.5rem);
            width: 100%;
          }
          .be-hero__label {
            font-family: var(--font-jost), Jost, sans-serif;
            font-size: 0.625rem;
            letter-spacing: 0.6em;
            text-transform: uppercase;
            color: rgba(240,240,238,0.35);
            margin: 0 0 2rem;
          }
          .be-hero__name {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(4rem, 10vw, 9rem);
            line-height: 0.87;
            color: #F0F0EE;
            letter-spacing: -0.02em;
            margin: 0 0 2.5rem;
          }
          .be-hero__sub {
            font-family: var(--font-noto-serif-jp), sans-serif;
            font-size: 0.75rem;
            letter-spacing: 0.3em;
            color: rgba(240,240,238,0.28);
            margin: 0 0 1rem;
          }
          .be-hero__exclusivity {
            font-family: var(--font-jost), Jost, sans-serif;
            font-weight: 400;
            font-size: 0.75rem;
            letter-spacing: 0.22em;
            color: var(--color-accent);
            opacity: 0.8;
            margin: 0;
            text-transform: uppercase;
          }

          .be-statement {
            padding: clamp(7rem, 13vw, 12rem) clamp(2rem, 8vw, 10rem);
            border-bottom: 1px solid var(--color-line);
          }
          .be-statement__inner { max-width: 960px; }
          .be-statement__text {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.75rem, 3.5vw, 3.25rem);
            line-height: 1.4;
            color: var(--color-ink);
            letter-spacing: 0.01em;
            margin: 0;
          }

          .be-body-section {
            border-bottom: 1px solid var(--color-line);
            padding: clamp(5rem, 9vw, 8rem) clamp(2rem, 8vw, 10rem);
          }
          .be-body-inner {
            max-width: 600px;
          }
          .be-body__para {
            font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
            font-weight: 400;
            font-size: clamp(0.9375rem, 1.2vw, 1.0625rem);
            line-height: 2.4;
            letter-spacing: 0.05em;
            color: var(--color-ink-light);
            margin: 0 0 2.75rem;
          }
          .be-body__para:last-child { margin-bottom: 0; }

          .be-process {
            border-top: 1px solid var(--color-line);
            padding: clamp(5rem, 9vw, 7rem) clamp(2rem, 8vw, 10rem);
          }
          .be-process__inner { max-width: 900px; }
          .be-process__label {
            font-family: var(--font-jost), Jost, sans-serif;
            font-weight: 400;
            font-size: 0.6875rem;
            letter-spacing: 0.46em;
            text-transform: uppercase;
            color: var(--color-ink-mute);
            opacity: 0.55;
            margin: 0 0 3rem;
          }
          .be-process__steps {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
          }
          .be-process__step {
            padding: 0 clamp(1.5rem, 3vw, 3rem) 0 0;
          }
          .be-process__step:not(:first-child) {
            padding-left: clamp(1.5rem, 3vw, 3rem);
            border-left: 1px solid var(--color-line);
          }
          .be-process__dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--color-ink-mute);
            opacity: 0.4;
            margin-bottom: 1.25rem;
          }
          .be-process__step-label {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.25rem, 2vw, 1.625rem);
            color: var(--color-ink);
            margin: 0 0 0.75rem;
            line-height: 1.1;
          }
          .be-process__step-body {
            font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
            font-weight: 400;
            font-size: 0.875rem;
            line-height: 2;
            letter-spacing: 0.04em;
            color: var(--color-ink-mute);
            margin: 0;
          }
          @media (max-width: 768px) {
            .be-process__steps { grid-template-columns: 1fr; gap: 2.5rem; }
            .be-process__step:not(:first-child) { padding-left: 0; border-left: none; border-top: 1px solid var(--color-line); padding-top: 2.5rem; }
          }

          .be-cta {
            padding: clamp(7rem, 12vw, 11rem) clamp(2rem, 8vw, 10rem);
            border-top: 1px solid var(--color-line);
          }
          .be-cta__inner {
            max-width: 600px;
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }
          .be-cta__question {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.75rem, 3.5vw, 3rem);
            line-height: 1.3;
            color: var(--color-ink);
            margin: 0;
            letter-spacing: 0.01em;
          }
          .be-cta__note {
            font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
            font-weight: 400;
            font-size: 0.9375rem;
            line-height: 2;
            letter-spacing: 0.05em;
            color: var(--color-ink-mute);
            margin: 0;
          }
          .be-cta__link {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.25rem, 2vw, 1.625rem);
            color: var(--color-ink);
            text-decoration: none;
            letter-spacing: 0.02em;
            position: relative;
            padding-bottom: 0.25rem;
            transition: color 0.35s ease;
          }
          .be-cta__link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: var(--color-line-dark);
            transition: background 0.35s ease;
          }
          .be-cta__link:hover { color: var(--color-accent); }
          .be-cta__link:hover::after { background: var(--color-accent); }

          @media (max-width: 640px) {
            .be-hero { height: 80vh; }
            .be-hero__name { font-size: clamp(3rem, 14vw, 5rem); }
          }
        `}</style>
      </main>
    );
  }

  /* ── SAKE × MASU: ceremonial, atmospheric layout ────────────────── */
  if (programKey === 'sakeMasu') {
    return (
      <main className="sm-main">

        {/* ── Hero ── */}
        <div ref={heroRef} className="sm-hero">
          <div
            className="sm-hero__photo"
            style={{ backgroundImage: `url(${hero.src})`, backgroundPosition: hero.pos }}
          />
          <div className="sm-hero__overlay" />
          <Link href={servicesHref} className="sm-back">← {t('backLabel')}</Link>
          <div className={`sm-hero__content reveal${heroInView ? ' is-in-view' : ''}`}>
            <p className="sm-hero__label">{t(key('label'))}</p>
            <h1 className="sm-hero__name">{t(key('name'))}</h1>
            <p className="sm-hero__sub">{t(key('nameJa'))}</p>
          </div>
          <div className="sm-hero__scroll" aria-hidden="true">↓</div>
        </div>

        {/* ── Ceremony: centered lead + body ── */}
        <section ref={editRef} className="sm-ceremony">
          <div className={`sm-ceremony__inner reveal${editInView ? ' is-in-view' : ''}`}>
            <p className="sm-ceremony__eyebrow">{t(key('label'))}</p>
            <p className="sm-ceremony__lead">{t(key('lead'))}</p>
            <div className="sm-ceremony__rule" aria-hidden="true" />
            {bodyParagraphs.map((para, i) => (
              <p key={i} className="sm-ceremony__body">{para}</p>
            ))}
          </div>
        </section>

        {/* ── Scope ── */}
        <section ref={inclRef} className="sm-scope">
          <div className={`sm-scope__inner reveal${inclInView ? ' is-in-view' : ''}`}>
            <p className="sm-scope__eyebrow">{t(key('includes.label'))}</p>
            <ul className="sm-scope__list">
              {includesItems.map((item, i) => (
                <li
                  key={i}
                  className={`sm-scope__item reveal reveal-delay-${Math.min(i + 1, 5)}${inclInView ? ' is-in-view' : ''}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="sm-process">
          <div className="sm-process__inner">
            <p className="sm-process__label">{t('processLabel')}</p>
            <div className="sm-process__steps">
              {(['step1','step2','step3'] as const).map((step) => (
                <div key={step} className="sm-process__step">
                  <div className="sm-process__dot" aria-hidden="true" />
                  <p className="sm-process__step-label">{t(`process.${step}.label` as Parameters<typeof t>[0])}</p>
                  <p className="sm-process__step-body">{t(`process.${step}.body` as Parameters<typeof t>[0])}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section ref={ctaRef} className="sm-cta">
          <div className={`sm-cta__inner reveal${ctaInView ? ' is-in-view' : ''}`}>
            <p className="sm-cta__question">{t(key('ctaQuestion'))}</p>
            <p className="sm-cta__note">{t('ctaBodyNote')}</p>
            <Link href={contactHref} className="sm-cta__link">{t('ctaLinkLabel')}</Link>
          </div>
        </section>

        <style>{`
          .reveal {
            opacity: 0;
            transform: translateY(22px);
            transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1),
                        transform 0.9s cubic-bezier(0.22,1,0.36,1);
          }
          .reveal.is-in-view { opacity: 1; transform: translateY(0); }
          .reveal-delay-1 { transition-delay: 0.10s; }
          .reveal-delay-2 { transition-delay: 0.20s; }
          .reveal-delay-3 { transition-delay: 0.30s; }
          .reveal-delay-4 { transition-delay: 0.40s; }
          .reveal-delay-5 { transition-delay: 0.50s; }

          .sm-main { background: var(--color-white); padding-top: 64px; }

          .sm-back {
            position: absolute;
            top: 2.25rem;
            left: clamp(2rem, 6vw, 5rem);
            z-index: 3;
            font-family: var(--font-jost), Jost, sans-serif;
            font-size: 0.8125rem;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: rgba(240,240,238,0.32);
            text-decoration: none;
            transition: color 0.3s ease;
          }
          .sm-back:hover { color: var(--color-accent); }

          .sm-hero {
            position: relative;
            height: 100vh;
            min-height: 580px;
            max-height: 1080px;
            overflow: hidden;
            display: flex;
            align-items: flex-end;
          }
          .sm-hero__photo {
            position: absolute;
            inset: 0;
            background-size: cover;
            transition: transform 18s ease;
          }
          .sm-hero:hover .sm-hero__photo { transform: scale(1.03); }
          .sm-hero__overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to top,
              rgba(6,5,4,0.95) 0%,
              rgba(6,5,4,0.45) 50%,
              rgba(6,5,4,0.08) 100%
            );
          }
          .sm-hero__content {
            position: relative;
            z-index: 2;
            padding: 0 clamp(2rem, 6vw, 5rem) clamp(4.5rem, 7vw, 6.5rem);
            width: 100%;
          }
          .sm-hero__label {
            font-family: var(--font-jost), Jost, sans-serif;
            font-size: 0.6875rem;
            letter-spacing: 0.52em;
            text-transform: uppercase;
            color: var(--color-accent);
            margin: 0 0 1.5rem;
            opacity: 0.9;
          }
          .sm-hero__name {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(3.5rem, 9vw, 8rem);
            line-height: 0.87;
            color: #F0F0EE;
            letter-spacing: -0.015em;
            margin: 0 0 2rem;
          }
          .sm-hero__sub {
            font-family: var(--font-noto-serif-jp), sans-serif;
            font-weight: 300;
            font-size: 0.8125rem;
            letter-spacing: 0.28em;
            color: rgba(240,240,238,0.38);
            margin: 0;
          }
          .sm-hero__scroll {
            position: absolute;
            bottom: 2.5rem;
            right: clamp(2rem, 6vw, 5rem);
            z-index: 2;
            font-size: 0.875rem;
            color: var(--color-accent);
            opacity: 0.3;
            animation: sm-bob 3.5s ease-in-out infinite;
          }
          @keyframes sm-bob {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(8px); }
          }

          .sm-ceremony {
            padding: clamp(6rem, 11vw, 10rem) clamp(2rem, 6vw, 5rem);
            border-bottom: 1px solid var(--color-line);
            display: flex;
            justify-content: center;
          }
          .sm-ceremony__inner {
            max-width: 680px;
            width: 100%;
            text-align: center;
          }
          .sm-ceremony__eyebrow {
            font-family: var(--font-jost), Jost, sans-serif;
            font-size: 0.6875rem;
            letter-spacing: 0.48em;
            text-transform: uppercase;
            color: var(--color-accent);
            opacity: 0.8;
            margin: 0 0 2.5rem;
          }
          .sm-ceremony__lead {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.5rem, 3vw, 2.5rem);
            line-height: 1.5;
            letter-spacing: 0.01em;
            color: var(--color-ink);
            margin: 0 0 3rem;
          }
          .sm-ceremony__rule {
            width: 1px;
            height: 3.5rem;
            background: var(--color-line-dark);
            opacity: 0.4;
            margin: 0 auto 3rem;
          }
          .sm-ceremony__body {
            font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
            font-weight: 400;
            font-size: clamp(0.875rem, 1.15vw, 1rem);
            line-height: 2.3;
            letter-spacing: 0.045em;
            color: var(--color-ink-light);
            margin: 0 0 2.25rem;
            text-align: left;
          }
          .sm-ceremony__body:last-child { margin-bottom: 0; }

          .sm-scope {
            background: var(--color-white);
            border-bottom: 1px solid var(--color-line);
            padding: clamp(4.5rem, 8vw, 7rem) 0;
          }
          .sm-scope__inner {
            max-width: 680px;
            margin: 0 auto;
            padding: 0 clamp(2rem, 6vw, 5rem);
          }
          .sm-scope__eyebrow {
            font-family: var(--font-jost), Jost, sans-serif;
            font-size: 0.6875rem;
            letter-spacing: 0.46em;
            text-transform: uppercase;
            color: var(--color-ink-mute);
            opacity: 0.55;
            margin: 0 0 2.5rem;
            text-align: center;
          }
          .sm-scope__list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .sm-scope__item {
            font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
            font-size: clamp(0.875rem, 1.1vw, 1rem);
            line-height: 1.75;
            letter-spacing: 0.04em;
            color: var(--color-ink-light);
            padding: 1.1rem 0;
            border-bottom: 1px solid var(--color-line);
            text-align: center;
          }
          .sm-scope__item:first-child { border-top: 1px solid var(--color-line); }

          .sm-process {
            border-top: 1px solid var(--color-line);
            padding: clamp(5rem, 9vw, 7rem) clamp(2rem, 6vw, 5rem);
            display: flex;
            justify-content: center;
          }
          .sm-process__inner {
            max-width: 720px;
            width: 100%;
          }
          .sm-process__label {
            font-family: var(--font-jost), Jost, sans-serif;
            font-weight: 400;
            font-size: 0.6875rem;
            letter-spacing: 0.46em;
            text-transform: uppercase;
            color: var(--color-accent);
            opacity: 0.72;
            margin: 0 0 3rem;
            text-align: center;
          }
          .sm-process__steps {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
          }
          .sm-process__step {
            padding: 0 clamp(1.25rem, 2.5vw, 2rem) 0 0;
            text-align: center;
          }
          .sm-process__step:not(:first-child) {
            padding-left: clamp(1.25rem, 2.5vw, 2rem);
            border-left: 1px solid var(--color-line);
          }
          .sm-process__dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--color-accent);
            opacity: 0.5;
            margin: 0 auto 1.25rem;
          }
          .sm-process__step-label {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.125rem, 1.8vw, 1.5rem);
            color: var(--color-ink);
            margin: 0 0 0.75rem;
            line-height: 1.1;
          }
          .sm-process__step-body {
            font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
            font-weight: 400;
            font-size: 0.8125rem;
            line-height: 2;
            letter-spacing: 0.04em;
            color: var(--color-ink-mute);
            margin: 0;
          }
          @media (max-width: 640px) {
            .sm-process__steps { grid-template-columns: 1fr; gap: 2rem; }
            .sm-process__step:not(:first-child) { padding-left: 0; border-left: none; border-top: 1px solid var(--color-line); padding-top: 2rem; }
          }

          .sm-cta {
            padding: clamp(6rem, 11vw, 9rem) clamp(2rem, 6vw, 5rem);
            display: flex;
            justify-content: center;
            border-top: 1px solid var(--color-line);
          }
          .sm-cta__inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            text-align: center;
            max-width: 620px;
          }
          .sm-cta__question {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.75rem, 3.5vw, 2.75rem);
            line-height: 1.35;
            color: var(--color-ink);
            margin: 0;
            letter-spacing: 0.01em;
          }
          .sm-cta__note {
            font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
            font-size: clamp(0.875rem, 1.2vw, 1rem);
            letter-spacing: 0.08em;
            color: var(--color-ink-mute);
            margin: 0;
            line-height: 1.9;
          }
          .sm-cta__link {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.375rem, 2.2vw, 1.75rem);
            color: var(--color-ink);
            text-decoration: none;
            letter-spacing: 0.03em;
            position: relative;
            padding-bottom: 0.25rem;
            transition: color 0.35s ease;
          }
          .sm-cta__link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: var(--color-ink);
            transition: background 0.35s ease;
          }
          .sm-cta__link:hover { color: var(--color-accent); }
          .sm-cta__link:hover::after { background: var(--color-accent); }

          @media (max-width: 640px) {
            .sm-hero { height: 80vh; }
            .sm-hero__name { font-size: clamp(2.75rem, 13vw, 4.5rem); }
          }
        `}</style>
      </main>
    );
  }

  /* ── CULTURAL SPACE: architectural, full-bleed, editorial ───────── */
  if (programKey === 'culturalSpace') {
    return (
      <main className="cs-main">

        {/* ── Hero ── */}
        <div ref={heroRef} className="cs-hero">
          <div
            className="cs-hero__photo"
            style={{ backgroundImage: `url(${hero.src})`, backgroundPosition: hero.pos }}
          />
          <div className="cs-hero__overlay" />
          <Link href={servicesHref} className="cs-back">← {t('backLabel')}</Link>
          <div className={`cs-hero__content reveal${heroInView ? ' is-in-view' : ''}`}>
            <p className="cs-hero__label">{t(key('label'))}</p>
            <h1 className="cs-hero__name">{t(key('name'))}</h1>
            <p className="cs-hero__sub">{t(key('nameJa'))}</p>
          </div>
          <div className="cs-hero__scroll" aria-hidden="true">↓</div>
        </div>

        {/* ── Lead statement: full-width centered ── */}
        <section ref={editRef} className="cs-lead">
          <div className={`cs-lead__inner reveal${editInView ? ' is-in-view' : ''}`}>
            <p className="cs-lead__text">{t(key('lead'))}</p>
          </div>
        </section>

        {/* ── Three body sections with alternating full-bleed ── */}
        <section className="cs-body-section">
          {bodyParagraphs.map((para, i) => (
            <div key={i} className={`cs-para-block${i % 2 !== 0 ? ' cs-para-block--alt' : ''}`}>
              <div className="cs-para-block__accent" aria-hidden="true" />
              <p className="cs-para-block__text">{para}</p>
            </div>
          ))}
        </section>

        {/* ── Space types grid ── */}
        <section ref={spacesRef} className="cs-spaces">
          <div className={`cs-spaces__header reveal${spacesInView ? ' is-in-view' : ''}`}>
            <p className="cs-spaces__eyebrow">Space Contexts</p>
            <h2 className="cs-spaces__title">対応可能な空間</h2>
          </div>
          <div className="cs-spaces__grid">
            {SPACE_TYPES.map(({ en, ja }, i) => (
              <div
                key={i}
                className={`cs-space-item reveal reveal-delay-${Math.min(i + 1, 5)}${spacesInView ? ' is-in-view' : ''}`}
              >
                <span className="cs-space-en">{en}</span>
                <span className="cs-space-ja">{ja}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Scope ── */}
        <section ref={inclRef} className="cs-scope">
          <div className={`cs-scope__inner reveal${inclInView ? ' is-in-view' : ''}`}>
            <p className="cs-scope__eyebrow">{t(key('includes.label'))}</p>
            <ul className="cs-scope__list">
              {includesItems.map((item, i) => (
                <li
                  key={i}
                  className={`cs-scope__item reveal reveal-delay-${Math.min(i + 1, 5)}${inclInView ? ' is-in-view' : ''}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="cs-process">
          <div className="cs-process__inner">
            <p className="cs-process__label">{t('processLabel')}</p>
            <div className="cs-process__steps">
              {(['step1','step2','step3'] as const).map((step) => (
                <div key={step} className="cs-process__step">
                  <div className="cs-process__dot" aria-hidden="true" />
                  <p className="cs-process__step-label">{t(`process.${step}.label` as Parameters<typeof t>[0])}</p>
                  <p className="cs-process__step-body">{t(`process.${step}.body` as Parameters<typeof t>[0])}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section ref={ctaRef} className="cs-cta">
          <div className="cs-cta__photo" style={{ backgroundImage: `url(${accent.src})` }} />
          <div className="cs-cta__overlay" />
          <div className={`cs-cta__inner reveal${ctaInView ? ' is-in-view' : ''}`}>
            <p className="cs-cta__question">{t(key('ctaQuestion'))}</p>
            <p className="cs-cta__note">{t('ctaBodyNote')}</p>
            <Link href={contactHref} className="cs-cta__link">{t('ctaLinkLabel')}</Link>
          </div>
        </section>

        <style>{`
          .reveal {
            opacity: 0;
            transform: translateY(22px);
            transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1),
                        transform 0.9s cubic-bezier(0.22,1,0.36,1);
          }
          .reveal.is-in-view { opacity: 1; transform: translateY(0); }
          .reveal-delay-1 { transition-delay: 0.10s; }
          .reveal-delay-2 { transition-delay: 0.20s; }
          .reveal-delay-3 { transition-delay: 0.30s; }
          .reveal-delay-4 { transition-delay: 0.40s; }
          .reveal-delay-5 { transition-delay: 0.50s; }

          .cs-main { background: var(--color-ink); padding-top: 64px; }

          .cs-back {
            position: absolute;
            top: 2.25rem;
            left: clamp(2rem, 6vw, 5rem);
            z-index: 3;
            font-family: var(--font-jost), Jost, sans-serif;
            font-size: 0.8125rem;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: rgba(240,240,238,0.32);
            text-decoration: none;
            transition: color 0.3s ease;
          }
          .cs-back:hover { color: var(--color-accent); }

          .cs-hero {
            position: relative;
            height: 100vh;
            min-height: 600px;
            overflow: hidden;
            display: flex;
            align-items: flex-end;
          }
          .cs-hero__photo {
            position: absolute;
            inset: 0;
            background-size: cover;
            transition: transform 22s ease;
          }
          .cs-hero:hover .cs-hero__photo { transform: scale(1.04); }
          .cs-hero__overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to top,
              rgba(6,5,4,0.98) 0%,
              rgba(6,5,4,0.60) 45%,
              rgba(6,5,4,0.15) 100%
            );
          }
          .cs-hero__content {
            position: relative;
            z-index: 2;
            padding: 0 clamp(2rem, 6vw, 5rem) clamp(4rem, 7vw, 6rem);
            width: 100%;
          }
          .cs-hero__label {
            font-family: var(--font-jost), Jost, sans-serif;
            font-size: 0.625rem;
            letter-spacing: 0.6em;
            text-transform: uppercase;
            color: rgba(240,240,238,0.30);
            margin: 0 0 2rem;
          }
          .cs-hero__name {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(4rem, 10vw, 9rem);
            line-height: 0.87;
            color: #F0F0EE;
            letter-spacing: -0.02em;
            margin: 0 0 2rem;
          }
          .cs-hero__sub {
            font-family: var(--font-noto-serif-jp), sans-serif;
            font-weight: 300;
            font-size: 0.8125rem;
            letter-spacing: 0.3em;
            color: rgba(240,240,238,0.22);
            margin: 0;
          }
          .cs-hero__scroll {
            position: absolute;
            bottom: 2.5rem;
            right: clamp(2rem, 6vw, 5rem);
            z-index: 2;
            font-size: 0.875rem;
            color: rgba(240,240,238,0.25);
            animation: cs-bob 3.5s ease-in-out infinite;
          }
          @keyframes cs-bob {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(8px); }
          }

          /* Lead statement */
          .cs-lead {
            background: var(--color-ink);
            padding: clamp(7rem, 13vw, 12rem) clamp(2rem, 8vw, 10rem);
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .cs-lead__inner { max-width: 900px; }
          .cs-lead__text {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.75rem, 3.5vw, 3rem);
            line-height: 1.45;
            color: rgba(240,240,238,0.9);
            letter-spacing: 0.01em;
            margin: 0;
          }

          /* Body paragraphs — alternating rhythm */
          .cs-body-section {
            background: var(--color-ink);
          }
          .cs-para-block {
            display: grid;
            grid-template-columns: 6px 1fr;
            gap: 0 clamp(3rem, 6vw, 6rem);
            padding: clamp(4rem, 7vw, 6rem) clamp(2rem, 8vw, 10rem);
            border-bottom: 1px solid rgba(255,255,255,0.06);
            max-width: 900px;
          }
          .cs-para-block--alt {
            margin-left: auto;
            grid-template-columns: 1fr 6px;
          }
          .cs-para-block__accent {
            background: var(--color-accent);
            opacity: 0.35;
            flex-shrink: 0;
          }
          .cs-para-block--alt .cs-para-block__accent {
            order: 2;
          }
          .cs-para-block__text {
            font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
            font-weight: 300;
            font-size: clamp(0.9375rem, 1.2vw, 1.0625rem);
            line-height: 2.4;
            letter-spacing: 0.05em;
            color: rgba(240,240,238,0.65);
            margin: 0;
          }

          /* Space contexts grid */
          .cs-spaces {
            background: var(--color-ink);
            border-top: 1px solid rgba(255,255,255,0.08);
            padding: clamp(5rem, 9vw, 8rem) clamp(2rem, 6vw, 5rem);
          }
          .cs-spaces__header {
            max-width: 1200px;
            margin: 0 auto clamp(3rem, 5vw, 5rem);
          }
          .cs-spaces__eyebrow {
            font-family: var(--font-jost), Jost, sans-serif;
            font-size: 0.625rem;
            letter-spacing: 0.46em;
            text-transform: uppercase;
            color: var(--color-accent);
            opacity: 0.65;
            margin: 0 0 1rem;
          }
          .cs-spaces__title {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.75rem, 3vw, 2.5rem);
            line-height: 1;
            color: rgba(240,240,238,0.5);
            margin: 0;
            letter-spacing: 0.04em;
          }
          .cs-spaces__grid {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            border-top: 1px solid rgba(255,255,255,0.1);
          }
          .cs-space-item {
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
            padding: clamp(2rem, 3vw, 2.75rem);
            border-right: 1px solid rgba(255,255,255,0.08);
            border-bottom: 1px solid rgba(255,255,255,0.08);
            transition: background 0.4s ease;
          }
          .cs-space-item:nth-child(3n) { border-right: none; }
          .cs-space-item:hover { background: rgba(255,255,255,0.03); }
          .cs-space-en {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.125rem, 1.8vw, 1.5rem);
            line-height: 1.1;
            color: rgba(240,240,238,0.8);
          }
          .cs-space-ja {
            font-family: var(--font-noto-serif-jp), sans-serif;
            font-weight: 300;
            font-size: 0.75rem;
            letter-spacing: 0.1em;
            color: rgba(240,240,238,0.3);
            line-height: 1.7;
          }

          /* Scope */
          .cs-scope {
            background: var(--color-ink);
            border-top: 1px solid rgba(255,255,255,0.08);
            padding: clamp(4.5rem, 8vw, 7rem) 0;
          }
          .cs-scope__inner {
            max-width: 680px;
            margin: 0 auto;
            padding: 0 clamp(2rem, 6vw, 5rem);
          }
          .cs-scope__eyebrow {
            font-family: var(--font-jost), Jost, sans-serif;
            font-size: 0.6875rem;
            letter-spacing: 0.46em;
            text-transform: uppercase;
            color: rgba(240,240,238,0.25);
            margin: 0 0 2.5rem;
          }
          .cs-scope__list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .cs-scope__item {
            font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
            font-weight: 300;
            font-size: clamp(0.875rem, 1.1vw, 1rem);
            line-height: 1.75;
            letter-spacing: 0.04em;
            color: rgba(240,240,238,0.45);
            padding: 1.1rem 0;
            border-bottom: 1px solid rgba(255,255,255,0.07);
          }
          .cs-scope__item:first-child { border-top: 1px solid rgba(255,255,255,0.07); }

          /* Process */
          .cs-process {
            background: var(--color-ink);
            border-top: 1px solid rgba(255,255,255,0.08);
            padding: clamp(5rem, 9vw, 7rem) clamp(2rem, 6vw, 5rem);
          }
          .cs-process__inner {
            max-width: 1000px;
            margin: 0 auto;
          }
          .cs-process__label {
            font-family: var(--font-jost), Jost, sans-serif;
            font-weight: 400;
            font-size: 0.6875rem;
            letter-spacing: 0.46em;
            text-transform: uppercase;
            color: rgba(240,240,238,0.3);
            margin: 0 0 3rem;
          }
          .cs-process__steps {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
          }
          .cs-process__step {
            padding: 0 clamp(1.5rem, 3vw, 3rem) 0 0;
          }
          .cs-process__step:not(:first-child) {
            padding-left: clamp(1.5rem, 3vw, 3rem);
            border-left: 1px solid rgba(255,255,255,0.08);
          }
          .cs-process__dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--color-accent);
            opacity: 0.45;
            margin-bottom: 1.25rem;
          }
          .cs-process__step-label {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.125rem, 1.8vw, 1.5rem);
            color: rgba(240,240,238,0.75);
            margin: 0 0 0.75rem;
            line-height: 1.1;
          }
          .cs-process__step-body {
            font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
            font-weight: 300;
            font-size: 0.8125rem;
            line-height: 2;
            letter-spacing: 0.04em;
            color: rgba(240,240,238,0.38);
            margin: 0;
          }
          @media (max-width: 768px) {
            .cs-process__steps { grid-template-columns: 1fr; gap: 2.5rem; }
            .cs-process__step:not(:first-child) { padding-left: 0; border-left: none; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 2.5rem; }
          }

          /* CTA */
          .cs-cta {
            position: relative;
            overflow: hidden;
            padding: clamp(8rem, 14vw, 12rem) clamp(2rem, 8vw, 10rem);
          }
          .cs-cta__photo {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center;
            transition: transform 12s ease;
          }
          .cs-cta:hover .cs-cta__photo { transform: scale(1.04); }
          .cs-cta__overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(160deg, rgba(6,5,4,0.94) 0%, rgba(20,16,10,0.96) 100%);
          }
          .cs-cta__inner {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }
          .cs-cta__question {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.75rem, 3.5vw, 3rem);
            line-height: 1.3;
            color: rgba(240,240,238,0.9);
            margin: 0;
            letter-spacing: 0.01em;
            max-width: 720px;
          }
          .cs-cta__note {
            font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
            font-weight: 300;
            font-size: clamp(0.875rem, 1.2vw, 1rem);
            letter-spacing: 0.1em;
            color: rgba(240,240,238,0.38);
            margin: 0;
            line-height: 2;
          }
          .cs-cta__link {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.375rem, 2.2vw, 1.875rem);
            color: rgba(240,240,238,0.85);
            text-decoration: none;
            letter-spacing: 0.02em;
            position: relative;
            padding-bottom: 0.25rem;
            transition: color 0.35s ease;
            align-self: flex-start;
          }
          .cs-cta__link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: rgba(240,240,238,0.3);
            transition: background 0.35s ease;
          }
          .cs-cta__link:hover { color: #ffffff; }
          .cs-cta__link:hover::after { background: rgba(255,255,255,0.7); }

          @media (max-width: 768px) {
            .cs-spaces__grid { grid-template-columns: 1fr 1fr; }
            .cs-space-item:nth-child(3n) { border-right: 1px solid rgba(255,255,255,0.08); }
            .cs-space-item:nth-child(2n) { border-right: none; }
          }
          @media (max-width: 640px) {
            .cs-hero { height: 80vh; }
            .cs-spaces__grid { grid-template-columns: 1fr; }
            .cs-space-item { border-right: none !important; }
            .cs-para-block { grid-template-columns: 1fr; }
            .cs-para-block__accent { display: none; }
          }
        `}</style>
      </main>
    );
  }

  /* ── HOTEL BRANDING: warm, hospitality, intimate editorial ─────── */
  if (programKey === 'hotelBranding') {
    return (
      <main className="hb-main">

        {/* ── Hero ── */}
        <div ref={heroRef} className="hb-hero">
          <div
            className="hb-hero__photo"
            style={{ backgroundImage: `url(${hero.src})`, backgroundPosition: hero.pos }}
          />
          <div className="hb-hero__overlay" />
          <Link href={servicesHref} className="hb-back">← {t('backLabel')}</Link>
          <div className={`hb-hero__content reveal${heroInView ? ' is-in-view' : ''}`}>
            <p className="hb-hero__label">{t(key('label'))}</p>
            <h1 className="hb-hero__name">{t(key('name'))}</h1>
            <p className="hb-hero__sub">{t(key('nameJa'))}</p>
          </div>
          <div className="hb-hero__scroll" aria-hidden="true">↓</div>
        </div>

        {/* ── Lead: right-aligned, generous white space ── */}
        <section ref={editRef} className="hb-lead-section">
          <div className={`hb-lead__inner reveal${editInView ? ' is-in-view' : ''}`}>
            <p className="hb-lead__text">{t(key('lead'))}</p>
          </div>
        </section>

        {/* ── Body: narrow editorial column, image panel ── */}
        <section className="hb-story">
          <div className="hb-story__photo-panel"
            style={{ backgroundImage: `url(${accent.src})` }}
          />
          <div className="hb-story__text-panel">
            {bodyParagraphs.map((para, i) => (
              <p key={i} className="hb-story__para">{para}</p>
            ))}
          </div>
        </section>

        {/* ── Scope ── */}
        <section ref={inclRef} className="hb-scope">
          <div className={`hb-scope__inner reveal${inclInView ? ' is-in-view' : ''}`}>
            <p className="hb-scope__eyebrow">{t(key('includes.label'))}</p>
            <ul className="hb-scope__list">
              {includesItems.map((item, i) => (
                <li
                  key={i}
                  className={`hb-scope__item reveal reveal-delay-${Math.min(i + 1, 5)}${inclInView ? ' is-in-view' : ''}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="hb-process">
          <div className="hb-process__inner">
            <p className="hb-process__label">{t('processLabel')}</p>
            <div className="hb-process__steps">
              {(['step1','step2','step3'] as const).map((step) => (
                <div key={step} className="hb-process__step">
                  <div className="hb-process__dot" aria-hidden="true" />
                  <p className="hb-process__step-label">{t(`process.${step}.label` as Parameters<typeof t>[0])}</p>
                  <p className="hb-process__step-body">{t(`process.${step}.body` as Parameters<typeof t>[0])}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section ref={ctaRef} className="hb-cta">
          <div className={`hb-cta__inner reveal${ctaInView ? ' is-in-view' : ''}`}>
            <p className="hb-cta__question">{t(key('ctaQuestion'))}</p>
            <p className="hb-cta__note">{t('ctaBodyNote')}</p>
            <Link href={contactHref} className="hb-cta__link">{t('ctaLinkLabel')}</Link>
          </div>
        </section>

        <style>{`
          .reveal {
            opacity: 0;
            transform: translateY(22px);
            transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1),
                        transform 0.9s cubic-bezier(0.22,1,0.36,1);
          }
          .reveal.is-in-view { opacity: 1; transform: translateY(0); }
          .reveal-delay-1 { transition-delay: 0.10s; }
          .reveal-delay-2 { transition-delay: 0.20s; }
          .reveal-delay-3 { transition-delay: 0.30s; }
          .reveal-delay-4 { transition-delay: 0.40s; }
          .reveal-delay-5 { transition-delay: 0.50s; }

          .hb-main { background: var(--color-white); padding-top: 64px; }

          .hb-back {
            position: absolute;
            top: 2.25rem;
            left: clamp(2rem, 6vw, 5rem);
            z-index: 3;
            font-family: var(--font-jost), Jost, sans-serif;
            font-size: 0.8125rem;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: rgba(240,240,238,0.32);
            text-decoration: none;
            transition: color 0.3s ease;
          }
          .hb-back:hover { color: var(--color-accent); }

          .hb-hero {
            position: relative;
            height: 100vh;
            min-height: 580px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }
          .hb-hero__photo {
            position: absolute;
            inset: 0;
            background-size: cover;
            transition: transform 20s ease;
          }
          .hb-hero:hover .hb-hero__photo { transform: scale(1.04); }
          .hb-hero__overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to left,
              rgba(6,5,4,0.92) 0%,
              rgba(6,5,4,0.55) 50%,
              rgba(6,5,4,0.08) 100%
            );
          }
          .hb-hero__content {
            position: relative;
            z-index: 2;
            padding: 0 clamp(2rem, 6vw, 5.5rem) 0;
            width: 55%;
            max-width: 650px;
            text-align: right;
          }
          .hb-hero__label {
            font-family: var(--font-jost), Jost, sans-serif;
            font-size: 0.625rem;
            letter-spacing: 0.6em;
            text-transform: uppercase;
            color: rgba(240,240,238,0.35);
            margin: 0 0 2rem;
          }
          .hb-hero__name {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(3.5rem, 9vw, 8rem);
            line-height: 0.88;
            color: #F0F0EE;
            letter-spacing: -0.02em;
            margin: 0 0 2rem;
          }
          .hb-hero__sub {
            font-family: var(--font-noto-serif-jp), sans-serif;
            font-weight: 300;
            font-size: 0.8125rem;
            letter-spacing: 0.28em;
            color: rgba(240,240,238,0.28);
            margin: 0;
          }
          .hb-hero__scroll {
            position: absolute;
            bottom: 2.5rem;
            left: clamp(2rem, 6vw, 5rem);
            z-index: 2;
            font-size: 0.875rem;
            color: rgba(240,240,238,0.22);
            animation: hb-bob 3.5s ease-in-out infinite;
          }
          @keyframes hb-bob {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(8px); }
          }

          /* Lead */
          .hb-lead-section {
            padding: clamp(7rem, 12vw, 11rem) clamp(2rem, 8vw, 10rem);
            border-bottom: 1px solid var(--color-line);
            display: flex;
            justify-content: flex-end;
          }
          .hb-lead__inner { max-width: 760px; }
          .hb-lead__text {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.5rem, 3vw, 2.75rem);
            line-height: 1.5;
            color: var(--color-ink);
            letter-spacing: 0.01em;
            margin: 0;
          }

          /* Story: photo + text */
          .hb-story {
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 680px;
            border-bottom: 1px solid var(--color-line);
          }
          .hb-story__photo-panel {
            background-size: cover;
            background-position: center;
          }
          .hb-story__text-panel {
            padding: clamp(5rem, 8vw, 8rem) clamp(3rem, 5vw, 5.5rem);
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 2.5rem;
            border-left: 1px solid var(--color-line);
            background: #FDFCFA;
          }
          .hb-story__para {
            font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
            font-weight: 300;
            font-size: clamp(0.9375rem, 1.2vw, 1.0625rem);
            line-height: 2.4;
            letter-spacing: 0.05em;
            color: var(--color-ink-light);
            margin: 0;
          }

          /* Scope */
          .hb-scope {
            background: var(--color-white);
            border-bottom: 1px solid var(--color-line);
            padding: clamp(4.5rem, 8vw, 7rem) 0;
          }
          .hb-scope__inner {
            max-width: 680px;
            margin: 0 auto;
            padding: 0 clamp(2rem, 6vw, 5rem);
          }
          .hb-scope__eyebrow {
            font-family: var(--font-jost), Jost, sans-serif;
            font-size: 0.6875rem;
            letter-spacing: 0.46em;
            text-transform: uppercase;
            color: var(--color-ink-mute);
            opacity: 0.55;
            margin: 0 0 2.5rem;
          }
          .hb-scope__list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .hb-scope__item {
            font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
            font-weight: 400;
            font-size: clamp(0.875rem, 1.1vw, 1rem);
            line-height: 1.75;
            letter-spacing: 0.04em;
            color: var(--color-ink-light);
            padding: 1.25rem 0;
            border-bottom: 1px solid var(--color-line);
          }
          .hb-scope__item:first-child { border-top: 1px solid var(--color-line); }

          /* Process */
          .hb-process {
            background: var(--color-white);
            border-top: 1px solid var(--color-line);
            padding: clamp(5rem, 9vw, 7rem) clamp(2rem, 8vw, 8rem);
          }
          .hb-process__inner { max-width: 960px; }
          .hb-process__label {
            font-family: var(--font-jost), Jost, sans-serif;
            font-weight: 400;
            font-size: 0.6875rem;
            letter-spacing: 0.46em;
            text-transform: uppercase;
            color: var(--color-ink-mute);
            opacity: 0.55;
            margin: 0 0 3rem;
          }
          .hb-process__steps {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
          }
          .hb-process__step {
            padding: 0 clamp(1.5rem, 3vw, 3rem) 0 0;
          }
          .hb-process__step:not(:first-child) {
            padding-left: clamp(1.5rem, 3vw, 3rem);
            border-left: 1px solid var(--color-line);
          }
          .hb-process__dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--color-accent);
            opacity: 0.55;
            margin-bottom: 1.25rem;
          }
          .hb-process__step-label {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.125rem, 1.8vw, 1.5rem);
            color: var(--color-ink);
            margin: 0 0 0.75rem;
            line-height: 1.1;
          }
          .hb-process__step-body {
            font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
            font-weight: 400;
            font-size: 0.875rem;
            line-height: 2;
            letter-spacing: 0.04em;
            color: var(--color-ink-mute);
            margin: 0;
          }
          @media (max-width: 768px) {
            .hb-process__steps { grid-template-columns: 1fr; gap: 2.5rem; }
            .hb-process__step:not(:first-child) { padding-left: 0; border-left: none; border-top: 1px solid var(--color-line); padding-top: 2.5rem; }
          }

          /* CTA */
          .hb-cta {
            padding: clamp(6rem, 11vw, 9rem) clamp(2rem, 8vw, 8rem);
            display: flex;
            align-items: center;
            justify-content: center;
            border-top: 1px solid var(--color-line);
          }
          .hb-cta__inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            text-align: center;
            max-width: 680px;
          }
          .hb-cta__question {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.75rem, 3.5vw, 2.875rem);
            line-height: 1.35;
            color: var(--color-ink);
            margin: 0;
            letter-spacing: 0.01em;
          }
          .hb-cta__note {
            font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
            font-weight: 400;
            font-size: clamp(0.875rem, 1.2vw, 1rem);
            letter-spacing: 0.1em;
            color: var(--color-ink-mute);
            margin: 0;
            line-height: 2;
          }
          .hb-cta__link {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: clamp(1.375rem, 2.2vw, 1.75rem);
            color: var(--color-ink);
            text-decoration: none;
            letter-spacing: 0.03em;
            position: relative;
            padding-bottom: 0.25rem;
            transition: color 0.35s ease;
          }
          .hb-cta__link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: var(--color-line-dark);
            transition: background 0.35s ease;
          }
          .hb-cta__link:hover { color: var(--color-accent); }
          .hb-cta__link:hover::after { background: var(--color-accent); }

          @media (max-width: 900px) {
            .hb-story {
              grid-template-columns: 1fr;
            }
            .hb-story__photo-panel {
              min-height: 55vw;
            }
            .hb-story__text-panel {
              border-left: none;
              border-top: 1px solid var(--color-line);
            }
            .hb-hero__content {
              width: 75%;
              text-align: left;
            }
          }
          @media (max-width: 640px) {
            .hb-hero { height: 80vh; align-items: flex-end; }
            .hb-hero__content { width: 100%; padding-bottom: clamp(4rem, 7vw, 6rem); }
            .hb-hero__overlay {
              background: linear-gradient(to top, rgba(6,5,4,0.95) 0%, rgba(6,5,4,0.40) 60%, rgba(6,5,4,0.05) 100%);
            }
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="pp-main">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div ref={heroRef} className="pp-hero">
        <div
          className="pp-hero__photo"
          style={{ backgroundImage: `url(${hero.src})`, backgroundPosition: hero.pos }}
        />
        <div className="pp-hero__overlay" />

        <Link href={servicesHref} className="pp-back">
          ← {t('backLabel')}
        </Link>

        <div className={`pp-hero__content reveal${heroInView ? ' is-in-view' : ''}`}>
          <p className="pp-hero__label">{t(key('label'))}</p>
          <h1 className="pp-hero__name">{t(key('name'))}</h1>
          <p className="pp-hero__name-ja">{t(key('nameJa'))}</p>
        </div>

        <div className="pp-hero__scroll" aria-hidden="true">↓</div>
      </div>

      {/* ── Editorial: sticky photo + layered body text ───────────────── */}
      <section ref={editRef} className="pp-edit-section">
        <div className="pp-edit">

          {/* Sticky photo panel */}
          <div className={`pp-edit__photo reveal${editInView ? ' is-in-view' : ''}`}>
            <div
              className="pp-edit__photo-inner"
              style={{ backgroundImage: `url(${accent.src})`, backgroundPosition: accent.pos }}
            />
          </div>

          {/* Scrolling text — chapter-style */}
          <div className={`pp-edit__text reveal reveal-delay-1${editInView ? ' is-in-view' : ''}`}>
            <p className="pp-edit__eyebrow">{t(key('label'))}</p>
            <h2 className="pp-edit__chapter-title">{t(key('nameJa'))}</h2>
            <div className="pp-edit__body-stack">
              {bodyParagraphs.map((para, i) => (
                <p key={i} className="pp-body-para">{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── Applicable Spaces (Cultural Space only) ─────────────────────── */}
      {programKey === 'culturalSpace' && (
        <section ref={spacesRef} className="pp-spaces-section">
          <div className="pp-spaces-inner">
            <div className={`pp-spaces-header reveal${spacesInView ? ' is-in-view' : ''}`}>
              <span className="pp-spaces-eyebrow">Applicable Spaces</span>
              <p className="pp-spaces-title-ja">対応可能な空間</p>
            </div>
            <div className="pp-spaces-grid">
              {SPACE_TYPES.map(({ en, ja }, i) => (
                <div
                  key={i}
                  className={`pp-space-item reveal reveal-delay-${Math.min(i + 1, 5)}${spacesInView ? ' is-in-view' : ''}`}
                >
                  <span className="pp-space-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="pp-space-en">{en}</span>
                  <span className="pp-space-ja">{ja}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Scope ────────────────────────────────────────────────── */}
      <section ref={inclRef} className="pp-scope-section">
        <div className={`pp-scope-inner reveal${inclInView ? ' is-in-view' : ''}`}>
          <p className="pp-scope-eyebrow">{t(key('includes.label'))}</p>
          <ul className="pp-scope-list">
            {includesItems.map((item, i) => (
              <li
                key={i}
                className={`pp-scope-item reveal reveal-delay-${Math.min(i + 1, 5)}${inclInView ? ' is-in-view' : ''}`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────────────── */}
      <section className="pp-process-section">
        <div className="pp-process-inner">
          <p className="pp-process-label">{t('processLabel')}</p>
          <div className="pp-process-steps">
            {(['step1','step2','step3'] as const).map((step) => (
              <div key={step} className="pp-process-step">
                <div className="pp-process-dot" aria-hidden="true" />
                <p className="pp-process-step-label">{t(`process.${step}.label` as Parameters<typeof t>[0])}</p>
                <p className="pp-process-step-body">{t(`process.${step}.body` as Parameters<typeof t>[0])}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="pp-cta-section">
        <div className={`pp-cta-inner reveal${ctaInView ? ' is-in-view' : ''}`}>
          <p className="pp-cta-question">{t(key('ctaQuestion'))}</p>
          <p className="pp-cta-note">{t('ctaBodyNote')}</p>
          <Link href={contactHref} className="pp-cta-link">
            {t('ctaLinkLabel')}
          </Link>
        </div>
      </section>

      <style>{`
        /* ── Reveal system ──────────────────────────────────────────── */
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1),
                      transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal.is-in-view { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.12s; }
        .reveal-delay-2 { transition-delay: 0.22s; }
        .reveal-delay-3 { transition-delay: 0.32s; }
        .reveal-delay-4 { transition-delay: 0.42s; }
        .reveal-delay-5 { transition-delay: 0.52s; }

        /* ── Base ───────────────────────────────────────────────────── */
        .pp-main {
          background: var(--color-white);
          padding-top: 64px;
        }

        /* ── Hero ───────────────────────────────────────────────────── */
        .pp-hero {
          position: relative;
          height: 92vh;
          min-height: 560px;
          max-height: 1000px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
        }
        .pp-hero__photo {
          position: absolute;
          inset: 0;
          background-size: cover;
          transition: transform 16s ease;
        }
        .pp-hero:hover .pp-hero__photo {
          transform: scale(1.03);
        }
        .pp-hero__overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to top,
              rgba(6,5,4,0.94) 0%,
              rgba(6,5,4,0.42) 50%,
              rgba(6,5,4,0.08) 100%);
        }
        .pp-back {
          position: absolute;
          top: 2.25rem;
          left: clamp(2rem, 6vw, 5rem);
          z-index: 3;
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(240,240,238,0.35);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .pp-back:hover { color: var(--color-accent); }
        .pp-hero__content {
          position: relative;
          z-index: 2;
          padding: 0 clamp(2rem, 6vw, 5rem) clamp(3.5rem, 6vw, 5.5rem);
          width: 100%;
        }
        .pp-hero__label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.48em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin: 0 0 1.25rem;
          opacity: 0.9;
        }
        .pp-hero__name {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(3.25rem, 9vw, 7.5rem);
          line-height: 0.90;
          color: #F0F0EE;
          letter-spacing: -0.01em;
          margin: 0 0 2rem;
        }
        .pp-hero__name-ja {
          font-family: var(--font-noto-serif-jp), "Noto Sans JP", sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.22em;
          color: rgba(240,240,238,0.45);
          margin: 0;
        }
        .pp-hero__scroll {
          position: absolute;
          bottom: 2.5rem;
          right: clamp(2rem, 6vw, 5rem);
          z-index: 2;
          font-size: 0.875rem;
          color: var(--color-accent);
          opacity: 0.35;
          animation: pp-bob 3s ease-in-out infinite;
        }
        @keyframes pp-bob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }

        /* ── Editorial ──────────────────────────────────────────────── */
        .pp-edit-section {
          background: var(--color-white);
        }
        .pp-edit {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1400px;
          margin: 0 auto;
          min-height: 720px;
        }

        /* Sticky photo with overlaid program name */
        .pp-edit__photo {
          position: relative;
          overflow: hidden;
        }
        .pp-edit__photo-inner {
          position: sticky;
          top: 64px;
          height: calc(100vh - 64px);
          max-height: 840px;
          background-size: cover;
          transition: transform 0.8s ease;
        }
        .pp-edit__photo:hover .pp-edit__photo-inner {
          transform: scale(1.02);
        }
        /* Scrolling text — chapter style */
        .pp-edit__text {
          padding: clamp(4.5rem, 7vw, 7.5rem) clamp(3rem, 5.5vw, 6rem);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          border-left: 1px solid var(--color-line);
        }
        .pp-edit__eyebrow {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin: 0 0 1.5rem;
          opacity: 0.85;
        }
        .pp-edit__chapter-title {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(2rem, 3.5vw, 3rem);
          line-height: 1.05;
          letter-spacing: -0.01em;
          color: var(--color-ink);
          margin: 0 0 2.5rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid var(--color-line);
        }
        .pp-edit__body-stack {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .pp-body-para {
          font-family: var(--font-noto-serif-jp), "Noto Sans JP", sans-serif;
          font-weight: 400;
          font-size: clamp(0.9375rem, 1.15vw, 1rem);
          line-height: 2.35;
          letter-spacing: 0.045em;
          color: var(--color-ink-light, #444);
          margin: 0 0 2.25rem;
        }
        .pp-body-para:last-child { margin-bottom: 0; }

        /* ── Section label (shared) ─────────────────────────────────── */
        .pp-section-label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0 0 2.5rem;
          opacity: 0.75;
        }

        /* ── Scope ──────────────────────────────────────────────── */
        .pp-scope-section {
          background: var(--color-white);
          border-top: 1px solid var(--color-line);
          padding: clamp(4.5rem, 8vw, 7rem) 0;
        }
        .pp-scope-inner {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 clamp(2rem, 6vw, 5rem);
        }
        .pp-scope-eyebrow {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.6875rem;
          letter-spacing: 0.46em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          opacity: 0.55;
          margin: 0 0 2.5rem;
        }
        .pp-scope-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .pp-scope-item {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: clamp(0.9375rem, 1.15vw, 1rem);
          line-height: 1.75;
          letter-spacing: 0.04em;
          color: var(--color-ink-light);
          padding: 1.1rem 0;
          border-bottom: 1px solid var(--color-line);
        }
        .pp-scope-item:first-child {
          border-top: 1px solid var(--color-line);
        }

        /* ── Process ────────────────────────────────────────────────── */
        .pp-process-section {
          background: var(--color-white);
          border-top: 1px solid var(--color-line);
          padding: clamp(5rem, 9vw, 7rem) clamp(2rem, 6vw, 5rem);
        }
        .pp-process-inner {
          max-width: 1000px;
          margin: 0 auto;
        }
        .pp-process-label {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.6875rem;
          letter-spacing: 0.46em;
          text-transform: uppercase;
          color: var(--color-accent);
          opacity: 0.72;
          margin: 0 0 3rem;
        }
        .pp-process-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        .pp-process-step {
          padding: 0 clamp(1.5rem, 3vw, 3rem) 0 0;
        }
        .pp-process-step:not(:first-child) {
          padding-left: clamp(1.5rem, 3vw, 3rem);
          border-left: 1px solid var(--color-line);
        }
        .pp-process-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-accent);
          opacity: 0.55;
          margin-bottom: 1.25rem;
        }
        .pp-process-step-label {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.125rem, 1.8vw, 1.5rem);
          color: var(--color-ink);
          margin: 0 0 0.75rem;
          line-height: 1.1;
        }
        .pp-process-step-body {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: 0.875rem;
          line-height: 2;
          letter-spacing: 0.04em;
          color: var(--color-ink-mute);
          margin: 0;
        }
        @media (max-width: 768px) {
          .pp-process-steps { grid-template-columns: 1fr; gap: 2.5rem; }
          .pp-process-step:not(:first-child) { padding-left: 0; border-left: none; border-top: 1px solid var(--color-line); padding-top: 2.5rem; }
        }

        /* ── CTA ────────────────────────────────────────────────────── */
        .pp-cta-section {
          border-top: 1px solid var(--color-line);
          padding: clamp(6rem, 11vw, 9rem) clamp(2rem, 6vw, 5rem);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-white);
        }
        .pp-cta-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          text-align: center;
          max-width: 680px;
        }
        .pp-cta-question {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.75rem, 3.5vw, 3rem);
          line-height: 1.3;
          color: var(--color-ink);
          margin: 0;
          letter-spacing: 0.01em;
        }
        .pp-cta-note {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 400;
          font-size: clamp(0.875rem, 1.2vw, 1rem);
          letter-spacing: 0.08em;
          color: var(--color-ink-mute);
          margin: 0;
          line-height: 1.9;
        }
        .pp-cta-link {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.375rem, 2.2vw, 1.75rem);
          color: var(--color-ink);
          text-decoration: none;
          letter-spacing: 0.03em;
          position: relative;
          padding-bottom: 0.25rem;
          transition: color 0.35s ease;
        }
        .pp-cta-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--color-ink);
          transform-origin: left;
          transition: background 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .pp-cta-link:hover { color: var(--color-accent); }
        .pp-cta-link:hover::after { background: var(--color-accent); }

        /* ── Applicable Spaces ──────────────────────────────────────── */
        .pp-spaces-section {
          background: var(--color-white);
          border-top: 1px solid var(--color-line);
          padding: clamp(5rem, 9vw, 8rem) 0;
        }
        .pp-spaces-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(2rem, 6vw, 5rem);
          display: grid;
          grid-template-columns: 1fr 2.5fr;
          gap: clamp(3rem, 6vw, 7rem);
          align-items: start;
        }
        .pp-spaces-header {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .pp-spaces-eyebrow {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.625rem;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: var(--color-accent);
          opacity: 0.7;
        }
        .pp-spaces-title-ja {
          font-family: var(--font-noto-serif-jp), sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.14em;
          color: var(--color-ink-mute);
          margin: 0;
          line-height: 1.8;
        }
        .pp-spaces-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid var(--color-line);
        }
        .pp-space-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: clamp(1.5rem, 2.5vw, 2.25rem) clamp(1.25rem, 2.5vw, 2rem);
          border-bottom: 1px solid var(--color-line);
          border-right: 1px solid var(--color-line);
          position: relative;
          overflow: hidden;
          transition: background 0.4s ease;
          cursor: default;
        }
        .pp-space-item:nth-child(2n) {
          border-right: none;
        }
        .pp-space-item:hover {
          background: #F9F8F6;
        }
        /* Accent bar on hover */
        .pp-space-item::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 2px;
          height: 100%;
          background: var(--color-accent);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .pp-space-item:hover::after {
          transform: scaleY(1);
        }
        .pp-space-num {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.625rem;
          letter-spacing: 0.18em;
          color: var(--color-accent);
          opacity: 0.55;
        }
        .pp-space-en {
          font-family: var(--font-cormorant), "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.25rem, 2vw, 1.625rem);
          line-height: 1.1;
          letter-spacing: -0.01em;
          color: var(--color-ink);
          transition: color 0.3s ease;
        }
        .pp-space-item:hover .pp-space-en {
          color: var(--color-accent);
        }
        .pp-space-ja {
          font-family: var(--font-noto-serif-jp), sans-serif;
          font-weight: 400;
          font-size: 0.8125rem;
          letter-spacing: 0.1em;
          color: var(--color-ink-mute);
          line-height: 1.6;
        }

        /* ── Responsive ─────────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .pp-spaces-inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .pp-spaces-header {
            position: static;
            flex-direction: row;
            align-items: center;
            gap: 1.5rem;
          }
        }
        @media (max-width: 900px) {
          .pp-edit {
            grid-template-columns: 1fr;
          }
          .pp-edit__photo {
            height: 55vw;
            min-height: 300px;
            max-height: 500px;
          }
          .pp-edit__photo-inner {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            height: 100%;
            max-height: none;
          }
          .pp-edit__photo-label {
            display: none;
          }
          .pp-edit__text {
            border-left: none;
            border-top: 1px solid var(--color-line);
          }
          .pp-metrics-wrap {
            grid-template-columns: 1fr;
          }
          .pp-metric {
            border-right: none;
            border-bottom: 1px solid rgba(240,240,238,0.08);
          }
          .pp-metric:last-child { border-bottom: none; }
        }
        @media (max-width: 640px) {
          .pp-spaces-grid {
            grid-template-columns: 1fr;
          }
          .pp-space-item:nth-child(2n) {
            border-right: none;
          }
          .pp-space-item {
            border-right: none;
          }
          .pp-hero { height: 75vh; min-height: 420px; }
          .pp-hero__name { font-size: clamp(2.5rem, 12vw, 4rem); }
          .pp-quote__inner {
            padding: clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 3rem);
          }
        }
      `}</style>
    </main>
  );
}
