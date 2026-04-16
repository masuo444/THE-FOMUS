import type { MetadataRoute } from 'next'

const base = 'https://thefomus.com'

const routes = [
  '',
  '/founder',
  '/craft',
  '/sustainability',
  '/contact',
  '/programs/corporate-gift',
  '/programs/cultural-space',
  '/programs/hotel-branding',
  '/programs/bespoke',
]

function getPriority(route: string): number {
  if (route === '') return 1.0
  if (route.startsWith('/programs/')) return 0.9
  if (['/founder', '/craft', '/sustainability'].includes(route)) return 0.8
  return 0.7
}

function getChangeFrequency(
  route: string
): MetadataRoute.Sitemap[number]['changeFrequency'] {
  return route === '' ? 'weekly' : 'monthly'
}

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: getChangeFrequency(route),
    priority: getPriority(route),
    alternates: {
      languages: {
        ja: `${base}${route}`,
        en: `${base}/en${route}`,
      },
    },
  }))
}
