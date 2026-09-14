"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import { useCourseMotion } from "@/components/ui/useCourseMotion";
import { NURSING_ENTRANCE_COURSES } from "@/lib/nursing-entrance-catalog";

export default function NursingEntranceTeaser() {
  const { reveal, reduceMotion } = useCourseMotion();
  return (
    <section
      aria-labelledby="nursing-entrance-teaser-heading"
      className="bg-cream px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal()} className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-dark">
            Nursing entrance preparation
          </p>
          <h2
            id="nursing-entrance-teaser-heading"
            className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
          >
            Take the next step in nursing.
          </h2>
          <p className="mt-4 text-sm leading-7 text-navy/65">
            From GNM to a nursing degree, or from your degree to postgraduate
            study. Find the entrance preparation that fits your next
            qualification.
          </p>
        </motion.div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {NURSING_ENTRANCE_COURSES.map((course, index) => (
            <motion.article
              key={course.id}
              {...reveal(index * 0.1)}
              className="flex flex-col rounded-3xl border border-navy/10 bg-white p-6 sm:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <span
                  className={`rounded-full px-3 py-2 text-xs font-bold text-navy ${index === 0 ? "bg-[#e5f0fb]" : "bg-[#fff0e4]"}`}
                >
                  {course.degree}
                </span>
                <GraduationCap
                  size={27}
                  className="text-orange-dark"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-heading mt-6 text-4xl font-extrabold text-navy">
                {course.name}
              </h3>
              <p className="mt-3 text-lg font-semibold text-orange-dark">
                {course.degree}
              </p>
              <p className="mt-3 text-xs font-bold text-navy/55">
                {course.audience}
              </p>
              <p className="mb-7 mt-4 text-sm leading-7 text-navy/65">
                {course.teaser}
              </p>
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -2 }}
                className="mt-auto"
              >
                <Link
                  href={course.path}
                  className="flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
                >
                  Explore {course.name}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
