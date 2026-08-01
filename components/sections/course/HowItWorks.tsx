"use client";

import { motion } from "framer-motion";
import {
  Video,
  FileSpreadsheet,
  MonitorPlay,
  NotebookPen,
  MessagesSquare,
  Wifi,
} from "lucide-react";
import clsx from "clsx";

/* ----------------------------------------------------------------
   Weekly schedule — placeholder timings, update to the real routine.
----------------------------------------------------------------- */

const WEEK = [
  { day: "Mon", type: "class" },
  { day: "Tue", type: "class" },
  { day: "Wed", type: "class" },
  { day: "Thu", type: "class" },
  { day: "Fri", type: "class" },
  { day: "Sat", type: "class" },
  { day: "Sun", type: "mock" },
] as const;

const FLOW = [
  {
    icon: Video,
    title: "Join the live class",
    desc: "Log in from your phone or laptop at 7:00 PM — no travelling, no commute. Ask questions live in Bengali or English.",
  },
  {
    icon: MonitorPlay,
    title: "Missed it? Watch the recording",
    desc: "Every class is uploaded after the session. Power cut, family function, tuition clash — nothing costs you a chapter.",
  },
  {
    icon: NotebookPen,
    title: "Revise with the notes",
    desc: "Chapter notes drop after each class — bilingual, short, made for revision rather than re-reading.",
  },
  {
    icon: MessagesSquare,
    title: "Clear your doubts",
    desc: "Post your doubts after class — every question gets answered before you move to the next chapter.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 sm:py-24">
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
            How It Works
          </span>
          <h2 className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
            A fixed weekly rhythm —{" "}
            <span className="text-orange">not random classes</span>
          </h2>
          <p className="mt-4 text-navy/65">
            Fully online, fully structured. You always know what happens next,
            and missing a day never means falling behind.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* ---------- Left: weekly timetable card ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="relative self-start overflow-hidden rounded-3xl bg-navy p-7 text-white shadow-2xl shadow-navy/25 sm:p-8"
          >
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-orange/20 blur-3xl"
            />

            <div className="relative">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl font-extrabold">
                  Your Week
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-white/80">
                  <Wifi size={12} className="text-orange" />
                  100% ONLINE
                </span>
              </div>

              {/* Day strip */}
              <div className="mt-6 grid grid-cols-7 gap-1.5">
                {WEEK.map((d, i) => (
                  <motion.div
                    key={d.day}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    className={clsx(
                      "flex flex-col items-center gap-1.5 rounded-xl py-3",
                      d.type === "mock"
                        ? "bg-orange text-white"
                        : "bg-white/5 text-white/85",
                    )}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                      {d.day}
                    </span>
                    {d.type === "mock" ? (
                      <FileSpreadsheet size={15} />
                    ) : (
                      <Video size={15} />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Legend / details */}
              <ul className="mt-6 space-y-3.5">
                <li className="flex items-center gap-3 rounded-2xl bg-white/5 p-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-white">
                    <Video size={16} />
                  </span>
                  <div>
                    <p className="text-sm font-bold">Live Classes · Mon–Sat</p>
                    <p className="text-xs text-white/60">
                      7:00 – 8:30 PM · Bengali + English
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-3 rounded-2xl bg-orange/15 p-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-orange text-white">
                    <FileSpreadsheet size={16} />
                  </span>
                  <div>
                    <p className="text-sm font-bold">Mock Test · Sunday</p>
                    <p className="text-xs text-white/60">
                      Full exam pattern, real marking scheme
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* ---------- Right: 4-step flow ---------- */}
          <ol className="relative space-y-2">
            {/* Vertical connector line */}
            <div
              aria-hidden="true"
              className="absolute bottom-8 left-6 top-8 w-px bg-navy/10"
            />

            {FLOW.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex gap-5 rounded-2xl p-4 transition-colors duration-300 hover:bg-cream"
              >
                <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-navy/10 bg-white text-navy shadow-sm transition-colors duration-300 group-hover:border-orange group-hover:bg-orange group-hover:text-white">
                  <step.icon size={21} />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-orange">
                    Step {i + 1}
                  </p>
                  <h3 className="font-heading mt-1 text-lg font-bold text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy/65">
                    {step.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
