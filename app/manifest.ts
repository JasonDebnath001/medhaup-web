import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "medhaup — ANM/GNM Preparation",
    short_name: "medhaup",
    description:
      "Bilingual preparation and study resources for the WBJEEB ANM(R) & GNM entrance examination.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffaf3",
    theme_color: "#1a0c70",
    lang: "en-IN",
    categories: ["education"],
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
