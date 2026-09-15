/**
 * Single shared AudioContext for every sound source in the app (synthesized
 * sounds and the sampled kliq switch sets).
 *
 * It's created lazily on first use — browsers keep audio suspended until a
 * user gesture, and a keystroke or a click on the sound switcher counts as
 * one — and reused afterwards so per-sound latency stays under 1ms.
 */

let ctx: AudioContext | null = null;

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  // Browsers may suspend the context when the tab loses focus; resume() is
  // a no-op if it's already running.
  if (ctx.state === 'suspended') {
    void ctx.resume();
  }
  return ctx;
}
