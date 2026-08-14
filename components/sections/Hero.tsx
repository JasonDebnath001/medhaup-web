"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Users, CalendarCheck } from "lucide-react";
import SyllabusDownloadButton from "@/components/ui/SyllabusDownloadButton";
import type { SyllabusDownload } from "@/lib/data";
import { useOfferLive } from "@/components/offer/useOffer";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.12, duration: 0.55, ease: "easeOut" },
  }),
};

const STATS = [
  { icon: Users, value: "1,000+", label: "Students Taught" },
  { icon: CalendarCheck, value: "3", label: "Years Running" },
];

export default function Hero({
  downloads,
}: {
  downloads: SyllabusDownload[];
}) {
  const live = useOfferLive();

  return (
    <section className="relative overflow-hidden bg-cream pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* ---- Background layers ---- */}
      {/* Faint grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1a0c70 1px, transparent 1px), linear-gradient(to bottom, #1a0c70 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Glow blobs — tricolor during the Independence Day weekend */}
      <div
        aria-hidden="true"
        className={`absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl transition-colors duration-700 ${
          live ? "bg-[#FF9933]/20" : "bg-orange/15"
        }`}
      />
      <div
        aria-hidden="true"
        className={`absolute -bottom-32 -left-24 h-96 w-96 rounded-full blur-3xl transition-colors duration-700 ${
          live ? "bg-[#138808]/15" : "bg-navy/10"
        }`}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        {/* ---------- Left: copy ---------- */}
        <div className="text-center lg:text-left">
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-navy shadow-sm"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange" />
            WBJEEB ANM/GNM PREPARATION
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-heading mt-6 text-4xl font-extrabold leading-[1.12] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]"
          >
            Crack{" "}
            <span className="relative inline-block text-orange">
              ANM/GNM 2027
              <svg
                aria-hidden="true"
                viewBox="0 0 240 12"
                fill="none"
                className="absolute -bottom-2 left-0 w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 9C60 3 180 3 237 8"
                  stroke="#fe7b30"
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity="0.45"
                />
              </svg>
            </span>{" "}
            with medhaup
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-navy/70 sm:text-lg lg:mx-0"
          >
            বাংলা ও ইংরেজিতে ক্লাস — structured strategy, chapter-wise practice,
            and a syllabus built only for West Bengal&apos;s nursing entrance.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link
              href="/admission"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-orange px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange/30 transition-all duration-200 hover:bg-orange-dark hover:shadow-xl hover:shadow-orange/40 sm:w-auto"
            >
              Take Admission
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <SyllabusDownloadButton downloads={downloads} />
          </motion.div>

          {/* Trust strip */}
          <motion.ul
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 lg:justify-start"
          >
            {STATS.map((stat) => (
              <li key={stat.label} className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy/5 text-navy">
                  <stat.icon size={19} />
                </span>
                <div className="text-left">
                  <p className="font-heading text-lg font-bold leading-none text-navy">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-navy/60">{stat.label}</p>
                </div>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ---------- Right: photo ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          {/* Decorative frame layers */}
          <div
            aria-hidden="true"
            className="absolute -inset-3 -z-10 rounded-[2rem] bg-navy/5 rotate-2"
          />
          <div
            aria-hidden="true"
            className="absolute -right-6 -top-6 -z-10 h-36 w-36 rounded-full border-[10px] border-orange/25"
          />

          <div className="overflow-hidden rounded-[2rem] border border-navy/10 shadow-2xl shadow-navy/20">
            <Image
              src="/arushi.png"
              alt="medhaup instructor teaching an ANM/GNM class"
              width={880}
              height={1040}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}