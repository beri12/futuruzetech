/**
 * Simple in-memory sliding-window rate limiter.
 *
 * Suitable for a single long-running server (VPS, Docker, Node host). On
 * serverless platforms each instance keeps its own counter, so swap this for
 * a shared store (for example Upstash Redis) if stricter limits are needed.
 * The interface stays the same.
 */

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

const DEFAULT_LIMIT = Number(process.env.RATE_LIMIT_MAX ?? 5);
const DEFAULT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 10 * 60 * 1000);

export type RateLimitResult = { ok: true } | { ok: false; retryAfterSeconds: number };

export function rateLimit(
  key: string,
  limit = DEFAULT_LIMIT,
  windowMs = DEFAULT_WINDOW_MS,
): RateLimitResult {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    sweep(now);
    return { ok: true };
  }

  if (entry.count >= limit) {
    return { ok: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { ok: true };
}

/** Drop expired buckets occasionally so the map does not grow unbounded. */
function sweep(now: number) {
  if (buckets.size < 500) return;
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) buckets.delete(key);
  }
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  return ip;
}
