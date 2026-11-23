import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/typography";
import { SocialLinks } from "@/components/ui/social-links";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const nextSteps = [
  "We reply within two working days.",
  "A short discovery call to understand your goals.",
  "A written proposal with scope, timeline, and cost.",
];

type ContactSectionProps = {
  eyebrow?: string;
  title?: string;
  /** Words of the title set in the serif italic accent. */
  accent?: string[];
  description?: string;
  /** Preselects the service field, for example from a service page CTA. */
  defaultService?: string;
  headingLevel?: "h1" | "h2";
  index?: string;
};

export function ContactSection({
  eyebrow = "Contact",
  title = "Have an idea? Let's build the future.",
  accent = ["future."],
  description = "Tell us what you are planning. We will help you find the right next step, whether that is a workshop, a prototype or a full build.",
  defaultService,
  headingLevel = "h2",
  index,
}: ContactSectionProps) {
  const { email, phone, location } = siteConfig.contact;
  // As a page's main heading the section is above the fold: pull it under
  // the transparent header and use the CSS entrance so it paints before
  // hydration.
  const aboveFold = headingLevel === "h1";
  const Wrap = aboveFold ? "div" : Reveal;
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className={cn("relative scroll-mt-24 overflow-hidden border-t border-line-soft bg-ink", aboveFold && "-mt-[var(--header-h)] border-t-0")}
    >
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[30%] left-1/2 h-[720px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,229,139,0.14),transparent)]"
      />
      <Container
        className={cn(
          "section-y relative flex flex-col gap-[clamp(48px,7vw,104px)]",
          aboveFold && "pt-[calc(var(--header-h)+clamp(56px,8vw,112px))]",
        )}
      >
        <div className={cn("flex flex-col gap-8", aboveFold && "hero-enter")}>
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
          {aboveFold ? (
            <h1 id="contact-title" className="text-display-lg max-w-[1100px] text-fg">
              {title.split(" ").map((word, i, all) => (
                <span key={i}>
                  {accent.includes(word) ? <span className="accent-serif text-brand">{word}</span> : word}
                  {i < all.length - 1 ? " " : null}
                </span>
              ))}
            </h1>
          ) : (
            <SplitText as="h2" id="contact-title" text={title} accent={accent} className="text-display-lg max-w-[1100px] text-fg" />
          )}
          <p className="text-lead max-w-[620px] text-fg-muted">{description}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <Wrap className="flex flex-col gap-10">
            {email ? (
              <Magnetic strength={8} className="self-start">
                <a
                  href={`mailto:${email}`}
                  className="group inline-flex items-center gap-4 font-display text-[clamp(22px,2.4vw,34px)] font-medium tracking-[-0.03em] text-fg"
                >
                  <span className="link-underline pb-1">{email}</span>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand text-ink transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45"
                  >
                    <ArrowUpRight size={20} />
                  </span>
                </a>
              </Magnetic>
            ) : null}

            <ol className="flex flex-col border-t border-line">
              {nextSteps.map((step, i) => (
                <li key={step} className="flex items-start gap-5 border-b border-line py-5 text-[15px] text-fg-soft">
                  <span className="font-display text-sm text-brand">{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>

            {phone || location ? (
              <dl className="flex flex-col gap-3 text-sm">
                {phone ? (
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs uppercase tracking-[0.2em] text-fg-dim">Phone</dt>
                    <dd>
                      <a href={`tel:${phone.replace(/\s+/g, "")}`} className="link-underline text-fg">
                        {phone}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {location ? (
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs uppercase tracking-[0.2em] text-fg-dim">Location</dt>
                    <dd className="text-fg">{location}</dd>
                  </div>
                ) : null}
              </dl>
            ) : null}

            <SocialLinks />
          </Wrap>
          <Wrap className="min-w-0">
            <ContactForm defaultService={defaultService} />
          </Wrap>
        </div>
      </Container>
    </section>
  );
}
