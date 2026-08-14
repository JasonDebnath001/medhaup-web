import type { Metadata } from "next";
import { getBatches } from "@/lib/data";
import AdmissionPageContent from "@/components/sections/admission/AdmissionPageContent";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Take Admission — ANM/GNM Course | MedhaUp",
  description:
    "Enrol in MedhaUp's ANM/GNM course — admit yourself in the app or request a personal callback. Live classes in Bengali & English, EMI available.",
};

export default async function AdmissionPage() {
  const batches = await getBatches();

  return (
    <main>
      <AdmissionPageContent batch={batches[0] ?? null} />
    </main>
  );
}