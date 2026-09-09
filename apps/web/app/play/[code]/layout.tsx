import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/seo/site';

/**
 * Room pages are ephemeral (a room dies when its host leaves), so they are
 * `noindex`: a shared link still unfurls with a title and the OG image, but
 * search engines never keep a dead room around as a result.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const room = code.toUpperCase();
  const title = `Room ${room}: typing race`;
  const description = `Join typing race room ${room} on keyduelo. Type the same text as everyone else in real time; fastest WPM wins. No account needed.`;
  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: `/play/${room}` },
    openGraph: { title, description, url: `/play/${room}`, type: 'website', images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
  };
}

export default function RoomLayout({ children }: { children: React.ReactNode }) {
  return children;
}
