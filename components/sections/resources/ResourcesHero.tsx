"use client";

import { motion } from "framer-motion";
import { Gift, LockOpen, IndianRupee } from "lucide-react";

const PROMISES = [
  { icon: LockOpen, label: "No login required" },
  { icon: IndianRupee, label: "No payment, ever" },
  { icon: Gift, label: "New files added regularly" },
];

export default function ResourcesHero() {
  return (
    <section className="relative overflow-hidden bg-cream pt-32 pb-14 sm:pt-40 sm:pb-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1a0c70 1px, transparent 1px), linear-gradient(to bottom, #1a0c70 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-orange/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-dark"
        >
          100% Free
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="font-heading mt-5 text-4xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl"
        >
          Free ANM/GNM CET <span className="text-orange">Resources</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="mx-auto mt-4 max-w-xl text-navy/65 sm:text-lg"
        >
          Syllabus, previous year papers, notes and mock tests — download and
          start preparing right now.
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {PROMISES.map((p) => (
            <li
              key={p.label}
              className="flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-2 text-sm font-medium text-navy shadow-sm"
            >
              <p.icon size={15} className="text-orange" />
              {p.label}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
