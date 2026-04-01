import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          end: "top -20%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.fromTo(
        highlightRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1, ease: "power3.out" },
      );

      tl.fromTo(
        textRef.current,
        { color: "rgb(240, 240, 248)" },
        { color: "#ffffff", duration: 0.5, ease: "power2.out" },
        0.4,
      );
    }, containerRef);

    return () => ctx.revert();
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
