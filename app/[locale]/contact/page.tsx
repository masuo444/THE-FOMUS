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
    <div style={{ paddingTop: '64px' }}>
      {/* Page Header */}
      <section
        style={{
          backgroundColor: 'var(--color-off-white)',
          paddingTop: '6rem',
          paddingBottom: '5rem',
          borderBottom: '1px solid var(--color-line)',
        }}
      >
        <div className="container-content" style={{ maxWidth: '700px' }}>
          <p className="label-text" style={{ marginBottom: '2rem' }}>
            {t('title')}
          </p>
          <h1
            style={{
              fontFamily: isJa
                ? 'var(--font-noto-serif-jp), "Noto Serif JP", serif'
                : 'var(--font-cormorant), "Cormorant Garamond", serif',
              fontWeight: 300,
              fontStyle: isJa ? 'normal' : 'italic',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-ink)',
              margin: '0 0 1.25rem',
              letterSpacing: isJa ? '0.05em' : '0.02em',
              lineHeight: 1.2,
            }}
          >
            {t('headline')}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-noto-serif-jp), "Noto Serif JP", serif',
              fontWeight: 300,
              fontSize: '0.9375rem',
              color: 'var(--color-ink-light)',
              lineHeight: 1.8,
              letterSpacing: '0.04em',
            }}
          >
            {t('subheadline')}
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section
        className="section-gap"
        style={{ backgroundColor: 'var(--color-white)' }}
      >
        <div className="container-content" style={{ maxWidth: '700px' }}>
          <ContactForm />
        </div>
      </section>

      {/* Masu SVG — decorative bottom */}
      <section
        style={{
          backgroundColor: 'var(--color-off-white)',
          padding: '4rem 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid var(--color-line)',
        }}
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{
            width: '80px',
            height: '80px',
            color: 'var(--color-line)',
          }}
        >
          <rect x="10" y="10" width="180" height="180" stroke="currentColor" strokeWidth="1" />
          <rect x="30" y="30" width="140" height="140" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </section>
    </div>
  );
}
