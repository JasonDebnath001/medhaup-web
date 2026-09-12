import JenpasPageContent from "@/components/sections/jenpas/JenpasPageContent";
import JsonLd from "@/components/seo/JsonLd";
import {
  JENPAS_DESCRIPTION,
  JENPAS_FAQS,
  JENPAS_NAME,
  JENPAS_PATH,
} from "@/lib/jenpas";
import { createPageMetadata, createPageSchema, SITE_URL } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: `${JENPAS_NAME} | Coming Soon`,
  description: JENPAS_DESCRIPTION,
  path: JENPAS_PATH,
  keywords: [
    "JENPAS UG preparation",
    "JENPAS(UG) course",
    "WBJEEB nursing entrance",
    "JENPAS Paper I",
    "JENPAS Paper II BHA",
    "JENPAS Health Aptitude syllabus",
    "JENPAS exam pattern",
    "medhaup JENPAS course",
  ],
  image: "/jenpas-ug/opengraph-image",
  imageAlt: "JENPAS(UG) preparation course coming soon to medhaup",
});

export default function JenpasPage() {
  const schema = createPageSchema({
    path: JENPAS_PATH,
    name: JENPAS_NAME,
    description: JENPAS_DESCRIPTION,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "JENPAS(UG) Preparation", path: JENPAS_PATH },
    ],
    mainEntity: {
      "@type": "Course",
      name: JENPAS_NAME,
      description: JENPAS_DESCRIPTION,
      url: `${SITE_URL}${JENPAS_PATH}`,
      provider: { "@id": `${SITE_URL}/#organization` },
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
        audienceType:
          "JENPAS(UG) nursing, allied health and BHA entrance aspirants",
      },
    },
    extraEntities: [
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}${JENPAS_PATH}#faq`,
        mainEntity: JENPAS_FAQS.map((faq) => ({
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
      <JenpasPageContent />
    </main>
  );
}
