"use client";

import { motion } from "framer-motion";
import {
  Dna,
  FlaskConical,
  Calculator,
  BookOpenText,
  Globe2,
  Puzzle,
  Download,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { SUBJECT_SYLLABI } from "@/lib/syllabus";

/* Icon per subject — keyed by the id in lib/syllabus.ts so the
   data file stays plain (serializable) and the visuals live here. */
const SUBJECT_ICONS: Record<string, LucideIcon> = {
  biology: Dna,
  "physical-science": FlaskConical,
  mathematics: Calculator,
  english: BookOpenText,
  "general-knowledge": Globe2,
  "logical-reasoning": Puzzle,
};

export default function SubjectSyllabus() {
  return (
    <section
      id="subject-syllabus"
      className="relative scroll-mt-24 overflow-hidden bg-cream py-20 sm:py-28"
    >
      {/* Faint grid, same treatment as the hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1a0c70 1px, transparent 1px), linear-gradient(to bottom, #1a0c70 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* ---------- Heading ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-2xl"
        >
          <span className="inline-block rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy">
            Subject-Wise Syllabus
          </span>
          <h2 className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
            Know exactly what to study —{" "}
            <span className="text-orange">subject by subject</span>
          </h2>
          <p className="mt-4 text-navy/65">
            Download the syllabus for each of the six subjects, free — know what
            to study and what to skip before you open a single book.
          </p>
        </motion.div>

        {/* ---------- Subject cards ---------- */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECT_SYLLABI.map((subject, i) => {
            const Icon = SUBJECT_ICONS[subject.id] ?? FileText;
            return (
              <motion.article
                key={subject.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex flex-col rounded-2xl border border-navy/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-lg hover:shadow-navy/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-white transition-colors duration-300 group-hover:bg-orange">
                    <Icon size={22} />
                  </span>
                  <span className="rounded-full bg-navy/5 px-3 py-1 text-xs font-bold text-navy/70">
                    ~{subject.questions} questions
                  </span>
                </div>

                <h3 className="font-heading mt-4 text-lg font-bold text-navy">
                  {subject.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/65">
                  {subject.blurb}
                </p>

                {/* Download */}

                <a
                  href={subject.fileUrl}
                  download={subject.fileName}
                  className="group/dl mt-5 flex items-center justify-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-2.5 text-sm font-semibold text-navy transition-all duration-200 hover:border-navy hover:bg-navy hover:text-white"
                >
                  <Download
                    size={15}
                    className="transition-transform duration-200 group-hover/dl:translate-y-0.5"
                  />
                  Download PDF
                </a>
              </motion.article>
            );
          })}
        </div>

        {/* ---------- Footnote ---------- */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center text-sm text-navy/50"
        >
          All PDFs are free — no sign-up needed. Question counts are
          approximate; verify with the official WBJEEB bulletin.
        </motion.p>
      </div>
    </section>
  );
}
