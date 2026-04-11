// Simple in-memory rate limiter for single-replica deployments.
// Not suitable for multi-instance — use Redis/similar if scaling horizontally.

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

export function rateLimit(key: string, limit: number, windowMs: number): { allowed: boolean; remaining: number; retryAfterSec: number } {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSec: 0 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count, retryAfterSec: 0 };
}

// Periodic cleanup to prevent unbounded growth
if (typeof setInterval !== "undefined") {
  const handle = setInterval(() => {
    const now = Date.now();
    buckets.forEach((entry, key) => {
      if (entry.resetAt <= now) buckets.delete(key);
    });
  }, 60_000);
  (handle as unknown as { unref?: () => void }).unref?.();
}
