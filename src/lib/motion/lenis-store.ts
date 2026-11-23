import type Lenis from "lenis";

/**
 * Holds the active Lenis instance (if smooth scrolling is on) so other
 * components can scroll programmatically without fighting it.
 */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}
