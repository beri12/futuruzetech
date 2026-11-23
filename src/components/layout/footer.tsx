import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { footerNav, primaryCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { Logo } from "@/components/ui/logo";
import { SocialLinks } from "@/components/ui/social-links";
import { Magnetic } from "@/components/motion/magnetic";

/**
 * The year is produced in a cached scope so it is captured into the static
 * shell (Cache Components treats `new Date()` as request-time otherwise) and
 * refreshed daily.
 */
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line-soft bg-ink">
      <div className="line-sweep" aria-hidden="true" />
      <div className="container-x flex flex-col gap-16 pb-10 pt-[clamp(72px,9vw,128px)]">
        {/* Closing call to action */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="font-display text-[clamp(40px,7vw,112px)] font-medium leading-[0.92] tracking-[-0.05em] text-fg">
            Let&rsquo;s build
            <br />
            <span className="accent-serif text-brand">what&rsquo;s next.</span>
          </p>
          <Magnetic strength={18} className="self-start lg:self-auto">
            <Link
              href={primaryCta.href}
              className="group relative inline-flex h-[clamp(140px,14vw,184px)] w-[clamp(140px,14vw,184px)] flex-col items-center justify-center gap-2 overflow-hidden rounded-full bg-brand text-center font-display text-base font-semibold text-ink"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-y-full rounded-full bg-fg transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-0 motion-reduce:transition-none"
              />
              <ArrowUpRight aria-hidden="true" size={26} className="relative transition-transform duration-500 group-hover:rotate-45" />
              <span className="relative">{primaryCta.label}</span>
            </Link>
          </Magnetic>
        </div>

        <div className="grid gap-12 border-t border-line pt-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex max-w-[340px] flex-col gap-6">
            <Logo />
            <p className="text-sm leading-relaxed text-fg-muted">
              Software engineering, mobile applications, artificial intelligence, enterprise systems
              and digital transformation for businesses in Ethiopia, Africa and international markets.
            </p>
            {siteConfig.contact.email ? (
              <a href={`mailto:${siteConfig.contact.email}`} className="link-underline self-start text-sm text-fg">
                {siteConfig.contact.email}
              </a>
            ) : null}
            <SocialLinks />
          </div>

          <FooterColumn title="Services" links={footerNav.services} />
          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn
            title="Projects"
            links={[
              ...projects.map((project) => ({ label: project.name, href: `/work/${project.slug}` })),
              { label: "All projects", href: "/work", accent: true },
            ]}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-6 text-[13px] text-fg-dim">
          <span>
            &copy; <CopyrightYear /> {siteConfig.name}. All rights reserved.
          </span>
          <ul className="flex flex-wrap items-center gap-6">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-underline py-1 text-fg-muted hover:text-fg">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="#top" className="inline-flex items-center gap-1.5 py-1 text-fg-muted hover:text-fg">
                Back to top
                <ArrowUp aria-hidden="true" size={12} strokeWidth={2.4} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.2em] select-none whitespace-nowrap text-center font-display text-[21vw] font-semibold leading-[0.8] tracking-[-0.06em] text-white/[0.03]"
      >
        FUTURIZE
      </p>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<{ label: string; href: string; accent?: boolean }> }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="eyebrow text-fg-dim">{title}</span>
      <ul className="flex flex-col gap-1">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className={
                link.accent
                  ? "link-underline inline-block py-1.5 text-sm font-medium text-brand"
                  : "link-underline inline-block py-1.5 text-sm text-fg-soft hover:text-fg"
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
