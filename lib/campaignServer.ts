import "server-only";
import { cache } from "react";
import { connection } from "next/server";

// One request-time clock for metadata, structured data, and the hydrated UI.
export const getCampaignNow = cache(async () => {
  await connection();
  return Date.now();
});
