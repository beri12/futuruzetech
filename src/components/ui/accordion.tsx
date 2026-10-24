"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
 * aria-controls; the panel is a region labelled by its trigger. Only one
 * item is open at a time, which keeps long FAQ lists scannable.
 */
export function Accordion({ items, defaultOpen = 0, tone = "dark", className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();
  const reduce = useReducedMotion();
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
                  "flex min-h-[44px] w-full items-center justify-between gap-4 py-5 text-left font-display text-[17px] font-semibold",
                  light ? "text-light-ink" : "text-fg",
                )}
              >
                <span>{item.question}</span>
                <Plus
                  aria-hidden="true"
                  size={18}
                  strokeWidth={2.4}
                  className={cn(
                    "shrink-0 text-brand transition-transform duration-base motion-reduce:transition-none",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className={cn("max-w-[640px] pb-5 text-[15px] leading-relaxed", light ? "text-light-muted" : "text-fg-muted")}>
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
