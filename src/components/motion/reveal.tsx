"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

/**
 * Shared motion tokens so every reveal on the site uses the same timing.
 */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
};

export const staggerVariants = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Reveal once the element enters the viewport (default) or immediately on mount. */
  trigger?: "view" | "mount";
  amount?: number;
};

/**
 * Fade-and-rise reveal. Respects prefers-reduced-motion by rendering the
 * final state immediately, so content never depends on animation to appear.
 */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  trigger = "view",
  amount = 0.2,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion.create(as as "div");

  if (reduce) {
    return <Comp className={className}>{children}</Comp>;
  }

  const viewProps =
    trigger === "view"
      ? { whileInView: "visible" as const, viewport: { once: true, amount } }
      : { animate: "visible" as const };

  return (
    <Comp
      className={className}
      initial="hidden"
      {...viewProps}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo, delay } },
      }}
    >
      {children}
    </Comp>
  );
}

type StaggerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
};

/**
 * Staggers the reveal of its direct `StaggerItem` children.
 */
export function Stagger({ children, as = "div", className, stagger = 0.08, delay = 0, amount = 0.15 }: StaggerProps) {
  const reduce = useReducedMotion();
  const Comp = motion.create(as as "div");
  if (reduce) return <Comp className={className}>{children}</Comp>;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={staggerVariants(stagger, delay)}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  as = "div",
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const Comp = motion.create(as as "div");
  if (reduce) return <Comp className={className}>{children}</Comp>;
  return (
    <Comp className={className} variants={revealVariants}>
      {children}
    </Comp>
  );
}
