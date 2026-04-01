import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

interface ContainerProps extends ComponentPropsWithoutRef<"section"> {
  as?: "section" | "div" | "footer";
  alternate?: boolean;
}

export function Container({
  as: Tag = "section",
  alternate = false,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={clsx(
        "px-[5%] py-[90px]",
        alternate && "bg-bg-secondary",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
