"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { gsap, media, useGSAP } from "@/lib/motion/gsap";

/**
 * Moves its content vertically at a different speed than the page while the
 * element crosses the viewport. `speed` is the total travel in percent of
 * the element's height (positive moves up). Desktop only, and disabled with
 * reduced motion; on phones parallax costs more than it gives.
 */
export function Parallax({ children, speed = 12, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`${media.motion} and ${media.desktop}`, () => {
        gsap.fromTo(
          el,
          { yPercent: speed / 2 },
          {
            yPercent: -speed / 2,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [speed] },
  );
  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
