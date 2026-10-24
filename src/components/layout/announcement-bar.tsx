"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

const STORAGE_KEY = "ft-announcement-dismissed";

/**
 * Minimal, dismissible announcement bar. Dismissal is remembered for the
 * session only, so a returning visitor sees it again in a new session.
 */
export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === "1") setVisible(false);
    } catch {
      /* storage unavailable: keep the bar visible */
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-b border-line bg-forest px-4 py-2 text-[13px] text-fg-muted"
    >
      <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-brand shadow-glow" />
      <span>{siteConfig.announcement.message}</span>
      <Link
        href={siteConfig.announcement.href}
        className="inline-flex items-center gap-1.5 py-1 font-medium text-fg hover:text-brand-bright"
      >
        {siteConfig.announcement.cta}
        <ArrowRight aria-hidden="true" size={14} strokeWidth={2.2} />
      </Link>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-sm text-fg-muted hover:bg-surface hover:text-fg"
      >
        <X aria-hidden="true" size={14} strokeWidth={2.2} />
      </button>
    </div>
  );
}
