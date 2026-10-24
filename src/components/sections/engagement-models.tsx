import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Chip } from "@/components/ui/chip";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { engagementFormats, engagementModels } from "@/data/engagement";
import { cn } from "@/lib/utils";

/** Engagement models with quote requests. No fixed prices are invented. */
export function EngagementModels({ detailed = false }: { detailed?: boolean }) {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="bg-ink">
      <Container className="section-y flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Engagement models"
            id="pricing-title"
            title="Scope first, then a price that fits it."
            description="Every project is quoted on its requirements. These models describe the kind of work we take on; the proposal describes the cost."
          />
        </Reveal>
        <Stagger
          as="ul"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-4"
        >
          {engagementModels.map((model) => (
            <StaggerItem
              as="li"
              key={model.slug}
              className={cn(
                "relative flex flex-col gap-[18px] rounded-xl border bg-surface-2 p-[30px]",
                model.highlighted ? "border-brand" : "border-line",
              )}
            >
              {model.highlighted ? (
                <Chip tone="brand" className="absolute -top-3 left-[30px]">
                  Most common
                </Chip>
              ) : null}
              <h3 className="text-[22px] font-semibold">{model.name}</h3>
              <p className="text-[15px] leading-relaxed text-fg-muted">{model.description}</p>
              <ul className="flex flex-col gap-2.5 text-sm text-fg-soft">
                {model.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check aria-hidden="true" size={16} strokeWidth={2.4} className="mt-0.5 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                href={`/contact?service=${model.slug}`}
                variant={model.highlighted ? "primary" : "ghost"}
                size="sm"
                className="mt-auto w-full"
              >
                Request a Quote
              </Button>
            </StaggerItem>
          ))}
        </Stagger>

        {detailed ? (
          <Stagger
            as="ul"
            className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-4"
          >
            {engagementFormats.map((format) => (
              <StaggerItem
                as="li"
                key={format.name}
                className="flex flex-col gap-2 rounded-lg border border-line bg-forest p-5"
              >
                <h3 className="text-base font-semibold">{format.name}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{format.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <Reveal className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-lg border border-line bg-forest px-[22px] py-[18px]">
            <span className="text-xs uppercase tracking-[0.18em] text-fg-dim">Engagement formats</span>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-soft">
              {engagementFormats.map((format, index) => (
                <li key={format.name} className="flex items-center gap-5">
                  {index > 0 ? <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line" /> : null}
                  {format.name}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
