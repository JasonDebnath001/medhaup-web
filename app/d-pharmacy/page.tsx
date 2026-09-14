import DPharmacyPageContent from "@/components/sections/dpharmacy/DPharmacyPageContent";
import JsonLd from "@/components/seo/JsonLd";
import {
  DPHARMACY_DESCRIPTION,
  DPHARMACY_FAQS,
  DPHARMACY_NAME,
  DPHARMACY_PATH,
} from "@/lib/dpharmacy";
import { createPageMetadata, createPageSchema, SITE_URL } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: `${DPHARMACY_NAME}`,
  description: DPHARMACY_DESCRIPTION,
  path: DPHARMACY_PATH,
  keywords: [
    "D.Pharmacy 1st year course",
    "D.Pharmacy 2nd year course",
    "Diploma in Pharmacy course",
    "D.Pharm course",
    "D.Pharmacy subjects",
    "D.Pharmacy ER-2020 syllabus",
    "D.Pharmacy exam pattern",
    "medhaup pharmacy course",
  ],
  image: "/d-pharmacy/opengraph-image",
  imageAlt: "D.Pharmacy 1st and 2nd year course available at medhaup",
});

export default function DPharmacyPage() {
  const schema = createPageSchema({
    path: DPHARMACY_PATH,
    name: DPHARMACY_NAME,
    description: DPHARMACY_DESCRIPTION,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "D.Pharmacy Year-wise Course", path: DPHARMACY_PATH },
    ],
    mainEntity: {
      "@type": "Course",
      name: DPHARMACY_NAME,
      description: DPHARMACY_DESCRIPTION,
      url: `${SITE_URL}${DPHARMACY_PATH}`,
      provider: { "@id": `${SITE_URL}/#organization` },
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
        audienceType: "D.Pharmacy 1st and 2nd year students",
      },
    },
    extraEntities: [
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}${DPHARMACY_PATH}#faq`,
        mainEntity: DPHARMACY_FAQS.map((faq) => ({
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
      <DPharmacyPageContent />
    </main>
  );
}
