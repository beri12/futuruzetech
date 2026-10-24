import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { serviceSlugs } from "@/data/services";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: Array<{ path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/work", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/process", priority: 0.6, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      priority: route.priority,
      changeFrequency: route.changeFrequency,
    })),
    ...serviceSlugs.map((slug) => ({
      url: absoluteUrl(`/services/${slug}`),
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    // Unverified projects are excluded until their details are confirmed.
    ...projects
      .filter((project) => !project.needsVerification)
      .map((project) => ({
        url: absoluteUrl(`/work/${project.slug}`),
        priority: 0.6,
        changeFrequency: "monthly" as const,
      })),
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      priority: 0.5,
      changeFrequency: "monthly" as const,
    })),
  ];
}
