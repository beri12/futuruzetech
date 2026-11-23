"use client";

import { useRef } from "react";
import { gsap, media, useGSAP } from "@/lib/motion/gsap";

/** Thin brand-green reading progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(media.motion, () => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 },
        },
      );
    });
    return () => mm.revert();
  });
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[2px] origin-left scale-x-0 bg-brand motion-reduce:hidden"
    />
  );
}
