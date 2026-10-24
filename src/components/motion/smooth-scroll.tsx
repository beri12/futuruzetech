"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Optional Lenis smooth scrolling, synchronized with GSAP's ticker so
 * ScrollTrigger reads the smoothed scroll position.
 *
 * - Skipped when the user prefers reduced motion or on coarse-pointer
 *   (touch) devices, where native scrolling is better.
 * - Keyboard navigation, anchor links and browser history keep working:
 *   Lenis only intercepts wheel and touch input.
 * - Cleaned up on unmount.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      anchors: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
