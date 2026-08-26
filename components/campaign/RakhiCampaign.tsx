"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Copy,
  MessageCircle,
} from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  getCampaignPhase,
  getCampaignTimeRemaining,
  rakhiCampaign,
  rakhiWhatsAppUrl,
  type CampaignPhase,
} from "@/lib/rakhiCampaign";
import styles from "./RakhiCampaign.module.css";

function track(event: string, placement: string) {
  if (!process.env.NEXT_PUBLIC_GA_ID) return;
  sendGAEvent("event", event, { campaign_id: rakhiCampaign.id, placement });
}

function CampaignCountdown({
  now,
  phase,
}: {
  now: number;
  phase: CampaignPhase;
}) {
  const time = getCampaignTimeRemaining(now, phase);
  const units = [
    [time.days, "DAYS"],
    [time.hours, "HRS"],
    [time.minutes, "MIN"],
    [time.seconds, "SEC"],
  ] as const;
  return (
    <div className={styles.countdown}>
      <div className={styles.countdownHeader}>
        <span>
          {phase === "live" ? "Offer ends in" : "Rakhi Gift Pass unlocks in"}
        </span>
        {phase === "live" && <span className={styles.live}>LIVE NOW</span>}
      </div>
      <div
        className={styles.timeGrid}
        role="timer"
        aria-label={`${time.days} days, ${time.hours} hours, ${time.minutes} minutes remaining`}
      >
        {units.map(([value, label]) => (
          <div className={styles.timeUnit} key={label}>
            <span className={styles.timeNumber}>
              {String(value).padStart(2, "0")}
            </span>
            <span className={styles.timeLabel}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CouponCode() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );
  async function copyCoupon() {
    await navigator.clipboard.writeText(rakhiCampaign.couponCode);
    setCopied(true);
    track("rakhi_coupon_copy", "gift_pass");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1800);
  }
  return (
    <div className={styles.couponRow}>
      <div>
        <span className={styles.couponLabel}>USE CODE</span>
        <span className={styles.couponCode}>{rakhiCampaign.couponCode}</span>
      </div>
      <button
        className={styles.copyButton}
        type="button"
        onClick={copyCoupon}
        aria-label="Copy coupon code RAKHI2026"
      >
        {copied ? (
          <Check size={13} aria-hidden="true" />
        ) : (
          <Copy size={13} aria-hidden="true" />
        )}
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

function WhatsAppLink({
  phase,
  placement,
}: {
  phase: CampaignPhase;
  placement: string;
}) {
  return (
    <a
      className={styles.whatsapp}
      href={rakhiWhatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("rakhi_whatsapp_click", placement)}
    >
      <MessageCircle size={18} aria-hidden="true" />
      {phase === "live"
        ? `Claim ${rakhiCampaign.formattedPrice} Offer on WhatsApp`
        : "Get Rakhi Offer Details"}
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}

export function CampaignAnnouncementBar({ phase }: { phase: CampaignPhase }) {
  return (
    <aside className={styles.announcement} aria-label="Rakhi special campaign">
      <div className={styles.announcementInner}>
        <span className={styles.announcementThread} aria-hidden="true" />
        <span className={styles.miniRakhi} aria-hidden="true" />
        <p className={styles.announcementCopy}>
          <strong>
            {phase === "live"
              ? "RAKHI SPECIAL · TODAY ONLY"
              : "RAKHI GIFT PASS · 28 AUGUST"}
          </strong>
          <span>
            {rakhiCampaign.batchName} · {rakhiCampaign.formattedPrice}
            {phase === "live" ? ` · CODE ${rakhiCampaign.couponCode}` : ""}
          </span>
        </p>
        <Link
          className={styles.announcementCta}
          href="/#rakhi-gift-pass"
          onClick={() => track("rakhi_offer_cta_click", "announcement_bar")}
        >
          {phase === "live" ? "Claim Offer" : "View Offer"}
        </Link>
      </div>
    </aside>
  );
}

export function RakhiGiftPass({ initialNow }: { initialNow: number }) {
  const [now, setNow] = useState(initialNow);
  const phase = getCampaignPhase(now);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    track("rakhi_offer_view", "homepage_feature");
    return () => window.clearInterval(timer);
  }, []);
  if (phase === "expired") return null;
  const revealTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <motion.section
      id="rakhi-gift-pass"
      className={styles.section}
      aria-labelledby="rakhi-heading"
      initial={reduceMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0 : 0.35 }}
    >
      <motion.div
        className={styles.shell}
        initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={revealTransition}
      >
        <motion.div
          className={styles.campaignKicker}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...revealTransition, delay: reduceMotion ? 0 : 0.1 }}
        >
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            RAKHI SPECIAL · 28 AUGUST ONLY
          </span>
        </motion.div>

        <motion.div
          className={styles.rakhiArtwork}
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.15 }}
        >
          <svg viewBox="0 38 760 178" fill="none">
            <motion.path
              className={styles.threadLine}
              d="M-20 121C72 89 151 150 252 120C294 108 319 108 350 119"
              stroke="#FA6F2D"
              strokeWidth="5"
              strokeLinecap="round"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0 : 1.15, delay: reduceMotion ? 0 : 0.22, ease: "easeInOut" }}
            />
            <motion.path
              className={styles.threadLineDelayed}
              d="M-20 132C78 101 153 160 255 130C296 118 321 118 350 128"
              stroke="#FFFFFF"
              strokeOpacity=".72"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="7 8"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.72 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0 : 1.05, delay: reduceMotion ? 0 : 0.38, ease: "easeInOut" }}
            />
            <motion.path
              className={styles.threadLine}
              d="M410 119C454 105 504 99 555 116C631 142 687 103 780 121"
              stroke="#FA6F2D"
              strokeWidth="5"
              strokeLinecap="round"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0 : 1.15, delay: reduceMotion ? 0 : 0.22, ease: "easeInOut" }}
            />
            <motion.path
              className={styles.threadLineDelayed}
              d="M410 129C456 115 505 109 556 126C630 151 690 113 780 131"
              stroke="#FFFFFF"
              strokeOpacity=".72"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="7 8"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.72 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0 : 1.05, delay: reduceMotion ? 0 : 0.38, ease: "easeInOut" }}
            />

            {[108, 137, 166, 195, 224, 536, 565, 594, 623, 652].map(
              (x, index) => (
                <motion.circle
                  key={x}
                  cx={x}
                  cy={index < 5 ? 129 + (index % 2 ? 7 : -4) : 126 + (index % 2 ? -5 : 6)}
                  r={index % 2 ? 5 : 3.5}
                  fill={index % 2 ? "#FFFFFF" : "#FA6F2D"}
                  fillOpacity={index % 2 ? ".8" : "1"}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : 0.66 + index * 0.045, type: "spring", stiffness: 260 }}
                />
              ),
            )}

            <g transform="translate(380 124)">
              <motion.g
                initial={reduceMotion ? false : { opacity: 0, scale: 0.55, rotate: -22 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.45, type: "spring", stiffness: 145, damping: 15 }}
              >
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
                  (angle) => (
                    <ellipse key={angle} cx="0" cy="-58" rx="13" ry="29" transform={`rotate(${angle})`} fill="#FA6F2D" stroke="#FFFFFF" strokeOpacity=".55" />
                  ),
                )}
                <circle r="61" fill="#021142" stroke="#FA6F2D" strokeWidth="3" />
                <circle r="48" fill="#FFFFFF" />
                <circle r="39" fill="#FA6F2D" />
                <circle r="29" fill="#021142" />
                <text x="0" y="-2" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="800">28</text>
                <text x="0" y="13" textAnchor="middle" fill="#FA6F2D" fontSize="8" fontWeight="800" letterSpacing="1.5">AUG</text>
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <circle key={angle} cx="0" cy="-33" r="3.2" transform={`rotate(${angle})`} fill="#FFFFFF" />
                ))}
              </motion.g>
            </g>
          </svg>
          <span>A THREAD OF CARE · A GIFT FOR HER DREAM</span>
        </motion.div>

        <div className={styles.contentGrid}>
          <motion.div
            className={styles.copy}
            initial={reduceMotion ? false : { opacity: 0, x: -34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ ...revealTransition, delay: reduceMotion ? 0 : 0.65 }}
          >
            <h2 id="rakhi-heading" className={styles.headline}>
              This Rakhi, gift a step towards a <em>nursing career.</em>
            </h2>
            <p className={styles.bengali}>
              {rakhiCampaign.batchName}-এর জন্য একদিনের বিশেষ মূল্য
            </p>
            <p className={styles.support}>
              ANM/GNM 2027 preparation-এর জন্য একটি বিশেষ একদিনের সুযোগ।
            </p>
            <p className={styles.emotionalCopy}>
              একটি ছোট উপহার, একটি বড় স্বপ্নের পথে।
            </p>
          </motion.div>

          <motion.article
            className={styles.pass}
            aria-label="medhaup Rakhi Gift Pass"
            initial={reduceMotion ? false : { opacity: 0, x: 38, rotate: 1.8 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            whileHover={reduceMotion ? undefined : { y: -7, rotate: -0.35 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ ...revealTransition, delay: reduceMotion ? 0 : 0.72 }}
          >
            <div className={styles.passIdentity}>
              <span>MEDHAUP · RAKHI GIFT PASS</span>
              <span>2026 / 01</span>
            </div>
            <h3 className={styles.passBatch}>{rakhiCampaign.batchName}</h3>
            <p className={styles.priceLabel}>ONE-DAY SPECIAL PRICE</p>
            <p className={styles.price}>{rakhiCampaign.formattedPrice}</p>
            <CouponCode />
            <CampaignCountdown now={now} phase={phase} />
            <WhatsAppLink phase={phase} placement="gift_pass" />
            <p className={styles.passNote}>
              Admission support directly on WhatsApp · Valid only on 28 August
              2026
            </p>
          </motion.article>
        </div>
      </motion.div>
    </motion.section>
  );
}

export function MobileCampaignCTA({ phase }: { phase: CampaignPhase }) {
  const live = phase === "live";
  return (
    <aside className={styles.sticky} aria-label="Rakhi offer quick action">
      <p className={styles.stickyCopy}>
        <strong>Rakhi {live ? "Offer" : "Gift Pass"}</strong>
        <span>
          {rakhiCampaign.formattedPrice} {live ? "Today Only" : "· 28 August"}
        </span>
      </p>
      {live ? (
        <a
          className={styles.stickyButton}
          href={rakhiWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("rakhi_whatsapp_click", "mobile_sticky")}
        >
          Claim Offer <ArrowRight size={13} aria-hidden="true" />
        </a>
      ) : (
        <Link
          className={styles.stickyButton}
          href="/#rakhi-gift-pass"
          onClick={() => track("rakhi_offer_cta_click", "mobile_sticky")}
        >
          View Offer <ArrowDown size={13} aria-hidden="true" />
        </Link>
      )}
    </aside>
  );
}

export function useCampaignClock(initialNow: number) {
  const [now, setNow] = useState(initialNow);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return useMemo(() => ({ now, phase: getCampaignPhase(now) }), [now]);
}
