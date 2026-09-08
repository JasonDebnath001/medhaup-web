import type { AIChatMessage } from "./types";

// Search is a separate quota. Stable study questions should not require it.
const CURRENT_INFORMATION = [
  /\b(latest|currently|today|tonight|tomorrow|yesterday|recent|updated?|news|notice|notification|deadline|schedule|timetable|result|results|admit\s*card|answer\s*key|application|registration|counselling|counseling|eligibility|vacanc(?:y|ies)|president|prime\s*minister|chief\s*minister|pm|cm)\b/i,
  /\bcurrent\s+(?!electricity\b|density\b|flow\b|in\b|through\b)/i,
  /\b(kobe|kokhon|kakhon|ajker|ekhon)\b/i,
  /\b(20[2-9]\d|when|date|dates|announced?|released?|official\s*(?:website|site|link)|search|look\s*up|verify|check\s+online)\b/i,
  /আজ|কালকে|আগামীকাল|গতকাল|বর্তমান|এখন|সাম্প্রতিক|সর্বশেষ|নতুন\s*(?:খবর|নোটিশ|নিয়ম|নিয়ম)|খবর|নোটিশ|বিজ্ঞপ্তি|তারিখ|সময়সূচি|সময়সূচি|ফলাফল|রেজাল্ট|আবেদন|রেজিস্ট্রেশন|অ্যাডমিট|কাউন্সেলিং|যোগ্যতা|প্রধানমন্ত্রী|মুখ্যমন্ত্রী|রাষ্ট্রপতি|কবে|খুঁজে|সার্চ|যাচাই|২০[২-৯][০-৯]/,
];

export function needsWebSearch(message: string, history: AIChatMessage[]) {
  if (CURRENT_INFORMATION.some((pattern) => pattern.test(message))) return true;
  // Carry time-sensitive context into short follow-ups such as "And for GNM?".
  if (
    /^(and\b|what about\b|how about\b|আর|তাহলে|সেটা|ওটা)/i.test(message.trim())
  ) {
    const previousQuestion = [...history]
      .reverse()
      .find((item) => item.role === "user");
    return Boolean(
      previousQuestion &&
      CURRENT_INFORMATION.some((pattern) =>
        pattern.test(previousQuestion.content),
      ),
    );
  }
  return false;
}

export function buildWebSearchQuery(message: string, history: AIChatMessage[]) {
  const question = message.replace(/\s+/g, " ").trim();
  const previousQuestion = /^(and\b|what about\b|how about\b|আর|তাহলে|সেটা|ওটা)/i.test(question)
    ? [...history].reverse().find((item) => item.role === "user")?.content
    : undefined;
  // One bounded query keeps follow-ups useful without sending the whole chat.
  return previousQuestion
    ? `${previousQuestion.replace(/\s+/g, " ").trim().slice(0, 180)} ${question.slice(0, 210)}`
    : question.slice(0, 390);
}
