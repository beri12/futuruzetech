import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUp } from "lucide-react";
import { footerNav, primaryCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

type IconProps = { size?: number };

/* Brand marks drawn inline: lucide-react no longer ships brand icons. */
function XIcon({ size = 16 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.3l-4.9-6.4L5 21H1.9l7.3-8.3L1.5 3h6.4l4.4 5.9L17.5 3zm-1.1 16.2h1.7L6.7 4.7H4.9l11.5 14.5z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.4 2H3.6A1.6 1.6 0 0 0 2 3.6v16.8A1.6 1.6 0 0 0 3.6 22h16.8a1.6 1.6 0 0 0 1.6-1.6V3.6A1.6 1.6 0 0 0 20.4 2zM8 19H5V9.5h3V19zM6.5 8.2a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4zM19 19h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19h-3V9.5h2.9v1.3c.4-.8 1.4-1.5 2.8-1.5 3 0 3.6 2 3.6 4.6V19z" />
    </svg>
  );
}

function GithubIcon({ size = 16 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.3-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.6 0 0 .8-.3 2.8 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.4.1 2.6.7.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socialLinks = [
  { key: "linkedin", label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedinIcon },
  { key: "x", label: "X", href: siteConfig.social.x, Icon: XIcon },
  { key: "github", label: "GitHub", href: siteConfig.social.github, Icon: GithubIcon },
  { key: "instagram", label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
].filter((item) => Boolean(item.href));

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
    <footer className="relative border-t border-line-soft bg-forest">
      <div className="line-sweep" aria-hidden="true" />
      <div className="container-x flex flex-col gap-12 pb-8 pt-16">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-10">
          <div className="flex max-w-[320px] flex-col gap-4">
            <Logo />
            <p className="text-sm leading-relaxed text-fg-muted">
              A technology partner for businesses building digital products, automating operations,
              and growing online. Based in Ethiopia, working worldwide.
            </p>
            {socialLinks.length > 0 ? (
              <ul className="flex gap-2.5">
                {socialLinks.map(({ key, label, href, Icon }) => (
                  <li key={key}>
                    <a
                      href={href ?? "#"}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-fg-muted hover:border-brand hover:text-brand-bright"
                    >
                      <Icon size={16} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <FooterColumn title="Services" links={footerNav.services} />
          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn
            title="Work"
            links={[
              ...projects.map((project) => ({ label: project.name, href: `/work/${project.slug}` })),
              { label: "All work", href: "/work", accent: true },
            ]}
          />

          <div className="flex flex-col gap-3.5 rounded-xl border border-line bg-surface-2 p-5">
            <span className="font-display text-lg font-semibold">Have a project in mind?</span>
            <p className="text-sm leading-relaxed text-fg-muted">
              Share a few details and we&rsquo;ll come back with a clear next step.
            </p>
            <Button href={primaryCta.href} size="sm" icon="arrow" className="w-full">
              {primaryCta.label}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line-soft pt-6 text-[13px] text-fg-dim">
          <span>
            &copy; <CopyrightYear /> {siteConfig.name}. All rights reserved.
          </span>
          <ul className="flex flex-wrap items-center gap-5">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="py-1 text-fg-muted hover:text-fg">
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
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string; accent?: boolean }>;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs uppercase tracking-[0.18em] text-fg-dim">{title}</span>
      <ul className="flex flex-col gap-1">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className={
                link.accent
                  ? "inline-block py-1.5 text-sm font-semibold text-brand hover:text-brand-bright"
                  : "inline-block py-1.5 text-sm text-fg-soft hover:text-fg"
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
