"use client";

import { FormEvent, useEffect, useId, useRef } from "react";
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "framer-motion";
import { LoaderCircle, Send, X } from "lucide-react";
import type { AIChatMessage, AILanguage } from "@/lib/ai/types";
import AIErrorState, { type AIClientError } from "./AIErrorState";
import AILanguageToggle from "./AILanguageToggle";
import AILoading from "./AILoading";
import AILogo from "./AILogo";
import AIMessage from "./AIMessage";

type AIPanelProps = {
  messages: AIChatMessage[];
  revealingAnswer: AIChatMessage | null;
  onRevealComplete: (message: AIChatMessage) => void;
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
  onRetry: () => void;
};

export default function AIPanel({
  messages,
  revealingAnswer,
  onRevealComplete,
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
  onRetry,
}: AIPanelProps) {
  const titleId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const followAnswerRef = useRef(true);
  const previousMessageRef = useRef(messages.at(-1));
  const reduceMotion = useReducedMotion();
  const isPresent = useIsPresent();

  useEffect(() => {
    if (window.matchMedia("(min-width: 640px)").matches) {
      textareaRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    const latestMessage = messages.at(-1);
    if (latestMessage !== previousMessageRef.current && latestMessage?.role === "user") {
      followAnswerRef.current = true;
    }
    previousMessageRef.current = latestMessage;
    if (!followAnswerRef.current) return;
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "auto",
    });
  }, [messages, loading, error]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const observer = new ResizeObserver(() => {
      const scroller = scrollRef.current;
      if (scroller && followAnswerRef.current) {
        scroller.scrollTop = scroller.scrollHeight;
      }
    });
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (input.trim() && !loading) onSubmit(input);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.18 }}
      inert={!isPresent}
      className="fixed inset-0 z-[80] bg-navy/20 backdrop-blur-[1px] sm:bg-navy/10"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{
          opacity: 0,
          y: reduceMotion ? 0 : 16,
          scale: reduceMotion ? 1 : 0.98,
          transition: { type: "tween", duration: reduceMotion ? 0 : 0.18, ease: "easeIn" },
        }}
        transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.85 }}
        style={{ transformOrigin: "bottom right" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-x-0 bottom-0 flex h-[88dvh] max-h-[760px] flex-col overflow-hidden rounded-t-[24px] bg-white shadow-[0_-16px_50px_rgba(19,8,86,0.18)] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:h-[min(680px,calc(100dvh-2.5rem))] sm:w-[400px] sm:rounded-[24px] sm:border sm:border-navy/10 sm:shadow-[0_24px_60px_rgba(19,8,86,0.2)]"
      >
        <header className="border-b border-navy/8 px-4 py-3.5 sm:py-4">
          <div className="flex items-center gap-3">
            <AILogo size={34} className="size-8 shrink-0 ring-1 ring-navy/10" />
            <div className="min-w-0 flex-1">
              <h2
                id={titleId}
                className="font-heading text-base font-extrabold text-navy"
              >
                medhaup AI
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Student help from medhaup
              </p>
            </div>
            <motion.button
              whileHover={reduceMotion ? undefined : { scale: 1.06 }}
              whileTap={reduceMotion ? undefined : { scale: 0.92 }}
              type="button"
              onClick={onClose}
              aria-label="Close medhaup AI"
              className="grid size-9 shrink-0 place-items-center rounded-full text-slate-500 transition hover:bg-navy/5 hover:text-navy focus-visible:outline-2 focus-visible:outline-orange"
            >
              <X aria-hidden="true" className="size-5" />
            </motion.button>
          </div>
        </header>

        <div
          ref={scrollRef}
          onScroll={(event) => {
            const scroller = event.currentTarget;
            followAnswerRef.current = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight < 64;
          }}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5"
        >
          <div ref={contentRef} className="flex min-h-full flex-col gap-5">
            {messages.length === 0 ? (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.25 }}
                className="flex flex-1 flex-col items-center justify-center px-6 text-center"
              >
                <h3 className="font-heading text-xl font-extrabold text-navy">
                  কী জানতে চাও?
                </h3>
                <p className="mt-2 max-w-64 text-sm leading-6 text-slate-500">
                  Ask about exams, subjects, courses, or current updates.
                </p>
              </motion.div>
            ) : (
              messages.map((message, index) => (
                <AIMessage
                  key={`${message.role}-${index}-${message.content.slice(0, 16)}`}
                  message={message}
                  animateAnswer={message === revealingAnswer}
                  onRevealComplete={onRevealComplete}
                />
              ))
            )}

            <AnimatePresence initial={false}>
              {loading ? (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.15 }}
                >
                  <AILoading />
                </motion.div>
              ) : null}
            </AnimatePresence>

            {error ? (
              <AIErrorState
                error={error}
                onRetry={canRetry ? onRetry : undefined}
                retryDisabled={loading}
              />
            ) : null}
          </div>
        </div>

        <form
          onSubmit={submit}
          className="border-t border-navy/8 bg-white px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2.5"
        >
          <div className="mb-2 flex items-center justify-between gap-3 px-1">
            <span className="text-[11px] font-medium text-slate-400">
              Reply in
            </span>
            <AILanguageToggle
              value={language}
              onChange={onLanguageChange}
              disabled={loading}
            />
          </div>

          <div className="flex items-end gap-2 rounded-2xl border border-navy/10 bg-slate-50 p-1.5 transition focus-within:border-orange/50 focus-within:ring-2 focus-within:ring-orange/10">
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
              aria-label="Ask medhaup AI a question"
              placeholder="medhaup AI-কে যেকোনো প্রশ্ন করো…"
              className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2.5 py-2 text-sm leading-5 text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
            />
            <motion.button
              whileHover={reduceMotion || loading || !input.trim() ? undefined : { scale: 1.05 }}
              whileTap={reduceMotion || loading || !input.trim() ? undefined : { scale: 0.92 }}
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send question"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-orange text-white transition hover:bg-orange-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <LoaderCircle
                  aria-hidden="true"
                  className="size-4 animate-spin"
                />
              ) : (
                <Send aria-hidden="true" className="size-4" />
              )}
            </motion.button>
          </div>
          <p className="mt-2 text-center text-[10px] leading-4 text-slate-400">
            Verify important exam updates with official notices.
          </p>
        </form>
      </motion.section>
    </motion.div>
  );
}
