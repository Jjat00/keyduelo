import type { MetadataRoute } from 'next';
import { ES_HUB, SEO_PAGES } from '@/lib/seo/pages';
import { CONTENT_UPDATED, absoluteUrl } from '@/lib/seo/site';

/**
 * Static sitemap: the two app screens plus every content page in both
 * languages, with hreflang alternates so Google pairs the EN/ES twins.
 * Room pages are intentionally absent (ephemeral + noindex).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED);

  const entries: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/play'), lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl(ES_HUB.path), lastModified, changeFrequency: 'monthly', priority: 0.6 },
  ];

  for (const page of SEO_PAGES) {
    const languages = {
      en: absoluteUrl(page.en.path),
      es: absoluteUrl(page.es.path),
    };
    entries.push(
      {
        url: languages.en,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: { languages },
      },
      {
        url: languages.es,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: { languages },
      },
    );
  }

  return entries;
}
