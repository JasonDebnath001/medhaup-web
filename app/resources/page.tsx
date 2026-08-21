import { getResources } from "@/lib/data";
import ComingSoon from "@/components/ui/ComingSoon";
import ResourcesHero from "@/components/sections/resources/ResourcesHero";
import ResourceGrid from "@/components/sections/resources/ResourceGrid";
import CourseCTA from "@/components/sections/resources/CourseCTA";
import WhatsAppStrip from "@/components/sections/resources/WhatsappStrip";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, createPageMetadata, createPageSchema } from "@/lib/seo";

export const revalidate = 60;

const title = "Free ANM/GNM Study Materials & PDF Resources";
const description =
  "Download free WBJEEB ANM/GNM syllabus PDFs, previous year papers, chapter notes and mock tests. No login or payment required.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/resources",
  keywords: [
    "free ANM GNM study material",
    "ANM GNM notes PDF",
    "ANM GNM mock test PDF",
    "WBJEEB nursing resources",
  ],
});

export default async function ResourcesPage() {
  const resources = await getResources();
  const schema = createPageSchema({
    type: "CollectionPage",
    path: "/resources",
    name: `${title} | medhaup`,
    description,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Study Material", path: "/resources" },
    ],
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: resources.length,
      itemListElement: resources.map((resource, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "LearningResource",
          name: resource.title,
          description: resource.description,
          learningResourceType: resource.category,
          inLanguage: resource.language,
          url: resource.fileUrl.startsWith("http")
            ? resource.fileUrl
            : absoluteUrl(resource.fileUrl),
          isAccessibleForFree: true,
          provider: { "@id": "https://medhaup.com/#organization" },
        },
      })),
    },
  });

  if (resources.length === 0) {
    return (
      <>
        <JsonLd data={schema} />
        <ComingSoon
          title="Free Resources"
          message="Free notes, mock tests and guides are being uploaded. Join our WhatsApp channel — new resources drop there first."
        />
      </>
    );
  }

  return (
    <main>
      <JsonLd data={schema} />
      <ResourcesHero />
      <ResourceGrid resources={resources} />
      <WhatsAppStrip />
      <CourseCTA />
    </main>
  );
}
