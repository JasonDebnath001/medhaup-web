import "server-only";

import { createHash, randomBytes } from "node:crypto";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const entries = new Map<string, RateLimitEntry>();
const processSalt = randomBytes(24).toString("hex");
let lastCleanupAt = 0;

function hashIdentifier(identifier: string) {
  return createHash("sha256")
    .update(processSalt)
    .update(identifier)
    .digest("hex");
}

function cleanupExpiredEntries(now: number) {
  if (now - lastCleanupAt < 60_000) return;
  lastCleanupAt = now;

  for (const [key, entry] of entries) {
    if (entry.resetAt <= now) entries.delete(key);
  }
}

export function checkAIRateLimit(
  identifier: string,
  limit: number,
  windowMs: number,
) {
  const now = Date.now();
  cleanupExpiredEntries(now);
  const key = hashIdentifier(identifier);
  const existing = entries.get(key);

  if (!existing || existing.resetAt <= now) {
    entries.set(key, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true as const,
      remaining: Math.max(limit - 1, 0),
      retryAfterSeconds: 0,
    };
  }

  if (existing.count >= limit) {
    return {
      allowed: false as const,
      remaining: 0,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((existing.resetAt - now) / 1_000),
      ),
    };
  }

  existing.count += 1;
  return {
    allowed: true as const,
    remaining: Math.max(limit - existing.count, 0),
    retryAfterSeconds: 0,
  };
}
