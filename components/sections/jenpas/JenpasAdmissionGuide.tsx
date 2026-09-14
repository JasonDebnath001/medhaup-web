"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import { useCourseMotion } from "@/components/ui/useCourseMotion";
import { JENPAS_REFERENCE_YEAR, JENPAS_SOURCES } from "@/lib/jenpas";

const ELIGIBILITY = [
  {
    title: "Citizenship & domicile",
    description:
      "The 2026 bulletin requires Indian citizenship and West Bengal domicile to appear in JENPAS(UG). Keep the prescribed domicile documents ready for verification.",
    page: 10,
  },
  {
    title: "School qualification",
    description:
      "Applicants must have passed Class 12 or be appearing in Class 12 in the 2026 examination cycle. Required subjects and minimum marks for admission depend on the degree you choose.",
    page: 11,
  },
  {
    title: "Age & course requirements",
    description:
      "Check the minimum age, course-specific upper age limit, subject combination and aggregate marks in the bulletin. Nursing, physiotherapy, optometry and BHA have different academic criteria.",
    page: 11,
  },
  {
    title: "Nursing college eligibility",
    description:
      "Under the 2026 rules, government B.Sc. Nursing colleges admit female candidates. Private nursing colleges include female-admitting institutions and a few institutions for male candidates only. Check the eligible colleges in the seat matrix.",
    page: 10,
  },
];

const RESOURCES = [
  {
    title: "JENPAS(UG) information bulletin",
    label: "WBJEEB · 2026 PDF",
    description:
      "Papers, subjects, scoring, eligibility, documents and counselling guidance.",
    href: JENPAS_SOURCES.bulletin,
  },
  {
    title: "Health Aptitude syllabus",
    label: "WBJEEB · 2026 PDF",
    description:
      "The official Paper I topic outline for health, nutrition, ethics and related areas.",
    href: JENPAS_SOURCES.healthAptitude,
  },
  {
    title: "Previous-year question papers",
    label: "WBJEEB · Official archive",
    description:
      "Past Paper I and Paper II question papers. Compare older papers with the 2026 structure, including Health Aptitude in Paper I.",
    href: JENPAS_SOURCES.pastPapers,
  },
  {
    title: "Exam notices & counselling",
    label: "WBJEEB · Official exam page",
    description:
      "Check the applicable examination-year bulletin, notices, dates and counselling information.",
    href: JENPAS_SOURCES.official,
  },
];

export default function JenpasAdmissionGuide() {
  const { reveal, reduceMotion } = useCourseMotion();
  return (
    <section
      id="eligibility"
      aria-labelledby="jenpas-eligibility-heading"
      className="scroll-mt-28 bg-white px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal()} className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
            Before you apply
          </p>
          <h2
            id="jenpas-eligibility-heading"
            className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
          >
            Check the requirements for your goal.
          </h2>
          <p className="mt-4 leading-7 text-navy/65">
            This overview follows the {JENPAS_REFERENCE_YEAR} bulletin.
            Admission criteria depend on your course and institution, so read
            the full requirements for your examination year before applying.
          </p>
        </motion.div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {ELIGIBILITY.map((item, index) => (
            <motion.article
              key={item.title}
              {...reveal(index * 0.05)}
              className="rounded-2xl border border-navy/10 bg-cream p-5 sm:p-6"
            >
              <h3 className="font-heading text-lg font-extrabold text-navy">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-navy/65">
                {item.description}
              </p>
              <a
                href={`${JENPAS_SOURCES.bulletin}#page=${item.page}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 rounded-sm text-xs font-bold text-orange-dark underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
              >
                Read the relevant bulletin section
                <ArrowUpRight size={14} aria-hidden="true" />
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            </motion.article>
          ))}
        </div>
        <motion.div
          {...reveal()}
          className="mt-6 rounded-2xl bg-navy p-6 text-white sm:p-8"
        >
          <h3 className="font-heading text-xl font-extrabold">
            From application to admission
          </h3>
          <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "Choose your paper",
                "Apply through WBJEEB for Paper I, Paper II or both.",
              ],
              [
                "Appear in the exam",
                "Your paper determines whether you receive GMR, BMR or both.",
              ],
              [
                "Join counselling",
                "Follow the notified registration, choice-filling and allotment process.",
              ],
              [
                "Complete verification",
                "The allotted institution checks academic, category, domicile and medical-fitness documents as applicable.",
              ],
            ].map(([title, detail], index) => (
              <li key={title}>
                <span className="font-heading text-2xl font-extrabold text-orange">
                  0{index + 1}
                </span>
                <h4 className="mt-2 text-sm font-bold">{title}</h4>
                <p className="mt-2 text-xs leading-6 text-white/70">{detail}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 border-t border-white/15 pt-4 text-xs leading-6 text-white/60">
            A rank alone does not guarantee a seat. Admission depends on
            eligibility, choices, seat availability and document verification.
            medhaup enrolment details concern the preparation course; examination
            applications are handled by WBJEEB.
          </p>
        </motion.div>
        <div
          id="resources"
          className="mt-14 scroll-mt-28 border-t border-navy/10 pt-9"
        >
          <motion.div {...reveal()}>
            <h3 className="font-heading text-2xl font-extrabold text-navy">
              Keep the official resources close.
            </h3>
            <p className="mt-3 text-sm leading-7 text-navy/65">
              Read or save the source documents and practise with WBJEEB&apos;s
              question-paper archive.
            </p>
          </motion.div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {RESOURCES.map((resource, index) => (
              <motion.a
                key={resource.title}
                {...reveal(index * 0.05)}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-2xl border border-navy/10 p-5 transition-colors hover:border-orange/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange sm:p-6"
              >
                <FileText
                  size={23}
                  className="mt-1 shrink-0 text-orange-dark"
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-navy/55">
                    {resource.label}
                  </span>
                  <span className="font-heading mt-2 block text-base font-extrabold text-navy">
                    {resource.title}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-navy/65">
                    {resource.description}
                  </span>
                  <span className="sr-only">Opens in a new tab.</span>
                </span>
                <ArrowUpRight
                  size={18}
                  className="mt-1 shrink-0 text-navy/60"
                  aria-hidden="true"
                />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
