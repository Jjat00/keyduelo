import Link from 'next/link';
import type { ReactNode } from 'react';
import { JsonLd } from './JsonLd';
import { Cta, H2, Lead, P } from './Prose';
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  graph,
  type Crumb,
  type Faq,
} from '@/lib/seo/jsonld';
import { ES_HUB, SEO_PAGES, getPage, type Locale, type PageKey } from '@/lib/seo/pages';
import { AUTHOR, CONTENT_UPDATED, REPO_URL } from '@/lib/seo/site';

const UI: Record<
  Locale,
  {
    faq: string;
    updated: string;
    by: string;
    source: string;
    related: string;
    switchLang: string;
  }
> = {
  en: {
    faq: 'Frequently asked questions',
    updated: 'Updated',
    by: 'by',
    source: 'source on GitHub',
    related: 'Keep reading',
    switchLang: 'Leer en español',
  },
  es: {
    faq: 'Preguntas frecuentes',
    updated: 'Actualizado el',
    by: 'por',
    source: 'código en GitHub',
    related: 'Sigue leyendo',
    switchLang: 'Read in English',
  },
};

function formatDate(iso: string, locale: Locale): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
    dateStyle: 'long',
    timeZone: 'UTC',
  });
}

export interface ContentPageProps {
  pageKey: PageKey;
  locale: Locale;
  /** The visible H1 (may differ from the <title> in the registry). */
  heading: string;
  /** One-paragraph, answer-first summary shown under the H1. */
  lead: string;
  faqs?: readonly Faq[];
  /** Extra JSON-LD nodes (HowTo, ItemList…) merged into the page @graph. */
  schema?: readonly object[];
  children: ReactNode;
}

/**
 * Shell for every guide page: breadcrumbs, H1, lead, CTAs, body, FAQ,
 * freshness/author line, language switch and related links. Emits the
 * Article + BreadcrumbList (+ FAQPage) JSON-LD for the page.
 *
 * `lang` is set on <main> because the root <html> is `en` and the App
 * Router can't change it per route without a second root layout.
 */
export function ContentPage({
  pageKey,
  locale,
  heading,
  lead,
  faqs,
  schema = [],
  children,
}: ContentPageProps) {
  const t = UI[locale];
  const page = getPage(pageKey);
  const meta = page[locale];
  const other: Locale = locale === 'en' ? 'es' : 'en';
  const twin = page[other];

  const crumbs: Crumb[] =
    locale === 'en'
      ? [
          { name: 'keyduelo', path: '/' },
          { name: meta.label, path: meta.path },
        ]
      : [
          { name: 'keyduelo', path: '/' },
          { name: ES_HUB.label, path: ES_HUB.path },
          { name: meta.label, path: meta.path },
        ];

  const nodes: object[] = [
    articleSchema({ title: meta.title, description: meta.description, path: meta.path, locale }),
    breadcrumbSchema(crumbs),
    ...(faqs && faqs.length > 0 ? [faqSchema(faqs)] : []),
    ...schema,
  ];

  const related = SEO_PAGES.filter((p) => p.key !== pageKey).map((p) => p[locale]);

  return (
    <main lang={locale} className="mx-auto w-full max-w-3xl flex-1 px-6 pb-16 pt-24 font-mono">
      <JsonLd data={graph(...nodes)} />

      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-sub">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <span key={c.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {last ? (
                <span aria-current="page" className="text-text">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="transition-colors hover:text-text">
                  {c.name}
                </Link>
              )}
            </span>
          );
        })}
      </nav>

      <article>
        <header>
          <h1 className="text-2xl leading-snug text-text sm:text-3xl">{heading}</h1>
          <Lead>{lead}</Lead>
          <p className="mt-3 text-xs text-sub">
            {t.updated}{' '}
            <time dateTime={CONTENT_UPDATED}>{formatDate(CONTENT_UPDATED, locale)}</time>
            {' '}
            {t.by}{' '}
            <a href={AUTHOR.url} rel="author" className="text-text/80 hover:text-text">
              {AUTHOR.name}
            </a>
            {' · '}
            <Link href={twin.path} hrefLang={other} lang={other} className="hover:text-text">
              {t.switchLang}
            </Link>
          </p>
          <Cta locale={locale} className="mt-6" />
        </header>

        {children}

        {faqs && faqs.length > 0 && (
          <section aria-labelledby="faq">
            <H2 id="faq">{t.faq}</H2>
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="mt-6 text-base text-text">{f.q}</h3>
                <P>{f.a}</P>
              </div>
            ))}
          </section>
        )}

        <footer className="mt-12 border-t border-sub/20 pt-8">
          <Cta locale={locale} />
          <p className="mt-6 text-xs text-sub">
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-text">
              {t.source}
            </a>
          </p>
          <nav aria-label={t.related} className="mt-6">
            <p className="text-xs uppercase tracking-wider text-sub">{t.related}</p>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {related.map((r) => (
                <li key={r.path}>
                  <Link href={r.path} className="text-text/80 underline-offset-4 hover:text-main hover:underline">
                    {r.label}
                  </Link>
                </li>
              ))}
              {locale === 'es' && (
                <li>
                  <Link href={ES_HUB.path} className="text-text/80 underline-offset-4 hover:text-main hover:underline">
                    {ES_HUB.label}
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </footer>
      </article>
    </main>
  );
}
