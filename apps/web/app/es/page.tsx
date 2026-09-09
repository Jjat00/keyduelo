import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { A, Cta, H2, Lead, P, Ul } from '@/components/seo/Prose';
import { breadcrumbSchema, graph } from '@/lib/seo/jsonld';
import { ES_HUB, SEO_PAGES } from '@/lib/seo/pages';
import { CONTENT_UPDATED, OG_IMAGE, absoluteUrl } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: ES_HUB.title,
  description: ES_HUB.description,
  alternates: { canonical: ES_HUB.path },
  openGraph: {
    title: ES_HUB.title,
    description: ES_HUB.description,
    url: ES_HUB.path,
    type: 'website',
    locale: 'es_ES',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: ES_HUB.title,
    description: ES_HUB.description,
    images: [OG_IMAGE],
  },
};

const schema = graph(
  {
    '@type': 'CollectionPage',
    '@id': absoluteUrl(`${ES_HUB.path}#page`),
    name: ES_HUB.title,
    description: ES_HUB.description,
    url: absoluteUrl(ES_HUB.path),
    inLanguage: 'es',
    dateModified: CONTENT_UPDATED,
    hasPart: SEO_PAGES.map((p) => ({
      '@type': 'WebPage',
      name: p.es.title,
      url: absoluteUrl(p.es.path),
      inLanguage: 'es',
    })),
  },
  breadcrumbSchema([
    { name: 'keyduelo', path: '/' },
    { name: ES_HUB.label, path: ES_HUB.path },
  ]),
);

export default function SpanishHubPage() {
  return (
    <main lang="es" className="mx-auto w-full max-w-3xl flex-1 px-6 pb-16 pt-24 font-mono">
      <JsonLd data={schema} />
      <nav aria-label="Ruta" className="mb-6 flex items-center gap-2 text-xs text-sub">
        <Link href="/" className="transition-colors hover:text-text">
          keyduelo
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="text-text">
          español
        </span>
      </nav>

      <h1 className="text-2xl leading-snug text-text sm:text-3xl">
        keyduelo en español: test de mecanografía y carreras con amigos
      </h1>
      <Lead>
        keyduelo es un test de mecanografía gratuito, sin registro y sin anuncios, con salas en
        tiempo real para competir con amigos por el mayor WPM. La interfaz está en inglés, pero no
        hace falta leer nada: abres la página y escribes. Estas guías explican cómo funciona en
        español.
      </Lead>
      <Cta locale="es" className="mt-6" />

      <H2 id="guias">Guías</H2>
      <Ul>
        {SEO_PAGES.map((p) => (
          <li key={p.key}>
            <A href={p.es.path}>{p.es.title}</A>
            <span className="block text-sm text-sub">{p.es.description}</span>
          </li>
        ))}
      </Ul>

      <H2 id="que-es">Qué es keyduelo</H2>
      <P>
        Un test de mecanografía al estilo Monkeytype (15, 30 o 60 segundos, o 10 a 100 palabras)
        y un modo multijugador donde creas una sala, compartes un código de 5 letras y todos
        escriben el mismo texto al mismo tiempo, con barras de progreso en vivo y un ranking que
        decide el servidor. Es software libre (GPL-3.0), creado por Jaime Aza y publicado en abril
        de 2026.
      </P>
    </main>
  );
}
