"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BellRing, MessageCircle } from "lucide-react";
import { useSite } from "@/components/provider/SiteProvider";
import { useCourseMotion } from "@/components/ui/useCourseMotion";
import type { NursingEntranceCourse } from "@/lib/nursing-entrance";

export default function NursingEntranceLaunchUpdates({
  course,
}: {
  course: NursingEntranceCourse;
}) {
  const site = useSite();
  const { reveal, reduceMotion } = useCourseMotion();
  const [backgroundId, setBackgroundId] = useState(
    course.interestOptions[0].id,
  );
  const background = course.interestOptions.find(
    (option) => option.id === backgroundId,
  )!;
  const whatsappUrl = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(`Hi medhaup! I am interested in the upcoming ${course.name} preparation course for ${course.degree} entrance. My nursing background: ${background.label}. Please keep me updated about the launch date, fees and course details.`)}`;

  return (
    <section
      id="launch-updates"
      aria-labelledby={`${course.id}-updates-heading`}
      className="scroll-mt-28 bg-cream px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 rounded-3xl bg-navy p-6 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:p-14">
        <motion.div {...reveal()} className="self-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-orange">
            <BellRing size={16} aria-hidden="true" /> A new course is on its way
          </span>
          <h2
            id={`${course.id}-updates-heading`}
            className="font-heading mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl"
          >
            Be ready for your
            <br />
            next chapter in nursing.
          </h2>
          <p className="mt-5 max-w-md leading-7 text-white/75">
            Ask our team about the upcoming {course.name} preparation course.
            We&apos;ll share launch, fee and class details when they are
            announced.
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
              Your nursing background
            </legend>
            <p className="mt-2 text-sm leading-6 text-navy/65">
              Choose an option to personalise your message.
            </p>
            <div className="mt-5 space-y-2.5">
              {course.interestOptions.map((option) => (
                <label key={option.id} className="block cursor-pointer">
                  <input
                    type="radio"
                    name={`${course.id}-background`}
                    value={option.id}
                    checked={backgroundId === option.id}
                    onChange={() => setBackgroundId(option.id)}
                    className="peer sr-only"
                  />
                  <motion.span
                    whileHover={reduceMotion ? undefined : { y: -2 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    className="flex min-h-14 items-center rounded-xl border border-navy/15 px-4 py-3 text-sm font-semibold text-navy transition-colors hover:border-navy/40 peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-orange"
                  >
                    {option.label}
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
            Opens WhatsApp with a message for you to send. This requests course
            updates; it does not register you for the entrance exam.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
