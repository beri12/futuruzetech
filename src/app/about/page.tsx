import type { Metadata } from "next";
import { Compass, Handshake, Lightbulb, Scale, Wrench, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { TechStack } from "@/components/sections/tech-stack";
import { SocialProof } from "@/components/sections/social-proof";
import { CtaBanner } from "@/components/sections/cta-banner";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Futurize Technology is a technology partner for businesses in Ethiopia, Africa and international markets: our approach, mission, values and working principles.",
  path: "/about",
});

const values: Array<{ title: string; description: string; icon: LucideIcon }> = [
  {
    title: "Usefulness over novelty",
    description:
      "We choose the technology that solves the problem, not the one that is fashionable this year.",
    icon: Compass,
  },
  {
    title: "Honesty about scope",
    description:
      "If something is uncertain, expensive, or not worth building yet, we say so before you commit.",
    icon: Scale,
  },
  {
    title: "Craft in the details",
    description:
      "Readable code, accessible interfaces, and fast pages are standard, not extras.",
    icon: Wrench,
  },
  {
    title: "Partnership, not hand-offs",
    description:
      "We stay involved after launch and treat your product's success as the measure of ours.",
    icon: Handshake,
  },
  {
    title: "Curiosity about your business",
    description:
      "Understanding how you work and who you serve is where every good solution starts.",
    icon: Lightbulb,
  },
];

const principles = [
  {
    title: "Start with the problem",
    description:
      "Every engagement begins with discovery: goals, users, constraints, and what success means. Only then do we propose a solution.",
  },
  {
    title: "Ship in milestones",
    description:
      "Working software at each stage, reviewed together, so there are no surprises at the end and you can change direction early.",
  },
  {
    title: "Design for the real device",
    description:
      "Many of our users are on mid-range phones over mobile data. We design and test for those conditions first.",
  },
  {
    title: "Leave things better documented",
    description:
      "Code, decisions, and setup are written down so your team, or any future team, can pick the work up without us.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A technology partner for what comes next."
        description={`${siteConfig.name} helps businesses turn ideas into usable digital products: websites, software, mobile apps, AI solutions, and the marketing that brings people to them.`}
        breadcrumbs={[{ label: "About" }]}
        size="large"
      />

      <section aria-labelledby="mission-title" className="bg-ink">
        <Container className="section-y flex flex-wrap gap-14">
          <Reveal className="flex max-w-[600px] flex-1 basis-[400px] flex-col gap-6">
            <SectionHeading
              eyebrow="Our mission"
              id="mission-title"
              title="Make good technology accessible to ambitious businesses."
            />
            <p className="text-[17px] leading-relaxed text-fg-muted">
              {siteConfig.shortName} exists to close a gap we see often: businesses with real
              ambition and real customers, held back by software that is either too generic to fit
              or too complicated to keep running. Our work is to build the thing that fits, explain it
              plainly, and keep it working.
            </p>
            <p className="text-[17px] leading-relaxed text-fg-muted">
              Our primary market is Ethiopia and the wider African continent, where we understand the
              devices, networks, payment systems, and business realities first-hand. We also work
              with international clients who value a dependable, well-communicating partner.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-1 basis-[360px] flex-col gap-4">
            <h3 className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-fg-dim">
              How we work
            </h3>
            <ol className="flex flex-col divide-y divide-line border-y border-line">
              {principles.map((principle, index) => (
                <li key={principle.title} className="flex gap-5 py-5">
                  <span className="font-display text-[13px] font-semibold tracking-[0.14em] text-brand">
                    0{index + 1}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-[17px] font-semibold">{principle.title}</h4>
                    <p className="text-sm leading-relaxed text-fg-muted">{principle.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="values-title" className="border-y border-line-soft bg-forest">
        <Container className="section-y flex flex-col gap-10">
          <Reveal>
            <SectionHeading eyebrow="Values" id="values-title" title="What we hold ourselves to." />
          </Reveal>
          <Stagger as="ul" className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <StaggerItem
                  as="li"
                  key={value.title}
                  className="flex flex-col gap-3 rounded-xl border border-line bg-surface-2 p-6"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-surface"
                  >
                    <Icon size={20} strokeWidth={1.8} className="text-brand" />
                  </span>
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-fg-muted">{value.description}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <TechStack />
      <SocialProof />
      <CtaBanner
        title="Want to know if we are the right fit?"
        description="A short conversation is the quickest way to find out. No obligation."
        secondary={{ label: "See our process", href: "/process" }}
      />
    </>
  );
}
