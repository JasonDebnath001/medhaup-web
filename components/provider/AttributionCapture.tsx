"use client";

import { useEffect } from "react";
import { captureMarketingAttribution } from "@/lib/attribution";

/** Capture an inbound tagged visit independently of whether GA4 is enabled. */
export default function AttributionCapture() {
  useEffect(() => {
    captureMarketingAttribution();
  }, []);

  return null;
}
