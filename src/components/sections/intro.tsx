import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/typography";
import { Reveal } from "@/components/motion/reveal";
import { ScrollText } from "@/components/motion/scroll-text";
import { Counter } from "@/components/motion/counter";
import { DrawSvg } from "@/components/motion/draw-svg";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { techStack } from "@/data/stack";

/*
 * Figures are counted from the site's own data, so they are always true:
 * no invented client counts, years or percentages.
 */
const stats = [
  { value: services.length, label: "Service disciplines under one roof" },
  { value: projects.length, label: "Products featured in our portfolio" },
  { value: new Set(techStack.flatMap((category) => category.items)).size, label: "Technologies in our working stack" },
];

export function Intro() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-24 bg-ink">
      <Container className="section-y flex flex-col gap-[clamp(56px,8vw,120px)]">
        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
          <Reveal>
            <Eyebrow index="01">About</Eyebrow>
            <h2 id="about-title" className="sr-only">
              About Futurize Technology
            </h2>
          </Reveal>
          <ScrollText
            text="Futurize Technology is an innovation-driven technology partner. We combine software engineering, artificial intelligence and thoughtful design to turn ambitious ideas into products that are reliable, scalable and genuinely useful."
            highlight={["innovation-driven", "useful."]}
          />
        </div>

        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <Reveal className="flex max-w-[560px] flex-col gap-6">
            <p className="text-[17px] leading-relaxed text-fg-muted">
              We work with startups, growing businesses and established organizations in Ethiopia and
              across Africa, and with international clients who want a dependable engineering partner.
              Strategy, design, engineering and growth sit in one team, so nothing gets lost between
              hand-offs.
            </p>
            <div>
              <Button href="/about" variant="ghost" icon="arrow">
                Discover Futurize
              </Button>
            </div>
          </Reveal>

          <DrawSvg className="relative">
            <svg aria-hidden="true" viewBox="0 0 640 220" fill="none" className="mb-8 w-full">
              <path data-draw="" d="M0 190 C 120 190, 140 120, 240 120 S 380 60, 470 60 S 580 26, 616 24" stroke="#00e58b" strokeWidth="1.5" />
              <path data-draw="" d="M0 205 H640" stroke="rgba(255,255,255,0.12)" />
              {[0, 160, 320, 480, 640].map((x) => (
                <path key={x} data-draw="" d={`M${x} 200 V210`} stroke="rgba(255,255,255,0.2)" />
              ))}
              <circle data-pop="" cx="240" cy="120" r="5" fill="#00e58b" />
              <circle data-pop="" cx="470" cy="60" r="5" fill="#00e58b" />
              <circle data-pop="" cx="616" cy="24" r="7" fill="#00e58b" />
              <circle data-pop="" cx="616" cy="24" r="16" stroke="rgba(0,229,139,0.4)" />
            </svg>
            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-3 bg-ink p-6">
                  <dt className="order-2 text-sm leading-snug text-fg-muted">{stat.label}</dt>
                  <dd className="order-1 font-display text-[clamp(44px,5vw,72px)] font-medium leading-none tracking-[-0.05em] text-fg">
                    <Counter value={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </DrawSvg>
        </div>
      </Container>
    </section>
  );
}
