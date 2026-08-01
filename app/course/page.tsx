import type { Metadata } from "next";
import CourseHero from "@/components/sections/course/CourseHero";
import WhatsInside from "@/components/sections/course/WhatsInside";
import Syllabus from "@/components/sections/course/Syllabus";
import HowItWorks from "@/components/sections/course/HowItWorks";
import Fees from "@/components/sections/course/Fees";

export const metadata: Metadata = {
  title: "ANM/GNM CET Complete Course | MedhaUp",
  description:
    "12-month online preparation for WBJEE ANM/GNM CET — live classes in Bengali & English, mock tests, and full syllabus coverage. ₹1,800 for the full course, EMI available.",
};

export default function CoursePage() {
  return (
    <main>
      <CourseHero />
      <WhatsInside />
      <Syllabus />
      <HowItWorks />
      <Fees />
    </main>
  );
}