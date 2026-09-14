"use client";

import { motion } from "framer-motion";
import {
  Video,
  ListChecks,
  NotebookPen,
  FileSpreadsheet,
  History,
  MessagesSquare,
  Languages,
  Target,
  IndianRupee,
  ArrowRight,
  Hammer,
} from "lucide-react";
import { NORCET_COURSE, NORCET_COURSE_PLAN } from "@/lib/norcet";
import EcgLine from "./EcgLine";
import { PLUS_ON_DARK } from "./texture";

const PLAN_ICONS = [
  Video,
  ListChecks,
  NotebookPen,
  FileSpreadsheet,
  History,
  MessagesSquare,
];

const WHY = [
  {
    icon: Languages,
    title: "Explained in Bengali, practised in English",
    detail:
      "The paper is English and Hindi only. Understanding a concept in your own language and then drilling it in exam English is the whole method.",
  },
  {
    icon: Target,
    title: "Focused healthcare preparation",
    detail:
      "Build your nursing knowledge with focused preparation for the NORCET examination.",
  },
  {
    icon: IndianRupee,
    title: "Course fees and batch options",
    detail:
      "Contact our team for current course fees, available batches and enrolment steps.",
  },
];

export default function NorcetCoursePlan() {
  return (
    <section
      id="course"
      className="relative scroll-mt-24 overflow-hidden bg-navy py-20 text-white sm:py-24"
      aria-labelledby="norcet-course-heading"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: PLUS_ON_DARK, backgroundSize: "28px 28px" }}
      />
      <div
        aria-hidden="true"
        className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-teal/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-8 h-20 text-teal/30 sm:h-24"
      >
        <EcgLine />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/40 bg-teal/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal">
            <Hammer size={13} />
            Your NORCET preparation
          </span>
          <h2
            id="norcet-course-heading"
            className="font-heading mt-4 text-3xl font-extrabold sm:text-4xl"
          >
            The {NORCET_COURSE.name},{" "}
            <span className="text-orange">designed for your goal</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/65">
            {NORCET_COURSE.tagline} Explore the course below, then contact our team for current fees,
            batch dates and the class schedule.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NORCET_COURSE_PLAN.map((item, i) => {
            const Icon = PLAN_ICONS[i] ?? Video;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:bg-white/[0.08]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-navy">
                  <Icon size={20} />
                </span>
                <h3 className="font-heading mt-4 text-lg font-bold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {item.detail}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-10 grid gap-6 rounded-3xl bg-white p-7 text-navy sm:p-9 lg:grid-cols-3"
        >
          {WHY.map((item) => (
            <div key={item.title} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-white">
                <item.icon size={20} />
              </span>
              <div>
                <h3 className="font-heading text-base font-bold text-navy">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy/65">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <a
            href={NORCET_COURSE.enrolmentAnchor}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange/30 transition-all duration-200 hover:bg-orange-dark hover:shadow-xl"
          >
            Enrol in the course
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
          <p className="mt-3 text-xs text-white/45">
            Ask our team about current fees and batch timings.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
