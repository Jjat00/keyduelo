import type { Metadata } from 'next';
import { ContentPage } from '@/components/seo/ContentPage';
import { A, H2, P, Steps, Strong, Table, Ul } from '@/components/seo/Prose';
import { howToSchema, type Faq } from '@/lib/seo/jsonld';
import { getPage, pageMetadata } from '@/lib/seo/pages';

export const metadata: Metadata = pageMetadata('race', 'en');

const PAGE = getPage('race').en;

const STEPS = [
  {
    name: 'Open the lobby',
    text: 'Go to keyduelo.vercel.app/play. The list of active rooms refreshes every 2 seconds.',
  },
  {
    name: 'Pick a nickname (optional)',
    text: 'Leave it blank and you get a guest name such as guest4821. It is stored only in your browser.',
  },
  {
    name: 'Create a room',
    text: 'Click "create new room". You receive a 5-letter code (letters A to Z and digits 2 to 9, without the ambiguous I, O, 0 and 1) and become the host.',
  },
  {
    name: 'Invite your friends',
    text: 'Use the copy-link or copy-code button in the room header and paste it in your group chat. Whoever opens the link joins instantly, without signing up.',
  },
  {
    name: 'Set the race',
    text: 'As host, choose words (10 to 100) or time (15 to 60 seconds) and whether the text has punctuation. Everyone in the room sees the change live.',
  },
  {
    name: 'Start',
    text: 'Click start. A synchronized 3-2-1 countdown runs on every screen at once.',
  },
  {
    name: 'Race',
    text: 'Type. Each player has a progress bar relative to the leader, refreshed about every 150 milliseconds.',
  },
  {
    name: 'Results and rematch',
    text: 'The ranking shows WPM, accuracy and time for each player. The host clicks "next race" to run it again with a fresh text.',
  },
];

const FAQS: Faq[] = [
  {
    q: 'How many people can join a typing race room?',
    a: 'There is no fixed cap in the room server. Each room runs on its own Cloudflare Durable Object and every participant adds one WebSocket connection. Groups of 2 to 20 are the sweet spot for readable progress bars.',
  },
  {
    q: 'Do my friends need an account to race?',
    a: 'No. Anyone who opens the room link or types the 5-letter code in the lobby joins immediately. If they skip the nickname, keyduelo assigns a guest name.',
  },
  {
    q: 'Can I watch a race without playing?',
    a: 'Yes. Use the spectate button on any room in the lobby, or join a room that is already racing: it opens in spectator mode with the live progress bars and the synchronized countdown.',
  },
  {
    q: 'What happens if the host disconnects?',
    a: 'The room closes and every player and spectator is sent back to the lobby with a notice. Anyone can create a new room in one click. A host who only refreshes the tab keeps the role thanks to a token saved in their browser.',
  },
  {
    q: 'Does distance or latency affect the result?',
    a: 'Your WPM is computed from your own keystrokes in your own browser and sent to the room as progress counters, so a slow connection delays what others see, not your score. In time mode the server clock defines the same start and end for everyone.',
  },
  {
    q: 'Can I race against a bot or use my own text?',
    a: 'Not yet. keyduelo races are human versus human on a text generated from 282 common English words, with optional punctuation. For solo practice, the typing test on the home page is the place to go.',
  },
];

export default function RacePage() {
  return (
    <ContentPage
      pageKey="race"
      locale="en"
      heading="Multiplayer typing race: race your friends with a 5-letter room code"
      lead="Create a room in one click, share the code or the link, and everyone types the exact same text at the exact same moment. Progress bars update live, the server keeps the clock, and the highest WPM wins. Nobody needs an account."
      faqs={FAQS}
      schema={[
        howToSchema({
          name: 'How to start a typing race with friends on keyduelo',
          description: PAGE.description,
          path: PAGE.path,
          totalTime: 'PT1M',
          steps: STEPS,
        }),
      ]}
    >
      <H2 id="how-to">How to start a typing race with friends</H2>
      <Steps steps={STEPS} />

      <H2 id="ranking">How the ranking works</H2>
      <P>
        The rules are enforced by the room server, not by your browser, so nobody wins by editing
        a local clock or a progress message.
      </P>
      <Ul>
        <li>
          <Strong>Time mode:</Strong> everyone stops at the same wall-clock instant. The ranking is
          by WPM; accuracy breaks ties.
        </li>
        <li>
          <Strong>Words mode:</Strong> players who finish the whole text rank first, fastest time
          wins. Players who did not finish are ordered by WPM.
        </li>
        <li>
          The text, the start time and the final ranking are decided by one Cloudflare Durable
          Object per room. Clients only report their progress.
        </li>
      </Ul>

      <H2 id="roles">Host, players and spectators</H2>
      <Table
        head={['Role', 'How you get it', 'Can', "Can't"]}
        rows={[
          ['host', 'You created the room', 'Change settings, start the race, remove players, launch the next race', 'Hand the role to someone else'],
          ['player', 'You joined a room in lobby', 'Mark ready, race, see everyone’s stats', 'Change settings, start, remove players'],
          ['spectator', 'You chose spectate, or joined a room already racing', 'Watch progress bars, countdown and results', 'Type, mark ready, appear in the ranking'],
        ]}
      />
      <P>
        If the host leaves, the room closes and everyone returns to the lobby with a notice. There
        is no confusing hand-off: a new room is one click away.
      </P>

      <H2 id="public-rooms">Public rooms and spectator mode</H2>
      <P>
        The lobby lists every active room with its host, mode, player count and status. Rooms in
        lobby accept players; rooms already racing accept spectators, so a friend who arrives late
        can still watch the finish. Any listed room can be joined by anyone, so share the code with
        the people you want in the race and start as soon as they are in.
      </P>

      <H2 id="why">Why race on keyduelo</H2>
      <Ul>
        <li>
          <Strong>Zero friction:</Strong> no accounts, no downloads, one click to a room, one link
          to invite.
        </li>
        <li>
          <Strong>Fair by design:</Strong> server-authoritative text, timer and ranking.
        </li>
        <li>
          <Strong>Spectators welcome:</Strong> join mid-race and watch.
        </li>
        <li>
          <Strong>Live settings:</Strong> the host changes mode or punctuation and everyone sees it
          instantly.
        </li>
        <li>
          <Strong>Monkeytype feel:</Strong> scrolling text, smooth caret, five themes and optional
          key sounds.
        </li>
        <li>
          <Strong>Free and open source</Strong> (GPL-3.0), no ads, no tracking.
        </li>
      </Ul>

      <H2 id="limits">Current limits</H2>
      <Ul>
        <li>Rooms are ephemeral: when the host leaves, the room closes and nothing is saved.</li>
        <li>No accounts, history or leaderboards yet.</li>
        <li>English word list only; the interface is in English.</li>
        <li>Rooms are visible in the public lobby.</li>
        <li>
          No bots to race against: for solo practice use the{' '}
          <A href="/typing-test">typing test</A>.
        </li>
      </Ul>
    </ContentPage>
  );
}
