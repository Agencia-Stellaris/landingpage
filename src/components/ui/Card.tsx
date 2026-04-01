import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

interface CardProps extends ComponentPropsWithoutRef<"article"> {
  hoverable?: boolean;
  topAccent?: boolean;
}

export function Card({
  hoverable = true,
  topAccent = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <article
      className={clsx(
        "relative overflow-hidden rounded-2xl border border-border bg-surface",
        hoverable &&
          "cursor-pointer transition-all duration-250 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.06]",
        topAccent &&
          "before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:gradient-bg before:opacity-0 before:transition-opacity hover:before:opacity-100",
        className,
      )}
      {...props}
    >
      {children}
    </article>
  );
}
