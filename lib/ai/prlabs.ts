import "server-only";

import type { AIErrorCode, AIProviderInput, AIProviderOutput } from "./types";
import type { AIConfig } from "./config";

export const PRLABS_CONTRACT_INSTALLED = true;
export const VERIFIED_PRLABS_HOST = "chatgpt-42.p.rapidapi.com";
export const VERIFIED_PRLABS_METHOD = "POST";
export const VERIFIED_PRLABS_PATH = "/gpt4";
export const VERIFIED_PRLABS_ENDPOINT =
  `https://${VERIFIED_PRLABS_HOST}${VERIFIED_PRLABS_PATH}`;

const MAX_PROVIDER_RESPONSE_CHARS = 64_000;

type PRLabsResponse = {
  result: string;
  think: string;
  max_token: number;
  status: true;
  server_code: string;
};

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

export function isPRLabsReady(config: AIConfig) {
  return Boolean(
    PRLABS_CONTRACT_INSTALLED &&
    config.enabled &&
    config.rapidApiKey &&
    config.rapidApiHost === VERIFIED_PRLABS_HOST &&
    config.chatEndpoint === VERIFIED_PRLABS_ENDPOINT,
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function parsePRLabsResponse(value: unknown): PRLabsResponse {
  if (
    !isRecord(value) ||
    value.status !== true ||
    typeof value.result !== "string" ||
    !value.result.trim() ||
    typeof value.think !== "string" ||
    typeof value.max_token !== "number" ||
    typeof value.server_code !== "string"
  ) {
    throw new AIProviderError(
      "PROVIDER_ERROR",
      "Provider returned an invalid response.",
    );
  }

  return value as PRLabsResponse;
}

function serializePrompt(input: AIProviderInput) {
  const history = input.history.length
    ? input.history
        .map(
          (message) =>
            `${message.role === "assistant" ? "Assistant" : "Student"}: ${message.content}`,
        )
        .join("\n")
    : "No previous messages.";

  return `${input.systemPrompt}\n\nShort conversation history:\n${history}\n\nStudent's current question:\n${input.message}`;
}

export function providerErrorFromStatus(
  status: number,
  retryAfterHeader?: string | null,
) {
  if (status === 401 || status === 403) {
    return new AIProviderError("PROVIDER_AUTH", "Provider authentication failed.");
  }
  if (status === 429) {
    const parsedRetryAfter = Number.parseInt(retryAfterHeader ?? "", 10);
    return new AIProviderError(
      "RATE_LIMITED",
      "Provider rate limit reached.",
      Number.isFinite(parsedRetryAfter) ? Math.max(parsedRetryAfter, 1) : undefined,
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
          new AIProviderError("PROVIDER_TIMEOUT", "Provider request timed out."),
        );
      }, timeoutMs);
      operation(controller.signal).then(resolve, reject);
    });
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

export async function askPRLabs(
  input: AIProviderInput,
  config: AIConfig,
  signal: AbortSignal,
): Promise<AIProviderOutput> {
  if (!isPRLabsReady(config) || !config.rapidApiKey) {
    throw new AIProviderError(
      "NOT_CONFIGURED",
      "The AI provider is not configured.",
    );
  }

  let response: Response;
  try {
    response = await fetch(config.chatEndpoint, {
      method: VERIFIED_PRLABS_METHOD,
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": config.rapidApiHost,
        "x-rapidapi-key": config.rapidApiKey,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: serializePrompt(input),
          },
        ],
        web_access: false,
      }),
      cache: "no-store",
      signal,
    });
  } catch (error) {
    if (signal.aborted) {
      throw new AIProviderError(
        "PROVIDER_TIMEOUT",
        "Provider request timed out.",
      );
    }
    throw new AIProviderError(
      "PROVIDER_ERROR",
      error instanceof Error
        ? "Provider network request failed."
        : "Provider request failed.",
    );
  }

  if (!response.ok) {
    throw providerErrorFromStatus(
      response.status,
      response.headers.get("retry-after"),
    );
  }

  const rawResponse = await response.text();
  if (!rawResponse || rawResponse.length > MAX_PROVIDER_RESPONSE_CHARS) {
    throw new AIProviderError(
      "PROVIDER_ERROR",
      "Provider returned an invalid response size.",
    );
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawResponse);
  } catch {
    throw new AIProviderError(
      "PROVIDER_ERROR",
      "Provider returned invalid JSON.",
    );
  }

  return { answer: parsePRLabsResponse(payload).result.trim() };
}
