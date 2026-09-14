/* ----------------------------------------------------------------
   NORCET — Nursing Officer Recruitment Common Eligibility Test.
   Single source of truth for the /norcet page, the homepage teaser,
   navigation, structured data and the medhaup AI trusted context.
   Exam facts follow recent AIIMS notices; anything that changes by
   cycle (dates, vacancies, exact shortlisting ratios) is deliberately
   left out and pointed to the official notice instead.
----------------------------------------------------------------- */

export const NORCET_PATH = "/norcet" as const;

export const NORCET = {
  shortName: "NORCET",
  fullName: "Nursing Officer Recruitment Common Eligibility Test",
  conductedBy: "AIIMS, New Delhi",
  officialUrl: "https://www.aiimsexams.ac.in/",
  post: "Nursing Officer",
  postGroup: "Group B, Pay Level 7",
  payLevel: "Level 7 (7th CPC)",
  payBand: "₹44,900 – ₹1,42,400 basic pay + allowances",
  mode: "Computer-Based Test (CBT)",
  languages: ["English", "Hindi"] as const,
  frequency: "Held around twice a year in recent cycles",
  ageLimit: "18 – 30 years (relaxations as per Government of India rules)",
  westBengalInstitute: "AIIMS Kalyani",
} as const;

/* Course availability and enrolment links shared across the site. */
export const NORCET_COURSE = {
  status: "live",
  badge: "NORCET Preparation",
  name: "medhaup NORCET Course",
  campaign: "norcet-enrolment",
  enrolmentAnchor: "#enrolment",
  tagline: "Built for GNM and B.Sc Nursing students who want AIIMS.",
} as const;

export type NorcetStage = {
  id: "stage-1" | "stage-2";
  number: "I" | "II";
  name: string;
  nickname: string;
  purpose: string;
  questions: number;
  marks: number;
  minutes: number;
  negativeMarking: string;
  sections: { name: string; questions: number; note: string }[];
  outcome: string;
  tip: string;
};

export const NORCET_STAGES: NorcetStage[] = [
  {
    id: "stage-1",
    number: "I",
    name: "Preliminary",
    nickname: "The screening round",
    purpose:
      "A qualifying paper. Score above the cut-off and finish inside the shortlisting ratio announced in the notice to move to Stage II.",
    questions: 100,
    marks: 100,
    minutes: 90,
    negativeMarking: "⅓ mark deducted per wrong answer",
    sections: [
      {
        name: "Nursing subjects",
        questions: 80,
        note: "Fundamentals, Medical-Surgical, OBG, Community, Child, Mental Health and the foundation sciences.",
      },
      {
        name: "General knowledge, aptitude, reasoning & English",
        questions: 20,
        note: "Health-linked current affairs, basic arithmetic, reasoning and simple English usage.",
      },
    ],
    outcome:
      "Minimum qualifying marks in recent notices: 50% (UR/EWS), 45% (OBC), 40% (SC/ST). Stage I marks do not count in the final merit.",
    tip: "Accuracy beats attempts here. With a ⅓ penalty, three blind guesses that go wrong cancel one correct answer.",
  },
  {
    id: "stage-2",
    number: "II",
    name: "Mains",
    nickname: "The merit round",
    purpose:
      "The paper that actually ranks you. Questions are scenario and case based: a patient, a reading, a ward situation, and what the nurse should do next.",
    questions: 100,
    marks: 100,
    minutes: 90,
    negativeMarking: "⅓ mark deducted per wrong answer",
    sections: [
      {
        name: "Nursing subjects, applied and scenario-based",
        questions: 100,
        note: "The same subjects as Stage I, asked as clinical decisions instead of one-line facts.",
      },
    ],
    outcome:
      "The final merit list and institute allocation are prepared from Stage II marks alone.",
    tip: "Stage II rewards understanding over memory. The drug name is not enough; you must know the dose, the contraindication and the nurse's next step.",
  },
];

export const NORCET_MARKING = {
  correct: "+1",
  wrong: "−⅓",
  unattempted: "0",
} as const;

export type NorcetSubjectGroup =
  | "Core clinical nursing"
  | "Community & specialities"
  | "Foundation sciences"
  | "Professional nursing"
  | "General section";

export const NORCET_SUBJECT_GROUPS: NorcetSubjectGroup[] = [
  "Core clinical nursing",
  "Community & specialities",
  "Foundation sciences",
  "Professional nursing",
  "General section",
];

export type NorcetWeight = "very-high" | "high" | "medium" | "low";

export type NorcetSubject = {
  id: string;
  name: string;
  group: NorcetSubjectGroup;
  /** Approximate questions seen in recent papers (min, max). */
  approxQuestions: [number, number];
  weight: NorcetWeight;
  blurb: string;
  topics: string[];
};

export const NORCET_SUBJECTS: NorcetSubject[] = [
  {
    id: "medical-surgical-nursing",
    name: "Medical-Surgical Nursing",
    group: "Core clinical nursing",
    approxQuestions: [15, 18],
    weight: "very-high",
    blurb:
      "The single biggest block in every NORCET paper: systems, diseases, procedures and the nurse's role in each.",
    topics: [
      "Cardiovascular, respiratory and renal disorders",
      "GI, hepatic and endocrine disorders (diabetes, thyroid)",
      "Neurological and musculoskeletal nursing",
      "Fluid, electrolyte and acid–base balance",
      "Pre-, intra- and post-operative care",
      "Oncology, burns, emergency and critical care",
      "Blood transfusion, shock and ICU monitoring",
    ],
  },
  {
    id: "fundamentals-of-nursing",
    name: "Fundamentals of Nursing",
    group: "Core clinical nursing",
    approxQuestions: [9, 11],
    weight: "very-high",
    blurb:
      "Procedures, vital signs, infection control and the nursing process. These questions separate careful from careless.",
    topics: [
      "Nursing process and documentation",
      "Vital signs, positions and body mechanics",
      "Asepsis, hand hygiene and biomedical waste",
      "Medication administration and IV therapy",
      "Oxygen therapy, suctioning and specimen collection",
      "Wound care, pressure injuries and first aid",
      "Patient safety, restraints and comfort measures",
    ],
  },
  {
    id: "obstetric-gynaecological-nursing",
    name: "Obstetric & Gynaecological Nursing",
    group: "Core clinical nursing",
    approxQuestions: [7, 9],
    weight: "high",
    blurb:
      "Midwifery from antenatal care to postnatal complications, heavily case-based in Stage II.",
    topics: [
      "Antenatal care, fetal development and high-risk pregnancy",
      "Stages of labour, partograph and normal delivery",
      "Complications: PPH, eclampsia, obstructed labour",
      "Postnatal care, breastfeeding and newborn care",
      "Family planning methods and counselling",
      "Gynaecological disorders and infertility basics",
    ],
  },
  {
    id: "community-health-nursing",
    name: "Community Health Nursing",
    group: "Community & specialities",
    approxQuestions: [7, 9],
    weight: "high",
    blurb:
      "National health programmes, epidemiology and the health-care system. Direct, factual and very scoring.",
    topics: [
      "Primary health care and the Indian health-care system",
      "National health programmes (NTEP, NLEP, NVBDCP, NPCDCS)",
      "Immunisation schedule and cold chain",
      "Epidemiology, screening and biostatistics basics",
      "Environmental health, water and sanitation",
      "Maternal & child health services, ASHA and ANM roles",
      "Occupational health and school health",
    ],
  },
  {
    id: "child-health-nursing",
    name: "Child Health (Paediatric) Nursing",
    group: "Community & specialities",
    approxQuestions: [5, 7],
    weight: "high",
    blurb:
      "Growth, milestones, childhood illnesses and the newborn. Many numbers, many repeats.",
    topics: [
      "Growth and development milestones",
      "Neonatal care, prematurity and neonatal emergencies",
      "IMNCI and common childhood illnesses",
      "Nutritional disorders and immunisation",
      "Congenital anomalies and paediatric procedures",
      "Play therapy, the hospitalised child and parent education",
    ],
  },
  {
    id: "mental-health-nursing",
    name: "Mental Health (Psychiatric) Nursing",
    group: "Community & specialities",
    approxQuestions: [5, 6],
    weight: "medium",
    blurb:
      "Disorders, therapeutic communication and psychiatric drugs. The section students under-prepare most.",
    topics: [
      "Therapeutic communication and the nurse–patient relationship",
      "Schizophrenia, mood and anxiety disorders",
      "Substance use, personality and childhood disorders",
      "Psychopharmacology and ECT nursing care",
      "Crisis intervention, suicide and violence management",
      "Mental Healthcare Act and community psychiatry",
    ],
  },
  {
    id: "anatomy-physiology",
    name: "Anatomy & Physiology",
    group: "Foundation sciences",
    approxQuestions: [5, 7],
    weight: "medium",
    blurb:
      "Systems-wise structure and function, the foundation that Medical-Surgical questions silently test.",
    topics: [
      "Cell, tissues and the skeletal system",
      "Cardiovascular and respiratory physiology",
      "Digestive, renal and endocrine systems",
      "Nervous system and special senses",
      "Reproductive system and blood",
    ],
  },
  {
    id: "pharmacology",
    name: "Pharmacology",
    group: "Foundation sciences",
    approxQuestions: [4, 5],
    weight: "medium",
    blurb:
      "Drug classes, doses, side effects and antidotes, asked as ward situations rather than definitions.",
    topics: [
      "Pharmacokinetics, routes and dosage calculation",
      "Antibiotics, analgesics and anaesthetics",
      "Cardiac, respiratory and endocrine drugs",
      "Emergency drugs, antidotes and drug interactions",
      "Drug scheduling, storage and the nurse's responsibilities",
    ],
  },
  {
    id: "microbiology",
    name: "Microbiology",
    group: "Foundation sciences",
    approxQuestions: [2, 4],
    weight: "low",
    blurb: "Organisms, sterilisation and hospital infection control.",
    topics: [
      "Bacteria, viruses, fungi and parasites of clinical importance",
      "Sterilisation and disinfection methods",
      "Immunity, vaccines and hospital-acquired infections",
      "Specimen handling and biomedical waste",
    ],
  },
  {
    id: "nutrition-biochemistry",
    name: "Nutrition & Biochemistry",
    group: "Foundation sciences",
    approxQuestions: [2, 4],
    weight: "low",
    blurb: "Nutrients, therapeutic diets and deficiency disorders.",
    topics: [
      "Macronutrients, vitamins and minerals",
      "Therapeutic diets (renal, diabetic, cardiac)",
      "Deficiency disorders and nutritional assessment",
      "Enzymes, metabolism and common lab values",
    ],
  },
  {
    id: "psychology-sociology",
    name: "Psychology & Sociology",
    group: "Foundation sciences",
    approxQuestions: [2, 3],
    weight: "low",
    blurb: "Learning, personality, family and social factors in health.",
    topics: [
      "Learning, memory, motivation and personality",
      "Developmental psychology",
      "Family, community and culture in health",
      "Social problems and health behaviour",
    ],
  },
  {
    id: "nursing-research-statistics",
    name: "Nursing Research & Statistics",
    group: "Professional nursing",
    approxQuestions: [2, 3],
    weight: "low",
    blurb: "Research designs, sampling and basic statistics.",
    topics: [
      "Research process and study designs",
      "Sampling, data collection and tools",
      "Measures of central tendency and dispersion",
      "Ethics in research and evidence-based practice",
    ],
  },
  {
    id: "nursing-education-management",
    name: "Nursing Education & Management",
    group: "Professional nursing",
    approxQuestions: [2, 4],
    weight: "low",
    blurb: "Teaching methods, ward management and supervision.",
    topics: [
      "Teaching–learning methods and curriculum basics",
      "Ward management, staffing and budgeting",
      "Leadership, supervision and quality assurance",
      "Records, reports and material management",
    ],
  },
  {
    id: "nursing-ethics-professional-trends",
    name: "Nursing Ethics & Professional Trends",
    group: "Professional nursing",
    approxQuestions: [1, 2],
    weight: "low",
    blurb: "INC, professional bodies, legal duties and nursing history.",
    topics: [
      "INC, TNAI and nursing regulation in India",
      "Code of ethics, patient rights and consent",
      "Legal responsibilities and negligence",
      "History of nursing and professional organisations",
    ],
  },
  {
    id: "general-knowledge-aptitude-english",
    name: "General Knowledge, Aptitude & English",
    group: "General section",
    approxQuestions: [20, 20],
    weight: "high",
    blurb:
      "The 20 non-nursing questions in Stage I: health-flavoured current affairs, simple maths, reasoning and English.",
    topics: [
      "Current affairs with a health and science focus",
      "Indian polity, geography and general science basics",
      "Number series, coding-decoding and logical reasoning",
      "Percentages, ratios and simple arithmetic",
      "English grammar, vocabulary and comprehension",
    ],
  },
];

export const NORCET_NURSING_QUESTION_SHARE = 80;
export const NORCET_GENERAL_QUESTION_SHARE = 20;

export const NORCET_ELIGIBILITY = [
  {
    title: "B.Sc Nursing",
    detail:
      "B.Sc (Hons.) Nursing or a 4-year B.Sc Nursing from an INC-recognised institution.",
  },
  {
    title: "Post-Basic B.Sc Nursing",
    detail:
      "A 2-year Post-Basic B.Sc Nursing from an INC-recognised institution also qualifies.",
  },
  {
    title: "GNM + 2 years' experience",
    detail:
      "Diploma in General Nursing & Midwifery plus 2 years of experience in a hospital with at least 50 beds, after registration.",
  },
  {
    title: "Nursing council registration",
    detail:
      "Registered as a Nurse & Midwife with the State or Indian Nursing Council.",
  },
  {
    title: "Age 18 – 30",
    detail:
      "Age relaxation for SC/ST, OBC, PwBD and other categories as per Government of India rules.",
  },
] as const;

export const NORCET_JOURNEY = [
  {
    step: "Apply online",
    detail: "Register on the AIIMS exams portal when the notice is released.",
  },
  {
    step: "Stage I: Prelims",
    detail:
      "100 questions, 90 minutes. Clear the cut-off and the shortlisting ratio.",
  },
  {
    step: "Stage II: Mains",
    detail: "100 scenario-based questions. This score builds the merit list.",
  },
  {
    step: "Merit & allocation",
    detail:
      "Institute allotted on merit and preference across AIIMS and participating institutes.",
  },
  {
    step: "Nursing Officer",
    detail:
      "Document verification, medical fitness and joining at Pay Level 7.",
  },
] as const;

/* Institutes NORCET vacancies have covered in recent cycles. Display
   only; the exact participating institutes change with every notice. */
export const NORCET_INSTITUTES = [
  "AIIMS New Delhi",
  "AIIMS Kalyani",
  "AIIMS Bhubaneswar",
  "AIIMS Patna",
  "AIIMS Bhopal",
  "AIIMS Jodhpur",
  "AIIMS Raipur",
  "AIIMS Rishikesh",
  "AIIMS Nagpur",
  "AIIMS Mangalagiri",
  "AIIMS Gorakhpur",
  "AIIMS Bathinda",
  "AIIMS Deoghar",
  "AIIMS Rajkot",
  "AIIMS Guwahati",
  "AIIMS Bibinagar",
  "AIIMS Bilaspur",
  "AIIMS Madurai",
  "AIIMS Rae Bareli",
  "AIIMS Vijaypur",
] as const;

export const NORCET_STAKES = [
  {
    title: "A Nursing Officer post at AIIMS",
    detail:
      "NORCET is the single gateway to Nursing Officer recruitment across AIIMS institutes and other participating central institutes.",
  },
  {
    title: "Pay Level 7, central government",
    detail: `${NORCET.payBand}. A permanent central post with allowances, not a contract.`,
  },
  {
    title: "AIIMS Kalyani is in West Bengal",
    detail:
      "You do not have to leave the state to work at AIIMS. Recent NORCET vacancies have included AIIMS Kalyani alongside institutes nationwide.",
  },
  {
    title: "Two chances most years",
    detail:
      "Recent cycles have run roughly twice a year, so a miss is a delay of months, not a lost year.",
  },
] as const;

export const NORCET_COURSE_PLAN = [
  {
    title: "Subject-wise live classes",
    detail:
      "Concepts explained in Bengali and English, practised in English. The paper comes in English and Hindi only.",
  },
  {
    title: "Stage II scenario drills",
    detail:
      "Case-based question sets built the way Mains asks: patient, reading, situation, and the nurse's next action.",
  },
  {
    title: "Subject MCQ banks",
    detail:
      "Chapter-wise question banks with the ⅓ negative-marking strategy built into every practice set.",
  },
  {
    title: "Full-length mock tests",
    detail:
      "Timed CBT mocks on the 100-question, 90-minute pattern with rank and accuracy analysis.",
  },
  {
    title: "PYQ analysis",
    detail:
      "Previous NORCET papers solved and tagged by subject, so repeats are never a surprise.",
  },
  {
    title: "Doubt support",
    detail:
      "Every doubt answered, the same promise medhaup keeps in the ANM/GNM course.",
  },
] as const;

export const NORCET_FAQS = [
  {
    question: "What is NORCET?",
    answer:
      "NORCET (Nursing Officer Recruitment Common Eligibility Test) is the exam conducted by AIIMS, New Delhi, to recruit Nursing Officers for AIIMS institutes and other participating central government institutes. It is a computer-based test held in two stages: a Preliminary screening paper and a Mains paper that decides the final merit.",
  },
  {
    question: "Who is eligible for NORCET?",
    answer:
      "Candidates with B.Sc (Hons.) Nursing, B.Sc Nursing, or Post-Basic B.Sc Nursing from an INC-recognised institution, or a GNM diploma with two years of experience in a hospital of at least 50 beds. Registration as a Nurse and Midwife with a State or the Indian Nursing Council is required, and the age limit is 18 to 30 years with relaxations as per rules. Always confirm the exact conditions in the current AIIMS notice.",
  },
  {
    question: "What is the NORCET exam pattern?",
    answer:
      "Stage I has 100 multiple-choice questions in 90 minutes: about 80 from nursing subjects and 20 from general knowledge, aptitude, reasoning and English. Stage II also has 100 questions in 90 minutes, but they are scenario and case based. Both stages deduct one-third of a mark for every wrong answer. Stage I is qualifying; the final merit list is prepared from Stage II marks.",
  },
  {
    question: "Which subjects matter most in NORCET?",
    answer:
      "Medical-Surgical Nursing and Fundamentals of Nursing carry the largest share, followed by Obstetric & Gynaecological Nursing, Community Health Nursing, Child Health Nursing and Mental Health Nursing. Anatomy & Physiology, Pharmacology, Microbiology, Nutrition and the professional subjects make up the rest. AIIMS does not publish subject-wise weightage, so medhaup's distribution is an approximation from recent papers.",
  },
  {
    question: "Is NORCET available in Bengali?",
    answer:
      "No. The NORCET question paper is set in English and Hindi. medhaup's NORCET course is designed for Bengali-medium nursing students: concepts are explained in Bengali and English, while every practice question is in English so that the real paper feels familiar.",
  },
  {
    question: "Can a GNM student appear for NORCET?",
    answer:
      "Yes, with a GNM diploma, nursing council registration and two years of experience in a hospital with at least 50 beds. Many GNM graduates use the experience period to prepare, which is exactly the phase medhaup's NORCET course supports.",
  },
  {
    question: "What is the salary of a Nursing Officer through NORCET?",
    answer:
      "The Nursing Officer post is Group B at Pay Level 7 of the 7th CPC pay matrix, with a basic pay range of ₹44,900 to ₹1,42,400 plus applicable allowances. The exact gross salary depends on the institute, city and allowances at the time of joining.",
  },
  {
    question: "How can I enrol in medhaup's NORCET course?",
    answer:
      "Send an enquiry using the form on this page or contact us on WhatsApp for current fees, batch dates, class timings and enrolment steps.",
  },
  {
    question: "Is medhaup connected to AIIMS?",
    answer:
      "No. medhaup is an independent preparation platform. It is not AIIMS and does not publish official notices, applications, admit cards or results. Exam dates, vacancies, eligibility and rules must be verified from the official AIIMS exams website.",
  },
] as const;

export const NORCET_SEO_KEYWORDS = [
  "NORCET",
  "NORCET preparation",
  "NORCET coaching West Bengal",
  "NORCET syllabus",
  "NORCET exam pattern",
  "NORCET subjects",
  "NORCET eligibility",
  "AIIMS Nursing Officer exam",
  "AIIMS NORCET",
  "NORCET Bengali coaching",
  "Nursing Officer recruitment",
  "AIIMS Kalyani nursing officer",
];

/** Short lines added to every medhaup AI context. */
export function getTrustedNorcetStatusFacts() {
  return [
    `medhaup's NORCET (${NORCET.fullName}, conducted by ${NORCET.conductedBy}) preparation course is offered at ${NORCET_PATH}. Send a course enquiry at ${NORCET_PATH}#enrolment. Ask the team for current fees, batch dates and class timings; never invent these details or reuse ANM/GNM pricing.`,
    `The ${NORCET_PATH} page explains the NORCET exam pattern, subjects, syllabus and eligibility, and lists any free NORCET study material medhaup has published.`,
  ];
}

/** Full exam facts, used only for the /norcet page context. */
export function getTrustedNorcetExamFacts() {
  const stageLines = NORCET_STAGES.map(
    (stage) =>
      `NORCET Stage ${stage.number} (${stage.name}): ${stage.questions} MCQs, ${stage.marks} marks, ${stage.minutes} minutes, ${stage.negativeMarking}. Sections: ${stage.sections
        .map((section) => `${section.name} (~${section.questions} questions)`)
        .join("; ")}. ${stage.outcome}`,
  );
  const subjectLines = NORCET_SUBJECTS.map(
    (subject) =>
      `NORCET subject: ${subject.name} (${subject.group}), approximately ${subject.approxQuestions[0]}–${subject.approxQuestions[1]} questions in recent papers. Topics: ${subject.topics.join(", ")}.`,
  );

  return [
    `NORCET is the ${NORCET.fullName}, conducted by ${NORCET.conductedBy} to recruit ${NORCET.post}s (${NORCET.postGroup}, ${NORCET.payBand}) for AIIMS institutes and other participating central institutes. Mode: ${NORCET.mode}. Question paper languages: ${NORCET.languages.join(" and ")} only, not Bengali. ${NORCET.frequency}. Official website: ${NORCET.officialUrl}.`,
    `NORCET eligibility (verify in the current notice): ${NORCET_ELIGIBILITY.map((item) => `${item.title}: ${item.detail}`).join(" ")}`,
    ...stageLines,
    `Marking in both stages: correct ${NORCET_MARKING.correct}, wrong ${NORCET_MARKING.wrong}, unattempted ${NORCET_MARKING.unattempted}.`,
    "AIIMS does not publish subject-wise weightage. medhaup's subject distribution is an approximation from recent papers and must be presented as approximate.",
    `Recent NORCET vacancies have covered AIIMS institutes including ${NORCET.westBengalInstitute} in West Bengal; the participating institutes and vacancy counts change every notice.`,
    ...subjectLines,
    "medhaup is independent and is not AIIMS. Exam dates, vacancies, application windows, admit cards, results and cut-offs must be verified on the official AIIMS exams website.",
  ];
}
