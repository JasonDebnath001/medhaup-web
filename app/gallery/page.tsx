import type { Metadata } from "next";
import { getGallery } from "@/lib/data";
import ComingSoon from "@/components/ui/ComingSoon";
import GalleryContent from "@/components/sections/gallery/GalleryContent";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Gallery — Classes, Toppers & Events | medhaup",
  description:
    "Inside medhaup — live classes, our ANM/GNM rank holders, and batch events across West Bengal.",
};

export default async function GalleryPage() {
  const items = await getGallery();

  if (items.length === 0) {
    return (
      <ComingSoon
        title="Our Gallery"
        message="Class photos and topper stories are being collected. Come back soon."
      />
    );
  }

  return (
    <main>
      <GalleryContent items={items} />
    </main>
  );
}