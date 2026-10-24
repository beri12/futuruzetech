import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Set to false for pages that must not be indexed. */
  index?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Builds consistent metadata for a route: title template, description,
 * canonical URL, Open Graph and Twitter cards, and indexing rules.
 */
export function buildMetadata({
  title,
  description,
  path,
  index = true,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMeta): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type,
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
  };
}

/** Organization structured data, limited to verified details. */
export function organizationJsonLd() {
  const sameAs = Object.values(siteConfig.social).filter((value): value is string => Boolean(value));
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/icon.svg"),
    description: siteConfig.description,
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
    ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    areaServed: ["Ethiopia", "Africa", "United States", "United Kingdom", "Europe"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function serviceJsonLd(service: { title: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: absoluteUrl(service.path),
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    areaServed: ["Ethiopia", "Africa", "United States", "United Kingdom", "Europe"],
  };
}
