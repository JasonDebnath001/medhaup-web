"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BellRing, MessageCircle } from "lucide-react";
import { useSite } from "@/components/provider/SiteProvider";
import { useCourseMotion } from "@/components/ui/useCourseMotion";
import { JENPAS_INTEREST_OPTIONS } from "@/lib/jenpas";

export default function JenpasLaunchUpdates() {
  const site = useSite();
  const { reveal, reduceMotion } = useCourseMotion();
  const [paperId, setPaperId] = useState<string>(JENPAS_INTEREST_OPTIONS[0].id);
  const paper = JENPAS_INTEREST_OPTIONS.find(
    (option) => option.id === paperId,
  )!;
  const whatsappUrl = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(
    `Hi medhaup! I am interested in the upcoming JENPAS(UG) preparation course. My target is ${paper.label} (${paper.detail}). Please keep me updated about the launch date, fees and course details.`,
  )}`;
  return (
    <section
      id="launch-updates"
      aria-labelledby="jenpas-updates-heading"
      className="scroll-mt-28 bg-cream px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 overflow-hidden rounded-3xl bg-navy p-6 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:p-14">
        <motion.div {...reveal()}>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-orange">
            <BellRing size={16} aria-hidden="true" />
            Get ready for what&apos;s next
          </span>
          <h2
            id="jenpas-updates-heading"
            className="font-heading mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl"
          >
            Your healthcare goal.
            <br />A new way to prepare.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-white/75">
            Tell us which paper you&apos;re preparing for and ask our team for
            updates about the JENPAS(UG) course launch, fees and class details.
          </p>
          <p className="mt-6 text-sm text-white/60">
            No payment needed to request updates.
          </p>
        </motion.div>
        <motion.div
          {...reveal(0.12)}
          className="self-center rounded-2xl bg-white p-5 sm:p-7"
        >
          <fieldset>
            <legend className="font-heading text-lg font-bold text-navy">
              Which paper are you preparing for?
            </legend>
            <p className="mt-2 text-sm leading-6 text-navy/65">
              Select your target to personalise your message.
            </p>
            <div className="mt-5 space-y-2.5">
              {JENPAS_INTEREST_OPTIONS.map((option) => (
                <label key={option.id} className="block cursor-pointer">
                  <input
                    type="radio"
                    name="jenpas-paper"
                    value={option.id}
                    checked={paperId === option.id}
                    onChange={() => setPaperId(option.id)}
                    className="peer sr-only"
                  />
                  <motion.span
                    whileHover={reduceMotion ? undefined : { y: -2 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    className="flex min-h-14 flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl border border-navy/15 px-4 py-3 text-navy transition-colors hover:border-navy/40 peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-orange"
                  >
                    <span className="text-sm font-bold">{option.label}</span>
                    <span className="text-xs opacity-75">{option.detail}</span>
                  </motion.span>
                </label>
              ))}
            </div>
          </fieldset>
          <motion.a
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange px-4 py-3.5 text-center text-sm font-bold text-navy transition-colors hover:bg-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
          >
            <MessageCircle size={18} className="shrink-0" aria-hidden="true" />
            Ask for updates on WhatsApp
            <ArrowUpRight size={16} className="shrink-0" aria-hidden="true" />
          </motion.a>
          <p className="mt-3 text-center text-xs leading-5 text-navy/60">
            Opens WhatsApp with a message for you to send.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
