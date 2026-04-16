import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Hero from '@/components/sections/Hero';
import Statement from '@/components/sections/Statement';
import ProgramsGrid from '@/components/sections/ProgramsGrid';
import MasuGrid from '@/components/sections/MasuGrid';
import LegacyGrid from '@/components/sections/LegacyGrid';
import AboutGrid from '@/components/sections/AboutGrid';

export async function generateMetadata({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'homePage' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function TopPage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'ja' | 'en')) {
    notFound();
  }

  return (
    <>
      <Hero />
      <Statement />
      <ProgramsGrid />
      <MasuGrid />
      <LegacyGrid />
      <AboutGrid />
    </>
  );
}
