import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import CraftPageClient from './CraftPageClient';
import { pageAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]/craft'>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'craftPage' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: pageAlternates(locale, '/craft'),
  };
}

export default async function CraftPage({ params }: PageProps<'/[locale]/craft'>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'ja' | 'en')) notFound();
  return <CraftPageClient />;
}
