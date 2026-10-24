import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";
import { JsonLd } from "@/components/seo/json-ld";
import { getService, services, serviceSlugs } from "@/data/services";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const otherServices = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          title: service.title,
          description: service.seo.description,
          path: `/services/${service.slug}`,
        })}
      />
      <PageHeader
        eyebrow="Service"
        title={service.title}
        description={service.shortDescription}
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
      >
        <div className="flex flex-wrap gap-3.5 pt-2">
          <Button href={`/contact?service=${service.slug}`} size="lg" icon="arrow">
            Discuss this service
          </Button>
          <Button href="/work" size="lg" variant="ghost">
            See related work
          </Button>
        </div>
      </PageHeader>

      {/* Intro and deliverables */}
      <section aria-labelledby="overview-title" className="bg-ink">
        <Container className="section-y flex flex-wrap gap-14">
          <Reveal className="flex max-w-[560px] flex-1 basis-[400px] flex-col gap-6">
            <span
              aria-hidden="true"
              className="inline-flex h-12 w-12 items-center justify-center rounded-[12px] border border-line bg-surface"
            >
              <Icon size={24} strokeWidth={1.8} className="text-brand" />
            </span>
            <SectionHeading eyebrow="Overview" id="overview-title" title="Our approach to this service." />
            <p className="text-[17px] leading-relaxed text-fg-muted">{service.intro}</p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-1 basis-[400px] flex-col gap-5">
            <h3 className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-fg-dim">
              What we deliver
            </h3>
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-3">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-line bg-surface-2 px-4 py-3.5 text-[15px] text-fg-soft"
                >
                  <Check aria-hidden="true" size={16} strokeWidth={2.4} className="mt-0.5 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Service-specific process */}
      <section aria-labelledby="service-process-title" className="border-y border-line-soft bg-forest">
        <Container className="section-y flex flex-col gap-12">
          <Reveal>
            <SectionHeading eyebrow="How it works" id="service-process-title" title="Our process for this service." />
          </Reveal>
          <ProcessTimeline steps={service.process} />
        </Container>
      </section>

      <FaqSection items={service.faqs} eyebrow="Service FAQ" title="Questions about this service." />

      {/* Other services */}
      <section aria-labelledby="other-services-title" className="bg-ink">
        <Container className="section-y flex flex-col gap-8">
          <Reveal>
            <SectionHeading eyebrow="Related" id="other-services-title" title="Often combined with" />
          </Reveal>
          <Stagger as="ul" className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-3">
            {otherServices.map((item) => {
              const ItemIcon = item.icon;
              return (
                <StaggerItem as="li" key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="group flex h-full items-center gap-3 rounded-lg border border-line bg-surface-2 p-4 text-[15px] font-medium text-fg hover:border-brand"
                  >
                    <ItemIcon aria-hidden="true" size={18} strokeWidth={1.8} className="shrink-0 text-brand" />
                    <span className="flex-1">{item.title}</span>
                    <ArrowRight
                      aria-hidden="true"
                      size={16}
                      className="text-fg-dim transition-transform duration-base group-hover:translate-x-0.5 motion-reduce:transition-none"
                    />
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <ContactSection
        eyebrow="Get started"
        title={service.cta.title}
        description={service.cta.description}
        defaultService={service.slug}
      />
    </>
  );
}
