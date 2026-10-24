import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";
import { Chip } from "@/components/ui/chip";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  const href = `/services/${service.slug}`;
  return (
    <article className="group flex h-full flex-col gap-[18px] rounded-xl border border-line bg-surface-2 p-7 transition-[border-color,transform] duration-base hover:-translate-y-0.5 hover:border-brand motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <span
        aria-hidden="true"
        className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-line bg-surface"
      >
        <Icon size={22} strokeWidth={1.8} className="text-brand" />
      </span>
      <h3 className="text-[22px] font-semibold">
        <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
          {service.title}
        </Link>
      </h3>
      <p className="text-[15px] leading-relaxed text-fg-muted">{service.shortDescription}</p>
      <ul className="flex flex-wrap gap-2">
        {service.highlights.map((item) => (
          <li key={item}>
            <Chip>{item}</Chip>
          </li>
        ))}
      </ul>
      <span className="mt-auto inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand">
        Explore Service
        <ArrowRight
          aria-hidden="true"
          size={16}
          strokeWidth={2.2}
          className="transition-transform duration-base group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      </span>
    </article>
  );
}
