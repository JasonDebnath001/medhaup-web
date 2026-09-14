"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, ChevronDown, Stethoscope } from "lucide-react";
import { useCourseMotion } from "@/components/ui/useCourseMotion";
import {
  ANM_CURRICULUM,
  ANM_SOURCES,
  type AnmSubject,
} from "@/lib/anm-syllabus";

function SubjectDetails({
  subject,
  open,
}: {
  subject: AnmSubject;
  open: boolean;
}) {
  return (
    <details
      open={open}
      className="group rounded-2xl border border-navy/10 bg-cream transition-colors open:border-orange/40 open:bg-white"
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 rounded-2xl p-4 marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:p-5 [&::-webkit-details-marker]:hidden">
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
            {subject.theoryHours}h theory · {subject.demonstrationHours}h
            demonstrations
          </span>
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 text-navy/60 transition-transform group-open:rotate-180 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </summary>
      <div className="border-t border-navy/10 p-4 sm:p-5">
        <h4 className="text-sm font-bold text-navy">Syllabus topics</h4>
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
        <div className="mt-5 rounded-xl bg-[#e5f3ee]/70 p-4">
          <h4 className="flex items-center gap-2 text-sm font-bold text-navy">
            <Stethoscope size={16} aria-hidden="true" />
            Clinical experience
          </h4>
          <p className="mt-2 text-xs font-semibold text-[#24634d]">
            {subject.hospitalHours}h hospital · {subject.communityHours}h
            community
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-6 text-navy/75 marker:text-[#24634d]">
            {subject.clinicalActivities.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        </div>
        <a
          href={`${ANM_SOURCES.syllabus}#page=${subject.sourcePage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 rounded-sm text-xs font-bold text-orange-dark underline decoration-orange/40 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
        >
          Full {subject.name} syllabus (PDF)
          <ArrowUpRight size={14} aria-hidden="true" />
          <span className="sr-only">, opens in a new tab</span>
        </a>
      </div>
    </details>
  );
}

export default function AnmSyllabus() {
  const [activeYear, setActiveYear] = useState("1st");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { reveal, reduceMotion } = useCourseMotion();

  function handleTabKey(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const count = ANM_CURRICULUM.length;
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % count;
    else if (event.key === "ArrowLeft") nextIndex = (index + count - 1) % count;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = count - 1;
    else return;
    event.preventDefault();
    setActiveYear(ANM_CURRICULUM[nextIndex].yearId);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section
      id="syllabus"
      aria-labelledby="anm-syllabus-heading"
      className="scroll-mt-28 bg-white px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal()} className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
            Your subjects, in detail
          </p>
          <h2
            id="anm-syllabus-heading"
            className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
          >
            Learn what each year holds.
          </h2>
          <p className="mt-4 leading-7 text-navy/65">
            Choose your year to explore the syllabus topics, demonstrations and
            clinical experience in the INC two-year ANM curriculum.
          </p>
          <p className="mt-3 text-xs leading-6 text-navy/60">
            These are academic syllabus hours. Contact our team for medhaup
            class timings and study materials.
          </p>
        </motion.div>
        <div
          role="tablist"
          aria-label="ANM syllabus year"
          className="mt-8 grid max-w-md grid-cols-2 gap-2 rounded-2xl bg-cream p-2"
        >
          {ANM_CURRICULUM.map((year, index) => (
            <button
              key={year.yearId}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`anm-syllabus-tab-${year.yearId}`}
              type="button"
              role="tab"
              aria-selected={activeYear === year.yearId}
              aria-controls={`anm-syllabus-panel-${year.yearId}`}
              tabIndex={activeYear === year.yearId ? 0 : -1}
              onClick={() => setActiveYear(year.yearId)}
              onKeyDown={(event) => handleTabKey(event, index)}
              className={`relative rounded-xl px-3 py-3.5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${activeYear === year.yearId ? "text-white" : "text-navy/70 hover:text-navy"}`}
            >
              {activeYear === year.yearId && (
                <motion.span
                  layoutId={
                    reduceMotion ? undefined : "anm-syllabus-active-year"
                  }
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-xl bg-navy"
                />
              )}
              <span className="relative z-10">{year.yearId} year</span>
            </button>
          ))}
        </div>
        {ANM_CURRICULUM.map((year) => (
          <motion.div
            key={year.yearId}
            id={`anm-syllabus-panel-${year.yearId}`}
            role="tabpanel"
            aria-labelledby={`anm-syllabus-tab-${year.yearId}`}
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
              ANM {year.yearId} year syllabus
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-navy/65">
              {year.summary}
            </p>
            <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_280px]">
              <div className="min-w-0 space-y-3">
                {year.subjects.map((subject, index) => (
                  <SubjectDetails
                    key={subject.id}
                    subject={subject}
                    open={index === 0}
                  />
                ))}
              </div>
              <aside
                aria-label={`${year.yearId} year overview`}
                className="rounded-2xl bg-navy p-6 text-white"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-orange">
                  Your year at a glance
                </p>
                <p className="font-heading mt-4 text-5xl font-extrabold">
                  {year.subjects.length}
                </p>
                <p className="mt-2 text-sm text-white/65">
                  Core theory subjects
                </p>
                <p className="mt-5 border-t border-white/15 pt-5 text-sm leading-7 text-white/75">
                  {year.yearId === "1st"
                    ? "Two practical exam papers bring together community health, health promotion and child health."
                    : "Two practical exam papers cover midwifery, primary health care and health centre management."}
                </p>
                {year.yearId === "2nd" && (
                  <a
                    href="#practical-training"
                    className="mt-4 inline-block rounded-sm text-sm font-semibold text-orange underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    Explore the six-month internship
                  </a>
                )}
                <a
                  href={`${ANM_SOURCES.syllabus}#page=${year.sourcePage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-between gap-3 rounded-xl bg-white/10 p-3 text-sm font-semibold transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
                >
                  Open {year.yearId}-year syllabus PDF
                  <ArrowUpRight
                    size={17}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                  <span className="sr-only">, opens in a new tab</span>
                </a>
                <p className="mt-4 text-xs leading-6 text-white/60">
                  Full syllabus hosted by the Arunachal Pradesh Nursing Council.
                </p>
              </aside>
            </div>
            <p className="mt-5 text-xs leading-6 text-navy/60">
              {year.yearId === "1st"
                ? "Hour figures follow the individual course rows in INC’s amendment. Its printed first-year totals contain inconsistencies; confirm the timetable with your institution."
                : "The hours above cover the first six months of 2nd year: 880 hours of study and clinical experience. The following internship adds 880 hours."}{" "}
              <a
                href={`${ANM_SOURCES.amendments}#page=${year.yearId === "1st" ? 2 : 3}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm font-semibold text-navy underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
              >
                View INC’s course-hours table
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
              .
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
