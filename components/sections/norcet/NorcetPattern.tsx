"use client";

import { motion } from "framer-motion";
import {
  FileQuestion,
  Trophy,
  Timer,
  ArrowRight,
  Lightbulb,
  Languages,
  Laptop,
  MinusCircle,
  PlusCircle,
  CircleDot,
  ExternalLink,
} from "lucide-react";
import clsx from "clsx";
import { NORCET, NORCET_MARKING, NORCET_STAGES } from "@/lib/norcet";

const MARKING = [
  {
    icon: PlusCircle,
    value: NORCET_MARKING.correct,
    label: "Correct answer",
    tone: "text-teal",
  },
  {
    icon: MinusCircle,
    value: NORCET_MARKING.wrong,
    label: "Wrong answer",
    tone: "text-orange",
  },
  {
    icon: CircleDot,
    value: NORCET_MARKING.unattempted,
    label: "Unattempted",
    tone: "text-navy/50",
  },
];

export default function NorcetPattern() {
  return (
    <section
      id="pattern"
      className="scroll-mt-24 bg-white py-20 sm:py-24"
      aria-labelledby="norcet-pattern-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy">
            Exam Pattern
          </span>
          <h2
            id="norcet-pattern-heading"
            className="font-heading mt-4 text-3xl font-extrabold text-navy sm:text-4xl"
          >
            Two stages. <span className="text-orange">One merit list.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-navy/60">
            Stage I screens. Stage II ranks. Same 100 questions, same 90
            minutes, very different questions.
          </p>
        </motion.div>

        {/* Stage cards */}
        <div className="relative grid gap-6 lg:grid-cols-2 lg:gap-12">
          {/* Shortlist arrow: sits inside the column gap on large screens */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
          >
            <span
              title="Shortlisted candidates move to Stage II"
              className="grid h-10 w-10 place-items-center rounded-full bg-teal text-navy shadow-lg shadow-teal/30 ring-4 ring-white"
            >
              <ArrowRight size={18} strokeWidth={2.5} />
            </span>
          </div>

          {NORCET_STAGES.map((stage, i) => {
            const dark = stage.id === "stage-2";
            const stats = [
              {
                icon: FileQuestion,
                value: stage.questions,
                label: "Questions",
              },
              { icon: Trophy, value: stage.marks, label: "Marks" },
              { icon: Timer, value: stage.minutes, label: "Minutes" },
            ];
            return (
              <motion.article
                key={stage.id}
                aria-labelledby={`${stage.id}-heading`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className={clsx(
                  "relative flex flex-col overflow-hidden rounded-3xl p-7 sm:p-8",
                  dark
                    ? "bg-navy text-white shadow-2xl shadow-navy/30"
                    : "border border-navy/10 bg-cream text-navy",
                )}
              >
                {dark && (
                  <div
                    aria-hidden="true"
                    className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal/20 blur-3xl"
                  />
                )}

                <div className="relative flex items-start gap-4">
                  <span
                    className={clsx(
                      "font-heading grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl font-extrabold",
                      dark ? "bg-teal text-navy" : "bg-navy text-white",
                    )}
                  >
                    {stage.number}
                  </span>
                  <div>
                    <p
                      className={clsx(
                        "text-[11px] font-bold uppercase tracking-widest",
                        dark ? "text-teal" : "text-teal-dark",
                      )}
                    >
                      Stage {stage.number} · {stage.nickname}
                    </p>
                    <h3
                      id={`${stage.id}-heading`}
                      className="font-heading mt-1 text-2xl font-extrabold"
                    >
                      {stage.name}
                    </h3>
                  </div>
                </div>

                <p
                  className={clsx(
                    "relative mt-4 text-sm leading-relaxed",
                    dark ? "text-white/70" : "text-navy/65",
                  )}
                >
                  {stage.purpose}
                </p>

                {/* Stat tiles */}
                <div className="relative mt-6 grid grid-cols-3 gap-3">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className={clsx(
                        "rounded-2xl p-3.5 text-center",
                        dark
                          ? "border border-white/10 bg-white/5"
                          : "border border-navy/10 bg-white",
                      )}
                    >
                      <s.icon
                        size={17}
                        className={clsx(
                          "mx-auto",
                          dark ? "text-teal" : "text-orange",
                        )}
                      />
                      <p className="font-heading mt-2 text-2xl font-extrabold leading-none">
                        {s.value}
                      </p>
                      <p
                        className={clsx(
                          "mt-1 text-[11px]",
                          dark ? "text-white/55" : "text-navy/50",
                        )}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Sections */}
                <div className="relative mt-6 space-y-3.5">
                  <p
                    className={clsx(
                      "text-[11px] font-bold uppercase tracking-widest",
                      dark ? "text-white/50" : "text-navy/45",
                    )}
                  >
                    What the paper contains
                  </p>
                  {stage.sections.map((section, j) => (
                    <div key={section.name}>
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="font-semibold">{section.name}</span>
                        <span
                          className={clsx(
                            "shrink-0 font-bold",
                            dark ? "text-teal" : "text-orange-dark",
                          )}
                        >
                          ~{section.questions} Qs
                        </span>
                      </div>
                      <div
                        className={clsx(
                          "mt-1.5 h-2 overflow-hidden rounded-full",
                          dark ? "bg-white/10" : "bg-navy/10",
                        )}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${(section.questions / stage.questions) * 100}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.9,
                            delay: 0.25 + j * 0.1,
                            ease: "easeOut",
                          }}
                          className={clsx(
                            "h-full rounded-full",
                            dark
                              ? "bg-gradient-to-r from-teal to-teal-dark"
                              : "bg-gradient-to-r from-orange to-orange-dark",
                          )}
                        />
                      </div>
                      <p
                        className={clsx(
                          "mt-1.5 text-xs leading-relaxed",
                          dark ? "text-white/55" : "text-navy/55",
                        )}
                      >
                        {section.note}
                      </p>
                    </div>
                  ))}
                </div>

                <dl
                  className={clsx(
                    "relative mt-6 space-y-2 rounded-2xl p-4 text-sm",
                    dark ? "bg-white/5" : "bg-white",
                  )}
                >
                  <div className="flex gap-2">
                    <dt className="shrink-0 font-bold">Negative marking:</dt>
                    <dd className={dark ? "text-white/75" : "text-navy/70"}>
                      {stage.negativeMarking}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="shrink-0 font-bold">Result:</dt>
                    <dd className={dark ? "text-white/75" : "text-navy/70"}>
                      {stage.outcome}
                    </dd>
                  </div>
                </dl>

                <div
                  className={clsx(
                    "relative mt-5 flex items-start gap-3 rounded-2xl border p-4",
                    dark
                      ? "border-teal/30 bg-teal/10"
                      : "border-orange/30 bg-orange/10",
                  )}
                >
                  <Lightbulb
                    size={18}
                    className={clsx(
                      "mt-0.5 shrink-0",
                      dark ? "text-teal" : "text-orange",
                    )}
                  />
                  <p
                    className={clsx(
                      "text-sm leading-relaxed",
                      dark ? "text-white/85" : "text-navy/80",
                    )}
                  >
                    <span className="font-bold">medhaup tip:</span> {stage.tip}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Marking + logistics strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-8 grid gap-4 rounded-3xl border border-navy/10 bg-cream p-6 sm:p-7 lg:grid-cols-[1.2fr_1fr]"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-navy/45">
              Marking scheme, both stages
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {MARKING.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-navy/10 bg-white p-4 text-center"
                >
                  <m.icon size={18} className={clsx("mx-auto", m.tone)} />
                  <p
                    className={clsx(
                      "font-heading mt-2 text-2xl font-extrabold leading-none",
                      m.tone,
                    )}
                  >
                    {m.value}
                  </p>
                  <p className="mt-1 text-[11px] text-navy/55">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4">
            <ul className="space-y-3 text-sm text-navy/75">
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-teal-dark">
                  <Languages size={16} />
                </span>
                <span>
                  Paper language:{" "}
                  <span className="font-bold text-navy">
                    {NORCET.languages.join(" · ")}
                  </span>{" "}
                  (no Bengali)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-teal-dark">
                  <Laptop size={16} />
                </span>
                <span>
                  Mode:{" "}
                  <span className="font-bold text-navy">{NORCET.mode}</span>
                </span>
              </li>
            </ul>
            <a
              href={NORCET.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy/60 transition-colors hover:text-teal-dark"
            >
              Pattern follows recent AIIMS notices. Verify the current cycle
              <ExternalLink size={12} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
