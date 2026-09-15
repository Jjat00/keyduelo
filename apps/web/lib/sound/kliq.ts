/**
 * Recorded mechanical switch sounds, ported from kliq's web demo.
 * Source: https://github.com/crafter-station/kliq (MIT) — see
 * `public/sounds/ATTRIBUTION.md`.
 *
 * Each set is one audio sprite (`/sounds/<slug>.wav`): the press and release
 * samples of every key laid end to end at 24 kHz mono. `/sounds/sprites.json`
 * maps `set -> key -> stroke -> [offsetSeconds, durationSeconds]`, so playing
 * a key is a single `start(0, offset, duration)` on a buffer we already hold
 * in memory. One fetch per set, no per-keystroke network work.
 *
 * Fidelity touches carried over from the app: a small random pitch wobble so
 * repeated keys never sound identical, and stereo panning that follows the
 * key's position on the home rows.
 */

import { getAudioContext } from './context.ts';
import type { KliqSoundType } from './types.ts';

type Stroke = 'down' | 'up';
type Segment = [offset: number, duration: number];
type SpriteMap = Record<string, Record<Stroke, Segment>>;

/** The key the sprites fall back to — a middle-of-the-board, neutral sample. */
const FALLBACK_KEY = 'f';

/** Peak gain per keystroke. The samples are already normalized. */
const VOLUME = 0.7;

/** Random pitch spread (±3%), matching kliq's per-key variation. */
const PITCH_SPREAD = 0.06;

/** Wrong keystrokes play the same sample a semitone-ish lower. */
const ERROR_PITCH = 0.82;

const ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

let spritesPromise: Promise<Record<string, SpriteMap>> | null = null;
let sprites: Record<string, SpriteMap> | null = null;
const buffers: Partial<Record<KliqSoundType, Promise<AudioBuffer>>> = {};

function loadSprites(): Promise<Record<string, SpriteMap>> {
  spritesPromise ??= fetch('/sounds/sprites.json')
    .then((r) => r.json() as Promise<Record<string, SpriteMap>>)
    .then((json) => (sprites = json));
  return spritesPromise;
}

function loadBuffer(set: KliqSoundType): Promise<AudioBuffer> | null {
  const c = getAudioContext();
  if (!c) return null;
  buffers[set] ??= fetch(`/sounds/${set}.wav`)
    .then((r) => r.arrayBuffer())
    // Callback form: Safari still doesn't return a promise from decodeAudioData.
    .then((b) => new Promise<AudioBuffer>((ok, fail) => c.decodeAudioData(b, ok, fail)));
  return buffers[set] ?? null;
}

/**
 * Warms up a set: fetches the sprite table and decodes the audio so the first
 * keystroke already has sound. Safe to call repeatedly — the work is cached.
 * Called when a set is picked (and on hover in the switcher).
 */
export function preloadKliqSet(set: KliqSoundType): void {
  void loadSprites().catch(() => {});
  void loadBuffer(set)?.catch(() => {});
}

/**
 * Normalizes a `KeyboardEvent.key` to a sprite key. Printable characters the
 * sets don't cover (digits, punctuation, accented letters) fall back to `f`.
 */
function spriteKey(map: SpriteMap, key: string): string {
  const normalized = key.length === 1 ? key.toLowerCase() : key;
  return normalized in map ? normalized : FALLBACK_KEY;
}

/** Stereo position derived from where the key sits on its row. */
function pan(key: string): number {
  for (const row of ROWS) {
    const i = row.indexOf(key);
    if (i >= 0) return (i / (row.length - 1) - 0.5) * 0.7;
  }
  return 0;
}

/**
 * Plays one stroke of one key. Fire-and-forget: if the set hasn't finished
 * downloading yet the call resolves once it has, and a keystroke that lands
 * mid-download is simply dropped rather than played late.
 */
export function playKliq(
  set: KliqSoundType,
  key: string,
  stroke: Stroke,
  isError: boolean = false,
): void {
  const c = getAudioContext();
  if (!c) return;

  const buffer = buffers[set];
  // Not decoded yet — kick off the load and skip this keystroke. Playing it
  // hundreds of milliseconds later would be worse than silence.
  if (!buffer || !sprites) {
    preloadKliqSet(set);
    return;
  }

  const map = sprites[set];
  if (!map) return;
  const resolved = spriteKey(map, key);
  const segment = map[resolved]?.[stroke];
  if (!segment) return;

  void buffer.then((decoded) => {
    const source = c.createBufferSource();
    source.buffer = decoded;
    const wobble = 1 + (Math.random() - 0.5) * PITCH_SPREAD;
    source.playbackRate.value = isError ? wobble * ERROR_PITCH : wobble;

    const gain = c.createGain();
    gain.gain.value = VOLUME;

    const panner = c.createStereoPanner ? c.createStereoPanner() : null;
    if (panner) {
      panner.pan.value = pan(resolved);
      source.connect(panner).connect(gain);
    } else {
      source.connect(gain);
    }
    gain.connect(c.destination);

    source.start(0, segment[0], segment[1]);
  });
}

/**
 * Plays a press + release of a representative key once the set is loaded,
 * waiting for the download instead of dropping it. Used to audition a set
 * from the sound switcher, where latency doesn't matter.
 */
export function auditionKliq(set: KliqSoundType): void {
  const buffer = loadBuffer(set);
  if (!buffer) return;
  void Promise.all([loadSprites(), buffer])
    .then(() => {
      playKliq(set, FALLBACK_KEY, 'down');
      setTimeout(() => playKliq(set, FALLBACK_KEY, 'up'), 90);
    })
    .catch(() => {});
}
