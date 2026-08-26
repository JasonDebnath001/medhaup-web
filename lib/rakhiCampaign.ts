export const rakhiCampaign = {
  id: "rakhi-2026",
  enabled: true,
  title: "Rakhi Offer",
  batchName: "নার্সিংলক্ষ্য 1.0",
  price: 1449,
  formattedPrice: "₹1,449",
  couponCode: "RAKHI2026",
  startsAt: "2026-08-28T00:00:00+05:30",
  endsAt: "2026-08-28T23:59:59.999+05:30",
  whatsappNumber: "918910840928",
  whatsappMessage:
    "Hi medhaup, I would like to enrol in নার্সিংলক্ষ্য 1.0 with the Rakhi offer of ₹1,449. Coupon code: RAKHI2026.",
} as const;

export type CampaignPhase = "upcoming" | "live" | "expired";

export const campaignStartsAt = new Date(rakhiCampaign.startsAt).getTime();
export const campaignEndsAt = new Date(rakhiCampaign.endsAt).getTime();

export function getCampaignPhase(now: number): CampaignPhase {
  if (!rakhiCampaign.enabled || now > campaignEndsAt) return "expired";
  if (now >= campaignStartsAt) return "live";
  return "upcoming";
}

export function getCampaignTimeRemaining(now: number, phase: CampaignPhase) {
  const target = phase === "upcoming" ? campaignStartsAt : campaignEndsAt + 1;
  const remaining = Math.max(0, target - now);
  const totalSeconds = Math.floor(remaining / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export const rakhiWhatsAppUrl = `https://wa.me/${rakhiCampaign.whatsappNumber}?text=${encodeURIComponent(rakhiCampaign.whatsappMessage)}`;
