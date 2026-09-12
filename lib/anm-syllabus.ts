// INC's two-year ANM amendment supplies course rows, marks and internship hours.
// Detailed topic summaries refer to the syllabus hosted by AP Nursing Council.
// First-year hours reproduce the main course rows, not the inconsistent printed totals.
export const ANM_SOURCES = {
  syllabus: "https://apnc.nic.in/pdf/syllabus/ANM_Syllabus.pdf",
  amendments:
    "https://indiannursingcouncil.org/uploads/pdf/15993067772699902415f537c1986719.pdf",
} as const;

export type AnmSubject = {
  id: string;
  name: string;
  theoryHours: number;
  demonstrationHours: number;
  hospitalHours: number;
  communityHours: number;
  sourcePage: number;
  topics: string[];
  clinicalActivities: string[];
};

type AnmYear = {
  yearId: "1st" | "2nd";
  summary: string;
  sourcePage: number;
  subjects: AnmSubject[];
};

export const ANM_CURRICULUM: AnmYear[] = [
  {
    yearId: "1st",
    summary:
      "Four core subjects combine classroom learning with demonstrations and experience in hospitals and the community. Health Promotion and Primary Health Care Nursing each contain several subject areas.",
    sourcePage: 19,
    subjects: [
      {
        id: "community-health",
        name: "Community Health Nursing",
        theoryHours: 120,
        demonstrationHours: 50,
        hospitalHours: 10,
        communityHours: 100,
        sourcePage: 19,
        topics: [
          "Health concepts, determinants and primary health care",
          "Community health practices and home visiting",
          "Health policies, national programmes and referral services",
          "Health organisations, the health team and the ANM’s role",
          "Rural and urban communities, local resources and social influences",
          "Community needs assessment, surveys and reports",
          "Health communication, education and counselling",
        ],
        clinicalActivities: [
          "Community mapping, family surveys and identification of health needs",
          "Supervised home visits and family health assessment",
          "Health education, counselling and community records",
          "Visits to sub-centres and primary health centres",
        ],
      },
      {
        id: "health-promotion",
        name: "Health Promotion",
        theoryHours: 120,
        demonstrationHours: 75,
        hospitalHours: 20,
        communityHours: 180,
        sourcePage: 26,
        topics: [
          "Nutrition: nutrients, balanced diets and needs across life stages",
          "Nutrition: food preparation, preservation and deficiency prevention",
          "Human Body & Hygiene: body systems and personal health practices",
          "Environmental Sanitation: safe water, waste disposal and healthy surroundings",
          "Mental Health: mental well-being, warning signs and support for families",
          "Health promotion for individuals, families and communities",
        ],
        clinicalActivities: [
          "Nutrition assessment and planning health-education activities",
          "Demonstrations of hygiene, safe water and sanitation practices",
          "Community participation in environmental health activities",
          "Recognition of mental-health concerns and appropriate referral",
        ],
      },
      {
        id: "primary-health-care",
        name: "Primary Health Care Nursing",
        theoryHours: 130,
        demonstrationHours: 150,
        hospitalHours: 90,
        communityHours: 300,
        sourcePage: 35,
        topics: [
          "Infection & Immunisation: transmission, prevention, vaccines and cold chain",
          "Communicable Diseases: recognition, prevention and community follow-up",
          "Community Health Problems: assessment and basic nursing care",
          "Primary Medical Care: medicine handling and care within prescribed protocols",
          "First Aid & Referral: initial response, danger signs and referral pathways",
          "Disinfection, sterilisation and safe waste management",
        ],
        clinicalActivities: [
          "Supervised basic nursing procedures and health assessments",
          "Infection prevention and immunisation-related activities",
          "Care of common health problems and follow-up in the community",
          "First-aid demonstrations, referral and documentation",
        ],
      },
      {
        id: "child-health",
        name: "Child Health Nursing",
        theoryHours: 75,
        demonstrationHours: 110,
        hospitalHours: 80,
        communityHours: 100,
        sourcePage: 51,
        topics: [
          "Growth and development from infancy to adolescence",
          "Child nutrition, breastfeeding and complementary feeding",
          "Assessment and care of common childhood illnesses",
          "Immunisation and prevention of childhood illness",
          "School health, child rights and accident prevention",
          "Adolescent health and family education",
        ],
        clinicalActivities: [
          "Growth monitoring, nutrition assessment and child-health records",
          "Supervised care and assessment of sick children",
          "Family counselling on feeding, hygiene and illness prevention",
          "School-health and child-health clinic activities",
        ],
      },
    ],
  },
  {
    yearId: "2nd",
    summary:
      "The first six months focus on Midwifery and Health Centre Management. The next six months are a supervised internship, with further experience in maternal, child and community health.",
    sourcePage: 55,
    subjects: [
      {
        id: "midwifery",
        name: "Midwifery",
        theoryHours: 200,
        demonstrationHours: 160,
        hospitalHours: 220,
        communityHours: 160,
        sourcePage: 55,
        topics: [
          "Reproductive anatomy, conception and fetal development",
          "Antenatal assessment, care and birth preparedness",
          "Normal labour, childbirth and supportive care",
          "Postnatal care and essential newborn care",
          "Recognition of high-risk pregnancy, complications and referral",
          "Women’s health, reproductive health and family welfare",
          "Counselling, maternal-health records and midwifery casebooks",
        ],
        clinicalActivities: [
          "Supervised antenatal examinations and maternal counselling",
          "Labour-room experience, observation and supervised delivery care",
          "Postnatal, newborn and breastfeeding support",
          "Casebooks, competency records and identification of referral needs",
        ],
      },
      {
        id: "health-centre-management",
        name: "Health Centre Management",
        theoryHours: 40,
        demonstrationHours: 40,
        hospitalHours: 0,
        communityHours: 60,
        sourcePage: 71,
        topics: [
          "Organisation and functions of a sub-centre",
          "Planning clinics, meetings and community health activities",
          "Supplies, equipment, stock records and indenting",
          "National health programmes and teamwork",
          "Guidance and coordination with community health workers",
          "Health records, reports and continuing professional learning",
        ],
        clinicalActivities: [
          "Sub-centre activity plans and clinic organisation",
          "Stock maintenance, records and reports",
          "Coordination with ASHA, Anganwadi and other health workers",
          "Community health programmes and team meetings",
        ],
      },
    ],
  },
];

export const ANM_EXAMS = ANM_CURRICULUM.map((year, index) => ({
  yearId: year.yearId,
  papers: [
    ...year.subjects.map((subject) => ({
      subject: subject.name,
      type: "Theory",
      external: 75,
      internal: 25,
    })),
    ...(index === 0
      ? ["Community Health Nursing & Health Promotion", "Child Health Nursing"]
      : ["Midwifery", "Primary Health Care & Health Centre Management"]
    ).map((subject) => ({
      subject,
      type: "Practical",
      external: 100,
      internal: 100,
    })),
  ],
}));

export const ANM_INTERNSHIP = [
  { area: "Midwifery", hospital: 240, community: 240 },
  { area: "Child Health", hospital: 80, community: 160 },
  {
    area: "Community Health & Health Centre Management",
    hospital: 0,
    community: 160,
  },
] as const;
