import { useEffect, useState, type ReactNode } from "react";
import type Lenis from "lenis";
import { LenisContext } from "../../contexts/LenisContext";
import { loadGsap } from "../../lib/gsap";

// Defer Lenis + gsap until the user is idle OR triggers a scroll/touch.
// Native scrolling works fine in the meantime; this keeps ~130 KB of JS
// out of the critical path (LCP/TBT).
const IDLE_TIMEOUT_MS = 1500;
const INTERACTION_EVENTS = [
  "pointerdown",
  "wheel",
  "touchstart",
  "keydown",
] as const;

type IdleHandle = number;
type WindowWithIdle = Window &
  typeof globalThis & {
    requestIdleCallback?: (
      cb: () => void,
      opts?: { timeout: number },
    ) => IdleHandle;
    cancelIdleCallback?: (id: IdleHandle) => void;
  };

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    let instance: Lenis | null = null;
    let rafFn: ((time: number) => void) | null = null;
    let gsapInstance: Awaited<ReturnType<typeof loadGsap>>["gsap"] | null = null;
    let cancelled = false;
    let idleId: IdleHandle | undefined;
    const w = window as WindowWithIdle;

    const cleanupTriggers = () => {
      INTERACTION_EVENTS.forEach((e) =>
        window.removeEventListener(e, trigger),
      );
      if (idleId !== undefined) {
        if (w.cancelIdleCallback) w.cancelIdleCallback(idleId);
        else window.clearTimeout(idleId);
        idleId = undefined;
      }
    };

    const init = async () => {
      cleanupTriggers();
      const [{ default: LenisCtor }, { gsap, ScrollTrigger }] =
        await Promise.all([import("lenis"), loadGsap()]);
      if (cancelled) return;

      instance = new LenisCtor({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
      });
      instance.on("scroll", ScrollTrigger.update);
      rafFn = (time: number) => instance!.raf(time * 1000);
      gsap.ticker.add(rafFn);
      gsap.ticker.lagSmoothing(0);
      gsapInstance = gsap;
      // Lenis is an external imperative subscription; expose it via state so
      // descendants re-render when it becomes available.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLenis(instance);
    };

    const trigger = () => {
      void init();
    };

    INTERACTION_EVENTS.forEach((e) =>
      window.addEventListener(e, trigger, { once: true, passive: true }),
    );
    idleId = w.requestIdleCallback
      ? w.requestIdleCallback(trigger, { timeout: IDLE_TIMEOUT_MS })
      : window.setTimeout(trigger, IDLE_TIMEOUT_MS);

    return () => {
      cancelled = true;
      cleanupTriggers();
      if (rafFn && gsapInstance) gsapInstance.ticker.remove(rafFn);
      instance?.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
