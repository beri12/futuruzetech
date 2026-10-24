import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroCopy } from "@/components/sections/hero-copy";
import { HeroVisual } from "@/components/sections/hero-visual";

/**
 * Homepage hero. The heading and copy are server-rendered so they are in the
 * HTML for search engines and readable before any JavaScript runs; the
 * motion wrappers only animate them in.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="bg-grid relative overflow-hidden border-b border-line-soft bg-forest"
    >
      <div className="bg-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="line-sweep" aria-hidden="true" />
      <Container className="relative flex flex-wrap items-center gap-12 py-[clamp(64px,8vw,112px)] pb-[clamp(64px,7vw,96px)]">
        <HeroCopy>
          <p className="eyebrow text-brand">Strategy · Design · Engineering · Growth</p>
          <h1
            id="hero-title"
            className="text-[clamp(40px,5.4vw,76px)] font-bold leading-[1.02] text-fg"
          >
            Your Next Big Idea. <span className="text-brand">Built for What&rsquo;s Next.</span>
          </h1>
          <p className="max-w-[560px] text-[clamp(16px,1.3vw,19px)] leading-relaxed text-fg-muted">
            We design and develop digital experiences, software products, AI-powered solutions, and
            growth strategies that help ambitious businesses move forward.
          </p>
          <div className="flex flex-wrap gap-3.5 pt-2">
            <Button href="/contact" size="lg" icon="arrow">
              Start a Project
            </Button>
            <Button href="/work" size="lg" variant="ghost" icon="external">
              Explore Our Work
            </Button>
          </div>
          <p className="flex items-center gap-2.5 pt-1 text-[13px] text-fg-dim">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-line" />
            Serving businesses across Ethiopia, Africa, and international markets
          </p>
        </HeroCopy>
        <HeroVisual />
      </Container>
    </section>
  );
}
