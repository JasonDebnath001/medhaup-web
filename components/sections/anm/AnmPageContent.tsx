"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Baby,
  HeartPulse,
  Plus,
} from "lucide-react";
import { useCourseMotion } from "@/components/ui/useCourseMotion";
import { ANM_FAQS, ANM_YEARS } from "@/lib/anm";
import { ANM_CURRICULUM } from "@/lib/anm-syllabus";
import AnmExamPattern from "./AnmExamPattern";
import AnmEnrollment from "./AnmEnrollment";
import AnmSyllabus from "./AnmSyllabus";
import AnmTraining from "./AnmTraining";

const YEAR_ICONS = { "1st": BookOpen, "2nd": Baby };

export default function AnmPageContent() {
  const { enter, reveal, reduceMotion } = useCourseMotion();

  return (
    <>
      <section
        aria-labelledby="anm-heading"
        className="relative overflow-hidden bg-navy pb-14 pt-32 text-white sm:pb-20 sm:pt-40"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <motion.nav {...enter()} aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-white/65">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={13} />
              </li>
              <li aria-current="page" className="text-white">
                ANM Year-wise Course
              </li>
            </ol>
          </motion.nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <motion.div {...enter(0.08)}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-orange/40 bg-orange/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-orange"
                />
                ANM · 1st & 2nd year
              </span>
              <h1
                id="anm-heading"
                className="font-heading mt-6 text-[2.5rem] font-extrabold leading-[1.12] tracking-tight sm:text-6xl lg:text-[4.1rem]"
              >
                ANM.
                <span className="mt-2 block text-[2.1rem] text-orange sm:text-5xl">
                  1st &amp; 2nd year.
                </span>
              </h1>
              <p className="font-heading mt-6 text-xl font-semibold sm:text-2xl">
                Your next chapter in nursing.
              </p>
              <p className="mt-4 max-w-lg text-base leading-7 text-white/75">
                Join medhaup for your Auxiliary Nursing and Midwifery studies.
                Explore both years&apos; subjects, syllabus and exam pattern,
                and choose the course for your year.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  href="#enrolment"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 font-bold text-navy transition-colors hover:bg-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Enrol now <ArrowRight size={18} aria-hidden="true" />
                </motion.a>
                <a
                  href="#syllabus"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Explore the syllabus{" "}
                  <ArrowDown size={17} aria-hidden="true" />
                </a>
              </div>
              <p className="mt-5 text-xs leading-5 text-white/60">
                Contact our team for current fees, batch timings and enrolment.
              </p>
              <p className="mt-4 text-xs leading-6 text-white/70">
                Preparing for admission to nursing school?{" "}
                <Link
                  href="/course"
                  className="rounded-sm font-semibold text-orange underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Explore ANM/GNM entrance preparation
                </Link>
                .
              </p>
            </motion.div>

            <motion.aside
              {...enter(0.18)}
              aria-label="ANM course for both years"
              className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white/5 p-5 shadow-xl shadow-black/10 sm:p-7"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-5">
                <p className="text-xs font-bold uppercase leading-6 tracking-[0.16em] text-white/70">
                  Auxiliary Nursing and Midwifery
                </p>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-orange/15 text-orange">
                  <HeartPulse size={25} aria-hidden="true" />
                </span>
              </div>
              <h2 className="font-heading mt-6 text-2xl font-extrabold leading-snug">
                Two years.
                <br />A foundation for lifelong care.
              </h2>
              <div className="mt-6 space-y-3">
                {ANM_YEARS.map((year, index) => (
                  <motion.a
                    key={year.id}
                    {...enter(0.28 + index * 0.1)}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    href={`#year-${year.id}`}
                    className={`flex items-center gap-4 rounded-2xl ${year.surface} p-4 text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange sm:p-5`}
                  >
                    <span className="font-heading border-r border-navy/15 pr-4 text-4xl font-extrabold tracking-tighter">
                      {year.number}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="font-heading block text-base font-extrabold sm:text-lg">
                        ANM {year.label}
                      </span>
                    </span>
                    <ArrowRight
                      size={17}
                      className="shrink-0"
                      aria-hidden="true"
                    />
                  </motion.a>
                ))}
              </div>
              <p className="mt-5 text-center text-xs leading-5 text-white/60">
                Choose your year. Stay updated with medhaup.
              </p>
            </motion.aside>
          </div>
        </div>
      </section>

      <nav
        aria-label="ANM page sections"
        className="border-b border-navy/10 bg-white px-4 sm:px-6"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2 py-4 sm:gap-x-8">
          {[
            ["Subjects", "your-year"],
            ["Syllabus", "syllabus"],
            ["Exam pattern", "exam-pattern"],
            ["Practical training", "practical-training"],
            ["Official PDFs", "resources"],
          ].map(([label, anchor]) => (
            <a
              key={anchor}
              href={`#${anchor}`}
              className="rounded-sm py-1 text-xs font-semibold text-navy/70 transition-colors hover:text-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange sm:text-sm"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section
        id="your-year"
        aria-labelledby="anm-years-heading"
        className="scroll-mt-28 bg-cream px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal()} className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
              Made for your stage
            </p>
            <h2
              id="anm-years-heading"
              className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
            >
              Find your year. Look ahead.
            </h2>
            <p className="mt-4 leading-7 text-navy/65">
              Explore the subjects in the Indian Nursing Council&apos;s two-year
              ANM curriculum, from community care to midwifery.
            </p>
          </motion.div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {ANM_YEARS.map((year, index) => {
              const Icon = YEAR_ICONS[year.id];
              const curriculum = ANM_CURRICULUM.find(
                (entry) => entry.yearId === year.id,
              )!;
              return (
                <motion.article
                  key={year.id}
                  id={`year-${year.id}`}
                  {...reveal(index * 0.1)}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  className="flex scroll-mt-28 flex-col rounded-3xl border border-navy/10 bg-white p-6 sm:p-8"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-2xl ${year.surface} ${year.accent}`}
                    >
                      <Icon size={23} aria-hidden="true" />
                    </span>
                  </div>
                  <p className={`mt-6 text-sm font-bold ${year.accent}`}>
                    ANM {year.label}
                  </p>
                  <h3 className="font-heading mt-2 text-2xl font-extrabold leading-snug text-navy">
                    {year.title}
                  </h3>
                  <p className="mb-6 mt-4 text-sm leading-7 text-navy/65">
                    {year.description}
                  </p>
                  <ul className="mb-6 space-y-3">
                    {curriculum.subjects.map((subject, subjectIndex) => (
                      <li
                        key={subject.id}
                        className="flex items-start gap-3 text-sm leading-6 text-navy/80"
                      >
                        <span
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${year.surface} text-[10px] font-bold ${year.accent}`}
                          aria-hidden="true"
                        >
                          {subjectIndex + 1}
                        </span>
                        {subject.name}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto border-t border-navy/10 pt-5 text-xs leading-6 text-navy/60">
                    {curriculum.subjects.length} theory papers · 2 practical
                    papers
                    <span className="block">
                      Contact our team for current batch details.
                    </span>
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <AnmSyllabus />
      <AnmExamPattern />
      <AnmTraining />

      <section
        id="faq"
        aria-labelledby="anm-faq-heading"
        className="bg-white px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.7fr_1fr] lg:gap-16">
          <motion.div {...reveal()}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
              Before you enrol
            </p>
            <h2
              id="anm-faq-heading"
              className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
            >
              A few things
              <br className="hidden lg:block" /> to know.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-navy/65">
              Quick answers about the ANM course.
            </p>
          </motion.div>
          <div className="divide-y divide-navy/10 border-y border-navy/10">
            {ANM_FAQS.map((faq, index) => (
              <motion.details
                key={faq.question}
                {...reveal(index * 0.05)}
                className="group py-5"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-sm font-heading text-base font-bold leading-6 text-navy marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <Plus
                    size={20}
                    className="mt-0.5 shrink-0 text-orange-dark transition-transform group-open:rotate-45 motion-reduce:transform-none motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-4 pr-8 text-sm leading-7 text-navy/65">
                  {faq.answer}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
      <AnmEnrollment />
    </>
  );
}
