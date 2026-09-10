import type { Metadata } from "next";
import NorcetHero from "@/components/sections/norcet/NorcetHero";
import NorcetStakes from "@/components/sections/norcet/NorcetStakes";
import NorcetPattern from "@/components/sections/norcet/NorcetPattern";
import NorcetSubjects from "@/components/sections/norcet/NorcetSubjects";
import NorcetSyllabus from "@/components/sections/norcet/NorcetSyllabus";
import NorcetEligibility from "@/components/sections/norcet/NorcetEligibility";
import NorcetCoursePlan from "@/components/sections/norcet/NorcetCoursePlan";
import NorcetResources from "@/components/sections/norcet/NorcetResources";
import NorcetWaitlist from "@/components/sections/norcet/NorcetWaitlist";
import NorcetFaq from "@/components/sections/norcet/NorcetFaq";
import JsonLd from "@/components/seo/JsonLd";
import { getNorcetResources } from "@/lib/data";
import {
  NORCET,
  NORCET_COURSE,
  NORCET_FAQS,
  NORCET_PATH,
  NORCET_SEO_KEYWORDS,
  NORCET_SUBJECTS,
} from "@/lib/norcet";
import {
  absoluteUrl,
  createPageMetadata,
  createPageSchema,
  SITE_URL,
} from "@/lib/seo";

export const revalidate = 60;

const title = "NORCET Syllabus, Exam Pattern & Subjects | medhaup";
const description =
  "Everything about AIIMS NORCET: the two-stage exam pattern, marking scheme, subject-wise weightage, full syllabus and eligibility. medhaup's Bengali + English NORCET course is coming soon. Join the free waitlist.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: NORCET_PATH,
  keywords: NORCET_SEO_KEYWORDS,
  image: "/norcet/opengraph-image",
  imageAlt: "NORCET syllabus, exam pattern and subjects on medhaup",
  absoluteTitle: true,
});

export default async function NorcetPage() {
  const resources = await getNorcetResources();
  const syllabusDownload =
    resources.find((resource) => resource.category === "Syllabus") ?? null;

  const pageUrl = absoluteUrl(NORCET_PATH);
  const schema = createPageSchema({
    path: NORCET_PATH,
    name: title,
    description,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Courses", path: "/course" },
      { name: "NORCET", path: NORCET_PATH },
    ],
    mainEntity: {
      "@type": "Course",
      "@id": `${pageUrl}#course`,
      name: NORCET_COURSE.name,
      alternateName: [
        "NORCET Preparation Course",
        "AIIMS Nursing Officer Exam Coaching",
      ],
      url: pageUrl,
      description:
        "A Bengali + English preparation course for the AIIMS NORCET Nursing Officer recruitment exam, launching soon on medhaup.",
      provider: { "@id": `${SITE_URL}/#organization` },
      availableLanguage: ["Bengali", "English"],
      inLanguage: ["bn-IN", "en-IN"],
      educationalLevel:
        "AIIMS NORCET Nursing Officer recruitment examination preparation",
      teaches: NORCET_SUBJECTS.map((subject) => subject.name),
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
        audienceType:
          "GNM and B.Sc Nursing students and graduates preparing for NORCET",
      },
      about: {
        "@type": "Thing",
        name: NORCET.fullName,
        sameAs: NORCET.officialUrl,
      },
    },
    extraEntities: [
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: NORCET_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  });

  return (
    <main>
      <JsonLd data={schema} />
      <NorcetHero />
      <NorcetStakes />
      <NorcetPattern />
      <NorcetSubjects />
      <NorcetSyllabus syllabusDownload={syllabusDownload} />
      <NorcetEligibility />
      <NorcetCoursePlan />
      <NorcetResources resources={resources} />
      <NorcetWaitlist />
      <NorcetFaq />
    </main>
  );
}
