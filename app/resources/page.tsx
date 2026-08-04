import type { Metadata } from "next";
import ResourcesHero from "@/components/sections/resources/ResourcesHero";
import ResourceGrid from "@/components/sections/resources/ResourceGrid";
import CourseCTA from "@/components/sections/resources/CourseCTA";
import WhatsAppStrip from "@/components/sections/resources/WhatsappStrip";

export const metadata: Metadata = {
  title: "Free ANM/GNM Resources — Syllabus PDF, Previous Year Papers, Mock Tests | MedhaUp",
  description:
    "Download free WBJEE ANM/GNM CET study material — full syllabus PDF, previous year question papers, chapter notes, and mock tests. No login, no payment.",
};

export default function ResourcesPage() {
  return (
    <main>
      <ResourcesHero />
      <ResourceGrid />
      <WhatsAppStrip />
      <CourseCTA />
    </main>
  );
}