import { TriangleAlert } from "lucide-react";

// Turn this off once database access and PDF downloads are confirmed restored.
const SERVICE_NOTICE_ENABLED = true;

export default function ServiceNotice() {
  if (!SERVICE_NOTICE_ENABLED) return null;

  return (
    <aside
      role="status"
      aria-labelledby="service-notice-heading"
      className="border-b border-amber-200 bg-amber-50 text-amber-950"
    >
      <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-amber-200 bg-amber-100 text-amber-800">
          <TriangleAlert size={17} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p
            id="service-notice-heading"
            className="text-sm font-bold leading-6"
          >
            Service update: Website is up{" "}
            <span lang="bn" className="font-medium">
              · ওয়েবসাইট চালু আছে
            </span>
          </p>
          <p lang="bn" className="mt-0.5 text-sm leading-6 text-amber-950/85">
            আমাদের <span lang="en">database</span>-এ সাময়িক সমস্যার কারণে{" "}
            <span lang="en" className="font-semibold">
              PDF downloads
            </span>{" "}
            ও কিছু <span lang="en">features</span> আপাতত নাও কাজ করতে পারে।{" "}
            <span lang="en" className="font-medium">
              We’re working to fix this ASAP.
            </span>{" "}
            ধৈর্য ধরার জন্য ধন্যবাদ।
          </p>
        </div>
      </div>
    </aside>
  );
}
