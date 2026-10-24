"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Check } from "lucide-react";

gsap.registerPlugin(useGSAP);

/**
 * Abstract layered product interface for the hero. Real responsive markup
 * (not an image), animated with one GSAP timeline:
 *
 *  1. panels rise into place
 *  2. chart bars grow from the baseline
 *  3. a light sweep crosses the main panel
 *  4. a slow floating loop keeps the composition alive
 *
 * A small pointer-driven parallax runs on fine-pointer devices only. All of
 * it is skipped under prefers-reduced-motion via gsap.matchMedia, leaving
 * the finished composition visible.
 */
export function HeroVisual() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          fine: "(pointer: fine)",
        },
        (context) => {
          const { fine } = context.conditions as { fine: boolean };

          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          tl.from("[data-hero-panel]", { y: 40, opacity: 0, duration: 1, stagger: 0.12 }, 0.1)
            .from(
              "[data-hero-bar]",
              { scaleY: 0, transformOrigin: "bottom", duration: 0.8, stagger: 0.05 },
              0.5,
            )
            .from("[data-hero-row]", { x: -12, opacity: 0, duration: 0.5, stagger: 0.08 }, 0.7)
            .fromTo(
              "[data-hero-sweep]",
              { xPercent: -120, opacity: 0 },
              { xPercent: 220, opacity: 0.6, duration: 1.4, ease: "power2.inOut" },
              0.9,
            );

          gsap.to("[data-hero-float='1']", {
            y: -8,
            duration: 3.2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1.4,
          });
          gsap.to("[data-hero-float='2']", {
            y: 10,
            duration: 4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1.6,
          });

          if (fine && scope.current) {
            const root = scope.current;
            const xTo = gsap.quickTo("[data-hero-parallax]", "x", { duration: 0.6, ease: "power3" });
            const yTo = gsap.quickTo("[data-hero-parallax]", "y", { duration: 0.6, ease: "power3" });
            const onMove = (event: PointerEvent) => {
              const rect = root.getBoundingClientRect();
              const dx = (event.clientX - rect.left) / rect.width - 0.5;
              const dy = (event.clientY - rect.top) / rect.height - 0.5;
              xTo(dx * 14);
              yTo(dy * 10);
            };
            const onLeave = () => {
              xTo(0);
              yTo(0);
            };
            root.addEventListener("pointermove", onMove);
            root.addEventListener("pointerleave", onLeave);
            return () => {
              root.removeEventListener("pointermove", onMove);
              root.removeEventListener("pointerleave", onLeave);
            };
          }
        },
      );

      return () => mm.revert();
    },
    { scope },
  );

  const bars = [38, 52, 44, 66, 58, 80, 72, 92];

  return (
    <div
      ref={scope}
      aria-hidden="true"
      className="relative flex min-h-[460px] flex-1 basis-[440px] items-center justify-center"
    >
      <div data-hero-parallax className="relative h-[440px] w-full max-w-[560px]">
        {/* Main dashboard panel */}
        <div
          data-hero-panel
          className="absolute left-0 top-6 flex h-[360px] w-[min(480px,88%)] flex-col overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-panel"
        >
          <div className="relative flex items-center gap-2 border-b border-line-soft px-4 py-3.5">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="ml-2.5 text-[11px] tracking-[0.04em] text-fg-muted">product / overview</span>
            <span className="ml-auto rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold text-forest">
              LIVE
            </span>
          </div>
          <div
            data-hero-sweep
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-brand/20 to-transparent opacity-0"
          />
          <div className="flex min-h-0 flex-1">
            <div className="flex w-12 flex-col items-center gap-3.5 border-r border-line-soft pt-4">
              <span className="h-5 w-5 rounded-md bg-brand" />
              <span className="h-5 w-5 rounded-md bg-line-soft" />
              <span className="h-5 w-5 rounded-md bg-line-soft" />
              <span className="h-5 w-5 rounded-md bg-line-soft" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-4 p-4">
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  ["w-11", "w-[68px] bg-fg/85"],
                  ["w-[38px]", "w-14 bg-fg/85"],
                  ["w-[50px]", "w-10 bg-brand"],
                ].map(([a, b], index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 rounded-[10px] border border-line-soft bg-surface p-3"
                  >
                    <span className={`h-1.5 rounded-sm bg-line ${a}`} />
                    <span className={`h-3 rounded-sm ${b}`} />
                  </div>
                ))}
              </div>
              <div className="flex flex-1 items-end gap-2 rounded-[10px] border border-line-soft bg-surface p-3.5">
                {bars.map((height, index) => (
                  <span
                    key={index}
                    data-hero-bar
                    style={{ height: `${height}%` }}
                    className={`flex-1 rounded-t-[4px] ${index === 5 || index === 7 ? "bg-brand" : "bg-[#1F3328]"}`}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {[
                  ["Build", "w-[120px]", true],
                  ["Deploy", "w-[88px]", true],
                  ["Monitor", "w-16", false],
                ].map(([label, width, done]) => (
                  <div key={String(label)} data-hero-row className="flex items-center gap-2.5">
                    <span
                      className={`h-2 w-2 rounded-full ${done ? "bg-brand" : "border border-brand"}`}
                    />
                    <span className="text-[11px] text-fg-muted">{label}</span>
                    <span className={`ml-auto h-1.5 rounded-sm bg-line ${width}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating code panel */}
        <div
          data-hero-panel
          data-hero-float="2"
          className="absolute bottom-0 right-0 w-[min(300px,62%)] rounded-[14px] border border-line bg-surface p-4 font-mono text-xs leading-[1.7] text-fg-muted shadow-float"
        >
          <div className="mb-2.5 flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-line" />
            <span className="h-2 w-2 rounded-full bg-line" />
            <span className="h-2 w-2 rounded-full bg-brand" />
          </div>
          <div>
            <span className="text-fg-dim">const</span> <span className="text-fg">launch</span> ={" "}
            <span className="text-fg-dim">await</span> futurize.<span className="text-brand">build</span>({"{"}
          </div>
          <div className="pl-4">
            product: <span className="text-brand-bright">&quot;mobile-app&quot;</span>,
          </div>
          <div className="pl-4">
            stack: [<span className="text-brand-bright">&quot;next&quot;</span>,{" "}
            <span className="text-brand-bright">&quot;nest&quot;</span>,{" "}
            <span className="text-brand-bright">&quot;expo&quot;</span>],
          </div>
          <div className="pl-4">
            ai: <span className="text-brand-bright">true</span>
          </div>
          <div>{"});"}</div>
        </div>

        {/* Floating status chip */}
        <div
          data-hero-panel
          data-hero-float="1"
          className="absolute right-[8%] top-0 flex items-center gap-2 rounded-full border border-line bg-surface-2 py-2 pl-2.5 pr-3.5 shadow-chip"
        >
          <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-brand">
            <Check size={12} strokeWidth={3} className="text-forest" />
          </span>
          <span className="text-xs font-medium text-fg">Deployment ready</span>
        </div>
      </div>
    </div>
  );
}
