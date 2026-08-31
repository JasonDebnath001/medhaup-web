import { getTrustedCoursePricingContext } from "@/lib/coursePricing";

export const COURSE_SUBJECTS = [
  {
    name: "Life Science",
    approximateQuestions: 25,
    summary:
      "Human physiology, plant and animal biology, health, and disease; the highest-weightage area shown on the course page.",
  },
  {
    name: "Physical Science",
    approximateQuestions: 20,
    summary:
      "Physics and chemistry fundamentals from the West Bengal board syllabus, focused on concepts rather than derivations.",
  },
  {
    name: "Mathematics",
    approximateQuestions: 15,
    summary:
      "Arithmetic and basic mathematics where speed and accuracy matter more than advanced theory.",
  },
  {
    name: "Basic English",
    approximateQuestions: 15,
    summary:
      "Grammar, vocabulary, and comprehension; the course page says this section appears in English only.",
  },
  {
    name: "General Knowledge",
    approximateQuestions: 13,
    summary:
      "Static general knowledge, awareness, and current-affairs preparation.",
  },
  {
    name: "Logical Reasoning",
    approximateQuestions: 12,
    summary:
      "Patterns, series, and reasoning practice; the course page says this section appears in English only.",
  },
] as const;

export function getTrustedCourseFacts() {
  return [
    "medhaup's current listed program is a 12-month, 100% online preparation course for the WBJEEB ANM(R) and GNM Common Entrance Test in West Bengal, targeting the 2027 cycle.",
    "Teaching and learning support are available in Bengali and English.",
    getTrustedCoursePricingContext(),
    "One enrolment includes live interactive classes, recordings of every class, bilingual chapter-wise notes, exam-pattern mock tests, previous-year-question solutions, and doubt support throughout the course.",
    "If a student misses a live class, the listed course includes a recording to rewatch during the course period.",
    "Admission can be started from /admission through the medhaup app or by requesting a callback. App users pay inside the app. The website itself does not collect payment. Callback requests are normally answered by call or WhatsApp within 24 hours, and the fee is confirmed before payment.",
    "Arushi is identified on medhaup as the founder and lead instructor with more than eight years of teaching experience and a particular focus on explaining Biology. Do not infer any other teacher details.",
    "Useful medhaup routes are /course for full course details, /admission for enrolment, /syllabus for the subject breakdown, /pyq for previous-year papers, /current-affairs for current-affairs material, /resources for free materials, and /blogs for preparation articles.",
    "medhaup is an independent preparation platform, not WBJEEB. Current eligibility, exam dates, paper rules, applications, and counselling rules must be verified from the official WBJEEB ANM/GNM page: https://wbjeeb.nic.in/anm-gnm/.",
    "The question distribution shown by medhaup is approximate and must be checked against the current official WBJEEB bulletin.",
  ];
}
