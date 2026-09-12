import JsonLd from "@/components/seo/JsonLd";
import { createPageMetadata, createPageSchema, SITE_URL } from "@/lib/seo";
import type { NursingEntranceCourse } from "@/lib/nursing-entrance";
import NursingEntrancePageContent from "./NursingEntrancePageContent";

export function nursingEntranceMetadata(course: NursingEntranceCourse) {
  return createPageMetadata({
    title: `${course.name} Preparation Course | Coming Soon`,
    description: course.description,
    path: course.path,
    keywords: [
      course.name,
      `${course.name} preparation`,
      `${course.name} subjects and syllabus`,
      `${course.name} exam pattern`,
      `${course.degree} entrance`,
      `WBJEEB ${course.name}`,
      `medhaup ${course.name} course`,
    ],
    image: `${course.path}/opengraph-image`,
    imageAlt: `${course.name} preparation for ${course.degree} entrance coming soon to medhaup`,
  });
}

export default function NursingEntrancePage({
  course,
}: {
  course: NursingEntranceCourse;
}) {
  const name = `${course.name} Preparation Course`;
  const schema = createPageSchema({
    path: course.path,
    name,
    description: course.description,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: `${course.name} Preparation`, path: course.path },
    ],
    mainEntity: {
      "@type": "Course",
      name,
      description: course.description,
      url: `${SITE_URL}${course.path}`,
      provider: { "@id": `${SITE_URL}/#organization` },
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
        audienceType: `${course.degree} entrance aspirants`,
      },
    },
    extraEntities: [
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}${course.path}#faq`,
        mainEntity: course.faqs.map((faq) => ({
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
      <NursingEntrancePageContent key={course.id} course={course} />
    </main>
  );
}
