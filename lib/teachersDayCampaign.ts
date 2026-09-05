export const teachersDayCampaign = {
  id: "teachers-day-2026",
  enabled: true,
  title: "Teachers’ Day Special",
  batchName: "নার্সিংলক্ষ্য 1.0",
  price: 1300,
  formattedPrice: "₹1,300",
  startsAt: "2026-09-05T00:00:00+05:30",
  // Exclusive boundary: the offer covers all of Sunday in India.
  endsAt: "2026-09-07T00:00:00+05:30",
  validThrough: "2026-09-06T23:59:59.999+05:30",
  validThroughDate: "2026-09-06",
  dateLabel: "5–6 September 2026",
  deadlineLabel: "Sunday, 6 September · 11:59 p.m. IST",
  whatsappNumber: "918910840928",
  whatsappDisplay: "8910840928",
  whatsappMessage:
    "Hi medhaup, I would like to take admission in নার্সিংলক্ষ্য 1.0 for ANM/GNM 2027 with the Teachers’ Day weekend offer of ₹1,300, valid 5–6 September 2026. Please help me enrol.",
} as const;

export type CampaignPhase = "upcoming" | "live" | "expired";
export const campaignStartsAt = Date.parse(teachersDayCampaign.startsAt);
export const campaignEndsAt = Date.parse(teachersDayCampaign.endsAt);

export function getCampaignPhase(now: number): CampaignPhase {
  if (
    !teachersDayCampaign.enabled ||
    !Number.isFinite(now) ||
    now >= campaignEndsAt
  )
    return "expired";
  return now >= campaignStartsAt ? "live" : "upcoming";
}

export function getCampaignTimeRemaining(now: number, phase: CampaignPhase) {
  const target = phase === "upcoming" ? campaignStartsAt : campaignEndsAt;
  const remaining = phase === "expired" ? 0 : Math.max(0, target - now);
  const totalSeconds = Math.ceil(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export const teachersDayWhatsAppUrl = `https://wa.me/${teachersDayCampaign.whatsappNumber}?text=${encodeURIComponent(teachersDayCampaign.whatsappMessage)}`;
