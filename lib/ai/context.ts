import "server-only";

import {
  getBatches,
  getDailyCA,
  getMonthlyCA,
  getPostBySlug,
  getPosts,
  getPYQs,
  getResources,
  getSubjects,
  getSyllabusDownloads,
} from "@/lib/data";
import type { TrustedPageContext } from "@/lib/ai/types";
import { COURSE_SUBJECTS, getTrustedCourseFacts } from "@/lib/courseFacts";

const BLOG_PATH = /^\/blogs\/([a-z0-9]+(?:-[a-z0-9]+)*)$/;

function cleanText(value: unknown) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_>#~|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function joinBounded(sections: string[], maxChars: number) {
  const result: string[] = [];
  let remaining = maxChars;

  for (const section of sections) {
    const clean = cleanText(section);
    if (!clean || remaining <= 0) continue;
    const chunk = clean.slice(0, remaining);
    result.push(chunk);
    remaining -= chunk.length + 1;
  }

  return result.join("\n");
}

async function buildTrustedStudentEssentials() {
  const [publishedSubjects, publishedBatches] = await Promise.all([
    getSubjects(),
    getBatches(),
  ]);
  const subjectFacts = publishedSubjects.length
    ? publishedSubjects
        .slice(0, 10)
        .map(
          (subject) =>
            `Published subject — ${subject.name}: ${subject.blurb}. Approximate questions shown: ${subject.questions}.`,
        )
    : COURSE_SUBJECTS.map(
        (subject) =>
          `Course subject — ${subject.name}: ${subject.summary} Approximate questions shown: ${subject.approximateQuestions}.`,
      );
  const batchFacts = publishedBatches
    .slice(0, 4)
    .map(
      (batch) =>
        `Published batch — ${batch.name}; starts: ${batch.startDate}; mode: ${batch.mode}; timing: ${batch.timing}. Do not infer seat availability.`,
    );

  return {
    publishedSubjects,
    lines: [
      "TRUSTED MEDHAUP STUDENT ESSENTIALS:",
      ...getTrustedCourseFacts(),
      ...subjectFacts,
      ...(batchFacts.length
        ? batchFacts
        : [
            "No current published batch details are available in the trusted data.",
          ]),
    ],
  };
}

export function normalizeAIPath(value: string) {
  if (
    !value.startsWith("/") ||
    value.length > 240 ||
    value.includes("?") ||
    value.includes("#") ||
    value.includes("\\") ||
    value.startsWith("//")
  ) {
    return null;
  }

  const normalized = value.length > 1 ? value.replace(/\/+$/, "") : value;
  return normalized || "/";
}

export function isAIPagePath(path: string) {
  return (
    path === "/" ||
    path === "/admission" ||
    BLOG_PATH.test(path) ||
    path === "/pyq" ||
    path === "/syllabus" ||
    path === "/current-affairs" ||
    path === "/resources" ||
    path === "/course"
  );
}

export async function buildTrustedPageContext(
  rawPath: string,
  maxChars: number,
): Promise<TrustedPageContext | null> {
  const path = normalizeAIPath(rawPath);
  if (!path || !isAIPagePath(path)) return null;
  const studentEssentials = await buildTrustedStudentEssentials();

  const blogMatch = BLOG_PATH.exec(path);
  if (blogMatch) {
    const post = await getPostBySlug(blogMatch[1]);
    if (!post) return null;

    return {
      path,
      pageType: "blog_article",
      title: cleanText(post.title),
      subject: cleanText(post.tags?.join(", ")) || undefined,
      content: joinBounded(
        [
          ...studentEssentials.lines,
          "CURRENT PAGE ARTICLE CONTEXT:",
          `Article summary: ${post.excerpt}`,
          `Article content: ${post.content}`,
          `Tags: ${post.tags?.join(", ") ?? ""}`,
        ],
        maxChars,
      ),
    };
  }

  if (path === "/") {
    const posts = await getPosts();
    return {
      path,
      pageType: "homepage",
      title: "ANM GNM 2027 Preparation",
      subject: "WBJEEB ANM(R) and GNM entrance preparation",
      content: joinBounded(
        [
          ...studentEssentials.lines,
          "CURRENT HOMEPAGE CONTEXT:",
          "medhaup is an education platform focused on the WBJEEB ANM(R) and GNM Common Entrance Test in West Bengal.",
          "The homepage describes Bengali and English concept learning, subject-wise preparation, syllabus guidance, previous-year questions, current affairs, and exam-focused resources.",
          "The preparation subjects shown are Life Science, Physical Science, Mathematics, Basic English, General Knowledge, and Logical Reasoning.",
          ...posts
            .slice(0, 3)
            .map(
              (post) =>
                `Homepage article — ${post.title}: ${post.excerpt}. Tags: ${post.tags?.join(", ") ?? ""}.`,
            ),
          "Do not state any other prices, offers, dates, teacher details, admission availability, or seat counts unless they are explicitly present in this trusted context.",
        ],
        maxChars,
      ),
    };
  }

  if (path === "/admission") {
    return {
      path,
      pageType: "admission",
      title: "ANM & GNM Course Admission",
      subject: "medhaup course enrolment",
      content: joinBounded(
        [
          ...studentEssentials.lines,
          "CURRENT ADMISSION PAGE CONTEXT:",
          "Students can enrol through the medhaup app or submit the website callback form for guided admission.",
          "No payment is taken by the website callback form. App enrolment is paid securely inside the app; callback students pay only after speaking with medhaup and confirming the fee.",
          "A callback request asks for contact details so medhaup can call or WhatsApp the student, normally within 24 hours.",
        ],
        maxChars,
      ),
    };
  }

  if (path === "/pyq") {
    const papers = (await getPYQs()).slice(0, 10);
    return {
      path,
      pageType: "previous_year_questions",
      title: "ANM & GNM Previous Year Question Papers",
      subject: "ANM/GNM entrance exam preparation",
      content: joinBounded(
        [
          ...studentEssentials.lines,
          "CURRENT PYQ PAGE CONTEXT:",
          ...papers.map(
            (paper) =>
              `${paper.title} (${paper.year}, ${paper.language}): ${paper.description}. Answer key: ${paper.answerKeyUrl ? "available" : "not listed"}.`,
          ),
        ],
        maxChars,
      ),
    };
  }

  if (path === "/syllabus") {
    const downloads = await getSyllabusDownloads();
    return {
      path,
      pageType: "syllabus",
      title: "ANM & GNM Exam Syllabus",
      subject: "ANM/GNM entrance syllabus",
      content: joinBounded(
        [
          ...studentEssentials.lines,
          "CURRENT SYLLABUS PAGE CONTEXT:",
          ...downloads
            .slice(0, 5)
            .map((item) => `${item.label}: ${item.caption}.`),
        ],
        maxChars,
      ),
    };
  }

  if (path === "/current-affairs") {
    const [daily, monthly] = await Promise.all([getDailyCA(), getMonthlyCA()]);
    return {
      path,
      pageType: "current_affairs",
      title: "Current Affairs for ANM & GNM",
      subject: "Current affairs",
      content: joinBounded(
        [
          ...studentEssentials.lines,
          "CURRENT AFFAIRS PAGE CONTEXT:",
          ...daily
            .slice(0, 10)
            .map(
              (item) =>
                `${item.date} — ${item.headline} (${item.tag}): ${item.detail}`,
            ),
          ...monthly
            .slice(0, 5)
            .map(
              (item) =>
                `${item.month} — ${item.title}: ${item.description} (${item.language}).`,
            ),
        ],
        maxChars,
      ),
    };
  }

  if (path === "/resources") {
    const resources = (await getResources()).slice(0, 12);
    return {
      path,
      pageType: "study_resources",
      title: "Free ANM & GNM Study Resources",
      subject: "ANM/GNM study materials",
      content: joinBounded(
        [
          ...studentEssentials.lines,
          "CURRENT RESOURCES PAGE CONTEXT:",
          ...resources.map(
            (resource) =>
              `${resource.title} (${resource.category}, ${resource.language}): ${resource.description}.`,
          ),
        ],
        maxChars,
      ),
    };
  }

  return {
    path,
    pageType: "course",
    title: "ANM & GNM 2027 Complete Course",
    subject: "ANM/GNM entrance preparation",
    content: joinBounded(
      [
        ...studentEssentials.lines,
        "CURRENT COURSE PAGE CONTEXT:",
        "The page describes a 12-month ANM/GNM entrance preparation course in Bengali and English.",
        "The listed learning support includes live classes, class recordings, mock tests, previous-year questions, notes, and doubt support.",
        "Subjects shown include Life Science, Physical Science, Mathematics, General Knowledge, English, and Logical Reasoning.",
        "Treat any other price, offer, date, teacher, batch, or availability claim as unknown unless it is explicitly included in this trusted context.",
      ],
      maxChars,
    ),
  };
}
