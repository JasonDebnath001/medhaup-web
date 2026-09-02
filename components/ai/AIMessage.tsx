import ReactMarkdown from "react-markdown";
import type { AIChatMessage } from "@/lib/ai/types";
import AILogo from "./AILogo";
import styles from "./AIChatEffects.module.css";

export default function AIMessage({ message }: { message: AIChatMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[86%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-navy px-3.5 py-2.5 text-sm leading-6 text-white">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5">
      <AILogo
        size={24}
        decorative
        className="mt-0.5 size-6 shrink-0 ring-1 ring-navy/10"
      />
      <div
        className={`${styles.reply} max-w-[calc(100%-2.125rem)] pt-0.5 text-sm leading-6 text-slate-700`}
      >
        <ReactMarkdown
          skipHtml
          components={{
            a: ({ children }) => <span>{children}</span>,
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            ul: ({ children }) => (
              <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0">
                {children}
              </ol>
            ),
            strong: ({ children }) => (
              <strong className="font-bold text-navy">{children}</strong>
            ),
            h1: ({ children }) => (
              <p className="mb-2 font-heading font-bold text-navy">
                {children}
              </p>
            ),
            h2: ({ children }) => (
              <p className="mb-2 font-heading font-bold text-navy">
                {children}
              </p>
            ),
            h3: ({ children }) => (
              <p className="mb-2 font-heading font-bold text-navy">
                {children}
              </p>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
