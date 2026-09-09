import type { Metadata } from 'next';
import { OG_IMAGE } from './site';

/**
 * Registry of the indexable content pages, in both languages.
 *
 * Everything that needs "the list of pages" (sitemap, footer nav, hreflang
 * alternates, breadcrumbs, related links) reads from here so a new page is
 * added in exactly one place.
 *
 * The app screens themselves (`/`, `/play`) are NOT listed here: they keep
 * their own metadata and are added to the sitemap explicitly.
 */
export type Locale = 'en' | 'es';

export type PageKey = 'typingTest' | 'race' | 'wpm' | 'compare' | 'about';

export interface LocalizedPage {
  path: string;
  /** <title> (without the " · keyduelo" suffix added by the layout template). */
  title: string;
  /** Meta description, 150–160 chars. */
  description: string;
  /** Short label for nav/footer/related links. */
  label: string;
}

export interface SeoPage {
  key: PageKey;
  en: LocalizedPage;
  es: LocalizedPage;
}

export const SEO_PAGES: readonly SeoPage[] = [
  {
    key: 'typingTest',
    en: {
      path: '/typing-test',
      title: 'Free Typing Test: Measure Your WPM in 15 Seconds',
      description:
        'Take a free typing test with no sign-up. Pick 15, 30 or 60 seconds or a word count, type, and get your WPM, raw speed and accuracy instantly, Monkeytype style.',
      label: 'typing test',
    },
    es: {
      path: '/es/test-de-mecanografia',
      title: 'Test de mecanografía gratis: mide tus PPM en 15 s',
      description:
        'Test de mecanografía online gratis y sin registro. Elige 15, 30 o 60 segundos o un número de palabras, escribe y obtén tus palabras por minuto y tu precisión.',
      label: 'test de mecanografía',
    },
  },
  {
    key: 'race',
    en: {
      path: '/multiplayer-typing-race',
      title: 'Multiplayer Typing Race With Friends (Room Codes)',
      description:
        'Race friends in a real-time multiplayer typing race. Create a room in one click, share a 5-letter code, everyone types the same text and the fastest WPM wins.',
      label: 'race friends',
    },
    es: {
      path: '/es/carrera-de-mecanografia-multijugador',
      title: 'Carrera de mecanografía multijugador con amigos',
      description:
        'Carrera de mecanografía en tiempo real: crea una sala en un clic, comparte un código de 5 letras y todos escriben el mismo texto. Gana el mayor WPM. Sin cuenta.',
      label: 'carrera con amigos',
    },
  },
  {
    key: 'wpm',
    en: {
      path: '/wpm',
      title: 'What Is WPM? How Typing Speed Is Calculated',
      description:
        'WPM (words per minute) counts 5 characters as one word. The exact formula behind WPM, raw WPM and accuracy, the average typing speed, and how to improve yours.',
      label: 'what is wpm',
    },
    es: {
      path: '/es/palabras-por-minuto',
      title: 'Qué es WPM (palabras por minuto) y cómo se calcula',
      description:
        'WPM o PPM cuenta 5 caracteres como una palabra. La fórmula exacta de WPM, WPM bruto y precisión, cuál es una velocidad de escritura promedio y cómo mejorarla.',
      label: 'qué es wpm',
    },
  },
  {
    key: 'compare',
    en: {
      path: '/compare',
      title: 'keyduelo vs TypeRacer vs Monkeytype vs Typer.io',
      description:
        'Honest comparison of typing race and typing test sites: rooms with friends, accounts, spectators, texts, open source and ads. Find your TypeRacer alternative.',
      label: 'compare',
    },
    es: {
      path: '/es/comparativa',
      title: 'Comparativa: keyduelo vs TypeRacer vs Monkeytype',
      description:
        'Comparativa honesta de sitios de carreras y tests de mecanografía: salas con amigos, cuentas, espectadores y anuncios. Elige tu alternativa a TypeRacer.',
      label: 'comparativa',
    },
  },
  {
    key: 'about',
    en: {
      path: '/about',
      title: 'About keyduelo: Open-Source Typing Race',
      description:
        'keyduelo is a free, open-source (GPL-3.0) typing race built by Jaime Aza with Next.js and Cloudflare Durable Objects. No accounts, no ads, no tracking.',
      label: 'about',
    },
    es: {
      path: '/es/acerca-de',
      title: 'Acerca de keyduelo: carrera de mecanografía libre',
      description:
        'keyduelo es una carrera de mecanografía gratuita y de código abierto (GPL-3.0) creada por Jaime Aza con Next.js y Cloudflare Durable Objects. Sin cuentas.',
      label: 'acerca de',
    },
  },
];

/** Spanish hub page (no English twin: the app UI itself is English). */
export const ES_HUB: LocalizedPage = {
  path: '/es',
  title: 'keyduelo en español: mecanografía y carreras',
  description:
    'Guías en español de keyduelo: test de mecanografía gratis, carrera multijugador con amigos, qué es WPM y comparativa con TypeRacer y Monkeytype. Sin registro.',
  label: 'español',
};

export function getPage(key: PageKey): SeoPage {
  const page = SEO_PAGES.find((p) => p.key === key);
  if (!page) throw new Error(`unknown seo page: ${key}`);
  return page;
}

/**
 * Canonical + hreflang for a localized content page. Relative paths are
 * resolved against `metadataBase` (set in the root layout).
 */
export function alternatesFor(key: PageKey, locale: Locale): NonNullable<Metadata['alternates']> {
  const page = getPage(key);
  return {
    canonical: page[locale].path,
    languages: {
      en: page.en.path,
      es: page.es.path,
      'x-default': page.en.path,
    },
  };
}

/** Builds the full `Metadata` object for a content page (title, description, canonical, OG). */
export function pageMetadata(key: PageKey, locale: Locale): Metadata {
  const page = getPage(key)[locale];
  return {
    title: page.title,
    description: page.description,
    alternates: alternatesFor(key, locale),
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.path,
      type: 'article',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [OG_IMAGE],
    },
  };
}
