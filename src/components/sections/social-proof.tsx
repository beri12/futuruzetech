import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { expectations } from "@/data/stack";
import { testimonials } from "@/data/testimonials";

/**
 * Shows verified testimonials when any exist; otherwise explains what a
 * client can expect. Nothing here is invented.
 */
export function SocialProof() {
  if (testimonials.length > 0) {
    return <Testimonials />;
  }
  return <Expectations />;
}

function Expectations() {
  return (
    <section aria-labelledby="expect-title" className="border-y border-line-soft bg-forest">
      <Container className="section-y flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Working together"
            id="expect-title"
            title="What to expect when working with us."
          />
        </Reveal>
        <Stagger
          as="ul"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-4"
        >
          {expectations.map((item) => (
            <StaggerItem
              as="li"
              key={item.title}
              className="flex flex-col gap-2.5 rounded-xl border border-line bg-surface-2 p-[26px]"
            >
              <span className="font-display text-[13px] font-semibold text-brand">{item.when}</span>
              <h3 className="text-[19px] font-semibold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-fg-muted">{item.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="border-y border-line-soft bg-forest">
      <Container className="section-y flex flex-col gap-10">
        <Reveal>
          <SectionHeading eyebrow="Client feedback" id="testimonials-title" title="What clients say." />
        </Reveal>
        <Stagger
          as="ul"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-4"
        >
          {testimonials.map((item) => (
            <StaggerItem
              as="li"
              key={`${item.author}-${item.organization}`}
              className="flex flex-col gap-5 rounded-xl border border-line bg-surface-2 p-7"
            >
              <blockquote className="text-[17px] leading-relaxed text-fg">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="flex flex-col text-sm">
                <span className="font-semibold text-fg">{item.author}</span>
                <span className="text-fg-muted">
                  {item.role}, {item.organization}
                </span>
              </figcaption>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
