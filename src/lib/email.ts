import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import { budgetOptions, labelFor, serviceOptions, timelineOptions, type ContactInput } from "@/lib/validation";

/**
 * Email delivery through Resend.
 *
 * Environment variables (server-side only, never exposed):
 *   RESEND_API_KEY   Required. API key from https://resend.com
 *   CONTACT_EMAIL    Inbox that receives project inquiries (default below)
 *   EMAIL_FROM       Sender, e.g. "Futurize Technology <hello@yourdomain.com>".
 *                    Defaults to Resend's shared test sender, which can only
 *                    deliver to the email address of the Resend account owner.
 *
 * When the API key is missing, `isEmailConfigured()` is false and the API
 * returns an actionable configuration error instead of pretending to send.
 */

export const DEFAULT_CONTACT_EMAIL = "bekerberiso@gmail.com";
export const DEFAULT_EMAIL_FROM = "Futurize Technology <onboarding@resend.dev>";

const apiKey = process.env.RESEND_API_KEY;
const contactEmail = process.env.CONTACT_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL;
const fromEmail = process.env.EMAIL_FROM?.trim() || DEFAULT_EMAIL_FROM;

export function isEmailConfigured(): boolean {
  return Boolean(apiKey && contactEmail && fromEmail);
}

export function missingEmailConfig(): string[] {
  const missing: string[] = [];
  if (!apiKey) missing.push("RESEND_API_KEY");
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

  const received = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Addis_Ababa",
  }).format(new Date());

  const rows: Array<[string, string]> = [
    ["Name", input.name],
    ["Email", input.email],
    ["Company", input.company || "Not provided"],
    ["Service", labelFor(serviceOptions, input.service)],
    ["Budget", labelFor(budgetOptions, input.budget)],
    ["Timeline", labelFor(timelineOptions, input.timeline)],
    ["Received", `${received} (Addis Ababa time)`],
  ];

  const text = [
    `New project inquiry via ${siteConfig.name}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Project description:",
    input.message,
    "",
    `Reply to this email to answer ${input.name} directly (${input.email}).`,
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
      <p style="white-space:pre-wrap;margin:0;padding:12px 14px;background:#F3F6F4;border-radius:8px">${escapeHtml(input.message)}</p>
      <p style="margin:24px 0 0">
        <a href="mailto:${encodeURIComponent(input.email)}?subject=${encodeURIComponent(`Re: your inquiry to ${siteConfig.name}`)}"
           style="display:inline-block;padding:10px 18px;background:#132019;color:#ffffff;text-decoration:none;border-radius:999px;font-weight:600">
          Reply to ${escapeHtml(input.name)}
        </a>
      </p>
      <p style="margin:16px 0 0;font-size:13px;color:#4B5E52">You can also just press Reply: it goes straight to ${escapeHtml(input.email)}.</p>
    </div>`;

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: [contactEmail],
    replyTo: input.email,
    subject: `New inquiry from ${input.name}${input.company ? ` (${input.company})` : ""}: ${labelFor(serviceOptions, input.service)}`,
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
