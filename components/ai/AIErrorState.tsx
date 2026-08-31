import { AlertCircle, RotateCcw } from "lucide-react";
import type { AIErrorCode } from "@/lib/ai/types";

export type AIClientError = {
  code: AIErrorCode;
  message: string;
  retryAfterSeconds?: number;
};

export default function AIErrorState({
  error,
  onRetry,
  retryDisabled,
}: {
  error: AIClientError;
  onRetry?: () => void;
  retryDisabled?: boolean;
}) {
  const canRetry = error.code !== "NOT_CONFIGURED" && Boolean(onRetry);

  return (
    <div
      role="alert"
      className="rounded-2xl border border-orange/20 bg-orange/8 p-3.5 text-sm text-slate-700"
    >
      <div className="flex items-start gap-2.5">
        <AlertCircle
          aria-hidden="true"
          className="mt-0.5 size-4 shrink-0 text-orange"
        />
        <div className="min-w-0 flex-1">
          <p>{error.message}</p>
          {error.retryAfterSeconds ? (
            <p className="mt-1 text-xs text-slate-500">
              Try again in about {Math.ceil(error.retryAfterSeconds / 60)}{" "}
              minute(s).
            </p>
          ) : null}
        </div>
      </div>
      {canRetry ? (
        <button
          type="button"
          disabled={retryDisabled}
          onClick={onRetry}
          className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-xl bg-white px-3 font-bold text-navy ring-1 ring-navy/10 transition hover:bg-cream focus-visible:outline-2 focus-visible:outline-orange disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RotateCcw aria-hidden="true" className="size-3.5" />
          Retry
        </button>
      ) : null}
    </div>
  );
}
