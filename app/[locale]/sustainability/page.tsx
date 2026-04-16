import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import SustainabilityPageClient from './SustainabilityPageClient';
import { pageAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]/sustainability'>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sustainabilityPage' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: pageAlternates(locale, '/sustainability'),
  };
}

export default async function SustainabilityPage({ params }: PageProps<'/[locale]/sustainability'>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'ja' | 'en')) {
    notFound();
  }

  return <SustainabilityPageClient />;
}
