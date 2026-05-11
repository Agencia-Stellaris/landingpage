import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "../../contexts/LenisContext";
import { getLoadedGsap } from "../../lib/gsap";

/**
 * Resets scroll to top whenever the route pathname changes.
 * If a hash is present, leaves it for HomePage's hash-scroll effect to handle.
 *
 * After scroll is reset, requests a `ScrollTrigger.refresh()` on the next frame
 * so any reveal triggers in the newly-mounted page recalculate their start/end
 * offsets against the corrected scroll position — but only if gsap has already
 * been loaded by some other consumer. We never force the gsap chunk to load
 * here, since route navigation alone shouldn't bring it in.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (hash) return;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    const bundle = getLoadedGsap();
    if (!bundle) return;
    const id = requestAnimationFrame(() => bundle.ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname, hash, lenis]);

  return null;
}
