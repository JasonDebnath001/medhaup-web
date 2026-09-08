"use client";

import { useEffect, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import ReactMarkdown, { type Components } from "react-markdown";
import type { AIChatMessage } from "@/lib/ai/types";
import AILogo from "./AILogo";
import styles from "./AIChatEffects.module.css";
import { rehypeRevealWords } from "./reveal-words";

// Stable renderers keep already-visible words mounted as more text appears.
const markdownComponents: Components = {
  a: ({ children }) => <span>{children}</span>,
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>
  ),
  strong: ({ children }) => <strong className="font-bold text-navy">{children}</strong>,
  h1: ({ children }) => <p className="mb-2 font-heading font-bold text-navy">{children}</p>,
  h2: ({ children }) => <p className="mb-2 font-heading font-bold text-navy">{children}</p>,
  h3: ({ children }) => <p className="mb-2 font-heading font-bold text-navy">{children}</p>,
};

export default function AIMessage({
  message,
  animateAnswer = false,
  onRevealComplete,
}: {
  message: AIChatMessage;
  animateAnswer?: boolean;
  onRevealComplete: (message: AIChatMessage) => void;
}) {
  const reduceMotion = useReducedMotion();
  const [visibleWords, setVisibleWords] = useState(0);
  const totalWords = message.content.match(/\S+/gu)?.length ?? 0;
  const isRevealing = animateAnswer && !reduceMotion && visibleWords < totalWords;

  useEffect(() => {
    if (!animateAnswer) return;
    if (reduceMotion) {
      onRevealComplete(message);
      return;
    }
    const playback = animate(0, totalWords, {
      duration: Math.min(6, Math.max(0.3, totalWords / 45)),
      ease: "linear",
      onUpdate: (value) => setVisibleWords(Math.floor(value)),
      onComplete: () => onRevealComplete(message),
    });
    return () => playback.stop();
  }, [animateAnswer, reduceMotion, totalWords, message, onRevealComplete]);

  if (message.role === "user") {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex origin-right justify-end"
      >
        <div className="max-w-[86%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-navy px-3.5 py-2.5 text-sm leading-6 text-white">
          {message.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={animateAnswer && !reduceMotion ? { opacity: 0, y: 6 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex items-start gap-2.5"
    >
      <AILogo
        size={24}
        decorative
        className="mt-0.5 size-6 shrink-0 ring-1 ring-navy/10"
      />
      <div
        aria-live="polite"
        aria-atomic="true"
        aria-busy={isRevealing}
        className={`${styles.reply} max-w-[calc(100%-2.125rem)] pt-0.5 text-sm leading-6 text-slate-700`}
      >
        <ReactMarkdown
          skipHtml
          rehypePlugins={isRevealing ? [[rehypeRevealWords, { visibleWords }]] : []}
          components={markdownComponents}
        >
          {message.content}
        </ReactMarkdown>
        {isRevealing && visibleWords === 0 ? (
          <span className={styles.startCursor} aria-hidden="true" />
        ) : null}
        {!isRevealing && message.grounding?.sources.length ? (
          <motion.div
            initial={visibleWords > 0 && !reduceMotion ? { opacity: 0, y: 4 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 border-t border-navy/10 pt-2"
          >
            <p className="mb-1 text-xs font-semibold text-navy">Sources</p>
            <ul className="space-y-1 text-xs">
              {message.grounding.sources.map((source) => (
                <li key={source.uri}>
                  <a
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-words text-navy underline underline-offset-2"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
}
