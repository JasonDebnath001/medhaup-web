export const JENPAS_PATH = "/jenpas-ug";
export const JENPAS_NAME = "JENPAS(UG) Preparation Course";
export const JENPAS_DESCRIPTION =
  "Prepare for JENPAS(UG) with medhaup. Explore Paper I and II subjects, syllabus, marking rules and WBJEEB references.";
export const JENPAS_REFERENCE_YEAR = 2026;

export const JENPAS_SOURCES = {
  official: "https://wbjeeb.nic.in/jenpas-ug/",
  bulletin:
    "https://cdnbbsr.s3waas.gov.in/s3d2a27e83d429f0dcae6b937cf440aeb1/uploads/2026/08/20260808892082586.pdf",
  healthAptitude:
    "https://cdnbbsr.s3waas.gov.in/s3d2a27e83d429f0dcae6b937cf440aeb1/uploads/2026/04/202604222111374119.pdf",
  pastPapers: "https://wbjeeb.nic.in/old-question-papers-jenpas-ug/",
} as const;

export type JenpasSubject = {
  name: string;
  category1: number;
  category2: number;
  level: string;
  topics: string[];
  officialOutline?: boolean;
};

type JenpasPaper = {
  id: "paper-1" | "paper-2";
  number: string;
  label: string;
  title: string;
  description: string;
  rank: string;
  surface: string;
  accent: string;
  subjects: JenpasSubject[];
  courses: string[];
};

const ENGLISH_TOPICS = [
  "Reading comprehension and vocabulary",
  "Grammar, usage and sentence structure",
  "Synonyms, antonyms and word meaning in context",
  "Sentence correction and completion",
];

// Paper structure and levels: WBJEEB 2026 bulletin, pp. 7–8.
// Only Health Aptitude has a separate official topic outline linked here.
// Other topic lists are revision suggestions within the stated school level.
export const JENPAS_PAPERS: JenpasPaper[] = [
  {
    id: "paper-1",
    number: "I",
    label: "Paper I",
    title: "Nursing & allied health sciences",
    description:
      "For B.Sc. Nursing and the other listed undergraduate courses except BHA. Build your preparation around science, English and Health Aptitude.",
    rank: "General Merit Rank (GMR)",
    surface: "bg-[#e5f0fb]",
    accent: "text-[#24558a]",
    subjects: [
      {
        name: "Physics",
        category1: 15,
        category2: 5,
        level: "Class 11–12 syllabus of a recognised board",
        topics: [
          "Units, measurement and mechanics",
          "Properties of matter, heat and thermodynamics",
          "Oscillations and waves",
          "Electricity and magnetism",
          "Optics",
          "Atoms, nuclei and electronic devices",
        ],
      },
      {
        name: "Chemistry",
        category1: 15,
        category2: 5,
        level: "Class 11–12 syllabus of a recognised board",
        topics: [
          "Atomic structure, periodicity and chemical bonding",
          "Mole concepts and chemical calculations",
          "Thermodynamics, equilibrium and redox reactions",
          "Solutions, electrochemistry and chemical kinetics",
          "Inorganic chemistry and coordination compounds",
          "Organic chemistry, functional groups and biomolecules",
        ],
      },
      {
        name: "Biology",
        category1: 15,
        category2: 5,
        level: "Class 11–12 syllabus of a recognised board",
        topics: [
          "Diversity of living organisms and biological classification",
          "Cells, biomolecules and cell division",
          "Plant and human physiology",
          "Reproduction, genetics and evolution",
          "Biotechnology and human welfare",
          "Ecology and the environment",
        ],
      },
      {
        name: "Basic English",
        category1: 20,
        category2: 0,
        level: "Class 11–12 curriculum level",
        topics: ENGLISH_TOPICS,
      },
      {
        name: "Health Aptitude",
        category1: 20,
        category2: 0,
        level: "WBJEEB’s separate 2026 Health Aptitude outline",
        officialOutline: true,
        topics: [
          "Hygiene & sanitation: personal cleanliness, community sanitation and disease prevention",
          "Common diseases: communicable and non-communicable conditions and basic patient care",
          "Healthcare systems & services: facilities, first aid, immunisation and health awareness",
          "National health policies & programmes: public health initiatives and administration",
          "Human anatomy & physiology: body systems and the effects of exercise and ageing",
          "Nutrition & dietetics: nutrients, balanced diets, deficiencies and needs across age groups",
          "Mental health: psychological well-being and stress management",
          "Professional ethics & aptitude: empathy, responsibility and patient rights",
          "Telemedicine, telehealth and disaster management",
        ],
      },
    ],
    courses: [
      "B.Sc. Nursing",
      "B.P.T. — Physiotherapy",
      "B.O.T. — Occupational Therapy",
      "B.M.L.S. — Medical Laboratory Science",
      "A.O.T.T. — Anaesthesia and Operation Theatre Technology",
      "B.PA — Physician Associate",
      "B.EMT — Emergency Medical Technology",
      "B.OPTM — Optometry",
      "B.Sc. M.R.I.T. — Medical Radiology and Imaging Technology",
      "B.R.T. — Respiratory Technology",
      "B.Sc. MMB — Medical Microbiology",
      "B.Sc. C.S.I.C. — Central Sterilization and Infection Control",
    ],
  },
  {
    id: "paper-2",
    number: "II",
    label: "Paper II",
    title: "Hospital administration",
    description:
      "For Bachelor of Hospital Administration (BHA) only. Prepare physical science, mathematics, general knowledge, English and logical reasoning.",
    rank: "BHA Merit Rank (BMR)",
    surface: "bg-[#fff0e4]",
    accent: "text-[#a6440e]",
    subjects: [
      {
        name: "Physical Science",
        category1: 25,
        category2: 5,
        level: "Class 10 WBBSE or an equivalent recognised board",
        topics: [
          "Motion, force, work and energy",
          "Heat, light and electricity",
          "Chemical reactions and equations",
          "Acids, bases, salts and materials",
          "Metals, non-metals and carbon compounds",
        ],
      },
      {
        name: "Mathematics",
        category1: 10,
        category2: 5,
        level: "Class 10 WBBSE or an equivalent recognised board",
        topics: [
          "Number systems and arithmetic",
          "Algebra and equations",
          "Geometry and coordinate geometry",
          "Trigonometry and mensuration",
          "Statistics and probability",
        ],
      },
      {
        name: "General Knowledge",
        category1: 10,
        category2: 5,
        level: "Equivalent to Class 12 curriculum",
        topics: [
          "Current affairs and general awareness",
          "Indian history, geography and civics",
          "Everyday science and public institutions",
          "Major national and international events",
        ],
      },
      {
        name: "Basic English",
        category1: 20,
        category2: 0,
        level: "Equivalent to Class 12 curriculum",
        topics: ENGLISH_TOPICS,
      },
      {
        name: "Logical Reasoning",
        category1: 20,
        category2: 0,
        level: "Equivalent to Class 12 curriculum",
        topics: [
          "Patterns, series and analogies",
          "Classification and coding-decoding",
          "Directions, relationships and arrangements",
          "Statements, conclusions and logical deductions",
        ],
      },
    ],
    courses: ["B.H.A. — Bachelor of Hospital Administration"],
  },
];

export function getJenpasPaperTotals(subjects: JenpasSubject[]) {
  return subjects.reduce(
    (total, subject) => ({
      category1: total.category1 + subject.category1,
      category2: total.category2 + subject.category2,
      questions: total.questions + subject.category1 + subject.category2,
      marks: total.marks + subject.category1 + 2 * subject.category2,
    }),
    { category1: 0, category2: 0, questions: 0, marks: 0 },
  );
}

export const JENPAS_INTEREST_OPTIONS = [
  { id: "paper-1", label: "Paper I", detail: "Nursing & allied health" },
  { id: "paper-2", label: "Paper II", detail: "BHA only" },
  { id: "both", label: "Both papers", detail: "Paper I + Paper II" },
] as const;

export const JENPAS_FAQS = [
  {
    question: "What is this course for?",
    answer:
      "This medhaup course is for students preparing for WBJEEB’s JENPAS(UG) entrance examination for undergraduate nursing, allied health sciences and hospital administration courses in West Bengal.",
  },
  {
    question: "Which paper should I prepare for?",
    answer:
      "In the 2026 bulletin, Paper I is for all listed courses except BHA, including B.Sc. Nursing, and produces the General Merit Rank (GMR). Paper II is for BHA only and produces the BHA Merit Rank (BMR). You can apply for one paper or both, subject to the relevant course eligibility.",
  },
  {
    question: "Does Paper I include Health Aptitude?",
    answer:
      "Yes. The 2026 Paper I has Physics, Chemistry, Biology, Basic English and Health Aptitude. Health Aptitude carries 20 questions for 20 marks. Logical Reasoning is a Paper II subject in this bulletin.",
  },
  {
    question: "How many questions and marks are there?",
    answer:
      "Each paper in the WBJEEB 2026 scheme has 100 multiple-choice questions for 115 marks, to be answered in 90 minutes on an OMR sheet. Category 1 has negative marking of one-quarter mark per wrong answer. Category 2 has two-mark questions and permits partial credit when only correct options are selected.",
  },
  {
    question: "How can I enrol, and what are the fees?",
    answer:
      "Contact our team on WhatsApp for current fees, batch timings, class details and enrolment steps.",
  },
  {
    question: "Which examination year does this guide follow?",
    answer:
      "The exam structure and syllabus references on this page follow WBJEEB’s JENPAS(UG) 2026 information bulletin and Health Aptitude notice. These are reference materials for preparation; check WBJEEB’s bulletin for your examination year for the applicable dates, syllabus and eligibility.",
  },
  {
    question: "Is this the same as the ANM/GNM entrance course?",
    answer:
      "JENPAS(UG) is a separate entrance examination for undergraduate nursing and allied health courses. medhaup’s ANM/GNM entrance preparation and year-wise ANM/GNM academic courses have their own pages.",
  },
] as const;
