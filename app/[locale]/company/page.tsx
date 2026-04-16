import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import CompanyPageClient from './CompanyPageClient';
import { pageAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]/company'>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'companyPage' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: pageAlternates(locale, '/company'),
  };
}

export default async function CompanyPage({ params }: PageProps<'/[locale]/company'>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'ja' | 'en')) {
    notFound();
  }

  return <CompanyPageClient locale={locale} />;
}
