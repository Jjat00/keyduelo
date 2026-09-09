/**
 * Renders a JSON-LD block. `<` is escaped to `<` so a string value can
 * never break out of the <script> tag (Next.js docs recommendation). All
 * data comes from our own constants, never from user input.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
