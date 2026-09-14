"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import { useCourseMotion } from "@/components/ui/useCourseMotion";
import { JENPAS_PAPERS, JENPAS_PATH } from "@/lib/jenpas";

export default function JenpasTeaser() {
  const { reveal, reduceMotion } = useCourseMotion();
  return (
    <section
      aria-labelledby="jenpas-teaser-heading"
      className="bg-cream px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-3xl border border-navy/10 bg-white p-6 sm:p-10 lg:grid-cols-[1fr_auto]">
        <motion.div {...reveal()}>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-dark">
            <GraduationCap size={18} aria-hidden="true" />
            JENPAS(UG) preparation
          </span>
          <h2
            id="jenpas-teaser-heading"
            className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
          >
            Preparing for JENPAS(UG)?
            <br />
            Your next step starts here.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-navy/65">
            A new course for undergraduate nursing, allied health and hospital
            administration aspirants. Explore both papers, subjects and the exam
            pattern, then request enrolment details.
          </p>
        </motion.div>
        <motion.div {...reveal(0.12)} className="lg:min-w-64">
          <div className="mb-5 flex gap-2">
            {JENPAS_PAPERS.map((paper) => (
              <motion.span
                key={paper.id}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                className={`flex-1 rounded-xl ${paper.surface} px-3 py-3 text-center text-sm font-bold text-navy`}
              >
                {paper.label}
              </motion.span>
            ))}
          </div>
          <Link
            href={JENPAS_PATH}
            className="flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          >
            Explore JENPAS(UG)
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
