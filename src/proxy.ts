import { NextResponse, type NextRequest } from "next/server";
import { serviceSlugList } from "@/data/service-slugs";
import { projectSlugs } from "@/data/projects";
import { postSlugs } from "@/data/blog";

/**
 * Returns a real HTTP 404 for unknown detail-page slugs.
 *
 * With Cache Components the static shell of a dynamic route streams with a
 * 200 before `notFound()` runs, so the check happens here, before rendering,
 * by rewriting unknown slugs to a path that does not exist. The branded
 * not-found page still renders, now with the correct status code.
 */
const known: Record<string, ReadonlySet<string>> = {
  services: new Set(serviceSlugList),
  work: new Set(projectSlugs),
  blog: new Set(postSlugs),
};

export function proxy(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  if (segments.length === 2) {
    const [section, slug] = segments;
    const slugs = known[section];
    if (slugs && !slugs.has(slug)) {
      return NextResponse.rewrite(new URL("/404", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/services/:slug", "/work/:slug", "/blog/:slug"],
};
