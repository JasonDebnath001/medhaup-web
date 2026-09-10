import "server-only";

import type { AIConfig } from "./config";
import { AIProviderError, providerErrorFromStatus } from "./provider";
import type { AIWebSearchResult } from "./types";

const MAX_RESPONSE_CHARS = 128_000;
const MAX_RESULTS = 5;
const MAX_SNIPPET_CHARS = 1_200;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function parseResults(payload: unknown): AIWebSearchResult["sources"] {
  if (!isRecord(payload) || !Array.isArray(payload.results)) {
    throw new AIProviderError("PROVIDER_ERROR", "Search returned invalid data.");
  }
  const sources: AIWebSearchResult["sources"] = [];
  for (const result of payload.results) {
    if (sources.length >= MAX_RESULTS) break;
    if (!isRecord(result) || typeof result.url !== "string" || typeof result.content !== "string") continue;
    try {
      const url = new URL(result.url);
      if (url.protocol !== "https:" || url.username || url.password || url.href.length > 2_000) continue;
      if (sources.some((source) => source.uri === url.href)) continue;
      const content = result.content.trim().slice(0, MAX_SNIPPET_CHARS);
      if (!content) continue;
      sources.push({
        uri: url.href,
        title: typeof result.title === "string" && result.title.trim()
          ? result.title.trim().slice(0, 200)
          : url.hostname,
        content,
      });
    } catch {
      // Search URLs are data; never fetch or display malformed/unsafe links.
    }
  }
  return sources;
}

export async function searchTavily(
  query: string,
  config: AIConfig,
  signal: AbortSignal,
): Promise<AIWebSearchResult> {
  if (!config.tavilyApiKey) {
    throw new AIProviderError("NOT_CONFIGURED", "Search is not configured.");
  }
  const boundedQuery = query.trim().slice(0, 390);
  if (!boundedQuery) {
    throw new AIProviderError("INVALID_REQUEST", "Search needs a query.");
  }
  try {
    signal.throwIfAborted();
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.tavilyApiKey}`,
      },
      body: JSON.stringify({
        query: boundedQuery,
        topic: "general",
        search_depth: "basic",
        auto_parameters: false,
        ...(/\bwbjeeb?\b/i.test(boundedQuery)
          ? { include_domains: ["wbjeeb.nic.in", "admissions.nic.in"] }
          : /\bnorcet\b/i.test(boundedQuery)
            ? { include_domains: ["aiimsexams.ac.in", "aiims.edu"] }
            : {}),
        max_results: MAX_RESULTS,
        include_answer: false,
        include_raw_content: false,
        include_images: false,
      }),
      cache: "no-store",
      signal,
    });
    if (!response.ok) {
      // Tavily uses 432/433 for plan/credit limits in addition to HTTP 429.
      const status = [432, 433].includes(response.status) ? 429 : response.status;
      await response.body?.cancel();
      throw providerErrorFromStatus(status, response.headers.get("retry-after"));
    }
    const raw = await response.text();
    if (!raw || raw.length > MAX_RESPONSE_CHARS) {
      throw new AIProviderError("PROVIDER_ERROR", "Search returned invalid response size.");
    }
    let payload: unknown;
    try {
      payload = JSON.parse(raw);
    } catch {
      throw new AIProviderError("PROVIDER_ERROR", "Search returned invalid JSON.");
    }
    return {
      query: boundedQuery,
      searchedAt: new Date().toISOString(),
      sources: parseResults(payload),
    };
  } catch (error) {
    if (signal.aborted) {
      throw new AIProviderError("PROVIDER_TIMEOUT", "Search timed out.");
    }
    if (error instanceof AIProviderError) throw error;
    throw new AIProviderError("PROVIDER_ERROR", "Search network request failed.");
  }
}
