/**
 * Service slugs in one dependency-free module so the proxy (which checks
 * unknown slugs before rendering) can import them without pulling in icons.
 * The order here is the display order across the site.
 */
export const serviceSlugList = [
  "software-development",
  "web-development",
  "mobile-app-development",
  "ai-development",
  "erp-enterprise-systems",
  "digital-transformation",
  "ui-ux-design",
  "digital-marketing",
] as const;

export type ServiceSlug = (typeof serviceSlugList)[number];
