import RrbPageContent from "@/components/sections/rrb/RrbPageContent";
import JsonLd from "@/components/seo/JsonLd";
import {
  RRB_DESCRIPTION,
  RRB_FAQS,
  RRB_NAME,
  RRB_PATH,
  RRB_NURSING_SYLLABUS,
} from "@/lib/rrb";
import { createPageMetadata, createPageSchema, SITE_URL } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: RRB_NAME,
  description: RRB_DESCRIPTION,
  path: RRB_PATH,
  keywords: [
    "RRB Nursing course",
    "RRB Nursing Superintendent",
    "RRB Staff Nurse preparation",
    "RRB Nursing syllabus",
    "RRB Nursing subjects",
    "RRB Nursing exam pattern",
    "Railway nursing preparation",
  ],
  image: `${RRB_PATH}/opengraph-image`,
  imageAlt: "RRB Nursing preparation at medhaup",
});

export default function RrbPage() {
  const schema = createPageSchema({
    path: RRB_PATH,
    name: RRB_NAME,
    description: RRB_DESCRIPTION,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "RRB Nursing", path: RRB_PATH },
    ],
    mainEntity: {
      "@type": "Course",
      name: RRB_NAME,
      description: RRB_DESCRIPTION,
      url: `${SITE_URL}${RRB_PATH}`,
      provider: { "@id": `${SITE_URL}/#organization` },
      teaches: RRB_NURSING_SYLLABUS.flatMap((group) => [...group.subjects]),
    },
    extraEntities: [
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}${RRB_PATH}#faq`,
        mainEntity: RRB_FAQS.map((faq) => ({
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
      <RrbPageContent />
    </main>
  );
}
