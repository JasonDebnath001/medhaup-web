"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Plus,
} from "lucide-react";
import { useCourseMotion } from "@/components/ui/useCourseMotion";
import {
  JENPAS_FAQS,
  JENPAS_PAPERS,
  JENPAS_REFERENCE_YEAR,
  JENPAS_SOURCES,
} from "@/lib/jenpas";
import JenpasSyllabus from "./JenpasSyllabus";
import JenpasExamPattern from "./JenpasExamPattern";
import JenpasAdmissionGuide from "./JenpasAdmissionGuide";
import JenpasEnrollment from "./JenpasEnrollment";

export default function JenpasPageContent() {
  const { enter, reveal, reduceMotion } = useCourseMotion();
  return (
    <>
      <section
        aria-labelledby="jenpas-heading"
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
                JENPAS(UG) Preparation
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
                JENPAS(UG) Preparation
              </span>
              <h1
                id="jenpas-heading"
                className="font-heading mt-6 text-[2.5rem] font-extrabold leading-[1.12] tracking-tight sm:text-6xl lg:text-[4.1rem]"
              >
                JENPAS(UG).
                <span className="mt-3 block text-[2rem] text-orange sm:text-4xl">
                  Your next step in healthcare.
                </span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-white/75">
                Join medhaup for WBJEEB&apos;s undergraduate nursing and
                allied health entrance examination. Explore the papers, subjects
                and syllabus as you plan your preparation.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  href="#enrolment"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 font-bold text-navy transition-colors hover:bg-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Enrol now
                  <ArrowRight size={18} aria-hidden="true" />
                </motion.a>
                <a
                  href="#syllabus"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Explore the syllabus
                  <ArrowDown size={17} aria-hidden="true" />
                </a>
              </div>
              <p className="mt-5 text-xs leading-6 text-white/60">
                Contact our team for current fees, batch timings and enrolment.
              </p>
            </motion.div>
            <motion.aside
              {...enter(0.18)}
              aria-label="JENPAS undergraduate entrance papers"
              className="mx-auto w-full max-w-md rounded-3xl border border-white/20 bg-white/5 p-5 shadow-xl shadow-black/10 sm:p-7"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-5">
                <p className="text-xs font-bold uppercase leading-6 tracking-[0.16em] text-white/70">
                  Your course. Your paper.
                </p>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-orange/15 text-orange">
                  <GraduationCap size={25} aria-hidden="true" />
                </span>
              </div>
              <h2 className="font-heading mt-6 text-2xl font-extrabold leading-snug">
                Start with the right
                <br />
                exam paper.
              </h2>
              <div className="mt-6 space-y-3">
                {JENPAS_PAPERS.map((paper, index) => (
                  <motion.a
                    key={paper.id}
                    {...enter(0.28 + index * 0.1)}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    href={`#${paper.id}`}
                    className={`flex items-center gap-4 rounded-2xl ${paper.surface} p-4 text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange sm:p-5`}
                  >
                    <span className="font-heading w-11 shrink-0 border-r border-navy/15 pr-3 text-3xl font-extrabold">
                      {paper.number}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="font-heading block text-base font-extrabold">
                        {paper.label}
                      </span>
                      <span
                        className={`mt-1 block text-xs leading-5 font-semibold ${paper.accent}`}
                      >
                        {paper.title}
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
                Paper I, Paper II or both — depending on your goal.
              </p>
            </motion.aside>
          </div>
        </div>
      </section>
      <nav
        aria-label="JENPAS page sections"
        className="border-b border-navy/10 bg-white px-4 sm:px-6"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2 py-4 sm:gap-x-8">
          {[
            ["Papers & courses", "papers"],
            ["Subjects & syllabus", "syllabus"],
            ["Exam pattern", "exam-pattern"],
            ["Eligibility", "eligibility"],
            ["Official resources", "resources"],
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
        id="papers"
        aria-labelledby="jenpas-papers-heading"
        className="scroll-mt-28 bg-cream px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal()} className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
              Choose your direction
            </p>
            <h2
              id="jenpas-papers-heading"
              className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
            >
              Which paper takes you there?
            </h2>
            <p className="mt-4 leading-7 text-navy/65">
              JENPAS(UG) has separate papers for nursing and allied health
              courses, and for hospital administration. You can apply for one or
              both papers.
            </p>
            <p className="mt-3 text-xs leading-6 text-navy/60">
              Exam reference:{" "}
              <a
                href={JENPAS_SOURCES.bulletin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm font-semibold text-navy underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
              >
                WBJEEB JENPAS(UG) {JENPAS_REFERENCE_YEAR} bulletin
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
              . Check the bulletin for your examination year for applicable
              rules and dates.
            </p>
          </motion.div>
          <div className="mt-9 grid items-start gap-5 md:grid-cols-2">
            {JENPAS_PAPERS.map((paper, index) => (
              <motion.article
                key={paper.id}
                id={paper.id}
                {...reveal(index * 0.08)}
                className="scroll-mt-28 rounded-3xl border border-navy/10 bg-white p-6 sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={`rounded-xl ${paper.surface} px-4 py-2 text-sm font-bold ${paper.accent}`}
                  >
                    {paper.label}
                  </span>
                  <span className="text-xs font-semibold text-navy/55">
                    {paper.rank}
                  </span>
                </div>
                <h3 className="font-heading mt-5 text-2xl font-extrabold leading-snug text-navy">
                  {paper.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-navy/65">
                  {paper.description}
                </p>
                <ul
                  className="mt-5 flex flex-wrap gap-2"
                  aria-label={`${paper.label} subjects`}
                >
                  {paper.subjects.map((subject) => (
                    <li
                      key={subject.name}
                      className={`rounded-full ${paper.surface} px-3 py-1.5 text-xs font-semibold text-navy`}
                    >
                      {subject.name}
                    </li>
                  ))}
                </ul>
                <details className="group mt-6 border-t border-navy/10 pt-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-sm text-sm font-bold text-navy marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange [&::-webkit-details-marker]:hidden">
                    Courses covered by {paper.label}
                    <ChevronDown
                      size={18}
                      className="shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </summary>
                  <ul className="mt-4 list-disc space-y-2 pl-4 text-sm leading-6 text-navy/70 marker:text-orange-dark">
                    {paper.courses.map((course) => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs leading-6 text-navy/60">
                    Courses listed in the {JENPAS_REFERENCE_YEAR} bulletin;
                    admission depends on course eligibility and the counselling
                    seat matrix.
                  </p>
                </details>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <JenpasSyllabus />
      <JenpasExamPattern />
      <JenpasAdmissionGuide />
      <section
        id="faq"
        aria-labelledby="jenpas-faq-heading"
        className="bg-white px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.7fr_1fr] lg:gap-16">
          <motion.div {...reveal()}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
              Before you begin
            </p>
            <h2
              id="jenpas-faq-heading"
              className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
            >
              A few things to know.
            </h2>
            <p className="mt-4 text-sm leading-7 text-navy/65">
              About the exam and medhaup&apos;s preparation course.
            </p>
          </motion.div>
          <div className="divide-y divide-navy/10 border-y border-navy/10">
            {JENPAS_FAQS.map((faq, index) => (
              <motion.details
                key={faq.question}
                {...reveal(index * 0.04)}
                className="group py-5"
              >
                <summary className="font-heading flex cursor-pointer list-none items-start justify-between gap-4 rounded-sm text-base font-bold leading-6 text-navy marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <Plus
                    size={20}
                    className="mt-0.5 shrink-0 text-orange-dark transition-transform group-open:rotate-45 motion-reduce:transition-none"
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
      <JenpasEnrollment />
    </>
  );
}
