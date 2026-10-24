"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ProcessStep } from "@/types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Step timeline. The top rule of each step fills with emerald as the list
 * scrolls into view (GSAP ScrollTrigger, scrubbed), which reads as progress
 * along the process. Without JavaScript or with reduced motion every step is
 * fully visible and the first rule is highlighted, so the content never
 * depends on the animation.
 */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const scope = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rules = gsap.utils.toArray<HTMLElement>("[data-step-rule]");
        gsap.set(rules, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(rules, {
          scaleX: 1,
          ease: "none",
          stagger: 0.2,
          scrollTrigger: {
            trigger: scope.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        });
        gsap.from("[data-step]", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: scope.current, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <ol
      ref={scope}
      className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4"
    >
      {steps.map((step) => (
        <li key={step.number} data-step className="relative flex flex-col gap-3 pt-6">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-line" />
          <span
            aria-hidden="true"
            data-step-rule
            className="absolute inset-x-0 top-0 h-0.5 bg-brand"
          />
          <span className="font-display text-[13px] font-semibold tracking-[0.14em] text-brand">
            {step.number}
          </span>
          <h3 className="text-xl font-semibold">{step.title}</h3>
          <p className="text-sm leading-relaxed text-fg-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
