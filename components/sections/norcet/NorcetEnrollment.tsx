"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  BellRing,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useSite } from "@/components/provider/SiteProvider";
import { trackGAEvent } from "@/lib/analytics";
import { appendAttributionToFormData } from "@/lib/attribution";
import { NORCET_COURSE } from "@/lib/norcet";

/* Same Web3Forms access key as the admission and contact forms. */
const WEB3FORMS_ACCESS_KEY = "e4e66ca4-46d3-42dc-97cb-af9fe61a4cd1";

const QUALIFICATIONS = [
  "B.Sc Nursing, studying",
  "B.Sc Nursing, completed",
  "GNM, studying",
  "GNM, completed",
  "Post-Basic B.Sc Nursing",
  "Other / not sure",
];

const PERKS = [
  {
    icon: BellRing,
    title: "Current fees and batch timings",
    detail:
      "Our team will help you choose a batch and explain the enrolment steps.",
  },
  {
    icon: Sparkles,
    title: "Course and study materials",
    detail:
      "Ask about classes, notes, mock tests and support for your preparation.",
  },
  {
    icon: ShieldCheck,
    title: "Help with your questions",
    detail: "Tell us your nursing background and what you need help with.",
  },
];

type Status = "idle" | "sending" | "success" | "error";

export default function NorcetEnrollment() {
  const SITE = useSite();
  const [status, setStatus] = useState<Status>("idle");

  const enrolmentWhatsAppUrl = `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(
    "Hi medhaup! I would like to enrol in the NORCET course. Please share current fees, batch timings and enrolment steps.",
  )}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("from_name", "medhaup NORCET Enrolment");
    data.append("form_type", "norcet_enrolment");
    data.append("course", NORCET_COURSE.name);
    appendAttributionToFormData(data);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        trackGAEvent("generate_lead", {
          lead_type: "norcet_enrolment",
          course: "norcet",
          qualification: String(data.get("qualification") ?? ""),
        });
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="enrolment"
      className="scroll-mt-24 bg-cream py-20 sm:py-24"
      aria-labelledby="norcet-enrolment-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-teal/40 bg-teal/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-dark">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            Course enquiry
          </span>
          <h2
            id="norcet-enrolment-heading"
            className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
          >
            Start your preparation{" "}
            <span className="text-orange">with medhaup</span>
          </h2>
          <p className="mt-4 text-navy/65">
            Share your details and our team will help you with current fees,
            batch timings and how to enrol.
          </p>

          <ul className="mt-8 space-y-5">
            {PERKS.map((perk, i) => (
              <motion.li
                key={perk.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="flex gap-4"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-teal-dark shadow-sm">
                  <perk.icon size={20} />
                </span>
                <div>
                  <p className="font-heading font-bold text-navy">
                    {perk.title}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-navy/65">
                    {perk.detail}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-navy/10 bg-white p-7 shadow-xl shadow-navy/10 sm:p-9"
        >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-navy via-teal to-orange" />

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center"
            >
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-teal/15 text-teal-dark">
                <CheckCircle2 size={32} />
              </span>
              <h3 className="font-heading mt-5 text-2xl font-extrabold text-navy">
                Your enquiry is received
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-navy/65">
                Our team will contact you about the NORCET course, current fees
                and batch options. You can also speak with us on WhatsApp.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={enrolmentWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                >
                  <MessageCircle size={16} />
                  WhatsApp us
                </a>
                <a
                  href="#pattern"
                  className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy/5"
                >
                  Study the exam pattern
                  <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-heading text-xl font-extrabold text-navy">
                Enrol in NORCET
              </h3>
              <p className="text-sm text-navy/60">
                Ask about the course. No payment is collected by this form.
              </p>

              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label
                  htmlFor="norcet-name"
                  className="mb-1.5 block text-sm font-semibold text-navy"
                >
                  Full name
                </label>
                <input
                  id="norcet-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-teal focus:ring-2 focus:ring-teal/20"
                />
              </div>

              <div>
                <label
                  htmlFor="norcet-phone"
                  className="mb-1.5 block text-sm font-semibold text-navy"
                >
                  Phone (WhatsApp)
                </label>
                <input
                  id="norcet-phone"
                  name="phone"
                  type="tel"
                  required
                  inputMode="numeric"
                  autoComplete="tel"
                  pattern="[0-9+ -]{10,15}"
                  placeholder="10-digit mobile number"
                  className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-teal focus:ring-2 focus:ring-teal/20"
                />
              </div>

              <div>
                <label
                  htmlFor="norcet-qualification"
                  className="mb-1.5 block text-sm font-semibold text-navy"
                >
                  Your nursing qualification
                </label>
                <select
                  id="norcet-qualification"
                  name="qualification"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20"
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  {QUALIFICATIONS.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="norcet-message"
                  className="mb-1.5 block text-sm font-semibold text-navy"
                >
                  Anything you want to ask?{" "}
                  <span className="font-normal text-navy/45">(optional)</span>
                </label>
                <textarea
                  id="norcet-message"
                  name="message"
                  rows={2}
                  placeholder="Timing, language, Stage II help, anything"
                  className="w-full resize-none rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-teal focus:ring-2 focus:ring-teal/20"
                />
              </div>

              {status === "error" && (
                <p className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  Something went wrong. Try again, or{" "}
                  <a
                    href={enrolmentWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline underline-offset-2"
                  >
                    message us on WhatsApp
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange/30 transition-all duration-200 hover:bg-orange-dark hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-[18px] w-[18px] animate-spin" />
                    Sending enquiry…
                  </>
                ) : (
                  <>
                    <Send className="h-[17px] w-[17px]" />
                    Send enrolment enquiry
                  </>
                )}
              </button>

              <a
                href={enrolmentWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-sm text-sm font-semibold text-navy underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
              >
                <MessageCircle size={17} aria-hidden="true" />
                Enquire on WhatsApp
              </a>

              <p className="text-center text-xs text-navy/50">
                Already preparing for ANM/GNM?{" "}
                <Link
                  href="/course"
                  className="font-semibold text-navy underline decoration-navy/30 underline-offset-2 hover:text-orange"
                >
                  Explore the ANM/GNM course
                </Link>
                .
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
