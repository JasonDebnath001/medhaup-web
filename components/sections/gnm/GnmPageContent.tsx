"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  ChevronRight,
  GraduationCap,
  HeartHandshake,
  Plus,
  Stethoscope,
} from "lucide-react";
import { GNM_FAQS, GNM_YEARS, GNM_SUBJECT_OVERVIEW } from "@/lib/gnm";
import GnmEnrollment from "./GnmEnrollment";
import GnmSyllabus from "./GnmSyllabus";
import GnmExamPattern from "./GnmExamPattern";
import { useGnmMotion } from "./useGnmMotion";

const yearStyles = {
  foundation: {
    icon: BookOpen,
    surface: "bg-[#ede9fb]",
    accent: "text-navy",
    border: "border-[#dcd5f3]",
  },
  progress: {
    icon: Stethoscope,
    surface: "bg-[#fff0e4]",
    accent: "text-[#a6440e]",
    border: "border-[#f4d6c2]",
  },
  confidence: {
    icon: HeartHandshake,
    surface: "bg-[#e9effc]",
    accent: "text-[#365b98]",
    border: "border-[#d0ddf5]",
  },
} as const;

export default function GnmPageContent() {
  const { reveal, enter, reduceMotion } = useGnmMotion();
  return (
    <>
      <section
        aria-labelledby="gnm-heading"
        className="relative overflow-hidden bg-navy pb-14 pt-32 text-white sm:pb-20 sm:pt-40"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
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
                GNM Year-wise Course
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
                GNM · 1st, 2nd & 3rd year
              </span>
              <h1
                id="gnm-heading"
                className="font-heading mt-6 text-[2.7rem] font-extrabold leading-[1.12] tracking-tight sm:text-6xl lg:text-[4.1rem]"
              >
                GNM 1st, 2nd
                <br />
                <span className="text-orange">&amp; 3rd year.</span>
              </h1>
              <p className="font-heading mt-6 text-xl font-semibold sm:text-2xl">
                Here for your next chapter in nursing.
              </p>
              <p className="mt-4 max-w-lg text-base leading-7 text-white/75">
                You&apos;ve started your nursing journey. Now, take the next
                step with medhaup. Explore your
                subjects, syllabus and first-year exam pattern, and choose the
                course for your year.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#enrolment"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 font-bold text-navy transition-colors hover:bg-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Enrol now <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a
                  href="#your-year"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Explore your year <ArrowDown size={17} aria-hidden="true" />
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-xs leading-5 text-white/75">
                <a
                  href="#syllabus"
                  className="underline decoration-white/30 underline-offset-4 hover:text-white"
                >
                  Subjects &amp; syllabus PDFs
                </a>
                <a
                  href="#exam-pattern"
                  className="underline decoration-white/30 underline-offset-4 hover:text-white"
                >
                  1st-year exam pattern
                </a>
              </div>
            </motion.div>

            <motion.div
              {...enter(0.18)}
              className="relative mx-auto w-full max-w-md lg:py-5"
              aria-label="Three years of GNM, one learning journey"
            >
              <div className="mb-5 flex items-center justify-between border-b border-white/20 pb-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">
                  The GNM collection
                </span>
                <GraduationCap
                  size={25}
                  className="text-orange"
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-3">
                {GNM_YEARS.map((year, index) => {
                  const style = yearStyles[year.theme];
                  return (
                    <motion.a
                      key={year.id}
                      {...enter(0.28 + index * 0.1)}
                      whileHover={reduceMotion ? undefined : { y: -4 }}
                      href={`#year-${year.id}`}
                      className={`group relative flex items-center gap-5 overflow-hidden rounded-2xl ${style.surface} p-5 text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange sm:p-6`}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute inset-y-0 left-3 w-px bg-navy/10"
                      />
                      <span className="font-heading min-w-16 border-r border-navy/15 pr-5 text-4xl font-extrabold tracking-tighter sm:text-5xl">
                        {year.number}
                      </span>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy/60">
                          General Nursing &amp; Midwifery
                        </p>
                        <p className="font-heading mt-1 text-xl font-extrabold">
                          GNM {year.label}
                        </p>
                      </div>
                      <ArrowRight
                        size={18}
                        className="shrink-0 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </motion.a>
                  );
                })}
              </div>
              <p className="mt-5 text-center text-xs tracking-wide text-white/65">
                Three years. One learning journey. medhaup.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="your-year"
        aria-labelledby="gnm-years-heading"
        className="scroll-mt-24 bg-cream px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal()} className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
              Made for your stage
            </p>
            <h2
              id="gnm-years-heading"
              className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
            >
              Different years. The same ambition.
            </h2>
            <p className="mt-4 leading-7 text-navy/65">
              From your first year to your final year, see how your subjects
              progress through General Nursing and Midwifery.
            </p>
          </motion.div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {GNM_YEARS.map((year, index) => {
              const style = yearStyles[year.theme];
              return (
                <motion.article
                  key={year.id}
                  {...reveal(index * 0.08)}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  id={`year-${year.id}`}
                  className={`flex scroll-mt-28 flex-col rounded-3xl border ${style.border} bg-white p-6 sm:p-7`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-2xl ${style.surface} ${style.accent}`}
                    >
                      <style.icon size={23} aria-hidden="true" />
                    </span>
                  </div>
                  <p className={`mt-7 text-sm font-bold ${style.accent}`}>
                    GNM {year.label}
                  </p>
                  <h3 className="font-heading mt-2 text-2xl font-extrabold leading-snug text-navy">
                    {year.title}
                  </h3>
                  <p className="mb-6 mt-4 text-sm leading-7 text-navy/65">
                    {year.description}
                  </p>
                  <div className="space-y-5 border-t border-navy/10 pt-5">
                    {GNM_SUBJECT_OVERVIEW[year.id].map((group) => (
                      <div key={group.label}>
                        <p className="mb-2 text-[10px] font-bold uppercase leading-5 tracking-wider text-navy/55">
                          {group.label}
                        </p>
                        <ul className="space-y-2.5">
                          {group.subjects.map((subject) => (
                            <li
                              key={subject}
                              className="flex items-start gap-2 text-xs leading-6 text-navy/80"
                            >
                              <span
                                className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-orange-dark"
                                aria-hidden="true"
                              />
                              {subject}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <p className="mt-auto pt-5 text-xs leading-6 text-navy/60">
                    Contact our team for batch details and enrolment.
                  </p>
                </motion.article>
              );
            })}
          </div>
          <motion.div
            {...reveal()}
            className="mt-8 flex flex-col justify-between gap-3 rounded-2xl border border-navy/10 px-5 py-5 sm:flex-row sm:items-center sm:px-6"
          >
            <p className="text-sm leading-6 text-navy/70">
              Preparing to{" "}
              <span className="font-semibold text-navy">get into</span> nursing
              instead?
            </p>
            <Link
              href="/course"
              className="inline-flex items-center gap-2 text-sm font-bold text-navy underline decoration-navy/25 underline-offset-4 hover:text-orange-dark"
            >
              Explore ANM/GNM entrance preparation{" "}
              <ArrowRight size={16} className="shrink-0" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      <GnmSyllabus />
      <GnmExamPattern />

      <section
        id="faq"
        aria-labelledby="gnm-faq-heading"
        className="bg-white px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.7fr_1fr] lg:gap-16">
          <motion.div {...reveal()}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
              A little clarity
            </p>
            <h2
              id="gnm-faq-heading"
              className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
            >
              Before the
              <br className="hidden lg:block" /> next chapter.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-navy/65">
              What to know about the GNM course.
            </p>
          </motion.div>
          <div className="divide-y divide-navy/10 border-y border-navy/10">
            {GNM_FAQS.map((faq, index) => (
              <motion.details
                key={faq.question}
                {...reveal(index * 0.05)}
                className="group py-5"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-sm font-heading text-base font-bold leading-6 text-navy marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange [&::-webkit-details-marker]:hidden">
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
      <GnmEnrollment />
    </>
  );
}
