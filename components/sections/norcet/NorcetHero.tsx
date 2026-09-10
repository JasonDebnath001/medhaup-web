"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Laptop,
  ListChecks,
  BadgeIndianRupee,
  MapPin,
  Route,
} from "lucide-react";
import clsx from "clsx";
import { NORCET, NORCET_COURSE, NORCET_INSTITUTES } from "@/lib/norcet";
import EcgLine from "./EcgLine";
import { PLUS_ON_DARK } from "./texture";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 + i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const INFO_BAR = [
  { icon: Building2, label: "Conducted by", value: "AIIMS New Delhi" },
  { icon: Laptop, label: "Mode", value: "Online CBT" },
  { icon: ListChecks, label: "Stages", value: "Prelims + Mains" },
  { icon: BadgeIndianRupee, label: "Post · Level 7", value: "Nursing Officer" },
];

const PATH = [
  { label: "Apply", sub: "AIIMS exams portal" },
  { label: "Stage I · Prelims", sub: "100 Qs · 90 min · qualifying" },
  { label: "Stage II · Mains", sub: "100 scenario Qs · builds merit" },
  { label: "Nursing Officer", sub: "Pay Level 7 · AIIMS" },
];

export default function NorcetHero() {
  return (
    <section className="relative overflow-hidden bg-navy pt-32 pb-0 sm:pt-40">
      {/* Medical plus texture, unique to NORCET surfaces */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: PLUS_ON_DARK, backgroundSize: "28px 28px" }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-teal/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-orange/15 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 sm:px-6 sm:pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* ---------- Left: copy ---------- */}
        <div className="text-center lg:text-left">
          <motion.nav
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            aria-label="Breadcrumb"
            className="mb-6"
          >
            <ol className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-white/55 sm:text-sm lg:justify-start">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/course"
                  className="transition-colors hover:text-white"
                >
                  Courses
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/80">
                NORCET
              </li>
            </ol>
          </motion.nav>

          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="inline-flex items-center gap-2.5 rounded-full border border-teal/40 bg-teal/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            {NORCET_COURSE.badge} · {NORCET_COURSE.name}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="font-heading mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]"
          >
            NORCET.
            <br />
            From nursing student to{" "}
            <span className="text-orange">Nursing Officer at AIIMS.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg lg:mx-0"
          >
            AIIMS runs NORCET to recruit Nursing Officers across its institutes,
            including {NORCET.westBengalInstitute}, right here in West Bengal.
            Our NORCET course is being built. The exam pattern, subjects and
            syllabus are below, so your preparation does not wait for us.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href={NORCET_COURSE.waitlistAnchor}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-orange px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange/30 transition-all duration-200 hover:bg-orange-dark hover:shadow-xl hover:shadow-orange/40 sm:w-auto"
            >
              Join the free waitlist
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#pattern"
              className="group flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/25 px-7 py-3.5 font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10 sm:w-auto"
            >
              <Route size={18} className="text-teal" />
              See the exam pattern
            </a>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 lg:mx-0"
          >
            {INFO_BAR.map((item) => (
              <li
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center backdrop-blur-sm lg:text-left"
              >
                <item.icon size={17} className="mx-auto text-teal lg:mx-0" />
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                  {item.label}
                </p>
                <p className="font-heading mt-0.5 text-sm font-bold text-white">
                  {item.value}
                </p>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ---------- Right: path card ---------- */}
        <motion.aside
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.6, ease: "easeOut" }}
          aria-label="Path from application to Nursing Officer"
          className="relative mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-7"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-lg font-extrabold text-white">
              Your path to the post
            </h2>
            <span className="rounded-full bg-teal/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal">
              2 stages
            </span>
          </div>

          <ol className="relative mt-6 space-y-5">
            <div
              aria-hidden="true"
              className="absolute bottom-4 left-[15px] top-4 w-px bg-white/15"
            />
            <motion.div
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.9, duration: 1.4, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
              className="absolute bottom-4 left-[15px] top-4 w-px bg-gradient-to-b from-teal via-teal to-orange"
            />
            {PATH.map((node, i) => {
              const last = i === PATH.length - 1;
              return (
                <motion.li
                  key={node.label}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.95 + i * 0.28, duration: 0.4 }}
                  className="relative flex items-center gap-4"
                >
                  <span
                    className={clsx(
                      "relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-extrabold",
                      last
                        ? "border-orange bg-orange text-white shadow-lg shadow-orange/40"
                        : "border-teal/50 bg-navy text-teal",
                    )}
                  >
                    {last ? "✓" : i + 1}
                  </span>
                  <div>
                    <p
                      className={clsx(
                        "font-heading text-sm font-bold",
                        last ? "text-orange" : "text-white",
                      )}
                    >
                      {node.label}
                    </p>
                    <p className="text-xs text-white/55">{node.sub}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85">
              <BadgeIndianRupee size={13} className="text-teal" />
              ₹44,900 – ₹1,42,400 basic
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85">
              <MapPin size={13} className="text-teal" />
              {NORCET.westBengalInstitute} · West Bengal
            </span>
          </div>
        </motion.aside>
      </div>

      {/* ECG trace: a full-width pulse between the content and the ticker */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative -mt-6 h-16 text-teal/50 sm:-mt-8 sm:h-20"
      >
        <EcgLine immediate delay={0.6} />
      </div>

      {/* ---------- Institute ticker ---------- */}
      <div className="relative border-t border-white/10 bg-navy-dark/60">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <p className="hidden shrink-0 text-[11px] font-bold uppercase tracking-widest text-white/45 sm:block">
            Recent vacancies covered
          </p>
          <div
            className="relative flex-1 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <ul
              aria-label="AIIMS institutes covered by recent NORCET vacancies"
              className="flex w-max animate-norcet-marquee gap-8 whitespace-nowrap motion-reduce:animate-none"
            >
              {[...NORCET_INSTITUTES, ...NORCET_INSTITUTES].map(
                (institute, i) => (
                  <li
                    key={`${institute}-${i}`}
                    aria-hidden={
                      i >= NORCET_INSTITUTES.length ? true : undefined
                    }
                    className={clsx(
                      "flex items-center gap-2 text-xs font-semibold",
                      institute === NORCET.westBengalInstitute
                        ? "text-teal"
                        : "text-white/60",
                    )}
                  >
                    <span
                      className={clsx(
                        "h-1 w-1 rounded-full",
                        institute === NORCET.westBengalInstitute
                          ? "bg-teal"
                          : "bg-orange/70",
                      )}
                    />
                    {institute}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
