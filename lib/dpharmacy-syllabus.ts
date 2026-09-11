// Academic reference: PCI ER-2020 syllabus and Education Regulations, 2020.
// PDF page numbers below include the syllabus cover and contents pages.
export const DPHARMACY_SOURCES = {
  syllabus:
    "https://www.pci.gov.in/media/documents/14-55_ER_20__syllabus_23092021.pdf",
  regulations: "https://pci.nic.in/pdf/Education_REGULATION_2020_12022021.pdf",
} as const;

export type DPharmacySubject = {
  name: string;
  code: string;
  theoryHours: number;
  tutorialHours: number;
  practicalHours: number;
  sourcePage: number;
  topics: string[];
  practicals: string[];
  note?: string;
};

type DPharmacyYear = {
  yearId: "1st" | "2nd";
  part: string;
  summary: string;
  sourcePage: number;
  subjects: DPharmacySubject[];
};

export const DPHARMACY_CURRICULUM: DPharmacyYear[] = [
  {
    yearId: "1st",
    part: "Part I",
    summary:
      "Start with dosage forms, pharmaceutical chemistry, medicinal plants, the human body and public health. All five subjects include theory, tutorials and practical work.",
    sourcePage: 16,
    subjects: [
      {
        name: "Pharmaceutics",
        code: "ER20-11",
        theoryHours: 75,
        tutorialHours: 25,
        practicalHours: 75,
        sourcePage: 17,
        topics: [
          "Pharmacy history, careers and pharmacopoeias",
          "Packaging materials, pharmaceutical aids and preservatives",
          "Unit operations: size reduction, mixing, filtration, drying and extraction",
          "Tablets, capsules, powders and granules",
          "Oral liquids, topical preparations and sterile formulations",
          "Immunological products and their manufacture",
          "Manufacturing facilities, quality assurance, cGMP and validation",
          "Novel drug delivery systems",
        ],
        practicals: [
          "Formulation calculations, preparation, packaging and labelling of dosage forms",
          "Cosmetic preparations and tablet-manufacturing demonstrations",
          "Dosage-form quality tests, storage and administration devices",
          "Assignments and a pharmaceutical-industry visit",
        ],
      },
      {
        name: "Pharmaceutical Chemistry",
        code: "ER20-12",
        theoryHours: 75,
        tutorialHours: 25,
        practicalHours: 75,
        sourcePage: 21,
        topics: [
          "Analytical errors, pharmaceutical impurities and limit tests",
          "Volumetric and gravimetric analysis",
          "Inorganic pharmaceuticals and medicinal gases",
          "Organic nomenclature and heterocyclic compounds",
          "Chemistry of nervous-system and cardiovascular medicines",
          "Diuretics, hypoglycaemic medicines and anti-inflammatory agents",
          "Anti-infective medicines and antibiotics",
          "Antineoplastic agents; drug structures, uses, stability and storage",
        ],
        practicals: [
          "Limit tests and identification of inorganic ions",
          "Standard solutions, titration and pharmaceutical assays",
          "Organic-compound preparation and physical-property tests",
          "Purity testing and systematic qualitative analysis",
        ],
      },
      {
        name: "Pharmacognosy",
        code: "ER20-13",
        theoryHours: 75,
        tutorialHours: 25,
        practicalHours: 75,
        sourcePage: 27,
        topics: [
          "Crude-drug classification, adulteration and quality evaluation",
          "Alkaloids, glycosides, terpenoids, volatile oils, tannins and resins",
          "Sources, constituents and uses of medicinal crude drugs",
          "Plant fibres, surgical dressings and sutures",
          "Traditional medicine systems and Ayurvedic formulations",
          "Medicinal plants, economic importance and phytochemical investigation",
          "Nutraceuticals and herbs used as health foods",
          "Herbal formulations and cosmetics",
        ],
        practicals: [
          "Identification of crude drugs by external features",
          "Transverse sections and microscopic examination",
          "Physical and chemical evaluation of crude drugs",
          "Visits to a medicinal garden and traditional-medicine pharmacies",
        ],
      },
      {
        name: "Human Anatomy & Physiology",
        code: "ER20-14",
        theoryHours: 75,
        tutorialHours: 25,
        practicalHours: 75,
        sourcePage: 31,
        topics: [
          "Anatomical terminology, cells and tissues",
          "Bones, joints and skeletal muscles",
          "Blood, blood formation and the lymphatic system",
          "Cardiovascular and respiratory systems",
          "Digestive and urinary systems",
          "Nervous system and sense organs",
          "Endocrine glands and hormones",
          "Reproductive system, pregnancy and childbirth physiology",
        ],
        practicals: [
          "Microscopy, tissue slides, skeletal models and organ-system charts",
          "Blood-group, haemoglobin and blood-cell assessments",
          "Recording physiological parameters, including blood pressure",
          "Interpretation of basic physiological observations",
        ],
      },
      {
        name: "Social Pharmacy",
        code: "ER20-15",
        theoryHours: 75,
        tutorialHours: 25,
        practicalHours: 75,
        sourcePage: 35,
        topics: [
          "Public health, health indicators and pharmacists’ roles",
          "Indian health systems, policies and national health programmes",
          "Family planning, maternal and child health, and immunisation",
          "Environmental health and substance misuse",
          "Nutrition, food safety and dietary supplements",
          "Microbiology and epidemiology",
          "Communicable diseases and prevention",
          "Introduction to pharmacoeconomics",
        ],
        practicals: [
          "Health-awareness materials and simulated counselling activities",
          "Immunisation, nutrition, hygiene and family-planning activities",
          "First-aid and basic-life-support demonstrations and practice",
          "Public-health field visits and reports",
        ],
      },
    ],
  },
  {
    yearId: "2nd",
    part: "Part II",
    summary:
      "Move into drug action, patient care, community and hospital pharmacy, clinical tests and professional responsibilities. Five subjects have practicals; Pharmacy Law & Ethics has theory and tutorials only.",
    sourcePage: 40,
    subjects: [
      {
        name: "Pharmacology",
        code: "ER20-21",
        theoryHours: 75,
        tutorialHours: 25,
        practicalHours: 50,
        sourcePage: 41,
        topics: [
          "Drug administration, absorption, distribution, metabolism and excretion",
          "Mechanisms of drug action and factors affecting response",
          "Medicines acting on the peripheral and central nervous systems and eye",
          "Cardiovascular, blood, respiratory, gastrointestinal and kidney medicines",
          "Hormones and hormone antagonists",
          "Autacoids and their antagonists",
          "Antimicrobial and antineoplastic chemotherapy",
          "Biological agents",
        ],
        practicals: [
          "Experimental-pharmacology concepts and instruments",
          "Software demonstrations of drug effects and dose responses",
          "Simulated eye, nervous-system and isolated-organ experiments",
          "Interpretation and recording of simulated experimental results",
        ],
        note: "PCI specifies software simulations for these experiments; animals are not to be used for their performance or demonstration.",
      },
      {
        name: "Community Pharmacy & Management",
        code: "ER20-22",
        theoryHours: 75,
        tutorialHours: 25,
        practicalHours: 75,
        sourcePage: 47,
        topics: [
          "Community-pharmacy practice, responsibilities and standard procedures",
          "Prescription handling, dispensing, labelling and error prevention",
          "Professional communication and patient counselling",
          "Medication adherence and patient-information materials",
          "Health-screening services",
          "OTC medicines, minor ailments and responsible self-care",
          "Pharmacy setup, procurement, inventory and financial management",
          "Pharmacy software, digital health and customer relationships",
        ],
        practicals: [
          "Simulated prescription reviews, interaction checks and dispensing labels",
          "Health-screening exercises and patient-counselling role plays",
          "Demonstrations using dummy dosage forms and administration devices",
          "Pharmacy software, information leaflets and a community-pharmacy visit",
        ],
      },
      {
        name: "Biochemistry & Clinical Pathology",
        code: "ER20-23",
        theoryHours: 75,
        tutorialHours: 25,
        practicalHours: 50,
        sourcePage: 52,
        topics: [
          "Biochemical cell organisation",
          "Carbohydrates, proteins, lipids and nucleic acids",
          "Enzymes, vitamins and minerals",
          "Metabolic pathways and related disorders",
          "Biological oxidation and energy production",
          "Water and electrolyte balance",
          "Biotechnology and organ-function tests",
          "Blood and urine pathology; interpretation of laboratory findings",
        ],
        practicals: [
          "Qualitative tests for carbohydrates, proteins and lipids",
          "Urine analysis and constituent estimation",
          "Simulated blood and serum biochemical tests",
          "Starch-hydrolysis experiments and laboratory-report assignments",
        ],
      },
      {
        name: "Pharmacotherapeutics",
        code: "ER20-24",
        theoryHours: 75,
        tutorialHours: 25,
        practicalHours: 25,
        sourcePage: 56,
        topics: [
          "Rational medicine use, evidence-based care and treatment guidelines",
          "Cardiovascular, respiratory and endocrine disorders",
          "Neurological and psychiatric disorders",
          "Gastrointestinal and haematological disorders",
          "Infectious diseases and antimicrobial resistance",
          "Musculoskeletal and dermatological conditions",
          "Eye conditions",
          "Women’s health",
        ],
        practicals: [
          "Preparation and discussion of SOAP clinical notes for at least six cases",
          "Simulated patient counselling on disease, medicines and monitoring",
          "Case-based discussions of lifestyle and medicine-administration needs",
        ],
      },
      {
        name: "Hospital & Clinical Pharmacy",
        code: "ER20-25",
        theoryHours: 75,
        tutorialHours: 25,
        practicalHours: 25,
        sourcePage: 60,
        topics: [
          "Hospital-pharmacy organisation, standards, committees and formularies",
          "Procurement, inventory, cold chain and drug distribution",
          "Hospital compounding, IV admixtures and radiopharmaceuticals",
          "Hospital software and electronic health records",
          "Clinical-pharmacy services and pharmaceutical care",
          "Laboratory-test interpretation and drug-therapy monitoring",
          "Drug and poison information services",
          "Pharmacovigilance, medication errors and drug interactions",
        ],
        practicals: [
          "Drug-information queries and clinical laboratory-report interpretation",
          "Adverse-drug-reaction reporting and causality assessment",
          "Medical and surgical device demonstrations",
          "Interaction reviews, pharmacy visits and reports",
        ],
      },
      {
        name: "Pharmacy Law & Ethics",
        code: "ER20-26",
        theoryHours: 75,
        tutorialHours: 25,
        practicalHours: 0,
        sourcePage: 65,
        topics: [
          "Pharmacy Act, education and practice regulations, and pharmacist registration",
          "Drugs and Cosmetics Act and Rules: schedules, licensing and records",
          "NDPS, drug advertising, poisons and animal-welfare legislation",
          "Food safety, pharmaceutical pricing and essential medicines",
          "Professional ethics, bioethics and regulatory bodies",
          "Drug development, clinical trials, patents and intellectual property",
          "Medical termination of pregnancy, blood banks and clinical establishments",
          "Biomedical waste, consumer protection, disaster management and medical devices",
        ],
        practicals: [],
        note: "This subject has no practical paper. The topics summarise the ER-2020 syllabus; study applicable amendments alongside your examining authority’s guidance.",
      },
    ],
  },
];

export function getDPharmacyTotals(subjects: DPharmacySubject[]) {
  return subjects.reduce(
    (total, subject) => ({
      theoryHours: total.theoryHours + subject.theoryHours,
      practicalHours: total.practicalHours + subject.practicalHours,
      tutorialHours: total.tutorialHours + subject.tutorialHours,
      theoryMarks: total.theoryMarks + 100,
      practicalMarks:
        total.practicalMarks + (subject.practicalHours > 0 ? 100 : 0),
    }),
    {
      theoryHours: 0,
      practicalHours: 0,
      tutorialHours: 0,
      theoryMarks: 0,
      practicalMarks: 0,
    },
  );
}
