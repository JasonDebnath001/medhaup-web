export type SyllabusDownload = {
  /** Shown in the dropdown */
  label: string;
  /** Small caption under the label */
  caption: string;
  /** Path inside /public — drop the real PDF there with this exact name */
  fileUrl: string;
  /** Filename the user's browser saves the file as */
  fileName: string;
};

/* ================================================================
   Subject-wise syllabus (homepage section)
================================================================ */

export type SubjectSyllabus = {
  /** Stable id — also keys the icon map in the section component */
  id: string;
  name: string;
  /** One line on what the subject covers in this exam */
  blurb: string;
  /** Approx. MCQs in the paper — keep in sync with WhyMedhaup.tsx
      and verify against the current official WBJEEB bulletin. */
  questions: number;
  /** Path inside /public — drop the real PDF there with this exact name */
  fileUrl: string;
  /** Filename the user's browser saves the file as */
  fileName: string;
};

export const SUBJECT_SYLLABI: SubjectSyllabus[] = [
  {
    id: "biology",
    name: "Biology",
    blurb:
      "Life Science from WB board textbooks — the highest-weightage subject in the paper.",
    questions: 25,
    fileUrl: "/resources/syllabus/biology-syllabus.pdf",
    fileName: "medhaup_biology_syllabus.pdf",
  },
  {
    id: "physical-science",
    name: "Physical Science",
    blurb:
      "Physics and Chemistry fundamentals, mapped chapter-by-chapter to the WB syllabus.",
    questions: 20,
    fileUrl: "/resources/syllabus/physical-science-syllabus.pdf",
    fileName: "medhaup_physical_science_syllabus.pdf",
  },
  {
    id: "mathematics",
    name: "Mathematics",
    blurb:
      "Arithmetic, algebra and geometry up to the Madhyamik level — speed matters here.",
    questions: 15,
    fileUrl: "/resources/syllabus/mathematics-syllabus.pdf",
    fileName: "medhaup_mathematics_syllabus.pdf",
  },
  {
    id: "english",
    name: "English",
    blurb:
      "Grammar, vocabulary and comprehension — the basics the paper actually tests.",
    questions: 15,
    fileUrl: "/resources/syllabus/english-syllabus.pdf",
    fileName: "medhaup_english_syllabus.pdf",
  },
  {
    id: "general-knowledge",
    name: "General Knowledge",
    blurb:
      "Current affairs, static GK and health awareness topics that repeat year after year.",
    questions: 13,
    fileUrl: "/resources/syllabus/general-knowledge-syllabus.pdf",
    fileName: "medhaup_general_knowledge_syllabus.pdf",
  },
  {
    id: "logical-reasoning",
    name: "Logical Reasoning",
    blurb:
      "Series, analogies, coding-decoding and puzzles — scoring fast with practice.",
    questions: 12,
    fileUrl: "/resources/syllabus/logical-reasoning-syllabus.pdf",
    fileName: "medhaup_logical_reasoning_syllabus.pdf",
  },
];

/* ----------------------------------------------------------------
   To update a syllabus PDF: drop the new file into
   /public/resources/ with the matching name below. Nothing else
   to touch.
----------------------------------------------------------------- */
export const SYLLABUS_DOWNLOADS: SyllabusDownload[] = [
  {
    label: "Download in English",
    caption: "Full ANM/GNM CET syllabus · PDF",
    fileUrl: "/resources/anm-gnm-syllabus-2026-english.pdf",
    fileName: "MedhaUp-ANM-GNM-CET-Syllabus-2026-English.pdf",
  },
  {
    label: "বাংলায় ডাউনলোড করুন",
    caption: "সম্পূর্ণ ANM/GNM CET সিলেবাস · PDF",
    fileUrl: "/resources/anm-gnm-syllabus-2026-bengali.pdf",
    fileName: "MedhaUp-ANM-GNM-CET-Syllabus-2026-Bengali.pdf",
  },
];
