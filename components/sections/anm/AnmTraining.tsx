"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import { useCourseMotion } from "@/components/ui/useCourseMotion";
import { ANM_INTERNSHIP, ANM_SOURCES } from "@/lib/anm-syllabus";

export default function AnmTraining() {
  const { reveal, reduceMotion } = useCourseMotion();
  const hospital = ANM_INTERNSHIP.reduce((sum, area) => sum + area.hospital, 0);
  const community = ANM_INTERNSHIP.reduce(
    (sum, area) => sum + area.community,
    0,
  );
  return (
    <section
      id="practical-training"
      aria-labelledby="anm-training-heading"
      className="scroll-mt-28 bg-white px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal()} className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
            Your second-year internship
          </p>
          <h2
            id="anm-training-heading"
            className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
          >
            Grow through supervised practice.
          </h2>
          <p className="mt-4 leading-7 text-navy/65">
            ANM spans two years: 18 months of study followed by a six-month
            internship. The internship is included within 2nd year and builds on
            your earlier clinical placements.
          </p>
        </motion.div>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            ["6 months", "supervised internship"],
            [String(hospital + community), "total internship hours"],
            [String(community), "hours in the community"],
          ].map(([value, label], index) => (
            <motion.div
              key={label}
              {...reveal(index * 0.08)}
              className="rounded-2xl bg-navy p-6 text-white"
            >
              <p className="font-heading text-4xl font-extrabold tracking-tight text-orange">
                {value}
              </p>
              <p className="mt-3 text-sm text-white/75">{label}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          {...reveal()}
          className="mt-6 overflow-hidden rounded-2xl border border-navy/10"
        >
          <div
            role="region"
            aria-label="ANM internship placement hours, scroll horizontally if needed"
            tabIndex={0}
            className="overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange"
          >
            <table className="w-full min-w-[530px] text-left text-sm text-navy">
              <caption className="sr-only">
                ANM second-year internship hours by placement
              </caption>
              <thead className="bg-[#e5f3ee] text-xs">
                <tr>
                  <th scope="col" className="px-5 py-4">
                    Placement
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    Hospital
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    Community
                  </th>
                  <th scope="col" className="px-5 py-4 text-right">
                    Total hours
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/10">
                {ANM_INTERNSHIP.map((area) => (
                  <tr key={area.area}>
                    <th scope="row" className="px-5 py-4 font-medium leading-6">
                      {area.area}
                    </th>
                    <td className="px-4 py-4 text-center tabular-nums">
                      {area.hospital}
                    </td>
                    <td className="px-4 py-4 text-center tabular-nums">
                      {area.community}
                    </td>
                    <td className="px-5 py-4 text-right font-bold tabular-nums">
                      {area.hospital + area.community}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-navy/10 bg-cream font-bold">
                <tr>
                  <th scope="row" className="px-5 py-4">
                    Total
                  </th>
                  <td className="px-4 py-4 text-center tabular-nums">
                    {hospital}
                  </td>
                  <td className="px-4 py-4 text-center tabular-nums">
                    {community}
                  </td>
                  <td className="px-5 py-4 text-right tabular-nums">
                    {hospital + community}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </motion.div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <motion.div {...reveal()} className="rounded-2xl bg-cream p-6">
            <h3 className="font-heading text-lg font-extrabold text-navy">
              Hospital and community experience
            </h3>
            <p className="mt-3 text-sm leading-7 text-navy/70">
              Midwifery hospital placements include antenatal care, labour-room
              experience, postnatal care and neonatal care. The internship also
              includes child-health practice and community health services.
            </p>
            <p className="mt-3 text-sm leading-7 text-navy/70">
              INC specifies four weeks at a sub-centre or primary health centre
              with a regular ANM for supervised practice in the community.
            </p>
          </motion.div>
          <motion.div {...reveal(0.08)} className="rounded-2xl bg-cream p-6">
            <h3 className="font-heading text-lg font-extrabold text-navy">
              Clinical records and completion
            </h3>
            <p className="mt-3 text-sm leading-7 text-navy/70">
              Maintain your casebook and competency record, with the required
              signatures. INC’s amendment requires at least 80% of clinical
              requirements before the final examination and full completion,
              competencies and internship certification before the diploma is
              awarded.
            </p>
            <a
              href={`${ANM_SOURCES.amendments}#page=3`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 rounded-sm text-sm font-bold text-orange-dark underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            >
              Read the internship guidelines
              <ArrowUpRight size={15} aria-hidden="true" />
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
          </motion.div>
        </div>
        <div
          id="resources"
          className="mt-14 scroll-mt-28 border-t border-navy/10 pt-9"
        >
          <motion.div {...reveal()}>
            <h3 className="font-heading text-2xl font-extrabold text-navy">
              Your official reference PDFs.
            </h3>
            <p className="mt-3 text-sm leading-7 text-navy/65">
              Open and save the source documents for the full chapters, clinical
              competencies and exam scheme.
            </p>
          </motion.div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Full ANM syllabus",
                publisher: "Arunachal Pradesh Nursing Council",
                detail:
                  "The two-year syllabus, learning objectives, clinical activities and examination rules.",
                href: ANM_SOURCES.syllabus,
              },
              {
                title: "INC syllabus amendments",
                publisher: "Indian Nursing Council",
                detail:
                  "Course structure, academic hours, examination marks and internship requirements.",
                href: ANM_SOURCES.amendments,
              },
            ].map((file, index) => (
              <motion.a
                key={file.title}
                {...reveal(index * 0.08)}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                href={file.href}
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
                  <span className="text-[10px] font-bold uppercase leading-5 tracking-wider text-navy/55">
                    {file.publisher} · PDF
                  </span>
                  <span className="font-heading mt-2 block text-base font-extrabold text-navy">
                    {file.title}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-navy/65">
                    {file.detail}
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
