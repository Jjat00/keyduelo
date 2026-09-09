import type { MetadataRoute } from 'next';
import { BRAND, SITE_DESCRIPTION } from '@/lib/seo/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'keyduelo: multiplayer typing race',
    short_name: 'keyduelo',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: BRAND.bg,
    theme_color: BRAND.bg,
    lang: 'en',
    categories: ['games', 'education', 'productivity'],
    icons: [
      { src: '/icon.png', sizes: '1016x930', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '1016x930', type: 'image/png' },
    ],
  };
}
