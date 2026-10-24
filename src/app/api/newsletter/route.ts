import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation";
import { isNewsletterConfigured, subscribeToNewsletter } from "@/lib/email";
import { clientKey, rateLimit } from "@/lib/rate-limit";

/**
 * POST /api/newsletter
 * Subscribes an address to the Resend audience when configured.
 */
export async function POST(request: Request) {
  const limit = rateLimit(`newsletter:${clientKey(request)}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Please enter a valid email address." },
      { status: 422 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  if (!isNewsletterConfigured()) {
    console.error("[newsletter] Not configured. Set RESEND_API_KEY and RESEND_AUDIENCE_ID.");
    return NextResponse.json(
      { ok: false, error: "Newsletter signup is not available yet.", code: "NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  try {
    await subscribeToNewsletter(parsed.data.email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[newsletter] Subscription failed:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { ok: false, error: "We could not subscribe you right now. Please try again shortly." },
      { status: 502 },
    );
  }
}
