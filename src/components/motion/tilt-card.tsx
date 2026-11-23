"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useTilt } from "@/hooks/use-tilt";

/**
 * Card shell with a cursor spotlight, a glowing border that follows the
 * pointer, and an optional subtle 3D tilt (desktop only).
 */
export function TiltCard({
  children,
  className,
  max = 4,
  tilt = true,
  as: Tag = "div",
  cursorLabel,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  tilt?: boolean;
  as?: "div" | "article" | "li";
  cursorLabel?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useTilt(ref, { max, tilt });
  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-cursor-label={cursorLabel}
      className={cn("spotlight", className)}
    >
      {children}
    </Tag>
  );
}
