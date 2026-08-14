"use client";

import { useEffect, useState } from "react";
import { isOfferLive, offerMsLeft, OFFER } from "@/lib/offer";

/** True only after mount AND inside the offer window. Re-checks every
    30s so an open tab drops the theme at Sunday midnight by itself.
    Append ?offer=preview to any URL to force it on for testing. */
export function useOfferLive() {
  const [live, setLive] = useState(false);
  useEffect(() => {
    // Preview override only when query exactly equals `offer=preview`
    // and only outside production.
    const params = new URLSearchParams(window.location.search);
    const preview = params.get("offer") === "preview" && process.env.NODE_ENV !== "production";

    const check = () => setLive(preview || isOfferLive());
    check();

    // Fallback periodic check so long-open tabs update eventually.
    const intervalId = window.setInterval(check, 30_000);

    // Schedule a timeout at the next offer boundary (start or end)
    // so the state flips exactly when the offer window opens/closes.
    let timeoutId: number | null = null;
    const scheduleNext = () => {
      const now = Date.now();
      const start = Date.parse(OFFER.start);
      const end = Date.parse(OFFER.end);
      let nextMs = Number.POSITIVE_INFINITY;
      if (now < start) nextMs = start - now;
      else if (now >= start && now < end) nextMs = end - now;

      if (Number.isFinite(nextMs) && nextMs > 0) {
        // small buffer to ensure we've crossed the boundary
        timeoutId = window.setTimeout(() => {
          check();
          scheduleNext();
        }, nextMs + 50);
      }
    };
    scheduleNext();

    return () => {
      if (timeoutId !== null) clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);
  return live;
}

/** Ticking countdown to the offer end. */
export function useOfferCountdown() {
  const [left, setLeft] = useState(0);
  useEffect(() => {
    const tick = () => setLeft(offerMsLeft());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return {
    h: Math.floor(left / 3_600_000),
    m: Math.floor((left % 3_600_000) / 60_000),
    s: Math.floor((left % 60_000) / 1000),
    over: left <= 0,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");
export const fmt = (h: number, m: number, s: number) =>
  `${pad(h)}h ${pad(m)}m ${pad(s)}s`;
