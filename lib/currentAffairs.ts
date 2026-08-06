/* ----------------------------------------------------------------
   CURRENT AFFAIRS — monthly compiled PDFs + quick daily bullets.
   The admin panel will later push both from the dashboard.
----------------------------------------------------------------- */
export type MonthlyCA = {
  id: string;
  month: string; // "July 2026"
  title: string;
  description: string;
  language: "Bengali" | "English" | "Bengali + English";
  fileSize: string;
  fileUrl: string; // /public/resources/current-affairs/...
  isNew?: boolean;
};

export type DailyCA = {
  id: string;
  date: string; // ISO
  headline: string;
  detail: string;
  tag: "Health" | "National" | "West Bengal" | "Science" | "Sports" | "Awards";
};

export const MONTHLY_CA: MonthlyCA[] = [
  {
    id: "ca-jul-2026",
    month: "July 2026",
    title: "Monthly Current Affairs — July 2026",
    description:
      "60+ exam-relevant events with one-line explanations, health & WB focus.",
    language: "Bengali + English",
    fileSize: "1.1 MB",
    fileUrl: "/resources/current-affairs/ca-july-2026.pdf",
    isNew: true,
  },
  {
    id: "ca-jun-2026",
    month: "June 2026",
    title: "Monthly Current Affairs — June 2026",
    description:
      "All June events that can appear in the GK section, compiled and filtered.",
    language: "Bengali + English",
    fileSize: "1.0 MB",
    fileUrl: "/resources/current-affairs/ca-june-2026.pdf",
  },
];

export const DAILY_CA: DailyCA[] = [
  {
    id: "d1",
    date: "2026-08-04",
    headline: "National Handloom Day observed on 7 August",
    detail:
      "Commemorates the Swadeshi Movement launched in 1905 in Calcutta — a frequent WB-linked GK question.",
    tag: "National",
  },
  {
    id: "d2",
    date: "2026-08-03",
    headline: "World Breastfeeding Week: 1–7 August",
    detail:
      "Health-day dates are among the most repeated GK questions in nursing entrances.",
    tag: "Health",
  },
];
