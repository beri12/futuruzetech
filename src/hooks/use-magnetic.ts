"use client";

import type { RefObject } from "react";
import { gsap, media, useGSAP } from "@/lib/motion/gsap";

type Options = {
  /** How far (px) the element can travel toward the pointer. */
  strength?: number;
  /** Optional inner element that moves further, for a layered feel. */
  innerSelector?: string;
};

/**
 * Magnetic hover: the element eases toward the pointer while hovered and
 * springs back on leave. Desktop, fine pointer and motion-allowed only, so
 * touch devices and reduced-motion users get a normal, static control.
 */
export function useMagnetic<T extends HTMLElement>(ref: RefObject<T | null>, { strength = 14, innerSelector }: Options = {}) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`${media.motion} and ${media.fine}`, () => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const inner = innerSelector ? el.querySelector<HTMLElement>(innerSelector) : null;
        const ixTo = inner ? gsap.quickTo(inner, "x", { duration: 0.6, ease: "power3.out" }) : null;
        const iyTo = inner ? gsap.quickTo(inner, "y", { duration: 0.6, ease: "power3.out" }) : null;

        const onMove = (event: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
          const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
          xTo(dx * strength);
          yTo(dy * strength);
          ixTo?.(dx * strength * 0.4);
          iyTo?.(dy * strength * 0.4);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
          ixTo?.(0);
          iyTo?.(0);
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
          gsap.set([el, inner].filter(Boolean), { x: 0, y: 0 });
        };
      });
      return () => mm.revert();
    },
    { dependencies: [strength, innerSelector] },
  );
}
