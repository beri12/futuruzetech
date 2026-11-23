"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { gsap } from "@/lib/motion/gsap";
import { getLenis } from "@/lib/motion/lenis-store";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = getLenis();
    if (reduce) {
      window.scrollTo({ top: 0 });
    } else if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      gsap.to(window, { scrollTo: 0, duration: 1.1, ease: "power3.inOut" });
    }
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={toTop}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "fixed bottom-6 right-6 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-line-strong bg-ink/70 text-fg shadow-chip backdrop-blur-md transition-[opacity,transform,border-color,color] duration-500 ease-[var(--ease-out-expo)] hover:border-brand hover:text-brand motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp aria-hidden="true" size={18} strokeWidth={2} />
    </button>
  );
}
