import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { BRAND, OG_IMAGE_ALT, SITE_URL } from './site';

/**
 * Shared renderer for the Open Graph / Twitter card image (1200x630).
 * Both `app/opengraph-image.tsx` and `app/twitter-image.tsx` call this so
 * the two files can each declare the static `size`/`alt`/`contentType`
 * exports Next.js reads at build time.
 *
 * Fonts are read from `assets/` (process.cwd() is the Next.js project dir).
 * Satori (the engine behind ImageResponse) needs TTF/OTF, not woff2.
 */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_ALT = OG_IMAGE_ALT;

const TYPED = 'race your friends to the fastest wpm';
const TYPED_DONE = 22;

export async function renderOgImage(): Promise<ImageResponse> {
  const [regular, semibold] = await Promise.all([
    readFile(join(process.cwd(), 'assets/GeistMono-Regular.ttf')),
    readFile(join(process.cwd(), 'assets/GeistMono-SemiBold.ttf')),
  ]);
  const host = SITE_URL.replace(/^https?:\/\//, '');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: BRAND.bg,
          color: BRAND.text,
          fontFamily: 'Geist Mono',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 28,
            color: BRAND.sub,
          }}
        >
          <div style={{ display: 'flex', fontWeight: 600 }}>
            <span style={{ color: BRAND.text }}>key</span>
            <span style={{ color: BRAND.main }}>duelo</span>
          </div>
          <div style={{ display: 'flex' }}>{host}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', fontSize: 132, fontWeight: 600, lineHeight: 1 }}>
            <span style={{ color: BRAND.text }}>key</span>
            <span style={{ color: BRAND.main }}>duelo</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: 44, lineHeight: 1.2 }}>
            <span style={{ color: BRAND.text }}>{TYPED.slice(0, TYPED_DONE)}</span>
            <span
              style={{
                display: 'flex',
                width: 5,
                height: 50,
                background: BRAND.main,
                marginLeft: 2,
                marginRight: 2,
              }}
            />
            <span style={{ color: BRAND.sub }}>{TYPED.slice(TYPED_DONE)}</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', gap: 56 }}>
            <Stat label="wpm" value="112" highlight />
            <Stat label="acc" value="98%" />
            <Stat label="time" value="15s" />
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: BRAND.sub }}>
            free · no account · open source
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Geist Mono', data: regular, weight: 400, style: 'normal' },
        { name: 'Geist Mono', data: semibold, weight: 600, style: 'normal' },
      ],
    },
  );
}

function Stat({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <span
        style={{
          fontSize: highlight ? 72 : 48,
          fontWeight: 600,
          lineHeight: 1,
          color: highlight ? BRAND.main : BRAND.text,
        }}
      >
        {value}
      </span>
      <span style={{ fontSize: 24, color: BRAND.sub, marginTop: 8 }}>{label}</span>
    </div>
  );
}
