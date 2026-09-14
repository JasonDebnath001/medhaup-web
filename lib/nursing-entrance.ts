import {
  NURSING_ENTRANCE_COURSES,
  type NursingEntranceSummary,
} from "./nursing-entrance-catalog";

export type NursingEntranceSubject = { name: string; topics: string[] };
export type NursingEntranceCourse = NursingEntranceSummary & {
  fullName: string;
  description: string;
  heroLine: string;
  referenceYear: number;
  syllabusLevel: string;
  sources: {
    official: string;
    bulletin: string;
    pastPapers: string;
    syllabusPage: number;
    scoringPage: number;
  };
  parts: {
    id: string;
    name: string;
    title: string;
    questions: number;
    subjects: NursingEntranceSubject[];
  }[];
  eligibility: { title: string; text: string; page: number }[];
  experience: { group: string; requirement: string }[];
  experiencePage: number;
  experienceNote: string;
  interestOptions: { id: string; label: string }[];
  faqs: { question: string; answer: string }[];
};

// WBJEEB lists subjects and part totals, not chapter-level or subject-level weights.
// These topic suggestions are editorial study prompts, not an official syllabus.
const SUBJECTS = {
  anatomy: {
    name: "Anatomy",
    topics: [
      "Body organisation and anatomical terminology",
      "Structure of major organs and body systems",
      "Anatomical landmarks relevant to nursing procedures",
    ],
  },
  physiology: {
    name: "Physiology",
    topics: [
      "Normal functions of major body systems",
      "Fluid, electrolyte and acid-base balance",
      "Homeostasis and regulation of body functions",
    ],
  },
  sociology: {
    name: "Sociology",
    topics: [
      "Family, culture and social institutions",
      "Social influences on health and illness",
      "Community, social change and the nursing role",
    ],
  },
  psychology: {
    name: "Psychology",
    topics: [
      "Human development and behaviour",
      "Learning, memory, motivation and emotion",
      "Personality, adjustment and coping",
    ],
  },
  pharmacology: {
    name: "Pharmacology",
    topics: [
      "Drug groups, actions and adverse effects",
      "Principles of safe medication administration",
      "Dosage calculations and nursing responsibilities",
    ],
  },
  microbiology: {
    name: "Microbiology",
    topics: [
      "Microorganisms and routes of transmission",
      "Immunity, infection prevention and sterilisation",
      "Specimen collection and laboratory principles",
    ],
  },
  nutrition: {
    name: "Nutrition",
    topics: [
      "Nutrients, balanced diets and nutritional assessment",
      "Nutrition through the life stages",
      "Therapeutic diets and deficiency disorders",
    ],
  },
  pathology: {
    name: "Pathology",
    topics: [
      "Cell injury, inflammation and healing",
      "Common disease processes and their effects",
      "Interpretation of basic investigations in nursing care",
    ],
  },
  genetics: {
    name: "Genetics",
    topics: [
      "Inheritance, chromosomes and genetic variation",
      "Genetic conditions and screening principles",
      "Counselling, consent and the nurse's role",
    ],
  },
  administration: {
    name: "Administration",
    topics: [
      "Planning, organisation, staffing and supervision",
      "Leadership and management of nursing services",
      "Quality improvement, records and resource management",
    ],
  },
  education: {
    name: "Education",
    topics: [
      "Learning principles and teaching methods",
      "Planning lessons and clinical teaching",
      "Assessment, evaluation and educational aids",
    ],
  },
  research: {
    name: "Research & Statistics",
    topics: [
      "Research questions, study designs and ethics",
      "Sampling, data collection and critical appraisal",
      "Descriptive statistics and basic interpretation of findings",
    ],
  },
  foundation: {
    name: "Foundation of Nursing",
    topics: [
      "Nursing process, assessment and care planning",
      "Fundamental procedures, safety and infection control",
      "Communication, documentation and professional ethics",
    ],
  },
  medicalSurgical: {
    name: "Medical Surgical Nursing",
    topics: [
      "Assessment and care of adults with system disorders",
      "Preoperative and postoperative nursing",
      "Emergency care principles and prioritisation",
    ],
  },
  pediatric: {
    name: "Pediatric Nursing",
    topics: [
      "Growth, development and care across childhood",
      "Common childhood conditions and nursing priorities",
      "Family-centred care and preventive child health",
    ],
  },
  psychiatric: {
    name: "Psychiatric Nursing",
    topics: [
      "Mental health assessment and therapeutic communication",
      "Nursing care in common psychiatric conditions",
      "Crisis care, rehabilitation and patient rights",
    ],
  },
  obstetrical: {
    name: "Obstetrical Nursing",
    topics: [
      "Antenatal, intranatal and postnatal nursing",
      "Assessment of mother and newborn",
      "Obstetric complications and referral priorities",
    ],
  },
  community: {
    name: "Community Health Nursing",
    topics: [
      "Community assessment and primary healthcare",
      "Epidemiology, prevention and health education",
      "Public health programmes and family health services",
    ],
  },
} satisfies Record<string, NursingEntranceSubject>;

const CLINICAL_SUBJECTS = [
  SUBJECTS.foundation,
  SUBJECTS.medicalSurgical,
  SUBJECTS.pediatric,
  SUBJECTS.psychiatric,
  SUBJECTS.obstetrical,
  SUBJECTS.community,
];
const CDN =
  "https://cdnbbsr.s3waas.gov.in/s3d2a27e83d429f0dcae6b937cf440aeb1/uploads/2026/03/";
const ENROLMENT_FAQ = {
  question: "How can I enrol, and what are the fees?",
  answer:
    "Contact our team on WhatsApp for current fees, batch timings, class details and enrolment steps.",
};
const REFERENCE_FAQ = {
  question: "Which examination year does this guide follow?",
  answer:
    "The linked WBJEEB 2026 bulletin is the reference for this guide. Check the official bulletin and notices for your examination year before applying. Course enrolment is separate from the entrance examination schedule.",
};

export const JEPBN_COURSE: NursingEntranceCourse = {
  ...NURSING_ENTRANCE_COURSES[0],
  fullName: "Joint Entrance Test for Post Basic Nursing",
  description:
    "JEPBN preparation is available at medhaup. Explore GNM-based subjects, the entrance exam pattern, eligibility and official WBJEEB resources.",
  heroLine: "Your GNM foundation. Your next step.",
  referenceYear: 2026,
  syllabusLevel: "GNM",
  sources: {
    official: "https://wbjeeb.nic.in/jepbn/",
    bulletin: `${CDN}202603251936173346.pdf`,
    pastPapers: "https://wbjeeb.nic.in/jepbn-old-question-papers/",
    syllabusPage: 6,
    scoringPage: 7,
  },
  parts: [
    {
      id: "part-a",
      name: "Part A",
      title: "Basic sciences & foundations",
      questions: 40,
      subjects: [
        SUBJECTS.anatomy,
        SUBJECTS.physiology,
        SUBJECTS.sociology,
        SUBJECTS.psychology,
        SUBJECTS.pharmacology,
        SUBJECTS.microbiology,
        SUBJECTS.nutrition,
        SUBJECTS.pathology,
      ],
    },
    {
      id: "part-b",
      name: "Part B",
      title: "Nursing subjects",
      questions: 60,
      subjects: CLINICAL_SUBJECTS,
    },
  ],
  eligibility: [
    {
      title: "Qualification & registration",
      text: "10+2 and an INC-recognised GNM qualification, plus State Nursing Council registration / RNRM. Complete applicable internship requirements before admission.",
      page: 8,
    },
    {
      title: "Citizenship & gender",
      text: "Indian citizens; male and female candidates may apply.",
      page: 8,
    },
    {
      title: "Domicile",
      text: "West Bengal domicile is required. Section 6 exempts WB government employees with Trainee Reserve (TR) status.",
      page: 10,
    },
    {
      title: "Age",
      text: "WB government nursing personnel: maximum 53 years on the application deadline. Others, including ESI and Central government employees: no upper limit.",
      page: 8,
    },
  ],
  experience: [
    {
      group: "WB government employees",
      requirement:
        "At least 3 years of qualifying uninterrupted / regularised government service by the application deadline.",
    },
    {
      group: "Other candidates",
      requirement:
        "Work experience is not essential, including for ESI and Central government employees.",
    },
  ],
  experiencePage: 8,
  experienceNote:
    "WB government employees must also meet the applicable Trainee Reserve rules at admission.",
  interestOptions: [
    { id: "studying-gnm", label: "Currently studying GNM" },
    { id: "completed-gnm", label: "Completed GNM" },
  ],
  faqs: [
    {
      question: "What will this preparation course help me work towards?",
      answer:
        "The medhaup course is for JEPBN aspirants targeting Post Basic B.Sc. Nursing admission in West Bengal. It is entrance preparation; the degree is offered by the admitting nursing institution.",
    },
    {
      question: "What should I revise for JEPBN?",
      answer:
        "Start with your GNM curriculum. Use the Part A and Part B subject lists below to organise your revision, then practise with the official previous-year papers. WBJEEB gives part totals, without fixed question counts for individual subjects.",
    },
    {
      question: "Can I request updates while I am studying GNM?",
      answer:
        "Yes. You can ask about the preparation course while studying. A course enquiry does not confirm eligibility for the entrance examination or admission; read the qualification and registration requirements before applying.",
    },
    {
      question: "Is JEPBN the same as JENPAS(UG)?",
      answer:
        "They are separate examinations. JEPBN is the Post Basic Nursing pathway for GNM-qualified applicants; JENPAS(UG) covers undergraduate nursing and allied health entry. Use the page and official bulletin that match your intended degree.",
    },
    ENROLMENT_FAQ,
    REFERENCE_FAQ,
  ],
};

export const JEMSCN_COURSE: NursingEntranceCourse = {
  ...NURSING_ENTRANCE_COURSES[1],
  fullName: "Joint Entrance for Master of Science in Nursing",
  description:
    "JEMScN preparation is available at medhaup. Explore nursing subjects, the MSc Nursing entrance exam pattern, eligibility and official WBJEEB resources.",
  heroLine: "Build on your degree. Prepare for more.",
  referenceYear: 2026,
  syllabusLevel: "B.Sc. / Post Basic B.Sc. Nursing",
  sources: {
    official: "https://wbjeeb.nic.in/jemscn/",
    bulletin: `${CDN}20260325384591672.pdf`,
    pastPapers: "https://wbjeeb.nic.in/jemscn-old-question-papers/",
    // PDF page positions include the cover; printed page labels are offset by one.
    syllabusPage: 6,
    scoringPage: 7,
  },
  parts: [
    {
      id: "part-a",
      name: "Part A",
      title: "Sciences, education & research",
      questions: 40,
      subjects: [
        SUBJECTS.anatomy,
        SUBJECTS.physiology,
        SUBJECTS.sociology,
        SUBJECTS.psychology,
        SUBJECTS.microbiology,
        SUBJECTS.pathology,
        SUBJECTS.pharmacology,
        SUBJECTS.genetics,
        SUBJECTS.administration,
        SUBJECTS.education,
        SUBJECTS.research,
      ],
    },
    {
      id: "part-b",
      name: "Part B",
      title: "Nursing subjects",
      questions: 60,
      subjects: CLINICAL_SUBJECTS,
    },
  ],
  eligibility: [
    {
      title: "Qualification & marks",
      text: "INC-recognised B.Sc. / Post Basic B.Sc. Nursing, including the listed honours and distance routes; at least 55% aggregate across all academic years.",
      page: 8,
    },
    {
      title: "Registration",
      text: "State Nursing Council registration / RNRM is required. Complete applicable internship requirements before admission.",
      page: 8,
    },
    {
      title: "Citizenship & domicile",
      text: "Indian citizens; male and female applicants. WB domicile rules concern reserved seats, with specified institutional and TR exemptions; see section 6.",
      page: 11,
    },
    {
      title: "Age",
      text: "WB government nursing personnel: maximum 53 years on the application deadline. Others, including ESI and Central government employees: no upper limit.",
      page: 9,
    },
  ],
  experience: [
    {
      group: "WB government employees",
      requirement:
        "3 years after publication of the qualifying result, plus the prescribed sponsorship permission at admission.",
    },
    {
      group: "Others: B.Sc. / B.Sc. (Hons.) Nursing",
      requirement: "1 year after publication of the final result.",
    },
    {
      group: "Others: Post Basic B.Sc. / Post Basic B.Sc. (Hons.)",
      requirement: "1 year before or after publication of the final result.",
    },
    {
      group: "Others: Post Basic B.Sc. through distance education",
      requirement: "1 year after publication of the final result.",
    },
  ],
  experiencePage: 9,
  experienceNote:
    "All experience periods must be completed by the application deadline. Verify the category and qualification route that apply to you.",
  interestOptions: [
    { id: "bsc-nursing", label: "B.Sc. / B.Sc. (Hons.) Nursing" },
    { id: "post-basic-nursing", label: "Post Basic B.Sc. Nursing" },
    { id: "distance-post-basic", label: "Post Basic B.Sc. — distance route" },
  ],
  faqs: [
    {
      question: "Who is the JEMScN course for?",
      answer:
        "It is for nursing graduates preparing for WBJEEB's M.Sc. Nursing entrance examination. medhaup offers entrance preparation; admission and the degree remain with the respective institutions.",
    },
    {
      question: "How does the syllabus differ from JEPBN?",
      answer:
        "JEMScN uses the B.Sc. / Post Basic B.Sc. Nursing curriculum. Its Part A includes genetics, administration, education, and research and statistics. Use the subject lists on this page at the stated degree level.",
    },
    {
      question: "Does GNM alone qualify me for JEMScN?",
      answer:
        "GNM alone is not a listed qualifying degree for JEMScN. Review the recognised nursing degree, aggregate marks, registration and experience requirements. JEPBN is the separate entrance pathway for Post Basic Nursing.",
    },
    {
      question: "How should I check my work experience?",
      answer:
        "Use the experience table for your employment category and qualification route, and read the linked bulletin section. Keep supporting documents ready; a request for medhaup course updates is not an eligibility assessment.",
    },
    ENROLMENT_FAQ,
    REFERENCE_FAQ,
  ],
};
