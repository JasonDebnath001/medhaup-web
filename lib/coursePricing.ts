import {
  getCampaignPhase,
  teachersDayCampaign as campaign,
  teachersDayWhatsAppUrl,
} from "./teachersDayCampaign";

export const COURSE_DURATION_MONTHS = 12;

export const COURSE_PLANS = [
  {
    id: "new_student",
    name: "New Students",
    tag: "Most Common",
    price: 1_800,
    monthly: 150,
    highlight: true,
    note: "For students joining MedhaUp for the first time.",
  },
  {
    id: "returning_student",
    name: "Old Students",
    tag: "Returning Discount",
    price: 1_500,
    monthly: 125,
    highlight: false,
    note: "For students who were part of a previous MedhaUp batch.",
  },
] as const;

export const COURSE_EMI_AVAILABLE = true;

export function formatINR(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function getTrustedCoursePricingContext(now = Date.now()) {
  const newStudentPlan = COURSE_PLANS[0];
  const returningStudentPlan = COURSE_PLANS[1];

  const regular = `The regular full ${COURSE_DURATION_MONTHS}-month course fee is ${formatINR(newStudentPlan.price)} for new students and ${formatINR(returningStudentPlan.price)} for returning medhaup students. EMI is available for regular plans. Students should confirm the current payable amount during admission before paying.`;
  return getCampaignPhase(now) === "live"
    ? `Verified active offer: ${campaign.title}, ${campaign.batchName} ANM/GNM 2027 special batch price ${campaign.formattedPrice}. Valid ${campaign.dateLabel}, until ${campaign.deadlineLabel}. Admission WhatsApp: ${campaign.whatsappDisplay}; link: ${teachersDayWhatsAppUrl}. No coupon code is required. Do not promise offer EMI or automatic in-app discounts. ${regular}`
    : regular;
}
