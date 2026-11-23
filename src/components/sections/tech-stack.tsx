import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";
import { techStack } from "@/data/stack";

/** Headline technologies for the marquee rows; the full list is in the grid below. */
const rowA = ["React", "Next.js", "TypeScript", "Node.js", "NestJS", "Python", "Tailwind CSS"];
const rowB = ["PostgreSQL", "Prisma", "React Native", "Expo", "LLM APIs", "Docker", "Cloud hosting", "GSAP"];

function Pill({ label }: { label: string }) {
  return (
    <span className="mx-2 inline-flex items-center gap-3 rounded-full border border-line bg-white/[0.02] px-6 py-3.5 font-display text-[clamp(18px,1.6vw,24px)] tracking-[-0.02em] text-fg-soft transition-colors duration-500 hover:border-brand hover:text-fg">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
      {label}
    </span>
  );
}

/** Technology names only, no unofficial logos. */
export function TechStack({ index = "06" }: { index?: string }) {
  return (
    <section aria-labelledby="stack-title" className="relative overflow-hidden border-t border-line-soft bg-forest">
      <Container className="flex flex-col gap-10 pt-[var(--section-y)]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            index={index}
            eyebrow="Technology"
            id="stack-title"
            title="Modern tools. Thoughtful engineering."
            accent={["Thoughtful"]}
          />
          <p className="max-w-[380px] text-[16px] leading-relaxed text-fg-muted">
            We choose the stack that fits the problem, then build it well, with types, tests and
            infrastructure that your team can own.
          </p>
        </div>
      </Container>

      <div className="mt-[clamp(40px,5vw,72px)] flex flex-col gap-4" aria-hidden="true">
        <Marquee duration={45}>
          {rowA.map((item) => (
            <Pill key={item} label={item} />
          ))}
        </Marquee>
        <Marquee duration={50} reverse>
          {rowB.map((item) => (
            <Pill key={item} label={item} />
          ))}
        </Marquee>
      </div>

      <Container className="pb-[var(--section-y)] pt-[clamp(48px,6vw,88px)]">
        <Stagger as="ul" className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((category, i) => (
            <StaggerItem
              as="li"
              key={category.name}
              className={`flex flex-col gap-4 bg-forest p-6 ${i === techStack.length - 1 && techStack.length % 2 === 1 ? "sm:col-span-2" : ""}`}
            >
              <h3 className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-brand">{category.name}</h3>
              <ul className="flex flex-col gap-1.5 text-[15px] text-fg-soft">
                {category.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
