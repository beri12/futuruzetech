"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { mainNav, primaryCta, type NavItem } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { gsap, media, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

function isActive(pathname: string, item: Pick<NavItem, "href" | "children">) {
  const hrefs = [item.href, ...(item.children?.map((child) => child.href) ?? [])];
  return hrefs.some((href) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)));
}

/**
 * Transparent header that gains a blurred background once the page scrolls
 * and hides while scrolling down (shows again on scroll up), so the large
 * typography below gets the full viewport.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileId = useId();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 400 && y > last + 4);
      if (y < last - 4 || y <= 400) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes (derived during render).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  const close = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[translate,background-color,border-color] duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none",
        "border-b",
        scrolled && !mobileOpen ? "border-line-soft bg-ink/70 backdrop-blur-xl" : "border-transparent bg-transparent",
        // No transform/filter at all while the menu is open: either would turn
        // the header into the containing block of the fixed menu panel.
        hidden && !mobileOpen && "-translate-y-full",
      )}
    >
      <nav aria-label="Primary" className="container-x relative z-[51] flex h-[var(--header-h)] items-center justify-between gap-6">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            item.children ? (
              <DropdownItem key={item.label} item={item} active={isActive(pathname, item)} />
            ) : (
              <li key={item.href}>
                <NavLink href={item.href} active={isActive(pathname, item)}>
                  {item.label}
                </NavLink>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-3">
          <Button href={primaryCta.href} size="sm" icon="arrow" magnetic className="hidden lg:inline-flex">
            {primaryCta.label}
          </Button>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            onClick={() => setMobileOpen((open) => !open)}
            className="relative inline-flex h-11 items-center gap-3 rounded-full border border-line-strong bg-ink/40 pl-4 pr-3 text-sm font-medium text-fg backdrop-blur lg:hidden"
          >
            <span>{mobileOpen ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="relative flex h-3 w-5 flex-col justify-between">
              <span
                className={cn(
                  "h-px w-full origin-center bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  mobileOpen && "translate-y-[5.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-full origin-center bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  mobileOpen && "-translate-y-[5.5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      <MobileNav id={mobileId} open={mobileOpen} onClose={close} pathname={pathname} />
    </header>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Magnetic strength={6}>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "group relative inline-flex min-h-11 items-center px-3.5 text-[14px] font-medium tracking-[0.01em] transition-colors duration-base",
          active ? "text-fg" : "text-fg-muted hover:text-fg",
        )}
      >
        {children}
        <span
          aria-hidden="true"
          className={cn(
            "absolute bottom-2 left-3.5 right-3.5 h-px origin-left bg-brand transition-transform duration-500 ease-[var(--ease-out-expo)]",
            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
          )}
        />
      </Link>
    </Magnetic>
  );
}

function DropdownItem({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const panelId = useId();
  const closeTimer = useRef<number | null>(null);
  // A hover already opened the menu; the click that follows must not close it.
  const openedByHover = useRef(false);
  const wide = (item.children?.length ?? 0) > 4;

  const scheduleClose = useCallback(() => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  }, []);
  const cancelClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector<HTMLElement>("button")?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        openedByHover.current = true;
        setOpen(true);
      }}
      onMouseLeave={() => {
        openedByHover.current = false;
        scheduleClose();
      }}
      onBlur={(event) => {
        if (!ref.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          if (openedByHover.current) {
            openedByHover.current = false;
            setOpen(true);
            return;
          }
          setOpen((value) => !value);
        }}
        className={cn(
          "inline-flex min-h-11 items-center gap-1.5 px-3.5 text-[14px] font-medium tracking-[0.01em] transition-colors duration-base",
          active || open ? "text-fg" : "text-fg-muted hover:text-fg",
        )}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          size={14}
          strokeWidth={2.2}
          className={cn("transition-transform duration-base", open && "rotate-180")}
        />
      </button>
      <div
        id={panelId}
        inert={!open}
        className={cn(
          "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out-expo)] motion-reduce:transition-none",
          wide ? "w-[640px]" : "w-[380px]",
          open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0",
        )}
      >
        <div className="overflow-hidden rounded-2xl border border-line bg-surface/95 p-2 shadow-float backdrop-blur-xl">
          <div className={cn("grid gap-1", wide ? "grid-cols-2" : "grid-cols-1")}>
            {item.children?.map((child, index) => (
              <Link
                key={child.href}
                href={child.href}
                className="group flex gap-3 rounded-xl px-3.5 py-3 transition-colors duration-base hover:bg-white/[0.04]"
              >
                <span className="pt-0.5 font-display text-[11px] text-brand">{String(index + 1).padStart(2, "0")}</span>
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-fg">{child.label}</span>
                  {child.description ? (
                    <span className="line-clamp-2 text-xs leading-relaxed text-fg-muted">{child.description}</span>
                  ) : null}
                </span>
              </Link>
            ))}
          </div>
          <Link
            href={item.href}
            className="mt-1 flex items-center justify-between rounded-xl border-t border-line-soft px-3.5 py-3 text-sm font-medium text-brand hover:text-brand-bright"
          >
            {item.allLabel ?? "View all"}
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </div>
    </li>
  );
}

/**
 * Full-screen mobile menu. It stays mounted (so it can animate out) and is
 * made `inert` when closed. Links stagger in with a GSAP timeline; reduced
 * motion gets an instant switch.
 */
function MobileNav({ id, open, onClose, pathname }: { id: string; open: boolean; onClose: () => void; pathname: string }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel || !open) return;
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        gsap.from(panel.querySelectorAll("[data-menu-item]"), {
          yPercent: 100,
          opacity: 0,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.05,
          delay: 0.15,
        });
      });
      return () => mm.revert();
    },
    { dependencies: [open], scope: panelRef },
  );

  // Escape to close, focus trap while open, and a scroll lock on the body.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []);
    const toggle = document.querySelector<HTMLElement>(`[aria-controls="${CSS.escape(id)}"]`);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = [toggle, ...focusables()].filter(Boolean) as HTMLElement[];
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose, id]);

  return (
    <div
      id={id}
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!open}
      data-lenis-prevent
      className={cn(
        "fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink pt-[var(--header-h)] transition-[clip-path,visibility] duration-700 ease-[var(--ease-in-out-quart)] motion-reduce:transition-none lg:hidden",
        open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]",
      )}
    >
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <ul className="container-x relative flex flex-col py-6">
        {mainNav.map((item, index) => {
          const active = isActive(pathname, item);
          return (
            <li key={item.label} className="overflow-hidden border-b border-line-soft">
              <div data-menu-item className="flex items-center justify-between">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-16 flex-1 items-baseline gap-4 py-3 font-display text-[clamp(32px,9vw,48px)] font-medium tracking-[-0.03em]",
                    active ? "text-brand" : "text-fg",
                  )}
                >
                  <span className="text-xs tracking-normal text-fg-dim">{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
                {item.children ? (
                  <button
                    type="button"
                    aria-expanded={expanded === item.label}
                    aria-label={`${expanded === item.label ? "Hide" : "Show"} ${item.label.toLowerCase()} links`}
                    onClick={() => setExpanded((value) => (value === item.label ? null : item.label))}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg-muted"
                  >
                    <ChevronDown
                      aria-hidden="true"
                      size={18}
                      className={cn("transition-transform duration-base", expanded === item.label && "rotate-180")}
                    />
                  </button>
                ) : null}
              </div>
              {item.children && expanded === item.label ? (
                <ul className="flex flex-col pb-4 pl-8">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href} className="flex min-h-11 items-center py-1.5 text-[15px] text-fg-soft hover:text-fg">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
      <div className="container-x relative mt-auto flex flex-col gap-5 pb-10">
        <div data-menu-item>
          <Button href={primaryCta.href} icon="arrow" size="lg" className="w-full">
            {primaryCta.label}
          </Button>
        </div>
        {siteConfig.contact.email ? (
          <a data-menu-item href={`mailto:${siteConfig.contact.email}`} className="text-sm text-fg-muted">
            {siteConfig.contact.email}
          </a>
        ) : null}
      </div>
    </div>
  );
}
