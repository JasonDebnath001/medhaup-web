import type { Metadata } from "next";
import AboutPageContent from "@/components/sections/about/AboutPageContent";

export const metadata: Metadata = {
  title: "About medhaup — Who Teaches the ANM/GNM Course",
  description:
    "medhaup is founded by Arushi, a teacher with 8+ years of experience, built to give West Bengal's nursing aspirants focused, bilingual, affordable ANM/GNM preparation.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}