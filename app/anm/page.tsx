import AnmPageContent from "@/components/sections/anm/AnmPageContent";
import JsonLd from "@/components/seo/JsonLd";
import { ANM_DESCRIPTION, ANM_FAQS, ANM_NAME, ANM_PATH } from "@/lib/anm";
import { createPageMetadata, createPageSchema, SITE_URL } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: `${ANM_NAME}`,
  description: ANM_DESCRIPTION,
  path: ANM_PATH,
  keywords: [
    "ANM 1st year course",
    "ANM 2nd year course",
    "Auxiliary Nursing and Midwifery course",
    "ANM course",
    "ANM subjects",
    "ANM nursing syllabus",
    "ANM exam pattern",
    "medhaup nursing course",
  ],
  image: "/anm/opengraph-image",
  imageAlt: "ANM 1st and 2nd year course available at medhaup",
});

export default function AnmPage() {
  const schema = createPageSchema({
    path: ANM_PATH,
    name: ANM_NAME,
    description: ANM_DESCRIPTION,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "ANM Year-wise Course", path: ANM_PATH },
    ],
    mainEntity: {
      "@type": "Course",
      name: ANM_NAME,
      description: ANM_DESCRIPTION,
      url: `${SITE_URL}${ANM_PATH}`,
      provider: { "@id": `${SITE_URL}/#organization` },
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
        audienceType: "ANM 1st and 2nd year students",
      },
    },
    extraEntities: [
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}${ANM_PATH}#faq`,
        mainEntity: ANM_FAQS.map((faq) => ({
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
      <AnmPageContent />
    </main>
  );
}
