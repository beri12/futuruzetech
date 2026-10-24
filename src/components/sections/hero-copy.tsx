import type { ReactNode } from "react";

/**
 * Wraps the hero's text children and staggers them in with a CSS keyframe
 * animation (see `.hero-enter` in globals.css).
 *
 * CSS rather than Framer Motion on purpose: the animation starts at first
 * paint instead of waiting for JavaScript to hydrate, which keeps the
 * Largest Contentful Paint early on slow connections. Reduced-motion users
 * see the content immediately with no animation.
 */
export function HeroCopy({ children }: { children: ReactNode }) {
  return <div className="hero-enter flex max-w-[640px] flex-1 basis-[480px] flex-col gap-7">{children}</div>;
}
