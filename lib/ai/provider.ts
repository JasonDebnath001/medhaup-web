import "server-only";

import type { AIErrorCode } from "./types";

export class AIProviderError extends Error {
  constructor(
    public readonly code: AIErrorCode,
    message: string,
    public readonly retryAfterSeconds?: number,
  ) {
    super(message);
    this.name = "AIProviderError";
  }
}

export function providerErrorFromStatus(
  status: number,
  retryAfterHeader?: string | null,
) {
  if (status === 401 || status === 403) {
    return new AIProviderError(
      "PROVIDER_AUTH",
      "Provider authentication failed.",
    );
  }
  if (status === 429) {
    const seconds = Number(retryAfterHeader);
    const parsedRetryAfter = retryAfterHeader?.trim()
      ? Number.isFinite(seconds)
        ? seconds
        : (Date.parse(retryAfterHeader) - Date.now()) / 1_000
      : Number.NaN;
    return new AIProviderError(
      "RATE_LIMITED",
      "Provider rate limit reached.",
      Number.isFinite(parsedRetryAfter)
        ? Math.max(Math.ceil(parsedRetryAfter), 1)
        : undefined,
    );
  }
  return new AIProviderError(
    "PROVIDER_ERROR",
    `Provider request failed with status ${status}.`,
  );
}

export async function withProviderTimeout<T>(
  operation: (signal: AbortSignal) => Promise<T>,
  timeoutMs: number,
) {
  const controller = new AbortController();
  let timeout: ReturnType<typeof setTimeout> | undefined;

  try {
    return await new Promise<T>((resolve, reject) => {
      timeout = setTimeout(() => {
        controller.abort();
        reject(
          new AIProviderError(
            "PROVIDER_TIMEOUT",
            "Provider request timed out.",
          ),
        );
      }, timeoutMs);
      operation(controller.signal).then(resolve, reject);
    });
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

