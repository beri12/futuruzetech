import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { LegalNotice } from "@/components/layout/legal-notice";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: `Terms that apply to the use of the ${siteConfig.name} website.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="The terms that apply when you use this website."
        breadcrumbs={[{ label: "Terms of Service" }]}
      />
      <section className="bg-ink">
        <Container className="section-y flex flex-col gap-8">
          <LegalNotice />
          <div className="prose-ft max-w-[760px]">
            <p>
              <strong>Last updated:</strong> [DATE]
            </p>

            <h2>1. Who we are</h2>
            <p>
              This website is operated by {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;).
              [ADD LEGAL ENTITY NAME, REGISTRATION DETAILS AND REGISTERED ADDRESS.]
            </p>

            <h2>2. Use of the website</h2>
            <p>
              You may use this website to learn about our services and to contact us. You agree not
              to misuse it, for example by attempting to gain unauthorized access, submitting
              automated or abusive requests, or interfering with its operation.
            </p>

            <h2>3. Project inquiries</h2>
            <p>
              Submitting an inquiry through this website does not create a contract between us.
              Services are provided only under a separate written agreement or proposal that sets
              out scope, deliverables, timeline, and fees.
            </p>

            <h2>4. Content and intellectual property</h2>
            <p>
              Unless stated otherwise, the text, design, and code of this website belong to{" "}
              {siteConfig.name}. Project names and descriptions in our portfolio are shown with the
              permission of the respective clients or refer to our own products. You may not copy or
              reuse website content without our written permission.
            </p>

            <h2>5. No warranties</h2>
            <p>
              The information on this website is provided for general information. We try to keep it
              accurate and current but do not guarantee that it is complete or error-free, and it
              does not constitute professional advice for any specific situation.
            </p>

            <h2>6. Limitation of liability</h2>
            <p>
              To the extent permitted by law, we are not liable for any loss arising from your use of
              this website or reliance on its content. [HAVE THIS SECTION REVIEWED FOR THE
              APPLICABLE JURISDICTION.]
            </p>

            <h2>7. Third-party links</h2>
            <p>
              The website may link to third-party sites. We are not responsible for their content or
              privacy practices.
            </p>

            <h2>8. Governing law</h2>
            <p>These terms are governed by the laws of [JURISDICTION].</p>

            <h2>9. Changes</h2>
            <p>
              We may update these terms from time to time. The date at the top shows the latest
              revision.
            </p>

            <h2>10. Contact</h2>
            <p>Questions about these terms: {siteConfig.contact.email ?? "[CONTACT EMAIL]"}.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
