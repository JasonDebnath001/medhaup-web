import { BookOpen, Download } from "lucide-react";
import { getSubjects, getSyllabusDownloads } from "@/lib/data";
import ComingSoon from "@/components/ui/ComingSoon";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, createPageMetadata, createPageSchema } from "@/lib/seo";

export const revalidate = 60;

const title = "ANM/GNM Syllabus 2027: Subjects & PDF";
const description =
  "View the WBJEEB ANM/GNM 2027 subject-wise syllabus and question weightage. Download the complete syllabus PDF free in Bengali or English.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/syllabus",
  keywords: [
    "ANM GNM syllabus 2027 PDF",
    "WBJEEB ANM GNM syllabus",
    "ANM GNM subject weightage",
    "ANM GNM syllabus Bengali",
  ],
});

export default async function SyllabusPage() {
  const [subjects, downloads] = await Promise.all([
    getSubjects(), // sorted by questions desc
    getSyllabusDownloads(),
  ]);

  if (subjects.length === 0) {
    return (
      <ComingSoon
        title="The Syllabus"
        message="The subject-wise syllabus breakdown is being finalized. It'll be up shortly."
      />
    );
  }

  const totalQ = subjects.reduce((s, x) => s + x.questions, 0);
  const schema = createPageSchema({
    type: "CollectionPage",
    path: "/syllabus",
    name: `${title} | medhaup`,
    description,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Study Material", path: "/resources" },
      { name: "Syllabus", path: "/syllabus" },
    ],
    mainEntity: {
      "@type": "LearningResource",
      name: "WBJEEB ANM GNM 2027 Syllabus",
      description,
      learningResourceType: "Syllabus",
      educationalLevel: "Nursing entrance examination preparation",
      teaches: subjects.map((subject) => subject.name),
      inLanguage: ["Bengali", "English"],
      isAccessibleForFree: true,
      provider: { "@id": "https://medhaup.com/#organization" },
      encoding: downloads.map((download) => ({
        "@type": "MediaObject",
        name: download.label,
        contentUrl: download.fileUrl.startsWith("http")
          ? download.fileUrl
          : absoluteUrl(download.fileUrl),
        encodingFormat: "application/pdf",
      })),
    },
  });

  return (
    <main>
      <JsonLd data={schema} />
      <section className="bg-cream pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-navy shadow-sm">
            <BookOpen size={14} className="text-orange" />
            OFFICIAL SYLLABUS · {totalQ} QUESTIONS
          </span>
          <h1 className="font-heading mt-6 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Know <span className="text-orange">exactly</span> what to study
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-navy/70">
            The complete ANM/GNM syllabus, subject by subject, with how many
            questions each carries in the paper.
          </p>

          {/* Full syllabus downloads */}
          {downloads.length > 0 && (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {downloads.map((d) => (
                
             <a     key={d.id}
                  href={d.fileUrl}
                  download={d.fileName || undefined}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-dark sm:w-auto"
                >
                  <Download size={16} /> {d.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {subjects.map((s) => (
            <article
              key={s.id}
              className="flex flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-heading text-lg font-bold text-navy">
                  {s.name}
                </h2>
                <span className="shrink-0 rounded-full bg-orange/10 px-3 py-1 text-xs font-bold text-orange">
                  {s.questions} Qs
                </span>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/65">
                {s.blurb}
              </p>
              {/* Weightage bar */}
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-navy/8">
                <div
                  className="h-full rounded-full bg-orange"
                  style={{ width: `${(s.questions / totalQ) * 100}%` }}
                />
              </div>
              {s.fileUrl && (
                
              <a    href={s.fileUrl}
                  download={s.fileName || undefined}
                  className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-navy/15 px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-orange hover:text-orange"
                >
                  <Download size={15} /> Download {s.name} PDF
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
