"use client";

import { useRef, type ReactNode } from "react";
import { gsap, media, useGSAP } from "@/lib/motion/gsap";

/**
 * Draws every `[data-draw]` path inside it as the block scrolls through the
 * viewport (scrubbed stroke-dashoffset). Elements marked `[data-pop]` scale
 * in once their part of the drawing is reached. Static with reduced motion.
 */
export function DrawSvg({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        const paths = el.querySelectorAll<SVGGeometryElement>("[data-draw]");
        paths.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 40%", scrub: 0.8 },
        });
        tl.to(paths, { strokeDashoffset: 0, ease: "none", stagger: 0.15 }).from(
          el.querySelectorAll("[data-pop]"),
          { scale: 0, transformOrigin: "50% 50%", ease: "back.out(2)", stagger: 0.1 },
          0.3,
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
