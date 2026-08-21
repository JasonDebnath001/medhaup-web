import { Newspaper, Download, Sparkles, CalendarDays } from "lucide-react";
import { getMonthlyCA, getDailyCA, getSiteSettings } from "@/lib/data";
import ComingSoon from "@/components/ui/ComingSoon";
import { formatDateShort } from "@/lib/utils";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, createPageMetadata, createPageSchema } from "@/lib/seo";

export const revalidate = 60;

const title = "ANM/GNM Current Affairs: Daily Updates & PDFs";
const description =
  "Study exam-focused current affairs for WBJEEB ANM/GNM with free daily GK updates and monthly PDFs covering health, schemes and West Bengal news.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/current-affairs",
  keywords: [
    "ANM GNM current affairs 2027",
    "ANM GNM current affairs PDF",
    "nursing entrance current affairs",
    "West Bengal current affairs for ANM GNM",
  ],
});

export default async function CurrentAffairsPage() {
  const [monthly, daily, settings] = await Promise.all([
    getMonthlyCA(),
    getDailyCA(),
    getSiteSettings(),
  ]);
  const schema = createPageSchema({
    type: "CollectionPage",
    path: "/current-affairs",
    name: `${title} | medhaup`,
    description,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Study Material", path: "/resources" },
      { name: "Current Affairs", path: "/current-affairs" },
    ],
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: monthly.length + daily.length,
      itemListElement: [
        ...monthly.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "LearningResource",
            name: item.title,
            description: item.description,
            learningResourceType: "Current affairs PDF",
            inLanguage: item.language,
            isAccessibleForFree: true,
            url: item.fileUrl.startsWith("http")
              ? item.fileUrl
              : absoluteUrl(item.fileUrl),
          },
        })),
        ...daily.map((item, index) => ({
          "@type": "ListItem",
          position: monthly.length + index + 1,
          item: {
            "@type": "Article",
            headline: item.headline,
            description: item.detail,
            datePublished: item.date,
            articleSection: item.tag,
            publisher: { "@id": "https://medhaup.com/#organization" },
          },
        })),
      ],
    },
  });

  if (monthly.length === 0 && daily.length === 0) {
    return (
      <>
        <JsonLd data={schema} />
        <ComingSoon
          title="Current Affairs"
          message="Daily updates and monthly compiled PDFs launch soon — message us on WhatsApp to get them first."
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
            <Newspaper size={14} className="text-orange" />
            CURRENT AFFAIRS
          </span>
          <h1 className="font-heading mt-6 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Only the GK that can{" "}
            <span className="text-orange">actually appear</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-navy/70">
            We filter hundreds of news items down to what the ANM/GNM GK
            section really asks — health days, WB events, awards and schemes.
          </p>
        </div>
      </section>

      {/* Monthly PDFs */}
      {monthly.length > 0 && (
        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="font-heading text-xl font-bold text-navy sm:text-2xl">
              Monthly compiled PDFs
            </h2>
            <div className="mt-6 space-y-4">
              {monthly.map((m) => (
                <article
                  key={m.id}
                  className="flex flex-col gap-4 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
                >
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-navy/5 text-navy">
                    <CalendarDays size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading flex flex-wrap items-center gap-2 font-bold text-navy">
                      {m.title}
                      {m.isNew && (
                        <span className="flex items-center gap-1 rounded-full bg-orange/10 px-2 py-0.5 text-[10px] font-bold text-orange">
                          <Sparkles size={11} /> NEW
                        </span>
                      )}
                    </h3>
                    <p className="mt-1 text-sm text-navy/65">
                      {m.description}
                    </p>
                    <p className="mt-1 text-xs text-navy/45">
                      {m.language}
                      {m.fileSize && <> · {m.fileSize}</>}
                    </p>
                  </div>

                  
                  <a  href={m.fileUrl}
                    download
                    className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
                  >
                    <Download size={15} /> Download
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Daily updates */}
      {daily.length > 0 && (
        <section className="bg-cream py-14 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="font-heading text-xl font-bold text-navy sm:text-2xl">
              Recent daily updates
            </h2>
            <div className="mt-6 space-y-3">
              {daily.map((d) => (
                <article
                  key={d.id}
                  className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-navy/5 px-2.5 py-1 font-semibold text-navy/70">
                      {formatDateShort(d.date)}
                    </span>
                    <span className="rounded-full bg-orange/10 px-2.5 py-1 font-semibold text-orange">
                      {d.tag}
                    </span>
                  </div>
                  <h3 className="font-heading mt-2.5 font-bold text-navy">
                    {d.headline}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-navy/65">
                    {d.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Channel CTA — only when a channel URL is set in the admin panel */}
      {settings.channelUrl && (
        <section className="bg-cream pb-14 sm:pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="rounded-2xl bg-navy p-6 text-center sm:p-8">
              <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
                Get daily current affairs on WhatsApp
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-white/70">
                One exam-relevant update every day on our channel — free.
              </p>

              
             <a   href={settings.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
              >
                Join the Channel
              </a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
