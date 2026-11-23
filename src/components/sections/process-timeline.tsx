"use client";

import { useRef } from "react";
import type { ProcessStep } from "@/types";
import { gsap, media, useGSAP } from "@/lib/motion/gsap";

/**
 * Step timeline. A single green progress rule runs across the steps and
 * fills as the list scrolls through the viewport (scrubbed), lighting each
 * step's marker as it passes. Without JavaScript or with reduced motion all
 * steps are fully visible and the rule is complete.
 */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        const markers = gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-step-marker]"));
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 55%", scrub: 0.6 },
        });
        tl.fromTo("[data-step-rule]", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: markers.length }, 0);
        markers.forEach((marker, index) => {
          tl.fromTo(
            marker,
            { backgroundColor: "#080b09", borderColor: "rgba(255,255,255,0.18)" },
            { backgroundColor: "#00e58b", borderColor: "#00e58b", duration: 0.2 },
            index,
          );
        });
        gsap.from("[data-step]", {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className="relative">
      <div aria-hidden="true" className="absolute inset-x-0 top-[7px] hidden h-px bg-line lg:block">
        <div data-step-rule="" className="h-px origin-left bg-brand" />
      </div>
      <ol className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col">
        {steps.map((step) => (
          <li key={step.number} data-step="" className="relative flex flex-col gap-4">
            <span
              aria-hidden="true"
              data-step-marker=""
              className="h-[15px] w-[15px] rounded-full border border-brand bg-brand"
            />
            <span className="font-display text-sm text-fg-dim">{step.number}</span>
            <h3 className="font-display text-[clamp(22px,1.8vw,28px)] font-medium tracking-[-0.03em] text-fg">{step.title}</h3>
            <p className="text-[15px] leading-relaxed text-fg-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
