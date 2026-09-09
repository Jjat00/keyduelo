import type { MetadataRoute } from 'next';
import { SITE_URL, absoluteUrl } from '@/lib/seo/site';

/**
 * Everything is crawlable. Ephemeral room pages (`/play/XXXXX`) are kept
 * out of the index with a `noindex` meta tag (see app/play/[code]/layout.tsx)
 * rather than a Disallow here, so a room link shared on Discord/WhatsApp can
 * still be fetched for a preview but never becomes a stale search result.
 *
 * AI search crawlers are allowed explicitly: a bot that can't read the site
 * can't cite it in ChatGPT, Perplexity, Claude or Gemini answers.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-SearchBot',
          'anthropic-ai',
          'Google-Extended',
          'Applebot',
          'DuckDuckBot',
        ],
        allow: '/',
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  };
}
