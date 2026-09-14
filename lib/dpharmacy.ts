export const DPHARMACY_PATH = "/d-pharmacy";
export const DPHARMACY_NAME = "D.Pharmacy 1st & 2nd Year Course";
export const DPHARMACY_DESCRIPTION =
  "Explore D.Pharmacy 1st and 2nd year subjects, PCI ER-2020 syllabus, exam marks and practical training.";

export const DPHARMACY_YEARS = [
  {
    id: "1st",
    number: "01",
    label: "1st year",
    title: "Build your foundation.",
    description:
      "Five subjects introduce you to medicines, dosage forms, the human body and public health, with practical work in every subject.",
    surface: "bg-[#ede9fb]",
    accent: "text-navy",
  },
  {
    id: "2nd",
    number: "02",
    label: "2nd year",
    title: "Take your learning forward.",
    description:
      "Six subjects connect drug action with patient care, pharmacy practice and professional ethics, including five practical papers.",
    surface: "bg-[#fff0e4]",
    accent: "text-[#a6440e]",
  },
] as const;

export const DPHARMACY_FAQS = [
  {
    question: "Who is this course for?",
    answer:
      "This medhaup course is for students studying Diploma in Pharmacy (D.Pharmacy) in their 1st or 2nd year. Select your year when enquiring about enrolment.",
  },
  {
    question: "How can I join the course?",
    answer:
      "Contact our team on WhatsApp for current fees, batch timings, class details and enrolment steps.",
  },
  {
    question: "What are the fees and class timings?",
    answer:
      "Contact our team on WhatsApp for current fees, batch timings, class format and teaching language before enrolling.",
  },
  {
    question: "Where can I find the year-wise syllabus?",
    answer:
      "Both years’ subjects, topic summaries, practical activities and academic hours are available in the syllabus section above, based on PCI’s ER-2020 curriculum. You can also open the official syllabus PDF. Contact our team for medhaup study materials and the teaching schedule.",
  },
  {
    question: "How many marks are there in each year?",
    answer:
      "Under PCI ER-2020, 1st year carries 1,000 marks: 500 theory and 500 practical. 2nd year carries 1,100 marks: 600 theory and 500 practical. Each theory or practical paper has 80 final-exam marks and 20 internal-assessment marks. Pharmacy Law & Ethics has no practical paper.",
  },
  {
    question: "Is practical training part of D.Pharmacy?",
    answer:
      "Yes. PCI ER-2020 includes Part III practical training of at least 500 hours over at least three months, with at least 250 hours spent dispensing prescriptions. It is additional to the academic practical classes. Students become eligible after appearing in the Part II examination and arrange training through their institution under the prescribed conditions.",
  },
] as const;
