/**
 * Site-wide configuration.
 *
 * Everything that identifies the company lives here so it is defined once.
 * Values that are not yet confirmed (email, phone, social profiles) are
 * read from environment variables and omitted from the UI when unset,
 * instead of being invented.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const siteConfig = {
  name: "Futurize Technology",
  shortName: "Futurize",
  tagline: "Engineering Tomorrow. Building What Matters.",
  description:
    "Futurize Technology is a technology company delivering software engineering, mobile applications, artificial intelligence, enterprise systems and digital transformation for businesses in Ethiopia, Africa and international markets.",
  /** Canonical production URL. Falls back to localhost during local builds. */
  url: rawSiteUrl ?? "http://localhost:3000",
  locale: "en",
  /** Primary and secondary markets, used in copy and structured data. */
  markets: {
    primary: "Ethiopia and Africa",
    secondary: "United States, United Kingdom, Europe and other international markets",
  },
  /** Contact details, only shown when configured. */
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? null,
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? null,
    location: process.env.NEXT_PUBLIC_CONTACT_LOCATION ?? null,
  },
  /** Social profiles, only shown when configured. */
  social: {
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? null,
    x: process.env.NEXT_PUBLIC_SOCIAL_X ?? null,
    github: process.env.NEXT_PUBLIC_SOCIAL_GITHUB ?? null,
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? null,
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}
