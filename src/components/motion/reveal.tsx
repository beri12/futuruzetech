"use client";

import { useRef, type ReactNode } from "react";
import { duration, ease, gsap, media, stagger as staggerTokens, startAt, travel, useGSAP } from "@/lib/motion/gsap";

/**
 * Layout tags the reveal primitives can render as.
 */
export type MotionTag = "div" | "section" | "article" | "ul" | "ol" | "li" | "header" | "figure" | "p";

type RevealProps = {
  children: ReactNode;
  as?: MotionTag;
  className?: string;
  delay?: number;
  /** Reveal once the element enters the viewport (default) or immediately on mount. */
  trigger?: "view" | "mount";
  /** Share of the element that must be visible before it reveals. */
  amount?: number;
  /** Optional blur-to-sharp variant for editorial blocks. */
  blur?: boolean;
};

/**
 * Fade-and-rise reveal driven by GSAP ScrollTrigger.
 *
 * Content is rendered visible on the server; the hidden "from" state is only
 * applied after hydration, and only when the user allows motion. Without
 * JavaScript, or with prefers-reduced-motion, everything is simply visible.
 */
export function Reveal({ children, as: Tag = "div", className, delay = 0, trigger = "view", amount = 0.2, blur = false }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add({ motion: media.motion, desktop: media.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const desktop = Boolean(ctx.conditions.desktop);
        gsap.from(el, {
          y: travel(desktop, 36),
          autoAlpha: 0,
          duration: desktop ? duration.base : duration.fast + 0.15,
          delay,
          ease: ease.out,
          ...(blur ? { filter: "blur(10px)", clearProps: "filter" } : {}),
          ...(trigger === "view" ? { scrollTrigger: { trigger: el, start: startAt(amount), once: true } } : {}),
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}

type StaggerProps = {
  children: ReactNode;
  as?: MotionTag;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
};

/**
 * Staggers the reveal of its `StaggerItem` children when the group scrolls
 * into view.
 */
export function Stagger({ children, as: Tag = "div", className, stagger = staggerTokens.items, delay = 0, amount = 0.15 }: StaggerProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add({ motion: media.motion, desktop: media.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const desktop = Boolean(ctx.conditions.desktop);
        const items = gsap.utils.toArray<HTMLElement>(el.querySelectorAll(":scope > [data-stagger-item]"));
        if (items.length === 0) return;
        gsap.from(items, {
          y: travel(desktop, 44),
          autoAlpha: 0,
          duration: desktop ? duration.base : duration.fast + 0.15,
          ease: ease.out,
          delay,
          stagger: desktop ? stagger : stagger * 0.6,
          scrollTrigger: { trigger: el, start: startAt(amount), once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}

export function StaggerItem({ children, as: Tag = "div", className }: { children: ReactNode; as?: MotionTag; className?: string }) {
  return (
    <Tag data-stagger-item="" className={className}>
      {children}
    </Tag>
  );
}
