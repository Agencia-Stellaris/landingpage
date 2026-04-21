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

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = mediaQuery.matches;

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

      if (!reducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    };

    const onMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
      if (!reducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    mediaQuery.addEventListener("change", onMotionChange);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      mediaQuery.removeEventListener("change", onMotionChange);
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
