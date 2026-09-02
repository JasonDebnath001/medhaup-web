import type { AILanguage } from "@/lib/ai/types";

const OPTIONS: { value: AILanguage; label: string }[] = [
  { value: "auto", label: "Auto" },
  { value: "bn", label: "বাংলা" },
  { value: "en", label: "English" },
];

export default function AILanguageToggle({
  value,
  onChange,
  disabled,
}: {
  value: AILanguage;
  onChange: (language: AILanguage) => void;
  disabled?: boolean;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Answer language"
      className="inline-flex rounded-full border border-navy/8 bg-slate-50 p-0.5"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          disabled={disabled}
          onClick={() => onChange(option.value)}
          className={`min-h-7 rounded-full px-2.5 text-[10px] font-semibold transition focus-visible:outline-2 focus-visible:outline-orange disabled:cursor-not-allowed disabled:opacity-60 ${
            value === option.value
              ? "bg-navy text-white shadow-sm"
              : "text-slate-500 hover:text-navy"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
