import ContactPageContent from "@/components/sections/contact/ContactPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact MedhaUp — WhatsApp, Call or Message Us",
  description:
    "Questions about the ANM/GNM CET course, fees, or admission? Reach MedhaUp on WhatsApp, call +91 89108 40928 (10 AM – 6 PM), or send a message.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}