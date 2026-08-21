import AboutPageContent from "@/components/sections/about/AboutPageContent";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, createPageMetadata, createPageSchema } from "@/lib/seo";

const title = "About Our ANM/GNM Coaching Team";
const description =
  "Meet Arushi, the founder and lead instructor behind medhaup's focused, bilingual and affordable ANM/GNM entrance preparation for West Bengal students.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/about",
  keywords: [
    "about medhaup",
    "ANM GNM teacher West Bengal",
    "ANM GNM coaching faculty",
  ],
});

const schema = createPageSchema({
  type: "AboutPage",
  path: "/about",
  name: `${title} | medhaup`,
  description,
  image: "/arushi.png",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ],
  mainEntity: {
    "@type": "Person",
    "@id": `${absoluteUrl("/about")}#founder`,
    name: "Arushi",
    jobTitle: "Founder and Lead Instructor",
    description:
      "Founder of medhaup with more than eight years of teaching experience.",
    image:
      "https://ik.imagekit.io/medhaup/WhatsApp%20Image%202026-08-01%20at%201.26.23%20AM%20(1).png",
    worksFor: { "@id": "https://medhaup.com/#organization" },
    knowsAbout: [
      "ANM and GNM entrance preparation",
      "Biology",
      "Bilingual education",
    ],
  },
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={schema} />
      <AboutPageContent />
    </>
  );
}
