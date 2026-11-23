import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";
import { Eyebrow } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
  /** Larger hero-like header for top-level pages. */
  size?: "default" | "large";
  className?: string;
};

/**
 * Inner-page header. Sits under the transparent site header, uses the large
 * editorial type scale, and enters with the CSS `hero-enter` animation so
 * the heading paints before hydration.
 */
export function PageHeader({ eyebrow, title, description, breadcrumbs, children, size = "default", className }: PageHeaderProps) {
  return (
    <section className={cn("relative -mt-[var(--header-h)] overflow-hidden border-b border-line-soft bg-ink", className)}>
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bg-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container
        className={cn(
          "relative flex flex-col gap-8 pt-[calc(var(--header-h)+clamp(48px,7vw,104px))]",
          size === "large" ? "pb-[clamp(64px,8vw,120px)]" : "pb-[clamp(48px,6vw,88px)]",
        )}
      >
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        <div className="hero-enter flex max-w-[1080px] flex-col gap-7">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className={cn("text-fg", size === "large" ? "text-display-lg" : "text-display-md")}>{title}</h1>
          {description ? <p className="text-lead max-w-[680px] text-fg-muted">{description}</p> : null}
          {children}
        </div>
      </Container>
    </section>
  );
}
