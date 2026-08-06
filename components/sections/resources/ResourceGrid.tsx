"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, Languages, HardDrive } from "lucide-react";
import clsx from "clsx";
import type { Resource } from "@/lib/data";

const CATEGORY_LABELS: Record<string, string> = {
  Syllabus: "Syllabus",
  Papers: "Question Papers",
  Notes: "Notes",
  Mocks: "Mock Tests",
  Guides: "Guides",
};

const CATEGORY_COLORS: Record<string, string> = {
  Syllabus: "bg-navy text-white",
  Papers: "bg-orange/15 text-orange-dark",
  Notes: "bg-navy/8 text-navy",
  Mocks: "bg-orange text-white",
  Guides: "bg-navy/8 text-navy",
};

export default function ResourceGrid({ resources }: { resources: Resource[] }) {
  const [active, setActive] = useState<string>("All");

  // Only offer filters for categories that actually have published files
  const categories = useMemo(() => {
    const present = new Set(resources.map((r) => r.category));
    return [
      { label: "All", value: "All" },
      ...Object.keys(CATEGORY_LABELS)
        .filter((c) => present.has(c))
        .map((c) => ({ label: CATEGORY_LABELS[c], value: c })),
    ];
  }, [resources]);

  const filtered =
    active === "All"
      ? resources
      : resources.filter((r) => r.category === active);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Filter pills */}
        <div
          role="tablist"
          aria-label="Filter resources by category"
          className="flex flex-wrap justify-center gap-2"
        >
          {categories.map((cat) => {
            const selected = active === cat.value;
            return (
              <button
                key={cat.value}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(cat.value)}
                className={clsx(
                  "relative rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200",
                  selected
                    ? "text-white"
                    : "text-navy/60 hover:bg-navy/5 hover:text-navy"
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="resource-filter-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-navy"
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <motion.div
          layout
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((r) => (
              <motion.article
                layout
                key={r.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col rounded-3xl border border-navy/10 bg-cream p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-orange/40 hover:shadow-xl hover:shadow-navy/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-navy shadow-sm transition-colors duration-300 group-hover:bg-orange group-hover:text-white">
                    <FileText size={22} />
                  </span>
                  <div className="flex items-center gap-2">
                    {r.isNew && (
                      <span className="rounded-full bg-orange px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        New
                      </span>
                    )}
                    <span
                      className={clsx(
                        "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                        CATEGORY_COLORS[r.category] ?? "bg-navy/8 text-navy"
                      )}
                    >
                      {r.category}
                    </span>
                  </div>
                </div>

                <h3 className="font-heading mt-4 text-lg font-bold leading-snug text-navy">
                  {r.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/65">
                  {r.description}
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs text-navy/50">
                  <span className="flex items-center gap-1.5">
                    <Languages size={13} /> {r.language}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <HardDrive size={13} /> PDF{r.fileSize && <> · {r.fileSize}</>}
                  </span>
                </div>

                
                <a  href={r.fileUrl}
                  download
                  className="group/btn mt-5 flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange"
                >
                  <Download
                    size={16}
                    className="transition-transform duration-200 group-hover/btn:translate-y-0.5"
                  />
                  Download Free
                </a>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state (a filter with no items) */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 rounded-3xl border border-dashed border-navy/20 bg-cream p-10 text-center"
          >
            <p className="font-heading text-lg font-bold text-navy">
              Coming soon
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-navy/60">
              We&apos;re preparing files for this category. Join our WhatsApp
              channel below — new resources drop there first.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}