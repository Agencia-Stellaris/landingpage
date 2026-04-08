import { clsx } from "clsx";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  label: string;
  title?: string;
  titleContent?: ReactNode;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({
  label,
  title,
  titleContent,
  subtitle,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={clsx(centered && "text-center")}>
      <p
        className={clsx(
          "mb-3.5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2.5px] text-accent-pink",
          "before:inline-block before:h-px before:w-5 before:bg-accent-pink",
          centered && "justify-center",
        )}
      >
        {label}
      </p>
      {titleContent ? (
        <h2 className={clsx("mb-4 font-heading text-section font-extrabold leading-[1.1] tracking-[-1px]", centered && "mx-auto max-w-2xl")}>
          {titleContent}
        </h2>
      ) : (
        <h2
          className={clsx("mb-4 font-heading text-section font-extrabold leading-[1.1] tracking-[-1px]", centered && "mx-auto max-w-2xl")}
          dangerouslySetInnerHTML={{ __html: title ?? "" }}
        />
      )}
      {subtitle && (
        <p
          className={clsx(
            "max-w-lg text-md leading-relaxed text-text-muted",
            centered && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
