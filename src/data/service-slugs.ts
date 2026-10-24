/**
 * Service slugs in one dependency-free module so the proxy (which checks
 * unknown slugs before rendering) can import them without pulling in icons.
 */
export const serviceSlugList = [
  "web-development",
  "software-development",
  "mobile-app-development",
  "ai-development",
  "digital-marketing",
  "ui-ux-design",
] as const;

export type ServiceSlug = (typeof serviceSlugList)[number];
