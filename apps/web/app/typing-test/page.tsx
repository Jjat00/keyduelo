import type { Metadata } from 'next';
import { ContentPage } from '@/components/seo/ContentPage';
import { A, Formula, H2, Kbd, Ol, P, Strong, Table, Ul } from '@/components/seo/Prose';
import type { Faq } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/pages';

export const metadata: Metadata = pageMetadata('typingTest', 'en');

const FAQS: Faq[] = [
  {
    q: 'Is the keyduelo typing test free and without registration?',
    a: 'Yes. Open keyduelo and start typing: there is no account, no paywall and no ads. The whole project is open source under the GPL-3.0 license, so you can read exactly how the test works.',
  },
  {
    q: 'Why is my WPM different from Monkeytype or TypeRacer?',
    a: 'Each site uses different texts, timers and error rules. keyduelo follows the Monkeytype conventions: five characters per word, net WPM counts only correct characters, and an error stays counted even after you fix it with Backspace. TypeRacer uses long quotes and blocks you until each error is corrected, which produces lower numbers. Compare results only within the same site and the same setting.',
  },
  {
    q: 'Which test length should I use?',
    a: 'Use 15 seconds for quick repeated attempts and warm-ups, and 60 seconds or 100 words for a result closer to your sustained speed. Short tests usually read higher than long ones because there is no time to tire, so pick one setting and keep it when you track progress.',
  },
  {
    q: 'Can I take the typing test in Spanish?',
    a: 'The word list is English only for now, but the test needs no reading comprehension: you type what you see. Spanish guides live at keyduelo.vercel.app/es, and word lists in other languages are under consideration.',
  },
  {
    q: 'Does the typing test work on a phone or tablet?',
    a: 'It loads in any modern mobile browser, but on-screen keyboards autocorrect and lack the feedback of physical keys, so those results are not comparable with desktop scores. For a fair measurement use a physical keyboard.',
  },
  {
    q: 'Is anything I type sent to a server?',
    a: 'No. In solo mode the text is generated in your browser and the metrics are computed there too. keyduelo has no analytics scripts and stores only your settings locally. Multiplayer rooms use a WebSocket, but they exchange progress counters, never your keystrokes.',
  },
];

export default function TypingTestPage() {
  return (
    <ContentPage
      pageKey="typingTest"
      locale="en"
      heading="Free typing test: measure your WPM in 15 seconds, no sign-up"
      lead="keyduelo opens straight into the test. Press any key and the 15-second timer starts; when it ends you get three numbers: WPM (net words per minute), raw WPM and accuracy. No account, no ads, and your settings stay in your browser."
      faqs={FAQS}
    >
      <H2 id="how-it-works">How the keyduelo typing test works</H2>
      <P>
        The test shows a stream of random words drawn from a list of{' '}
        <Strong>282 of the most common English words</Strong>, so it measures how fast you
        type, not how many rare words you know. The timer starts with your first keystroke,
        not when the page loads. A wrong character is marked in red and the caret still
        advances; <Kbd>Backspace</Kbd> lets you fix it. When the time or the word count runs
        out, the results appear.
      </P>
      <Ul>
        <li>
          <Strong>Time mode:</Strong> 15, 30 or 60 seconds. 15 seconds is the default.
        </li>
        <li>
          <Strong>Words mode:</Strong> 10, 25, 50 or 100 words.
        </li>
        <li>
          <Strong>Punctuation toggle:</Strong> adds capitals, commas and periods for a harder,
          more realistic text.
        </li>
        <li>
          <Kbd>Tab</Kbd> or <Kbd>Esc</Kbd>: a new text at any moment.
        </li>
        <li>Settings are saved in your browser and restored on your next visit.</li>
      </Ul>

      <H2 id="formula">How WPM is calculated here</H2>
      <P>
        keyduelo uses the standard definition: <Strong>one word equals five characters</Strong>,
        spaces included. Net WPM counts only the characters you typed correctly; raw WPM counts
        every keystroke; accuracy is the share of keystrokes that were correct. Errors are never
        forgiven by Backspace, so fixing a typo costs time and still counts against accuracy.
      </P>
      <Formula>{`wpm      = correct characters / 5 / minutes
raw wpm  = all keystrokes    / 5 / minutes
accuracy = (keystrokes - errors) / keystrokes × 100`}</Formula>
      <P>
        The full explanation, with average speeds from published research and benchmarks, is in{' '}
        <A href="/wpm">What is WPM?</A>
      </P>

      <H2 id="results">What your result means</H2>
      <P>
        Use this scale as a first orientation. It is keyduelo&apos;s editorial scale (September
        2026), aligned with the ranges typing instructors commonly use; see the WPM guide for the
        research behind the &quot;average&quot; band.
      </P>
      <Table
        caption="keyduelo scale for a 15 to 60 second test with punctuation off"
        head={['WPM', 'Level', 'What it usually means']}
        rows={[
          ['under 30', 'beginner', 'Still looking at the keyboard. Work on finger placement and accuracy before speed.'],
          ['30 to 50', 'average', 'Around the average of everyday computer users. Consistency is the next gain.'],
          ['50 to 70', 'solid', 'Comfortable touch typing. Faster than most people you will race.'],
          ['70 to 100', 'fast', 'Competitive in most rooms. Errors, not speed, are now the main limit.'],
          ['100 and up', 'elite', 'Top-tier speed. Sustaining it over 60 seconds is the real test.'],
        ]}
      />

      <H2 id="tips">Six tips for a higher typing score</H2>
      <Ol>
        <li>
          <Strong>Accuracy first.</Strong> Every error lowers net WPM twice: the wrong character
          does not count and the correction costs time.
        </li>
        <li>
          <Strong>Compare like with like.</Strong> 15-second results run higher than 60-second
          ones. Keep one setting when tracking progress.
        </li>
        <li>
          <Strong>Punctuation off</Strong> when you measure raw speed, on when you train for real
          writing.
        </li>
        <li>
          <Strong>Steady rhythm beats bursts.</Strong> The timer rewards an even pace with few
          corrections.
        </li>
        <li>
          <Strong>Eyes on the screen.</Strong> The caret and the red marks are your feedback loop;
          the keyboard is not.
        </li>
        <li>
          <Strong>Short sessions.</Strong> A handful of 15-second tests with rest between them beats
          one long, tired attempt.
        </li>
      </Ol>

      <H2 id="test-or-race">Typing test or typing race?</H2>
      <P>
        The test is you against the clock. A race is the same text for everyone, at the same
        moment, with live progress bars and a ranking at the end. When you want a benchmark, take
        the test; when you want to settle who is fastest,{' '}
        <A href="/multiplayer-typing-race">create a room and share the code</A>.
      </P>
    </ContentPage>
  );
}
