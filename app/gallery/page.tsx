import { getGallery } from "@/lib/data";
import ComingSoon from "@/components/ui/ComingSoon";
import GalleryContent from "@/components/sections/gallery/GalleryContent";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, createPageMetadata, createPageSchema } from "@/lib/seo";

export const revalidate = 60;

const title = "ANM/GNM Classes, Students & Events Gallery";
const description =
  "See medhaup ANM/GNM live classes, student achievements, batch activities and learning events for nursing aspirants across West Bengal.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/gallery",
  keywords: [
    "medhaup gallery",
    "ANM GNM classes West Bengal",
    "ANM GNM student achievements",
  ],
});

export default async function GalleryPage() {
  const items = await getGallery();
  const schema = createPageSchema({
    type: "ImageGallery",
    path: "/gallery",
    name: `${title} | medhaup`,
    description,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Gallery", path: "/gallery" },
    ],
    mainEntity: items.map((item) => ({
      "@type": "ImageObject",
      contentUrl: item.src.startsWith("http")
        ? item.src
        : absoluteUrl(item.src),
      caption: item.caption ?? item.alt,
      description: item.alt,
    })),
  });

  if (items.length === 0) {
    return (
      <>
        <JsonLd data={schema} />
        <ComingSoon
          title="Our Gallery"
          message="Class photos and topper stories are being collected. Come back soon."
        />
      </>
    );
  }

  return (
    <main>
      <JsonLd data={schema} />
      <GalleryContent items={items} />
    </main>
  );
}
