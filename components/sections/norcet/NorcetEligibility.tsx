"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink, UserCheck, Route } from "lucide-react";
import clsx from "clsx";
import { NORCET, NORCET_ELIGIBILITY, NORCET_JOURNEY } from "@/lib/norcet";

export default function NorcetEligibility() {
  return (
    <section
      id="eligibility"
      className="scroll-mt-24 bg-cream py-20 sm:py-24"
      aria-labelledby="norcet-eligibility-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl"
        >
          <span className="inline-block rounded-full border border-navy/15 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy shadow-sm">
            Eligibility &amp; Selection
          </span>
          <h2
            id="norcet-eligibility-heading"
            className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
          >
            Can you sit for it?{" "}
            <span className="text-orange">Probably sooner than you think.</span>
          </h2>
          <p className="mt-4 text-navy/65">
            B.Sc Nursing graduates qualify straight away. GNM graduates qualify
            after two years of hospital experience, which is exactly the
            window to prepare in.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          {/* Checklist */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="rounded-3xl border border-navy/10 bg-white p-7 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal/15 text-teal-dark">
                <UserCheck size={21} />
              </span>
              <h3 className="font-heading text-xl font-extrabold text-navy">
                Eligibility checklist
              </h3>
            </div>
            <ul className="mt-6 space-y-4">
              {NORCET_ELIGIBILITY.map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-teal"
                  />
                  <div>
                    <p className="font-semibold text-navy">{item.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-navy/65">
                      {item.detail}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
            <a
              href={NORCET.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-navy/60 transition-colors hover:text-teal-dark"
            >
              Confirm the exact conditions in the current AIIMS notice
              <ExternalLink size={12} />
            </a>
          </motion.div>

          {/* Journey */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-white">
                <Route size={21} />
              </span>
              <h3 className="font-heading text-xl font-extrabold text-navy">
                The selection journey
              </h3>
            </div>
            <ol className="relative mt-6 space-y-2">
              <div
                aria-hidden="true"
                className="absolute bottom-8 left-6 top-8 w-px bg-navy/10"
              />
              {NORCET_JOURNEY.map((step, i) => {
                const last = i === NORCET_JOURNEY.length - 1;
                return (
                  <motion.li
                    key={step.step}
                    initial={{ opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group relative flex gap-5 rounded-2xl p-4 transition-colors duration-300 hover:bg-white"
                  >
                    <span
                      className={clsx(
                        "font-heading relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-xl border text-base font-extrabold shadow-sm transition-colors duration-300",
                        last
                          ? "border-orange bg-orange text-white"
                          : "border-navy/10 bg-white text-navy group-hover:border-teal group-hover:bg-teal group-hover:text-white",
                      )}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="font-heading text-base font-bold text-navy">
                        {step.step}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-navy/65">
                        {step.detail}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
