import { getBatches } from "@/lib/data";
import AdmissionPageContent from "@/components/sections/admission/AdmissionPageContent";
import JsonLd from "@/components/seo/JsonLd";
import { createPageMetadata, createPageSchema } from "@/lib/seo";

export const revalidate = 60;

const title = "ANM/GNM 2027 Course Admission";
const description =
  "Apply for medhaup's 12-month ANM/GNM 2027 online course. Get Bengali and English live classes, recordings, notes, mock tests, PYQs and EMI support.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/admission",
  keywords: [
    "ANM GNM 2027 admission",
    "ANM GNM online course admission",
    "ANM GNM course fees",
  ],
});

export default async function AdmissionPage() {
  const batches = await getBatches();
  const batch = batches[0] ?? null;
  const schema = createPageSchema({
    path: "/admission",
    name: `${title} | medhaup`,
    description,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Course", path: "/course" },
      { name: "Admission", path: "/admission" },
    ],
    mainEntity: {
      "@type": "Course",
      "@id": "https://medhaup.com/course#course",
      name: "ANM GNM 2027 Online Course",
      provider: { "@id": "https://medhaup.com/#organization" },
      hasCourseInstance: {
        "@type": "CourseInstance",
        name: batch?.name ?? "medhaup ANM GNM 2027 Online Batch",
        courseMode: "Online",
        inLanguage: ["Bengali", "English"],
        ...(batch?.startDate ? { startDate: batch.startDate } : {}),
      },
    },
  });

  return (
    <main>
      <JsonLd data={schema} />
      <AdmissionPageContent batch={batch} />
    </main>
  );
}
