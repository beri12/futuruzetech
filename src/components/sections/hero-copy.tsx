"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Children, type ReactNode } from "react";
import { easeOutExpo } from "@/components/motion/reveal";

/**
 * Staggers the hero's text children in on mount. Short delays only: the
 * whole sequence completes in well under a second.
 */
export function HeroCopy({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const items = Children.toArray(children);

  if (reduce) {
    return <div className="flex max-w-[640px] flex-1 basis-[480px] flex-col gap-7">{children}</div>;
  }

  return (
    <motion.div
      className="flex max-w-[640px] flex-1 basis-[480px] flex-col gap-7"
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }}
    >
      {items.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutExpo } },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
