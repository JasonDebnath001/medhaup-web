"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Download,
  FileText,
  Hourglass,
  Languages,
  MessageCircle,
} from "lucide-react";
import clsx from "clsx";
import { useSite } from "@/components/provider/SiteProvider";
import { getFileDownloadUrl } from "@/lib/downloads";
import { NORCET_COURSE } from "@/lib/norcet";
import type { NorcetResource, NorcetResourceCategory } from "@/lib/data";

const CATEGORY_ORDER: NorcetResourceCategory[] = [
  "Syllabus",
  "Previous Year Papers",
  "Notes",
  "Mock Tests",
  "Guides",
];

function EmptyState() {
  const SITE = useSite();
  const notifyUrl = `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(
    "Hi, I am preparing for NORCET. Please share the available study materials.",
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="relative overflow-hidden rounded-3xl border border-dashed border-teal/40 bg-cream p-8 text-center sm:p-12"
    >
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal/10 blur-3xl"
      />
      <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-teal/15 text-teal-dark">
        <Hourglass size={26} />
      </span>
      <h3 className="font-heading relative mt-5 text-2xl font-extrabold text-navy sm:text-3xl">
        NORCET study material{" "}
        <span className="text-orange">and study support</span>
      </h3>
      <p className="relative mx-auto mt-3 max-w-lg text-navy/65">
        No free downloads are listed here yet. Explore the syllabus above
        or contact our team for the study materials available with the course.
      </p>
      <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={NORCET_COURSE.enrolmentAnchor}
          className="group flex w-full items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange/25 transition-all hover:bg-orange-dark sm:w-auto"
        >
          Send enrolment enquiry
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </a>
        <a
          href={notifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-navy/15 bg-white px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal-dark sm:w-auto"
        >
          <MessageCircle size={16} />
          Ask about study materials
        </a>
      </div>
    </motion.div>
  );
}

export default function NorcetResources({
  resources,
}: {
  resources: NorcetResource[];
}) {
  const [active, setActive] = useState<NorcetResourceCategory | "All">("All");

  const categories = useMemo(() => {
    const present = new Set(resources.map((r) => r.category));
    return CATEGORY_ORDER.filter((c) => present.has(c));
  }, [resources]);

  const visible =
    active === "All"
      ? resources
      : resources.filter((resource) => resource.category === active);

  return (
    <section
      id="resources"
      className="scroll-mt-24 bg-white py-20 sm:py-24"
      aria-labelledby="norcet-resources-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl"
        >
          <span className="inline-block rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-dark">
            Free NORCET Resources
          </span>
          <h2
            id="norcet-resources-heading"
            className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
          >
            Start before the course does.{" "}
            <span className="text-orange">Free, no login.</span>
          </h2>
          <p className="mt-4 text-navy/65">
            Everything medhaup publishes for NORCET is listed here as soon as it
            is ready.
          </p>
        </motion.div>

        {resources.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {categories.length > 1 && (
              <div
                role="group"
                aria-label="Filter NORCET resources by category"
                className="mb-6 flex flex-wrap gap-2"
              >
                {(["All", ...categories] as const).map((category) => (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={active === category}
                    onClick={() => setActive(category)}
                    className={clsx(
                      "min-h-11 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy",
                      active === category
                        ? "bg-navy text-white"
                        : "bg-cream text-navy/70 hover:bg-navy/8 hover:text-navy",
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            <motion.div
              layout
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {visible.map((resource) => (
                  <motion.article
                    key={resource.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="group flex flex-col rounded-2xl border border-navy/10 bg-cream p-5 transition-colors hover:border-teal/50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-navy/8 bg-white text-navy">
                        <FileText size={20} strokeWidth={1.6} />
                      </span>
                      <div className="flex flex-wrap justify-end gap-1.5">
                        {resource.isNew && (
                          <span className="rounded-full bg-orange px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                            New
                          </span>
                        )}
                        <span className="rounded-full bg-navy/8 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-navy/70">
                          {resource.category}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-heading mt-4 text-base font-bold leading-snug text-navy">
                      {resource.title}
                    </h3>
                    {(resource.subject || resource.stage) && (
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-teal-dark">
                        {[resource.stage, resource.subject]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
                    {resource.description && (
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/65">
                        {resource.description}
                      </p>
                    )}

                    <div className="mt-4 flex items-center gap-3 text-xs text-navy/55">
                      <span className="flex items-center gap-1">
                        <Languages size={13} /> {resource.language}
                      </span>
                      {resource.fileSize && (
                        <span>PDF · {resource.fileSize}</span>
                      )}
                    </div>

                    <a
                      href={getFileDownloadUrl(resource.fileUrl)}
                      download
                      className="group/dl mt-4 flex items-center justify-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-2.5 text-sm font-semibold text-navy transition-all duration-200 hover:border-navy hover:bg-navy hover:text-white"
                    >
                      <Download
                        size={15}
                        className="transition-transform duration-200 group-hover/dl:translate-y-0.5"
                      />
                      Download
                    </a>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
