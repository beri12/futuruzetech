import { services } from "@/data/services";

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: services.map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
      description: service.shortDescription,
    })),
  },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta = { label: "Start a Project", href: "/contact" };

export const footerNav = {
  services: services.map((service) => ({
    label: service.title,
    href: `/services/${service.slug}`,
  })),
  company: [
    { label: "About", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Engagement Models", href: "/pricing" },
    { label: "Insights", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
