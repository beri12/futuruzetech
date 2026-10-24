import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

type CtaBannerProps = {
  title: string;
  description: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Compact call-to-action band used at the end of inner pages. */
export function CtaBanner({
  title,
  description,
  primary = { label: "Start a Project", href: "/contact" },
  secondary,
}: CtaBannerProps) {
  return (
    <section aria-labelledby="cta-title" className="bg-ink">
      <Container className="py-[clamp(56px,6vw,96px)]">
        <Reveal className="bg-grid relative overflow-hidden rounded-2xl border border-line bg-forest p-[clamp(28px,4vw,56px)]">
          <div className="line-sweep" aria-hidden="true" />
          <div className="relative flex flex-wrap items-center justify-between gap-8">
            <div className="flex max-w-[640px] flex-col gap-3">
              <h2 id="cta-title" className="text-[clamp(28px,3vw,40px)] font-bold leading-[1.1]">
                {title}
              </h2>
              <p className="text-[16px] leading-relaxed text-fg-muted">{description}</p>
            </div>
            <div className="flex flex-wrap gap-3.5">
              <Button href={primary.href} size="lg" icon="arrow">
                {primary.label}
              </Button>
              {secondary ? (
                <Button href={secondary.href} size="lg" variant="ghost">
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
