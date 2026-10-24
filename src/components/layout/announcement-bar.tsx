"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useSyncExternalStore } from "react";
import { siteConfig } from "@/config/site";

const STORAGE_KEY = "ft-announcement-dismissed";
const EVENT = "ft-announcement-change";
let memoryDismissed = false;

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  return () => window.removeEventListener(EVENT, callback);
}

function getSnapshot(): boolean {
  if (memoryDismissed) return true;
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Minimal, dismissible announcement bar. Dismissal is remembered for the
 * session only, so a returning visitor sees it again in a new session.
 */
export function AnnouncementBar() {
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (dismissed) return null;

  const dismiss = () => {
    memoryDismissed = true;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* storage unavailable: dismissal lasts until the page is reloaded */
    }
    window.dispatchEvent(new Event(EVENT));
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
