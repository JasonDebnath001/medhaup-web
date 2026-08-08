import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="text-[15px] leading-relaxed text-navy/80 sm:text-base">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="font-heading mt-10 text-2xl font-extrabold tracking-tight text-navy first:mt-0">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h2 className="font-heading mt-10 text-xl font-bold tracking-tight text-navy first:mt-0 sm:text-2xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-heading mt-8 text-lg font-bold text-navy">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="mt-5">{children}</p>,
          ul: ({ children }) => (
            <ul className="mt-5 list-disc space-y-2 pl-5 marker:text-orange">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-5 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-orange">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-bold text-navy">{children}</strong>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith("/") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="font-semibold text-orange underline decoration-orange/40 underline-offset-2 hover:decoration-orange"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mt-5 rounded-r-xl border-l-4 border-orange bg-orange/5 px-5 py-3 italic text-navy/75">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="mt-6 overflow-x-auto rounded-2xl border border-navy/10">
              <table className="w-full border-collapse text-left text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-navy text-white">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 font-heading text-[13px] font-bold tracking-wide">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-t border-navy/10 px-4 py-3 text-navy/75">
              {children}
            </td>
          ),
          tr: ({ children }) => (
            <tr className="even:bg-cream/60">{children}</tr>
          ),
          hr: () => <hr className="my-10 border-navy/10" />,
          code: ({ children }) => (
            <code className="rounded bg-navy/5 px-1.5 py-0.5 font-mono text-[13px] text-navy">
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}