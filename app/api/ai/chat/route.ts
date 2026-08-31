import {
  buildTrustedPageContext,
  isAIPagePath,
  normalizeAIPath,
} from "@/lib/ai/context";
import { getAIConfig, hasProviderEnvironment } from "@/lib/ai/config";
import {
  askPRLabs,
  AIProviderError,
  isPRLabsReady,
  withProviderTimeout,
} from "@/lib/ai/prlabs";
import {
  buildProviderInput,
  getCounsellingGuardrailAnswer,
} from "@/lib/ai/prompts";
import { checkAIRateLimit } from "@/lib/ai/rate-limit";
import {
  AI_LANGUAGES,
  type AIChatError,
  type AIChatMessage,
  type AIChatSuccess,
  type AIErrorCode,
  type AILanguage,
} from "@/lib/ai/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 32_000;
const MAX_HISTORY_MESSAGES = 8;
const MAX_HISTORY_MESSAGE_CHARS = 1_600;
const AI_UNAVAILABLE_MESSAGE = "AI is not available right now.";

function errorResponse(
  requestId: string,
  code: AIErrorCode,
  message: string,
  status: number,
  retryAfterSeconds?: number,
) {
  const body: AIChatError = {
    ok: false,
    error: { code, message, retryAfterSeconds },
    requestId,
  };
  const headers = new Headers({
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  if (retryAfterSeconds) {
    headers.set("Retry-After", String(retryAfterSeconds));
  }
  return Response.json(body, { status, headers });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function parseHistory(value: unknown): AIChatMessage[] | null {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > MAX_HISTORY_MESSAGES) return null;

  const history: AIChatMessage[] = [];
  for (const item of value) {
    if (!isRecord(item)) return null;
    if (item.role !== "user" && item.role !== "assistant") return null;
    if (typeof item.content !== "string") return null;
    const content = item.content.trim();
    if (!content || content.length > MAX_HISTORY_MESSAGE_CHARS) return null;
    history.push({ role: item.role, content });
  }
  return history;
}

function parseRequestBody(value: unknown, maxMessageChars: number) {
  if (!isRecord(value)) return null;
  if ("system" in value || "systemPrompt" in value || "context" in value) {
    return null;
  }
  if (typeof value.message !== "string") return null;
  const message = value.message.trim();
  if (!message || message.length > maxMessageChars) return null;
  if (
    typeof value.language !== "string" ||
    !AI_LANGUAGES.includes(value.language as AILanguage)
  ) {
    return null;
  }
  if (!isRecord(value.page) || typeof value.page.path !== "string") return null;
  const path = normalizeAIPath(value.page.path);
  if (!path) return null;
  const history = parseHistory(value.history);
  if (!history) return null;

  return {
    message,
    language: value.language as AILanguage,
    page: { path },
    history,
  };
}

function requestIdentifier(request: Request) {
  const headers = request.headers;
  return (
    headers.get("cf-connecting-ip") ||
    headers.get("x-real-ip") ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown-client"
  );
}

function providerStatus(code: AIErrorCode) {
  if (code === "PROVIDER_AUTH" || code === "NOT_CONFIGURED") return 503;
  if (code === "PROVIDER_TIMEOUT") return 504;
  if (code === "RATE_LIMITED") return 429;
  return 502;
}

function publicProviderMessage(code: AIErrorCode) {
  if (code === "PROVIDER_TIMEOUT") {
    return "medhaup AI took too long to respond. Please try again.";
  }
  if (code === "RATE_LIMITED") {
    return AI_UNAVAILABLE_MESSAGE;
  }
  if (code === "NOT_CONFIGURED") {
    return "medhaup AI is not available right now. The rest of the site is still available.";
  }
  return "medhaup AI could not answer right now. Please try again later.";
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const config = getAIConfig();

  const contentLength = Number.parseInt(
    request.headers.get("content-length") ?? "0",
    10,
  );
  if (contentLength > MAX_BODY_BYTES) {
    return errorResponse(
      requestId,
      "INVALID_REQUEST",
      "That request is too large. Please ask a shorter question.",
      413,
    );
  }

  let rawBody: unknown;
  try {
    const rawText = await request.text();
    if (rawText.length > MAX_BODY_BYTES) {
      return errorResponse(
        requestId,
        "INVALID_REQUEST",
        "That request is too large. Please ask a shorter question.",
        413,
      );
    }
    rawBody = JSON.parse(rawText);
  } catch {
    return errorResponse(
      requestId,
      "INVALID_REQUEST",
      "Please send a valid question.",
      400,
    );
  }

  const body = parseRequestBody(rawBody, config.maxMessageChars);
  if (!body) {
    return errorResponse(
      requestId,
      "INVALID_REQUEST",
      "Please check the question, language, and page, then try again.",
      400,
    );
  }

  if (!isAIPagePath(body.page.path)) {
    return errorResponse(
      requestId,
      "INVALID_REQUEST",
      "AI help is not available for this page.",
      400,
    );
  }

  if (
    !config.enabled ||
    !hasProviderEnvironment(config) ||
    !isPRLabsReady(config)
  ) {
    return errorResponse(
      requestId,
      "NOT_CONFIGURED",
      publicProviderMessage("NOT_CONFIGURED"),
      503,
    );
  }

  let pageContext;
  try {
    pageContext = await buildTrustedPageContext(
      body.page.path,
      config.maxContextChars,
    );
  } catch {
    console.warn("[ai] Trusted page context failed", {
      requestId,
      path: body.page.path,
    });
    return errorResponse(
      requestId,
      "PROVIDER_ERROR",
      "medhaup AI could not load this page context right now.",
      503,
    );
  }
  if (!pageContext) {
    return errorResponse(
      requestId,
      "INVALID_REQUEST",
      "AI help is not available for this page.",
      400,
    );
  }

  const guardrailAnswer = getCounsellingGuardrailAnswer(
    body.message,
    body.language,
  );
  if (guardrailAnswer) {
    const response: AIChatSuccess = {
      ok: true,
      answer: guardrailAnswer,
      requestId,
      meta: {
        pageType: pageContext.pageType,
        language: body.language,
        guarded: true,
      },
    };
    return Response.json(response, {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  const rateLimit = checkAIRateLimit(
    requestIdentifier(request),
    config.rateLimitRequests,
    config.rateLimitWindowMs,
  );
  if (!rateLimit.allowed) {
    return errorResponse(
      requestId,
      "RATE_LIMITED",
      AI_UNAVAILABLE_MESSAGE,
      429,
      rateLimit.retryAfterSeconds,
    );
  }

  try {
    const providerInput = buildProviderInput(
      body.message,
      body.language,
      body.history,
      pageContext,
    );
    const providerOutput = await withProviderTimeout(
      (signal) => askPRLabs(providerInput, config, signal),
      config.timeoutMs,
    );
    const answer = providerOutput.answer.trim();
    if (!answer) {
      throw new AIProviderError(
        "PROVIDER_ERROR",
        "The provider returned an empty answer.",
      );
    }

    const response: AIChatSuccess = {
      ok: true,
      answer: answer.slice(0, 6_000),
      requestId,
      meta: {
        pageType: pageContext.pageType,
        language: body.language,
      },
    };
    return Response.json(response, {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    const providerError =
      error instanceof AIProviderError
        ? error
        : new AIProviderError("PROVIDER_ERROR", "Unknown provider error.");
    console.warn("[ai] Provider request failed", {
      requestId,
      code: providerError.code,
      pageType: pageContext.pageType,
    });
    return errorResponse(
      requestId,
      providerError.code,
      publicProviderMessage(providerError.code),
      providerStatus(providerError.code),
      providerError.retryAfterSeconds,
    );
  }
}
