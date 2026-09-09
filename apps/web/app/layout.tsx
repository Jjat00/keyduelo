import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteGraph } from "@/lib/seo/jsonld";
import {
  AUTHOR,
  BRAND,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/seo/site";
import { SettingsProvider } from "@/lib/settings/SettingsProvider";
import { SoundProvider } from "@/lib/sound/SoundProvider";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import { buildNoFlashScript } from "@/lib/theme/noFlashScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Site-wide metadata. Child routes override what they need (title,
 * description, canonical). NOTE: `alternates` is replaced wholesale by a
 * child that defines it, so every indexable route below `/` must set its
 * own canonical or it would inherit "/" (see lib/seo/pages.ts helpers).
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "typing test",
    "typing race",
    "multiplayer typing race",
    "typing speed test",
    "wpm test",
    "race friends typing",
    "typeracer alternative",
    "monkeytype multiplayer",
    "test de mecanografía",
    "carrera de mecanografía",
    "palabras por minuto",
    "key duelo",
    "keyduelo",
  ],
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  category: "games",
  referrer: "origin-when-cross-origin",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    alternateLocale: ["es_ES"],
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: BRAND.bg,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Apply the user's stored theme to the DOM before React hydrates.
          Prevents a "flash of default theme" if they picked a non-default one.
          suppressHydrationWarning above is for the inline-set --color-* style.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: buildNoFlashScript() }}
        />
      </head>
      <body className="min-h-dvh flex flex-col">
        {/* WebSite + WebApplication + Person entities, once for the whole site. */}
        <JsonLd data={siteGraph()} />
        <ThemeProvider>
          <SettingsProvider>
            <SoundProvider>
              <Header />
              {children}
              <Footer />
            </SoundProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
