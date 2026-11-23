import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ScrambleText } from "@/components/motion/scramble-text";
import { HeroBackdrop } from "@/components/sections/hero-backdrop";

const lines: Array<{ text: React.ReactNode; className?: string }> = [
  { text: "Engineering" },
  { text: <span className="accent-serif text-fg-soft">Tomorrow.</span>, className: "pl-[8vw]" },
  { text: "Building What" },
  { text: <span className="text-brand">Matters.</span>, className: "md:pl-[22vw]" },
];

/**
 * Homepage hero.
 *
 * The headline is server-rendered and revealed line by line with a CSS mask
 * animation, so it paints before any JavaScript runs and the Largest
 * Contentful Paint is not held back. The animated backdrop is a separate
 * client component that only adds decoration.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative -mt-[var(--header-h)] flex min-h-[100svh] flex-col overflow-hidden border-b border-line-soft bg-ink"
    >
      <HeroBackdrop />
      <Container
        data-hero-content=""
        className="relative flex flex-1 flex-col justify-end gap-[clamp(32px,5vh,64px)] pb-10 pt-[calc(var(--header-h)+clamp(40px,8vh,104px))]"
      >
        <div className="fade-in-late flex flex-wrap items-center justify-between gap-4 [--d:0.05s]">
          <p className="eyebrow flex items-center gap-3 text-fg-muted">
            <span aria-hidden="true" className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-brand/60 motion-reduce:hidden" />
              <span className="relative h-2 w-2 rounded-full bg-brand" />
            </span>
            <ScrambleText text="Software · AI · Enterprise · Digital" trigger="load" delay={0.3} />
          </p>
          <p className="eyebrow hidden text-fg-dim sm:block">Ethiopia · Africa · Worldwide</p>
        </div>

        <h1 id="hero-title" className="text-display-xl text-fg">
          {lines.map((line, index) => (
            <span key={index} className={`line-mask ${line.className ?? ""}`} style={{ "--i": index } as React.CSSProperties}>
              <span>{line.text}</span>
            </span>
          ))}
        </h1>

        <div className="grid gap-8 border-t border-line pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="fade-in-late flex max-w-[560px] flex-col gap-7 [--d:0.7s]">
            <p className="text-lead text-fg-muted">
              We transform ambitious ideas into intelligent digital products through software
              engineering, AI, and innovative technology.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" size="lg" icon="arrow" magnetic>
                Start a Project
              </Button>
              <Button href="/work" size="lg" variant="ghost" magnetic>
                View Our Work
              </Button>
            </div>
          </div>
          <a
            href="#about"
            className="fade-in-late group hidden items-center gap-4 self-end text-xs uppercase tracking-[0.24em] text-fg-muted transition-colors hover:text-fg md:flex [--d:1s]"
          >
            Scroll to explore
            <span className="scroll-cue relative inline-flex h-14 w-px overflow-hidden bg-line" aria-hidden="true" />
            <ArrowDown aria-hidden="true" size={14} className="transition-transform duration-500 group-hover:translate-y-1" />
          </a>
        </div>
      </Container>
    </section>
  );
}
