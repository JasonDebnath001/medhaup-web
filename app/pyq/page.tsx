import { FileText, Download, KeyRound, Sparkles } from "lucide-react";
import { getPYQs } from "@/lib/data";
import ComingSoon from "@/components/ui/ComingSoon";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, createPageMetadata, createPageSchema } from "@/lib/seo";

export const revalidate = 60;

const title = "ANM/GNM Previous Year Question Papers (PYQ)";
const description =
  "Download WBJEEB ANM/GNM previous year question papers and answer keys as free PDFs. Practise real papers without login or payment.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/pyq",
  keywords: [
    "ANM GNM previous year question paper",
    "ANM GNM PYQ PDF",
    "WBJEEB ANM GNM answer key",
    "ANM GNM question paper download",
  ],
});

export default async function PYQPage() {
  const papers = await getPYQs(); // already sorted by year, newest first
  const schema = createPageSchema({
    type: "CollectionPage",
    path: "/pyq",
    name: `${title} | medhaup`,
    description,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Study Material", path: "/resources" },
      { name: "Previous Year Papers", path: "/pyq" },
    ],
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: papers.length,
      itemListElement: papers.map((paper, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "LearningResource",
          name: paper.title,
          description: paper.description,
          dateCreated: `${paper.year}`,
          learningResourceType: "Previous year question paper",
          inLanguage: paper.language,
          isAccessibleForFree: true,
          url: paper.paperUrl.startsWith("http")
            ? paper.paperUrl
            : absoluteUrl(paper.paperUrl),
          provider: { "@id": "https://medhaup.com/#organization" },
        },
      })),
    },
  });

  if (papers.length === 0) {
    return (
      <>
        <JsonLd data={schema} />
        <ComingSoon
          title="Previous Year Papers"
          message="We're compiling the official WBJEEB papers with answer keys. Almost ready — message us on WhatsApp to get them the day they drop."
        />
      </>
    );
  }

  return (
    <main>
      <JsonLd data={schema} />
      <section className="bg-cream pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-navy shadow-sm">
            <FileText size={14} className="text-orange" />
            PREVIOUS YEAR PAPERS
          </span>
          <h1 className="font-heading mt-6 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Solve the <span className="text-orange">real papers</span> first
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-navy/70">
            Nothing predicts the exam like the exam itself. Download the actual
            WBJEEB papers, attempt each in 90 minutes, then check the key.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-5 px-4 sm:px-6">
          {papers.map((p) => (
            <article
              key={p.id}
              className="flex flex-col gap-5 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center"
            >
              {/* Year badge */}
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-navy font-heading text-lg font-extrabold text-white">
                {p.year}
              </div>

              <div className="flex-1">
                <h2 className="font-heading flex flex-wrap items-center gap-2 text-lg font-bold text-navy">
                  {p.title}
                  {p.isNew && (
                    <span className="flex items-center gap-1 rounded-full bg-orange/10 px-2 py-0.5 text-[10px] font-bold text-orange">
                      <Sparkles size={11} /> NEW
                    </span>
                  )}
                </h2>
                <p className="mt-1 text-sm text-navy/65">{p.description}</p>
                <p className="mt-1.5 text-xs text-navy/45">
                  {p.language}
                  {p.fileSize && <> · {p.fileSize}</>}
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                <a
                  href={p.paperUrl}
                  download
                  className="flex items-center justify-center gap-2 rounded-xl bg-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
                >
                  <Download size={15} /> Question Paper
                </a>
                {p.answerKeyUrl && (
                  <a
                    href={p.answerKeyUrl}
                    download
                    className="flex items-center justify-center gap-2 rounded-xl border border-navy/15 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy/5"
                  >
                    <KeyRound size={15} /> Answer Key
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
