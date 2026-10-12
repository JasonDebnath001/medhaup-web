import { TriangleAlert } from "lucide-react";

// Turn this off once normal service is confirmed restored.
const SERVICE_NOTICE_ENABLED = true;

export default function ServiceNotice() {
  if (!SERVICE_NOTICE_ENABLED) return null;

  return (
    <aside
      role="status"
      aria-labelledby="service-notice-heading"
      className="border-b border-amber-200 bg-linear-to-r from-amber-50 via-orange-50 to-amber-50 text-amber-950"
    >
      <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-4 sm:gap-4 sm:px-6">
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-amber-200 bg-white/80 text-amber-700">
          <TriangleAlert size={18} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <p
              id="service-notice-heading"
              className="text-sm font-bold leading-6"
            >
              Temporary service disruption
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-600" aria-hidden="true" />
              We’re working on it
            </span>
          </div>
          <p className="mt-1 text-sm leading-6 text-amber-950/85">
            Our servers are experiencing a temporary technical glitch. Some
            features may be slow or unavailable while our team works to restore
            normal service. We’re sorry for the inconvenience and appreciate your
            patience.
          </p>
          <p lang="bn" className="mt-1 text-sm leading-6 text-amber-900">
            আমাদের সার্ভারে সাময়িক প্রযুক্তিগত সমস্যার কারণে কিছু পরিষেবা ব্যাহত হতে
            পারে। আমাদের টিম সমস্যাটি সমাধানে কাজ করছে। অসুবিধার জন্য আমরা দুঃখিত।
            ধৈর্য ধরে পাশে থাকার জন্য ধন্যবাদ।
          </p>
        </div>
      </div>
    </aside>
  );
}
