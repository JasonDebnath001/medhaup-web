import Hero from "@/components/sections/Hero";
import OngoingBatch from "@/components/sections/OngoingBatch";
import SubjectSyllabus from "@/components/sections/SubjectSyllabus";
import WhyMedhaUp from "@/components/sections/WhyMedhaup";
import { getBatches, getSubjects, getSyllabusDownloads } from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  const [batches, subjects, downloads] = await Promise.all([
    getBatches(),
    getSubjects(),
    getSyllabusDownloads(),
  ]);

  return (
    <main>
      <Hero downloads={downloads} />
      {/* No published batch → section disappears (admissions closed) */}
      {batches.length > 0 && <OngoingBatch batches={batches} />}
      <WhyMedhaUp />
      {subjects.length > 0 && <SubjectSyllabus subjects={subjects} />}
    </main>
  );
}