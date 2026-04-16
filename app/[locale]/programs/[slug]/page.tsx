import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ProgramPageClient from './ProgramPageClient';
import { pageAlternates } from '@/lib/seo';

const SLUG_MAP: Record<string, string> = {
  'corporate-gift': 'corporateGift',
  'cultural-space': 'culturalSpace',
  'hotel-branding': 'hotelBranding',
  'sake-masu': 'sakeMasu',
  'bespoke': 'bespoke',
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.keys(SLUG_MAP).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: PageProps<'/[locale]/programs/[slug]'>) {
  const { locale, slug } = await params;
  const programKey = SLUG_MAP[slug];
  if (!programKey) return {};

  const t = await getTranslations({ locale, namespace: 'programPages' });

  return {
    title: t(`meta.${programKey}.title` as Parameters<typeof t>[0]),
    description: t(`meta.${programKey}.description` as Parameters<typeof t>[0]),
    alternates: pageAlternates(locale, `/programs/${slug}`),
  };
}

export default async function ProgramPage({ params }: PageProps<'/[locale]/programs/[slug]'>) {
  const { locale, slug } = await params;

  if (!routing.locales.includes(locale as 'ja' | 'en')) {
    notFound();
  }

  const programKey = SLUG_MAP[slug];
  if (!programKey) {
    notFound();
  }

  return <ProgramPageClient slug={slug} programKey={programKey} locale={locale} />;
}
