"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, ChevronDown } from "lucide-react";
import { useCourseMotion } from "@/components/ui/useCourseMotion";
import type { NursingEntranceCourse } from "@/lib/nursing-entrance";

export default function NursingEntranceSyllabus({
  course,
}: {
  course: NursingEntranceCourse;
}) {
  const [activePart, setActivePart] = useState(course.parts[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const { reveal, reduceMotion } = useCourseMotion();

  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % course.parts.length;
    else if (event.key === "ArrowLeft")
      next = (index + course.parts.length - 1) % course.parts.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = course.parts.length - 1;
    else return;
    event.preventDefault();
    setActivePart(course.parts[next].id);
    tabs.current[next]?.focus();
  }

  return (
    <section
      id="syllabus"
      aria-labelledby={`${course.id}-syllabus-heading`}
      className="scroll-mt-28 bg-white px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal()} className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
            Subjects & syllabus
          </p>
          <h2
            id={`${course.id}-syllabus-heading`}
            className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
          >
            Bring your nursing knowledge together.
          </h2>
          <p className="mt-4 leading-7 text-navy/65">
            The {course.referenceYear} paper follows the {course.syllabusLevel}{" "}
            syllabus. Explore the official subject groups below, with suggested
            revision areas to help organise your study.
          </p>
          <p className="mt-3 text-sm leading-7 text-navy/60">
            WBJEEB specifies totals for each part, without fixed question counts
            per subject. The revision topics are study suggestions; use your
            nursing curriculum for full chapter coverage.
          </p>
          <a
            href={`${course.sources.bulletin}#page=${course.sources.syllabusPage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 rounded-sm text-xs font-bold text-orange-dark underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          >
            Read the official syllabus section{" "}
            <ArrowUpRight size={14} aria-hidden="true" />
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
        </motion.div>
        <div
          role="tablist"
          aria-label={`${course.name} syllabus parts`}
          className="mt-8 grid max-w-md grid-cols-2 gap-2 rounded-2xl bg-cream p-2"
        >
          {course.parts.map((part, index) => (
            <button
              key={part.id}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${course.id}-tab-${part.id}`}
              aria-selected={activePart === part.id}
              aria-controls={`${course.id}-panel-${part.id}`}
              tabIndex={activePart === part.id ? 0 : -1}
              onClick={() => setActivePart(part.id)}
              onKeyDown={(event) => handleKey(event, index)}
              className={`relative rounded-xl px-3 py-3.5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${activePart === part.id ? "text-white" : "text-navy/70 hover:text-navy"}`}
            >
              {activePart === part.id && (
                <motion.span
                  layoutId={
                    reduceMotion ? undefined : `${course.id}-active-part`
                  }
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-xl bg-navy"
                />
              )}
              <span className="relative z-10 block">
                {part.name}
                <span className="mt-1 block text-xs font-normal opacity-75">
                  {part.questions} questions
                </span>
              </span>
            </button>
          ))}
        </div>
        {course.parts.map((part) => (
          <motion.div
            key={part.id}
            id={`${course.id}-panel-${part.id}`}
            role="tabpanel"
            aria-labelledby={`${course.id}-tab-${part.id}`}
            hidden={activePart !== part.id}
            tabIndex={0}
            initial={false}
            animate={{ opacity: activePart === part.id ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="mt-8 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          >
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className="font-heading text-2xl font-extrabold text-navy">
                  {part.name}: {part.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-navy/60">
                  {part.subjects.length} subject groups · {part.questions}{" "}
                  questions across this part
                </p>
              </div>
              <span className="rounded-full bg-[#e5f0fb] px-4 py-2 text-xs font-semibold text-[#24558a]">
                {course.syllabusLevel} level
              </span>
            </div>
            <div className="mt-6 grid items-start gap-3 md:grid-cols-2">
              {part.subjects.map((subject, index) => (
                <details
                  key={subject.name}
                  open={index === 0}
                  className="group rounded-2xl border border-navy/10 bg-cream transition-colors open:border-orange/40 open:bg-white"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-3 rounded-2xl p-5 marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange [&::-webkit-details-marker]:hidden">
                    <BookOpen
                      size={19}
                      className="shrink-0 text-orange-dark"
                      aria-hidden="true"
                    />
                    <span className="font-heading min-w-0 flex-1 text-base font-bold leading-6 text-navy">
                      {subject.name}
                    </span>
                    <ChevronDown
                      size={18}
                      className="shrink-0 text-navy/60 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="border-t border-navy/10 p-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#24558a]">
                      Suggested revision areas
                    </h4>
                    <ul className="mt-4 list-disc space-y-3 pl-4 text-sm leading-7 text-navy/70 marker:text-orange-dark">
                      {subject.topics.map((topic) => (
                        <li key={topic}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
