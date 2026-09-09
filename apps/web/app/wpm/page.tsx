import type { Metadata } from 'next';
import { ContentPage } from '@/components/seo/ContentPage';
import { A, Callout, Formula, H2, Ol, P, Strong, Table, Ul } from '@/components/seo/Prose';
import type { Faq } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/pages';

export const metadata: Metadata = pageMetadata('wpm', 'en');

const STUDY_URL = 'https://doi.org/10.1145/3173574.3174220';
const STUDY_DATA_URL = 'https://userinterfaces.aalto.fi/136Mkeystrokes/';

const FAQS: Faq[] = [
  {
    q: 'What is a good WPM?',
    a: 'Anything above 52 WPM is above the average measured in the largest public typing study (168,000 people, CHI 2018, mean 51.56 WPM). 70 WPM is fast for everyday use, and 100 WPM or more puts you roughly in the top few percent. With accuracy under 95%, speed numbers are not yet meaningful.',
  },
  {
    q: 'How do I convert WPM to CPM or KPM?',
    a: 'Multiply by five. 60 WPM equals 300 characters per minute (CPM), because a word is defined as five characters. Keystrokes per minute (KPM) is usually the same figure as CPM, except on tests that count Backspace and modifier keys as keystrokes.',
  },
  {
    q: 'Is 40 WPM slow?',
    a: '40 WPM is below the 51.56 WPM average of the CHI 2018 study but perfectly usable for daily work: it is roughly 200 characters per minute, or a short email in about a minute. Most people who learn touch typing pass 60 WPM within a few months of regular short practice.',
  },
  {
    q: 'What is the fastest typing speed?',
    a: 'In the CHI 2018 dataset of 168,000 volunteers the fastest typists exceeded 120 WPM. Competitive typists on race sites post higher numbers on short texts, but a 15-second burst and a 60-second average are different measurements and should not be compared.',
  },
  {
    q: 'Does accuracy matter more than speed?',
    a: 'Early on, yes. Every error removes five characters worth of credit from net WPM and costs a correction, and the CHI 2018 study found that faster typists also make fewer errors. Aim for 97% accuracy or better, then push speed.',
  },
  {
    q: 'How long should a typing test be?',
    a: '15 seconds is enough to get a quick number and to warm up; 60 seconds or 100 words is closer to your sustained speed. Whatever you pick, keep it constant when tracking progress, because short tests read higher than long ones.',
  },
];

export default function WpmPage() {
  return (
    <ContentPage
      pageKey="wpm"
      locale="en"
      heading="What is WPM? How typing speed is calculated, and what counts as fast"
      lead="WPM stands for words per minute, and a word is a fixed unit of five characters, spaces included, so the length of the real words does not matter. Net WPM counts only the characters you typed correctly, raw WPM counts everything, and accuracy is the share of keystrokes that were correct."
      faqs={FAQS}
    >
      <H2 id="formula">The WPM formula</H2>
      <Formula>{`wpm      = correct characters / 5 / minutes
raw wpm  = all keystrokes    / 5 / minutes
accuracy = (keystrokes − errors) / keystrokes × 100
cpm      = wpm × 5`}</Formula>
      <P>
        <Strong>Worked example.</Strong> In a 60-second test you press 420 keys and 12 of them are
        wrong. Raw WPM is 420 ÷ 5 ÷ 1 = 84. Correct characters are 408, so net WPM is 408 ÷ 5 ÷ 1
        = 81.6, shown as 82. Accuracy is 408 ÷ 420 = 97.1%. keyduelo rounds WPM to a whole number
        and accuracy to one decimal.
      </P>
      <P>
        Two details decide how strict a test is. First, whether the timer starts on page load or
        on the first keystroke (keyduelo: first keystroke). Second, what happens to an error you
        fix with Backspace: on keyduelo the corrected position counts as correct for WPM, but the
        error stays in the accuracy count, so a typo always costs you something.
      </P>

      <H2 id="five-characters">Why five characters is a word</H2>
      <P>
        Real words vary from one letter to a dozen, so counting them directly would make a text
        full of short words look faster than a text full of long ones. Typing tests inherited from
        the typewriter era a fixed unit, the <Strong>standard word of five characters</Strong>,
        spaces and punctuation included. Monkeytype, TypeRacer, 10FastFingers and keyduelo all use
        it, which is why results across word-based tests are at least in the same currency.
      </P>

      <H2 id="net-raw-accuracy">Net WPM, raw WPM and accuracy</H2>
      <Table
        head={['Metric', 'What it counts', 'What it tells you']}
        rows={[
          ['Net WPM (shown as "wpm")', 'Correctly typed characters ÷ 5 ÷ minutes', 'Your useful output. The number to track and to compare with others.'],
          ['Raw WPM', 'Every keystroke ÷ 5 ÷ minutes', 'Your finger speed regardless of mistakes. A big gap between raw and net means accuracy is the bottleneck.'],
          ['Accuracy', 'Correct keystrokes ÷ all keystrokes', 'Under 95%, speed is not yet the problem. 97% and up is where fast typists live.'],
        ]}
      />

      <H2 id="average">What is an average typing speed?</H2>
      <P>
        The largest public study of typing on computer keyboards,{' '}
        <A href={STUDY_URL}>Observations on Typing from 136 Million Keystrokes</A> (Dhakal,
        Feit, Kristensson and Oulasvirta, CHI 2018), measured <Strong>168,000 volunteers</Strong>{' '}
        transcribing sentences online. The average speed was{' '}
        <Strong>51.56 WPM</Strong> with a standard deviation of about 20 WPM, the average
        uncorrected error rate was 1.17%, and the fastest typists reached{' '}
        <Strong>120 WPM or more</Strong>. The study also found that faster typists make fewer
        errors and use rollover, pressing the next key before releasing the previous one, far
        more often. The dataset is{' '}
        <A href={STUDY_DATA_URL}>published by Aalto University</A>.
      </P>
      <Table
        caption="Speed bands. Shares are a normal approximation from the study's mean and standard deviation; the real distribution is right-skewed, so the top bands are a little larger."
        head={['WPM', 'Level', 'Approximate share of typists']}
        rows={[
          ['under 30', 'beginner', 'about 14%'],
          ['30 to 50', 'average', 'about 33%'],
          ['50 to 70', 'solid', 'about 35%'],
          ['70 to 100', 'fast', 'about 17%'],
          ['100 and up', 'elite', 'about 1%'],
        ]}
      />
      <Callout title="Where keyduelo fits">
        A 15-second keyduelo test with punctuation off is a short burst on common words, so expect
        a few WPM more than the study&apos;s sentence transcription. Use the bands as orientation,
        and use the same setting every time you measure.
      </Callout>

      <H2 id="why-numbers-differ">Why your WPM changes between sites</H2>
      <Ul>
        <li>
          <Strong>Text type:</Strong> random common words (keyduelo, Monkeytype) read faster than
          quotes with names and punctuation (TypeRacer) or code.
        </li>
        <li>
          <Strong>Error rule:</Strong> some tests let a wrong character through and penalize it;
          others block you until you fix it, which lowers WPM and raises accuracy.
        </li>
        <li>
          <Strong>Duration:</Strong> 15-second results run higher than 60-second ones because you
          do not tire.
        </li>
        <li>
          <Strong>Timer start:</Strong> on the first keystroke versus on page load.
        </li>
        <li>
          <Strong>Device:</Strong> on-screen keyboards with autocorrect are not comparable with
          physical keyboards.
        </li>
      </Ul>
      <P>
        keyduelo follows the Monkeytype conventions, so numbers between the two are close;
        numbers from quote-based races will look lower. Try it yourself on the{' '}
        <A href="/typing-test">free typing test</A>.
      </P>

      <H2 id="improve">How to improve your WPM</H2>
      <Ol>
        <li>
          <Strong>Fix accuracy first.</Strong> Get to 97% before chasing speed; errors cost twice.
        </li>
        <li>
          <Strong>Touch type from the home row.</Strong> Eyes on the screen, all ten fingers, no
          hunting.
        </li>
        <li>
          <Strong>Let keys overlap.</Strong> Rollover typing was one of the strongest markers of
          fast typists in the CHI 2018 data.
        </li>
        <li>
          <Strong>Train the common pairs.</Strong> Letter pairs typed with different hands or
          fingers predicted speed better than letter repetitions in the same study.
        </li>
        <li>
          <Strong>Short, frequent sessions.</Strong> A few 15-second tests a day beat one long
          weekly session.
        </li>
        <li>
          <Strong>Measure the same way every time,</Strong> then{' '}
          <A href="/multiplayer-typing-race">race friends</A> for motivation.
        </li>
      </Ol>

      <H2 id="glossary">Typing speed vocabulary</H2>
      <Ul>
        <li>
          <Strong>WPM:</Strong> words per minute, with a word defined as five characters.
        </li>
        <li>
          <Strong>CPM:</Strong> characters per minute, equal to WPM × 5.
        </li>
        <li>
          <Strong>Net vs raw WPM:</Strong> correct characters only versus every keystroke.
        </li>
        <li>
          <Strong>Accuracy:</Strong> share of keystrokes that were correct.
        </li>
        <li>
          <Strong>Uncorrected error rate:</Strong> errors still present in the final text, the
          measure used in the CHI 2018 study (average 1.17%).
        </li>
        <li>
          <Strong>KSPC:</Strong> keystrokes per character; 1.0 means no corrections at all.
        </li>
        <li>
          <Strong>IKI:</Strong> inter-key interval, the time between two keystrokes.
        </li>
        <li>
          <Strong>Rollover:</Strong> pressing the next key before releasing the previous one.
        </li>
      </Ul>
    </ContentPage>
  );
}
