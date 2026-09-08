import "server-only";

const DEFAULT_TIMEOUT_MS = 30_000;
const DEFAULT_MESSAGE_CHARS = 1_200;
const DEFAULT_CONTEXT_CHARS = 6_500;
const DEFAULT_RATE_LIMIT_REQUESTS = 8;
const DEFAULT_RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1_000;
const DEFAULT_GEMINI_MODEL = "gemini-3.5-flash-lite";

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
  geminiApiKey?: string;
  tavilyApiKey?: string;
  geminiModel: string;
  maxOutputTokens: number;
  timeoutMs: number;
  maxMessageChars: number;
  maxContextChars: number;
  rateLimitRequests: number;
  rateLimitWindowMs: number;
};

export function getAIConfig(): AIConfig {
  return {
    enabled: process.env.AI_FEATURE_ENABLED === "true",
    geminiApiKey: process.env.GEMINI_API_KEY?.trim(),
    tavilyApiKey: process.env.TAVILY_API_KEY?.trim(),
    geminiModel: process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL,
    maxOutputTokens: boundedInteger(
      process.env.AI_MAX_OUTPUT_TOKENS,
      1_536,
      128,
      4_096,
    ),
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
    config.geminiApiKey && /^gemini-[a-z0-9.-]+$/.test(config.geminiModel),
  );
}

export function isGeminiReady(config = getAIConfig()) {
  return config.enabled && hasProviderEnvironment(config);
}
