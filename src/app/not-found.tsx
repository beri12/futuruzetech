import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="bg-grid relative flex min-h-[70vh] items-center bg-forest">
      <div className="bg-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative flex flex-col items-start gap-6 py-24">
        <p className="eyebrow text-brand">404</p>
        <h1 className="max-w-[640px] text-[clamp(36px,5vw,64px)] font-bold leading-[1.04]">
          This page doesn&rsquo;t exist, or it has moved.
        </h1>
        <p className="max-w-[520px] text-[17px] leading-relaxed text-fg-muted">
          Check the address, or head back to the homepage. If you followed a link from our site, let
          us know and we&rsquo;ll fix it.
        </p>
        <div className="flex flex-wrap gap-3.5">
          <Button href="/" icon="arrow">
            Back to homepage
          </Button>
          <Button href="/contact" variant="ghost">
            Contact us
          </Button>
        </div>
      </Container>
    </section>
  );
}
