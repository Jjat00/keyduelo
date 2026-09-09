/**
 * Single source of truth for site-wide SEO constants.
 *
 * `NEXT_PUBLIC_SITE_URL` lets the canonical origin move to a custom domain
 * (e.g. https://keyduelo.com) without touching code: metadata, sitemap,
 * robots and JSON-LD all derive absolute URLs from here.
 */
export const SITE_URL: string = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://keyduelo.vercel.app'
).replace(/\/+$/, '');

export const SITE_NAME = 'keyduelo';

export const SITE_TITLE = 'keyduelo: free multiplayer typing race & WPM test';

export const SITE_DESCRIPTION =
  'Free multiplayer typing race and WPM typing test. Create a room, share a 5-letter code and race friends on the same text live. No account, no ads, open source.';

export const REPO_URL = 'https://github.com/Jjat00/keyduelo';

export const AUTHOR = {
  name: 'Jaime Aza',
  url: 'https://jaimeaza.tech',
  github: 'https://github.com/Jjat00',
} as const;

/** ISO date of the last substantive content revision (shown on pages + JSON-LD). */
export const CONTENT_UPDATED = '2026-09-09';
/** ISO date the content pages were first published. */
export const CONTENT_PUBLISHED = '2026-09-09';

/** Dracula palette (the default theme) — used for OG image + manifest colors. */
export const BRAND = {
  bg: '#282a36',
  text: '#f8f8f2',
  sub: '#6272a4',
  subAlt: '#44475a',
  main: '#bd93f9',
} as const;

export function absoluteUrl(path: string): string {
  return path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export const OG_IMAGE_ALT = 'keyduelo: free multiplayer typing race and WPM typing test';

/**
 * The social card lives in public/ (not as an app/opengraph-image file) so
 * every route, the home included, declares it explicitly with its alt text.
 * A file-based image in a segment overrides `openGraph.images` there and is
 * NOT inherited by child segments that declare their own openGraph, which
 * made the tags inconsistent (learned the hard way on Constela).
 */
export const OG_IMAGE = {
  url: '/opengraph-image.png',
  width: 1200,
  height: 630,
  alt: OG_IMAGE_ALT,
} as const;
