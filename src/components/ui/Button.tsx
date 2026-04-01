import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ComponentPropsWithoutRef<"a"> {
  variant?: ButtonVariant;
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  if (variant === "secondary") {
    return (
      <a
        className={clsx(
          "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-heading text-sm font-bold tracking-wide transition-all duration-300",
          "border border-white/10 bg-white/[0.03] text-text-primary backdrop-blur-sm",
          "hover:-translate-y-0.5 hover:border-accent-pink/30 hover:text-white hover:shadow-[0_0_24px_rgba(255,77,109,0.15)]",
          className,
        )}
        {...props}
      >
        {/* Shooting star dot */}
        <span
          className="pointer-events-none absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-[0_0_6px_2px_rgba(255,77,109,0.8),0_0_14px_4px_rgba(124,58,237,0.5)] transition-opacity duration-300 group-hover:opacity-100 [animation:star-travel_3s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running]"
          aria-hidden="true"
        />
        {/* Trailing glow */}
        <span
          className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-pink/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100 [animation:star-travel_3s_linear_infinite] [animation-delay:-0.08s] [animation-play-state:paused] group-hover:[animation-play-state:running]"
          aria-hidden="true"
        />
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <a
      className={clsx(
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-heading text-sm font-bold tracking-wide text-white transition-all duration-300",
        "gradient-bg hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(255,77,109,0.3)]",
        className,
      )}
      {...props}
    >
      {/* Shine sweep on hover */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </a>
  );
}
