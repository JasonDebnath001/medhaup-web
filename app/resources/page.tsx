import type { Metadata } from "next";
import { getResources } from "@/lib/data";
import ComingSoon from "@/components/ui/ComingSoon";
import ResourcesHero from "@/components/sections/resources/ResourcesHero";
import ResourceGrid from "@/components/sections/resources/ResourceGrid";
import CourseCTA from "@/components/sections/resources/CourseCTA";
import WhatsAppStrip from "@/components/sections/resources/WhatsappStrip";

export const revalidate = 60;

export const metadata: Metadata = {
  title:
    "Free ANM/GNM Resources — Syllabus PDF, Previous Year Papers, Mock Tests | medhaup",
  description:
    "Download free WBJEE ANM/GNM study material — full syllabus PDF, previous year question papers, chapter notes, and mock tests. No login, no payment.",
};

export default async function ResourcesPage() {
  const resources = await getResources();

  if (resources.length === 0) {
    return (
      <ComingSoon
        title="Free Resources"
        message="Free notes, mock tests and guides are being uploaded. Join our WhatsApp channel — new resources drop there first."
      />
    );
  }

  return (
    <main>
      <ResourcesHero />
      <ResourceGrid resources={resources} />
      <WhatsAppStrip />
      <CourseCTA />
    </main>
  );
}