"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ClipboardList, Stethoscope } from "lucide-react";
import { useCourseMotion } from "@/components/ui/useCourseMotion";
import { ANM_EXAMS, ANM_SOURCES } from "@/lib/anm-syllabus";

export default function AnmExamPattern() {
  const { reveal } = useCourseMotion();
  return (
    <section
      id="exam-pattern"
      aria-labelledby="anm-exam-heading"
      className="scroll-mt-28 bg-cream px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal()} className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
            Know your exam
          </p>
          <h2
            id="anm-exam-heading"
            className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
          >
            Your papers. Your marks.
          </h2>
          <p className="mt-4 leading-7 text-navy/65">
            The INC scheme assesses theory and practical separately at the end
            of each year, with both external examinations and internal
            assessment.
          </p>
        </motion.div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Each theory paper",
              icon: ClipboardList,
              marks: "75 external + 25 internal",
              detail: "100 marks total · 3-hour written exam",
            },
            {
              title: "Each practical paper",
              icon: Stethoscope,
              marks: "100 external + 100 internal",
              detail: "200 marks total · 2 practical papers per year",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              {...reveal(index * 0.08)}
              className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-6"
            >
              <h3 className="font-heading flex items-center gap-2.5 text-base font-bold text-navy">
                <item.icon
                  size={20}
                  className="text-orange-dark"
                  aria-hidden="true"
                />
                {item.title}
              </h3>
              <p className="font-heading mt-4 text-xl font-extrabold text-navy">
                {item.marks}
              </p>
              <p className="mt-2 text-xs leading-6 text-navy/60">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="mt-5 grid items-start gap-5 lg:grid-cols-2">
          {ANM_EXAMS.map((year, index) => {
            const external = year.papers.reduce(
              (sum, paper) => sum + paper.external,
              0,
            );
            const internal = year.papers.reduce(
              (sum, paper) => sum + paper.internal,
              0,
            );
            return (
              <motion.div
                key={year.yearId}
                {...reveal(index * 0.08)}
                className="min-w-0 overflow-hidden rounded-2xl border border-navy/10 bg-white"
              >
                <div
                  className={`flex items-end justify-between gap-4 p-5 sm:p-6 ${index === 0 ? "bg-[#e5f3ee]" : "bg-[#fff0e4]"}`}
                >
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-navy">
                      ANM {year.yearId} year
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-navy/65">
                      {external} external + {internal} internal
                    </p>
                  </div>
                  <p className="text-right text-xs text-navy/65">
                    <span className="font-heading block text-4xl font-extrabold text-navy">
                      {external + internal}
                    </span>
                    total marks
                  </p>
                </div>
                <div
                  role="region"
                  aria-label={`ANM ${year.yearId} year marks table, scroll horizontally if needed`}
                  tabIndex={0}
                  className="overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange"
                >
                  <table className="w-full min-w-[460px] text-left text-sm text-navy">
                    <caption className="sr-only">
                      ANM {year.yearId} year examination marks by paper
                    </caption>
                    <thead className="border-b border-navy/10 text-[11px] uppercase tracking-wider text-navy/55">
                      <tr>
                        <th scope="col" className="px-5 py-4">
                          Paper
                        </th>
                        <th scope="col" className="px-2 py-4 text-center">
                          External
                        </th>
                        <th scope="col" className="px-2 py-4 text-center">
                          Internal
                        </th>
                        <th scope="col" className="px-4 py-4 text-right">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy/10">
                      {year.papers.map((paper) => (
                        <tr key={`${paper.type}-${paper.subject}`}>
                          <th
                            scope="row"
                            className="px-5 py-4 font-medium leading-6"
                          >
                            <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-navy/50">
                              {paper.type}
                            </span>
                            {paper.subject}
                          </th>
                          <td className="px-2 py-4 text-center tabular-nums">
                            {paper.external}
                          </td>
                          <td className="px-2 py-4 text-center tabular-nums">
                            {paper.internal}
                          </td>
                          <td className="px-4 py-4 text-right font-bold tabular-nums">
                            {paper.external + paper.internal}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-t border-navy/10 bg-cream/50 font-bold">
                      <tr>
                        <th scope="row" className="px-5 py-4">
                          Year total
                        </th>
                        <td className="px-2 py-4 text-center tabular-nums">
                          {external}
                        </td>
                        <td className="px-2 py-4 text-center tabular-nums">
                          {internal}
                        </td>
                        <td className="px-4 py-4 text-right tabular-nums">
                          {external + internal}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div {...reveal()} className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            [
              "Internal assessment",
              "Class tests, written assignments, clinical and community performance, and the records and reports you maintain contribute to internal assessment.",
            ],
            [
              "Passing requirements",
              "The published syllabus sets 50% aggregate in each nursing subject and requires theory and practical papers to be passed separately.",
            ],
            [
              "Attendance",
              "The syllabus requires at least 80% attendance in theory and practical in each subject for exam eligibility, and 100% practical-area attendance before certification.",
            ],
          ].map(([title, description]) => (
            <div key={title} className="rounded-2xl border border-navy/10 p-5">
              <h3 className="font-heading text-base font-bold text-navy">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-navy/65">
                {description}
              </p>
            </div>
          ))}
        </motion.div>
        <p className="mt-6 text-xs leading-6 text-navy/60">
          Sources:{" "}
          <a
            href={`${ANM_SOURCES.amendments}#page=4`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-sm font-semibold text-navy underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          >
            INC examination scheme
            <ArrowUpRight size={12} aria-hidden="true" />
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>{" "}
          and{" "}
          <a
            href={`${ANM_SOURCES.syllabus}#page=17`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm font-semibold text-navy underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          >
            syllabus examination rules
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
          . Check your nursing institution or examination board for the
          applicable timetable and notices.
        </p>
      </div>
    </section>
  );
}
