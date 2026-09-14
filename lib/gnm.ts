export const GNM_PATH = "/gnm";
export const GNM_NAME = "GNM 1st, 2nd & 3rd Year Course";
export const GNM_DESCRIPTION =
  "Explore GNM 1st, 2nd and 3rd year subjects, syllabus PDFs, practical training and the first-year 500-mark exam pattern.";

export const GNM_YEARS = [
  {
    id: "1st",
    number: "01",
    label: "1st year",
    title: "Start with a strong foundation.",
    description:
      "Start with bio sciences, behavioural sciences, nursing foundations and community health, alongside English and computer education.",
    theme: "foundation",
  },
  {
    id: "2nd",
    number: "02",
    label: "2nd year",
    title: "Build on what you know.",
    description:
      "Build your understanding of medical-surgical nursing, mental health and child health, with clinical practice alongside theory.",
    theme: "progress",
  },
  {
    id: "3rd",
    number: "03",
    label: "3rd year",
    title: "Make your final year count.",
    description:
      "Study midwifery and community health in Part I, then progress to professional subjects and the supervised internship in Part II.",
    theme: "confidence",
  },
] as const;

export const GNM_FAQS = [
  {
    question: "Who is this course for?",
    answer:
      "This course is for students studying General Nursing and Midwifery (GNM) in their 1st, 2nd or 3rd year. Choose your year when asking for enrolment details.",
  },
  {
    question: "Is this the ANM/GNM entrance preparation course?",
    answer:
      "This course is for students already studying GNM. medhaup's ANM/GNM entrance preparation is a separate course, available on the ANM/GNM Course page.",
  },
  {
    question: "How can I enrol, and what are the fees?",
    answer:
      "Contact our team on WhatsApp for current fees, batch timings, class details and enrolment steps.",
  },
  {
    question: "Can I download the subjects and syllabus for my year?",
    answer:
      "Yes. Subject-list and detailed syllabus PDFs are available for all three years in the syllabus section on this page. The first-year exam-pattern PDF is also available. Contact our team for course fees, class format, language and batch timings.",
  },
  {
    question: "How are the GNM first-year 500 marks divided?",
    answer:
      "The supplied medhaup exam-pattern sheet lists four theory papers worth 100 marks each (75 written + 25 internal) and Fundamentals of Nursing practical worth 100 marks (50 practical + 50 internal). This totals 300 written, 150 internal and 50 practical marks. Each 75-mark written paper has 55 subjective/descriptive marks and 20 objective marks.",
  },
] as const;

export const GNM_SUBJECT_OVERVIEW = {
  "1st": [
    {
      label: "Six subject areas",
      subjects: [
        "Bio Sciences",
        "Behavioural Sciences",
        "Nursing Foundations",
        "Community Health Nursing",
        "English",
        "Computer Education",
      ],
    },
  ],
  "2nd": [
    {
      label: "Four core subjects",
      subjects: [
        "Medical-Surgical Nursing - I",
        "Medical-Surgical Nursing - II",
        "Mental Health Nursing",
        "Child Health Nursing",
      ],
    },
  ],
  "3rd": [
    {
      label: "Part I",
      subjects: [
        "Midwifery & Gynaecological Nursing",
        "Community Health Nursing - II",
      ],
    },
    {
      label: "Part II · Internship theory",
      subjects: [
        "Nursing Education",
        "Introduction to Research and Statistics",
        "Professional Trends & Adjustments",
        "Nursing Administration & Ward Management",
      ],
    },
  ],
} as const;

export const GNM_DOWNLOADS = {
  "1st": [
    {
      label: "1st-year subjects",
      href: "/resources/gnm/gnm-1st-year-subjects.pdf",
      pages: 1,
    },
    {
      label: "1st-year syllabus",
      href: "/resources/gnm/gnm-1st-year-syllabus.pdf",
      pages: 27,
    },
    {
      label: "1st-year exam pattern",
      href: "/resources/gnm/gnm-1st-year-exam-pattern.pdf",
      pages: 2,
    },
  ],
  "2nd": [
    {
      label: "2nd-year subjects",
      href: "/resources/gnm/gnm-2nd-year-subjects.pdf",
      pages: 1,
    },
    {
      label: "2nd-year syllabus",
      href: "/resources/gnm/gnm-2nd-year-syllabus.pdf",
      pages: 25,
    },
  ],
  "3rd": [
    {
      label: "3rd-year subjects",
      href: "/resources/gnm/gnm-3rd-year-subjects.pdf",
      pages: 1,
    },
    {
      label: "3rd-year syllabus",
      href: "/resources/gnm/gnm-3rd-year-syllabus.pdf",
      pages: 27,
    },
  ],
} as const;

export const GNM_FIRST_YEAR_EXAM = [
  { subject: "Bio Sciences", written: 75, internal: 25, practical: 0 },
  { subject: "Behavioural Sciences", written: 75, internal: 25, practical: 0 },
  {
    subject: "Foundation of Nursing (First Aid & Personal)",
    written: 75,
    internal: 25,
    practical: 0,
  },
  {
    subject: "Community Health Nursing",
    written: 75,
    internal: 25,
    practical: 0,
  },
  {
    subject: "Practical - Fundamentals of Nursing",
    written: 0,
    internal: 50,
    practical: 50,
  },
] as const;

export const GNM_INTERNAL_ASSESSMENT = [
  "Activities",
  "Assignments",
  "Pre-tests",
  "Class tests",
  "Class attendance",
  "Overall performance",
] as const;

export const GNM_INTERNSHIP = [
  { area: "Medical-Surgical Nursing", hours: 288, weeks: 6 },
  { area: "Community Health Nursing", hours: 288, weeks: 6 },
  { area: "Child Health Nursing", hours: 96, weeks: 2 },
  { area: "Midwifery & Gynaecological Nursing", hours: 384, weeks: 8 },
  { area: "Mental Health Nursing", hours: 96, weeks: 2 },
] as const;
