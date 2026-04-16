import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Noto_Serif_JP, Cormorant_Garamond, Jost } from 'next/font/google';
import Script from 'next/script';
import '../globals.css';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-serif-jp',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-jost',
  display: 'swap',
});

const titleJa = 'THE FOMUS — 枡が、記憶になる。';
const titleEn = 'THE FOMUS — Crafted to be given. Designed to be remembered.';
const descriptionJa =
  'THE FOMUSは、日本の伝統工芸「枡」を体験の器として再定義し、企業・ホテル・大使館に向けて文化体験プログラムをフルオーダーで提供するブランドです。';
const descriptionEn =
  'THE FOMUS redefines the traditional Japanese masu as a vessel for cultural experience. Bespoke cultural programmes for corporations, luxury hotels, and embassies worldwide.';

export async function generateMetadata(
  props: Pick<LayoutProps<'/[locale]'>, 'params'>
): Promise<Metadata> {
  const { locale } = await props.params;
  const isEn = locale === 'en';
  const title = isEn ? titleEn : titleJa;
  const description = isEn ? descriptionEn : descriptionJa;
  const canonicalUrl = `https://thefomus.com${isEn ? '/en' : ''}`;

  return {
    title,
    description,
    keywords: [
      '法人向け 日本文化体験',
      '枡 ギフト 法人',
      'ラグジュアリーホテル 日本文化',
      'masu experience corporate japan',
      'japanese culture bespoke corporate gift',
      'luxury hotel japanese cultural program',
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ja: 'https://thefomus.com',
        en: 'https://thefomus.com/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: isEn ? 'en_US' : 'ja_JP',
      url: canonicalUrl,
      siteName: 'THE FOMUS',
      title,
      description,
      images: [
        {
          url: 'https://thefomus.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'THE FOMUS',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://thefomus.com/og-image.jpg'],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'ja' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  const jsonLd = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'THE FOMUS',
      url: 'https://thefomus.com',
      logo: 'https://thefomus.com/logo.png',
      description:
        'THE FOMUS is a Japanese luxury cultural experience brand. The masu — a traditional wooden measuring vessel — reimagined as bespoke commissions for corporations, luxury hotels, and embassies worldwide.',
      foundingDate: '2024',
      areaServed: 'Worldwide',
      serviceType: [
        'Corporate Gifting',
        'Cultural Space Design',
        'Hotel Branding',
        'Cultural Events',
        'Bespoke Commission',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        url: 'https://thefomus.com/contact',
        availableLanguage: ['Japanese', 'English'],
      },
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Masuo',
      jobTitle: 'Founder',
      worksFor: { '@type': 'Organization', name: 'THE FOMUS' },
      description:
        'Founder of THE FOMUS. 40+ countries of diplomatic and cultural experience. Operator of a traditional masu workshop in Japan.',
      url: 'https://thefomus.com/founder',
      knowsAbout: [
        'Japanese culture',
        'Masu craftsmanship',
        'Corporate gifting',
        'International diplomacy',
        'Cultural experience design',
      ],
    },
  ]);

  return (
    <html
      lang={locale}
      className={`${notoSerifJP.variable} ${cormorantGaramond.variable} ${jost.variable}`}
    >
      <body
        style={{
          backgroundColor: 'var(--color-white)',
          color: 'var(--color-ink)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
          strategy="afterInteractive"
        />
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
