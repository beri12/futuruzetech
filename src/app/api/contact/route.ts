import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { isEmailConfigured, missingEmailConfig, sendContactEmail } from "@/lib/email";
import { clientKey, rateLimit } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 16 * 1024;

/**
 * POST /api/contact
 *
 * Validates the inquiry server-side with the same Zod schema the form uses,
 * applies a honeypot and a rate limit, then sends the email. Responses never
 * include stack traces or credentials; submissions are not logged.
 */
export async function POST(request: Request) {
  const limit = rateLimit(`contact:${clientKey(request)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Request is too large." }, { status: 413 });
  }

  let payload: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "Request is too large." }, { status: 413 });
    }
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  // Honeypot filled: respond as if accepted so bots learn nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  if (!isEmailConfigured()) {
    const missing = missingEmailConfig();
    console.error(`[contact] Email delivery is not configured. Missing: ${missing.join(", ")}`);
    return NextResponse.json(
      {
        ok: false,
        error:
          "The contact form is not configured on this server yet. Please reach us by email instead.",
        code: "NOT_CONFIGURED",
        ...(process.env.NODE_ENV !== "production" ? { missing } : {}),
      },
      { status: 503 },
    );
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Failed to send inquiry email:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { ok: false, error: "We could not send your message right now. Please try again shortly." },
      { status: 502 },
    );
  }
}
