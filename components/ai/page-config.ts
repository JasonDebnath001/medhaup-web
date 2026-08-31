import type { AIPageType } from "@/lib/ai/types";

export type AIQuickPrompt = {
  id: string;
  label: string;
  prompt: string;
};

export type AIPageDescriptor = {
  path: string;
  pageType: AIPageType;
  contentType: string;
  title: string;
  eyebrow: string;
  suggestions: AIQuickPrompt[];
};

const SHARED_EXPLANATION: AIQuickPrompt = {
  id: "explain_simply",
  label: "সহজ করে explain করো",
  prompt: "এই page-এর মূল বিষয়টা ANM/GNM exam level-এ সহজ করে explain করো।",
};

function cleanPath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getAIPageDescriptor(pathname: string): AIPageDescriptor | null {
  const path = cleanPath(pathname);
  const blogMatch = /^\/blogs\/([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(path);

  if (blogMatch) {
    return {
      path,
      pageType: "blog_article",
      contentType: "blog_article",
      title: titleFromSlug(blogMatch[1]),
      eyebrow: "Reading this article",
      suggestions: [
        SHARED_EXPLANATION,
        {
          id: "article_exam_points",
          label: "Key exam points বলো",
          prompt:
            "এই article থেকে ANM/GNM exam-এর জন্য key points সংক্ষেপে বলো।",
        },
        {
          id: "article_concept_link",
          label: "Concept connection বোঝাও",
          prompt:
            "এই topic-এর important concepts কীভাবে একে অপরের সঙ্গে connected, বুঝিয়ে বলো।",
        },
      ],
    };
  }

  const pages: Record<string, Omit<AIPageDescriptor, "path">> = {
    "/": {
      pageType: "homepage",
      contentType: "homepage",
      title: "ANM & GNM 2027 Preparation",
      eyebrow: "On the medhaup homepage",
      suggestions: [
        {
          id: "home_platform_overview",
          label: "medhaup কীভাবে help করে?",
          prompt:
            "এই homepage-এর trusted information অনুযায়ী medhaup ANM/GNM preparation-এ কীভাবে help করে?",
        },
        {
          id: "home_subjects",
          label: "কোন subjects আছে?",
          prompt: "এই homepage-এ দেখানো ANM/GNM subjects সংক্ষেপে explain করো।",
        },
        {
          id: "home_resources",
          label: "কী resources পাব?",
          prompt:
            "এই homepage অনুযায়ী syllabus, PYQ, current affairs এবং study resources সম্পর্কে বলো।",
        },
        {
          id: "home_course_fee",
          label: "Course fee কত?",
          prompt:
            "medhaup-এর trusted course pricing অনুযায়ী new এবং returning students-এর current listed fee কত?",
        },
      ],
    },
    "/admission": {
      pageType: "admission",
      contentType: "admission_page",
      title: "ANM & GNM Course Admission",
      eyebrow: "On the admission page",
      suggestions: [
        {
          id: "admission_process",
          label: "Admission কীভাবে হবে?",
          prompt:
            "এই page-এর trusted information অনুযায়ী medhaup course admission process explain করো।",
        },
        {
          id: "admission_fee",
          label: "Fee ও EMI বলো",
          prompt:
            "New ও returning students-এর trusted listed fee, duration এবং EMI availability বলো।",
        },
        {
          id: "admission_payment",
          label: "Payment কোথায় করব?",
          prompt:
            "App এবং callback admission-এর payment process ও safety information explain করো।",
        },
        {
          id: "admission_batch",
          label: "Current batch details",
          prompt:
            "Trusted published data-তে current batch-এর নাম, start date, mode ও timing থাকলে বলো; না থাকলে পরিষ্কার করে বলো।",
        },
      ],
    },
    "/pyq": {
      pageType: "previous_year_questions",
      contentType: "pyq_listing",
      title: "Previous Year Questions",
      eyebrow: "Using this PYQ page",
      suggestions: [
        {
          id: "pyq_method",
          label: "PYQ কীভাবে use করব?",
          prompt:
            "এই PYQ page ব্যবহার করে effective revision কীভাবে করব, সংক্ষেপে বলো।",
        },
        {
          id: "pyq_mistakes",
          label: "Mistake review method",
          prompt:
            "Previous year questions solve করার পরে mistakes review করার simple method বলো।",
        },
        SHARED_EXPLANATION,
      ],
    },
    "/syllabus": {
      pageType: "syllabus",
      contentType: "syllabus",
      title: "ANM & GNM Syllabus",
      eyebrow: "Viewing this syllabus",
      suggestions: [
        SHARED_EXPLANATION,
        {
          id: "syllabus_exam_focus",
          label: "Exam focus points",
          prompt: "এই syllabus page-এর exam-focused key points সংক্ষেপে বলো।",
        },
        {
          id: "syllabus_weightage",
          label: "Question count বোঝাও",
          prompt:
            "এই page-এ দেখানো subject question counts কীভাবে বুঝব, explain করো।",
        },
      ],
    },
    "/current-affairs": {
      pageType: "current_affairs",
      contentType: "current_affairs",
      title: "Current Affairs",
      eyebrow: "Reading current affairs",
      suggestions: [
        {
          id: "ca_top_update",
          label: "Top update explain করো",
          prompt:
            "এই page-এর সবচেয়ে recent current-affairs update সহজ করে explain করো।",
        },
        {
          id: "ca_exam_points",
          label: "Exam points বলো",
          prompt:
            "এই page-এর current affairs থেকে ANM/GNM exam-এর key facts বলো।",
        },
        {
          id: "ca_summary",
          label: "Page summary",
          prompt:
            "এই current-affairs page-এর bounded content সংক্ষেপে summarize করো।",
        },
      ],
    },
    "/resources": {
      pageType: "study_resources",
      contentType: "resource_listing",
      title: "Study Resources",
      eyebrow: "Using these resources",
      suggestions: [
        SHARED_EXPLANATION,
        {
          id: "resource_types",
          label: "Resources compare করো",
          prompt:
            "এই page-এ থাকা resource types-এর difference সংক্ষেপে explain করো।",
        },
        {
          id: "resource_revision",
          label: "Revision-এ কীভাবে use করব?",
          prompt:
            "এই page-এ listed materials revision-এর জন্য কীভাবে use করা যায়, বলো।",
        },
      ],
    },
    "/course": {
      pageType: "course",
      contentType: "course_page",
      title: "ANM & GNM Complete Course",
      eyebrow: "Viewing this course",
      suggestions: [
        {
          id: "course_includes",
          label: "Course-এ কী আছে?",
          prompt:
            "এই page-এর trusted information অনুযায়ী course-এ কী কী আছে, সংক্ষেপে বলো।",
        },
        {
          id: "course_subjects",
          label: "Subjects explain করো",
          prompt:
            "এই course page-এ listed subjects এবং learning support explain করো।",
        },
        {
          id: "course_scope",
          label: "কার জন্য useful?",
          prompt:
            "এই page-এর information অনুযায়ী course-টি কোন exam preparation-এর জন্য, বলো।",
        },
        {
          id: "course_fee",
          label: "Course fee কত?",
          prompt:
            "এই page-এর trusted pricing অনুযায়ী new এবং returning students-এর listed course fee ও duration বলো।",
        },
      ],
    },
  };

  return pages[path] ? { path, ...pages[path] } : null;
}
