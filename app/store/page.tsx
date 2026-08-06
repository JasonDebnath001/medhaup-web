import type { Metadata } from "next";
import { getProducts } from "@/lib/data";
import ComingSoon from "@/components/ui/ComingSoon";
import StoreContent from "@/components/sections/store/StoreContent";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Store — Books, Printed Notes & Test Series | MedhaUp",
  description:
    "Buy MedhaUp study material for WBJEE ANM/GNM CET — guidebooks, printed chapter notes and full-length mock test series. Order on WhatsApp, delivered across West Bengal.",
};

export default async function StorePage() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <ComingSoon
        title="The MedhaUp Store"
        message="Books, printed notes and test series are being stocked right now. Message us on WhatsApp and we'll tell you the moment they're available."
      />
    );
  }

  return (
    <main>
      <StoreContent products={products} />
    </main>
  );
}