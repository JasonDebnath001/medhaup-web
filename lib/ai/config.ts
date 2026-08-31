import "server-only";

const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_MESSAGE_CHARS = 1_200;
const DEFAULT_CONTEXT_CHARS = 6_500;
const DEFAULT_RATE_LIMIT_REQUESTS = 8;
const DEFAULT_RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1_000;
const DEFAULT_PRLABS_HOST = "chatgpt-42.p.rapidapi.com";
const DEFAULT_PRLABS_CHAT_ENDPOINT =
  "https://chatgpt-42.p.rapidapi.com/gpt4";

function boundedInteger(
  value: string | undefined,
  fallback: number,
  minimum: number,
  maximum: number,
) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed)
    ? Math.min(Math.max(parsed, minimum), maximum)
    : fallback;
}

export type AIConfig = {
  enabled: boolean;
  rapidApiKey?: string;
  rapidApiHost: string;
  chatEndpoint: string;
  timeoutMs: number;
  maxMessageChars: number;
  maxContextChars: number;
  rateLimitRequests: number;
  rateLimitWindowMs: number;
};

export function getAIConfig(): AIConfig {
  return {
    enabled: process.env.AI_FEATURE_ENABLED === "true",
    rapidApiKey: process.env.PRLABS_RAPIDAPI_KEY?.trim(),
    rapidApiHost:
      process.env.PRLABS_RAPIDAPI_HOST?.trim() || DEFAULT_PRLABS_HOST,
    chatEndpoint:
      process.env.PRLABS_CHAT_ENDPOINT?.trim() ||
      DEFAULT_PRLABS_CHAT_ENDPOINT,
    timeoutMs: boundedInteger(
      process.env.AI_REQUEST_TIMEOUT_MS,
      DEFAULT_TIMEOUT_MS,
      3_000,
      30_000,
    ),
    maxMessageChars: boundedInteger(
      process.env.AI_MAX_MESSAGE_CHARS,
      DEFAULT_MESSAGE_CHARS,
      200,
      4_000,
    ),
    maxContextChars: boundedInteger(
      process.env.AI_MAX_CONTEXT_CHARS,
      DEFAULT_CONTEXT_CHARS,
      1_000,
      12_000,
    ),
    rateLimitRequests: boundedInteger(
      process.env.AI_RATE_LIMIT_REQUESTS,
      DEFAULT_RATE_LIMIT_REQUESTS,
      1,
      100,
    ),
    rateLimitWindowMs: boundedInteger(
      process.env.AI_RATE_LIMIT_WINDOW_MS,
      DEFAULT_RATE_LIMIT_WINDOW_MS,
      60_000,
      7 * 24 * 60 * 60 * 1_000,
    ),
  };
}

export function hasProviderEnvironment(config = getAIConfig()) {
  return Boolean(
    config.rapidApiKey && config.rapidApiHost && config.chatEndpoint,
  );
}
