"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  MonitorPlay,
  Clock,
  ArrowRight,
  Flame,
  Sparkles,
  AlarmClock,
} from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { BATCHES, type Batch } from "@/lib/batches";

/* Badge auto-derived from fill % */
function getBadge(filled: number, total: number) {
  const pct = (filled / total) * 100;
  if (pct > 85)
    return {
      label: "Few Seats Left",
      icon: AlarmClock,
      className: "bg-orange text-white",
      pulse: true,
    };
  if (pct >= 50)
    return {
      label: "Filling Fast",
      icon: Flame,
      className: "bg-orange/15 text-orange-dark",
      pulse: false,
    };
  return {
    label: "Enrolling Now",
    icon: Sparkles,
    className: "bg-navy/8 text-navy",
    pulse: false,
  };
}

function scrollToAdmission() {
  document
    .getElementById("admission")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function BatchCard({ batch }: { batch: Batch }) {
  const pct = Math.round((batch.seatsFilled / batch.seatsTotal) * 100);
  const badge = getBadge(batch.seatsFilled, batch.seatsTotal);

  const details = [
    { icon: CalendarDays, label: "Starts", value: batch.startDate },
    { icon: MonitorPlay, label: "Mode", value: batch.mode },
    { icon: Clock, label: "Timing", value: batch.timing },
  ];

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-xl shadow-navy/10"
    >
      {/* Orange top accent line */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-navy via-orange to-orange" />

      <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* ---- Left: name + details ---- */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-heading text-2xl font-extrabold text-navy sm:text-3xl">
              {batch.name}
            </h3>
            <span
              className={clsx(
                "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold",
                badge.className,
              )}
            >
              <badge.icon
                size={13}
                className={badge.pulse ? "animate-pulse" : undefined}
              />
              {badge.label}
            </span>
          </div>

          <ul className="mt-7 space-y-4">
            {details.map((d) => (
              <li key={d.label} className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy/5 text-navy">
                  <d.icon size={19} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy/45">
                    {d.label}
                  </p>
                  <p className="mt-0.5 font-medium text-navy">{d.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ---- Right: seats + CTA ---- */}
        <div className="flex flex-col justify-between gap-6 rounded-2xl bg-cream p-6 sm:p-7">
          <div>
            <div className="flex items-end justify-between">
              <p className="text-sm font-semibold text-navy/70">Seats Filled</p>
              <p className="font-heading text-2xl font-extrabold text-navy">
                {batch.seatsFilled}
                <span className="text-base font-bold text-navy/40">
                  /{batch.seatsTotal}
                </span>
              </p>
            </div>

            {/* Progress bar */}
            <div
              role="progressbar"
              aria-valuenow={batch.seatsFilled}
              aria-valuemin={0}
              aria-valuemax={batch.seatsTotal}
              aria-label={`${batch.seatsFilled} of ${batch.seatsTotal} seats filled`}
              className="mt-3 h-3.5 overflow-hidden rounded-full bg-navy/10"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
                className={clsx(
                  "h-full rounded-full",
                  pct >= 50
                    ? "bg-gradient-to-r from-orange to-orange-dark"
                    : "bg-navy",
                )}
              />
            </div>

            <p className="mt-2.5 text-xs font-medium text-navy/55">
              {batch.seatsTotal - batch.seatsFilled} seats remaining — {pct}%
              full
            </p>
          </div>

          <Link
            href="/admission"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange/30 transition-all duration-200 hover:bg-orange-dark hover:shadow-xl hover:shadow-orange/40"
          >
            Reserve Your Seat
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function OngoingBatch() {
  return (
    <section className="relative overflow-hidden bg-navy/[0.04] py-20 sm:py-24">
      {/* Dotted texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(#1a0c70 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-dark">
            Now Enrolling
          </span>
          <h2 className="font-heading mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
            Ongoing Batch
          </h2>
          <p className="mx-auto mt-3 max-w-md text-navy/60">
            Admissions are open — seats are limited per batch to keep classes
            focused.
          </p>
        </motion.div>

        {/* Batch cards — auto-adapts: 1 batch = single wide card, 2 = grid */}
        <div
          className={clsx("grid gap-8", BATCHES.length > 1 && "lg:grid-cols-2")}
        >
          {BATCHES.map((batch) => (
            <BatchCard key={batch.name} batch={batch} />
          ))}
        </div>
      </div>
    </section>
  );
}
