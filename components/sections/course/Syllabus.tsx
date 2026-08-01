"use client";

import { motion } from "framer-motion";
import {
  Dna,
  Atom,
  Calculator,
  SpellCheck,
  Globe2,
  Puzzle,
  Info,
} from "lucide-react";

/* ----------------------------------------------------------------
   Subject-level syllabus data. Question counts are approximate —
   verify against the current official WBJEEB bulletin.
----------------------------------------------------------------- */

const MAX_QUESTIONS = 25; // highest subject weightage, used to scale bars

const SUBJECTS = [
  {
    icon: Dna,
    name: "Life Science",
    questions: 25,
    covers:
      "The highest-weightage subject — human physiology, plant & animal biology, health and disease.",
  },
  {
    icon: Atom,
    name: "Physical Science",
    questions: 20,
    covers:
      "Physics and chemistry fundamentals from the WB board syllabus — concepts, not derivations.",
  },
  {
    icon: Calculator,
    name: "Mathematics",
    questions: 15,
    covers:
      "Arithmetic and basic mathematics — speed and accuracy matter more than advanced theory.",
  },
  {
    icon: SpellCheck,
    name: "Basic English",
    questions: 15,
    covers:
      "Grammar, vocabulary and comprehension — this section appears in English only.",
  },
  {
    icon: Globe2,
    name: "General Knowledge",
    questions: 13,
    covers:
      "Static GK and awareness — high-scoring if prepared smartly, easy to lose if ignored.",
  },
  {
    icon: Puzzle,
    name: "Logical Reasoning",
    questions: 12,
    covers:
      "Patterns, series and reasoning ability — pure practice territory, also English-only.",
  },
];

export default function Syllabus() {
  return (
    <section
      id="syllabus"
      className="relative scroll-mt-24 overflow-hidden bg-navy/[0.04] py-20 sm:py-24"
    >
      {/* Dotted texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(#1a0c70 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-dark">
            Syllabus
          </span>
          <h2 className="font-heading mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
            Six subjects. <span className="text-orange">One plan.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-navy/60">
            The full WBJEE ANM/GNM CET syllabus, covered subject by subject over
            12 months — weighted by how the paper actually scores.
          </p>
        </motion.div>

        {/* Subject cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((sub, i) => (
            <motion.article
              key={sub.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group flex flex-col rounded-3xl border border-navy/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-orange/40 hover:shadow-xl hover:shadow-navy/10"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-white transition-colors duration-300 group-hover:bg-orange">
                  <sub.icon size={22} />
                </span>
                <div className="text-right">
                  <p className="font-heading text-2xl font-extrabold leading-none text-navy">
                    ~{sub.questions}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-navy/45">
                    Questions
                  </p>
                </div>
              </div>

              <h3 className="font-heading mt-4 text-lg font-bold text-navy">
                {sub.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/65">
                {sub.covers}
              </p>

              {/* Weightage bar */}
              <div className="mt-5">
                <div className="h-2 overflow-hidden rounded-full bg-navy/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${(sub.questions / MAX_QUESTIONS) * 100}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.9,
                      delay: 0.2 + i * 0.08,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-orange to-orange-dark"
                  />
                </div>
                <p className="mt-1.5 text-[11px] font-medium text-navy/50">
                  Weightage in the paper
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Approximation note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-8 flex max-w-xl items-start justify-center gap-2 text-center text-xs text-navy/50"
        >
          <Info size={14} className="mt-0.5 shrink-0" />
          <span>
            Question distribution is approximate, based on recent exam patterns.
            Refer to the official WBJEEB bulletin for the current year&apos;s
            exact structure.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
