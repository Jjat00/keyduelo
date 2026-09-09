import type { Metadata } from 'next';
import { ContentPage } from '@/components/seo/ContentPage';
import { A, Callout, H2, H3, P, Strong, Table, Ul } from '@/components/seo/Prose';
import type { Faq } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/pages';
import { REPO_URL } from '@/lib/seo/site';

export const metadata: Metadata = pageMetadata('compare', 'en');

const FAQS: Faq[] = [
  {
    q: 'Does Monkeytype have multiplayer?',
    a: 'Not on the main site as of September 2026. Monkeytype is a solo typing test; a multiplayer mode called Tribe has existed as a development preview for years but is not part of monkeytype.com. To race friends on a Monkeytype-style text, keyduelo is the closest option.',
  },
  {
    q: 'Is keyduelo a TypeRacer alternative?',
    a: 'For racing friends, yes: create a room, share a code, race, no accounts. It is not a replacement for TypeRacer’s public ladder, quote library or long-term profiles, which keyduelo does not have.',
  },
  {
    q: 'Which typing site is best for practicing speed alone?',
    a: 'Monkeytype, by a wide margin of customization: many languages, quote and zen modes, custom texts and dozens of themes. keyduelo covers the basic solo test (time and words modes, punctuation) with the same conventions, which makes it a fair warm-up before a race.',
  },
  {
    q: 'Are these typing sites free?',
    a: 'All four can be used for free. TypeRacer shows ads and sells a premium tier; Monkeytype shows optional ads that can be turned off; keyduelo has no ads or paid tier; Typer.io does not document a paid tier on its public pages.',
  },
];

export default function ComparePage() {
  return (
    <ContentPage
      pageKey="compare"
      locale="en"
      heading="keyduelo vs TypeRacer vs Monkeytype vs Typer.io: which typing site fits you?"
      lead="Short answer: Monkeytype for solo practice with endless customization, TypeRacer for quote-based public races with almost two decades of history, Typer.io for large group races, and keyduelo when you want to race friends in seconds with no account, watch as a spectator and trust a server-side timer, on an open-source stack."
      faqs={FAQS}
    >
      <Callout title="How this comparison was made">
        The facts below were checked against each site&apos;s public pages on September 9, 2026.
        keyduelo is our own project, so the table sticks to verifiable features rather than
        opinions. If something changed,{' '}
        <A href={`${REPO_URL}/issues`}>open an issue</A> and we will correct it.
      </Callout>

      <H2 id="table">Feature comparison (September 2026)</H2>
      <Table
        head={['Feature', 'keyduelo', 'TypeRacer', 'Monkeytype', 'Typer.io']}
        rows={[
          ['Race friends in your own room', 'Yes: 5-letter code, one click', 'Yes: private track via custom link', 'No (solo test)', 'Yes: private lobbies'],
          ['Account needed to race', 'No', 'Optional (free account for stats)', 'No for tests; account for history', 'Sign-in offered; not documented as required'],
          ['Spectator mode', 'Yes, join any room even mid-race', 'Not offered', 'Not applicable', 'Not documented'],
          ['Text source', 'Random common English words; words or time mode; optional punctuation', 'Quotes from books, films, songs and games, about 20 to 930 characters', 'Words, time, quotes, zen and custom text; many languages', 'Quotes; custom text in private lobbies'],
          ['Timing and anti-cheat', 'Server-authoritative text, clock and ranking', 'Anti-cheat typing test after very fast results', 'Leaderboard results validated', 'Not documented'],
          ['Themes', '5 (Dracula default)', 'Limited', 'Dozens, fully customizable', 'Not documented'],
          ['Open source', 'Yes, GPL-3.0', 'No', 'Yes, GPL-3.0', 'No'],
          ['Ads', 'None', 'Ads; premium removes them', 'Optional, can be disabled', 'Not documented'],
          ['Price', 'Free', 'Free, optional premium', 'Free', 'Free'],
          ['Launched', 'April 2026', 'March 2008', '2020', 'Not documented'],
        ]}
      />

      <H2 id="keyduelo">keyduelo</H2>
      <P>
        <Strong>What it is:</Strong> a Monkeytype-style typing test plus real-time rooms where
        friends type the same text and compete for the highest WPM. Rooms run on Cloudflare
        Durable Objects; the front end is Next.js.
      </P>
      <P>
        <Strong>Best for:</Strong> settling who is fastest in a group chat in under a minute,
        classroom or team warm-ups, and anyone who wants to watch a race as a spectator.
      </P>
      <P>
        <Strong>Watch out:</Strong> it is a young project (April 2026). English word list only,
        no accounts, history or leaderboards yet, and five themes rather than dozens.
      </P>

      <H2 id="typeracer">TypeRacer</H2>
      <P>
        <Strong>What it is:</Strong> the original online typing race, launched in March 2008.
        Players type quotes from books, films, songs and games while small cars advance on a
        track, and every error must be fixed before continuing.
      </P>
      <P>
        <Strong>Best for:</Strong> quote-based races against strangers, long-term profiles and a
        global ladder with almost two decades of results.
      </P>
      <P>
        <Strong>Watch out:</Strong> ads unless you pay for premium, and quotes with full
        punctuation and capitalization make its WPM numbers lower than word-list tests.
      </P>

      <H2 id="monkeytype">Monkeytype</H2>
      <P>
        <Strong>What it is:</Strong> the reference minimalist typing test, open source under
        GPL-3.0 with more than 20,000 GitHub stars. Time, words, quote, zen and custom modes, many
        languages and a huge theme library.
      </P>
      <P>
        <Strong>Best for:</Strong> solo practice with every knob available and an account that
        tracks your history.
      </P>
      <P>
        <Strong>Watch out:</Strong> no racing with friends on the main site. keyduelo borrows its
        conventions (five-character words, net versus raw WPM, persistent errors) so you can warm
        up there and race here with comparable numbers.
      </P>

      <H2 id="typer">Typer.io</H2>
      <P>
        <Strong>What it is:</Strong> a multiplayer typing race site with public matches and group
        play against friends, including custom text in private lobbies.
      </P>
      <P>
        <Strong>Best for:</Strong> large group races.
      </P>
      <P>
        <Strong>Watch out:</Strong> closed source, and fewer public details about accounts,
        timing or ads than the other three.
      </P>

      <H2 id="choose">How to choose</H2>
      <Ul>
        <li>
          Want to race friends right now, no sign-ups:{' '}
          <A href="/multiplayer-typing-race">keyduelo</A>.
        </li>
        <li>Want quotes, strangers and a global ladder: TypeRacer.</li>
        <li>Want to practice alone with every setting imaginable: Monkeytype.</li>
        <li>Want a big party race: Typer.io.</li>
      </Ul>

      <H3 id="alternative">Is keyduelo a TypeRacer alternative?</H3>
      <P>
        For the &quot;race my friends&quot; use case, yes, and with less friction: no account, a
        5-letter code instead of a shared link to a private track, live spectators and a
        server-side timer. For public ladders, quotes and profiles, TypeRacer remains the
        reference.
      </P>
    </ContentPage>
  );
}
