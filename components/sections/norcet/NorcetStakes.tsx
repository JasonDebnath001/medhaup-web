"use client";

import { motion } from "framer-motion";
import { Hospital, BadgeIndianRupee, MapPin, Repeat, Info } from "lucide-react";
import { NORCET, NORCET_STAKES } from "@/lib/norcet";

const ICONS = [Hospital, BadgeIndianRupee, MapPin, Repeat];

export default function NorcetStakes() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl"
        >
          <span className="inline-block rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-dark">
            Why NORCET
          </span>
          <h2 className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
            One exam. <span className="text-orange">A central government post.</span>
          </h2>
          <p className="mt-4 text-navy/65">
            Most nursing graduates spend years in private hospitals on
            contract pay. NORCET is the shortest route from that ward to a
            permanent Nursing Officer post at an AIIMS.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {NORCET_STAKES.map((item, i) => {
            const Icon = ICONS[i] ?? Hospital;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-navy/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/40 hover:shadow-xl hover:shadow-navy/10"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-white transition-colors duration-300 group-hover:bg-teal">
                  <Icon size={22} />
                </span>
                <h3 className="font-heading mt-4 text-lg font-bold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">
                  {item.detail}
                </p>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-teal/10 transition-transform duration-300 group-hover:scale-150"
                />
              </motion.article>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2 text-center text-xs text-navy/50"
        >
          <Info size={14} className="mt-0.5 shrink-0" />
          <span>
            Vacancies and participating institutes change with every notice.
            Verify the current cycle on the{" "}
            <a
              href={NORCET.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal-dark underline decoration-teal/40 underline-offset-2 hover:text-teal"
            >
              official AIIMS exams website
            </a>
            .
          </span>
        </motion.p>
      </div>
    </section>
  );
}
