'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { auditionKliq, playKliq, preloadKliqSet } from './kliq.ts';
import { getStoredSound, setStoredSound } from './storage.ts';
import { playSound } from './synth.ts';
import {
  DEFAULT_SOUND,
  isKliqSound,
  type SoundType,
  type SynthSoundType,
} from './types.ts';

interface SoundContextValue {
  sound: SoundType;
  setSound: (s: SoundType) => void;
  /**
   * Stable function that callers wire into typing keystrokes. Reads the
   * current sound choice from a ref so it never goes stale even if the
   * caller closes over an old value.
   *
   * `key` is the raw `KeyboardEvent.key`; the sampled sets use it to pick the
   * matching switch recording and its stereo position. Omit it and every key
   * sounds like the middle of the board.
   */
  playKey: (isError?: boolean, key?: string) => void;
  /** Downloads a set ahead of time (e.g. on hover in the switcher). */
  preload: (s: SoundType) => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [sound, setSoundState] = useState<SoundType>(DEFAULT_SOUND);
  const soundRef = useRef<SoundType>(DEFAULT_SOUND);
  /**
   * Keys we played a press for and still owe a release. Held outside React so
   * the global keyup listener below never fires a release for a key that was
   * pressed before the race started (or while a synth set was selected).
   */
  const heldRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const stored = getStoredSound();
    soundRef.current = stored;
    setSoundState(stored);
    if (!isKliqSound(stored)) return;
    // A recorded set is ~200-370 KB, and the default one is now fetched on
    // every first visit. Wait for the browser to go idle so it never competes
    // with the first paint; typing starts well after that.
    const idle =
      window.requestIdleCallback ?? ((fn: () => void) => window.setTimeout(fn, 1200));
    const id = idle(() => preloadKliqSet(stored));
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
      else window.clearTimeout(id as number);
    };
  }, []);

  const preload = useCallback((next: SoundType): void => {
    if (isKliqSound(next)) preloadKliqSet(next);
  }, []);

  const setSound = useCallback((next: SoundType): void => {
    soundRef.current = next;
    setSoundState(next);
    setStoredSound(next);
    heldRef.current.clear();
    // Play a sample immediately so the user hears what they picked.
    if (isKliqSound(next)) auditionKliq(next);
    else if (next !== 'off') playSound(next, false);
  }, []);

  // Stable identity — keystroke callbacks shouldn't fire re-renders by
  // changing reference each time the sound choice updates.
  const playKey = useCallback((isError = false, key?: string): void => {
    const current = soundRef.current;
    if (current === 'off') return;
    if (isKliqSound(current)) {
      const name = key ?? 'f';
      heldRef.current.add(name.length === 1 ? name.toLowerCase() : name);
      playKliq(current, name, 'down', isError);
      return;
    }
    playSound(current as SynthSoundType, isError);
  }, []);

  /**
   * Release sounds. The typing engine only reports presses, so the key-up half
   * of a sampled switch is wired here: we listen globally but only make noise
   * for keys `playKey` already announced, which keeps shortcuts, navigation
   * and pre-race typing silent.
   */
  useEffect(() => {
    const onKeyUp = (event: KeyboardEvent): void => {
      const current = soundRef.current;
      if (!isKliqSound(current)) return;
      const name =
        event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (!heldRef.current.delete(name)) return;
      playKliq(current, name, 'up');
    };
    // A key held down while the tab loses focus never gets its keyup.
    const onBlur = (): void => heldRef.current.clear();

    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return (
    <SoundContext.Provider value={{ sound, setSound, playKey, preload }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error('useSound must be used inside a SoundProvider');
  }
  return ctx;
}
