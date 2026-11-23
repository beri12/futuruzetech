"use client";

import { useRef, type ElementType } from "react";
import { cn } from "@/lib/utils";
import { duration, ease, gsap, media, stagger, startAt, useGSAP } from "@/lib/motion/gsap";

type Effect = "rise" | "blur" | "fade" | "chars";

type SplitTextProps = {
  text: string;
  as?: ElementType;
  id?: string;
  className?: string;
  /** rise: words slide up from a mask. blur: words sharpen in. chars: characters stagger up. */
  effect?: Effect;
  trigger?: "view" | "load";
  delay?: number;
  /** Words to render in the serif italic accent (exact match, punctuation ignored). */
  accent?: string[];
  /** Words to render in brand green. */
  highlight?: string[];
};

const clean = (word: string) => word.replace(/[^\p{L}\p{N}'’-]/gu, "").toLowerCase();

/**
 * Split-text heading without a third-party splitter.
 *
 * The text is split into words (and characters for the `chars` effect) at
 * render time, so the server HTML already contains the final structure: no
 * layout shift on hydration, no measuring, and it works with any font.
 * Screen readers get the whole sentence once via a visually hidden copy;
 * the animated spans are aria-hidden.
 */
export function SplitText({
  text,
  as: Tag = "h2",
  id,
  className,
  effect = "rise",
  trigger = "view",
  delay = 0,
  accent = [],
  highlight = [],
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const accentSet = new Set(accent.map(clean));
  const highlightSet = new Set(highlight.map(clean));
  const words = text.split(/\s+/).filter(Boolean);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add({ motion: media.motion, desktop: media.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const desktop = Boolean(ctx.conditions.desktop);
        const st = trigger === "view" ? { scrollTrigger: { trigger: el, start: startAt(0.25), once: true } } : {};

        if (effect === "chars") {
          gsap.from(el.querySelectorAll("[data-char]"), {
            yPercent: 110,
            rotate: desktop ? 6 : 0,
            duration: duration.base,
            ease: ease.out,
            stagger: desktop ? stagger.chars : stagger.chars * 0.5,
            delay,
            ...st,
          });
          return;
        }
        const targets = el.querySelectorAll("[data-word]");
        if (effect === "blur") {
          gsap.from(targets, {
            autoAlpha: 0,
            filter: "blur(12px)",
            y: desktop ? 18 : 8,
            duration: duration.slow,
            ease: ease.outSoft,
            stagger: stagger.words,
            delay,
            clearProps: "filter",
            ...st,
          });
          return;
        }
        if (effect === "fade") {
          gsap.from(targets, { autoAlpha: 0, duration: duration.base, stagger: stagger.words, delay, ...st });
          return;
        }
        gsap.from(targets, {
          yPercent: 115,
          duration: duration.slow,
          ease: ease.out,
          stagger: desktop ? stagger.words : stagger.words * 0.6,
          delay,
          ...st,
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const masked = effect === "rise" || effect === "chars";

  return (
    <Tag ref={ref} id={id} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => {
          const key = clean(word);
          const wordClass = cn(
            "inline-block",
            accentSet.has(key) && "accent-serif pr-[0.04em]",
            highlightSet.has(key) && "text-brand",
          );
          const inner =
            effect === "chars" ? (
              <span className={cn(wordClass, "whitespace-nowrap")}>
                {Array.from(word).map((char, charIndex) => (
                  <span key={charIndex} className="inline-block overflow-clip pb-[0.06em] align-bottom">
                    <span data-char="" className="inline-block">
                      {char}
                    </span>
                  </span>
                ))}
              </span>
            ) : (
              <span data-word="" className={wordClass}>
                {word}
              </span>
            );
          return (
            <span key={index}>
              {masked && effect !== "chars" ? (
                <span className="inline-block overflow-clip pb-[0.08em] align-bottom [overflow-clip-margin:0.1em]">{inner}</span>
              ) : (
                inner
              )}
              {index < words.length - 1 ? " " : null}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
