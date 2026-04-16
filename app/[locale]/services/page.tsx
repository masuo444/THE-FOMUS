import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ServicesPageClient from './ServicesPageClient';
import { pageAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]/services'>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'programs' });
  return {
    title: locale === 'en' ? 'Programmes — THE FOMUS' : 'プログラム — THE FOMUS',
    description: t('sectionCaption'),
    alternates: pageAlternates(locale, '/services'),
  };
}

export default async function ServicesPage({ params }: PageProps<'/[locale]/services'>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'ja' | 'en')) {
    notFound();
  }

  return <ServicesPageClient />;
}
