import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ChipProps = {
  children: ReactNode;
  tone?: "outline" | "solid" | "brand" | "light";
  className?: string;
};

export function Chip({ children, tone = "outline", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1.5 text-xs",
        tone === "outline" && "border border-line text-fg-soft",
        tone === "solid" && "rounded-sm border border-line bg-surface px-2.5 text-[13px] text-fg",
        tone === "brand" && "bg-brand font-semibold uppercase tracking-[0.14em] text-forest text-[11px]",
        tone === "light" && "border border-light-line bg-light-card text-light-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line px-2.5 py-1.5 text-[11px] uppercase tracking-[0.14em] text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
