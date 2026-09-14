"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Pill } from "lucide-react";
import { useCourseMotion } from "@/components/ui/useCourseMotion";
import { DPHARMACY_PATH, DPHARMACY_YEARS } from "@/lib/dpharmacy";

export default function DPharmacyTeaser() {
  const { reveal, reduceMotion } = useCourseMotion();

  return (
    <section
      aria-labelledby="dpharmacy-teaser-heading"
      className="bg-white px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-3xl border border-navy/10 bg-cream p-6 sm:p-10 lg:grid-cols-[1fr_auto]">
        <motion.div {...reveal()}>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-dark">
            <Pill size={18} aria-hidden="true" />
            D.Pharmacy studies
          </span>
          <h2
            id="dpharmacy-teaser-heading"
            className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
          >
            D.Pharmacy is coming
            <br className="hidden sm:block" /> to medhaup.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-navy/65">
            A new course for Diploma in Pharmacy 1st and 2nd year students.
            Explore year-wise subjects, the syllabus and exam pattern, and ask
            for enrolment details.
          </p>
        </motion.div>
        <motion.div {...reveal(0.12)} className="lg:min-w-64">
          <div className="mb-5 flex gap-2">
            {DPHARMACY_YEARS.map((year) => (
              <motion.span
                key={year.id}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                className={`flex-1 rounded-xl ${year.surface} px-3 py-3 text-center text-sm font-bold text-navy`}
              >
                {year.label}
              </motion.span>
            ))}
          </div>
          <Link
            href={DPHARMACY_PATH}
            className="flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          >
            Explore D.Pharmacy <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
