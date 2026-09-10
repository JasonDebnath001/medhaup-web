"use client";

import { motion } from "framer-motion";
import { ChevronDown, Download, Hourglass, ArrowRight } from "lucide-react";
import {
  NORCET_COURSE,
  NORCET_SUBJECT_GROUPS,
  NORCET_SUBJECTS,
} from "@/lib/norcet";
import type { NorcetResource } from "@/lib/data";
import { getFileDownloadUrl } from "@/lib/downloads";
import { FALLBACK_SUBJECT_ICON, NORCET_SUBJECT_ICONS } from "./subject-icons";

type Props = {
  /** A live "Syllabus" resource from the admin panel, if any. */
  syllabusDownload: NorcetResource | null;
};

export default function NorcetSyllabus({ syllabusDownload }: Props) {
  const totalTopics = NORCET_SUBJECTS.reduce(
    (sum, subject) => sum + subject.topics.length,
    0,
  );

  return (
    <section
      id="syllabus"
      className="scroll-mt-24 bg-white py-20 sm:py-24"
      aria-labelledby="norcet-syllabus-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <span className="inline-block rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy">
              Syllabus · {NORCET_SUBJECTS.length} subjects · {totalTopics} topic
              areas
            </span>
            <h2
              id="norcet-syllabus-heading"
              className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
            >
              Every topic,{" "}
              <span className="text-orange">subject by subject</span>
            </h2>
            <p className="mt-4 text-navy/65">
              The NORCET syllabus is the B.Sc and GNM nursing curriculum,
              tested the AIIMS way. Open any subject to see what it actually
              covers.
            </p>
          </div>

          {syllabusDownload ? (
            <a
              href={getFileDownloadUrl(syllabusDownload.fileUrl)}
              download
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-dark"
            >
              <Download
                size={17}
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              />
              Download NORCET syllabus PDF
              {syllabusDownload.fileSize && (
                <span className="text-white/55">· {syllabusDownload.fileSize}</span>
              )}
            </a>
          ) : (
            <a
              href={NORCET_COURSE.waitlistAnchor}
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-teal/40 bg-teal/10 px-5 py-3 text-sm font-semibold text-teal-dark transition-colors hover:bg-teal/15"
            >
              <Hourglass size={16} />
              Syllabus PDF coming soon. Waitlist gets it first
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          )}
        </motion.div>

        <div className="mt-12 space-y-10">
          {NORCET_SUBJECT_GROUPS.map((group, groupIndex) => {
            const subjects = NORCET_SUBJECTS.filter(
              (subject) => subject.group === group,
            );
            if (subjects.length === 0) return null;
            return (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45 }}
              >
                <h3 className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-navy/55">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-6 rounded-full bg-teal"
                  />
                  {group}
                </h3>
                <div className="space-y-3">
                  {subjects.map((subject, i) => {
                    const Icon =
                      NORCET_SUBJECT_ICONS[subject.id] ?? FALLBACK_SUBJECT_ICON;
                    const [min, max] = subject.approxQuestions;
                    return (
                      <details
                        key={subject.id}
                        open={groupIndex === 0 && i === 0}
                        className="group rounded-2xl border border-navy/10 bg-cream transition-colors open:border-teal/40 open:bg-white open:shadow-lg open:shadow-navy/5"
                      >
                        <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 marker:hidden [&::-webkit-details-marker]:hidden">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy text-white transition-colors group-open:bg-teal">
                            <Icon size={18} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="font-heading block text-base font-bold text-navy">
                              {subject.name}
                            </span>
                            <span className="mt-0.5 block text-xs text-navy/55">
                              {subject.topics.length} topic areas · ~
                              {min === max ? min : `${min}–${max}`} questions
                            </span>
                          </span>
                          <ChevronDown
                            size={18}
                            className="shrink-0 text-navy/45 transition-transform duration-200 group-open:rotate-180"
                          />
                        </summary>
                        <div className="border-t border-navy/8 px-5 pb-5 pt-4">
                          <p className="text-sm leading-relaxed text-navy/65">
                            {subject.blurb}
                          </p>
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {subject.topics.map((topic) => (
                              <li
                                key={topic}
                                className="rounded-full border border-navy/10 bg-white px-3.5 py-1.5 text-xs font-medium text-navy/80"
                              >
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
