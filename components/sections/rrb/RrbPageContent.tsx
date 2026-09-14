"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Plus,
  TrainFront,
} from "lucide-react";
import CourseEnrollment from "@/components/sections/course/CourseEnrollment";
import { useCourseMotion } from "@/components/ui/useCourseMotion";
import {
  RRB_FAQS,
  RRB_GENERAL_SYLLABUS,
  RRB_NURSING_SYLLABUS,
  RRB_REFERENCE,
  RRB_SECTIONS,
  RRB_SOURCES,
} from "@/lib/rrb";

const sourceClass =
  "inline-flex items-center gap-2 rounded-sm text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange";

export default function RrbPageContent() {
  const { enter, reveal } = useCourseMotion();
  return (
    <>
      <section
        aria-labelledby="rrb-heading"
        className="relative overflow-hidden bg-navy pb-16 pt-32 text-white sm:pb-20 sm:pt-40"
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
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-2 text-xs text-white/65">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={13} />
              </li>
              <li aria-current="page" className="text-white">
                RRB Nursing
              </li>
            </ol>
          </nav>
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div {...enter()}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-orange/40 bg-orange/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-orange"
                />
                RRB Nursing Preparation
              </span>
              <h1
                id="rrb-heading"
                className="font-heading mt-6 text-5xl font-extrabold leading-[1.12] tracking-tight sm:text-6xl"
              >
                RRB Nursing.
                <span className="mt-3 block text-3xl text-orange sm:text-4xl">
                  Your next stop: railway nursing.
                </span>
              </h1>
              <p className="mt-6 max-w-lg leading-7 text-white/75">
                Prepare with medhaup for the RRB Nursing Superintendent
                examination. Build your nursing knowledge and practise the
                general subjects with a clear view of the syllabus and CBT
                pattern.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#enrolment"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 font-bold text-navy hover:bg-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Enrol now <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a
                  href="#syllabus"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 font-semibold hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Explore the syllabus{" "}
                  <ArrowDown size={17} aria-hidden="true" />
                </a>
              </div>
              <p className="mt-5 text-xs leading-6 text-white/60">
                Contact our team for current course fees and batch timings.
              </p>
            </motion.div>
            <motion.aside
              {...enter(0.12)}
              aria-label="RRB Nursing exam at a glance"
              className="rounded-3xl border border-white/20 bg-white/5 p-6 sm:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">
                  Nursing Superintendent
                </p>
                <TrainFront
                  size={30}
                  className="shrink-0 text-orange"
                  aria-hidden="true"
                />
              </div>
              <p className="font-heading mt-6 text-3xl font-extrabold">
                One paper.
                <br />
                <span className="text-orange">Four focus areas.</span>
              </p>
              <dl className="mt-7 grid grid-cols-2 gap-3">
                {[
                  ["100", "Questions"],
                  ["100", "Marks"],
                  ["90 min", "Duration"],
                  ["−⅓", "Per wrong answer"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl bg-white/10 p-4">
                    <dt className="text-xs text-white/65">{label}</dt>
                    <dd className="font-heading mt-2 text-2xl font-extrabold">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-xs leading-6 text-white/60">
                Exam reference: {RRB_REFERENCE}. Compensatory time applies to
                eligible candidates.
              </p>
            </motion.aside>
          </div>
        </div>
      </section>

      <nav
        aria-label="RRB page sections"
        className="border-b border-navy/10 bg-white px-4 sm:px-6"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-7 gap-y-2 py-4">
          {[
            ["Subjects", "subjects"],
            ["Syllabus", "syllabus"],
            ["Exam pattern", "exam-pattern"],
            ["Official resources", "resources"],
            ["Enrolment", "enrolment"],
          ].map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-sm py-1 text-sm font-semibold text-navy/70 hover:text-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section
        id="subjects"
        aria-labelledby="rrb-subjects-heading"
        className="scroll-mt-28 bg-cream px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal()}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
              Know your subjects
            </p>
            <h2
              id="rrb-subjects-heading"
              className="font-heading mt-4 text-3xl font-extrabold text-navy sm:text-4xl"
            >
              Nursing leads the paper.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-navy/65">
              Professional Ability accounts for 70 of the 100 marks. Make time
              for all three general sections alongside your nursing revision.
            </p>
          </motion.div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RRB_SECTIONS.map((section, index) => (
              <motion.article
                key={section.name}
                {...reveal(index * 0.05)}
                className="rounded-3xl border border-navy/10 bg-white p-6"
              >
                <span
                  className={`mb-5 block h-1.5 w-12 rounded-full ${section.color}`}
                />
                <p className="font-heading text-4xl font-extrabold text-navy">
                  {section.marks}
                  <span className="ml-2 text-sm font-medium text-navy/55">
                    marks
                  </span>
                </p>
                <h3 className="font-heading mt-4 text-lg font-bold text-navy">
                  {section.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-navy/65">
                  {section.detail}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="syllabus"
        aria-labelledby="rrb-syllabus-heading"
        className="scroll-mt-28 bg-white px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal()}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
              Your revision checklist
            </p>
            <h2
              id="rrb-syllabus-heading"
              className="font-heading mt-4 text-3xl font-extrabold text-navy sm:text-4xl"
            >
              RRB Nursing syllabus.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-navy/65">
              The nursing subjects below follow Annexure C of {RRB_REFERENCE},
              grouped to help you plan revision. Individual nursing subjects do
              not have an official mark allocation.
            </p>
            <a
              href={`${RRB_SOURCES.bulletin}#page=30`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${sourceClass} mt-5 text-orange-dark`}
            >
              Read the official syllabus (PDF){" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
          <h3 className="font-heading mt-10 text-xl font-extrabold text-navy">
            Professional Ability · 70 marks
          </h3>
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {RRB_NURSING_SYLLABUS.map((group) => (
              <article
                key={group.title}
                className="rounded-3xl border border-navy/10 bg-cream p-6"
              >
                <BookOpen
                  size={23}
                  className="text-orange-dark"
                  aria-hidden="true"
                />
                <h4 className="font-heading mt-4 text-lg font-bold text-navy">
                  {group.title}
                </h4>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-navy/70 marker:text-orange-dark">
                  {group.subjects.map((subject) => (
                    <li key={subject}>{subject}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <h3 className="font-heading mt-12 text-xl font-extrabold text-navy">
            General subjects · 30 marks
          </h3>
          <p className="mt-3 text-sm leading-6 text-navy/65">
            Arithmetic and reasoning share one 10-mark section.
          </p>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {RRB_GENERAL_SYLLABUS.map((group) => (
              <article
                key={group.title}
                className="rounded-2xl border border-navy/10 p-6"
              >
                <h4 className="font-heading text-lg font-bold text-navy">
                  {group.title}
                </h4>
                <p className="mt-3 text-sm leading-7 text-navy/65">
                  {group.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="exam-pattern"
        aria-labelledby="rrb-pattern-heading"
        className="scroll-mt-28 bg-navy px-4 py-16 text-white sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal()}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange">
              Understand the CBT
            </p>
            <h2
              id="rrb-pattern-heading"
              className="font-heading mt-4 text-3xl font-extrabold sm:text-4xl"
            >
              RRB Nursing exam pattern.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/70">
              A computer-based, objective test with four options per question
              and one correct answer, followed by document verification and the
              prescribed medical examination.
            </p>
          </motion.div>
          <div className="mt-9 overflow-x-auto rounded-2xl border border-white/20">
            <table className="w-full min-w-[460px] text-left text-sm">
              <caption className="sr-only">
                RRB Nursing Superintendent CBT question and marks distribution
              </caption>
              <thead className="bg-white/10">
                <tr>
                  <th scope="col" className="px-5 py-4">
                    Subject
                  </th>
                  <th scope="col" className="px-5 py-4 text-right">
                    Questions
                  </th>
                  <th scope="col" className="px-5 py-4 text-right">
                    Marks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/15">
                {RRB_SECTIONS.map((section) => (
                  <tr key={section.name}>
                    <th scope="row" className="px-5 py-4 font-medium">
                      {section.name}
                    </th>
                    <td className="px-5 py-4 text-right tabular-nums">
                      {section.questions}
                    </td>
                    <td className="px-5 py-4 text-right tabular-nums">
                      {section.marks}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-white/20 bg-white/10 font-bold">
                <tr>
                  <th scope="row" className="px-5 py-4">
                    Total
                  </th>
                  <td className="px-5 py-4 text-right">100</td>
                  <td className="px-5 py-4 text-right">100</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              [
                "Time limit",
                "90 minutes. The notice provides 120 minutes for candidates eligible under the scribe and compensatory-time rules.",
              ],
              [
                "Marking",
                "Each correct answer earns 1 mark. Each incorrect answer deducts ⅓ mark.",
              ],
              [
                "Selection",
                "CBT merit, document verification and medical fitness determine selection under the notice. RRB may conduct additional CBTs if required.",
              ],
            ].map(([title, detail]) => (
              <div key={title} className="rounded-2xl bg-white/5 p-5">
                <h3 className="font-heading font-bold text-orange">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{detail}</p>
              </div>
            ))}
          </div>
          <a
            href={`${RRB_SOURCES.bulletin}#page=15`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${sourceClass} mt-7 text-white/80`}
          >
            Verify the recruitment process in Section 13{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        id="resources"
        aria-labelledby="rrb-resources-heading"
        className="scroll-mt-28 bg-cream px-4 py-16 sm:px-6"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="rrb-resources-heading"
            className="font-heading text-3xl font-extrabold text-navy"
          >
            Official references.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-navy/65">
            This guide uses {RRB_REFERENCE}. Check the notice for your
            recruitment cycle for applicable eligibility, dates and any revised
            rules. medhaup is an independent preparation platform.
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            <a
              href={RRB_SOURCES.bulletin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${sourceClass} text-orange-dark`}
            >
              RRB Paramedical notice (PDF){" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a
              href={RRB_SOURCES.official}
              target="_blank"
              rel="noopener noreferrer"
              className={`${sourceClass} text-navy`}
            >
              Official RRB website <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="rrb-faq-heading"
        className="scroll-mt-28 bg-white px-4 py-16 sm:px-6"
      >
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.7fr_1fr] lg:gap-16">
          <h2
            id="rrb-faq-heading"
            className="font-heading text-3xl font-extrabold text-navy"
          >
            Before you begin.
          </h2>
          <div className="divide-y divide-navy/10 border-y border-navy/10">
            {RRB_FAQS.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="font-heading flex cursor-pointer list-none items-start justify-between gap-4 rounded-sm font-bold leading-6 text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <Plus
                    size={20}
                    className="shrink-0 text-orange-dark transition-transform group-open:rotate-45 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-4 pr-8 text-sm leading-7 text-navy/65">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CourseEnrollment courseName="RRB Nursing" />
    </>
  );
}
