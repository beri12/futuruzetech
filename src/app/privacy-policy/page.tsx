import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { LegalNotice } from "@/components/layout/legal-notice";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects personal information submitted through this website.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we handle the information you share with us through this website."
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />
      <section className="bg-ink">
        <Container className="section-y flex flex-col gap-8">
          <LegalNotice />
          <div className="prose-ft max-w-[760px]">
            <p>
              <strong>Last updated:</strong> [DATE]
            </p>
            <p>
              This policy explains what personal information {siteConfig.name} (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;) collects through this website, why we collect it, and the choices you
              have.
            </p>

            <h2>Information we collect</h2>
            <ul>
              <li>
                <strong>Information you give us.</strong> When you submit the contact form we collect
                your name, email address, company or organization (optional), the service you are
                interested in, an estimated budget range, a timeline, and your project description.
              </li>
              <li>
                <strong>Newsletter subscriptions.</strong> If newsletter signup is enabled and you
                subscribe, we collect your email address.
              </li>
              <li>
                <strong>Technical information.</strong> Our hosting provider and any analytics service
                we enable may record standard technical data such as IP address, browser type, pages
                visited, and the date and time of visits. [LIST ANY ANALYTICS TOOLS IN USE.]
              </li>
            </ul>

            <h2>How we use it</h2>
            <ul>
              <li>To respond to your inquiry and discuss a potential project.</li>
              <li>To send newsletter emails you have asked for, with an unsubscribe link in each one.</li>
              <li>To keep the website secure, for example by limiting repeated form submissions.</li>
              <li>To understand how the website is used and improve it.</li>
            </ul>

            <h2>Where your data goes</h2>
            <p>
              Contact form submissions are delivered to our inbox through an email delivery provider.
              Newsletter subscriptions are stored with our email service provider. We do not sell
              personal information. [NAME THE PROVIDERS AND HOSTING REGION IN USE.]
            </p>

            <h2>How long we keep it</h2>
            <p>
              We keep inquiry emails for as long as needed to respond and, if a project follows, for
              the duration of the engagement and any legally required retention period. You can ask
              us to delete your information at any time.
            </p>

            <h2>Your rights</h2>
            <p>
              Depending on where you live, you may have the right to access, correct, or delete the
              personal information we hold about you, or to object to certain uses. To exercise these
              rights, contact us using the details below.
            </p>

            <h2>Cookies</h2>
            <p>
              This website uses only the storage necessary for it to work, such as remembering that
              you dismissed the announcement bar for the current session. [UPDATE IF ANALYTICS OR
              ADVERTISING COOKIES ARE ADDED.]
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this policy as the website or the law changes. The date at the top shows
              the latest revision.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about privacy: {siteConfig.contact.email ?? "[CONTACT EMAIL]"}
              {siteConfig.contact.location ? `, ${siteConfig.contact.location}` : ""}.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
