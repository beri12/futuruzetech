"use client";

import { useRef } from "react";
import { gsap, media, useGSAP } from "@/lib/motion/gsap";

/**
 * Decorative hero background: a fine grid, an orbit system drawn in SVG
 * (stroke-dash "drawing" on load), a soft green light that follows the
 * pointer on desktop, and a scroll-out where the hero content drifts up and
 * dims as the next section arrives.
 *
 * Everything here is aria-hidden; with reduced motion the finished, static
 * composition is shown.
 */
export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const section = root.parentElement as HTMLElement;
      const mm = gsap.matchMedia();

      mm.add({ motion: media.motion, desktop: media.desktop, fine: media.fine }, (ctx) => {
        const { motion, desktop, fine } = ctx.conditions as Record<string, boolean>;
        if (!motion) return;

        // 1. Draw the orbit lines in.
        const paths = root.querySelectorAll<SVGGeometryElement>("[data-draw]");
        paths.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        });
        const tl = gsap.timeline({ delay: 0.2 });
        tl.to(paths, { strokeDashoffset: 0, duration: 2.2, ease: "expo.inOut", stagger: 0.12 })
          .from("[data-node]", { scale: 0, transformOrigin: "50% 50%", duration: 0.8, ease: "back.out(2)", stagger: 0.08 }, 1.1)
          .from("[data-glow]", { opacity: 0, duration: 2 }, 0);

        // 2. Slow continuous rotation of the orbit system.
        gsap.to("[data-orbit]", { rotation: 360, transformOrigin: "50% 50%", duration: 140, ease: "none", repeat: -1 });
        gsap.to("[data-orbit-reverse]", { rotation: -360, transformOrigin: "50% 50%", duration: 90, ease: "none", repeat: -1 });

        // 3. Pointer-following light (desktop, fine pointer).
        let removePointer: (() => void) | undefined;
        const light = root.querySelector<HTMLElement>("[data-pointer-light]");
        if (desktop && fine && light) {
          const rect = section.getBoundingClientRect();
          gsap.set(light, { xPercent: -50, yPercent: -50, x: rect.width * 0.72, y: rect.height * 0.3, opacity: 1 });
          const xTo = gsap.quickTo(light, "x", { duration: 1.2, ease: "power3.out" });
          const yTo = gsap.quickTo(light, "y", { duration: 1.2, ease: "power3.out" });
          const onMove = (event: PointerEvent) => {
            const box = section.getBoundingClientRect();
            xTo(event.clientX - box.left);
            yTo(event.clientY - box.top);
          };
          section.addEventListener("pointermove", onMove);
          removePointer = () => section.removeEventListener("pointermove", onMove);
        }

        // 4. Scroll-out: content drifts up and dims, orbit sinks slower (parallax).
        const content = section.querySelector("[data-hero-content]");
        const st = { trigger: section, start: "top top", end: "bottom top", scrub: true };
        if (content) gsap.to(content, { yPercent: desktop ? -12 : -6, opacity: 0.25, ease: "none", scrollTrigger: st });
        gsap.to("[data-orbit-wrap]", { yPercent: desktop ? 18 : 8, ease: "none", scrollTrigger: st });

        return () => removePointer?.();
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="bg-grid absolute inset-0" />
      <div
        data-glow=""
        className="absolute inset-0 bg-[radial-gradient(900px_520px_at_78%_18%,rgba(0,229,139,0.13),transparent_70%)]"
      />
      <div
        data-pointer-light=""
        className="absolute left-0 top-0 hidden h-[520px] w-[520px] rounded-full opacity-0 bg-[radial-gradient(circle,rgba(0,229,139,0.09),transparent_65%)] [@media(hover:hover)_and_(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:lg:block"
      />

      <div data-orbit-wrap="" className="absolute -right-[18vw] -top-[12vw] h-[min(1100px,92vw)] w-[min(1100px,92vw)] opacity-80 sm:-right-[8vw]">
        <svg viewBox="0 0 800 800" className="h-full w-full" fill="none">
          <defs>
            <linearGradient id="hero-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#00e58b" stopOpacity="0.9" />
              <stop offset="0.5" stopColor="#00e58b" stopOpacity="0.15" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <g data-orbit="">
            <circle data-draw="" cx="400" cy="400" r="380" stroke="rgba(255,255,255,0.07)" />
            <circle data-draw="" cx="400" cy="400" r="300" stroke="url(#hero-stroke)" />
            <circle data-node="" cx="700" cy="400" r="5" fill="#00e58b" />
            <circle data-node="" cx="188" cy="612" r="3" fill="#f5f7f5" />
          </g>
          <g data-orbit-reverse="">
            <circle data-draw="" cx="400" cy="400" r="220" stroke="rgba(255,255,255,0.09)" strokeDasharray="2 8" />
            <path data-draw="" d="M400 180a220 220 0 0 1 220 220" stroke="#00e58b" strokeWidth="1.5" />
            <circle data-node="" cx="620" cy="400" r="4" fill="#00e58b" />
          </g>
          <circle data-draw="" cx="400" cy="400" r="140" stroke="rgba(255,255,255,0.06)" />
          <path data-draw="" d="M20 400h760M400 20v760" stroke="rgba(255,255,255,0.05)" />
          <circle data-node="" cx="400" cy="400" r="6" fill="#00e58b" />
          <circle cx="400" cy="400" r="22" stroke="rgba(0,229,139,0.35)" />
        </svg>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
