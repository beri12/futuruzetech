import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/config/site";

export function Intro() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-ink">
      <Container className="section-y flex flex-wrap items-center gap-14">
        <Reveal className="flex max-w-[600px] flex-1 basis-[440px] flex-col gap-6">
          <SectionHeading
            eyebrow="Who we are"
            id="about-title"
            title="Technology should move your business forward."
          />
          <p className="text-[17px] leading-relaxed text-fg-muted">
            {siteConfig.name} helps organizations turn ideas into usable digital products. We combine
            software engineering, thoughtful design, automation, and digital marketing so that what
            we build is not only well made, but actually works for the people who use it and the
            business behind it.
          </p>
          <p className="text-[17px] leading-relaxed text-fg-muted">
            We work with startups, SMEs, and organizations in Ethiopia and across Africa, as well as
            international clients who want a dependable technology partner.
          </p>
          <div>
            <Button href="/about" variant="link" icon="arrow">
              Discover Futurize
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-1 basis-[380px] justify-center">
          <IntroVisual />
        </Reveal>
      </Container>
    </section>
  );
}

/** Abstract "idea to product" grid, drawn with markup so it scales cleanly. */
function IntroVisual() {
  return (
    <div
      aria-hidden="true"
      className="grid aspect-square w-full max-w-[440px] grid-cols-3 grid-rows-3 gap-3"
    >
      <div className="rounded-2xl border border-line bg-surface" />
      <div className="rounded-2xl border border-line bg-surface-2" />
      <div className="rounded-2xl bg-brand" />
      <div className="col-span-2 flex items-center justify-center rounded-2xl border border-line bg-surface-2">
        <span className="font-display text-[13px] uppercase tracking-[0.2em] text-fg-muted">
          Idea → Product
        </span>
      </div>
      <div className="rounded-full border border-line bg-surface" />
      <div className="rounded-2xl border border-brand" />
      <div className="col-span-2 flex items-center justify-around rounded-2xl border border-line bg-surface px-5">
        <span className="h-2.5 w-2.5 rounded-full bg-brand" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
      </div>
    </div>
  );
}
