import type { ReactNode } from "react";

/**
 * A template re-mounts on every navigation (unlike a layout), so the CSS
 * entrance below plays as a short page transition. It is transform-only:
 * content is painted immediately and never waits on JavaScript, and App
 * Router navigation, prefetching and scroll restoration are unaffected.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
