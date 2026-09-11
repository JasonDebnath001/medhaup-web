"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  FlaskConical,
} from "lucide-react";
import { useCourseMotion } from "@/components/ui/useCourseMotion";
import {
  DPHARMACY_CURRICULUM,
  DPHARMACY_SOURCES,
  getDPharmacyTotals,
  type DPharmacySubject,
} from "@/lib/dpharmacy-syllabus";

function SubjectDetails({ subject }: { subject: DPharmacySubject }) {
  return (
    <details className="group rounded-2xl border border-navy/10 bg-cream transition-colors open:border-orange/40 open:bg-white">
      <summary className="flex cursor-pointer list-none items-center gap-3 rounded-2xl px-4 py-5 marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:px-5 [&::-webkit-details-marker]:hidden">
        <BookOpen
          size={19}
          className="shrink-0 text-orange-dark"
          aria-hidden="true"
        />
        <span className="min-w-0 flex-1">
          <span className="font-heading block text-base font-bold leading-6 text-navy">
            {subject.name}
          </span>
          <span className="mt-1 block text-xs leading-5 text-navy/65">
            {subject.theoryHours}h theory · {subject.tutorialHours}h tutorials
            {subject.practicalHours > 0
              ? ` · ${subject.practicalHours}h practical`
              : " · No practical paper"}
          </span>
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 text-navy/60 transition-transform group-open:rotate-180 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </summary>
      <div className="border-t border-navy/10 px-4 pb-5 pt-5 sm:px-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-navy/55">
          {subject.code}T
          {subject.practicalHours > 0 ? ` / ${subject.code}P` : ""}
        </p>
        <h4 className="mt-4 text-sm font-bold text-navy">Theory topics</h4>
        <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {subject.topics.map((topic) => (
            <li
              key={topic}
              className="flex gap-2.5 text-sm leading-6 text-navy/75"
            >
              <span
                aria-hidden="true"
                className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-orange-dark"
              />
              {topic}
            </li>
          ))}
        </ul>
        {subject.practicals.length > 0 && (
          <div className="mt-5 rounded-xl bg-[#ede9fb]/60 p-4">
            <h4 className="flex items-center gap-2 text-sm font-bold text-navy">
              <FlaskConical size={16} aria-hidden="true" />
              Practical work & activities
            </h4>
            <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-6 text-navy/75 marker:text-navy/40">
              {subject.practicals.map((practical) => (
                <li key={practical}>{practical}</li>
              ))}
            </ul>
          </div>
        )}
        {subject.note && (
          <p className="mt-4 text-xs leading-6 text-navy/65">{subject.note}</p>
        )}
        <a
          href={`${DPHARMACY_SOURCES.syllabus}#page=${subject.sourcePage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 rounded-sm text-xs font-bold text-orange-dark underline decoration-orange/40 underline-offset-4 hover:decoration-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
        >
          Full {subject.name} syllabus (PCI PDF)
          <ArrowUpRight size={14} aria-hidden="true" />
          <span className="sr-only">, opens in a new tab</span>
        </a>
      </div>
    </details>
  );
}

export default function DPharmacySyllabus() {
  const [activeYear, setActiveYear] = useState("1st");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { reveal, reduceMotion } = useCourseMotion();

  function handleTabKey(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const count = DPHARMACY_CURRICULUM.length;
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % count;
    else if (event.key === "ArrowLeft") nextIndex = (index + count - 1) % count;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = count - 1;
    else return;
    event.preventDefault();
    setActiveYear(DPHARMACY_CURRICULUM[nextIndex].yearId);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section
      id="syllabus"
      aria-labelledby="dpharmacy-syllabus-heading"
      className="scroll-mt-28 bg-white px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal()} className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
            Inside your syllabus
          </p>
          <h2
            id="dpharmacy-syllabus-heading"
            className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
          >
            Every subject. A clearer starting point.
          </h2>
          <p className="mt-4 leading-7 text-navy/65">
            Choose your year and open a subject for theory topics and practical
            activities. These summaries follow the Pharmacy Council of
            India&apos;s ER-2020 curriculum.
          </p>
          <p className="mt-3 text-xs leading-6 text-navy/60">
            Hours are academic curriculum requirements. medhaup class timings
            and study materials will be announced at launch.
          </p>
        </motion.div>

        <div
          role="tablist"
          aria-label="D.Pharmacy syllabus year"
          className="mt-8 grid max-w-md grid-cols-2 gap-2 rounded-2xl bg-cream p-2"
        >
          {DPHARMACY_CURRICULUM.map((year, index) => (
            <button
              key={year.yearId}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`dpharmacy-syllabus-tab-${year.yearId}`}
              type="button"
              role="tab"
              aria-selected={activeYear === year.yearId}
              aria-controls={`dpharmacy-syllabus-panel-${year.yearId}`}
              tabIndex={activeYear === year.yearId ? 0 : -1}
              onClick={() => setActiveYear(year.yearId)}
              onKeyDown={(event) => handleTabKey(event, index)}
              className={`relative rounded-xl px-3 py-3.5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${activeYear === year.yearId ? "text-white" : "text-navy/70 hover:text-navy"}`}
            >
              {activeYear === year.yearId && (
                <motion.span
                  layoutId={
                    reduceMotion ? undefined : "dpharmacy-syllabus-active-year"
                  }
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-xl bg-navy"
                />
              )}
              <span className="relative z-10">
                {year.yearId} year · {year.part}
              </span>
            </button>
          ))}
        </div>

        {DPHARMACY_CURRICULUM.map((year) => {
          const totals = getDPharmacyTotals(year.subjects);
          return (
            <motion.div
              key={year.yearId}
              id={`dpharmacy-syllabus-panel-${year.yearId}`}
              role="tabpanel"
              aria-labelledby={`dpharmacy-syllabus-tab-${year.yearId}`}
              tabIndex={0}
              hidden={activeYear !== year.yearId}
              initial={false}
              animate={{
                opacity: activeYear === year.yearId ? 1 : 0,
                y: reduceMotion || activeYear === year.yearId ? 0 : 8,
              }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              className="mt-8 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            >
              <h3 className="font-heading text-2xl font-extrabold text-navy">
                D.Pharmacy {year.yearId} year syllabus
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-navy/65">
                {year.summary}
              </p>
              <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_280px]">
                <div className="min-w-0 space-y-3">
                  {year.subjects.map((subject) => (
                    <SubjectDetails key={subject.code} subject={subject} />
                  ))}
                </div>
                <aside
                  aria-label={`${year.yearId} year academic hours`}
                  className="rounded-2xl bg-navy p-6 text-white"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-orange">
                    Your year in hours
                  </p>
                  <p className="font-heading mt-4 text-5xl font-extrabold tracking-tight">
                    {totals.theoryHours +
                      totals.practicalHours +
                      totals.tutorialHours}
                  </p>
                  <p className="mt-2 text-sm text-white/65">
                    Total academic hours
                  </p>
                  <dl className="mt-6 space-y-3 border-t border-white/15 pt-5 text-sm">
                    {[
                      ["Theory", totals.theoryHours],
                      ["Practicals", totals.practicalHours],
                      ["Tutorials", totals.tutorialHours],
                    ].map(([label, hours]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-3"
                      >
                        <dt className="text-white/70">{label}</dt>
                        <dd className="font-bold">{hours}h</dd>
                      </div>
                    ))}
                  </dl>
                  <a
                    href={`${DPHARMACY_SOURCES.syllabus}#page=${year.sourcePage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center justify-between gap-3 rounded-xl bg-white/10 p-3 text-sm font-semibold transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
                  >
                    Open {year.part} syllabus PDF{" "}
                    <ArrowUpRight
                      size={17}
                      className="shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">, opens in a new tab</span>
                  </a>
                  <p className="mt-4 text-xs leading-6 text-white/60">
                    Includes detailed chapters, learning objectives, assignments
                    and practical activities.
                  </p>
                </aside>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
