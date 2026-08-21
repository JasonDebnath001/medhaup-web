import { getProducts } from "@/lib/data";
import ComingSoon from "@/components/ui/ComingSoon";
import StoreContent from "@/components/sections/store/StoreContent";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, createPageMetadata, createPageSchema } from "@/lib/seo";

export const revalidate = 60;

const title = "ANM/GNM Books, Notes & Mock Test Store";
const description =
  "Shop medhaup ANM/GNM preparation books, printed chapter notes and mock test series. Order study materials for delivery across West Bengal.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/store",
  keywords: [
    "ANM GNM books",
    "ANM GNM printed notes",
    "ANM GNM mock test series",
    "ANM GNM study material store",
  ],
});

export default async function StorePage() {
  const products = await getProducts();
  const schema = createPageSchema({
    type: "CollectionPage",
    path: "/store",
    name: `${title} | medhaup`,
    description,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Store", path: "/store" },
    ],
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.title,
          description: product.description,
          category: product.category,
          image: product.image.startsWith("http")
            ? product.image
            : absoluteUrl(product.image),
          brand: { "@id": "https://medhaup.com/#organization" },
          offers: {
            "@type": "Offer",
            url: absoluteUrl("/store"),
            priceCurrency: "INR",
            price: product.price,
            availability: product.inStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        },
      })),
    },
  });

  if (products.length === 0) {
    return (
      <>
        <JsonLd data={schema} />
        <ComingSoon
          title="The medhaup Store"
          message="Books, printed notes and test series are being stocked right now. Message us on WhatsApp and we'll tell you the moment they're available."
        />
      </>
    );
  }

  return (
    <main>
      <JsonLd data={schema} />
      <StoreContent products={products} />
    </main>
  );
}
