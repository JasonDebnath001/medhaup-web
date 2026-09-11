import GnmPageContent from "@/components/sections/gnm/GnmPageContent";
import JsonLd from "@/components/seo/JsonLd";
import { GNM_DESCRIPTION, GNM_FAQS, GNM_NAME, GNM_PATH } from "@/lib/gnm";
import { createPageMetadata, createPageSchema, SITE_URL } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: `${GNM_NAME} | Coming Soon`,
  description: GNM_DESCRIPTION,
  path: GNM_PATH,
  keywords: [
    "GNM 1st year course",
    "GNM 2nd year course",
    "GNM 3rd year course",
    "GNM nursing course",
    "GNM year-wise syllabus PDF",
    "GNM 1st year exam pattern 500 marks",
    "GNM 2nd year subjects",
    "GNM 3rd year internship",
  ],
  image: "/gnm/opengraph-image",
  imageAlt: "GNM 1st, 2nd and 3rd year courses coming soon to medhaup",
});

export default function GnmPage() {
  const schema = createPageSchema({
    path: GNM_PATH,
    name: GNM_NAME,
    description: GNM_DESCRIPTION,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "GNM Year-wise Course", path: GNM_PATH },
    ],
    mainEntity: {
      "@type": "Course",
      name: GNM_NAME,
      description: GNM_DESCRIPTION,
      url: `${SITE_URL}${GNM_PATH}`,
      provider: { "@id": `${SITE_URL}/#organization` },
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
        audienceType: "GNM 1st, 2nd and 3rd year students",
      },
    },
    extraEntities: [
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}${GNM_PATH}#faq`,
        mainEntity: GNM_FAQS.map((faq) => ({
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
      <GnmPageContent />
    </main>
  );
}
