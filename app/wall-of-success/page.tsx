import JsonLd from "@/components/seo/JsonLd";
import SuccessWall from "@/components/sections/success/SuccessWall";
import { getSuccessPhotos } from "@/lib/data";
import { createPageMetadata, createPageSchema } from "@/lib/seo";
import { SUCCESS_STORIES } from "@/lib/successStories";

const title = "Wall of Success — Student Achievements";
const description =
  "Celebrate medhaup students and the learning journeys behind their proud academic achievements.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/wall-of-success",
  keywords: [
    "medhaup success stories",
    "student achievement gallery",
    "student success photos",
    "student results West Bengal",
  ],
});

export const revalidate = 0;

export default async function WallOfSuccessPage() {
  const uploadedPhotos = await getSuccessPhotos();
  const stories = uploadedPhotos.length > 0 ? uploadedPhotos : SUCCESS_STORIES;
  const schema = createPageSchema({
    type: "CollectionPage",
    path: "/wall-of-success",
    name: `${title} | medhaup`,
    description,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Wall of Success", path: "/wall-of-success" },
    ],
    mainEntity: {
      "@type": "ItemList",
      name: "medhaup student success stories",
      numberOfItems: stories.length,
    },
  });

  return (
    <>
      <JsonLd data={schema} />
      <SuccessWall stories={stories} />
    </>
  );
}
