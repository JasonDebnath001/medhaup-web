"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, ChevronDown, HeartPulse } from "lucide-react";
import { useCourseMotion } from "@/components/ui/useCourseMotion";
import { JENPAS_PAPERS, JENPAS_SOURCES } from "@/lib/jenpas";

export default function JenpasSyllabus() {
  const [activePaper, setActivePaper] = useState("paper-1");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { reveal, reduceMotion } = useCourseMotion();

  function handleTabKey(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const count = JENPAS_PAPERS.length;
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % count;
    else if (event.key === "ArrowLeft") nextIndex = (index + count - 1) % count;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = count - 1;
    else return;
    event.preventDefault();
    setActivePaper(JENPAS_PAPERS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section
      id="syllabus"
      aria-labelledby="jenpas-syllabus-heading"
      className="scroll-mt-28 bg-white px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal()} className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
            Your preparation, subject by subject
          </p>
          <h2
            id="jenpas-syllabus-heading"
            className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
          >
            A clearer place to start.
          </h2>
          <p className="mt-4 leading-7 text-navy/65">
            Explore each paper&apos;s subjects and syllabus level. WBJEEB
            specifies the school curriculum levels; the revision suggestions
            below help organise your study. Use your recognised board&apos;s
            syllabus for full chapter coverage.
          </p>
        </motion.div>
        <motion.div
          {...reveal()}
          className="mt-6 flex items-start gap-3 rounded-2xl border border-[#24558a]/15 bg-[#e5f0fb] p-5"
        >
          <HeartPulse
            size={22}
            className="mt-1 shrink-0 text-[#24558a]"
            aria-hidden="true"
          />
          <div>
            <h3 className="font-heading font-bold text-navy">
              Health Aptitude is part of Paper I in 2026.
            </h3>
            <p className="mt-2 text-sm leading-6 text-navy/70">
              It carries 20 questions for 20 marks. WBJEEB has published a
              separate topic outline, included in the subject list below.
            </p>
            <a
              href={JENPAS_SOURCES.healthAptitude}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 rounded-sm text-xs font-bold text-[#24558a] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            >
              Open the official Health Aptitude PDF
              <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only">, opens in a new tab</span>
            </a>
          </div>
        </motion.div>
        <div
          role="tablist"
          aria-label="JENPAS syllabus paper"
          className="mt-8 grid max-w-md grid-cols-2 gap-2 rounded-2xl bg-cream p-2"
        >
          {JENPAS_PAPERS.map((paper, index) => (
            <button
              key={paper.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`jenpas-tab-${paper.id}`}
              type="button"
              role="tab"
              aria-selected={activePaper === paper.id}
              aria-controls={`jenpas-panel-${paper.id}`}
              tabIndex={activePaper === paper.id ? 0 : -1}
              onClick={() => setActivePaper(paper.id)}
              onKeyDown={(event) => handleTabKey(event, index)}
              className={`relative rounded-xl px-3 py-3.5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${activePaper === paper.id ? "text-white" : "text-navy/70 hover:text-navy"}`}
            >
              {activePaper === paper.id && (
                <motion.span
                  layoutId={reduceMotion ? undefined : "jenpas-active-paper"}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-xl bg-navy"
                />
              )}
              <span className="relative z-10">{paper.label}</span>
            </button>
          ))}
        </div>
        {JENPAS_PAPERS.map((paper) => (
          <motion.div
            key={paper.id}
            id={`jenpas-panel-${paper.id}`}
            role="tabpanel"
            aria-labelledby={`jenpas-tab-${paper.id}`}
            tabIndex={0}
            hidden={activePaper !== paper.id}
            initial={false}
            animate={{
              opacity: activePaper === paper.id ? 1 : 0,
              y: reduceMotion || activePaper === paper.id ? 0 : 8,
            }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="mt-8 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          >
            <h3 className="font-heading text-2xl font-extrabold text-navy">
              {paper.label} syllabus
            </h3>
            <p className="mt-2 text-sm leading-7 text-navy/65">
              {paper.title} · {paper.rank}
            </p>
            <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_280px]">
              <div className="min-w-0 space-y-3">
                {paper.subjects.map((subject, index) => (
                  <details
                    key={subject.name}
                    open={index === 0}
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
                        <span className="mt-1 block text-xs leading-5 text-navy/60">
                          {subject.category1 + subject.category2} questions ·{" "}
                          {subject.category1 + 2 * subject.category2} marks
                        </span>
                      </span>
                      <ChevronDown
                        size={18}
                        className="shrink-0 text-navy/60 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </summary>
                    <div className="border-t border-navy/10 p-4 sm:p-5">
                      <p className="text-xs font-semibold leading-6 text-[#24558a]">
                        {subject.level}
                      </p>
                      <h4 className="mt-4 text-sm font-bold text-navy">
                        {subject.officialOutline
                          ? "WBJEEB topic outline"
                          : "Suggested revision areas"}
                      </h4>
                      <ul className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
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
                      <a
                        href={
                          subject.officialOutline
                            ? JENPAS_SOURCES.healthAptitude
                            : `${JENPAS_SOURCES.bulletin}#page=8`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-1.5 rounded-sm text-xs font-bold text-orange-dark underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
                      >
                        {subject.officialOutline
                          ? "Read the official topic outline"
                          : "View WBJEEB’s syllabus-level guidance"}
                        <ArrowUpRight size={14} aria-hidden="true" />
                        <span className="sr-only">
                          {" "}
                          (PDF, opens in a new tab)
                        </span>
                      </a>
                    </div>
                  </details>
                ))}
              </div>
              <aside
                aria-label={`${paper.label} preparation overview`}
                className="rounded-2xl bg-navy p-6 text-white"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-orange">
                  Build your study plan
                </p>
                <h4 className="font-heading mt-4 text-xl font-extrabold">
                  {paper.id === "paper-1"
                    ? "Science, English & health."
                    : "Science, maths & aptitude."}
                </h4>
                <p className="mt-4 text-sm leading-7 text-white/75">
                  {paper.id === "paper-1"
                    ? "Work through your Class 11–12 science syllabus and English practice, alongside WBJEEB’s Health Aptitude topics."
                    : "Revisit Class 10 physical science and mathematics. Prepare general knowledge, English and reasoning at the Class 12 level."}
                </p>
                <p className="mt-4 border-t border-white/15 pt-4 text-xs leading-6 text-white/60">
                  The medhaup teaching plan, class format and study materials
                  will be announced when the course launches.
                </p>
                <a
                  href="#exam-pattern"
                  className="mt-5 inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-orange underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  See the marks breakdown
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </aside>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
