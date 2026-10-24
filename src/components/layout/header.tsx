"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { mainNav, primaryCta, type NavItem } from "@/config/navigation";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes (derived during render,
  // the React-recommended alternative to a setState-in-effect).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color] duration-base",
        scrolled || mobileOpen
          ? "border-line-soft bg-ink/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Primary" className="container-x flex h-[76px] items-center justify-between gap-6">
        <Logo />

        <ul className="hidden items-center gap-7 lg:flex">
          {mainNav.map((item) =>
            item.children ? (
              <DropdownItem key={item.href} item={item} active={isActive(pathname, item.href)} />
            ) : (
              <li key={item.href}>
                <NavLink href={item.href} active={isActive(pathname, item.href)}>
                  {item.label}
                </NavLink>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-3">
          <Button href={primaryCta.href} size="sm" icon="arrow" className="hidden lg:inline-flex">
            {primaryCta.label}
          </Button>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line bg-surface text-fg lg:hidden"
          >
            {mobileOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>
        </div>
      </nav>

      <MobileNav id={mobileId} open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </header>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex min-h-11 items-center px-0.5 text-sm font-medium transition-colors duration-base",
        active ? "text-fg shadow-[inset_0_-2px_0_var(--color-brand)]" : "text-fg-soft hover:text-fg",
      )}
    >
      {children}
    </Link>
  );
}

function DropdownItem({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const panelId = useId();
  const reduce = useReducedMotion();
  const closeTimer = useRef<number | null>(null);

  const scheduleClose = useCallback(() => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
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
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onBlur={(event) => {
        if (!ref.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex min-h-11 items-center gap-1.5 px-0.5 text-sm font-medium transition-colors duration-base",
          active ? "text-fg shadow-[inset_0_-2px_0_var(--color-brand)]" : "text-fg-soft hover:text-fg",
        )}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          size={14}
          strokeWidth={2.4}
          className={cn("transition-transform duration-base", open && "rotate-180")}
        />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-3"
          >
            <div className="grid grid-cols-2 gap-1 rounded-xl border border-line bg-surface-2 p-2 shadow-float">
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="flex flex-col gap-1 rounded-md px-3 py-2.5 hover:bg-surface"
                >
                  <span className="text-sm font-semibold text-fg">{child.label}</span>
                  {child.description ? (
                    <span className="line-clamp-2 text-xs leading-relaxed text-fg-muted">
                      {child.description}
                    </span>
                  ) : null}
                </Link>
              ))}
              <Link
                href={item.href}
                className="col-span-2 mt-1 rounded-md border-t border-line px-3 py-2.5 text-sm font-semibold text-brand hover:text-brand-bright"
              >
                All services
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

function MobileNav({
  id,
  open,
  onClose,
  pathname,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [servicesOpen, setServicesOpen] = useState(false);

  // Escape to close, focus trap while open, and a scroll lock on the body.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [],
      );
    focusables()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
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
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={id}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-x-0 top-full max-h-[calc(100vh-76px)] overflow-y-auto border-b border-line bg-ink lg:hidden"
          data-lenis-prevent
        >
          <ul className="container-x flex flex-col py-4">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              if (!item.children) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-12 items-center border-b border-line-soft py-3 font-display text-lg font-semibold",
                        active ? "text-brand" : "text-fg",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={item.href} className="border-b border-line-soft">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-12 flex-1 items-center py-3 font-display text-lg font-semibold",
                        active ? "text-brand" : "text-fg",
                      )}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-label={servicesOpen ? "Hide services" : "Show services"}
                      onClick={() => setServicesOpen((value) => !value)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-md text-fg-muted hover:text-fg"
                    >
                      <ChevronDown
                        aria-hidden="true"
                        size={18}
                        className={cn("transition-transform duration-base", servicesOpen && "rotate-180")}
                      />
                    </button>
                  </div>
                  {servicesOpen ? (
                    <ul className="flex flex-col pb-3 pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="flex min-h-11 items-center py-2 text-[15px] text-fg-soft hover:text-fg"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
            <li className="pt-5">
              <Button href={primaryCta.href} icon="arrow" className="w-full">
                {primaryCta.label}
              </Button>
            </li>
          </ul>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
