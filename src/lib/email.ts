import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import { budgetOptions, labelFor, serviceOptions, timelineOptions, type ContactInput } from "@/lib/validation";

/**
 * Email delivery through Resend.
 *
 * Required environment variables (server-side only, never exposed):
 *   RESEND_API_KEY   API key from https://resend.com
 *   CONTACT_EMAIL    Inbox that receives project inquiries
 *   EMAIL_FROM       Verified sender, e.g. "Futurize Technology <hello@yourdomain.com>"
 *
 * When they are missing, `isEmailConfigured()` is false and the API returns an
 * actionable configuration error instead of pretending to send.
 */

const apiKey = process.env.RESEND_API_KEY;
const contactEmail = process.env.CONTACT_EMAIL;
const fromEmail = process.env.EMAIL_FROM;

export function isEmailConfigured(): boolean {
  return Boolean(apiKey && contactEmail && fromEmail);
}

export function missingEmailConfig(): string[] {
  const missing: string[] = [];
  if (!apiKey) missing.push("RESEND_API_KEY");
  if (!contactEmail) missing.push("CONTACT_EMAIL");
  if (!fromEmail) missing.push("EMAIL_FROM");
  return missing;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactEmail(input: ContactInput): Promise<{ id: string | null }> {
  if (!apiKey || !contactEmail || !fromEmail) {
    throw new Error("Email is not configured");
  }
  const resend = new Resend(apiKey);

  const rows: Array<[string, string]> = [
    ["Name", input.name],
    ["Email", input.email],
    ["Company", input.company || "Not provided"],
    ["Service", labelFor(serviceOptions, input.service)],
    ["Budget", labelFor(budgetOptions, input.budget)],
    ["Timeline", labelFor(timelineOptions, input.timeline)],
  ];

  const text = [
    `New project inquiry via ${siteConfig.name}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Project description:",
    input.message,
  ].join("\n");

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.6;color:#132019">
      <h2 style="margin:0 0 16px">New project inquiry</h2>
      <table style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:4px 12px 4px 0;color:#4B5E52">${escapeHtml(label)}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:20px 0 8px">Project description</h3>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(input.message)}</p>
    </div>`;

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: [contactEmail],
    replyTo: input.email,
    subject: `Project inquiry: ${labelFor(serviceOptions, input.service)} from ${input.name}`,
    text,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }
  return { id: data?.id ?? null };
}

/**
 * Newsletter subscriptions use Resend Audiences. Optional: requires
 * RESEND_AUDIENCE_ID in addition to RESEND_API_KEY.
 */
const audienceId = process.env.RESEND_AUDIENCE_ID;

export function isNewsletterConfigured(): boolean {
  return Boolean(apiKey && audienceId);
}

export async function subscribeToNewsletter(email: string): Promise<void> {
  if (!apiKey || !audienceId) {
    throw new Error("Newsletter is not configured");
  }
  const resend = new Resend(apiKey);
  const { error } = await resend.contacts.create({ email, audienceId, unsubscribed: false });
  if (error) {
    throw new Error(error.message);
  }
}
