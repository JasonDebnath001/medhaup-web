"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  Heart,
  Target,
  Languages,
  IndianRupee,
  ShieldCheck,
  Quote,
  Sparkles,
  Gift,
} from "lucide-react";

const PROBLEMS = [
  {
    icon: Target,
    title: "Coaching that isn't built for this exam",
    desc: "Most institutes teach ANM/GNM as a side batch of NEET material — heavy, expensive, and aimed at the wrong syllabus. This exam is based on the WB board curriculum, and it deserves preparation built on exactly that.",
  },
  {
    icon: Languages,
    title: "English-only material for Bengali-medium students",
    desc: "The paper itself comes in Bengali and English — yet most study material doesn't. Students lose marks to language, not to ability. That's not a student problem; it's a teaching problem.",
  },
  {
    icon: IndianRupee,
    title: "Big-institute fees for a small-fee dream",
    desc: "Families are asked to pay tens of thousands to prepare for a nursing entrance. We priced the entire year at ₹1,800 — because the students this exam serves deserve preparation they can actually afford.",
  },
];

const VALUES = [
  {
    icon: Target,
    title: "One exam only",
    desc: "We prepare students for the ANM/GNM exam. Nothing else. Every class, note and mock exists for this one paper.",
  },
  {
    icon: Languages,
    title: "Both languages, always",
    desc: "Bengali and English in every class and every note — the same languages the exam is written in.",
  },
  {
    icon: IndianRupee,
    title: "Affordable by design",
    desc: "₹1,800 for 12 months isn't a discount or an offer. It's the price, on purpose.",
  },
  {
    icon: ShieldCheck,
    title: "No fake promises",
    desc: "No '100% selection guaranteed'. No inflated numbers. We'd rather earn trust slowly than borrow it falsely.",
  },
];

export default function AboutPageContent() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* ============ HERO ============ */}
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

        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full border border-navy/15 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy shadow-sm"
          >
            About medhaup
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-heading mt-5 text-4xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl"
          >
            Built to get West Bengal&apos;s students{" "}
            <span className="text-orange">into nursing</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mx-auto mt-4 max-w-xl text-navy/65 sm:text-lg"
          >
            medhaup is a new platform with a single focus: the WBJEEB ANM/GNM
            exam. New name — but the teaching behind it is anything but new.
          </motion.p>
        </div>
      </section>

      {/* ============ FOUNDER ============ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-3 -z-10 rotate-2 rounded-[2rem] bg-navy/5"
            />
            <div
              aria-hidden="true"
              className="absolute -left-6 -bottom-6 -z-10 h-32 w-32 rounded-full border-[10px] border-orange/25"
            />
            <div className="overflow-hidden rounded-[2rem] border border-navy/10 shadow-2xl shadow-navy/20">
              <Image
                src="https://ik.imagekit.io/medhaup/WhatsApp%20Image%202026-08-01%20at%201.26.23%20AM%20(1).png"
                alt="Arushi, founder and lead instructor of MedhaUp"
                width={720}
                height={860}
                className="h-auto w-full object-cover"
              />
            </div>
            {/* Experience badge */}
            <div className="absolute -right-3 -top-4 z-10 rounded-2xl bg-navy px-4 py-3 shadow-xl shadow-navy/25 sm:-right-6">
              <p className="font-heading text-2xl font-extrabold leading-none text-white">
                8+
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/60">
                Years Teaching
              </p>
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-dark">
              <GraduationCap size={13} />
              Founder &amp; Lead Instructor
            </span>

            <h2 className="font-heading mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
              Meet Arushi
            </h2>

            <div className="mt-5 space-y-4 leading-relaxed text-navy/70">
              <p>
                Arushi has been teaching for over eight years — and for most of
                that time, biology hasn&apos;t just been her subject. It&apos;s
                been her favourite thing to explain, in whichever language a
                student understands best.
              </p>
              <p>
                medhaup began with a simple observation from those years in the
                classroom: the students aiming for nursing — often
                Bengali-medium, often from families watching every rupee — were
                the ones with the least support built for them. The coaching
                world had largely ignored their exam.
              </p>
              <p>
                So she built what was missing: focused, bilingual,
                honestly-priced preparation for the ANM/GNM exam — run by someone
                who actually cares whether each student clears it.
              </p>
            </div>

            {/* Pull quote */}
            <blockquote className="relative mt-7 rounded-2xl border-l-4 border-orange bg-cream p-6">
              <Quote
                aria-hidden="true"
                size={20}
                className="absolute -top-2.5 left-5 rounded-full bg-orange p-1 text-white"
              />
              <p className="font-heading font-semibold italic text-navy">
                &ldquo;I don&apos;t teach chapters. I teach students — and every
                student deserves to be taught with quality.&rdquo;
              </p>
              <footer className="mt-2 text-sm text-navy/55">
                — Arushi, Founder
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* ============ WHY WE EXIST ============ */}
      <section className="relative overflow-hidden bg-navy py-16 sm:py-24">
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

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 max-w-2xl"
          >
            <span className="inline-block rounded-full border border-orange/40 bg-orange/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange">
              Why We Exist
            </span>
            <h2 className="font-heading mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              The gaps nobody else{" "}
              <span className="text-orange">was closing</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {PROBLEMS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange text-white">
                  <p.icon size={22} />
                </span>
                <h3 className="font-heading mt-4 text-lg font-bold text-white">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/65">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <span className="inline-block rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy">
              How We Work
            </span>
            <h2 className="font-heading mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
              Four rules we{" "}
              <span className="text-orange">don&apos;t break</span>
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-3xl border border-navy/10 bg-cream p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-orange/40 hover:shadow-xl hover:shadow-navy/10"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-white transition-colors duration-300 group-hover:bg-orange">
                  <v.icon size={22} />
                </span>
                <h3 className="font-heading mt-4 text-lg font-bold text-navy">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Road ahead strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-navy/20 p-7 text-center sm:flex-row sm:justify-center sm:gap-4"
          >
            <Sparkles size={20} className="shrink-0 text-orange" />
            <p className="text-sm text-navy/70 sm:text-base">
              <span className="font-bold text-navy">
                Starting with ANM/GNM.
              </span>{" "}
              More West Bengal exams are on the roadmap — one at a time, done
              properly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-navy text-white">
              <Heart size={25} />
            </span>
            <h2 className="font-heading mt-5 text-2xl font-extrabold text-navy sm:text-3xl">
              Judge us by our teaching,{" "}
              <span className="text-orange">not our claims</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-navy/65">
              Start with the free resources — syllabus, papers, notes. If the
              teaching earns your trust, the full course is waiting.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/resources"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-orange px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange/30 transition-all duration-200 hover:bg-orange-dark hover:shadow-xl sm:w-auto"
              >
                <Gift size={18} />
                Get Free Resources
                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/admission"
                className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-navy/20 bg-white px-7 py-3.5 font-semibold text-navy transition-all duration-200 hover:border-navy sm:w-auto"
              >
                Take Admission
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
