import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Chip } from "@/components/ui/chip";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { techStack } from "@/data/stack";

/** Technology names only, in restrained chips. No unofficial logos. */
export function TechStack() {
  return (
    <section aria-labelledby="stack-title" className="bg-ink">
      <Container className="section-y flex flex-wrap gap-14">
        <Reveal className="flex max-w-[420px] flex-1 basis-[320px] flex-col gap-4">
          <SectionHeading
            eyebrow="Technology"
            id="stack-title"
            title="Modern tools. Thoughtful engineering."
            description="We choose the stack that fits the problem, then build it well."
          />
        </Reveal>
        <Stagger
          as="ul"
          className="grid flex-[2] basis-[560px] grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-3.5"
        >
          {techStack.map((category) => (
            <StaggerItem
              as="li"
              key={category.name}
              className="flex flex-col gap-3 rounded-lg border border-line bg-surface-2 p-5"
            >
              <h3 className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-fg-dim">
                {category.name}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li key={item}>
                    <Chip tone="solid">{item}</Chip>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
