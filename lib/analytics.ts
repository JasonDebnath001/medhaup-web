"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { getAttributionEventParams } from "@/lib/attribution";

export type AnalyticsEventParams = Record<string, unknown>;

export type AnalyticsItem = {
  item_id: string;
  item_name: string;
  item_category?: string;
  price?: number;
  quantity?: number;
};

type Checkout = {
  currency: "INR";
  value: number;
  items: AnalyticsItem[];
  checkout_type: "whatsapp_store" | "app";
};

type Purchase = {
  transaction_id: string;
  currency: "INR";
  value: number;
  items: AnalyticsItem[];
};

/** Send an event only when GA is configured and running in the browser. */
export function trackGAEvent(
  eventName: string,
  params: AnalyticsEventParams = {},
) {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_GA_ID) return;

  sendGAEvent("event", eventName, {
    page_path: window.location.pathname,
    ...getAttributionEventParams(),
    ...params,
  });
}

export function trackBeginCheckout(checkout: Checkout) {
  trackGAEvent("begin_checkout", checkout);
}

/** Call only after the app or payment provider confirms payment. */
export function trackPurchase(purchase: Purchase) {
  trackGAEvent("purchase", purchase);
}
