"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/types";
import { cn } from "@/lib/utils";

type AccordionProps = {
  items: Faq[];
  /** Index opened on first render; null keeps all closed. */
  defaultOpen?: number | null;
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Accessible accordion: each trigger is a real button with aria-expanded and
 * aria-controls; the panel is a region labelled by its trigger. The height
 * animates with a CSS grid-rows transition (no JavaScript measuring), and
 * closed panels are `hidden` from assistive technology via `inert`.
 */
export function Accordion({ items, defaultOpen = 0, tone = "dark", className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();
  const light = tone === "light";

  return (
    <div className={cn("flex flex-col border-t", light ? "border-light-line" : "border-line", className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.question} className={cn("border-b", light ? "border-light-line" : "border-line")}>
            <h3 className="m-0">
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className={cn(
                  "group flex min-h-[44px] w-full items-center justify-between gap-6 py-6 text-left font-display text-[clamp(17px,1.4vw,20px)] font-medium tracking-[-0.01em] transition-colors duration-base",
                  light ? "text-light-ink" : isOpen ? "text-fg" : "text-fg-soft hover:text-fg",
                )}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color,color] duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none",
                    isOpen ? "rotate-45 border-brand bg-brand text-ink" : "border-line text-brand group-hover:border-brand",
                  )}
                >
                  <Plus size={16} strokeWidth={2.2} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className={cn("max-w-[680px] pb-6 text-[16px] leading-relaxed", light ? "text-light-muted" : "text-fg-muted")}>
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
