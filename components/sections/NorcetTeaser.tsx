"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeIndianRupee,
  CheckCircle2,
  ListChecks,
  MapPin,
} from "lucide-react";
import { NORCET, NORCET_COURSE, NORCET_PATH } from "@/lib/norcet";
import EcgLine from "@/components/sections/norcet/EcgLine";
import { PLUS_ON_DARK } from "@/components/sections/norcet/texture";

const FACTS = [
  { icon: ListChecks, label: "2 stages · 100 Qs each" },
  { icon: BadgeIndianRupee, label: "Pay Level 7, central post" },
  { icon: MapPin, label: `${NORCET.westBengalInstitute} · West Bengal` },
];

const ON_THE_PAGE = [
  "Stage I and Stage II pattern with the marking scheme",
  "Subject-wise weightage across 14 nursing subjects",
  "The full syllabus, topic by topic",
  "Eligibility for GNM and B.Sc Nursing students",
  "Free NORCET material as it is published",
];

export default function NorcetTeaser() {
  return (
    <section
      id="norcet"
      aria-labelledby="norcet-teaser-heading"
      className="relative overflow-hidden bg-navy py-20 text-white sm:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: PLUS_ON_DARK, backgroundSize: "28px 28px" }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-teal/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-6 h-20 text-teal/35 sm:h-24"
      >
        <EcgLine />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-teal/40 bg-teal/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            {NORCET_COURSE.badge}
          </span>

          <h2
            id="norcet-teaser-heading"
            className="font-heading mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]"
          >
            Prepare for the AIIMS Nursing Officer exam{" "}
            <span className="text-orange">with medhaup.</span>
          </h2>

          <p className="mt-4 max-w-xl leading-relaxed text-white/70">
            Finished GNM or B.Sc Nursing? NORCET is the door to a permanent
            Nursing Officer post at AIIMS, including{" "}
            {NORCET.westBengalInstitute} in West Bengal. Explore the subjects,
            syllabus and preparation course with medhaup.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {FACTS.map((fact) => (
              <li
                key={fact.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/85"
              >
                <fact.icon size={14} className="text-teal" />
                {fact.label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={NORCET_PATH}
              className="group flex items-center justify-center gap-2 rounded-full bg-orange px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange/30 transition-all duration-200 hover:bg-orange-dark hover:shadow-xl"
            >
              Explore NORCET
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href={`${NORCET_PATH}${NORCET_COURSE.enrolmentAnchor}`}
              className="flex items-center justify-center gap-2 rounded-full border-2 border-white/25 px-7 py-3.5 font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10"
            >
              Enrol now
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-7"
        >
          <p className="text-[11px] font-bold uppercase tracking-widest text-teal">
            Already on the NORCET page
          </p>
          <ul className="mt-4 space-y-3">
            {ON_THE_PAGE.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-start gap-3 text-sm text-white/85"
              >
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-teal" />
                {item}
              </motion.li>
            ))}
          </ul>
          <p className="mt-5 border-t border-white/10 pt-4 text-xs text-white/50">
            Contact our team for current fees and batch dates.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
