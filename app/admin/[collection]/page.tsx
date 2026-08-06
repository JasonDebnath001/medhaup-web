import { notFound } from "next/navigation";
import { getCollection } from "@/lib/admin/collections";
import CollectionManager from "@/lib/admin/CollectionManager";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const config = getCollection(collection);
  if (!config) notFound();
  return <CollectionManager collection={config} />;
}