import { notFound } from "next/navigation";
import { getCollection } from "@/lib/admin/collections";
import CollectionManager from "@/lib/admin/CollectionManager";
import SuccessPhotosManager from "@/lib/admin/SuccessPhotosManager";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const config = getCollection(collection);
  if (!config) notFound();
  if (config.manager === "success-photos") return <SuccessPhotosManager />;
  return <CollectionManager collection={config} />;
}
