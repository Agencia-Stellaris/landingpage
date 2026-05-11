// Single lazy loader for gsap + ScrollTrigger. Every consumer (reveals,
// SmoothScroll, HighlightText, etc.) goes through this so the gsap chunk
// stays out of the initial bundle and is only fetched once across the
// whole app.

type Gsap = typeof import("gsap").default;
type ScrollTriggerType = typeof import("gsap/ScrollTrigger").ScrollTrigger;

interface GsapBundle {
  gsap: Gsap;
  ScrollTrigger: ScrollTriggerType;
}

let cache: Promise<GsapBundle> | null = null;
let resolved: GsapBundle | null = null;

export function loadGsap(): Promise<GsapBundle> {
  if (!cache) {
    cache = (async () => {
      const [g, st] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const gsap = g.default;
      gsap.registerPlugin(st.ScrollTrigger);
      const bundle: GsapBundle = { gsap, ScrollTrigger: st.ScrollTrigger };
      resolved = bundle;
      return bundle;
    })();
  }
  return cache;
}

// Returns the gsap bundle only if it has already been loaded by some other
// consumer. Useful for code paths (route changes, refreshes) that should
// react to gsap state but must not force its download.
export function getLoadedGsap(): GsapBundle | null {
  return resolved;
}
