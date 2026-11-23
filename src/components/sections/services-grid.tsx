import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ServiceCard } from "@/components/services/service-card";
import { services } from "@/data/services";

export function ServicesGrid({ showAllLink = true, index = "02" }: { showAllLink?: boolean; index?: string }) {
  return (
    <section id="services" aria-labelledby="services-title" className="relative scroll-mt-24 border-t border-line-soft bg-forest">
      <div className="line-sweep" aria-hidden="true" />
      <Container className="section-y flex flex-col gap-[clamp(48px,6vw,88px)]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            index={index}
            eyebrow="Services"
            id="services-title"
            title="Capabilities engineered for what comes next."
            accent={["next."]}
            size="lg"
          />
          <Reveal className="flex max-w-[380px] flex-col items-start gap-6">
            <p className="text-[16px] leading-relaxed text-fg-muted">
              Eight connected disciplines, one accountable team. Most products combine several of them,
              from the first workshop to the campaign that brings users in.
            </p>
            {showAllLink ? (
              <Button href="/services" variant="ghost" size="sm" icon="arrow">
                All services
              </Button>
            ) : null}
          </Reveal>
        </div>
        <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" stagger={0.07}>
          {services.map((service, i) => (
            <StaggerItem as="li" key={service.slug} className="relative">
              <ServiceCard service={service} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
