"use client";

/**
 * Single entry point for GSAP. Every animated component imports gsap and its
 * plugins from here so they are registered exactly once, and so the motion
 * vocabulary (eases, durations, staggers, media queries) stays consistent.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrambleTextPlugin, useGSAP);

gsap.defaults({ ease: "expo.out", duration: 0.9 });

export { gsap, ScrollTrigger, useGSAP };

/** Centralized motion tokens. Change timing here, not in components. */
export const ease = {
  out: "expo.out",
  outSoft: "power3.out",
  inOut: "power3.inOut",
  linear: "none",
} as const;

export const duration = {
  fast: 0.45,
  base: 0.9,
  slow: 1.3,
} as const;

export const stagger = {
  chars: 0.022,
  words: 0.06,
  items: 0.09,
} as const;

/**
 * Media conditions used with gsap.matchMedia(). Animations are only created
 * for `motion`; `desktop` / `fine` gate the heavier or pointer-driven ones.
 */
export const media = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023.98px)",
  fine: "(hover: hover) and (pointer: fine)",
} as const;

/** Distances shrink on small screens so motion stays calm on phones. */
export function travel(isDesktop: boolean, desktopPx: number) {
  return isDesktop ? desktopPx : Math.round(desktopPx * 0.5);
}

/** Start position for "reveal when this much of the element is visible". */
export function startAt(amount = 0.15) {
  return `top ${Math.round(100 - amount * 100)}%`;
}
