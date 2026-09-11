"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  ClipboardList,
  FlaskConical,
} from "lucide-react";
import { useCourseMotion } from "@/components/ui/useCourseMotion";
import {
  DPHARMACY_CURRICULUM,
  DPHARMACY_SOURCES,
  getDPharmacyTotals,
} from "@/lib/dpharmacy-syllabus";

const FINAL_PAPERS = [
  {
    title: "Final theory paper",
    icon: ClipboardList,
    rows: [
      ["Long answers", "Answer 6 of 7 · 6 × 5", 30],
      ["Short answers", "Answer 10 of 11 · 10 × 3", 30],
      ["Objective questions", "Answer all 20 · 20 × 1", 20],
    ],
  },
  {
    title: "Final practical paper",
    icon: FlaskConical,
    rows: [
      ["Synopsis", "Written overview", 10],
      ["Experiments", "Major / minor / spotters, as applicable", 60],
      ["Viva voce", "Oral examination", 10],
    ],
  },
] as const;

export default function DPharmacyExamPattern() {
  const { reveal } = useCourseMotion();

  return (
    <section
      id="exam-pattern"
      aria-labelledby="dpharmacy-exam-heading"
      className="scroll-mt-28 bg-cream px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal()} className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
            Know your exam
          </p>
          <h2
            id="dpharmacy-exam-heading"
            className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
          >
            The marks behind each year.
          </h2>
          <p className="mt-4 leading-7 text-navy/65">
            Each theory and practical paper carries{" "}
            <strong className="font-semibold text-navy">
              80 final-exam marks + 20 internal-assessment marks
            </strong>{" "}
            under PCI ER-2020. Theory and practical are assessed separately.
          </p>
        </motion.div>

        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          {DPHARMACY_CURRICULUM.map((year, index) => {
            const totals = getDPharmacyTotals(year.subjects);
            return (
              <motion.div
                key={year.yearId}
                {...reveal(index * 0.08)}
                className="min-w-0 overflow-hidden rounded-2xl border border-navy/10 bg-white"
              >
                <div
                  className={`flex items-end justify-between gap-4 p-5 sm:p-6 ${index === 0 ? "bg-[#ede9fb]" : "bg-[#fff0e4]"}`}
                >
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-navy">
                      {year.yearId} year
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-navy/65">
                      {totals.theoryMarks} theory + {totals.practicalMarks}{" "}
                      practical
                    </p>
                  </div>
                  <p className="text-right text-xs text-navy/65">
                    <span className="font-heading block text-3xl font-extrabold text-navy">
                      {(
                        totals.theoryMarks + totals.practicalMarks
                      ).toLocaleString("en-IN")}
                    </span>
                    total marks
                  </p>
                </div>
                <div
                  role="region"
                  aria-label={`D.Pharmacy ${year.yearId} year marks table, scroll horizontally if needed`}
                  tabIndex={0}
                  className="overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange"
                >
                  <table className="w-full min-w-[460px] text-left text-sm text-navy">
                    <caption className="sr-only">
                      D.Pharmacy {year.yearId} year subject-wise maximum marks,
                      including internal assessment
                    </caption>
                    <thead className="border-b border-navy/10 text-[11px] uppercase tracking-wider text-navy/55">
                      <tr>
                        <th scope="col" className="px-5 py-4">
                          Subject
                        </th>
                        <th scope="col" className="px-2 py-4 text-center">
                          Theory
                        </th>
                        <th scope="col" className="px-2 py-4 text-center">
                          Practical
                        </th>
                        <th scope="col" className="px-4 py-4 text-right">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy/10">
                      {year.subjects.map((subject) => (
                        <tr key={subject.code}>
                          <th
                            scope="row"
                            className="px-5 py-4 font-medium leading-6"
                          >
                            {subject.name}
                          </th>
                          <td className="px-2 py-4 text-center tabular-nums">
                            100
                          </td>
                          <td className="px-2 py-4 text-center tabular-nums">
                            {subject.practicalHours > 0 ? (
                              "100"
                            ) : (
                              <>
                                <span aria-hidden="true">—</span>
                                <span className="sr-only">Not applicable</span>
                              </>
                            )}
                          </td>
                          <td className="px-4 py-4 text-right font-bold tabular-nums">
                            {subject.practicalHours > 0 ? 200 : 100}
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
                          {totals.theoryMarks}
                        </td>
                        <td className="px-2 py-4 text-center tabular-nums">
                          {totals.practicalMarks}
                        </td>
                        <td className="px-4 py-4 text-right tabular-nums">
                          {(
                            totals.theoryMarks + totals.practicalMarks
                          ).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {FINAL_PAPERS.map((paper, index) => (
            <motion.article
              key={paper.title}
              {...reveal(index * 0.08)}
              className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <paper.icon
                  size={21}
                  className="text-orange-dark"
                  aria-hidden="true"
                />
                <h3 className="font-heading text-lg font-extrabold text-navy">
                  {paper.title}
                </h3>
              </div>
              <p className="mt-2 text-xs font-semibold text-navy/60">
                3 hours · 80 marks
              </p>
              <dl className="mt-5 divide-y divide-navy/10">
                {paper.rows.map(([label, detail, marks]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <dt className="text-sm font-semibold text-navy">
                      {label}
                      <span className="mt-1 block text-xs font-normal leading-5 text-navy/60">
                        {detail}
                      </span>
                    </dt>
                    <dd className="shrink-0 text-sm font-bold tabular-nums text-navy">
                      {marks} marks
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.article>
          ))}
        </div>

        <motion.details
          {...reveal()}
          className="group mt-5 rounded-2xl border border-navy/10 bg-white"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 font-heading text-base font-bold text-navy marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:p-6 [&::-webkit-details-marker]:hidden">
            How the 20 internal marks are calculated
            <ChevronDown
              size={19}
              className="shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </summary>
          <div className="grid gap-6 border-t border-navy/10 p-5 text-sm leading-7 text-navy/70 sm:p-6 md:grid-cols-2">
            <div>
              <h3 className="font-heading font-bold text-navy">
                Theory sessionals
              </h3>
              <p className="mt-2">
                At least two exams per academic year. Each is 90 minutes and 40
                marks, scaled to 20; the best two performances are averaged.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 marker:text-orange-dark">
                <li>Long answers: answer 3 of 4, 3 × 5 = 15 marks.</li>
                <li>Short answers: answer 5 of 6, 5 × 3 = 15 marks.</li>
                <li>Objective questions: all 10, 10 × 1 = 10 marks.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-bold text-navy">
                Practical sessionals
              </h3>
              <p className="mt-2">
                At least two exams, each lasting 3 hours: synopsis 10,
                experiments 50, viva 10 and practical record 10, totalling 80
                marks.
              </p>
              <p className="mt-3">
                These are scaled to 10 using the best two performances. The
                other 10 come from assignments and field-visit reports: 5 each
                when both apply, or 10 for the single applicable activity. If
                neither applies, all 20 come from sessionals.
              </p>
            </div>
          </div>
        </motion.details>

        <motion.div {...reveal()} className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-navy/10 p-5">
            <h3 className="font-heading text-lg font-extrabold text-navy">
              40% to pass each paper
            </h3>
            <p className="mt-2 text-sm leading-6 text-navy/65">
              ER-2020 requires at least 40% in theory and practical separately
              for each subject, including sessional marks.
            </p>
          </div>
          <div className="rounded-2xl border border-navy/10 p-5">
            <h3 className="font-heading text-lg font-extrabold text-navy">
              75% attendance minimum
            </h3>
            <p className="mt-2 text-sm leading-6 text-navy/65">
              For exam eligibility, attend at least 75% of theory classes and
              practical classes separately in each subject.
            </p>
          </div>
        </motion.div>
        <p className="mt-6 text-xs leading-6 text-navy/60">
          Sources:{" "}
          <a
            href={`${DPHARMACY_SOURCES.regulations}#page=14`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-sm font-semibold text-navy underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          >
            PCI ER-2020 marks and exam rules{" "}
            <ArrowUpRight size={12} aria-hidden="true" />
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>{" "}
          and{" "}
          <a
            href={`${DPHARMACY_SOURCES.syllabus}#page=13`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-sm font-semibold text-navy underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          >
            question-paper guidelines{" "}
            <ArrowUpRight size={12} aria-hidden="true" />
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
          . Follow your institution&apos;s exam notices for dates and
          instructions.
        </p>
      </div>
    </section>
  );
}
