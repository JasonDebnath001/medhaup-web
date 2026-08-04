export type ResourceCategory =
  | "Syllabus"
  | "Papers"
  | "Notes"
  | "Mocks"
  | "Guides";

export type Resource = {
  id: string;
  category: ResourceCategory;
  title: string;
  description: string;
  language: "Bengali" | "English" | "Bengali + English";
  fileSize: string; // e.g. "1.2 MB" — update after you drop the real file
  fileUrl: string; // path inside /public
  isNew?: boolean;
};

export const CATEGORIES: { label: string; value: ResourceCategory | "All" }[] =
  [
    { label: "All", value: "All" },
    { label: "Syllabus", value: "Syllabus" },
    { label: "Question Papers", value: "Papers" },
    { label: "Notes", value: "Notes" },
    { label: "Mock Tests", value: "Mocks" },
    { label: "Guides", value: "Guides" },
  ];

/* ----------------------------------------------------------------
   Add a resource = add an object here. Drop the PDF into
   /public/resources/ and match the fileUrl. Nothing else to touch.
----------------------------------------------------------------- */
export const RESOURCES: Resource[] = [
  {
    id: "syllabus-2026",
    category: "Syllabus",
    title: "ANM/GNM Full Syllabus 2026",
    description:
      "The complete subject-wise syllabus in one PDF — know exactly what to study and what to skip.",
    language: "Bengali + English",
    fileSize: "1.2 MB",
    fileUrl: "/resources/anm-gnm-syllabus-2026-english.pdf",
    isNew: true,
  },
  {
    id: "pyq-2025",
    category: "Papers",
    title: "Previous Year Paper — 2025",
    description:
      "The actual 2025 question paper. Solve it under 90 minutes to feel the real exam.",
    language: "Bengali + English",
    fileSize: "2.4 MB",
    fileUrl: "/resources/anm-gnm-pyq-2025.pdf",
  },
  {
    id: "exam-pattern-guide",
    category: "Guides",
    title: "Exam Pattern & Negative Marking Guide",
    description:
      "How the 85/15 category split works, where negative marking applies, and the attempt strategy that follows from it.",
    language: "Bengali + English",
    fileSize: "800 KB",
    fileUrl: "/resources/exam-pattern-guide.pdf",
    isNew: true,
  },
  {
    id: "life-science-sample",
    category: "Notes",
    title: "Biology — Sample Chapter Notes",
    description:
      "One full chapter from our course notes, free. See how we teach the highest-weightage subject.",
    language: "Bengali + English",
    fileSize: "1.5 MB",
    fileUrl: "/resources/life-science-sample-notes.pdf",
  },
  {
    id: "mock-test-1",
    category: "Mocks",
    title: "Free Mock Test #1 (with Answer Key)",
    description:
      "A full-length mock built on the real pattern — 100 questions, both categories, answer key included.",
    language: "Bengali + English",
    fileSize: "1.8 MB",
    fileUrl: "/resources/free-mock-test-1.pdf",
  },
];
