// Topic headings and hours transcribed from the supplied medhaup syllabus PDFs.
// Full learning objectives and clinical activities remain available in the downloads.
export type GnmSubject = {
  name: string;
  hours: string;
  topics: string[];
  note?: string;
};

export type GnmCurriculum = {
  yearId: "1st" | "2nd" | "3rd";
  summary: string;
  groups: { name: string; subjects: GnmSubject[] }[];
  practical: GnmSubject[];
};

export const GNM_CURRICULUM: GnmCurriculum[] = [
  {
    yearId: "1st",
    summary:
      "Build your foundation across 12 subjects, with nursing and community-health practical components.",
    groups: [
      {
        name: "Bio Sciences",
        subjects: [
          {
            name: "Anatomy & Physiology",
            hours: "90 hours",
            topics: [
              "Anatomical terminology and organization of the human body",
              "The cell, tissues and body cavities",
              "Blood",
              "Circulatory system",
              "Lymphatic system",
              "Respiratory system",
              "Digestive system",
              "Excretory system",
              "Endocrine system",
              "Reproductive system",
              "Nervous system",
              "Sense organs",
              "Skeletal system",
              "Muscular system",
            ],
          },
          {
            name: "Microbiology",
            hours: "30 hours",
            topics: [
              "Introduction to microbiology",
              "Microorganisms",
              "Infection and transmission",
              "Immunity",
              "Control and destruction of microbes",
              "Practical microbiology",
            ],
          },
        ],
      },
      {
        name: "Behavioural Sciences",
        subjects: [
          {
            name: "Psychology",
            hours: "40 hours",
            topics: [
              "Introduction to psychology",
              "Structure of the mind",
              "Psychology of human behavior",
              "Learning, thinking, reasoning, observation and perception",
              "Personality",
              "Intelligence",
            ],
          },
          {
            name: "Sociology",
            hours: "20 hours",
            topics: [
              "Introduction to sociology",
              "Individual and society",
              "The family",
              "Society and social processes",
              "Community and culture",
            ],
          },
        ],
      },
      {
        name: "Nursing Foundations",
        subjects: [
          {
            name: "Fundamentals of Nursing",
            hours: "190 hours",
            topics: [
              "Introduction to nursing",
              "Nursing care of the patient",
              "Meeting the basic needs of a patient",
              "Assessment of patient/client",
              "Infection control",
              "Therapeutic nursing care",
              "Introduction to clinical pharmacology and medication administration",
            ],
          },
          {
            name: "First Aid",
            hours: "20 hours",
            topics: [
              "Introduction to first aid",
              "Procedures and techniques in first aid",
              "First aid in common emergencies",
              "Community emergencies and resources",
            ],
          },
        ],
      },
      {
        name: "Community Health Nursing",
        subjects: [
          {
            name: "Community Health Nursing - I",
            hours: "80 hours",
            topics: [
              "Introduction to community health",
              "Community health nursing",
              "Health assessment",
              "Epidemiology and epidemiological methods",
              "Family health nursing care",
              "Family health-care settings and home visit",
              "Referral system",
              "Records and reports",
              "Minor ailments",
            ],
          },
          {
            name: "Environmental Hygiene",
            hours: "30 hours",
            topics: [
              "Introduction",
              "Environmental factors contributing to health",
              "Community organizations for environmental health",
            ],
          },
          {
            name: "Health Education & Communication Skills",
            hours: "40 hours",
            topics: [
              "Communication skills",
              "Health education",
              "Counseling",
              "Methods and media of health education",
            ],
          },
          {
            name: "Nutrition",
            hours: "30 hours",
            topics: [
              "Introduction to nutrition",
              "Classification of food",
              "Normal dietary requirements",
              "Food preparation, preservation and storage",
              "Therapeutic diet",
              "Community nutrition",
              "Diet preparation - practical",
            ],
          },
        ],
      },
      {
        name: "General",
        subjects: [
          {
            name: "English",
            hours: "30 hours",
            topics: ["Grammar and vocabulary", "Composition", "Spoken English"],
          },
          {
            name: "Computer Education",
            hours: "15 hours (source header)",
            topics: [
              "Introduction to computers and disk operating system",
              "Microsoft Office",
              "Multimedia",
              "Internet and e-mail",
            ],
            note: "The syllabus header states 15 hours; its unit hours total 35. Both figures are retained in the PDF.",
          },
        ],
      },
    ],
    practical: [
      {
        name: "Nursing Foundations - Practical",
        hours: "880 hours: 200 lab + 680 clinical",
        topics: [
          "Admission, transfer and discharge",
          "Nursing process and care planning",
          "Communication, health teaching, reports and records",
          "Vital signs and health assessment",
          "Basic nursing care, nutrition and feeding",
          "Urinary and bowel elimination",
          "Mobility and positioning",
          "Respiratory support and emergency skills",
          "Specimens and basic tests",
          "Hot/cold therapy and supportive care",
          "Infection control and CSSD",
          "Pre- and post-operative care and wound care",
          "Medication administration",
          "Care of dying and deceased patients",
        ],
      },
      {
        name: "Community Health Nursing - I Practical",
        hours: "320 hours / 8 weeks",
        topics: [
          "Home visits and family nursing",
          "Health education",
          "Clinics, records and referral",
          "Community assessment",
          "Environmental and community exposure",
          "Nutrition assessment and meal preparation",
        ],
      },
    ],
  },
  {
    yearId: "2nd",
    summary:
      "Four core subjects bring medical-surgical, mental-health and child-health nursing into focus.",
    groups: [
      {
        name: "Medical-Surgical Nursing",
        subjects: [
          {
            name: "Medical-Surgical Nursing - I",
            hours: "120 hours (source header)",
            topics: [
              "Introduction",
              "Nursing Assessment",
              "Pathophysiological Mechanisms of Disease",
              "Altered Immune Response",
              "Fluid, Electrolyte and Acid-Base Balance",
              "Operation Theatre Techniques",
              "Management of the Surgical Patient",
              "Respiratory Disorders",
              "Gastrointestinal Disorders",
              "Metabolic, Hepatic, Biliary and Endocrine Disorders",
              "Renal and Urinary Disorders",
              "Neurological Disorders",
              "Connective Tissue and Collagen Disorders",
              "Nursing Management of the Elderly",
            ],
            note: "The syllabus header states 120 hours; its listed units total 130 hours.",
          },
          {
            name: "Medical-Surgical Nursing - II",
            hours: "120 hours (source header)",
            topics: [
              "Oncology Nursing",
              "Breast Disorders",
              "Integumentary Disorders, Burns and Plastic Surgery",
              "Ophthalmology and Ophthalmic Nursing",
              "Ear, Nose and Throat Disorders",
              "Cardiovascular, Circulatory and Hematological Disorders",
              "Communicable Diseases",
              "Sexually Transmitted Diseases",
              "Musculoskeletal Disorders",
              "Emergency Management",
              "Emergency and Disaster Nursing",
            ],
            note: "The syllabus header states 120 hours; its listed units total 118 hours.",
          },
        ],
      },
      {
        name: "Mental Health Nursing",
        subjects: [
          {
            name: "Mental Health Nursing",
            hours: "70 hours",
            topics: [
              "Introduction",
              "History of Psychiatry",
              "Mental Health Assessment",
              "Therapeutic Nurse-Patient Relationship",
              "Mental Disorders and Nursing Interventions",
              "Biopsychosocial Therapies",
              "Community Mental Health",
              "Psychiatric Emergencies and Crisis Intervention",
              "Forensic Psychiatry and Legal Aspects",
            ],
          },
        ],
      },
      {
        name: "Child Health Nursing",
        subjects: [
          {
            name: "Child Health Nursing",
            hours: "70 hours",
            topics: [
              "Introduction to Child Health",
              "Growth and Development",
              "The Sick Child and Pediatric Procedures",
              "Behavioral Disorders and Common Health Problems",
              "Congenital Disorders and Malformations",
              "Children with Various Disorders and Diseases",
              "Child Welfare Services and Legal/Ethical Aspects",
            ],
          },
        ],
      },
    ],
    practical: [
      {
        name: "Medical-Surgical Nursing - Practical",
        hours: "800 hours / 20 weeks",
        topics: [
          "General medical and surgical wards",
          "Operation theatre and ICU",
          "Geriatric nursing and oncology",
          "Dermatology and burns",
          "Ophthalmology and ENT",
          "Cardiology, ICCU, cardiothoracic and vascular care",
          "Orthopedic nursing",
          "Communicable disease and isolation ward",
          "Emergency ward and casualty",
        ],
      },
      {
        name: "Mental Health Nursing - Practical",
        hours: "320 hours / 8 weeks + 96-hour internship",
        topics: [
          "Psychiatric OPD",
          "Child guidance clinic",
          "Inpatient psychiatric ward",
          "Mental-status assessment and therapeutic communication",
          "Patient and family counseling",
        ],
      },
      {
        name: "Child Health Nursing - Practical",
        hours: "320 hours / 8 weeks + 96-hour internship",
        topics: [
          "Paediatric medicine ward",
          "Paediatric surgery ward",
          "Paediatric OPD and immunization room",
          "Well-baby and adolescent clinics",
          "Developmental and nutritional assessment",
        ],
        note: "The source index places this practical in Second Year, while the original practical page says Third Year. The supplied syllabus retains it under Second Year and flags this difference.",
      },
    ],
  },
  {
    yearId: "3rd",
    summary:
      "Part I covers midwifery, gynaecological and community-health nursing. Part II adds four theory subjects and an integrated supervised internship.",
    groups: [
      {
        name: "Part I · Midwifery & Gynaecological Nursing",
        subjects: [
          {
            name: "Midwifery",
            hours: "120 hours",
            topics: [
              "Introduction",
              "Reproductive System",
              "Embryology and Foetal Development",
              "Normal Pregnancy and Its Management",
              "Normal Labour and Its Management",
              "Management of Newborn",
              "Management of Normal Puerperium",
              "Complications During Pregnancy",
              "Management of High-Risk Labour",
              "Complications of Puerperium",
              "High-Risk and Sick Newborn",
              "Obstetric Operations",
              "Drugs Used in Obstetrics",
              "Ethical and Legal Aspects",
            ],
            note: "Midwifery and Gynaecological Nursing form a 140-hour block. The Midwifery header states 120 hours, but its listed units total 123 hours.",
          },
          {
            name: "Gynaecological Nursing",
            hours: "20 hours",
            topics: [
              "Introduction",
              "Puberty",
              "Fertility and Infertility",
              "Pelvic Infections",
              "Gynaecological Disorders",
              "Breast Disorders",
              "Menopause",
            ],
          },
        ],
      },
      {
        name: "Part I · Community Health Nursing",
        subjects: [
          {
            name: "Community Health Nursing - II",
            hours: "90 hours (source header)",
            topics: [
              "Health System in India",
              "Health Care Delivery System",
              "Health Planning in India",
              "Specialized Community Health Services",
              "National Health Problems",
              "National Health Programmes",
              "Demography and Family Welfare",
              "Health Team",
              "Health Information System",
              "Health Agencies",
            ],
            note: "The syllabus header states 90 hours; its listed units total 100 hours.",
          },
        ],
      },
      {
        name: "Part II · Internship theory",
        subjects: [
          {
            name: "Nursing Education",
            hours: "20 hours",
            topics: [
              "Introduction",
              "Teaching-Learning Process",
              "Methods of Teaching",
            ],
          },
          {
            name: "Introduction to Research and Statistics",
            hours: "30 hours",
            topics: [
              "Introduction",
              "Research Process",
              "Research Approaches and Designs",
              "Data Collection Process",
              "Analysis of Data",
              "Introduction to Statistics",
              "Utilization of Research in Nursing Practice",
            ],
          },
          {
            name: "Professional Trends & Adjustments",
            hours: "30 hours",
            topics: [
              "Nursing as a Profession",
              "Professional Ethics",
              "Personal and Professional Development",
              "Legislation in Nursing",
              "Profession and Related Organizations",
            ],
          },
          {
            name: "Nursing Administration & Ward Management",
            hours: "40 hours",
            topics: [
              "Introduction",
              "Management Process",
              "Administration of Hospital / Department / Unit / Ward",
              "Management of Equipment and Supplies",
              "Cost and Financing of Health Care",
            ],
            note: "The source numbering skips Unit III. The topics below follow the supplied syllabus without adding a missing unit.",
          },
        ],
      },
    ],
    practical: [
      {
        name: "Midwifery & Gynaecological Nursing - Practical",
        hours: "560 hours (Part I) + 384-hour internship",
        topics: [
          "Antenatal clinic and ward",
          "Labour room",
          "Operation theatre",
          "Postnatal ward",
          "NICU",
          "Family welfare clinic",
          "Gynaecology ward",
        ],
        note: "The PDF states 560 Part I hours and 384 internship hours. Its individual clinical-area durations do not reconcile with these totals; the figures are shown as printed.",
      },
      {
        name: "Community Health Nursing - II Practical",
        hours: "160 hours / 4 weeks + 288-hour internship",
        topics: [
          "Urban and rural community practice",
          "Antenatal, postnatal, family-welfare and under-five clinics",
          "Domiciliary nursing care and referrals",
          "Health teaching, camps and school-health services",
          "Primary Health Centre records and reports",
          "Family and community counseling",
        ],
      },
    ],
  },
];
