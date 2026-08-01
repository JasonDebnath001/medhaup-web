import type { Metadata } from "next";
import AdmissionPageContent from "@/components/sections/admission/AdmissionPageContent";

export const metadata: Metadata = {
  title: "Take Admission — ANM/GNM CET Course | MedhaUp",
  description:
    "Join MedhaUp's 12-month ANM/GNM CET course. Enrol instantly through the app, or request a callback and we'll guide you through admission personally.",
};

export default function AdmissionPage() {
  return <AdmissionPageContent />;
}