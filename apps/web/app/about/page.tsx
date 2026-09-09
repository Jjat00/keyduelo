import type { Metadata } from 'next';
import { ContentPage } from '@/components/seo/ContentPage';
import { A, H2, P, Strong, Ul } from '@/components/seo/Prose';
import type { Faq } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/pages';
import { AUTHOR, REPO_URL } from '@/lib/seo/site';

export const metadata: Metadata = pageMetadata('about', 'en');

const FAQS: Faq[] = [
  {
    q: 'Is keyduelo free?',
    a: 'Yes, completely. There is no premium tier, no ads and no account. It runs on the free tiers of Vercel and Cloudflare and its source code is public.',
  },
  {
    q: 'Is keyduelo open source?',
    a: 'Yes, under the GPL-3.0 license, the same license as Monkeytype. The repository at github.com/Jjat00/keyduelo contains the Next.js front end, the Cloudflare Worker with the Durable Objects and the shared typing engine.',
  },
  {
    q: 'Is keyduelo affiliated with Monkeytype or TypeRacer?',
    a: 'No. keyduelo is an independent project inspired by Monkeytype’s design. It contains no Monkeytype code and does not use its name or logo; the engine, the hooks, the worker and the protocol were written from scratch.',
  },
  {
    q: 'Why the name keyduelo?',
    a: '"Key" as in keyboard, "duelo" is Spanish for duel: a keyboard duel. The project was first published in April 2026 under a working name and renamed keyduelo when public rooms arrived.',
  },
  {
    q: 'How do I report a bug or suggest a feature?',
    a: 'Open an issue on GitHub. Pull requests are welcome; the README documents the architecture, the local setup and the technical decisions.',
  },
];

export default function AboutPage() {
  return (
    <ContentPage
      pageKey="about"
      locale="en"
      heading="About keyduelo"
      lead="keyduelo is a free, open-source typing race: a Monkeytype-style typing test for solo practice and real-time rooms where friends type the same text and compete for the highest WPM. It was built by Jaime Aza and first published in April 2026."
      faqs={FAQS}
    >
      <H2 id="what">What keyduelo is</H2>
      <P>
        keyduelo is a web app with two screens. The home page is a typing test that starts on
        your first keystroke and reports WPM, raw WPM and accuracy. The play page is a lobby
        where anyone can create a room, share a 5-letter code and race friends on the same text,
        with live progress bars, a synchronized countdown and a server-side ranking. There are no
        accounts, no ads and no tracking.
      </P>

      <H2 id="who">Who builds it</H2>
      <P>
        keyduelo is a personal project by <A href={AUTHOR.url}>{AUTHOR.name}</A>, a software
        engineer from Colombia who builds web products with Next.js, Django and AI agents. It is
        not a company. The code, the decisions and the mistakes are documented in the open at{' '}
        <A href={REPO_URL}>github.com/Jjat00/keyduelo</A>.
      </P>

      <H2 id="stack">How it is built</H2>
      <Ul>
        <li>
          <Strong>Front end:</Strong> Next.js 16 with the App Router, React 19 and Tailwind CSS
          4, deployed on Vercel.
        </li>
        <li>
          <Strong>Rooms:</Strong> a Cloudflare Worker with Durable Objects. One object per room
          holds the players, the text, the clock and the ranking; a singleton registry feeds the
          public lobby.
        </li>
        <li>
          <Strong>Real time:</Strong> WebSockets with hibernation, so an idle room costs nothing.
        </li>
        <li>
          <Strong>Typing engine:</Strong> a pure TypeScript state machine shared by the browser
          and the server, with no React inside, so the same code can validate results.
        </li>
        <li>
          <Strong>Text:</Strong> a generator over 282 common English words with optional
          punctuation, avoiding the same word twice in a row.
        </li>
      </Ul>

      <H2 id="privacy">Privacy</H2>
      <P>
        There is nothing to sign up for and nothing is tracked. Your theme, sound and test
        settings live in your browser&apos;s local storage, and so does your nickname. Solo tests
        never leave your device. In a room, your browser sends progress counters (position and
        WPM) to the room server, never the keys you press, and the room disappears from memory
        when its host leaves.
      </P>

      <H2 id="license">Inspiration and license</H2>
      <P>
        keyduelo is inspired by <A href="https://monkeytype.com">Monkeytype</A>: the scrolling
        text, the caret, the metrics and the lowercase mood come from there. No Monkeytype code is
        included; the engine, hooks, components, worker and protocol were written from scratch and
        the word list is our own selection. The Nord, Dracula and Gruvbox palettes are used under
        their MIT licenses. keyduelo itself is released under{' '}
        <A href="https://www.gnu.org/licenses/gpl-3.0.html">GPL-3.0</A>.
      </P>

      <H2 id="roadmap">What might come next</H2>
      <P>
        Under consideration, in no particular order: word lists in other languages (Spanish
        first), custom texts for rooms, and optional accounts with history and leaderboards.
        Nothing here is a promise; the repository&apos;s README tracks what actually ships.
      </P>

      <H2 id="contact">Contact and contributions</H2>
      <P>
        Bugs, ideas and pull requests go to{' '}
        <A href={`${REPO_URL}/issues`}>the GitHub issues</A>. The README explains the
        architecture, the local setup with pnpm and wrangler, and the reasoning behind the main
        technical decisions.
      </P>
    </ContentPage>
  );
}
