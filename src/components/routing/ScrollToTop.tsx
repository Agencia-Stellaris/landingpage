import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "../../contexts/LenisContext";

/**
 * Resets scroll to top whenever the route pathname changes.
 * If a hash is present, leaves it for HomePage's hash-scroll effect to handle.
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
  }, [pathname, hash, lenis]);

  return null;
}
