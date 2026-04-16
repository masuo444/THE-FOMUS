import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import FounderPageClient from './FounderPageClient';
import { pageAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]/founder'>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'founderPage' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: pageAlternates(locale, '/founder'),
  };
}

export default async function FounderPage({ params }: PageProps<'/[locale]/founder'>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'ja' | 'en')) {
    notFound();
  }

  return <FounderPageClient />;
}
