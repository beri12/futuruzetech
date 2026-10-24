import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/config/site";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] text-fg-dim">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.label,
            ...(crumb.href ? { item: absoluteUrl(crumb.href) } : {}),
          })),
        }}
      />
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((crumb, index) => {
          const last = index === all.length - 1;
          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
              {crumb.href && !last ? (
                <Link href={crumb.href} className="py-1 text-fg-muted hover:text-fg">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="py-1 text-fg-soft">
                  {crumb.label}
                </span>
              )}
              {!last ? <ChevronRight aria-hidden="true" size={14} /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
