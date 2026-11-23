"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap, media, useGSAP } from "@/lib/motion/gsap";

/**
 * Editorial statement whose words light up from muted to full white as the
 * paragraph scrolls through the viewport (scrubbed, so it tracks the
 * reader). Words listed in `highlight` finish in brand green.
 *
 * With reduced motion the paragraph is shown at full contrast.
 */
export function ScrollText({ text, className, highlight = [] }: { text: string; className?: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(/\s+/).filter(Boolean);
  const norm = (word: string) => word.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();
  const hl = new Set(highlight.map(norm));

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        const targets = el.querySelectorAll<HTMLElement>("[data-word]");
        gsap.fromTo(
          targets,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 45%", scrub: 0.8 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={cn("text-statement text-fg", className)}>
      {words.map((word, index) => (
        <span key={index}>
          <span data-word="" className={cn(hl.has(norm(word)) && "text-brand")}>
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
