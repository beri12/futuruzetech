import {
  Code2,
  Eye,
  LifeBuoy,
  ListChecks,
  MessageSquare,
  MonitorSmartphone,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { whyChoose } from "@/data/stack";

const icons: Record<(typeof whyChoose)[number]["icon"], LucideIcon> = {
  target: Target,
  message: MessageSquare,
  code: Code2,
  devices: MonitorSmartphone,
  shield: ShieldCheck,
  list: ListChecks,
  eye: Eye,
  "life-buoy": LifeBuoy,
};

/** Light section: asymmetric split with a sticky intro and a reasons grid. */
export function WhyChoose() {
  return (
    <section aria-labelledby="why-title" className="bg-light text-light-ink">
      <Container className="section-y flex flex-wrap items-start gap-14">
        <Reveal className="flex flex-1 basis-[400px] flex-col gap-6 lg:sticky lg:top-[100px]">
          <SectionHeading
            tone="light"
            eyebrow="Why Futurize"
            id="why-title"
            title="More than a development team. A technology partner."
            description="We start from the business problem, communicate clearly throughout, and build with practices that keep your product maintainable long after launch."
          />
          <DeliveryIllustration />
        </Reveal>
        <Stagger
          as="ul"
          className="grid flex-1 basis-[480px] grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-4"
        >
          {whyChoose.map((item) => {
            const Icon = icons[item.icon];
            return (
              <StaggerItem
                as="li"
                key={item.title}
                className="flex flex-col gap-2.5 rounded-lg border border-light-line bg-light-card p-5"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-light-tint"
                >
                  <Icon size={18} strokeWidth={2} className="text-brand-deep" />
                </span>
                <h3 className="text-[17px] font-semibold text-light-ink">{item.title}</h3>
                <p className="text-sm leading-relaxed text-light-muted">{item.description}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}

/** Small technical illustration: a delivery pipeline drawn as a branch graph. */
function DeliveryIllustration() {
  const rows: Array<{ label: string; indent: number; state: "done" | "active" | "todo"; width: string }> = [
    { label: "main", indent: 0, state: "done", width: "flex-1" },
    { label: "review", indent: 1, state: "active", width: "w-3/5" },
    { label: "deploy", indent: 2, state: "todo", width: "w-2/5" },
    { label: "support", indent: 0, state: "done", width: "flex-1" },
  ];
  return (
    <div
      aria-hidden="true"
      className="mt-3 flex w-full max-w-[420px] flex-col gap-3 rounded-2xl border border-light-line bg-light-card p-5"
    >
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-center gap-2.5"
          style={{ paddingLeft: row.indent * 20 }}
        >
          <span
            className={
              row.state === "done"
                ? "h-2.5 w-2.5 rounded-full bg-brand"
                : row.state === "active"
                  ? "h-2.5 w-2.5 rounded-full border-2 border-brand"
                  : "h-2.5 w-2.5 rounded-full border-2 border-light-line"
            }
          />
          <span className={`h-2 rounded-sm bg-[#E6EDE8] ${row.width}`} />
          <span className="text-[11px] text-light-muted">{row.label}</span>
        </div>
      ))}
    </div>
  );
}
