/* ----------------------------------------------------------------
   GALLERY — photos of classes, toppers, events.
   Use ImageKit URLs (already whitelisted in next.config.ts) or
   drop files into /public/gallery/.
----------------------------------------------------------------- */
export type GalleryCategory = "Classes" | "Toppers" | "Events";

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
  src: string;
  alt: string;
  caption?: string;
  /** aspect hint for the masonry grid: "tall" | "wide" | "square" */
  aspect?: "tall" | "wide" | "square";
};

export const GALLERY_CATEGORIES: {
  label: string;
  value: GalleryCategory | "All";
}[] = [
  { label: "All", value: "All" },
  { label: "Classes", value: "Classes" },
  { label: "Our Toppers", value: "Toppers" },
  { label: "Events", value: "Events" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "class-1",
    category: "Classes",
    src: "/gallery/live-class-1.jpg",
    alt: "Live Biology class in progress",
    caption: "Live Biology class — Volume 1.0 batch",
    aspect: "wide",
  },
  {
    id: "topper-1",
    category: "Toppers",
    src: "/gallery/topper-1.jpg",
    alt: "MedhaUp student who cleared ANM/GNM 2025",
    caption: "Our 2025 rank holder",
    aspect: "tall",
  },
  {
    id: "event-1",
    category: "Events",
    src: "/gallery/orientation-2026.jpg",
    alt: "Batch orientation session 2026",
    caption: "Orientation day — August 2026",
    aspect: "square",
  },
];
