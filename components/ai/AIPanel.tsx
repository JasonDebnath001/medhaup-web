"use client";

import { FormEvent, useEffect, useId, useRef } from "react";
import { BookOpenText, LoaderCircle, Send, X } from "lucide-react";
import type { AIChatMessage, AILanguage } from "@/lib/ai/types";
import AIErrorState, { type AIClientError } from "./AIErrorState";
import AILanguageToggle from "./AILanguageToggle";
import AILogo from "./AILogo";
import AIMessage from "./AIMessage";
import AISuggestions from "./AISuggestions";
import type { AIPageDescriptor, AIQuickPrompt } from "./page-config";

type AIPanelProps = {
  descriptor: AIPageDescriptor;
  messages: AIChatMessage[];
  language: AILanguage;
  input: string;
  loading: boolean;
  error: AIClientError | null;
  canRetry: boolean;
  maxMessageChars: number;
  onClose: () => void;
  onLanguageChange: (language: AILanguage) => void;
  onInputChange: (value: string) => void;
  onSubmit: (message: string) => void;
  onSuggestion: (suggestion: AIQuickPrompt) => void;
  onRetry: () => void;
};

export default function AIPanel({
  descriptor,
  messages,
  language,
  input,
  loading,
  error,
  canRetry,
  maxMessageChars,
  onClose,
  onLanguageChange,
  onInputChange,
  onSubmit,
  onSuggestion,
  onRetry,
}: AIPanelProps) {
  const titleId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, error]);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (input.trim() && !loading) onSubmit(input);
  }

  return (
    <div
      className="fixed inset-0 z-[80] bg-navy/25 backdrop-blur-[2px] sm:bg-navy/10"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-x-0 bottom-0 flex h-[92dvh] max-h-[820px] flex-col overflow-hidden rounded-t-[28px] border border-white/70 bg-cream shadow-[0_-20px_60px_rgba(19,8,86,0.2)] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:h-[min(720px,calc(100dvh-2.5rem))] sm:w-[410px] sm:rounded-[28px] sm:border-navy/10 sm:shadow-[0_24px_70px_rgba(19,8,86,0.25)]"
      >
        <div
          className="flex justify-center pb-1 pt-2 sm:hidden"
          aria-hidden="true"
        >
          <span className="h-1 w-11 rounded-full bg-navy/15" />
        </div>

        <header className="border-b border-navy/8 bg-white px-4 pb-3 pt-2 sm:pt-4">
          <div className="flex items-start gap-3">
            <AILogo
              size={42}
              className="size-10 shrink-0 shadow-sm ring-1 ring-navy/10"
            />
            <div className="min-w-0 flex-1">
              <h2
                id={titleId}
                className="font-heading text-base font-extrabold text-navy"
              >
                Ask medhaup AI
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                ANM/GNM-level help from this page
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close medhaup AI"
              className="grid size-10 shrink-0 place-items-center rounded-full text-slate-500 transition hover:bg-navy/5 hover:text-navy focus-visible:outline-2 focus-visible:outline-orange"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-xl bg-cream px-3 py-2 text-xs text-slate-600 ring-1 ring-navy/8">
            <BookOpenText
              aria-hidden="true"
              className="size-4 shrink-0 text-orange"
            />
            <span className="min-w-0 truncate">
              <span className="font-semibold text-navy">
                {descriptor.eyebrow}:
              </span>{" "}
              {descriptor.title}
            </span>
          </div>

          <div className="mt-3">
            <AILanguageToggle
              value={language}
              onChange={onLanguageChange}
              disabled={loading}
            />
          </div>
        </header>

        <div
          ref={scrollRef}
          className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4"
        >
          {messages.length === 0 ? (
            <>
              <div className="rounded-2xl border border-navy/8 bg-white p-4 shadow-sm">
                <p className="font-heading text-sm font-bold text-navy">
                  এই page নিয়ে doubt আছে?
                </p>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">
                  Ask a focused question. I’ll use the published page context
                  and keep the answer short and exam-ready.
                </p>
              </div>
              <AISuggestions
                suggestions={descriptor.suggestions}
                onSelect={onSuggestion}
                disabled={loading}
              />
            </>
          ) : (
            messages.map((message, index) => (
              <AIMessage
                key={`${message.role}-${index}-${message.content.slice(0, 16)}`}
                message={message}
              />
            ))
          )}

          {loading ? (
            <div
              role="status"
              aria-live="polite"
              className="flex items-center gap-2.5 text-sm text-slate-500"
            >
              <span className="grid size-7 place-items-center rounded-full bg-orange text-white">
                <LoaderCircle
                  aria-hidden="true"
                  className="size-3.5 animate-spin"
                />
              </span>
              Building an exam-focused answer…
            </div>
          ) : null}

          {error ? (
            <AIErrorState
              error={error}
              onRetry={canRetry ? onRetry : undefined}
              retryDisabled={loading}
            />
          ) : null}
        </div>

        <form
          onSubmit={submit}
          className="border-t border-navy/8 bg-white px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3"
        >
          <div className="flex items-end gap-2 rounded-2xl border border-navy/12 bg-cream p-2 transition focus-within:border-orange/50 focus-within:ring-2 focus-within:ring-orange/10">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              maxLength={maxMessageChars}
              disabled={loading}
              onChange={(event) => onInputChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  if (input.trim() && !loading) onSubmit(input);
                }
              }}
              aria-label="Ask a question about this page"
              placeholder="এই topic নিয়ে প্রশ্ন করো…"
              className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm leading-5 text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send question"
              className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange text-white shadow-sm transition hover:bg-orange-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy disabled:cursor-not-allowed disabled:opacity-45"
            >
              {loading ? (
                <LoaderCircle
                  aria-hidden="true"
                  className="size-4 animate-spin"
                />
              ) : (
                <Send aria-hidden="true" className="size-4" />
              )}
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] leading-4 text-slate-400">
            AI can make mistakes. Verify important exam facts from official
            sources.
          </p>
        </form>
      </section>
    </div>
  );
}
