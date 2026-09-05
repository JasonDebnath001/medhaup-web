import type { Metadata } from "next";
import {
  getCampaignPhase,
  teachersDayCampaign as campaign,
} from "./teachersDayCampaign";
import { SITE_URL } from "./seo";

export const CAMPAIGN_DESCRIPTION = `Teachers’ Day special: ${campaign.batchName} ANM/GNM 2027 batch at ${campaign.formattedPrice}. Valid 5–6 September 2026, until Sunday 11:59 p.m. IST. WhatsApp ${campaign.whatsappDisplay}.`;

export function withTeachersDayMetadata(
  base: Metadata,
  now: number,
  page = "ANM GNM 2027 Batch",
): Metadata {
  if (getCampaignPhase(now) !== "live") return base;
  const title = `Teachers’ Day: ${page} at ${campaign.formattedPrice} | medhaup`;
  return {
    ...base,
    title: { absolute: title },
    description: CAMPAIGN_DESCRIPTION,
    keywords: [
      ...(Array.isArray(base.keywords) ? base.keywords : []),
      "Teachers Day offer ANM GNM",
      "ANM GNM weekend batch offer",
      campaign.batchName,
    ],
    openGraph: { ...base.openGraph, title, description: CAMPAIGN_DESCRIPTION },
    twitter: {
      ...base.twitter,
      card: "summary_large_image",
      title,
      description: CAMPAIGN_DESCRIPTION,
    },
  };
}

export function getTeachersDayOfferSchema(now: number) {
  if (getCampaignPhase(now) !== "live") return null;
  return {
    "@type": "Offer",
    "@id": `${SITE_URL}/#${campaign.id}-offer`,
    name: `${campaign.title} for ${campaign.batchName}`,
    description: CAMPAIGN_DESCRIPTION,
    url: `${SITE_URL}/#teachers-day-offer`,
    price: String(campaign.price),
    priceCurrency: "INR",
    validFrom: campaign.startsAt,
    validThrough: campaign.validThrough,
    priceValidUntil: campaign.validThroughDate,
    seller: { "@id": `${SITE_URL}/#organization` },
    itemOffered: { "@id": `${SITE_URL}/course#course` },
    eligibleRegion: { "@type": "Country", name: "India" },
  };
}
