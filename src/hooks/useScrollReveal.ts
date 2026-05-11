import { useEffect, useRef } from "react";
import { loadGsap } from "../lib/gsap";

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  delay?: number;
}

/**
 * Animates direct children of the container on scroll.
 * Each child fades in and slides up (or from a given direction).
 */
export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {},
) {
  const ref = useRef<T>(null);
  const {
    y = 50,
    x = 0,
    duration = 0.8,
    stagger = 0.12,
    start = "top 88%",
    delay = 0,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let ctx: { revert: () => void } | null = null;

    void loadGsap().then(({ gsap }) => {
      if (cancelled || !el.isConnected) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          el.children,
          { y, x, opacity: 0 },
          {
            y: 0,
            x: 0,
            opacity: 1,
            duration,
            stagger,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: "play none none reverse",
            },
          },
        );
      }, el);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [y, x, duration, stagger, start, delay]);

  return ref;
}

/**
 * Animates a single element on scroll (fade + slide).
 */
export function useReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {},
) {
  const ref = useRef<T>(null);
  const {
    y = 40,
    x = 0,
    duration = 0.9,
    start = "top 88%",
    delay = 0,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let ctx: { revert: () => void } | null = null;

    void loadGsap().then(({ gsap }) => {
      if (cancelled || !el.isConnected) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { y, x, opacity: 0 },
          {
            y: 0,
            x: 0,
            opacity: 1,
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: "play none none reverse",
            },
          },
        );
      }, el);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [y, x, duration, start, delay]);

  return ref;
}
