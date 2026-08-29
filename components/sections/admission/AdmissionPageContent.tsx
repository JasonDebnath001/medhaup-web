"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  MessageCircle,
  CalendarDays,
  Clock,
  Wifi,
  IndianRupee,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  ShieldCheck,
  Download,
  UserRound,
  PhoneCall,
  Rocket,
} from "lucide-react";
import clsx from "clsx";
import { useSite } from "@/components/provider/SiteProvider";
import { trackGAEvent } from "@/lib/analytics";
import { appendAttributionToFormData } from "@/lib/attribution";
import type { Batch } from "@/lib/data";

/* ← Same Web3Forms access key as the contact page */
const WEB3FORMS_ACCESS_KEY = "e4e66ca4-46d3-42dc-97cb-af9fe61a4cd1";

/* ← Add your real store links */
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.zdrkue.ctqxio&pcampaignid=web_share";
const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL;

const FEES = {
  new: { label: "New Student", amount: "₹1,800" },
  old: { label: "Old Student", amount: "₹1,500" },
} as const;

const APP_STEPS = [
  { icon: Download, text: "Download the medhaup app" },
  { icon: UserRound, text: "Create your account" },
  { icon: Rocket, text: "Pay in-app & start learning" },
];

const FORM_STEPS = [
  { icon: Send, text: "Submit this form" },
  { icon: PhoneCall, text: "We call / WhatsApp you within 24 hours" },
  { icon: Rocket, text: "Complete admission with our guidance" },
];

const FAQS = [
  {
    q: "When do I pay?",
    a: "If you use the app, you pay securely inside the app when you enrol. If you request a callback, you pay only after we've talked and you're ready — nothing is charged through this website.",
  },
  {
    q: "How does EMI work?",
    a: "EMI options for the course fee are available inside the app at checkout. If you request a callback, we'll explain the instalment options before you pay anything.",
  },
  {
    q: "What if the batch fills up?",
    a: "Seats are limited per batch. If the current batch fills before your admission completes, you'll get priority for the next batch — we'll tell you honestly either way.",
  },
  {
    q: "Can I talk to someone before deciding?",
    a: "Yes — that's exactly what the callback option is for. You'll speak directly with Arushi, not a sales team.",
  },
];

type Status = "idle" | "sending" | "success" | "error";

export default function AdmissionPageContent({
  batch,
}: {
  batch: Batch | null;
}) {
  const SITE = useSite();
  const [status, setStatus] = useState<Status>("idle");
  const [studentType, setStudentType] = useState<"new" | "old">("new");

  /* Fallback keeps the page working even with no published batch —
     the admin panel controls this via the Batches collection. */
  const CURRENT_BATCH: Batch = batch ?? {
    id: "",
    name: "the upcoming batch",
    startDate: "To be announced",
    mode: "Online",
    timing: "To be announced",
    seatsFilled: 0,
    seatsTotal: 30,
  };

  const ADMISSION_WHATSAPP_URL = `https://wa.me/${
    SITE.whatsapp.number
  }?text=${encodeURIComponent(
    `Hi, I want to take admission in ${CURRENT_BATCH.name} of the ANM/GNM course.`,
  )}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("from_name", "medhaup Admission Request");
    data.append("form_type", "admission");
    data.append("batch", CURRENT_BATCH.name);
    appendAttributionToFormData(data);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        trackGAEvent("generate_lead", {
          lead_type: "admission_callback",
          batch_name: CURRENT_BATCH.name,
          student_type: studentType,
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

  const batchInfo = [
    { icon: CalendarDays, label: "Starts", value: CURRENT_BATCH.startDate },
    { icon: Clock, label: "Timing", value: CURRENT_BATCH.timing },
    { icon: Wifi, label: "Mode", value: `100% ${CURRENT_BATCH.mode}` },
    {
      icon: IndianRupee,
      label: "Fee",
      value: "₹1,800 new · ₹1,500 old · EMI",
    },
  ];

  return (
    <main className="w-full overflow-x-hidden">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-14 sm:pt-40 sm:pb-16">
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
          className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-orange/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full border border-orange/40 bg-orange/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange"
          >
            {CURRENT_BATCH.name} · Now Enrolling
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-heading mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Reserve your <span className="text-orange">seat</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mx-auto mt-4 max-w-xl text-white/65 sm:text-lg"
          >
            Two ways to join — do it yourself in the app in minutes, or let us
            guide you through it personally. Both lead to the same classroom.
          </motion.p>

          {/* Batch info strip */}
          <motion.ul
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mx-auto mt-9 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {batchInfo.map((item) => (
              <li
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm"
              >
                <item.icon size={17} className="mx-auto text-orange" />
                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                  {item.label}
                </p>
                <p className="font-heading mt-0.5 text-xs font-bold text-white sm:text-sm">
                  {item.value}
                </p>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ============ TWO PATHS ============ */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            {/* ---------- Path A: App (primary) ---------- */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
              className="relative flex flex-col overflow-hidden rounded-3xl bg-navy p-7 text-white shadow-2xl shadow-navy/25 sm:p-9"
            >
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange/20 blur-3xl"
              />

              <div className="relative flex-1">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
                  Fastest Way
                </span>
                <span className="mt-5 grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-orange">
                  <Smartphone size={27} />
                </span>
                <h2 className="font-heading mt-4 text-2xl font-extrabold">
                  Admit yourself in the app
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-white/65">
                  Download the medhaup app, choose your plan — new student, old
                  student, or EMI — and pay securely inside the app. You&apos;re
                  enrolled in minutes.
                </p>

                <ol className="mt-6 space-y-3">
                  {APP_STEPS.map((s, i) => (
                    <li key={s.text} className="flex items-center gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold text-orange">
                        {i + 1}
                      </span>
                      <span className="flex items-center gap-2 text-sm text-white/85">
                        <s.icon size={15} className="text-orange" />
                        {s.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Store buttons */}
              <div className="relative mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-orange px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange/25 transition-all duration-200 hover:bg-orange-dark"
                >
                  <Download size={17} />
                  Google Play
                </a>

                {APP_STORE_URL ? (
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-white/25 px-5 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10"
                  >
                    <Download size={17} />
                    App Store
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-full border-2 border-white/10 px-5 py-3.5 text-sm font-semibold text-white/45"
                  >
                    <Download size={17} />
                    App Store · Coming soon
                  </span>
                )}
              </div>
            </motion.div>

            {/* ---------- Path B: Callback form ---------- */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex min-w-0 flex-col rounded-3xl border border-navy/10 bg-cream p-7 sm:p-9"
            >
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-navy/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-navy">
                Guided Admission
              </span>
              <h2 className="font-heading mt-5 text-2xl font-extrabold text-navy">
                Or request a callback
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-navy/60">
                Have questions first? Fill this in and we&apos;ll personally
                guide you through admission — in Bengali or English.
              </p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6 text-center"
                >
                  <CheckCircle2 className="mx-auto h-9 w-9 text-green-600" />
                  <p className="font-heading mt-3 font-bold text-navy">
                    Seat request received!
                  </p>
                  <p className="mt-1 text-sm text-navy/65">
                    We&apos;ll contact you on WhatsApp or call within 24 hours.
                    Can&apos;t wait?
                  </p>

                  <a
                    href={ADMISSION_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
                  >
                    <MessageCircle size={16} />
                    WhatsApp us now
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div>
                    <label
                      htmlFor="adm-name"
                      className="mb-1.5 block text-sm font-semibold text-navy"
                    >
                      Full name
                    </label>
                    <input
                      id="adm-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Student's full name"
                      className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-orange focus:ring-2 focus:ring-orange/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="adm-phone"
                      className="mb-1.5 block text-sm font-semibold text-navy"
                    >
                      Phone (WhatsApp)
                    </label>
                    <input
                      id="adm-phone"
                      name="phone"
                      type="tel"
                      required
                      inputMode="numeric"
                      pattern="[0-9+ -]{10,15}"
                      placeholder="10-digit mobile number"
                      className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-orange focus:ring-2 focus:ring-orange/20"
                    />
                  </div>

                  {/* Student type toggle */}
                  <div>
                    <span className="mb-1.5 block text-sm font-semibold text-navy">
                      I am a
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {(["new", "old"] as const).map((type) => (
                        <label
                          key={type}
                          className={clsx(
                            "flex cursor-pointer flex-col items-center rounded-xl border-2 p-3.5 text-center transition-all duration-200",
                            studentType === type
                              ? "border-orange bg-orange/5"
                              : "border-navy/10 bg-white hover:border-navy/25",
                          )}
                        >
                          <input
                            type="radio"
                            name="student_type"
                            value={FEES[type].label}
                            checked={studentType === type}
                            onChange={() => setStudentType(type)}
                            className="sr-only"
                          />
                          <span className="text-sm font-bold text-navy">
                            {FEES[type].label}
                          </span>
                          <span
                            className={clsx(
                              "font-heading mt-1 text-lg font-extrabold",
                              studentType === type
                                ? "text-orange"
                                : "text-navy/50",
                            )}
                          >
                            {FEES[type].amount}
                          </span>
                        </label>
                      ))}
                    </div>
                    <p className="mt-1.5 text-xs text-navy/50">
                      Full 12-month fee · EMI options available
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="adm-message"
                      className="mb-1.5 block text-sm font-semibold text-navy"
                    >
                      Any questions?{" "}
                      <span className="font-normal text-navy/45">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="adm-message"
                      name="message"
                      rows={3}
                      placeholder="EMI, batch timing, eligibility — anything"
                      className="w-full resize-none rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-orange focus:ring-2 focus:ring-orange/20"
                    />
                  </div>

                  {status === "error" && (
                    <p className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      Something went wrong. Try again, or message us directly on
                      WhatsApp.
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
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-[17px] w-[17px]" />
                        Request Callback
                      </>
                    )}
                  </button>

                  {/* Callback steps */}
                  <ol className="space-y-2 pt-2">
                    {FORM_STEPS.map((s, i) => (
                      <li
                        key={s.text}
                        className="flex items-center gap-2.5 text-xs text-navy/55"
                      >
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy/8 text-[10px] font-bold text-navy">
                          {i + 1}
                        </span>
                        {s.text}
                      </li>
                    ))}
                  </ol>
                </form>
              )}
            </motion.div>
          </div>

          {/* Trust strip */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-xs text-navy/50"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-orange" />
              No payment on this website
            </span>
            <span className="flex items-center gap-1.5">
              <UserRound size={14} className="text-orange" />
              Talk to Arushi directly, not a sales team
            </span>
            <span className="flex items-center gap-1.5">
              <IndianRupee size={14} className="text-orange" />
              Fee confirmed before you pay anything
            </span>
          </motion.p>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="bg-cream py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-heading text-center text-2xl font-extrabold text-navy sm:text-3xl"
          >
            Admission <span className="text-orange">questions</span>
          </motion.h2>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2">
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-6"
              >
                <h3 className="font-heading font-bold text-navy">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
