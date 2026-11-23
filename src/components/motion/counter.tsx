"use client";

import { useRef } from "react";
import { gsap, media, startAt, useGSAP } from "@/lib/motion/gsap";

/**
 * Number that counts up when it scrolls into view. The final value is in the
 * server HTML, so it is correct without JavaScript and for screen readers.
 * Only use it for real, verifiable figures.
 */
export function Counter({ value, pad = 2, suffix = "", className }: { value: number; pad?: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) => `${String(Math.round(n)).padStart(pad, "0")}${suffix}`;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        const state = { n: 0 };
        el.textContent = format(0);
        gsap.to(state, {
          n: value,
          duration: 1.6,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = format(state.n);
          },
          scrollTrigger: { trigger: el, start: startAt(0.2), once: true },
        });
        return () => {
          el.textContent = format(value);
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [value] },
  );

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
