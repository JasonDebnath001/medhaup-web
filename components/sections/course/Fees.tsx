"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  BadgePercent,
  CreditCard,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";

/* ---------------- Data ---------------- */

const PLANS = [
  {
    name: "New Students",
    tag: "Most Common",
    price: 1800,
    monthly: 150,
    highlight: true,
    note: "For students joining MedhaUp for the first time.",
  },
  {
    name: "Old Students",
    tag: "Returning Discount",
    price: 1500,
    monthly: 125,
    highlight: false,
    note: "For students who were part of a previous MedhaUp batch.",
  },
];

const INCLUDED = [
  "12 months of live classes (Mon–Sat)",
  "All class recordings",
  "Weekly mock tests, full exam pattern",
  "Bilingual chapter-wise notes",
  "PYQ solutions",
  "Doubt support throughout the course",
];

/* ---------------- Component ---------------- */

export default function Fees() {
  return (
    <section
      id="fees"
      className="relative scroll-mt-24 overflow-hidden bg-navy py-20 sm:py-24"
    >
      {/* Background texture + glows */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-orange/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full border border-orange/40 bg-orange/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange">
            Course Fees
          </span>
          <h2 className="font-heading mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            One year of preparation.{" "}
            <span className="text-orange">Less than ₹5 a day.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/60">
            Transparent pricing, no hidden charges — the fee you see is the fee
            you pay for the full 12 months.
          </p>
        </motion.div>

        {/* Plan cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {PLANS.map((plan, i) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className={clsx(
                "relative flex flex-col rounded-3xl p-7 sm:p-8",
                plan.highlight
                  ? "bg-white shadow-2xl shadow-black/30"
                  : "border border-white/15 bg-white/5 backdrop-blur-sm",
              )}
            >
              {/* Tag */}
              <span
                className={clsx(
                  "absolute -top-3.5 left-7 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider",
                  plan.highlight
                    ? "bg-orange text-white shadow-lg shadow-orange/30"
                    : "bg-navy border border-white/20 text-white/80",
                )}
              >
                {plan.highlight ? (
                  <Sparkles size={12} />
                ) : (
                  <BadgePercent size={12} />
                )}
                {plan.tag}
              </span>

              <h3
                className={clsx(
                  "font-heading mt-3 text-xl font-extrabold",
                  plan.highlight ? "text-navy" : "text-white",
                )}
              >
                {plan.name}
              </h3>
              <p
                className={clsx(
                  "mt-1 text-sm",
                  plan.highlight ? "text-navy/55" : "text-white/55",
                )}
              >
                {plan.note}
              </p>

              {/* Price */}
              <div className="mt-6 flex items-end gap-3">
                <p
                  className={clsx(
                    "font-heading text-5xl font-extrabold leading-none",
                    plan.highlight ? "text-navy" : "text-white",
                  )}
                >
                  ₹{plan.price.toLocaleString("en-IN")}
                </p>
                <div className="pb-1">
                  <p
                    className={clsx(
                      "text-sm font-semibold",
                      plan.highlight ? "text-navy/60" : "text-white/60",
                    )}
                  >
                    / 12 months
                  </p>
                  <p className="text-xs font-bold text-orange">
                    ≈ ₹{plan.monthly}/month
                  </p>
                </div>
              </div>

              {/* EMI badge */}
              <div
                className={clsx(
                  "mt-5 flex items-center gap-2.5 rounded-2xl p-3.5",
                  plan.highlight
                    ? "bg-navy/5 text-navy"
                    : "bg-white/5 text-white/85",
                )}
              >
                <CreditCard size={18} className="shrink-0 text-orange" />
                <p className="text-sm font-medium">
                  EMI available — pay in easy installments
                </p>
              </div>

              {/* CTA */}
              <Link
                href="/admission"
                className={clsx(
                  "group mt-6 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold transition-all duration-200",
                  plan.highlight
                    ? "bg-orange text-white shadow-lg shadow-orange/30 hover:bg-orange-dark hover:shadow-xl"
                    : "border-2 border-white/25 text-white hover:border-white hover:bg-white/10",
                )}
              >
                Take Admission
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Shared inclusions */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm sm:p-8"
        >
          <p className="font-heading text-sm font-bold uppercase tracking-widest text-white/50">
            Both plans include everything
          </p>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-orange"
                />
                <span className="text-white/85">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="mt-7 flex items-center justify-center gap-2 text-center text-xs text-white/45"
        >
          <ShieldCheck size={14} className="shrink-0 text-orange" />
          No hidden charges · No forced add-ons · Same content in both plans
        </motion.p>
      </div>
    </section>
  );
}
