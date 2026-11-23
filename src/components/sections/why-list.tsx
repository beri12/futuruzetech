"use client";

import { useRef } from "react";
import { gsap, media, useGSAP } from "@/lib/motion/gsap";

type Item = { title: string; description: string; points: string[] };

/**
 * Numbered list of commitments. Desktop: each row's hairline fills with
 * green and the number lights up as the row crosses the viewport centre
 * (scrubbed). All rows are fully visible without motion.
 */
export function WhyList({ items }: { items: Item[] }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-why-row]")).forEach((row) => {
          const st = { trigger: row, start: "top 80%", end: "top 45%", scrub: 0.6 };
          gsap.fromTo(row.querySelector("[data-why-rule]"), { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: st });
          gsap.fromTo(row.querySelector("[data-why-num]"), { color: "#7d8a82" }, { color: "#00e58b", ease: "none", scrollTrigger: st });
          gsap.from(row.querySelectorAll("[data-why-fade]"), {
            y: 30,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="flex flex-col">
      {items.map((item, index) => (
        <li key={item.title} data-why-row="" className="group relative grid gap-4 py-10 sm:grid-cols-[72px_minmax(0,1fr)]">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
          <span aria-hidden="true" data-why-rule="" className="absolute inset-x-0 top-0 h-px origin-left bg-brand" />
          <span data-why-num="" className="font-display text-sm text-brand">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-4">
            <h3
              data-why-fade=""
              className="font-display text-[clamp(26px,2.8vw,40px)] font-medium leading-[1.05] tracking-[-0.035em] text-fg transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2 motion-reduce:transition-none"
            >
              {item.title}
            </h3>
            <p data-why-fade="" className="max-w-[540px] text-[16px] leading-relaxed text-fg-muted">
              {item.description}
            </p>
            <ul data-why-fade="" className="flex flex-wrap gap-2">
              {item.points.map((point) => (
                <li key={point} className="rounded-full border border-line px-3 py-1.5 text-xs text-fg-soft">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
