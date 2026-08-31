import { ArrowUpRight } from "lucide-react";
import type { AIQuickPrompt } from "./page-config";

export default function AISuggestions({
  suggestions,
  onSelect,
  disabled,
}: {
  suggestions: AIQuickPrompt[];
  onSelect: (suggestion: AIQuickPrompt) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2" aria-label="Suggested questions">
      <p className="px-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
        Try asking
      </p>
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(suggestion)}
          className="group flex min-h-11 w-full items-center justify-between gap-3 rounded-2xl border border-navy/10 bg-white px-4 py-2.5 text-left text-sm font-semibold text-navy transition hover:border-orange/40 hover:bg-orange/5 focus-visible:outline-2 focus-visible:outline-orange disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{suggestion.label}</span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 shrink-0 text-orange transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      ))}
    </div>
  );
}
