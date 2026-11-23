"use client";

import { useRef } from "react";
import { gsap, media, useGSAP } from "@/lib/motion/gsap";

/**
 * Desktop-only cursor follower. The native cursor stays visible (so nothing
 * about pointing or text selection changes); a thin ring trails it, grows
 * over interactive elements and shows a short label over elements that
 * declare `data-cursor-label` (for example "View" on project cards).
 *
 * Not created at all on touch devices or with reduced motion.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(`${media.motion} and ${media.fine} and ${media.desktop}`, () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        el.dataset.visible = "true";
        xTo(event.clientX);
        yTo(event.clientY);
        const target = event.target as Element | null;
        const labelled = target?.closest<HTMLElement>("[data-cursor-label]");
        if (labelled?.dataset.cursorLabel) {
          el.dataset.state = "label";
          if (labelRef.current) labelRef.current.textContent = labelled.dataset.cursorLabel;
          return;
        }
        el.dataset.state = target?.closest("a, button, [role='button'], input, select, textarea, label") ? "hover" : "default";
      };
      const onLeave = () => {
        el.dataset.visible = "false";
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      return () => {
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        el.dataset.visible = "false";
      };
    });
    return () => mm.revert();
  });

  return (
    <div ref={ref} aria-hidden="true" className="ft-cursor hidden lg:flex" data-visible="false" data-state="default">
      <span ref={labelRef} className="ft-cursor-label" />
    </div>
  );
}
