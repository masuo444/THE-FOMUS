import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ContactForm from '@/components/ui/ContactForm';
import { pageAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contactPage' });
  const description = locale === 'en'
    ? 'Begin your commission with THE FOMUS. Bespoke Japanese masu programmes for corporations, luxury hotels and embassies.'
    : '枡を使った法人向け文化体験プログラムのご相談はこちら。企業・ホテル・大使館向けにフルオーダーで対応します。';

  return {
    title: `${t('title')} — THE FOMUS`,
    description,
    alternates: pageAlternates(locale, '/contact'),
  };
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'ja' | 'en')) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'contactPage' });
  const isJa = locale === 'ja';

  return (
    <main className="ct-main">
      {/* ── Header ──────────────────────────── */}
      <section className="ct-header">
        <p className="ct-header__eyebrow">{t('title')}</p>
        <h1 className="ct-header__title">{t('headline')}</h1>
        <p className="ct-header__sub">{t('subheadline')}</p>
      </section>

      {/* ── Form ────────────────────────────── */}
      <section className="ct-form-section">
        <div className="ct-form-inner">
          <ContactForm />
        </div>
      </section>

      <style>{`
        .ct-main {
          background: #f8f8f6;
          padding-top: 64px;
          min-height: 100vh;
        }

        /* ── Header ─────────────────────────── */
        .ct-header {
          background: var(--color-white);
          border-bottom: 1px solid var(--color-line);
          padding: clamp(4rem, 8vw, 6rem) clamp(2rem, 8vw, 8rem) clamp(3rem, 6vw, 4.5rem);
          max-width: 780px;
        }
        .ct-header__eyebrow {
          font-family: var(--font-jost), Jost, sans-serif;
          font-weight: 400;
          font-size: 0.75rem;
          letter-spacing: 0.40em;
          text-transform: uppercase;
          color: var(--color-ink-mute);
          margin: 0 0 1.5rem;
        }
        .ct-header__title {
          font-family: ${isJa
            ? 'var(--font-noto-serif-jp), "Noto Serif JP", serif'
            : 'var(--font-cormorant), "Cormorant Garamond", serif'};
          font-weight: 300;
          font-style: ${isJa ? 'normal' : 'italic'};
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          color: var(--color-ink);
          margin: 0 0 1.25rem;
          letter-spacing: ${isJa ? '0.05em' : '0.02em'};
          line-height: 1.3;
        }
        .ct-header__sub {
          font-family: var(--font-noto-serif-jp), "Noto Serif JP", serif;
          font-weight: 300;
          font-size: 0.9375rem;
          color: var(--color-ink-light);
          line-height: 1.9;
          letter-spacing: 0.04em;
          margin: 0;
        }

        /* ── Form section ───────────────────── */
        .ct-form-section {
          padding: clamp(2.5rem, 5vw, 3.5rem) clamp(1.5rem, 6vw, 6rem);
        }
        .ct-form-inner {
          max-width: 680px;
        }
      `}</style>
    </main>
  );
}
