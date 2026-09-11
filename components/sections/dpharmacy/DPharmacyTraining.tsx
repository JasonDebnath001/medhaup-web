"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, FileText } from "lucide-react";
import { useCourseMotion } from "@/components/ui/useCourseMotion";
import { DPHARMACY_SOURCES } from "@/lib/dpharmacy-syllabus";

const TRAINING_ACTIVITIES = [
  "Storage and stocking of medicines and medical devices",
  "Inventory control and pharmacy records",
  "Prescription handling",
  "Prescription dispensing",
  "Patient counselling",
];

const RESOURCES = [
  {
    title: "Full PCI syllabus",
    description:
      "Both years’ chapters, learning objectives, practical activities, assignments and exam-paper patterns.",
    href: DPHARMACY_SOURCES.syllabus,
  },
  {
    title: "Education Regulations, 2020",
    description:
      "Academic hours, marks tables, exam rules and Part III training requirements, including the training contract form.",
    href: `${DPHARMACY_SOURCES.regulations}#page=12`,
  },
];

export default function DPharmacyTraining() {
  const { reveal, reduceMotion } = useCourseMotion();

  return (
    <section
      id="practical-training"
      aria-labelledby="dpharmacy-training-heading"
      className="scroll-mt-28 bg-white px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal()} className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
            Beyond the classroom · Part III
          </p>
          <h2
            id="dpharmacy-training-heading"
            className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
          >
            Put your learning into practice.
          </h2>
          <p className="mt-4 leading-7 text-navy/65">
            The diploma includes practical training in addition to the practical
            classes in 1st and 2nd year. Here&apos;s what PCI ER-2020 specifies.
          </p>
        </motion.div>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            ["500", "minimum training hours"],
            ["3 months", "minimum training period"],
            ["250", "minimum hours of dispensing"],
          ].map(([value, label], index) => (
            <motion.div
              key={label}
              {...reveal(index * 0.08)}
              className="rounded-2xl bg-navy p-6 text-white"
            >
              <p className="font-heading text-4xl font-extrabold tracking-tight text-orange">
                {value}
              </p>
              <p className="mt-3 text-sm text-white/75">{label}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-16">
          <motion.div {...reveal()}>
            <h3 className="font-heading text-xl font-extrabold text-navy">
              What you practise
            </h3>
            <ul className="mt-5 space-y-3">
              {TRAINING_ACTIVITIES.map((activity) => (
                <li
                  key={activity}
                  className="flex items-start gap-3 text-sm leading-6 text-navy/75"
                >
                  <Check
                    size={17}
                    className="mt-1 shrink-0 text-orange-dark"
                    aria-hidden="true"
                  />
                  {activity}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...reveal(0.1)} className="rounded-2xl bg-cream p-6">
            <h3 className="font-heading text-xl font-extrabold text-navy">
              When and where
            </h3>
            <p className="mt-3 text-sm leading-7 text-navy/70">
              Students become eligible after appearing in the Part II
              examination. Training takes place in eligible government hospitals
              or dispensaries, licensed retail pharmacies with registered
              pharmacists, or other hospitals and dispensaries recognised by PCI
              for training.
            </p>
            <p className="mt-3 text-sm leading-7 text-navy/70">
              Coordinate with your institution to complete the prescribed
              training contract and completion certification.
            </p>
            <a
              href={`${DPHARMACY_SOURCES.regulations}#page=16`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 rounded-sm text-sm font-bold text-orange-dark underline decoration-orange/40 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            >
              Read the official training requirements{" "}
              <ArrowUpRight size={15} aria-hidden="true" />
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
          </motion.div>
        </div>

        <div
          id="resources"
          className="mt-14 scroll-mt-28 border-t border-navy/10 pt-9"
        >
          <motion.div {...reveal()}>
            <h3 className="font-heading text-2xl font-extrabold text-navy">
              Keep the official references handy.
            </h3>
            <p className="mt-3 text-sm leading-7 text-navy/65">
              Open the original PCI PDFs to read or save the complete documents.
            </p>
          </motion.div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {RESOURCES.map((resource, index) => (
              <motion.a
                key={resource.title}
                {...reveal(index * 0.08)}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-2xl border border-navy/10 bg-white p-5 transition-colors hover:border-orange/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange sm:p-6"
              >
                <FileText
                  size={23}
                  className="mt-1 shrink-0 text-orange-dark"
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-navy/50">
                    Pharmacy Council of India · PDF
                  </span>
                  <span className="font-heading mt-2 block text-base font-extrabold text-navy">
                    {resource.title}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-navy/65">
                    {resource.description}
                  </span>
                  <span className="sr-only">Opens in a new tab.</span>
                </span>
                <ArrowUpRight
                  size={18}
                  className="mt-1 shrink-0 text-navy/60"
                  aria-hidden="true"
                />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
