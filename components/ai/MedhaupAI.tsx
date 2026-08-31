"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { trackGAEvent } from "@/lib/analytics";
import type {
  AIChatMessage,
  AIChatResponse,
  AIErrorCode,
  AILanguage,
} from "@/lib/ai/types";
import AITrigger from "./AITrigger";
import type { AIClientError } from "./AIErrorState";
import { getAIPageDescriptor, type AIQuickPrompt } from "./page-config";

const AIPanel = dynamic(() => import("./AIPanel"), { ssr: false });

const MAX_MESSAGE_CHARS = 1_200;
const CLIENT_TIMEOUT_MS = 22_000;

type LastAttempt = {
  message: string;
  history: AIChatMessage[];
};

function latencyBucket(milliseconds: number) {
  if (milliseconds < 2_000) return "under_2s";
  if (milliseconds < 5_000) return "2_to_5s";
  if (milliseconds < 10_000) return "5_to_10s";
  return "over_10s";
}

function isAIChatResponse(value: unknown): value is AIChatResponse {
  if (!value || typeof value !== "object") return false;
  const response = value as Partial<AIChatResponse>;
  return (
    typeof response.ok === "boolean" && typeof response.requestId === "string"
  );
}

function fallbackError(code: AIErrorCode, message: string): AIClientError {
  return { code, message };
}

export default function MedhaupAI({
  campaignVisible,
}: {
  campaignVisible: boolean;
}) {
  const pathname = usePathname();
  const descriptor = getAIPageDescriptor(pathname);
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<AILanguage>("auto");
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AIClientError | null>(null);
  const [lastAttempt, setLastAttempt] = useState<LastAttempt | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(
    () => () => {
      abortRef.current?.abort();
    },
    [],
  );

  const closePanel = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const sendQuestion = useCallback(
    async (
      question: string,
      options?: { appendUser?: boolean; history?: AIChatMessage[] },
    ) => {
      if (!descriptor || loading) return;
      const trimmed = question.trim();
      if (!trimmed || trimmed.length > MAX_MESSAGE_CHARS) return;

      const history = (options?.history ?? messages).slice(-8);
      const appendUser = options?.appendUser ?? true;
      if (appendUser)
        setMessages((current) => [
          ...current,
          { role: "user", content: trimmed },
        ]);
      setInput("");
      setError(null);
      setLoading(true);
      setLastAttempt({ message: trimmed, history });
      trackGAEvent("ai_prompt_submit", {
        ai_mode: "page_help",
        content_type: descriptor.contentType,
        language,
        is_follow_up: history.length > 0,
      });

      const controller = new AbortController();
      abortRef.current?.abort();
      abortRef.current = controller;
      const timeout = window.setTimeout(
        () => controller.abort(),
        CLIENT_TIMEOUT_MS,
      );
      const startedAt = performance.now();

      try {
        const response = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          signal: controller.signal,
          body: JSON.stringify({
            message: trimmed,
            language,
            page: { path: descriptor.path },
            history,
          }),
        });
        const payload: unknown = await response.json().catch(() => null);

        if (!isAIChatResponse(payload)) {
          throw fallbackError(
            "PROVIDER_ERROR",
            "medhaup AI returned an unexpected response. Please try again.",
          );
        }
        if (!payload.ok) {
          throw {
            code: payload.error.code,
            message: payload.error.message,
            retryAfterSeconds: payload.error.retryAfterSeconds,
          } satisfies AIClientError;
        }

        setMessages((current) => [
          ...current,
          { role: "assistant", content: payload.answer },
        ]);
        setLastAttempt(null);
        trackGAEvent("ai_response_success", {
          ai_mode: "page_help",
          content_type: descriptor.contentType,
          language,
          retrieval_used: false,
          latency_bucket: latencyBucket(performance.now() - startedAt),
        });
      } catch (caught) {
        const aborted = controller.signal.aborted;
        const candidate = caught as Partial<AIClientError>;
        const nextError = aborted
          ? fallbackError(
              "PROVIDER_TIMEOUT",
              "medhaup AI took too long to respond. Please try again.",
            )
          : candidate.code && candidate.message
            ? {
                code: candidate.code,
                message: candidate.message,
                retryAfterSeconds: candidate.retryAfterSeconds,
              }
            : fallbackError(
                "PROVIDER_ERROR",
                "medhaup AI could not answer right now. Please try again.",
              );

        setError(nextError);
        setInput(trimmed);
        trackGAEvent("ai_response_error", {
          error_code: nextError.code,
          ai_mode: "page_help",
          content_type: descriptor.contentType,
        });
        if (nextError.code === "RATE_LIMITED") {
          trackGAEvent("ai_limit_reached", { limit_type: "request_window" });
        }
      } finally {
        window.clearTimeout(timeout);
        if (abortRef.current === controller) abortRef.current = null;
        setLoading(false);
      }
    },
    [descriptor, language, loading, messages],
  );

  if (!descriptor) return null;

  return (
    <>
      {!open ? (
        <AITrigger
          ref={triggerRef}
          campaignVisible={campaignVisible}
          onClick={() => {
            setOpen(true);
            trackGAEvent("ai_open", {
              content_type: descriptor.contentType,
              ai_entry_point: "floating_trigger",
            });
          }}
        />
      ) : null}

      {open ? (
        <AIPanel
          descriptor={descriptor}
          messages={messages}
          language={language}
          input={input}
          loading={loading}
          error={error}
          canRetry={Boolean(lastAttempt)}
          maxMessageChars={MAX_MESSAGE_CHARS}
          onClose={closePanel}
          onLanguageChange={(nextLanguage) => {
            const previousLanguage = language;
            setLanguage(nextLanguage);
            trackGAEvent("ai_language_change", {
              from_language: previousLanguage,
              to_language: nextLanguage,
            });
          }}
          onInputChange={setInput}
          onSubmit={(question) => void sendQuestion(question)}
          onSuggestion={(suggestion: AIQuickPrompt) => {
            trackGAEvent("ai_suggestion_click", {
              suggestion_type: suggestion.id,
              content_type: descriptor.contentType,
            });
            void sendQuestion(suggestion.prompt);
          }}
          onRetry={() => {
            if (lastAttempt) {
              void sendQuestion(lastAttempt.message, {
                appendUser: false,
                history: lastAttempt.history,
              });
            }
          }}
        />
      ) : null}
    </>
  );
}
