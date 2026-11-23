import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";

type CtaBannerProps = {
  title: string;
  description: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Call-to-action band used at the end of inner pages. */
export function CtaBanner({ title, description, primary = { label: "Start a Project", href: "/contact" }, secondary }: CtaBannerProps) {
  return (
    <section aria-labelledby="cta-title" className="border-t border-line-soft bg-ink">
      <Container className="py-[clamp(72px,9vw,140px)]">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface-2 p-[clamp(28px,5vw,72px)]">
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(0,229,139,0.16),transparent)]"
          />
          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex max-w-[760px] flex-col gap-5">
              <SplitText as="h2" id="cta-title" text={title} className="text-display-md text-fg" />
              <Reveal>
                <p className="text-lead text-fg-muted">{description}</p>
              </Reveal>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={primary.href} size="lg" icon="arrow" magnetic>
                {primary.label}
              </Button>
              {secondary ? (
                <Button href={secondary.href} size="lg" variant="ghost" magnetic>
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
