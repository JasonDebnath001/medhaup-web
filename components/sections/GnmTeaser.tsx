"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import { GNM_PATH, GNM_YEARS } from "@/lib/gnm";
import { useGnmMotion } from "./gnm/useGnmMotion";

export default function GnmTeaser() {
  const { reveal, reduceMotion } = useGnmMotion();
  return (
    <section
      aria-labelledby="gnm-teaser-heading"
      className="bg-cream px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-3xl border border-navy/10 bg-white p-6 sm:p-10 lg:grid-cols-[1fr_auto]">
        <motion.div {...reveal()}>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-dark">
            <GraduationCap size={18} aria-hidden="true" />
            GNM studies
          </span>
          <h2
            id="gnm-teaser-heading"
            className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
          >
            Already studying GNM?
            <br />
            Your next chapter is coming.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-navy/65">
            A new course for GNM 1st, 2nd and 3rd year students. Explore the
            subjects, download your syllabus and ask for enrolment details.
          </p>
        </motion.div>
        <motion.div {...reveal(0.12)} className="lg:min-w-64">
          <div className="mb-5 flex gap-2">
            {GNM_YEARS.map((year) => (
              <motion.span
                key={year.id}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                className="flex-1 rounded-xl bg-cream px-3 py-3 text-center text-sm font-bold text-navy"
              >
                {year.label}
              </motion.span>
            ))}
          </div>
          <Link
            href={GNM_PATH}
            className="flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-dark"
          >
            Explore the GNM course <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
