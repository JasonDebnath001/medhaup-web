"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCourseMotion } from "@/components/ui/useCourseMotion";
import {
  JENPAS_PAPERS,
  JENPAS_SOURCES,
  getJenpasPaperTotals,
} from "@/lib/jenpas";

export default function JenpasExamPattern() {
  const { reveal } = useCourseMotion();
  return (
    <section
      id="exam-pattern"
      aria-labelledby="jenpas-exam-heading"
      className="scroll-mt-28 bg-cream px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal()} className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
            The WBJEEB 2026 pattern
          </p>
          <h2
            id="jenpas-exam-heading"
            className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
          >
            Know where every mark comes from.
          </h2>
          <p className="mt-4 leading-7 text-navy/65">
            Both papers use multiple-choice questions on an OMR answer sheet.
            Each has two question categories with different scoring rules.
          </p>
        </motion.div>
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            ["100", "questions per paper"],
            ["115", "marks per paper"],
            ["90 min", "per paper"],
            ["OMR", "pen-and-paper exam"],
          ].map(([value, label], index) => (
            <motion.div
              key={label}
              {...reveal(index * 0.06)}
              className="rounded-2xl bg-navy p-5 text-white sm:p-6"
            >
              <p className="font-heading text-3xl font-extrabold tracking-tight text-orange sm:text-4xl">
                {value}
              </p>
              <p className="mt-3 text-xs leading-6 text-white/75">{label}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 grid items-start gap-5 lg:grid-cols-2">
          {JENPAS_PAPERS.map((paper, index) => {
            const totals = getJenpasPaperTotals(paper.subjects);
            return (
              <motion.div
                key={paper.id}
                {...reveal(index * 0.08)}
                className="min-w-0 overflow-hidden rounded-2xl border border-navy/10 bg-white"
              >
                <div className={`${paper.surface} p-5`}>
                  <h3 className="font-heading text-xl font-extrabold text-navy">
                    {paper.label}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-navy/65">
                    {paper.title}
                  </p>
                </div>
                <div
                  role="region"
                  aria-label={`${paper.label} question and marks table, scroll horizontally if needed`}
                  tabIndex={0}
                  className="overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange"
                >
                  <table className="w-full min-w-[460px] text-left text-sm text-navy">
                    <caption className="sr-only">
                      JENPAS {paper.label} questions by category and total marks
                    </caption>
                    <thead className="border-b border-navy/10 text-[11px] uppercase tracking-wider text-navy/55">
                      <tr>
                        <th scope="col" className="px-5 py-4">
                          Subject
                        </th>
                        <th scope="col" className="px-2 py-4 text-center">
                          Cat. 1<br />1 mark
                        </th>
                        <th scope="col" className="px-2 py-4 text-center">
                          Cat. 2<br />2 marks
                        </th>
                        <th scope="col" className="px-2 py-4 text-center">
                          Questions
                        </th>
                        <th scope="col" className="px-4 py-4 text-right">
                          Marks
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy/10">
                      {paper.subjects.map((subject) => (
                        <tr key={subject.name}>
                          <th
                            scope="row"
                            className="px-5 py-4 font-medium leading-6"
                          >
                            {subject.name}
                          </th>
                          <td className="px-2 py-4 text-center tabular-nums">
                            {subject.category1}
                          </td>
                          <td className="px-2 py-4 text-center tabular-nums">
                            {subject.category2}
                          </td>
                          <td className="px-2 py-4 text-center tabular-nums">
                            {subject.category1 + subject.category2}
                          </td>
                          <td className="px-4 py-4 text-right font-bold tabular-nums">
                            {subject.category1 + 2 * subject.category2}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-t border-navy/10 bg-cream/50 font-bold">
                      <tr>
                        <th scope="row" className="px-5 py-4">
                          Total
                        </th>
                        <td className="px-2 py-4 text-center tabular-nums">
                          {totals.category1}
                        </td>
                        <td className="px-2 py-4 text-center tabular-nums">
                          {totals.category2}
                        </td>
                        <td className="px-2 py-4 text-center tabular-nums">
                          {totals.questions}
                        </td>
                        <td className="px-4 py-4 text-right tabular-nums">
                          {totals.marks}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <motion.article
            {...reveal()}
            className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-6"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-orange-dark">
              Category 1 · 85 questions
            </p>
            <h3 className="font-heading mt-3 text-xl font-extrabold text-navy">
              One correct option.
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-4 text-sm leading-7 text-navy/70 marker:text-orange-dark">
              <li>
                Correct answer: <strong className="text-navy">+1 mark</strong>.
              </li>
              <li>
                Wrong answer: <strong className="text-navy">−0.25 mark</strong>.
              </li>
              <li>Marking more than one option counts as a wrong answer.</li>
              <li>Unanswered question: 0 marks.</li>
            </ul>
          </motion.article>
          <motion.article
            {...reveal(0.08)}
            className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-6"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-orange-dark">
              Category 2 · 15 questions
            </p>
            <h3 className="font-heading mt-3 text-xl font-extrabold text-navy">
              One or more correct options.
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-4 text-sm leading-7 text-navy/70 marker:text-orange-dark">
              <li>
                Select all correct options, and no incorrect ones:{" "}
                <strong className="text-navy">+2 marks</strong>.
              </li>
              <li>Select any incorrect option: 0 marks.</li>
              <li>Select only some correct options: proportional credit.</li>
              <li>Unanswered question: 0 marks. No negative marking.</li>
            </ul>
            <p className="mt-4 rounded-xl bg-cream p-3 text-xs leading-6 text-navy/75">
              Partial credit = 2 × correct options selected ÷ all correct
              options. Example: selecting 1 of 2 correct options, with no wrong
              option, earns 1 mark.
            </p>
          </motion.article>
        </div>
        <motion.div
          {...reveal()}
          className="mt-6 rounded-2xl border border-navy/10 p-5"
        >
          <h3 className="font-heading font-bold text-navy">
            Language and answer sheet
          </h3>
          <p className="mt-2 text-sm leading-7 text-navy/65">
            The bulletin specifies English and Bengali questions, except Basic
            English, Logical Reasoning and General Knowledge. Answer by filling
            the appropriate OMR bubbles with a blue or black ballpoint pen;
            marked responses cannot be changed.
          </p>
        </motion.div>
        <a
          href={`${JENPAS_SOURCES.bulletin}#page=7`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 rounded-sm text-xs font-bold text-navy underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
        >
          Read WBJEEB’s paper structure and scoring rules
          <ArrowUpRight size={14} aria-hidden="true" />
          <span className="sr-only"> (PDF, opens in a new tab)</span>
        </a>
      </div>
    </section>
  );
}
