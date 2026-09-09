import {
  AUTHOR,
  CONTENT_PUBLISHED,
  CONTENT_UPDATED,
  REPO_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  absoluteUrl,
} from './site';

/**
 * JSON-LD builders. Plain objects (no schema-dts dependency) so the bundle
 * stays tiny; shapes follow https://schema.org and Google's structured-data
 * docs. Everything is serialized by <JsonLd /> in components/seo/JsonLd.tsx.
 */

export const IDS = {
  website: absoluteUrl('/#website'),
  app: absoluteUrl('/#app'),
  author: absoluteUrl('/#author'),
} as const;

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': IDS.author,
    name: AUTHOR.name,
    url: AUTHOR.url,
    sameAs: [AUTHOR.github],
    jobTitle: 'Software engineer',
  };
}

/** Site-wide graph: rendered once from the root layout. */
export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': IDS.website,
        name: SITE_NAME,
        url: absoluteUrl('/'),
        description: SITE_DESCRIPTION,
        inLanguage: ['en', 'es'],
        author: { '@id': IDS.author },
        publisher: { '@id': IDS.author },
      },
      {
        '@type': ['WebApplication', 'SoftwareApplication'],
        '@id': IDS.app,
        name: SITE_NAME,
        alternateName: ['key duelo', 'keyduelo typing race'],
        url: absoluteUrl('/'),
        description: SITE_DESCRIPTION,
        applicationCategory: 'GameApplication',
        applicationSubCategory: 'Typing test / typing race',
        operatingSystem: 'Any (web browser)',
        browserRequirements: 'Requires JavaScript and WebSockets',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        license: 'https://www.gnu.org/licenses/gpl-3.0.html',
        codeRepository: REPO_URL,
        sameAs: [REPO_URL],
        author: { '@id': IDS.author },
        datePublished: '2026-04-25',
        dateModified: CONTENT_UPDATED,
        inLanguage: 'en',
        featureList: [
          'Free typing test with WPM, raw WPM and accuracy',
          'Time mode (15, 30, 60 s) and word mode (10, 25, 50, 100 words)',
          'Real-time multiplayer typing race with 5-letter room codes',
          'Public lobby with live room list and spectator mode',
          'Server-authoritative timer, text and ranking (anti-cheat)',
          'No account, no ads, no tracking',
          '5 color themes and optional key sounds',
        ],
        screenshot: absoluteUrl('/opengraph-image.png'),
        image: absoluteUrl('/icon.png'),
      },
      personSchema(),
    ],
  };
}

export interface ArticleInput {
  title: string;
  description: string;
  path: string;
  locale: 'en' | 'es';
}

export function articleSchema(a: ArticleInput) {
  return {
    '@type': 'Article',
    '@id': absoluteUrl(`${a.path}#article`),
    headline: a.title,
    description: a.description,
    url: absoluteUrl(a.path),
    mainEntityOfPage: absoluteUrl(a.path),
    inLanguage: a.locale,
    datePublished: CONTENT_PUBLISHED,
    dateModified: CONTENT_UPDATED,
    author: { '@id': IDS.author },
    publisher: { '@id': IDS.author },
    isPartOf: { '@id': IDS.website },
    about: { '@id': IDS.app },
    image: absoluteUrl('/opengraph-image.png'),
  };
}

export interface Faq {
  q: string;
  a: string;
}

export function faqSchema(faqs: readonly Faq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: readonly Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export interface HowToStep {
  name: string;
  text: string;
}

export function howToSchema(input: {
  name: string;
  description: string;
  path: string;
  steps: readonly HowToStep[];
  totalTime?: string;
}) {
  return {
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    totalTime: input.totalTime ?? 'PT1M',
    tool: [{ '@type': 'HowToTool', name: 'A web browser and a keyboard' }],
    step: input.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      url: absoluteUrl(`${input.path}#step-${i + 1}`),
    })),
  };
}

/** Wraps several schema nodes in one @graph document. */
export function graph(...nodes: readonly object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
