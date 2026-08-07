"use client";

/* ----------------------------------------------------------------
   GA4 custom-event tracking for the CTAs that actually matter.

   One global click listener (event delegation) turns every
   WhatsApp / phone / email tap and PDF download into a named GA4
   event — no per-component wiring, and future CTAs are covered
   automatically. Rendered once from the root layout, next to
   <GoogleAnalytics />.
----------------------------------------------------------------- */
import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (!href) return;

      const common = {
        page: window.location.pathname,
        link_text: (anchor.textContent ?? "").trim().slice(0, 80),
      };

      if (href.includes("wa.me") || href.includes("whatsapp.com")) {
        sendGAEvent("event", "whatsapp_click", {
          ...common,
          kind: href.includes("channel") ? "channel" : "chat",
        });
      } else if (href.startsWith("tel:")) {
        sendGAEvent("event", "phone_click", common);
      } else if (href.startsWith("mailto:")) {
        sendGAEvent("event", "email_click", common);
      } else if (
        /\.pdf($|\?)/i.test(href) ||
        href.includes("/storage/v1/object/")
      ) {
        const file = decodeURIComponent(
          href.split("?")[0].split("/").pop() ?? "unknown",
        );
        sendGAEvent("event", "file_download", { ...common, file });
      }
    };

    // capture phase so we fire even if a component stops propagation
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
