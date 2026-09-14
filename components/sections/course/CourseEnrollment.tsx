"use client";

import { useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useSite } from "@/components/provider/SiteProvider";

type Props = {
  courseName: string;
  options?: readonly string[];
  optionLabel?: string;
};

export default function CourseEnrollment({
  courseName,
  options = [],
  optionLabel = "Choose your year or paper",
}: Props) {
  const site = useSite();
  const [selection, setSelection] = useState(options[0] ?? "");
  const whatsappUrl = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(
    `Hi medhaup! I would like to enrol in the ${courseName} course.${selection ? ` My selection: ${selection}.` : ""} Please share the current fees, batch timings and enrolment steps.`,
  )}`;

  return (
    <section
      id="enrolment"
      aria-labelledby="enrolment-heading"
      className="scroll-mt-28 bg-cream px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 rounded-3xl bg-navy p-6 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:p-14">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
            Course enquiry
          </p>
          <h2
            id="enrolment-heading"
            className="font-heading mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl"
          >
            Start your {courseName} preparation.
          </h2>
          <p className="mt-5 max-w-md leading-7 text-white/75">
            Speak with our team about the course, current fees and batch
            timings. We&apos;ll help you with the next steps to enrol.
          </p>
        </div>
        <div className="self-center rounded-2xl bg-white p-5 sm:p-7">
          {options.length > 0 && (
            <div className="mb-6">
              <label
                htmlFor="course-selection"
                className="font-heading block text-lg font-bold text-navy"
              >
                {optionLabel}
              </label>
              <select
                id="course-selection"
                value={selection}
                onChange={(event) => setSelection(event.target.value)}
                className="mt-4 min-h-12 w-full rounded-xl border border-navy/20 bg-white px-3 text-sm text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange px-4 py-3.5 text-center text-sm font-bold text-navy transition-colors hover:bg-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
          >
            <MessageCircle size={18} className="shrink-0" aria-hidden="true" />
            Enquire on WhatsApp
            <ArrowUpRight size={16} className="shrink-0" aria-hidden="true" />
          </a>
          <p className="mt-3 text-center text-xs leading-5 text-navy/60">
            Opens WhatsApp with your course enquiry ready to send.
          </p>
        </div>
      </div>
    </section>
  );
}
