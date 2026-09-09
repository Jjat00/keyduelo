import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Locale } from '@/lib/seo/pages';

/**
 * Minimal typographic primitives for the content pages. Hand-rolled instead
 * of @tailwindcss/typography so the pages inherit the app's theme tokens
 * (bg / text / sub / main) and keep the Monkeytype-style mono look.
 */

const BODY = 'text-[15px] leading-7 text-text/90';

export function H2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mt-12 mb-3 scroll-mt-20 text-xl leading-snug text-main">
      {children}
    </h2>
  );
}

export function H3({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3 id={id} className="mt-8 mb-2 scroll-mt-20 text-base text-text">
      {children}
    </h3>
  );
}

export function P({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`my-3 ${BODY} ${className}`}>{children}</p>;
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-base leading-7 text-sub">{children}</p>;
}

export function Ul({ children }: { children: ReactNode }) {
  return <ul className={`my-3 list-disc space-y-1.5 pl-6 ${BODY}`}>{children}</ul>;
}

export function Ol({ children }: { children: ReactNode }) {
  return <ol className={`my-3 list-decimal space-y-1.5 pl-6 ${BODY}`}>{children}</ol>;
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-text">{children}</strong>;
}

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="rounded bg-sub-alt px-1.5 py-0.5 text-[13px] text-text">{children}</kbd>;
}

/** Internal links go through next/link; external ones open in a new tab. */
export function A({ href, children, hrefLang }: { href: string; children: ReactNode; hrefLang?: string }) {
  const cls = 'text-main underline decoration-main/40 underline-offset-4 transition-colors hover:decoration-main';
  if (href.startsWith('/')) {
    return (
      <Link href={href} hrefLang={hrefLang} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  );
}

export function Formula({ children }: { children: ReactNode }) {
  return (
    <pre className="my-4 overflow-x-auto rounded bg-sub-alt px-4 py-3 text-[13px] leading-6 text-text">
      {children}
    </pre>
  );
}

export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="my-5 rounded border-l-2 border-main bg-sub-alt/60 px-4 py-3 text-sm leading-6 text-text/90">
      {title && <p className="mb-1 text-xs uppercase tracking-wider text-main">{title}</p>}
      {children}
    </aside>
  );
}

export interface TableProps {
  caption?: string;
  head: readonly string[];
  rows: readonly (readonly ReactNode[])[];
}

/** Responsive table: scrolls horizontally inside its own container on narrow screens. */
export function Table({ caption, head, rows }: TableProps) {
  return (
    <div className="my-4 overflow-x-auto rounded bg-sub-alt/40">
      <table className="w-full min-w-[520px] border-collapse text-left text-[13px] leading-6">
        {caption && <caption className="px-3 pt-3 pb-1 text-left text-xs text-sub">{caption}</caption>}
        <thead>
          <tr className="border-b border-sub/30 text-xs uppercase tracking-wider text-sub">
            {head.map((h) => (
              <th key={h} scope="col" className="px-3 py-2 font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-sub/15 align-top last:border-0">
              {row.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="px-3 py-2 font-normal text-text">
                    {cell}
                  </th>
                ) : (
                  <td key={j} className="px-3 py-2 text-text/85">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export interface Step {
  name: string;
  text: ReactNode;
}

/** Numbered steps with `#step-N` anchors, matching the HowTo JSON-LD urls. */
export function Steps({ steps }: { steps: readonly Step[] }) {
  return (
    <ol className="my-4 space-y-4">
      {steps.map((s, i) => (
        <li key={s.name} id={`step-${i + 1}`} className="flex scroll-mt-20 gap-4">
          <span
            aria-hidden="true"
            className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded bg-sub-alt text-sm text-main"
          >
            {i + 1}
          </span>
          <div className={BODY}>
            <p className="text-text">{s.name}</p>
            <p className="text-text/80">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

const CTA_LABELS: Record<Locale, { solo: string; race: string }> = {
  en: { solo: 'start the typing test', race: 'race friends' },
  es: { solo: 'empezar el test', race: 'competir con amigos' },
};

/** The two calls to action every guide ends with: the app screens themselves. */
export function Cta({ locale, className = '' }: { locale: Locale; className?: string }) {
  const t = CTA_LABELS[locale];
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Link
        href="/"
        className="rounded bg-main px-4 py-2 text-sm font-semibold text-bg transition-colors hover:brightness-110"
      >
        {t.solo} →
      </Link>
      <Link
        href="/play"
        className="rounded bg-sub-alt px-4 py-2 text-sm text-text transition-colors hover:bg-main hover:text-bg"
      >
        {t.race} →
      </Link>
    </div>
  );
}
