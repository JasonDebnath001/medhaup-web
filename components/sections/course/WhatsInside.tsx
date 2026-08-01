"use client";

import { motion } from "framer-motion";
import {
  Video,
  MonitorPlay,
  NotebookPen,
  FileSpreadsheet,
  History,
  MessagesSquare,
  CheckCircle2,
} from "lucide-react";
import clsx from "clsx";

/* ---------------- Data ---------------- */

type Deliverable = {
  icon: React.ElementType;
  title: string;
  desc: string;
  featured?: boolean;
  points?: string[];
};

const DELIVERABLES: Deliverable[] = [
  {
    icon: Video,
    title: "Live Interactive Classes",
    desc: "Structured live classes covering the full syllabus — ask questions in real time, in Bengali or English.",
    featured: true,
    points: [
      "Full syllabus, subject by subject",
      "Taught in Bengali + English",
      "Interactive — not one-way lectures",
    ],
  },
  {
    icon: FileSpreadsheet,
    title: "Mock Test Series",
    desc: "Exam-pattern mock tests with the real marking scheme — including negative marking — so exam day feels familiar.",
    featured: true,
    points: [
      "Follows the actual OMR pattern",
      "Category 1 & 2 marking practised",
      "Performance tracking after each test",
    ],
  },
  {
    icon: MonitorPlay,
    title: "Class Recordings",
    desc: "Missed a class? Every session is recorded and available to rewatch anytime during the course.",
  },
  {
    icon: NotebookPen,
    title: "Bilingual Notes",
    desc: "Chapter-wise notes in Bengali and English — made for quick revision, not textbook re-reading.",
  },
  {
    icon: History,
    title: "PYQ Solutions",
    desc: "Previous year questions solved and explained, so you know exactly how the board asks.",
  },
  {
    icon: MessagesSquare,
    title: "Doubt Support",
    desc: "Dedicated doubt-clearing — no question stays unanswered before the exam.",
  },
];

/* ---------------- Component ---------------- */

export default function WhatsInside() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy">
            What&apos;s Inside
          </span>
          <h2 className="font-heading mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
            Everything included in{" "}
            <span className="text-orange">one course</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-navy/60">
            No add-ons, no upsells — one enrolment covers the entire 12-month
            preparation.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DELIVERABLES.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={clsx(
                "group rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl",
                d.featured
                  ? "border-navy/10 bg-navy text-white shadow-lg shadow-navy/20 hover:shadow-navy/30 sm:col-span-2"
                  : "border-navy/10 bg-cream hover:border-orange/40 hover:shadow-navy/10",
              )}
            >
              <span
                className={clsx(
                  "grid h-12 w-12 place-items-center rounded-xl transition-colors duration-300",
                  d.featured
                    ? "bg-orange text-white"
                    : "bg-navy text-white group-hover:bg-orange",
                )}
              >
                <d.icon size={22} />
              </span>

              <h3
                className={clsx(
                  "font-heading mt-4 text-lg font-bold",
                  d.featured ? "text-white" : "text-navy",
                )}
              >
                {d.title}
              </h3>

              <p
                className={clsx(
                  "mt-2 text-sm leading-relaxed",
                  d.featured ? "text-white/70" : "text-navy/65",
                )}
              >
                {d.desc}
              </p>

              {d.points && (
                <ul className="mt-4 space-y-2">
                  {d.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-orange"
                      />
                      <span className="text-white/85">{p}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
