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
            <ol className="cg-incl__list">
              {includesItems.map((item, i) => (
                <li
                  key={i}
                  className={`cg-incl__item reveal reveal-delay-${Math.min(i + 1, 5)}${inclInView ? ' is-in-view' : ''}`}
                >
                  <span className="cg-incl__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="cg-incl__text">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── For Whom ── */}
        <section ref={forWhomRef} className="cg-forwhom">
          <div className="cg-forwhom__inner">
            <div className={`cg-forwhom__header reveal${forWhomInView ? ' is-in-view' : ''}`}>
              <p className="cg-forwhom__label">{t(key('forWhom.label'))}</p>
            </div>
            <div className="cg-forwhom__list">
              {forWhomItems.map((item, i) => (
                <div
                  key={i}
                  className={`cg-forwhom__item reveal reveal-delay-${Math.min(i + 1, 4)}${forWhomInView ? ' is-in-view' : ''}`}
                >
                  <span className="cg-forwhom__num">{String(i + 1).padStart(2, '0')}</span>
                  <p className="cg-forwhom__text">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section ref={ctaRef} className="cg-cta">
          <div className={`cg-cta__inner reveal${ctaInView ? ' is-in-view' : ''}`}>
            <Link href={contactHref} className="cg-cta__btn">
              {t('enquireCta')}
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
            gap: 2rem;
            padding: 1.625rem 0;
            border-bottom: 1px solid var(--color-line);
          }
          .cg-incl__num {
            font-family: var(--font-jost), Jost, sans-serif;
            font-weight: 400;
            font-size: 0.625rem;
            letter-spacing: 0.14em;
            color: var(--color-accent);
            opacity: 0.6;
            flex-shrink: 0;
            min-width: 1.5rem;
          }
          .cg-incl__text {
            font-family: var(--font-noto-serif-jp), sans-serif;
            font-weight: 400;
            font-size: 1rem;
            line-height: 1.9;
            letter-spacing: 0.03em;
            color: var(--color-ink);
          }

          /* ── For Whom ──────────────────────────────────────────────── */
          .cg-forwhom {
            background: #F5F4F2;
            padding: clamp(5rem, 9vw, 8rem) 0;
          }
          .cg-forwhom__inner {
            max-width: 960px;
            margin: 0 auto;
            padding: 0 clamp(2rem, 6vw, 5rem);
          }
          .cg-forwhom__header {
            margin-bottom: clamp(3rem, 5vw, 4.5rem);
          }
          .cg-forwhom__label {
            font-family: var(--font-jost), Jost, sans-serif;
            font-weight: 400;
            font-size: 0.6875rem;
            letter-spacing: 0.46em;
            text-transform: uppercase;
            color: var(--color-ink-mute);
            opacity: 0.62;
            margin: 0;
          }
          .cg-forwhom__list {
            display: flex;
            flex-direction: column;
          }
          .cg-forwhom__item {
            display: grid;
            grid-template-columns: 3.5rem 1fr;
            gap: 1.5rem;
            padding: clamp(2rem, 3.5vw, 3rem) 0;
            border-bottom: 1px solid rgba(0,0,0,0.07);
            align-items: start;
          }
          .cg-forwhom__item:first-child {
            border-top: 1px solid rgba(0,0,0,0.07);
          }
          .cg-forwhom__num {
            font-family: var(--font-cormorant), "Cormorant Garamond", serif;
            font-style: italic;
            font-weight: 400;
            font-size: 1.875rem;
            line-height: 1;
            color: var(--color-accent);
            opacity: 0.28;
            padding-top: 0.35rem;
          }
          .cg-forwhom__text {
            font-family: var(--font-noto-serif-jp), sans-serif;
            font-weight: 400;
            font-size: 0.9375rem;
            line-height: 2.25;
            letter-spacing: 0.04em;
            color: #444;
            margin: 0;
          }

          /* ── CTA ───────────────────────────────────────────────────── */
          .cg-cta {
            background: var(--color-white);
            border-top: 1px solid var(--color-line);
            padding: clamp(5rem, 9vw, 7.5rem) clamp(2rem, 6vw, 5rem);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .cg-cta__inner {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .cg-cta__btn {
            display: inline-block;
            font-family: var(--font-jost), Jost, sans-serif;
            font-weight: 400;
            font-size: 0.8125rem;
            letter-spacing: 0.34em;
            text-transform: uppercase;
            color: var(--color-ink);
            text-decoration: none;
            padding: 1.125rem 3.25rem;
            border: 1px solid var(--color-ink);
            transition: background 0.3s ease, color 0.3s ease;
          }
          .cg-cta__btn:hover {
            background: var(--color-ink);
            color: var(--color-white);
          }

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

        {/* ── CTA: private, left-aligned ── */}
        <section ref={ctaRef} className="be-cta">
          <div className={`be-cta__inner reveal${ctaInView ? ' is-in-view' : ''}`}>
            <Link href={contactHref} className="be-cta__link">
              {t('enquireCta')}
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
            margin: 0;
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

          .be-cta {
            padding: clamp(7rem, 12vw, 11rem) clamp(2rem, 8vw, 10rem);
          }
          .be-cta__inner {}
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

        {/* ── CTA ── */}
        <section ref={ctaRef} className="sm-cta">
          <div className={`sm-cta__inner reveal${ctaInView ? ' is-in-view' : ''}`}>
            <p className="sm-cta__note">{t('enquireCtaHeadline')}</p>
            <Link href={contactHref} className="sm-cta__link">{t('enquireCta')}</Link>
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

          .sm-cta {
            padding: clamp(6rem, 11vw, 9rem) clamp(2rem, 6vw, 5rem);
            display: flex;
            justify-content: center;
          }
          .sm-cta__inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2.5rem;
            text-align: center;
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

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="pp-cta-section">
        <div className={`pp-cta-inner reveal${ctaInView ? ' is-in-view' : ''}`}>
          <p className="pp-cta-note">{t('enquireCtaHeadline')}</p>
          <Link href={contactHref} className="pp-cta-link">
            {t('enquireCta')}
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
          gap: 2.5rem;
          text-align: center;
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
