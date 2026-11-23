"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap, media, startAt, useGSAP } from "@/lib/motion/gsap";

/**
 * Short label that decodes from random glyphs into its final text (GSAP
 * ScrambleTextPlugin). Used for small technical labels only. The real text is
 * in the HTML from the start and exposed to assistive technology unchanged.
 */
export function ScrambleText({
  text,
  className,
  trigger = "view",
  delay = 0,
}: {
  text: string;
  className?: string;
  trigger?: "view" | "load";
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current?.querySelector<HTMLElement>("[data-scramble]");
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        // Start from same-length glyphs so the label never changes width.
        el.textContent = text.replace(/\S/g, "_");
        gsap.to(el, {
          duration: 1.1,
          delay,
          ease: "none",
          scrambleText: { text, chars: "01<>/{}#_", speed: 0.6, revealDelay: 0.1 },
          ...(trigger === "view" ? { scrollTrigger: { trigger: el, start: startAt(0.1), once: true } } : {}),
        });
        return () => {
          el.textContent = text;
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [text] },
  );

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" data-scramble="">
        {text}
      </span>
    </span>
  );
}
