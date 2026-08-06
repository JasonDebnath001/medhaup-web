/* ----------------------------------------------------------------
   STORE — products (books, printed notes, test series).
   Later: this array will be fetched from the admin panel DB.
   Buying happens via WhatsApp prefill (no payment gateway on web).
----------------------------------------------------------------- */
import { SITE } from "./site";

export type ProductCategory =
  | "Books"
  | "Printed Notes"
  | "Test Series"
  | "Combo";

export type Product = {
  id: string;
  category: ProductCategory;
  title: string;
  description: string;
  price: number; // in ₹
  mrp?: number; // strike-through price, optional
  image: string; // path inside /public or ImageKit URL
  language: "Bengali" | "English" | "Bengali + English";
  inStock: boolean;
  isNew?: boolean;
};

export const PRODUCT_CATEGORIES: {
  label: string;
  value: ProductCategory | "All";
}[] = [
  { label: "All", value: "All" },
  { label: "Books", value: "Books" },
  { label: "Printed Notes", value: "Printed Notes" },
  { label: "Test Series", value: "Test Series" },
  { label: "Combos", value: "Combo" },
];

export const PRODUCTS: Product[] = [
  {
    id: "complete-guidebook",
    category: "Books",
    title: "ANM/GNM Complete Guidebook 2027",
    description:
      "All 6 subjects in one book — theory, solved examples and 2,000+ practice MCQs mapped to the WBJEEB pattern.",
    price: 449,
    mrp: 599,
    image: "/store/complete-guidebook.png",
    language: "Bengali + English",
    inStock: true,
    isNew: true,
  },
  {
    id: "biology-printed-notes",
    category: "Printed Notes",
    title: "Biology Printed Notes (Full Course)",
    description:
      "The exact chapter notes we teach from — printed, spiral-bound and delivered to your door.",
    price: 299,
    image: "/store/biology-notes.png",
    language: "Bengali + English",
    inStock: true,
  },
  {
    id: "mock-test-series-20",
    category: "Test Series",
    title: "20 Full Mock Tests (Printed)",
    description:
      "20 full-length papers on the real 100-question pattern, with answer keys and difficulty tags.",
    price: 349,
    mrp: 450,
    image: "/store/mock-series.png",
    language: "Bengali + English",
    inStock: true,
  },
];

export function buyOnWhatsApp(product: Product) {
  return `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(
    `Hi, I want to buy "${product.title}" (₹${product.price}) from the MedhaUp store.`,
  )}`;
}
