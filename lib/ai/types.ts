export const AI_LANGUAGES = ["auto", "bn", "en", "mixed"] as const;

export type AILanguage = (typeof AI_LANGUAGES)[number];

export type AIMessageRole = "user" | "assistant";

export type AIChatMessage = {
  role: AIMessageRole;
  content: string;
};

export type AIPageType =
  | "homepage"
  | "admission"
  | "blog_article"
  | "previous_year_questions"
  | "syllabus"
  | "current_affairs"
  | "study_resources"
  | "course";

export type TrustedPageContext = {
  path: string;
  pageType: AIPageType;
  title: string;
  subject?: string;
  content: string;
};

export type AIChatRequest = {
  message: string;
  language: AILanguage;
  page: {
    path: string;
  };
  history?: AIChatMessage[];
};

export type AIErrorCode =
  | "INVALID_REQUEST"
  | "NOT_CONFIGURED"
  | "RATE_LIMITED"
  | "PROVIDER_AUTH"
  | "PROVIDER_TIMEOUT"
  | "PROVIDER_ERROR"
  | "UNSAFE_REQUEST";

export type AIChatSuccess = {
  ok: true;
  answer: string;
  suggestions?: string[];
  requestId: string;
  meta: {
    pageType: AIPageType;
    language: AILanguage;
    guarded?: boolean;
  };
};

export type AIChatError = {
  ok: false;
  error: {
    code: AIErrorCode;
    message: string;
    retryAfterSeconds?: number;
  };
  requestId: string;
};

export type AIChatResponse = AIChatSuccess | AIChatError;

export type AIProviderInput = {
  systemPrompt: string;
  message: string;
  history: AIChatMessage[];
};

export type AIProviderOutput = {
  answer: string;
};
