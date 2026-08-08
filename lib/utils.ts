import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/* ----------------------------------------------------------------
   Timezone-safe date formatting, pinned to IST so the server
   (Vercel, UTC) and every visitor's browser show the same date.
   Handles both plain dates ("2026-08-08") and full timestamps.
----------------------------------------------------------------- */
const asISTDate = (value: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T00:00:00+05:30`) // plain date = that day in IST
    : new Date(value);

export const formatDate = (value: string) => {
  const d = asISTDate(value);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
};

export const formatDateShort = (value: string) => {
  const d = asISTDate(value);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    timeZone: "Asia/Kolkata",
  });
};