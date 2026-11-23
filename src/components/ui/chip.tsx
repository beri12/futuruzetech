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
        "inline-flex items-center rounded-full px-3 py-1.5 text-xs",
        tone === "outline" && "border border-line text-fg-soft",
        tone === "solid" && "border border-line bg-white/[0.03] text-[13px] text-fg",
        tone === "brand" && "bg-brand text-[11px] font-semibold uppercase tracking-[0.14em] text-ink",
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
        "inline-flex items-center gap-2 font-display text-[11px] font-medium uppercase tracking-[0.2em] text-fg-muted",
        className,
      )}
    >
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand" />
      {children}
    </span>
  );
}
