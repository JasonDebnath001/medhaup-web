import Hero from "@/components/sections/Hero";
import OngoingBatch from "@/components/sections/OngoingBatch";
import SubjectSyllabus from "@/components/sections/SubjectSyllabus";
import WhyMedhaUp from "@/components/sections/WhyMedhaup";

export default function Home() {
  return (
    <main>
      <Hero />
      <OngoingBatch />
      <WhyMedhaUp />
      <SubjectSyllabus />
    </main>
  );
}