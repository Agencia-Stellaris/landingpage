import { createContext, useContext } from "react";
import type Lenis from "lenis";

export const LenisContext = createContext<Lenis | null>(null);

/**
 * Returns the Lenis smooth-scroll instance, or `null` during the first render
 * (before SmoothScroll's useEffect has run). Always guard before using:
 * `if (!lenis) return;`.
 */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
