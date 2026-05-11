import { useRef, useEffect, type ReactNode } from "react";
import { loadGsap } from "../../lib/gsap";

interface HighlightTextProps {
  children: ReactNode;
  className?: string;
}

export function HighlightText({ children, className = "" }: HighlightTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current || !highlightRef.current || !textRef.current) return;
    let cancelled = false;
    let ctx: { revert: () => void } | null = null;

    void loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const container = containerRef.current;
      const highlight = highlightRef.current;
      const text = textRef.current;
      if (!container || !highlight || !text) return;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 82%",
            end: "top -20%",
            toggleActions: "play reverse play reverse",
          },
        });

        tl.fromTo(
          highlight,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 1, ease: "power3.out" },
        );

        tl.fromTo(
          text,
          { color: "rgb(240, 240, 248)" },
          { color: "#ffffff", duration: 0.5, ease: "power2.out" },
          0.4,
        );
      }, container);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      <span
        ref={highlightRef}
        className="absolute gradient-bg rounded-sm"
        style={{
          left: "-0.15em",
          right: "-0.15em",
          top: "0.05em",
          bottom: "0.05em",
          transform: "scaleX(0)",
          transformOrigin: "left center",
        }}
      />
      <span ref={textRef} className="relative z-10">
        {children}
      </span>
    </span>
  );
}
