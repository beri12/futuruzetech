import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types";
import { TiltCard } from "@/components/motion/tilt-card";
import { ServiceGlyph } from "@/components/services/service-glyph";

/**
 * Service card: index number, custom glyph, title, description and the
 * service's highlights. Hover adds a cursor spotlight, a glowing border that
 * follows the pointer, a subtle 3D tilt (desktop) and an arrow that turns
 * green. The whole card is one link target via the stretched title link.
 */
export function ServiceCard({ service, index }: { service: Service; index?: number }) {
  const Icon = service.icon;
  const href = `/services/${service.slug}`;
  return (
    <TiltCard
      as="article"
      max={3}
      className="group flex h-full flex-col sm:min-h-[440px] overflow-hidden rounded-2xl border border-line bg-surface-2 p-7 transition-colors duration-500 hover:bg-surface"
    >
      <div className="flex items-start justify-between">
        <span className="font-display text-sm text-fg-dim">
          {index !== undefined ? String(index + 1).padStart(2, "0") : <Icon aria-hidden="true" size={18} className="text-brand" />}
        </span>
        <span
          aria-hidden="true"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg-muted transition-[background-color,border-color,color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-ink motion-reduce:transition-none"
        >
          <ArrowUpRight size={18} strokeWidth={1.8} />
        </span>
      </div>

      <div className="my-auto flex h-[104px] w-[104px] items-center py-5 text-fg-soft sm:h-[132px] sm:w-[132px] sm:py-6">
        <ServiceGlyph slug={service.slug} />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-display text-[clamp(22px,1.8vw,26px)] font-medium leading-[1.1] tracking-[-0.025em] text-fg">
          <Link href={href} className="after:absolute after:inset-0 after:z-10 focus-visible:outline-none">
            {service.title}
          </Link>
        </h3>
        <p className="text-[15px] leading-relaxed text-fg-muted">{service.shortDescription}</p>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line-soft pt-4 text-xs uppercase tracking-[0.12em] text-fg-dim">
          {service.highlights.map((item) => (
            <li key={item} className="transition-colors duration-500 group-hover:text-fg-soft">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </TiltCard>
  );
}
