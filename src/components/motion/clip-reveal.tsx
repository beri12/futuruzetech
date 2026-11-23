"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { gsap, media, startAt, useGSAP } from "@/lib/motion/gsap";

/**
 * Reveals media through an expanding clip-path mask while the inner content
 * settles from a slight zoom. Used for project imagery.
 */
export function ClipReveal({
  children,
  className,
  direction = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "center";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const inner = el.querySelector<HTMLElement>("[data-clip-inner]");
      const from =
        direction === "left" ? "inset(0% 100% 0% 0%)" : direction === "center" ? "inset(18% 18% 18% 18%)" : "inset(100% 0% 0% 0%)";
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        const tl = gsap.timeline({ delay, scrollTrigger: { trigger: el, start: startAt(0.2), once: true } });
        tl.fromTo(el, { clipPath: from }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" });
        if (inner) tl.from(inner, { scale: 1.18, duration: 1.6, ease: "expo.out" }, 0.1);
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [direction, delay] },
  );
  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div data-clip-inner="" className="h-full w-full">
        {children}
      </div>
    </div>
  );
}
