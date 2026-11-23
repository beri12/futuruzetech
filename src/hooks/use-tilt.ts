"use client";

import type { RefObject } from "react";
import { gsap, media, useGSAP } from "@/lib/motion/gsap";

type Options = {
  /** Maximum rotation in degrees. Keep it subtle. */
  max?: number;
  /** Also write --mx / --my CSS variables for the `spotlight` utility. */
  spotlight?: boolean;
  /** Rotate in 3D (true) or only track the spotlight (false). */
  tilt?: boolean;
};

/**
 * Subtle 3D card tilt plus a cursor spotlight. Pointer-driven effects only
 * run on fine-pointer devices with motion allowed. The spotlight variables
 * are cheap (no layout), so they also run when tilt is turned off.
 */
export function useTilt<T extends HTMLElement>(ref: RefObject<T | null>, { max = 5, spotlight = true, tilt = true }: Options = {}) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`${media.motion} and ${media.fine}`, () => {
        if (tilt) gsap.set(el, { transformPerspective: 900, transformStyle: "preserve-3d" });
        const rxTo = tilt ? gsap.quickTo(el, "rotationX", { duration: 0.8, ease: "power3.out" }) : null;
        const ryTo = tilt ? gsap.quickTo(el, "rotationY", { duration: 0.8, ease: "power3.out" }) : null;

        const onMove = (event: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width;
          const py = (event.clientY - rect.top) / rect.height;
          if (spotlight) {
            el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
            el.style.setProperty("--my", `${event.clientY - rect.top}px`);
          }
          ryTo?.((px - 0.5) * max * 2);
          rxTo?.((0.5 - py) * max * 2);
        };
        const onLeave = () => {
          rxTo?.(0);
          ryTo?.(0);
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
          gsap.set(el, { clearProps: "transform" });
        };
      });
      return () => mm.revert();
    },
    { dependencies: [max, spotlight, tilt] },
  );
}
