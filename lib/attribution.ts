const ATTRIBUTION_STORAGE_KEY = "medhaup.marketing-attribution.v1";
const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000;

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];

export type MarketingAttribution = Partial<Record<UtmKey, string>> & {
  landing_page: string;
  captured_at: string;
};

export type MarketingChannel = {
  label: string;
  source: string;
  medium: string;
};

export const MARKETING_CHANNELS: readonly MarketingChannel[] = [
  { label: "Instagram", source: "instagram", medium: "social" },
  { label: "Facebook", source: "facebook", medium: "social" },
  { label: "WhatsApp", source: "whatsapp", medium: "messaging" },
  { label: "YouTube", source: "youtube", medium: "social" },
] as const;

function cleanValue(value: string | null) {
  const cleaned = value?.trim();
  return cleaned ? cleaned.slice(0, 200) : undefined;
}

function getUtmValues(searchParams: URLSearchParams) {
  return UTM_KEYS.reduce<Partial<Record<UtmKey, string>>>((values, key) => {
    const value = cleanValue(searchParams.get(key));
    if (value) values[key] = value;
    return values;
  }, {});
}

function hasUtmValues(values: Partial<Record<UtmKey, string>>) {
  return UTM_KEYS.some((key) => Boolean(values[key]));
}

function isStoredAttribution(value: unknown): value is MarketingAttribution {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<MarketingAttribution>;
  return (
    typeof candidate.landing_page === "string" &&
    typeof candidate.captured_at === "string" &&
    hasUtmValues(candidate)
  );
}

function isExpired(attribution: MarketingAttribution) {
  const capturedAt = Date.parse(attribution.captured_at);
  return (
    !Number.isFinite(capturedAt) || Date.now() - capturedAt > ATTRIBUTION_TTL_MS
  );
}

/**
 * Persist the latest explicitly tagged visit. Untagged/direct visits do not
 * overwrite a known campaign, matching last non-direct attribution behavior.
 */
export function captureMarketingAttribution() {
  if (typeof window === "undefined") return undefined;

  const utmValues = getUtmValues(
    new URLSearchParams(window.location.search),
  );
  if (!hasUtmValues(utmValues)) return getMarketingAttribution();

  const attribution: MarketingAttribution = {
    ...utmValues,
    landing_page: window.location.pathname,
    captured_at: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(attribution),
    );
  } catch {
    // Storage may be disabled; the current URL can still attribute this visit.
  }

  return attribution;
}

export function getMarketingAttribution() {
  if (typeof window === "undefined") return undefined;

  const currentUtmValues = getUtmValues(
    new URLSearchParams(window.location.search),
  );
  if (hasUtmValues(currentUtmValues)) {
    return {
      ...currentUtmValues,
      landing_page: window.location.pathname,
      captured_at: new Date().toISOString(),
    } satisfies MarketingAttribution;
  }

  try {
    const stored = JSON.parse(
      window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY) ?? "null",
    );
    if (!isStoredAttribution(stored)) return undefined;

    if (isExpired(stored)) {
      window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
      return undefined;
    }

    return stored;
  } catch {
    return undefined;
  }
}

/** Add readable attribution fields to third-party form submissions. */
export function appendAttributionToFormData(data: FormData) {
  const attribution = getMarketingAttribution();

  data.set("attribution_status", attribution ? "tagged" : "direct_or_untagged");
  data.set("conversion_page", window.location.pathname);

  if (!attribution) return;

  for (const key of UTM_KEYS) {
    const value = attribution[key];
    if (value) data.set(key, value);
  }
  data.set("campaign_landing_page", attribution.landing_page);
  data.set("campaign_captured_at", attribution.captured_at);
}

/** Custom event fields make campaign-to-lead checks possible in DebugView. */
export function getAttributionEventParams() {
  const attribution = getMarketingAttribution();
  if (!attribution) return {};

  return UTM_KEYS.reduce<Record<string, string>>((params, key) => {
    const value = attribution[key];
    if (value) params[key] = value;
    return params;
  }, {});
}

function normalizeCampaignValue(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildMarketingUrl({
  siteUrl,
  destination,
  source,
  medium,
  campaign,
  content,
}: {
  siteUrl: string;
  destination: string;
  source: string;
  medium: string;
  campaign: string;
  content?: string;
}) {
  const url = new URL(destination, siteUrl);
  url.searchParams.set("utm_source", normalizeCampaignValue(source));
  url.searchParams.set("utm_medium", normalizeCampaignValue(medium));
  url.searchParams.set("utm_campaign", normalizeCampaignValue(campaign));

  const normalizedContent = normalizeCampaignValue(content ?? "");
  if (normalizedContent) url.searchParams.set("utm_content", normalizedContent);

  return url.toString();
}
