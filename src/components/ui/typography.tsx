import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Reusable typography primitives. Sizes come from the text-display-* and
 * text-lead utilities in globals.css (fluid, clamp-based).
 */

type Size = "xl" | "lg" | "md" | "sm";

const displaySize: Record<Size, string> = {
  xl: "text-display-xl",
  lg: "text-display-lg",
  md: "text-display-md",
  sm: "text-display-sm",
};

export function Display({
  as: Tag = "h2",
  size = "md",
  className,
  id,
  children,
}: {
  as?: ElementType;
  size?: Size;
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <Tag id={id} className={cn(displaySize[size], "text-fg", className)}>
      {children}
    </Tag>
  );
}

/** Serif italic accent word inside a display heading. */
export function Accent({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("accent-serif", className)}>{children}</span>;
}

export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-lead max-w-[620px] text-fg-muted", className)}>{children}</p>;
}

/**
 * Small uppercase label with an optional index ("01") and a hairline,
 * used above section titles.
 */
export function Eyebrow({ children, index, className }: { children: ReactNode; index?: string; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3 text-fg-muted", className)}>
      {index ? <span className="text-brand">{index}</span> : <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />}
      <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
      <span>{children}</span>
    </p>
  );
}
