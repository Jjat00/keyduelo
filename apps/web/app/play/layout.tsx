import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/seo/site';

const title = 'Play With Friends: Create a Typing Race Room';
const description =
  'Create a multiplayer typing race room in one click, share the 5-letter code, and race friends in real time. Join any public room as a player or spectator.';

/**
 * Metadata-only layout: `page.tsx` is a client component and can't export
 * `metadata`, so the lobby's title/description/canonical live here.
 * `alternates` overrides the root canonical ("/") for this subtree.
 */
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/play' },
  openGraph: { title, description, url: '/play', type: 'website', images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
};

export default function PlayLayout({ children }: { children: React.ReactNode }) {
  return children;
}
