"use client";

import { X, ArrowRight, Share2, Timer } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";
import { useEffect, useState } from "react";
import { useSite } from "@/components/provider/SiteProvider";
import { OFFER, offerWaUrl, offerShareUrl } from "@/lib/offer";
import { useOfferLive, useOfferCountdown, fmt } from "./useOffer";

/* ============================================================
   Ashoka Chakra — 24 spokes, colour from currentColor.
============================================================ */
export function AshokaChakra({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`animate-[spin_90s_linear_infinite] motion-reduce:animate-none ${className}`}
    >
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3.5" />
      <circle cx="50" cy="50" r="7" fill="currentColor" />
      {Array.from({ length: 24 }, (_, i) => (
        <line
          key={i}
          x1="50" y1="50" x2="50" y2="7"
          stroke="currentColor" strokeWidth="1.8"
          transform={`rotate(${(i * 360) / 24} 50 50)`}
        />
      ))}
    </svg>
  );
}

/* Tiny SVG flag — replaces the flag emoji, which renders as the
   letters "IN" on Windows. */
export function FlagIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" aria-hidden="true" className={className}>
      <rect width="24" height="16" rx="2.5" fill="#f4f4f4" />
      <path d="M0 2.5A2.5 2.5 0 0 1 2.5 0h19A2.5 2.5 0 0 1 24 2.5v2.9H0Z" fill="#FF9933" />
      <path d="M0 10.6h24v2.9a2.5 2.5 0 0 1-2.5 2.5h-19A2.5 2.5 0 0 1 0 13.5Z" fill="#138808" />
      <circle cx="12" cy="8" r="2" fill="none" stroke="#1a0c70" strokeWidth="0.8" />
    </svg>
  );
}

/* Paper kite with a curling tail. */
function Kite({ className = "", color }: { className?: string; color: string }) {
  return (
    <svg viewBox="0 0 40 64" aria-hidden="true" className={className}>
      <path d="M20 2 L37 22 L20 42 L3 22 Z" fill={color} />
      <line x1="20" y1="2" x2="20" y2="42" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.2" />
      <line x1="3" y1="22" x2="37" y2="22" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.2" />
      <path
        d="M20 42 C 24 48, 14 52, 19 58 C 22 61, 17 62, 18 63"
        fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.8"
      />
    </svg>
  );
}

const TRICOLOR =
  "linear-gradient(to right, #FF9933 0 33.3%, #f1f1f1 33.3% 66.6%, #138808 66.6% 100%)";

/* ============================================================
   ANNOUNCEMENT BAR
============================================================ */
export function OfferBar() {
  const live = useOfferLive();
  const { h, m, s } = useOfferCountdown();
  const site = useSite();
  const [dismissed, setDismissed] = useState(false);
  const show = live && !dismissed;

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--offer-h",
      show ? "2.75rem" : "0px",
    );
    return () => {
      document.documentElement.style.setProperty("--offer-h", "0px");
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-11 bg-navy-dark text-white">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px]" style={{ background: TRICOLOR }} />
      <div className="mx-auto flex h-full max-w-6xl items-center justify-center gap-2 px-9 sm:gap-4 sm:px-6">
        <FlagIcon className="hidden h-3.5 w-auto shrink-0 min-[380px]:block" />
        <p className="truncate text-[11px] font-semibold sm:text-sm">
          <span className="hidden sm:inline">{OFFER.title} — </span>
          Full course{" "}
          <span className="text-white/50 line-through">
            ₹{OFFER.regularPrice.toLocaleString("en-IN")}
          </span>{" "}
          <span className="font-extrabold text-orange">
            ₹{OFFER.price.toLocaleString("en-IN")}
          </span>{" "}
          for everyone
        </p>

        <span className="hidden items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 font-mono text-xs font-bold tabular-nums md:inline-flex">
          <Timer size={12} className="text-orange" />
          {fmt(h, m, s)}
        </span>

        <a href={offerWaUrl(site.whatsapp.number)} target="_blank" rel="noopener noreferrer"
          onClick={() => sendGAEvent("event", "offer_cta_click", { placement: "bar" })}
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-orange px-3 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-orange-dark sm:text-xs">
          Claim <ArrowRight size={12} />
        </a>
      </div>

      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss offer bar"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X size={14} />
      </button>
    </div>
  );
}

/* ============================================================
   HOMEPAGE SECTION — "Freedom to dream. Freedom to learn."
============================================================ */
export default function IndependenceOffer() {
  const live = useOfferLive();
  const { h, m, s } = useOfferCountdown();
  const site = useSite();
  const reduceMotion = useReducedMotion();

  if (!live) return null;

  const float = (dur: number, drift: number) =>
    reduceMotion
      ? {}
      : {
          animate: { y: [0, -drift, 0], rotate: [-5, 5, -5] },
          transition: { duration: dur, repeat: Infinity, ease: "easeInOut" as const },
        };

  const units = [
    { v: h, l: "hrs" },
    { v: m, l: "min" },
    { v: s, l: "sec" },
  ];

  return (
    <section className="relative overflow-hidden bg-navy">
      {/* Tricolor hairlines framing the section */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-1" style={{ background: TRICOLOR }} />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-10 h-1" style={{ background: TRICOLOR }} />

      {/* Faint grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ---- The dawn: tricolor glow on the horizon ---- */}
      <div
        aria-hidden="true"
        className="absolute -bottom-32 left-1/2 h-[18rem] w-[130%] max-w-[60rem] -translate-x-1/2 rounded-t-full blur-3xl sm:-bottom-44 sm:h-[26rem]"
        style={{
          background:
            "linear-gradient(to top, rgba(19,136,8,0.35), rgba(255,255,255,0.10) 45%, rgba(255,153,51,0.35))",
        }}
      />
      {/* ---- The chakra, rising like a sun ---- */}
      <AshokaChakra className="absolute -bottom-36 left-1/2 h-[18rem] w-[18rem] -translate-x-1/2 text-white/[0.08] sm:-bottom-56 sm:h-[30rem] sm:w-[30rem] lg:-bottom-64 lg:h-[36rem] lg:w-[36rem]" />

      {/* ---- Kites: small + tucked into corners on mobile, larger on desktop ---- */}
      <motion.div {...float(7, 12)} className="absolute left-2 top-8 sm:left-[6%] sm:top-16">
        <Kite color="#FF9933" className="h-9 w-auto opacity-60 sm:h-16 sm:opacity-80" />
      </motion.div>
      <motion.div {...float(9, 10)} className="absolute right-2 top-12 sm:right-[8%] sm:top-24">
        <Kite color="#138808" className="h-8 w-auto opacity-60 sm:h-14 sm:opacity-80" />
      </motion.div>
      <motion.div {...float(11, 16)} className="absolute left-[18%] top-44 hidden lg:block">
        <Kite color="#ffffff" className="h-9 w-auto opacity-30" />
      </motion.div>
      <motion.div {...float(8, 12)} className="absolute right-[20%] top-6 hidden lg:block">
        <Kite color="#fe7b30" className="h-8 w-auto opacity-40" />
      </motion.div>

      {/* ---- Content ---- */}
      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:gap-2.5 sm:px-5 sm:py-2 sm:text-xs sm:tracking-[0.2em]">
            <FlagIcon className="h-3 w-auto shrink-0 sm:h-3.5" />
            <span className="truncate">80th Independence Day · 15–16 Aug</span>
          </span>

          <h2 className="font-heading mt-6 text-[2rem] font-extrabold leading-[1.08] tracking-tight text-white sm:mt-7 sm:text-5xl lg:text-6xl">
            Freedom to dream.
            <br />
            <span className="text-orange">Freedom to learn.</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:mt-6 sm:text-base">
            80 years ago, we won the freedom to choose our own future. This
            weekend, choose yours — the complete 12-month ANM/GNM course at one
            price for every student, new or returning.
          </p>

          {/* Price */}
          <div className="mt-8 flex flex-wrap items-end justify-center gap-x-3 gap-y-1 sm:mt-9 sm:gap-x-4">
            <p className="font-heading pb-1 text-lg font-bold text-white/35 line-through sm:pb-1.5 sm:text-2xl">
              ₹{OFFER.regularPrice.toLocaleString("en-IN")}
            </p>
            <p className="font-heading text-5xl font-extrabold leading-none text-white sm:text-6xl lg:text-7xl">
              ₹{OFFER.price.toLocaleString("en-IN")}
            </p>
            <p className="pb-1 text-left text-[11px] font-semibold leading-tight text-white/60 sm:pb-1.5 sm:text-sm">
              / 12 months
              <br />
              everyone
            </p>
          </div>

          {/* Countdown */}
          <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50 sm:mt-9 sm:text-[11px]">
            {OFFER.endsLabel}
          </p>
          <div className="mt-3 flex justify-center gap-2 sm:gap-2.5">
            {units.map((u) => (
              <div
                key={u.l}
                className="w-16 rounded-xl border border-white/10 bg-white/5 py-2.5 text-center backdrop-blur-sm sm:w-20 sm:rounded-2xl sm:py-3.5"
              >
                <p className="font-heading text-xl font-extrabold tabular-nums text-white sm:text-3xl">
                  {String(u.v).padStart(2, "0")}
                </p>
                <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-orange sm:text-[10px]">
                  {u.l}
                </p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row">
            <a href={offerWaUrl(site.whatsapp.number)} target="_blank" rel="noopener noreferrer"
              onClick={() => sendGAEvent("event", "offer_cta_click", { placement: "home_section" })}
              className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange/25 transition-all hover:-translate-y-0.5 hover:bg-orange-dark sm:w-auto sm:max-w-none sm:px-8 sm:py-4">
              Claim the offer on WhatsApp <ArrowRight size={16} className="shrink-0" />
            </a>
            <a href={offerShareUrl()} target="_blank" rel="noopener noreferrer"
              onClick={() => sendGAEvent("event", "offer_share_click", { placement: "home_section" })}
              className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto sm:max-w-none sm:px-7 sm:py-4">
              <Share2 size={15} className="shrink-0" /> Share with a friend
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}