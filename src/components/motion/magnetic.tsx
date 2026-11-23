"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/use-magnetic";

/**
 * Wraps a button or link so it is pulled toward the pointer on hover.
 * The child keeps its own semantics and focus handling.
 */
export function Magnetic({ children, strength = 14, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useMagnetic(ref, { strength });
  return (
    <span ref={ref} className={cn("inline-flex will-change-transform", className)}>
      {children}
    </span>
  );
}
