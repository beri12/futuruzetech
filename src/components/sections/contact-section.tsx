import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/config/site";

const nextSteps = [
  "We reply within two working days.",
  "A short discovery call to understand your goals.",
  "A written proposal with scope, timeline, and cost.",
];

type ContactSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Preselects the service field, for example from a service page CTA. */
  defaultService?: string;
  headingLevel?: "h1" | "h2";
};

export function ContactSection({
  eyebrow = "Start a project",
  title = "Let's build something meaningful.",
  description = "Tell us what you're planning. We'll help you identify the right next step.",
  defaultService,
  headingLevel = "h2",
}: ContactSectionProps) {
  const { email, phone, location } = siteConfig.contact;
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-grid relative bg-ink">
      <Container className="section-y flex flex-wrap items-start gap-14">
        <Reveal className="flex max-w-[480px] flex-1 basis-[360px] flex-col gap-5">
          <SectionHeading
            as={headingLevel}
            eyebrow={eyebrow}
            id="contact-title"
            title={title}
            description={description}
          />
          <ol className="mt-2 flex flex-col gap-3.5 text-sm text-fg-soft">
            {nextSteps.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-[11px] font-semibold text-brand"
                >
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          {email || phone || location ? (
            <dl className="mt-3 flex flex-col gap-1.5 border-t border-line pt-5 text-sm text-fg-muted">
              {email ? (
                <div className="flex gap-2">
                  <dt>Email:</dt>
                  <dd>
                    <a href={`mailto:${email}`} className="text-fg hover:text-brand-bright">
                      {email}
                    </a>
                  </dd>
                </div>
              ) : null}
              {phone ? (
                <div className="flex gap-2">
                  <dt>Phone:</dt>
                  <dd>
                    <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-fg hover:text-brand-bright">
                      {phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              {location ? (
                <div className="flex gap-2">
                  <dt>Location:</dt>
                  <dd className="text-fg">{location}</dd>
                </div>
              ) : null}
            </dl>
          ) : null}
        </Reveal>
        <Reveal delay={0.1} className="min-w-0 flex-1 basis-[520px]">
          <ContactForm defaultService={defaultService} />
        </Reveal>
      </Container>
    </section>
  );
}
