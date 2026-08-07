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

const SAFE_LINK_CATEGORIES: Record<string, string> = {
  "/": "home",
  "/about": "about",
  "/admission": "admission",
  "/course": "course",
  "/contact": "contact",
  "/blogs": "blogs",
  "/current-affairs": "current_affairs",
  "/gallery": "gallery",
  "/pyq": "pyq",
  "/resources": "resources",
  "/store": "store",
  "/syllabus": "syllabus",
};

const SAFE_DOWNLOAD_FILE_CATEGORIES: Record<string, string> = {
  "syllabus.pdf": "syllabus",
  "syllabus": "syllabus",
};

function getSafeLinkCategory(href: string) {
  try {
    const parsedHref = new URL(href, window.location.origin);
    const pathname = parsedHref.pathname.replace(/\/$/, "") || "/";
    const segments = pathname.split("/").filter(Boolean);
    const basePath = segments.length > 0 ? `/${segments[0]}` : "/";

    return SAFE_LINK_CATEGORIES[pathname] ?? SAFE_LINK_CATEGORIES[basePath];
  } catch {
    return undefined;
  }
}

function getSafeDownloadCategory(href: string) {
  try {
    const parsedHref = new URL(href, window.location.origin);
    const pathname = decodeURIComponent(parsedHref.pathname).toLowerCase();
    const fileName = pathname.split("/").filter(Boolean).pop() ?? "";

    if (pathname.includes("/syllabus/")) {
      return "syllabus";
    }

    return SAFE_DOWNLOAD_FILE_CATEGORIES[fileName];
  } catch {
    return undefined;
  }
}

export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (!href) return;

      const safeLinkCategory = getSafeLinkCategory(href);
      const common = {
        page: window.location.pathname,
        ...(safeLinkCategory ? { link_text: safeLinkCategory } : {}),
      };

      let parsedHref: URL | undefined;

      try {
        parsedHref = new URL(href, window.location.origin);
      } catch {
        parsedHref = undefined;
      }

      const isWhatsappLink =
        parsedHref !== undefined &&
        (parsedHref.hostname === "wa.me" ||
          parsedHref.hostname === "whatsapp.com" ||
          parsedHref.hostname.endsWith(".whatsapp.com"));

      if (isWhatsappLink) {
        sendGAEvent("event", "whatsapp_click", {
          ...common,
          kind: parsedHref?.pathname.includes("/channel/") ? "channel" : "chat",
        });
      } else if (href.startsWith("tel:")) {
        sendGAEvent("event", "phone_click", common);
      } else if (href.startsWith("mailto:")) {
        sendGAEvent("event", "email_click", common);
      } else if (
        /\.pdf($|\?)/i.test(href) ||
        href.includes("/storage/v1/object/")
      ) {
        const file = getSafeDownloadCategory(href);
        sendGAEvent("event", "file_download", {
          ...common,
          ...(file ? { file } : {}),
        });
      }
    };

    // capture phase so we fire even if a component stops propagation
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
