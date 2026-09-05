"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Link2 } from "lucide-react";
import {
  buildMarketingUrl,
  MARKETING_CHANNELS,
} from "@/lib/attribution";
import { SITE_URL } from "@/lib/seo";

const DESTINATIONS = [
  { label: "Admission page", value: "/admission" },
  { label: "Home page", value: "/" },
  { label: "Course page", value: "/course" },
  { label: "Contact page", value: "/contact" },
  { label: "Teachers’ Day offer", value: "/#teachers-day-offer" },
] as const;

export default function MarketingLinksPage() {
  const [campaign, setCampaign] = useState("teachers-day-2026");
  const [content, setContent] = useState("");
  const [destination, setDestination] = useState<string>("/admission");
  const [copiedSource, setCopiedSource] = useState<string>();

  const links = useMemo(
    () =>
      MARKETING_CHANNELS.map((channel) => ({
        ...channel,
        url: buildMarketingUrl({
          siteUrl: SITE_URL,
          destination,
          source: channel.source,
          medium: channel.medium,
          campaign,
          content,
        }),
      })),
    [campaign, content, destination],
  );

  async function copyLink(source: string, url: string) {
    await navigator.clipboard.writeText(url);
    setCopiedSource(source);
    window.setTimeout(() => setCopiedSource(undefined), 1800);
  }

  return (
    <div className="max-w-5xl">
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange/10 text-orange">
          <Link2 size={21} aria-hidden="true" />
        </span>
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-navy">
            Marketing links
          </h1>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-navy/60">
            Copy the matching link for every post, bio, video, ad, or WhatsApp
            message. Never publish the plain destination URL in a campaign.
          </p>
        </div>
      </div>

      <section className="mt-7 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="text-sm font-semibold text-navy">Campaign</span>
            <input
              value={campaign}
              onChange={(event) => setCampaign(event.target.value)}
              placeholder="teachers-day-2026"
              className="mt-1.5 w-full rounded-xl border border-navy/15 bg-white px-3.5 py-3 text-sm text-navy outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-navy">Destination</span>
            <select
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-navy/15 bg-white px-3.5 py-3 text-sm text-navy outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
            >
              {DESTINATIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-navy">
              Content label <span className="font-normal text-navy/45">(optional)</span>
            </span>
            <input
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="reel-01 or bio"
              className="mt-1.5 w-full rounded-xl border border-navy/15 bg-white px-3.5 py-3 text-sm text-navy outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
            />
          </label>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-navy/50">
          Names are normalized to lowercase with hyphens. Use one campaign name
          consistently; use the content label to compare individual posts or ads.
        </p>
      </section>

      {!campaign.trim() && (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Enter a campaign name before copying a link.
        </p>
      )}

      <section className="mt-5 grid gap-4 lg:grid-cols-2">
        {links.map((link) => (
          <article
            key={link.source}
            className="min-w-0 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-heading font-bold text-navy">{link.label}</h2>
                <p className="mt-0.5 text-xs text-navy/50">
                  {link.source} / {link.medium}
                </p>
              </div>
              <button
                type="button"
                disabled={!campaign.trim()}
                onClick={() => void copyLink(link.source, link.url)}
                className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-45"
              >
                {copiedSource === link.source ? (
                  <Check size={16} aria-hidden="true" />
                ) : (
                  <Copy size={16} aria-hidden="true" />
                )}
                {copiedSource === link.source ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="mt-4 break-all rounded-xl bg-cream p-3 font-mono text-xs leading-relaxed text-navy/70">
              {link.url}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
