"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Phone,
  Mail,
  BellRing,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useSite } from "@/components/provider/SiteProvider";
import { trackGAEvent } from "@/lib/analytics";

/* ← Get your free access key at https://web3forms.com and paste it here */
const WEB3FORMS_ACCESS_KEY = "fafed16a-f163-4081-bd76-650255cc93fc";

const SUBJECTS = [
  "Admission query",
  "Fees & EMI",
  "Batch timing",
  "Free resources",
  "Other",
];

const FAQS = [
  {
    q: "What is the course fee?",
    a: "₹1,800 for the full 12-month course (₹1,500 for returning students). EMI is available.",
  },
  {
    q: "Is the course fully online?",
    a: "Yes — live classes Mon–Sat with recordings, so you can attend from anywhere in West Bengal.",
  },
  {
    q: "Can Bengali-medium students join?",
    a: "Absolutely. Classes and notes are in Bengali and English — the same languages the exam paper uses.",
  },
  {
    q: "How do I take admission?",
    a: "Head to the admission page, fill in your details, and we'll guide you through the rest on WhatsApp.",
  },
];

type Status = "idle" | "sending" | "success" | "error";

export default function ContactPageContent() {
  const SITE = useSite();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("from_name", "medhaup Website Contact Form");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        trackGAEvent("generate_lead", {
          lead_type: "contact_form",
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

  const channels = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      desc: "Fastest reply — usually within a few hours.",
      cta: "Chat on WhatsApp",
      href: SITE.whatsapp.chatUrl,
      accent: "bg-[#25D366]",
      external: true,
    },
    {
      icon: Phone,
      title: "Call Us",
      desc: `${SITE.phoneDisplay} · ${SITE.callingHours}`,
      cta: "Call Now",
      href: SITE.phoneHref,
      accent: "bg-navy",
      external: false,
    },
    {
      icon: Mail,
      title: "Email",
      desc: SITE.email,
      cta: "Send Email",
      href: SITE.emailHref,
      accent: "bg-orange",
      external: false,
    },
  ];

  return (
    <main className="w-full overflow-x-hidden">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-cream pt-32 pb-12 sm:pt-40 sm:pb-14">
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
            Contact
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-heading mt-5 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl"
          >
            Talk to us <span className="text-orange">before you decide</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mx-auto mt-4 max-w-lg text-navy/65 sm:text-lg"
          >
            Ask anything — course, fees, eligibility, batch timing. Bengali or
            English, whichever is comfortable.
          </motion.p>
        </div>
      </section>

      {/* ============ CHANNELS + FORM ============ */}
      <section className="w-full bg-white py-12 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="grid w-full grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
            {/* ---- Direct channels ---- */}
            <div className="w-full min-w-0 space-y-4">
              {channels.map((ch, i) => (
                <motion.a
                  key={ch.title}
                  href={ch.href}
                  {...(ch.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group block w-full rounded-3xl border border-navy/10 bg-cream p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-xl hover:shadow-navy/10 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-md sm:h-14 sm:w-14 ${ch.accent}`}
                    >
                      <ch.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-heading text-base font-bold text-navy sm:text-lg">
                        {ch.title}
                      </h2>
                      <p className="mt-0.5 break-words text-sm leading-relaxed text-navy/60">
                        {ch.desc}
                      </p>
                      <span className="mt-2 inline-block text-sm font-semibold text-orange transition-transform duration-200 group-hover:translate-x-1">
                        {ch.cta} →
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}

              {/* WhatsApp channel mini-strip — hidden until a channel URL
                  is set in the admin panel */}
              {SITE.whatsapp.channelUrl && (
                <motion.a
                  href={SITE.whatsapp.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.28 }}
                  className="group flex w-full items-start gap-3 rounded-2xl border border-dashed border-navy/20 p-4 transition-colors hover:border-orange/50 hover:bg-orange/5"
                >
                  <BellRing className="mt-0.5 h-[18px] w-[18px] shrink-0 text-orange" />
                  <p className="min-w-0 text-sm leading-relaxed text-navy/70">
                    Not ready to talk?{" "}
                    <span className="font-semibold text-navy group-hover:text-orange">
                      Follow our WhatsApp channel
                    </span>{" "}
                    for updates and free resources.
                  </p>
                </motion.a>
              )}
            </div>

            {/* ---- Form ---- */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="w-full min-w-0 rounded-3xl border border-navy/10 bg-cream p-5 sm:p-8"
            >
              <h2 className="font-heading text-lg font-extrabold text-navy sm:text-xl">
                Or send a message
              </h2>
              <p className="mt-1 text-sm text-navy/60">
                We&apos;ll reply on WhatsApp or call you back.
              </p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6 text-center"
                >
                  <CheckCircle2 className="mx-auto h-9 w-9 text-green-600" />
                  <p className="font-heading mt-3 font-bold text-navy">
                    Message sent!
                  </p>
                  <p className="mt-1 text-sm text-navy/65">
                    We&apos;ll get back to you within 24 hours. For faster
                    replies, message us on WhatsApp.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-sm font-semibold text-orange hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-5 space-y-4 sm:mt-6"
                >
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-semibold text-navy"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-orange focus:ring-2 focus:ring-orange/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-semibold text-navy"
                    >
                      Phone (WhatsApp preferred)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      inputMode="numeric"
                      pattern="[0-9+ -]{10,15}"
                      placeholder="10-digit mobile number"
                      className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-orange focus:ring-2 focus:ring-orange/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-1.5 block text-sm font-semibold text-navy"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      defaultValue=""
                      className="w-full appearance-none rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors focus:border-orange focus:ring-2 focus:ring-orange/20"
                    >
                      <option value="" disabled>
                        What is this about?
                      </option>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-semibold text-navy"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Write your question here — Bengali or English"
                      className="w-full resize-none rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-orange focus:ring-2 focus:ring-orange/20"
                    />
                  </div>

                  {status === "error" && (
                    <p className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      Something went wrong. Please try again, or message us
                      directly on WhatsApp.
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
                        <Send className="h-[17px] w-[17px] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
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
            Quick answers, <span className="text-orange">before you ask</span>
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

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center text-sm text-navy/60"
          >
            Ready to join?{" "}
            <Link
              href="/admission"
              className="font-semibold text-orange hover:underline"
            >
              Take Admission →
            </Link>
          </motion.p>
        </div>
      </section>
    </main>
  );
}
