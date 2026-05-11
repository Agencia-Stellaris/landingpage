import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  s: number;
  tw: number;
  twS: number;
  hue: "white" | "accent";
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
}

// Defer first paint of the canvas so it never competes with LCP.
// The RAF loop only runs while the canvas is in (or near) the viewport.
const IDLE_TIMEOUT_MS = 1000;
const VIEWPORT_MARGIN_PX = "200px";

type IdleHandle = number;
type WindowWithIdle = Window &
  typeof globalThis & {
    requestIdleCallback?: (
      cb: () => void,
      opts?: { timeout: number },
    ) => IdleHandle;
    cancelIdleCallback?: (id: IdleHandle) => void;
  };

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = mediaQuery.matches;
    let isVisible = true;
    let started = false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let stars: Star[] = [];
    let shooting: ShootingStar[] = [];
    let raf = 0;

    const resize = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor((W * H) / 4500);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.2,
        s: Math.random() * 0.4 + 0.05,
        tw: Math.random() * Math.PI * 2,
        twS: Math.random() * 0.03 + 0.005,
        hue: Math.random() > 0.9 ? "accent" : "white",
      }));
      shooting = [];
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Nebula washes — brand violet + pink
      const g1 = ctx.createRadialGradient(
        W * 0.2,
        H * 0.3,
        0,
        W * 0.2,
        H * 0.3,
        Math.max(W, H) * 0.5,
      );
      g1.addColorStop(0, "rgba(124,58,237,0.14)");
      g1.addColorStop(1, "rgba(124,58,237,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      const g2 = ctx.createRadialGradient(
        W * 0.85,
        H * 0.65,
        0,
        W * 0.85,
        H * 0.65,
        Math.max(W, H) * 0.5,
      );
      g2.addColorStop(0, "rgba(255,77,109,0.10)");
      g2.addColorStop(1, "rgba(255,77,109,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // Stars
      stars.forEach((s) => {
        if (!reducedMotion) {
          s.tw += s.twS;
          s.y += s.s * 0.3;
          if (s.y > H) s.y = 0;
        }
        const alpha = 0.5 + 0.5 * Math.sin(s.tw);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle =
          s.hue === "accent"
            ? `rgba(255,77,109,${alpha})`
            : `rgba(245,241,255,${alpha * 0.9})`;
        ctx.fill();
      });

      // Occasional shooting star
      if (!reducedMotion && Math.random() < 0.003 && shooting.length < 2) {
        shooting.push({
          x: Math.random() * W * 0.6 + W * 0.2,
          y: Math.random() * H * 0.4,
          vx: 6 + Math.random() * 4,
          vy: 2 + Math.random() * 2,
          life: 0,
          max: 80,
        });
      }
      shooting = shooting.filter((sh) => {
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.life++;
        const grad = ctx.createLinearGradient(
          sh.x,
          sh.y,
          sh.x - sh.vx * 8,
          sh.y - sh.vy * 8,
        );
        grad.addColorStop(0, "rgba(245,241,255,0.9)");
        grad.addColorStop(1, "rgba(245,241,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.vx * 8, sh.y - sh.vy * 8);
        ctx.stroke();
        return sh.life < sh.max;
      });

      if (!reducedMotion && isVisible) {
        raf = requestAnimationFrame(draw);
      }
    };

    // Single switch that reconciles motion preference + viewport visibility
    // with the RAF loop. Always cancels any pending frame first so we never
    // double-schedule.
    const updateLoop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (!started || !isVisible) return;
      if (reducedMotion) {
        // Render a single static frame and stop.
        draw();
        return;
      }
      raf = requestAnimationFrame(draw);
    };

    const onMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
      updateLoop();
    };

    // Pause the RAF loop when the canvas is well outside the viewport.
    // Big rootMargin gives a buffer so the loop is back on by the time
    // the user actually sees it again.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isVisible = entry.isIntersecting;
        updateLoop();
      },
      { rootMargin: VIEWPORT_MARGIN_PX },
    );
    observer.observe(canvas);

    // Defer the first init off the LCP critical path. requestIdleCallback
    // typically fires in 50–200ms once the page is quiet; the timeout caps
    // the wait at 1s so the starfield never feels missing.
    const w = window as WindowWithIdle;
    let idleId: IdleHandle | undefined;
    const start = () => {
      idleId = undefined;
      resize();
      window.addEventListener("resize", resize);
      mediaQuery.addEventListener("change", onMotionChange);
      started = true;
      updateLoop();
    };
    idleId = w.requestIdleCallback
      ? w.requestIdleCallback(start, { timeout: IDLE_TIMEOUT_MS })
      : window.setTimeout(start, 500);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      if (idleId !== undefined) {
        if (w.cancelIdleCallback) w.cancelIdleCallback(idleId);
        else window.clearTimeout(idleId);
      }
      if (started) {
        window.removeEventListener("resize", resize);
        mediaQuery.removeEventListener("change", onMotionChange);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
