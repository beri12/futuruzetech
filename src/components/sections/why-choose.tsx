import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { WhyList } from "@/components/sections/why-list";
import { whyChoose } from "@/data/stack";

/**
 * Why choose us: sticky editorial heading on the left, five commitments on
 * the right. Each row's rule fills with green as it passes the middle of the
 * viewport (see WhyList).
 */
export function WhyChoose() {
  return (
    <section aria-labelledby="why-title" className="relative border-t border-line-soft bg-forest">
      <Container className="section-y grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="flex flex-col gap-8 lg:sticky lg:top-[calc(var(--header-h)+48px)] lg:self-start">
          <SectionHeading
            index="04"
            eyebrow="Why Futurize"
            id="why-title"
            title="More than a vendor. A technology partner."
            accent={["partner."]}
          />
          <Reveal>
            <p className="max-w-[460px] text-[17px] leading-relaxed text-fg-muted">
              We start from the business problem, communicate plainly, and build with practices that
              keep your product dependable long after launch.
            </p>
          </Reveal>
        </div>
        <WhyList items={whyChoose.map((item) => ({ ...item, points: [...item.points] }))} />
      </Container>
    </section>
  );
}
