"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import clsx from "clsx";
import {
  NORCET_GENERAL_QUESTION_SHARE,
  NORCET_NURSING_QUESTION_SHARE,
  NORCET_SUBJECTS,
} from "@/lib/norcet";
import {
  FALLBACK_SUBJECT_ICON,
  NORCET_SUBJECT_ICONS,
  WEIGHT_BADGE,
  WEIGHT_BAR,
  WEIGHT_LABEL,
} from "./subject-icons";
import { PLUS_ON_LIGHT } from "./texture";

const NURSING_SUBJECTS = NORCET_SUBJECTS.filter(
  (subject) => subject.group !== "General section",
);
const GENERAL_SECTION = NORCET_SUBJECTS.find(
  (subject) => subject.group === "General section",
);
const MAX_QUESTIONS = Math.max(
  ...NURSING_SUBJECTS.map((subject) => subject.approxQuestions[1]),
);

export default function NorcetSubjects() {
  const GeneralIcon = GENERAL_SECTION
    ? (NORCET_SUBJECT_ICONS[GENERAL_SECTION.id] ?? FALLBACK_SUBJECT_ICON)
    : FALLBACK_SUBJECT_ICON;

  return (
    <section
      id="subjects"
      className="relative scroll-mt-24 overflow-hidden bg-navy/[0.04] py-20 sm:py-24"
      aria-labelledby="norcet-subjects-heading"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: PLUS_ON_LIGHT, backgroundSize: "28px 28px" }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <span className="inline-block rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-dark">
            Subjects &amp; Weightage
          </span>
          <h2
            id="norcet-subjects-heading"
            className="font-heading mt-4 text-3xl font-extrabold text-navy sm:text-4xl"
          >
            {NORCET_NURSING_QUESTION_SHARE}% nursing.{" "}
            <span className="text-orange">
              {NORCET_GENERAL_QUESTION_SHARE}% everything else.
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-navy/60">
            Fourteen nursing subjects plus one general section, and they are
            nowhere near equal. Prepare in order of weight and the paper stops
            feeling endless.
          </p>
        </motion.div>

        {/* 80 / 20 split bar */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-12 max-w-3xl"
        >
          <div className="flex h-4 overflow-hidden rounded-full bg-navy/10">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${NORCET_NURSING_QUESTION_SHARE}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="h-full bg-navy"
            />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${NORCET_GENERAL_QUESTION_SHARE}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 1.1 }}
              className="h-full bg-orange"
            />
          </div>
          <div className="mt-2.5 flex justify-between text-xs font-semibold text-navy/70">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-navy" />
              Nursing subjects · ~{NORCET_NURSING_QUESTION_SHARE} Qs in Stage I,
              all 100 in Stage II
            </span>
            <span className="flex items-center gap-1.5 text-right">
              <span className="h-2 w-2 rounded-full bg-orange" />
              GK, aptitude &amp; English · ~{NORCET_GENERAL_QUESTION_SHARE} Qs,
              Stage I only
            </span>
          </div>
        </motion.div>

        {/* Subject cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NURSING_SUBJECTS.map((subject, i) => {
            const Icon =
              NORCET_SUBJECT_ICONS[subject.id] ?? FALLBACK_SUBJECT_ICON;
            const [min, max] = subject.approxQuestions;
            return (
              <motion.article
                key={subject.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
                className="group flex flex-col rounded-2xl border border-navy/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-lg hover:shadow-navy/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-white transition-colors duration-300 group-hover:bg-teal">
                    <Icon size={20} />
                  </span>
                  <span
                    className={clsx(
                      "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                      WEIGHT_BADGE[subject.weight],
                    )}
                  >
                    {WEIGHT_LABEL[subject.weight]}
                  </span>
                </div>
                <h3 className="font-heading mt-4 text-base font-bold leading-snug text-navy">
                  {subject.name}
                </h3>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-navy/45">
                  {subject.group}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/65">
                  {subject.blurb}
                </p>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-navy/55">
                      Approx. questions
                    </span>
                    <span className="font-heading font-extrabold text-navy">
                      ~{min}–{max}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-navy/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(max / MAX_QUESTIONS) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                      className={clsx("h-full rounded-full", WEIGHT_BAR[subject.weight])}
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* General section, Stage I only */}
        {GENERAL_SECTION && (
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="mt-4 grid gap-5 rounded-3xl bg-navy p-6 text-white sm:p-7 lg:grid-cols-[auto_1fr_auto] lg:items-center"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange text-white">
              <GeneralIcon size={22} />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-heading text-lg font-bold">
                  {GENERAL_SECTION.name}
                </h3>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/80">
                  Stage I only
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                {GENERAL_SECTION.blurb}
              </p>
            </div>
            <div className="text-left lg:text-right">
              <p className="font-heading text-3xl font-extrabold leading-none text-orange">
                ~{GENERAL_SECTION.approxQuestions[1]}
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/55">
                Questions
              </p>
            </div>
          </motion.article>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2 text-center text-xs text-navy/50"
        >
          <Info size={14} className="mt-0.5 shrink-0" />
          <span>
            AIIMS does not publish subject-wise weightage. These ranges are
            medhaup&apos;s approximation from recent NORCET papers and shift
            slightly between cycles.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
