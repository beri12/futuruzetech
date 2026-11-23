# Futurize Technology website

Marketing website for Futurize Technology: software development, web development, mobile apps, AI solutions and digital marketing for businesses in Ethiopia, Africa and international markets.

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript (strict), Tailwind CSS 4, GSAP (ScrollTrigger, ScrollTo, ScrambleText) and Lenis.

## Contents

- [Architecture](#architecture)
- [Getting started](#getting-started)
- [Environment configuration](#environment-configuration)
- [Contact form setup](#contact-form-setup)
- [Content](#content)
- [Checks and tests](#checks-and-tests)
- [Deployment](#deployment)
- [Migration notes](#migration-notes)

## Architecture

```
src/
  app/                    App Router routes (Server Components by default)
    page.tsx              Homepage
    services/[slug]/      Eight service detail pages (statically generated)
    work/[slug]/          Portfolio detail pages
    blog/[slug]/          Insights articles
    about, process, pricing, contact, privacy-policy, terms
    api/contact/route.ts  Inquiry submission (Zod validation, honeypot, rate limit, Resend)
    api/newsletter/route.ts
    sitemap.ts, robots.ts, icon.svg, not-found.tsx, error.tsx, loading.tsx
  proxy.ts                Returns a real 404 for unknown service/work/blog slugs
  components/
    layout/               Header (dropdowns + full-screen mobile menu), footer, page header, back-to-top
    sections/             Homepage and shared page sections
    services/, portfolio/ Service and project cards
    forms/                Contact and newsletter forms (React Hook Form + Zod)
    motion/               GSAP components: Reveal/Stagger, SplitText, ScrollText, ScrambleText, Magnetic,
                          TiltCard, Cursor, Parallax, ClipReveal, DrawSvg, Counter, Marquee, ScrollProgress, Lenis
    ui/                   Button, Container, SectionHeading, typography, Chip, Accordion, Breadcrumbs, Logo, SocialLinks
    seo/                  JSON-LD helper
  config/                 site.ts (identity, contact, social), navigation.ts
  data/                   Typed content: services, projects, blog, faqs, process, stack, engagement
  hooks/                  useMagnetic, useTilt (pointer-driven GSAP hooks)
  lib/                    utils, validation (Zod schemas), email (Resend), rate-limit, seo
    motion/               gsap.ts (plugin registration + motion tokens), lenis-store.ts
  fonts/                  Self-hosted Space Grotesk, Inter and Instrument Serif italic (SIL OFL)
  types/                  Shared TypeScript types
tests/                    Vitest unit tests (validation, rate limiting, contact route)
```

Design decisions worth knowing:

- **Content lives in `src/data`**, separate from presentation. Adding a service, project or article is a data change; the pages, navigation, footer and sitemap update automatically.
- **No invented facts.** Projects whose details are unconfirmed carry bracketed placeholders, are flagged `needsVerification: true`, and are excluded from the sitemap and marked `noindex` until updated. The testimonial section renders only when `src/data/testimonials.ts` has entries; otherwise a "What to expect" section is shown.
- **Fonts are self-hosted** via `next/font/local` so builds are reproducible without network access.
- **Cache Components** (Next 16 default) prerender every page as static HTML. Dynamic detail routes use `generateStaticParams`; `src/proxy.ts` rewrites unknown slugs so they return HTTP 404 rather than a streamed soft-404.
- **Motion**: GSAP is the single animation engine. `src/lib/motion/gsap.ts` registers the plugins once and holds the shared tokens (eases, durations, staggers, media queries); components import from there. Every effect is created inside `gsap.matchMedia()` so it only exists when `prefers-reduced-motion: no-preference` matches, and pointer effects (magnetic buttons, card tilt, cursor follower, hero light) additionally require a desktop-width, fine-pointer device. `useGSAP` handles cleanup. Content is always server-rendered visible: hero and page headings animate with CSS keyframes so they paint before hydration (good LCP), and scroll reveals only apply their hidden state after hydration. Lenis smooth scrolling is synced to ScrollTrigger and disabled for reduced motion and touch devices.
- **Design system**: deep black surfaces (`#080B09` / `#101713`), one brand green (`#00E58B`, secondary `#00B96B`), translucent hairline borders, and a fluid type scale (`text-display-xl/lg/md/sm`, `text-lead`, `text-statement`) built with `clamp()`. Space Grotesk for headlines, Inter for body, Instrument Serif italic for accent words. `cn()` is configured so tailwind-merge understands the custom type-scale classes.
- **Design tokens** are CSS custom properties in `src/app/globals.css`, exposed to Tailwind through `@theme` (for example `bg-ink`, `text-fg-muted`, `border-line`, `font-display`).

## Getting started

Requirements: Node.js 20.9 or newer (22 recommended) and npm.

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

## Environment configuration

See `.env.example` for every variable with comments. Summary:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical URL for metadata, sitemap, robots and JSON-LD |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_CONTACT_LOCATION` | Optional | Shown on the contact section only when set |
| `NEXT_PUBLIC_SOCIAL_*` | Optional | Footer social icons appear only for configured profiles |
| `RESEND_API_KEY`, `CONTACT_EMAIL`, `EMAIL_FROM` | For the contact form | Email delivery through Resend |
| `NEXT_PUBLIC_NEWSLETTER_ENABLED`, `RESEND_AUDIENCE_ID` | Optional | Newsletter signup on `/blog` |
| `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_MS` | Optional | Form rate limiting (default 5 per 10 minutes) |

Secrets (`RESEND_*`, `CONTACT_EMAIL`, `EMAIL_FROM`) are only read on the server and never reach the browser bundle.

## Contact form setup

1. Create a [Resend](https://resend.com) account and verify your sending domain.
2. Set `RESEND_API_KEY`, `CONTACT_EMAIL` (where inquiries arrive) and `EMAIL_FROM` (a verified sender).
3. Restart the server. Submit the form on `/contact`; the inquiry arrives as an email with `Reply-To` set to the sender.

Until these are set, `POST /api/contact` responds with HTTP 503 and `code: "NOT_CONFIGURED"`, and the form shows an honest error with the public contact email (if configured). There is no fake success state.

Protection in place: shared Zod schema on client and server, a honeypot field (bots receive a silent `200`), request-size limits, and an in-memory rate limiter keyed by client IP. The limiter is per server instance; on serverless platforms swap `src/lib/rate-limit.ts` for a shared store (for example Upstash Redis) if you need strict global limits.

Submissions are not logged and are not stored in a database. If lead storage is needed later, add Prisma + PostgreSQL in `src/lib` and call it from the route handler after validation.

## Content

- **Services**: `src/data/services.ts` (slug list in `src/data/service-slugs.ts`).
- **Projects**: `src/data/projects.ts`. Screenshots live in `public/images/projects/`. `imageFit: "contain"` (with `imageBackground`) shows a logo uncropped instead of a full-bleed screenshot. Set `needsVerification: true` on any entry whose details still need confirming; it is then noindexed and left out of the sitemap.
- **Articles**: `src/data/blog.ts`, a typed block format (paragraph, heading, list). Migrate to MDX or a CMS later without touching the pages.
- **FAQs, process, stack, engagement models**: the remaining files in `src/data`.
- **Testimonials**: `src/data/testimonials.ts`, add only verified, approved quotes.
- **Legal pages**: `src/app/privacy-policy` and `src/app/terms` are structural drafts with a visible "draft for review" notice; complete the bracketed sections and have them reviewed, then remove `<LegalNotice />`.

## Checks and tests

```bash
npm run typecheck   # tsc --noEmit (strict)
npm run lint        # eslint (next/core-web-vitals + typescript)
npm run test        # vitest: validation schema, rate limiter, contact route
npm run build       # next build (fails on type or prerender errors)
npm run check       # all of the above in sequence
```

Lighthouse has not been re-run since the GSAP redesign. The previous design measured accessibility, best practices and SEO at 100 and homepage performance at 83 (mobile simulation); re-measure after deploying. Framer Motion has been removed, so all motion now ships in one library (GSAP).

Browser checks performed with Playwright against a production build (`npm run build && npm run start`): all routes return the expected status (unknown slugs 404), no console errors on the homepage at 1440 px or on an iPhone 13 profile, no horizontal overflow at either width, the pinned horizontal project scroll works on desktop and falls back to a vertical stack on mobile and with reduced motion, no text is left hidden with reduced motion, the mobile menu opens and closes with Escape, the form API returns the honest not-configured state, and the first Tab lands on "Skip to content".

## Deployment

Any Node.js host works (the app uses the Node runtime; no edge-only APIs).

**Vercel / similar platforms**: import the repository, set the environment variables, deploy. Build command `npm run build`, output handled by the platform.

**Docker / VPS**:

```bash
npm ci
npm run build
NODE_ENV=production npm run start   # listens on :3000, put Nginx or Cloudflare in front
```

Before going live:

1. Set `NEXT_PUBLIC_SITE_URL` to the real domain (sitemap, canonical URLs and robots depend on it).
2. Configure Resend variables and test the form once.
3. Fill in contact details and social links, or leave them unset to hide them.
4. Replace portfolio placeholders and legal placeholders.
5. Optionally add analytics (none is included by default, so no third-party scripts ship).

## Migration notes

This repository started as a Vite + React 18 + Tailwind 3 template ("True Social"). The original source is preserved in git history at the tag `legacy-vite` (first commit). Nothing from the template's branding, copy or stock imagery was carried over; the section structure (hero, services, portfolio, process, FAQ, contact, footer) informed the new information architecture, and the project was rebuilt on Next.js with an original Futurize Technology design system.
