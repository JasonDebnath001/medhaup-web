"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Pencil,
  Sparkles,
  Star,
} from "lucide-react";
import clsx from "clsx";

import type { SuccessAspect, SuccessStory } from "@/lib/successStories";

const ASPECT_CLASSES: Record<SuccessAspect, string> = {
  tall: "aspect-[4/5]",
  wide: "aspect-[4/3]",
  square: "aspect-square",
};

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function SuccessWall({ stories }: { stories: SuccessStory[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden border-b border-navy/8 bg-cream pb-12 pt-36 sm:pb-14 sm:pt-40">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-55"
          style={{
            backgroundImage:
              "linear-gradient(rgba(26,12,112,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(26,12,112,0.045) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-orange/12 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-navy/8 blur-3xl"
        />

        <motion.div
          className="relative mx-auto max-w-4xl px-4 text-center sm:px-6"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE_OUT }}
        >
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-navy shadow-sm">
            <GraduationCap
              size={15}
              className="text-orange"
              aria-hidden="true"
            />
            Student achievement gallery
          </div>
          <h1 className="font-heading mt-5 text-4xl font-extrabold tracking-[-0.04em] text-navy sm:text-5xl">
            Wall of <span className="text-orange">Success</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-navy/60">
            A proud collection of learners who turned steady preparation into
            remarkable results.
          </p>

          <motion.div
            aria-hidden="true"
            className="absolute -left-4 top-8 hidden h-12 w-12 -rotate-12 place-items-center rounded-2xl border border-navy/10 bg-white text-orange shadow-lg sm:grid"
            animate={
              reduceMotion
                ? undefined
                : { y: [0, -6, 0], rotate: [-12, -8, -12] }
            }
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <BookOpen size={22} />
          </motion.div>
          <motion.div
            aria-hidden="true"
            className="absolute -right-2 top-16 hidden h-11 w-11 rotate-12 place-items-center rounded-full bg-navy text-white shadow-lg sm:grid"
            animate={
              reduceMotion ? undefined : { y: [0, 6, 0], rotate: [12, 17, 12] }
            }
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Pencil size={18} />
          </motion.div>
        </motion.div>
      </section>

      <section
        className="relative py-12 sm:py-16"
        aria-labelledby="success-gallery-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            className="mb-8 flex flex-col gap-3 border-b border-navy/10 pb-6 sm:flex-row sm:items-end sm:justify-between"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE_OUT }}
          >
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-orange">
                <Star size={13} fill="currentColor" aria-hidden="true" />
                Proud moments
              </span>
              <h2
                id="success-gallery-heading"
                className="font-heading mt-2 text-2xl font-extrabold text-navy sm:text-3xl"
              >
                Celebrating every achievement
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-navy/45">
              <Sparkles size={15} className="text-orange" aria-hidden="true" />
              {stories.length} success stories
            </div>
          </motion.div>

          <div className="columns-2 gap-3 sm:gap-5 lg:columns-3 xl:columns-4 [&>*]:mb-3 sm:[&>*]:mb-5">
            {stories.map((story, index) => (
              <motion.figure
                key={story.id}
                initial={
                  reduceMotion ? false : { opacity: 0, y: 22, scale: 0.985 }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -6, rotate: index % 2 === 0 ? -0.35 : 0.35 }
                }
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.48,
                  delay: reduceMotion ? 0 : (index % 8) * 0.035,
                  ease: EASE_OUT,
                }}
                className="group relative break-inside-avoid overflow-hidden rounded-[1rem] bg-cream"
              >
                <div
                  className={clsx(
                    "relative overflow-hidden",
                    ASPECT_CLASSES[story.aspect],
                  )}
                >
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    loading={index < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-4 py-12 sm:px-6 sm:py-14">
        <motion.div
          className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-3xl border border-navy/10 bg-white px-6 py-7 text-center shadow-sm sm:flex-row sm:px-8 sm:text-left"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE_OUT }}
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy text-orange">
              <BookOpen size={22} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-heading text-xl font-extrabold text-navy">
                Begin your learning journey
              </h2>
              <p className="mt-1 text-sm leading-6 text-navy/55">
                Focused teaching, guided practice, and support at every step.
              </p>
            </div>
          </div>
          <Link
            href="/admission"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-bold text-white shadow-md shadow-orange/25 transition-all hover:bg-orange-dark hover:shadow-lg"
          >
            Take admission
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
