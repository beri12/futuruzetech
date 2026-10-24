"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for monitoring without exposing details to visitors.
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] items-center bg-ink">
      <Container className="flex flex-col items-start gap-6 py-24">
        <p className="eyebrow text-error-soft">Something went wrong</p>
        <h1 className="max-w-[640px] text-[clamp(32px,4.5vw,56px)] font-bold leading-[1.04]">
          We hit an unexpected problem loading this page.
        </h1>
        <p className="max-w-[520px] text-[17px] leading-relaxed text-fg-muted">
          You can try again, or go back to the homepage. If it keeps happening, please contact us
          and mention what you were doing.
        </p>
        <div className="flex flex-wrap gap-3.5">
          <Button onClick={reset} icon="arrow">
            Try again
          </Button>
          <Button href="/" variant="ghost">
            Homepage
          </Button>
        </div>
        {error.digest ? <p className="text-xs text-fg-dim">Reference: {error.digest}</p> : null}
      </Container>
    </section>
  );
}
