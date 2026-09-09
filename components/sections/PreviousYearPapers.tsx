"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  KeyRound,
  Languages,
} from "lucide-react";
import clsx from "clsx";
import type { PYQ } from "@/lib/data";
import { getFileDownloadUrl } from "@/lib/downloads";

export default function PreviousYearPapers({ papers }: { papers: PYQ[] }) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const years = [...new Set(papers.map((paper) => paper.year))].sort(
    (a, b) => b - a,
  );
  const activeYear =
    selectedYear !== null && years.includes(selectedYear) ? selectedYear : null;
  const visiblePapers = papers
    .filter((paper) => activeYear === null || paper.year === activeYear)
    .sort((a, b) => b.year - a.year);

  return (
    <section
      id="previous-year-papers"
      aria-labelledby="previous-year-papers-heading"
      className="scroll-mt-24 border-y border-navy/8 bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-navy">
              <span
                className="h-1.5 w-6 rounded-full bg-orange"
                aria-hidden="true"
              />
              Your practice starts here
            </span>
            <h2
              id="previous-year-papers-heading"
              className="font-heading mt-4 text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl"
            >
              Download ANM GNM
              <br />
              <span className="text-orange">
                Previous Years’ Question Papers
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-navy/65 sm:text-base">
              Get familiar with the questions. Find the topics to revisit. Build
              your confidence, one previous year paper at a time.
            </p>
          </div>

          <Link
            href="/pyq"
            className="group inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-navy/15 px-5 py-3 text-sm font-semibold text-navy transition-colors hover:border-navy/30 hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy lg:self-auto"
          >
            Explore PYQ library
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-navy/10 pb-5 sm:mt-11">
          <div
            role="group"
            aria-label="Filter question papers by year"
            className="flex flex-wrap gap-2"
          >
            {[null, ...years].map((year) => (
              <button
                key={year ?? "all"}
                type="button"
                aria-pressed={activeYear === year}
                aria-controls="previous-year-paper-list"
                onClick={() => setSelectedYear(year)}
                className={clsx(
                  "min-h-11 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy",
                  activeYear === year
                    ? "bg-navy text-white"
                    : "bg-cream text-navy/70 hover:bg-navy/8 hover:text-navy",
                )}
              >
                {year ?? "All years"}
              </button>
            ))}
          </div>
          <p
            role="status"
            className="text-xs font-medium text-navy/60 sm:text-sm"
          >
            {visiblePapers.length} question{" "}
            {visiblePapers.length === 1 ? "paper" : "papers"}
          </p>
        </div>

        <div
          id="previous-year-paper-list"
          className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3"
        >
          {visiblePapers.map((paper) => (
            <article
              key={paper.id}
              aria-labelledby={`${paper.id}-home-heading`}
              className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-navy/10 bg-cream p-3 transition-colors hover:border-orange/50 sm:p-7"
            >
              <div className="flex items-start justify-between gap-2 sm:gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-navy/8 bg-white text-navy sm:h-12 sm:w-12">
                  <FileText size={23} className="size-5 sm:size-[23px]" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span
                  className="font-heading text-2xl font-extrabold tracking-tight text-navy/15 sm:text-4xl"
                  aria-hidden="true"
                >
                  {paper.year}
                </span>
              </div>
              <h3
                id={`${paper.id}-home-heading`}
                className="font-heading mt-2 break-words text-sm font-extrabold text-navy sm:text-xl"
              >
                {paper.title}
              </h3>
              <p className="mt-3 flex items-start gap-1.5 text-[11px] text-navy/65 sm:items-center sm:gap-2 sm:text-sm">
                <Languages size={16} className="shrink-0" aria-hidden="true" />
                {paper.language}
              </p>
              {paper.fileSize && (
                <p className="mt-2 text-xs text-navy/60">
                  PDF · {paper.fileSize}
                </p>
              )}

              <div className="mt-auto pt-4 sm:pt-7">
                <div className="border-t border-navy/10 pt-3 sm:pt-5">
                  {paper.paperUrl ? (
                    <a
                      href={getFileDownloadUrl(paper.paperUrl)}
                      download
                      aria-label={`Download ${paper.title} PDF`}
                      className="flex min-h-12 items-center justify-center gap-1.5 rounded-xl bg-navy px-1.5 py-3 text-[11px] font-semibold text-white transition-colors hover:bg-navy-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy sm:gap-2 sm:px-4 sm:text-sm"
                    >
                      <Download size={17} className="size-3.5 shrink-0 sm:size-[17px]" aria-hidden="true" />
                      Download PDF
                    </a>
                  ) : (
                    <>
                      <button
                        type="button"
                        disabled
                        aria-label={`ANM GNM ${paper.year} question paper PDF coming soon`}
                        aria-describedby={`${paper.id}-home-status`}
                        className="flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-1.5 rounded-xl border border-navy/10 bg-navy/5 px-1.5 py-3 text-[11px] font-semibold text-navy/50 sm:gap-2 sm:px-4 sm:text-sm"
                      >
                        <Download size={17} className="size-3.5 shrink-0 sm:size-[17px]" aria-hidden="true" />
                        Download PDF
                      </button>
                      <p
                        id={`${paper.id}-home-status`}
                        className="mt-2.5 text-center text-xs text-navy/60"
                      >
                        PDF coming soon
                      </p>
                    </>
                  )}
                  {paper.answerKeyUrl && (
                    <a
                      href={getFileDownloadUrl(paper.answerKeyUrl)}
                      download
                      aria-label={`Download ${paper.title} answer key PDF`}
                      className="mt-2 flex min-h-11 items-center justify-center gap-1.5 rounded-xl text-xs font-semibold text-navy transition-colors hover:bg-navy/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy sm:gap-2 sm:text-sm"
                    >
                      <KeyRound size={16} className="shrink-0" aria-hidden="true" />
                      Answer key
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}

          {visiblePapers.length === 0 && (
            <p className="col-span-full rounded-2xl border border-dashed border-navy/15 bg-cream px-6 py-10 text-center text-sm text-navy/65">
              Question papers are on their way. Check back soon to start
              practising.
            </p>
          )}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-xl bg-navy/4 px-5 py-4 sm:items-center">
          <BookOpen
            size={19}
            className="mt-0.5 shrink-0 text-navy sm:mt-0"
            aria-hidden="true"
          />
          <p className="text-sm leading-6 text-navy/65">
            <span className="font-semibold text-navy">
              Make every paper count.
            </span>{" "}
            Attempt it on your own first, then revisit the topics you found
            difficult.
          </p>
        </div>
      </div>
    </section>
  );
}
