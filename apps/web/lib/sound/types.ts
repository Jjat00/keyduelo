/**
 * Keystroke feedback sounds. Two families live behind one union:
 *
 * - **synth** (`click`, `mech`, `pop`) — generated on the fly with the Web
 *   Audio API, zero bytes downloaded. See `synth.ts`.
 * - **kliq** (`kat`, `cherry`, …) — recorded switch sets from
 *   https://github.com/crafter-station/kliq (MIT), shipped as audio sprites
 *   under `public/sounds/` and streamed on demand. See `kliq.ts`.
 */

/** Sounds generated with oscillators / noise buffers. */
export type SynthSoundType = 'off' | 'click' | 'mech' | 'pop';

/** Recorded switch sets. Slugs match the sprite filenames and `sprites.json`. */
export type KliqSoundType =
  | 'kat'
  | 'cherry'
  | 'mt3'
  | 'xda'
  | 'oem'
  | 'sa'
  | 'dsa';

export type SoundType = SynthSoundType | KliqSoundType;

/**
 * The synthesized fallbacks, listed after the recorded sets: they're the
 * zero-download option, not the default experience. `off` is a control rather
 * than a sound, so it isn't part of this list — the switcher shows it first.
 */
export const SYNTH_SOUND_TYPES: SynthSoundType[] = ['click', 'mech', 'pop'];

/** Kliq's own product display order — keep it, the sets are ordered by feel. */
export const KLIQ_SOUND_TYPES: KliqSoundType[] = [
  'kat',
  'cherry',
  'mt3',
  'xda',
  'oem',
  'sa',
  'dsa',
];

/** Every selectable value, in switcher order. Also the storage allowlist. */
export const SOUND_TYPES: SoundType[] = [
  'off',
  ...KLIQ_SOUND_TYPES,
  ...SYNTH_SOUND_TYPES,
];

/**
 * A recorded set is the default: the sampled switches are the main
 * experience now, and OEM is the most familiar-sounding of the seven.
 * Anyone who picked something else (including `off`) keeps their choice —
 * this only applies to visitors with nothing in localStorage.
 */
export const DEFAULT_SOUND: SoundType = 'oem';

export function isKliqSound(type: SoundType): type is KliqSoundType {
  return (KLIQ_SOUND_TYPES as string[]).includes(type);
}

const LABELS: Record<SoundType, string> = {
  off: 'off',
  click: 'click',
  mech: 'mech',
  pop: 'pop',
  kat: 'KAT',
  cherry: 'Cherry',
  mt3: 'MT3',
  xda: 'XDA',
  oem: 'OEM',
  sa: 'SA',
  dsa: 'DSA',
};

export function soundLabel(type: SoundType): string {
  return LABELS[type] ?? type;
}
