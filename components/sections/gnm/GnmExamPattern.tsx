"use client";

import { motion } from "framer-motion";
import { ClipboardList, Download } from "lucide-react";
import {
  GNM_DOWNLOADS,
  GNM_FIRST_YEAR_EXAM,
  GNM_INTERNAL_ASSESSMENT,
} from "@/lib/gnm";
import { useGnmMotion } from "./useGnmMotion";

export default function GnmExamPattern() {
  const { reveal, reduceMotion } = useGnmMotion();
  const total = GNM_FIRST_YEAR_EXAM.reduce(
    (sum, row) => ({
      written: sum.written + row.written,
      internal: sum.internal + row.internal,
      practical: sum.practical + row.practical,
    }),
    { written: 0, internal: 0, practical: 0 },
  );

  return (
    <section
      id="exam-pattern"
      aria-labelledby="gnm-exam-heading"
      className="scroll-mt-28 bg-cream px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          {...reveal()}
          className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-dark">
              <ClipboardList size={16} aria-hidden="true" />
              1st year · Exam pattern
            </span>
            <h2
              id="gnm-exam-heading"
              className="font-heading mt-4 text-3xl font-extrabold text-navy sm:text-4xl"
            >
              Understand all{" "}
              <span className="text-orange-dark">500 marks.</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-navy/65">
              Four theory papers and one practical component. Here&apos;s the
              breakdown from medhaup&apos;s GNM first-year exam-pattern sheet.
            </p>
          </div>
          <a
            href={GNM_DOWNLOADS["1st"][2].href}
            download
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          >
            <Download size={17} aria-hidden="true" />
            Download exam pattern
          </a>
        </motion.div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            {
              value: total.written,
              label: "Written examination",
              detail: "4 papers × 75 marks",
            },
            {
              value: total.internal,
              label: "Internal assessment",
              detail: "4 × 25 theory + 50 practical internal",
            },
            {
              value: total.practical,
              label: "Practical examination",
              detail: "Fundamentals of Nursing",
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              {...reveal(index * 0.08)}
              className="rounded-2xl border border-navy/10 bg-white p-5"
            >
              <p className="font-heading text-4xl font-extrabold text-navy">
                {item.value}
                <span className="ml-2 text-xs font-semibold text-navy/55">
                  marks
                </span>
              </p>
              <p className="mt-3 text-sm font-bold text-navy">{item.label}</p>
              <p className="mt-1 text-xs leading-5 text-navy/60">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...reveal()}
          className="mt-6 overflow-hidden rounded-2xl border border-navy/10 bg-white"
        >
          <div
            role="region"
            aria-label="First-year subject-wise marks, scroll horizontally on small screens"
            tabIndex={0}
            className="overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange"
          >
            <table className="w-full min-w-[620px] text-left text-sm">
              <caption className="sr-only">
                GNM first-year subject-wise marks distribution, total 500 marks
              </caption>
              <thead className="bg-navy text-white">
                <tr>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Subject
                  </th>
                  {["Written", "Internal", "Practical", "Total"].map(
                    (label) => (
                      <th
                        key={label}
                        scope="col"
                        className="px-4 py-4 text-center font-semibold"
                      >
                        {label}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/10">
                {GNM_FIRST_YEAR_EXAM.map((row) => (
                  <tr key={row.subject}>
                    <th scope="row" className="px-5 py-4 font-medium text-navy">
                      {row.subject}
                    </th>
                    {[row.written, row.internal, row.practical].map(
                      (marks, i) => (
                        <td
                          key={i}
                          className="px-4 py-4 text-center tabular-nums text-navy/75"
                        >
                          {marks || <span aria-label="Not applicable">—</span>}
                        </td>
                      ),
                    )}
                    <td className="px-4 py-4 text-center font-bold tabular-nums text-navy">
                      {row.written + row.internal + row.practical}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-orange/10 font-bold text-navy">
                <tr>
                  <th scope="row" className="px-5 py-4">
                    Grand total
                  </th>
                  {[
                    total.written,
                    total.internal,
                    total.practical,
                    total.written + total.internal + total.practical,
                  ].map((marks, i) => (
                    <td key={i} className="px-4 py-4 text-center tabular-nums">
                      {marks}
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </motion.div>
        <p className="mt-3 text-xs leading-6 text-navy/60">
          This marks sheet covers the four theory papers above and one
          practical. English and Computer Education are in the syllabus, but
          this sheet does not assign them separate marks.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <motion.div
            {...reveal()}
            className="rounded-2xl border border-navy/10 bg-white p-6 sm:p-7"
          >
            <h3 className="font-heading text-lg font-bold text-navy">
              Inside a 75-mark theory paper
            </h3>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <p className="font-heading text-3xl font-extrabold text-navy">
                  55
                </p>
                <p className="mt-1 text-sm leading-6 text-navy/65">
                  Subjective / descriptive marks
                </p>
              </div>
              <div>
                <p className="font-heading text-3xl font-extrabold text-orange-dark">
                  20
                </p>
                <p className="mt-1 text-sm leading-6 text-navy/65">
                  Objective marks
                </p>
              </div>
            </div>
            <motion.div
              aria-hidden="true"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0 : 0.7 }}
              className="mt-5 flex h-3 origin-left overflow-hidden rounded-full"
            >
              <div
                style={{ width: `${(55 / 75) * 100}%` }}
                className="bg-navy"
              />
              <div className="flex-1 bg-orange" />
            </motion.div>
          </motion.div>
          <motion.div
            {...reveal(0.1)}
            className="rounded-2xl border border-navy/10 bg-white p-6 sm:p-7"
          >
            <h3 className="font-heading text-lg font-bold text-navy">
              What goes into internal assessment?
            </h3>
            <p className="mt-2 text-sm leading-6 text-navy/65">
              The sheet describes assessment based on overall academic
              performance:
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {GNM_INTERNAL_ASSESSMENT.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-navy"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
