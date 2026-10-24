import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ServiceCard } from "@/components/services/service-card";
import { services } from "@/data/services";

export function ServicesGrid({ showAllLink = true }: { showAllLink?: boolean }) {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="border-y border-line-soft bg-forest"
    >
      <Container className="section-y flex flex-col gap-12">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="What we do"
            id="services-title"
            title="Everything you need to build, launch, and grow."
          />
          {showAllLink ? (
            <Button href="/services" variant="ghost" size="sm" icon="arrow">
              All services
            </Button>
          ) : null}
        </Reveal>
        <Stagger
          as="ul"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-5"
        >
          {services.map((service) => (
            <StaggerItem as="li" key={service.slug} className="relative">
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
