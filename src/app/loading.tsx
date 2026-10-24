import { Container } from "@/components/ui/container";

/**
 * Lightweight skeleton shown while a route segment streams in. Uses the
 * same vertical rhythm as a page header so there is no layout jump.
 */
export default function Loading() {
  return (
    <div role="status" aria-live="polite" aria-label="Loading page" className="bg-ink">
      <Container className="flex flex-col gap-6 py-24">
        <span className="sr-only">Loading</span>
        <div className="h-3 w-32 animate-pulse rounded-full bg-surface" />
        <div className="h-12 w-full max-w-[640px] animate-pulse rounded-lg bg-surface" />
        <div className="h-12 w-3/4 max-w-[480px] animate-pulse rounded-lg bg-surface" />
        <div className="h-5 w-full max-w-[560px] animate-pulse rounded-md bg-surface" />
        <div className="h-5 w-2/3 max-w-[400px] animate-pulse rounded-md bg-surface" />
      </Container>
    </div>
  );
}
