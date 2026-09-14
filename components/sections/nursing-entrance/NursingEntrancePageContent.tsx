"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  FileText,
  GraduationCap,
  Plus,
} from "lucide-react";
import { useCourseMotion } from "@/components/ui/useCourseMotion";
import { NURSING_ENTRANCE_COURSES } from "@/lib/nursing-entrance-catalog";
import type { NursingEntranceCourse } from "@/lib/nursing-entrance";
import NursingEntranceSyllabus from "./NursingEntranceSyllabus";
import NursingEntranceEnrollment from "./NursingEntranceEnrollment";

const sourceLinkClass =
  "inline-flex items-center gap-1.5 rounded-sm text-xs font-bold text-orange-dark underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange";

export default function NursingEntrancePageContent({
  course,
}: {
  course: NursingEntranceCourse;
}) {
  const { enter, reveal, reduceMotion } = useCourseMotion();
  const totalQuestions = course.parts.reduce(
    (total, part) => total + part.questions,
    0,
  );
  const related = NURSING_ENTRANCE_COURSES.find(
    (item) => item.id !== course.id,
  )!;
  const resources = [
    {
      title: `${course.name} information bulletin`,
      label: `WBJEEB · ${course.referenceYear} PDF`,
      detail:
        "Read the official syllabus, marking rules, eligibility and document requirements.",
      href: course.sources.bulletin,
    },
    {
      title: "Previous-year question papers",
      label: "WBJEEB · Official archive",
      detail:
        "Practise with past papers and compare their coverage with the bulletin for your examination year.",
      href: course.sources.pastPapers,
    },
    {
      title: "Exam notices & counselling",
      label: "WBJEEB · Official exam page",
      detail:
        "Check application notices, examination dates, counselling updates and the seat matrix.",
      href: course.sources.official,
    },
  ];

  return (
    <>
      <section
        aria-labelledby={`${course.id}-heading`}
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
                {course.name} Preparation
              </li>
            </ol>
          </motion.nav>
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <motion.div {...enter(0.08)}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-orange/40 bg-orange/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rounded-full bg-orange"
                />
                Entrance preparation
              </span>
              <h1
                id={`${course.id}-heading`}
                className="font-heading mt-6 text-5xl font-extrabold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl"
              >
                {course.name}.
                <span className="mt-4 block text-[2rem] leading-tight text-orange sm:text-4xl">
                  {course.heroLine}
                </span>
              </h1>
              <p className="mt-5 text-sm font-semibold leading-6 text-white/60">
                {course.fullName}
              </p>
              <p className="mt-5 max-w-lg text-base leading-7 text-white/75">
                A new medhaup course to help you prepare for the {course.degree}{" "}
                entrance examination in West Bengal. Explore what to study and
                plan your next step.
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
              aria-label={`${course.name} preparation overview`}
              className="mx-auto w-full max-w-md rounded-3xl border border-white/20 bg-white/5 p-5 shadow-xl shadow-black/10 sm:p-7"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-5">
                <span className="text-xs font-bold uppercase leading-6 tracking-[0.16em] text-white/70">
                  Your next qualification
                </span>
                <GraduationCap
                  size={30}
                  className="shrink-0 text-orange"
                  aria-hidden="true"
                />
              </div>
              <h2 className="font-heading mt-6 text-3xl font-extrabold leading-snug">
                {course.degree}
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/65">
                {course.audience}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {course.parts.map((part, index) => (
                  <motion.a
                    key={part.id}
                    {...enter(0.26 + index * 0.08)}
                    whileHover={reduceMotion ? undefined : { y: -3 }}
                    href="#exam-pattern"
                    className={`rounded-2xl p-4 text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange ${index === 0 ? "bg-[#e5f0fb]" : "bg-[#fff0e4]"}`}
                  >
                    <span className="text-xs font-bold">{part.name}</span>
                    <span className="font-heading mt-3 block text-4xl font-extrabold">
                      {part.questions}
                    </span>
                    <span className="mt-1 block text-xs">questions</span>
                  </motion.a>
                ))}
              </div>
              <p className="mt-5 text-center text-xs leading-6 text-white/60">
                One entrance paper · {course.syllabusLevel} syllabus
              </p>
            </motion.aside>
          </div>
        </div>
      </section>
      <nav
        aria-label={`${course.name} page sections`}
        className="border-b border-navy/10 bg-white px-4 sm:px-6"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2 py-4 sm:gap-x-8">
          {[
            ["Subjects & syllabus", "syllabus"],
            ["Exam pattern", "exam-pattern"],
            ["Eligibility & experience", "eligibility"],
            ["Official resources", "resources"],
            ["FAQs", "faq"],
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
      <div className="bg-cream px-4 py-5 sm:px-6">
        <p className="mx-auto max-w-6xl text-xs leading-6 text-navy/65">
          Exam reference:{" "}
          <a
            href={course.sources.bulletin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm font-bold text-navy underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          >
            WBJEEB {course.name} {course.referenceYear} bulletin
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
          . Check the bulletin for your examination year for applicable rules
          and dates.
        </p>
      </div>

      <NursingEntranceSyllabus course={course} />

      <section
        id="exam-pattern"
        aria-labelledby={`${course.id}-exam-heading`}
        className="scroll-mt-28 bg-cream px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal()} className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
              The {course.referenceYear} exam pattern
            </p>
            <h2
              id={`${course.id}-exam-heading`}
              className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
            >
              Know the paper. Make each answer count.
            </h2>
            <p className="mt-4 leading-7 text-navy/65">
              One OMR paper with four options per question and a single correct
              answer. The examination is in English only.
            </p>
          </motion.div>
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              [String(totalQuestions), "MCQ questions"],
              [String(totalQuestions), "total marks"],
              ["90 min", "exam duration"],
              ["English", "question language"],
            ].map(([value, label], index) => (
              <motion.div
                key={label}
                {...reveal(index * 0.05)}
                className="rounded-2xl bg-navy p-5 text-white sm:p-6"
              >
                <p className="font-heading text-3xl font-extrabold tracking-tight text-orange sm:text-4xl">
                  {value}
                </p>
                <p className="mt-3 text-xs leading-6 text-white/75">{label}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            {...reveal()}
            className="mt-6 overflow-hidden rounded-2xl border border-navy/10 bg-white"
          >
            <div
              role="region"
              aria-label={`${course.name} part-wise exam pattern, scroll horizontally if needed`}
              tabIndex={0}
              className="overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange"
            >
              <table className="w-full min-w-[500px] text-left text-sm text-navy">
                <caption className="sr-only">
                  {course.name} {course.referenceYear} questions and marks by
                  part
                </caption>
                <thead className="border-b border-navy/10 bg-[#e5f0fb] text-xs uppercase tracking-wider">
                  <tr>
                    <th scope="col" className="px-5 py-4">
                      Part
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Coverage
                    </th>
                    <th scope="col" className="px-5 py-4 text-right">
                      Questions
                    </th>
                    <th scope="col" className="px-5 py-4 text-right">
                      Marks
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/10">
                  {course.parts.map((part) => (
                    <tr key={part.id}>
                      <th scope="row" className="whitespace-nowrap px-5 py-5">
                        {part.name}
                      </th>
                      <td className="px-5 py-5 text-navy/65">{part.title}</td>
                      <td className="px-5 py-5 text-right tabular-nums">
                        {part.questions}
                      </td>
                      <td className="px-5 py-5 text-right font-bold tabular-nums">
                        {part.questions}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t border-navy/10 bg-cream font-bold">
                  <tr>
                    <th scope="row" colSpan={2} className="px-5 py-4">
                      Total
                    </th>
                    <td className="px-5 py-4 text-right">{totalQuestions}</td>
                    <td className="px-5 py-4 text-right">{totalQuestions}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </motion.div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["+1", "Correct answer", "Choose the single correct option."],
              [
                "−0.25",
                "Wrong answer",
                "Selecting multiple options also counts as a wrong answer.",
              ],
              [
                "0",
                "Unanswered",
                "No marks are added or deducted for a skipped question.",
              ],
            ].map(([value, title, detail], index) => (
              <motion.article
                key={title}
                {...reveal(index * 0.05)}
                className="rounded-2xl border border-navy/10 bg-white p-6"
              >
                <p className="font-heading text-3xl font-extrabold text-orange-dark">
                  {value}
                </p>
                <h3 className="font-heading mt-3 font-bold text-navy">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-navy/65">{detail}</p>
              </motion.article>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-navy/65">
            Fill the OMR bubbles carefully with a blue or black ballpoint pen.
            Marked responses cannot be changed. There is no partial credit for
            selecting more than one option.
          </p>
          <a
            href={`${course.sources.bulletin}#page=${course.sources.scoringPage}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${sourceLinkClass} mt-4`}
          >
            Read the official marking rules
            <ArrowUpRight size={14} aria-hidden="true" />
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
        </div>
      </section>

      <section
        id="eligibility"
        aria-labelledby={`${course.id}-eligibility-heading`}
        className="scroll-mt-28 bg-white px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal()} className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
              Before you apply
            </p>
            <h2
              id={`${course.id}-eligibility-heading`}
              className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
            >
              Check your route into {course.degree}.
            </h2>
            <p className="mt-4 leading-7 text-navy/65">
              This overview follows the {course.referenceYear} bulletin. Read
              the full criteria and current notices for your qualification,
              employment category and intended institution.
            </p>
          </motion.div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {course.eligibility.map((item, index) => (
              <motion.article
                key={item.title}
                {...reveal(index * 0.05)}
                className="rounded-2xl border border-navy/10 bg-cream p-5 sm:p-6"
              >
                <h3 className="font-heading text-lg font-extrabold text-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-navy/65">
                  {item.text}
                </p>
                <a
                  href={`${course.sources.bulletin}#page=${item.page}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${sourceLinkClass} mt-4`}
                >
                  Read the bulletin section
                  <ArrowUpRight size={14} aria-hidden="true" />
                  <span className="sr-only"> (PDF, opens in a new tab)</span>
                </a>
              </motion.article>
            ))}
          </div>
          <motion.div
            {...reveal()}
            className="mt-8 overflow-hidden rounded-2xl border border-navy/10"
          >
            <div className="bg-navy p-5 text-white sm:p-6">
              <h3 className="font-heading text-xl font-extrabold">
                Work experience requirements
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/70">
                {course.experienceNote}
              </p>
            </div>
            <div
              role="region"
              aria-label={`${course.name} work experience requirements, scroll horizontally if needed`}
              tabIndex={0}
              className="overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange"
            >
              <table className="w-full min-w-[520px] text-left text-sm text-navy">
                <caption className="sr-only">
                  {course.name} {course.referenceYear} experience requirements
                  by candidate group
                </caption>
                <thead className="border-b border-navy/10 bg-cream">
                  <tr>
                    <th scope="col" className="w-2/5 px-5 py-4">
                      Candidate group
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Required experience
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/10">
                  {course.experience.map((item) => (
                    <tr key={item.group}>
                      <th
                        scope="row"
                        className="px-5 py-5 font-semibold leading-7"
                      >
                        {item.group}
                      </th>
                      <td className="px-5 py-5 leading-7 text-navy/65">
                        {item.requirement}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          <a
            href={`${course.sources.bulletin}#page=${course.experiencePage}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${sourceLinkClass} mt-4`}
          >
            Verify the full experience and service rules
            <ArrowUpRight size={14} aria-hidden="true" />
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
          <div className="mt-8 rounded-2xl bg-[#e5f0fb] p-5 sm:p-6">
            <h3 className="font-heading font-bold text-navy">
              From entrance preparation to admission
            </h3>
            <p className="mt-3 text-sm leading-7 text-navy/70">
              Apply for the exam through WBJEEB, appear for the test, then
              follow the notified counselling and document-verification process.
              A rank does not guarantee a seat. medhaup enrolment details are for
              the preparation course; they are separate from examination
              applications and college admission.
            </p>
          </div>
        </div>
      </section>

      <section
        id="resources"
        aria-labelledby={`${course.id}-resources-heading`}
        className="scroll-mt-28 bg-cream px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal()}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
              Official resources
            </p>
            <h2
              id={`${course.id}-resources-heading`}
              className="font-heading mt-4 text-3xl font-extrabold text-navy sm:text-4xl"
            >
              Keep the right references close.
            </h2>
          </motion.div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {resources.map((resource, index) => (
              <motion.a
                key={resource.title}
                {...reveal(index * 0.06)}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-navy/10 bg-white p-6 transition-colors hover:border-orange/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
              >
                <div className="flex items-center justify-between gap-4">
                  <FileText
                    size={25}
                    className="text-orange-dark"
                    aria-hidden="true"
                  />
                  <ArrowUpRight
                    size={18}
                    className="text-navy/50"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-navy/55">
                  {resource.label}
                </p>
                <h3 className="font-heading mt-2 text-lg font-extrabold text-navy">
                  {resource.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-navy/65">
                  {resource.detail}
                </p>
                <span className="sr-only">Opens in a new tab.</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby={`${course.id}-faq-heading`}
        className="scroll-mt-28 bg-white px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.7fr_1fr] lg:gap-16">
          <motion.div {...reveal()}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
              A little more clarity
            </p>
            <h2
              id={`${course.id}-faq-heading`}
              className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
            >
              Before your next step.
            </h2>
            <p className="mt-4 text-sm leading-7 text-navy/65">
              About {course.name} and the medhaup course.
            </p>
            <Link
              href={related.path}
              className="mt-7 inline-flex items-center gap-2 rounded-sm text-sm font-bold text-orange-dark underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            >
              Explore {related.name} too
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <p className="mt-2 text-xs leading-6 text-navy/55">
              {related.degree} entrance preparation
            </p>
          </motion.div>
          <div className="divide-y divide-navy/10 border-y border-navy/10">
            {course.faqs.map((faq, index) => (
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
      <NursingEntranceEnrollment course={course} />
    </>
  );
}
