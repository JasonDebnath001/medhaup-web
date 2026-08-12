"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight,
  Download,
  CalendarRange,
  Languages,
  Wifi,
  IndianRupee,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },

  show: (i: number) => ({
    opacity: 1,
    y: 0,

    transition: {
      delay: 0.08 + i * 0.1,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

const INFO_BAR = [
  {
    icon: CalendarRange,
    label: "Duration",
    value: "12 Months",
  },
  {
    icon: Wifi,
    label: "Mode",
    value: "100% Online",
  },
  {
    icon: Languages,
    label: "Language",
    value: "Bengali + English",
  },
  {
    icon: IndianRupee,
    label: "Full Course",
    value: "₹1,800 · EMI",
  },
];

export default function CourseHero() {
  return (
    <section className="relative overflow-hidden bg-navy pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange/20 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.nav
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          aria-label="Breadcrumb"
          className="mb-6"
        >
          <ol className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-white/55 sm:text-sm">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-white"
              >
                Home
              </Link>
            </li>

            <li aria-hidden="true">/</li>

            <li
              aria-current="page"
              className="text-white/80"
            >
              ANM GNM 2027 Online Course
            </li>
          </ol>
        </motion.nav>

        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange"
        >
          WBJEEB ANM(R) &amp; GNM · 2027 Preparation
        </motion.span>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="font-heading mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl"
        >
          ANM GNM 2027{" "}
          <span className="text-orange">
            Online Course
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
        >
          A structured 12-month preparation program for West Bengal ANM(R)
          &amp; GNM aspirants — live Bengali + English classes, recordings,
          chapter-wise notes, mock tests, PYQ practice and doubt support.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/admission"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-orange px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange/30 transition-all duration-200 hover:bg-orange-dark hover:shadow-xl sm:w-auto"
          >
            Join the 2027 Batch

            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>

          <a
            href="#syllabus"
            className="group flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/25 px-7 py-3.5 font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10 sm:w-auto"
          >
            <Download
              size={18}
              className="transition-transform duration-200 group-hover:translate-y-0.5"
            />

            View Syllabus
          </a>
        </motion.div>

        <motion.ul
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {INFO_BAR.map((item) => (
            <li
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
            >
              <item.icon
                size={18}
                className="mx-auto text-orange"
              />

              <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                {item.label}
              </p>

              <p className="font-heading mt-0.5 text-sm font-bold text-white">
                {item.value}
              </p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}