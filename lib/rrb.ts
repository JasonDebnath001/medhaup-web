export const RRB_PATH = "/rrb-nursing";
export const RRB_NAME = "RRB Nursing Preparation Course";
export const RRB_DESCRIPTION =
  "Join medhaup's RRB Nursing course. Explore Nursing Superintendent subjects, syllabus, CBT exam pattern and marking scheme, with official RRB references.";
export const RRB_REFERENCE = "CEN 03/2025 (Paramedical)";
export const RRB_SOURCES = {
  official: "https://www.rrbcdg.gov.in/",
  bulletin: "https://www.rrbcdg.gov.in/uploads/2025/03-PMED/CEN%2003_2025.pdf",
};

export const RRB_SECTIONS = [
  {
    name: "Professional Ability (Nursing)",
    questions: 70,
    marks: 70,
    detail: "Core nursing knowledge and professional subjects.",
    color: "bg-orange",
  },
  {
    name: "General Awareness",
    questions: 10,
    marks: 10,
    detail: "Current affairs, India and the world.",
    color: "bg-teal",
  },
  {
    name: "General Arithmetic, Intelligence & Reasoning",
    questions: 10,
    marks: 10,
    detail:
      "Numerical skills and logical problem solving, combined in one section.",
    color: "bg-[#7374d8]",
  },
  {
    name: "General Science",
    questions: 10,
    marks: 10,
    detail: "Physics, chemistry and life sciences up to Class 10 CBSE level.",
    color: "bg-[#e9bc62]",
  },
] as const;

// Grouped for revision; RRB does not assign marks to individual nursing subjects.
export const RRB_NURSING_SYLLABUS = [
  {
    title: "Foundations & human sciences",
    subjects: [
      "Nursing Foundations",
      "Anatomy",
      "Physiology",
      "Psychology",
      "Sociology",
    ],
  },
  {
    title: "Nutrition & biomedical sciences",
    subjects: [
      "Nutrition",
      "Biochemistry",
      "Microbiology",
      "Pathology",
      "Genetics",
      "Pharmacology",
    ],
  },
  {
    title: "Adult & mental health",
    subjects: [
      "Medical-Surgical Nursing I (adults, including geriatrics)",
      "Mental Health Nursing",
    ],
  },
  {
    title: "Maternal & child health",
    subjects: ["Midwifery and Obstetrical Nursing", "Child Health Nursing"],
  },
  { title: "Community nursing", subjects: ["Community Health Nursing"] },
  {
    title: "Research & leadership",
    subjects: [
      "Nursing Research and Statistics",
      "Management of Nursing Services and Education",
    ],
  },
] as const;

export const RRB_GENERAL_SYLLABUS = [
  {
    title: "General Awareness",
    detail:
      "Revise current events, Indian history and the freedom movement, geography, culture, polity, the Constitution and economy. Include environmental issues, sport, science and technology.",
  },
  {
    title: "General Arithmetic",
    detail:
      "Practise number systems and BODMAS; fractions, decimals, roots, HCF and LCM; ratios, percentages, interest and profit/loss; work, speed and distance; mensuration, algebra, geometry, trigonometry and basic statistics; ages, calendars, clocks, pipes and cisterns.",
  },
  {
    title: "General Intelligence & Reasoning",
    detail:
      "Work through analogies, series, coding, mathematical operations, relationships, syllogisms, jumbling and Venn diagrams. Practise data interpretation and sufficiency, decisions, classification, directions, similarities, differences, arguments and assumptions.",
  },
  {
    title: "General Science",
    detail:
      "Review physics, chemistry and life sciences from the CBSE syllabus up to Class 10.",
  },
] as const;

export const RRB_FAQS = [
  {
    question: "What does the RRB Nursing course prepare me for?",
    answer:
      "The course prepares nursing aspirants for the Railway Recruitment Boards' Nursing Superintendent recruitment examination under the Paramedical categories.",
  },
  {
    question: "What is the RRB Nursing exam pattern?",
    answer:
      "CEN 03/2025 specifies a computer-based test with 100 questions for 100 marks in 90 minutes. Nursing contributes 70 marks; awareness, arithmetic and reasoning combined, and science contribute 10 marks each. An incorrect answer loses one-third of a mark. Eligible candidates receive compensatory time under the notice's scribe rules.",
  },
  {
    question: "Does RRB publish marks for each nursing subject?",
    answer:
      "The notice assigns 70 marks to Professional Ability as a whole. It does not publish a separate mark allocation for individual nursing subjects. Cover the full syllabus.",
  },
  {
    question: "How can I join the RRB Nursing course?",
    answer:
      "Use the WhatsApp enquiry on this page to ask our team for current fees, batch timings and enrolment steps.",
  },
  {
    question: "What happens after the CBT?",
    answer:
      "Selection under CEN 03/2025 depends on CBT merit, document verification and the prescribed medical examination. Consult the official RRB notices for your recruitment cycle's eligibility, dates and requirements. medhaup course enrolment is separate from applying to RRB.",
  },
] as const;

export function getTrustedRrbFacts() {
  return [
    `medhaup's RRB Nursing preparation course covers the Nursing Superintendent exam at ${RRB_PATH}. Enrolment enquiries go to ${RRB_PATH}#enrolment. Ask the team for fees and batch timings; do not reuse ANM/GNM pricing.`,
    `Exam reference: ${RRB_REFERENCE}, ${RRB_SOURCES.bulletin}. Verify the applicable recruitment cycle on the official RRB website.`,
    "Nursing Superintendent CBT: 100 MCQs, 100 marks, 90 minutes; 120 minutes for candidates eligible under the scribe/compensatory-time rules. Each wrong answer deducts 1/3 mark. Selection includes document verification and the prescribed medical examination.",
    ...RRB_SECTIONS.map(
      (section) =>
        `${section.name}: ${section.questions} questions, ${section.marks} marks.`,
    ),
    ...RRB_NURSING_SYLLABUS.map(
      (group) => `${group.title}: ${group.subjects.join(", ")}.`,
    ),
    ...RRB_GENERAL_SYLLABUS.map((group) => `${group.title}: ${group.detail}`),
  ];
}
