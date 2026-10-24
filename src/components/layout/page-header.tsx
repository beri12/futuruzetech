import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";
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

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  size = "default",
  className,
}: PageHeaderProps) {
  return (
    <section className={cn("bg-grid relative overflow-hidden border-b border-line-soft bg-forest", className)}>
      <div className="bg-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="line-sweep" aria-hidden="true" />
      <Container
        className={cn(
          "relative flex flex-col gap-6",
          size === "large" ? "py-[clamp(64px,8vw,112px)]" : "py-[clamp(48px,6vw,80px)]",
        )}
      >
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        {/* CSS entrance (hero-enter) so the heading paints before hydration. */}
        <div className="hero-enter flex max-w-[760px] flex-col gap-5">
          {eyebrow ? <p className="eyebrow text-brand">{eyebrow}</p> : null}
          <h1
            className={cn(
              "font-bold leading-[1.04]",
              size === "large" ? "text-[clamp(40px,5.4vw,72px)]" : "text-[clamp(36px,4.6vw,60px)]",
            )}
          >
            {title}
          </h1>
          {description ? (
            <p className="max-w-[620px] text-[clamp(16px,1.3vw,19px)] leading-relaxed text-fg-muted">
              {description}
            </p>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  );
}
