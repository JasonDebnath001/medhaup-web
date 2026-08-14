"use client";

import { useEffect, useState } from "react";
import { isOfferLive, offerMsLeft } from "@/lib/offer";

/** True only after mount AND inside the offer window. Re-checks every
    30s so an open tab drops the theme at Sunday midnight by itself.
    Append ?offer=preview to any URL to force it on for testing. */
export function useOfferLive() {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).has("offer");
    const check = () => setLive(preview || isOfferLive());
    check();
    const id = setInterval(check, 30_000);
    return () => clearInterval(id);
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
