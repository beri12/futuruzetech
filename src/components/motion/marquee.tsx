import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite marquee in pure CSS (no JavaScript, no layout reads). The content
 * is rendered twice and the track slides by exactly half its width, so the
 * loop is seamless. The duplicate is hidden from assistive technology.
 * Pauses on hover; reduced motion stops it and lets the row wrap.
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className,
  label,
}: {
  children: ReactNode;
  /** Seconds per loop. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  label?: string;
}) {
  return (
    <div
      role={label ? "region" : undefined}
      aria-label={label}
      className={cn(
        "marquee relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]",
        className,
      )}
    >
      <div
        className="marquee-track flex w-max shrink-0 motion-reduce:w-full motion-reduce:flex-wrap"
        data-reverse={reverse ? "true" : "false"}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center motion-reduce:flex-wrap">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 items-center motion-reduce:hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
