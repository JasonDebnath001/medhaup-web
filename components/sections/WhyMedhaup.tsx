"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Languages,
  Target,
  FileCheck2,
  MessagesSquare,
  FileQuestion,
  Trophy,
  Timer,
  ClipboardList,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

/* ---------------- Data ---------------- */

const REASONS = [
  {
    icon: Languages,
    title: "Bilingual Teaching",
    desc: "Every concept explained in Bengali and English — the same languages the actual paper uses.",
  },
  {
    icon: Target,
    title: "WB-Board Focused",
    desc: "Prep mapped to WBBSE/WBCHSE textbooks — the primary source of the question paper. No wasted NEET-style material.",
  },
  {
    icon: FileCheck2,
    title: "Category-Wise Strategy",
    desc: "Learn when to attempt and when to skip — a dedicated approach for negative-marking vs no-penalty questions.",
  },
  {
    icon: MessagesSquare,
    title: "Doubt Support",
    desc: "Ask doubts after every class — no question left unanswered before the exam.",
  },
];

const EXAM_STATS = [
  { icon: FileQuestion, value: "100", label: "MCQ Questions" },
  { icon: Trophy, value: "115", label: "Total Marks" },
  { icon: Timer, value: "90", label: "Minutes" },
  { icon: ClipboardList, value: "OMR", label: "Offline Mode" },
];

/* Approx. question counts per subject — verify against the current
   official WBJEEB bulletin before publishing exact figures. */
const SUBJECTS = [
  { name: "Life Science", questions: 25, max: 25 },
  { name: "Physical Science", questions: 20, max: 25 },
  { name: "Mathematics", questions: 15, max: 25 },
  { name: "Basic English", questions: 15, max: 25 },
  { name: "General Knowledge", questions: 13, max: 25 },
  { name: "Logical Reasoning", questions: 12, max: 25 },
];

/* ---------------- Component ---------------- */

export default function WhyMedhaUp() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-2xl"
        >
          <span className="inline-block rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy">
            Why medhaup
          </span>
          <h2 className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
            Built only for <span className="text-orange">ANM/GNM</span> —
            nothing else
          </h2>
          <p className="mt-4 text-navy/65">
            Generic coaching spreads you thin. We prepare you for exactly one
            paper — its subjects, its marking scheme, its language.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-10">
          {/* ---------- Left: reasons ---------- */}
          <div className="grid content-start gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {REASONS.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-2xl border border-navy/10 bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-lg hover:shadow-navy/10"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-white transition-colors duration-300 group-hover:bg-orange">
                  <r.icon size={22} />
                </span>
                <h3 className="font-heading mt-4 text-lg font-bold text-navy">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">
                  {r.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ---------- Right: exam snapshot panel ---------- */}
          <motion.aside
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative overflow-hidden rounded-3xl bg-navy p-7 text-white shadow-2xl shadow-navy/30 sm:p-9"
          >
            {/* Decorative glow */}
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-orange/20 blur-3xl"
            />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-widest text-orange">
                Exam Snapshot
              </p>
              <h3 className="font-heading mt-2 text-2xl font-extrabold">
                WBJEEB ANM/GNM at a glance
              </h3>

              {/* Stat tiles */}
              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {EXAM_STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center"
                  >
                    <s.icon size={18} className="mx-auto text-orange" />
                    <p className="font-heading mt-2 text-xl font-extrabold leading-none">
                      {s.value}
                    </p>
                    <p className="mt-1 text-[11px] text-white/60">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Subjects + weightage */}
              <div className="mt-8 space-y-3.5">
                <p className="text-xs font-bold uppercase tracking-widest text-white/50">
                  Subjects &amp; approx. weightage
                </p>
                {SUBJECTS.map((sub, i) => (
                  <div key={sub.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{sub.name}</span>
                      <span className="text-white/60">~{sub.questions} Qs</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${(sub.questions / sub.max) * 100}%`,
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
                  </div>
                ))}
              </div>

              {/* Negative marking callout */}
              <div className="mt-7 flex items-start gap-3 rounded-2xl border border-orange/30 bg-orange/10 p-4">
                <AlertTriangle
                  size={18}
                  className="mt-0.5 shrink-0 text-orange"
                />
                <p className="text-sm leading-relaxed text-white/85">
                  <span className="font-bold text-white">
                    Negative marking:
                  </span>{" "}
                  −0.25 per wrong answer on 85 questions — but 15 questions
                  carry 2 marks with{" "}
                  <span className="font-bold text-orange">zero penalty</span>.
                  Knowing which is which is half the strategy.
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/course"
                className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange/25 transition-all duration-200 hover:bg-orange-dark sm:w-auto sm:justify-start sm:self-start sm:px-7"
              >
                View Full Syllabus
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
