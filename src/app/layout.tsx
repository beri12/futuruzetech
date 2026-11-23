import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { BackToTop } from "@/components/layout/back-to-top";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Cursor } from "@/components/motion/cursor";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

/*
 * Fonts are self-hosted WOFF2 files (SIL Open Font License, see
 * src/fonts/LICENSE-*.txt) loaded through next/font/local. Self-hosting
 * keeps builds reproducible offline and avoids a third-party request.
 *
 * - Space Grotesk: headlines and display type
 * - Inter: body copy and UI
 * - Instrument Serif (italic): editorial accent words inside headlines
 */
const spaceGrotesk = localFont({
  src: "../fonts/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const instrumentSerif = localFont({
  src: "../fonts/instrument-serif-latin-400-italic.woff2",
  variable: "--font-instrument-serif",
  weight: "400",
  style: "italic",
  display: "swap",
  fallback: ["ui-serif", "Georgia", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Software, Mobile, AI and Digital Transformation`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "software development Ethiopia",
    "software company Addis Ababa",
    "mobile app development Africa",
    "AI development",
    "ERP and enterprise systems",
    "digital transformation",
    "custom software",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.tagline,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.tagline,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#080B09",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <ScrollProgress />
        <div id="top" className="flex min-h-full flex-1 flex-col">
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </div>
        <BackToTop />
        <Cursor />
      </body>
    </html>
  );
}
