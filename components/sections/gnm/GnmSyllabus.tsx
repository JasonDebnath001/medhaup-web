"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  Download,
  FileText,
  Stethoscope,
} from "lucide-react";
import { GNM_DOWNLOADS, GNM_INTERNSHIP, GNM_YEARS } from "@/lib/gnm";
import { GNM_CURRICULUM, type GnmSubject } from "@/lib/gnm-syllabus";
import { useGnmMotion } from "./useGnmMotion";

function SubjectDetails({
  subject,
  open = false,
}: {
  subject: GnmSubject;
  open?: boolean;
}) {
  return (
    <details
      open={open}
      className="group rounded-2xl border border-navy/10 bg-cream transition-colors open:border-orange/40 open:bg-white"
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 rounded-2xl px-4 py-4 marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:px-5 [&::-webkit-details-marker]:hidden">
        <BookOpen
          size={18}
          className="shrink-0 text-orange-dark"
          aria-hidden="true"
        />
        <span className="min-w-0 flex-1">
          <span className="font-heading block text-sm font-bold leading-6 text-navy sm:text-base">
            {subject.name}
          </span>
          <span className="mt-1 block text-xs leading-5 text-navy/60">
            {subject.hours}
            {subject.note ? " · Source note below" : ""}
          </span>
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 text-navy/60 transition-transform group-open:rotate-180 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </summary>
      <div className="border-t border-navy/10 px-4 pb-5 pt-4 sm:px-5">
        <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {subject.topics.map((topic) => (
            <li
              key={topic}
              className="flex items-start gap-2.5 text-sm leading-6 text-navy/75"
            >
              <span
                aria-hidden="true"
                className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-orange-dark"
              />
              {topic}
            </li>
          ))}
        </ul>
        {subject.note && (
          <p className="mt-5 rounded-xl border border-orange/20 bg-orange/5 px-4 py-3 text-xs leading-6 text-navy/70">
            <span className="font-semibold text-navy">Source note: </span>
            {subject.note}
          </p>
        )}
      </div>
    </details>
  );
}

export default function GnmSyllabus() {
  const [activeYear, setActiveYear] = useState("1st");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { reveal, reduceMotion } = useGnmMotion();

  function handleTabKey(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % GNM_YEARS.length;
    else if (event.key === "ArrowLeft")
      nextIndex = (index + GNM_YEARS.length - 1) % GNM_YEARS.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = GNM_YEARS.length - 1;
    else return;
    event.preventDefault();
    setActiveYear(GNM_YEARS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section
      id="syllabus"
      aria-labelledby="gnm-syllabus-heading"
      className="scroll-mt-28 bg-white px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal()} className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
            Your subjects, in detail
          </p>
          <h2
            id="gnm-syllabus-heading"
            className="font-heading mt-4 text-3xl font-extrabold text-navy sm:text-4xl"
          >
            A clearer plan for every year.
          </h2>
          <p className="mt-4 leading-7 text-navy/65">
            Choose your year and open a subject to explore the topic headings.
            Download the full medhaup PDFs for learning objectives, detailed
            content and clinical activities.
          </p>
          <p className="mt-3 text-xs leading-6 text-navy/60">
            Hours refer to the academic syllabus. medhaup batch timings are
            coming soon.
          </p>
        </motion.div>

        <div
          role="tablist"
          aria-label="GNM syllabus year"
          className="mt-8 grid grid-cols-3 gap-2 rounded-2xl bg-cream p-2 sm:max-w-lg"
        >
          {GNM_YEARS.map((year, index) => (
            <button
              key={year.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`syllabus-tab-${year.id}`}
              type="button"
              role="tab"
              aria-selected={activeYear === year.id}
              aria-controls={`syllabus-panel-${year.id}`}
              tabIndex={activeYear === year.id ? 0 : -1}
              onClick={() => setActiveYear(year.id)}
              onKeyDown={(event) => handleTabKey(event, index)}
              className={`relative rounded-xl px-3 py-3.5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${activeYear === year.id ? "text-white" : "text-navy/70 hover:text-navy"}`}
            >
              {activeYear === year.id && (
                <motion.span
                  layoutId={
                    reduceMotion ? undefined : "gnm-syllabus-active-year"
                  }
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-xl bg-navy"
                />
              )}
              <span className="relative z-10">{year.label}</span>
            </button>
          ))}
        </div>

        {GNM_CURRICULUM.map((year) => (
          <motion.div
            key={year.yearId}
            id={`syllabus-panel-${year.yearId}`}
            role="tabpanel"
            aria-labelledby={`syllabus-tab-${year.yearId}`}
            tabIndex={0}
            hidden={activeYear !== year.yearId}
            initial={false}
            animate={{
              opacity: activeYear === year.yearId ? 1 : 0,
              y: reduceMotion || activeYear === year.yearId ? 0 : 8,
            }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="mt-7 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          >
            <h3 className="font-heading text-2xl font-extrabold text-navy">
              GNM {year.yearId} year syllabus
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-navy/65">
              {year.summary}
            </p>

            <div className="mb-9 mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {GNM_DOWNLOADS[year.yearId].map((file) => (
                <a
                  key={file.href}
                  href={file.href}
                  download
                  className="group/download flex items-center gap-3 rounded-2xl border border-navy/10 bg-white p-4 transition-colors hover:border-orange/50 hover:bg-orange/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy/5 text-navy">
                    <FileText size={19} aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-bold text-navy">
                      {file.label}
                    </span>
                    <span className="mt-1 block text-xs text-navy/60">
                      PDF · {file.pages} {file.pages === 1 ? "page" : "pages"}
                    </span>
                  </span>
                  <Download
                    size={17}
                    className="shrink-0 text-orange-dark transition-transform group-hover/download:translate-y-0.5 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>

            <div className="space-y-7">
              {year.groups.map((group, groupIndex) => (
                <div key={group.name}>
                  <h4 className="mb-3 text-xs font-bold uppercase leading-6 tracking-wider text-navy/60">
                    {group.name}
                  </h4>
                  <div className="space-y-3">
                    {group.subjects.map((subject, index) => (
                      <SubjectDetails
                        key={subject.name}
                        subject={subject}
                        open={groupIndex === 0 && index === 0}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 border-t border-navy/10 pt-7">
              <h4 className="font-heading mb-4 flex items-center gap-2 text-lg font-bold text-navy">
                <Stethoscope
                  size={20}
                  className="text-orange-dark"
                  aria-hidden="true"
                />
                Practical &amp; clinical learning
              </h4>
              <div className="space-y-3">
                {year.practical.map((subject) => (
                  <SubjectDetails key={subject.name} subject={subject} />
                ))}
              </div>
            </div>

            {year.yearId === "3rd" && (
              <div className="mt-8 rounded-2xl border border-navy/10 bg-cream p-4 sm:p-6">
                <h4 className="font-heading text-lg font-bold text-navy">
                  Part II · Integrated supervised internship
                </h4>
                <p className="mt-2 text-sm leading-6 text-navy/65">
                  The third-year PDF lists the following rotation schedule.
                </p>
                <div
                  role="region"
                  aria-label="Third-year internship rotation, scroll horizontally on small screens"
                  tabIndex={0}
                  className="mt-5 overflow-x-auto rounded-xl border border-navy/10 bg-white focus-visible:outline-2 focus-visible:outline-orange"
                >
                  <table className="w-full min-w-[460px] text-left text-sm">
                    <caption className="sr-only">
                      GNM third-year internship rotation hours and weeks
                    </caption>
                    <thead className="bg-navy text-white">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-semibold">
                          Rotation
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right font-semibold"
                        >
                          Hours
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right font-semibold"
                        >
                          Weeks
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy/10">
                      {GNM_INTERNSHIP.map((item) => (
                        <tr key={item.area}>
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium text-navy"
                          >
                            {item.area}
                          </th>
                          <td className="px-4 py-3 text-right tabular-nums text-navy/70">
                            {item.hours}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums text-navy/70">
                            {item.weeks}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-orange/10 font-bold text-navy">
                      <tr>
                        <th scope="row" className="px-4 py-3">
                          Total
                        </th>
                        <td className="px-4 py-3 text-right">
                          {GNM_INTERNSHIP.reduce(
                            (sum, item) => sum + item.hours,
                            0,
                          ).toLocaleString("en-IN")}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {GNM_INTERNSHIP.reduce(
                            (sum, item) => sum + item.weeks,
                            0,
                          )}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <p className="mt-4 text-xs leading-6 text-navy/65">
                  The PDF specifies 43 clinical hours plus 5 theory hours per
                  week, with clinical postings supervised by teaching faculty.
                  Hours and durations are reproduced as listed.
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
