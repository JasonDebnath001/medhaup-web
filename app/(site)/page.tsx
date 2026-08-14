import type { Metadata } from "next";
import Link from "next/link";

import Hero from "@/components/sections/Hero";
import OngoingBatch from "@/components/sections/OngoingBatch";
import SubjectSyllabus from "@/components/sections/SubjectSyllabus";
import WhyMedhaUp from "@/components/sections/WhyMedhaup";
import BlogHighlights from "@/components/sections/Bloghighlights";
import {
  getBatches,
  getPosts,
  getSubjects,
  getSyllabusDownloads,
} from "@/lib/data";

/* -------------------------------------------------------------------------- */
/*                                  SEO CONFIG                                */
/* -------------------------------------------------------------------------- */

const SITE_URL = "https://medhaup.com";

const PAGE_TITLE =
  "ANM GNM 2027 Preparation | WBJEEB Nursing Exam | medhaup";

const PAGE_DESCRIPTION =
  "Prepare for WBJEEB ANM(R) & GNM 2027 with medhaup: Bengali & English classes, syllabus, PYQs, current affairs, practice and admission guidance.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  applicationName: "medhaup",

  authors: [
    {
      name: "medhaup",
      url: SITE_URL,
    },
  ],

  creator: "medhaup",
  publisher: "medhaup",

  category: "Education",

  keywords: [
    "ANM GNM 2027",
    "ANM GNM 2027 preparation",
    "ANM GNM preparation",
    "ANM GNM coaching",
    "ANM GNM online coaching",
    "ANM GNM West Bengal",
    "ANM GNM",
    "ANM GNM 2027",
    "WBJEEB ANM GNM",
    "WBJEEB ANM GNM 2027",
    "WBJEEB ANM GNM preparation",
    "WBJEEB nursing entrance exam",
    "West Bengal nursing entrance exam",
    "West Bengal ANM GNM",
    "ANM nursing entrance exam",
    "GNM nursing entrance exam",
    "ANM GNM syllabus",
    "ANM GNM syllabus 2027",
    "ANM GNM previous year question paper",
    "ANM GNM PYQ",
    "ANM GNM question paper",
    "ANM GNM mock test",
    "ANM GNM current affairs",
    "ANM GNM life science",
    "ANM GNM physical science",
    "ANM GNM mathematics",
    "ANM GNM English",
    "ANM GNM general knowledge",
    "ANM GNM logical reasoning",
    "ANM GNM Bengali coaching",
    "ANM GNM English coaching",
    "nursing entrance coaching West Bengal",
    "nursing entrance preparation West Bengal",
    "medhaup",
    "Medha Up",
  ],

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "medhaup",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,

    images: [
      {
        url: `${SITE_URL}/arushi.png`,
        width: 880,
        height: 1040,
        alt: "medhaup ANM GNM entrance exam preparation",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/arushi.png`],
  },

  referrer: "origin-when-cross-origin",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  other: {
    "geo.region": "IN-WB",
    "geo.placename": "West Bengal",
  },
};

/* -------------------------------------------------------------------------- */
/*                                SEO CONTENT                                 */
/* -------------------------------------------------------------------------- */

const SEO_LINKS = [
  {
    href: "/course",
    title: "ANM & GNM Course",
    description:
      "Explore MedhaUp's focused preparation program for the WBJEEB ANM(R) & GNM entrance examination.",
  },
  {
    href: "/syllabus",
    title: "ANM GNM Syllabus",
    description:
      "Understand the subject-wise ANM & GNM syllabus and what you need to prepare for the entrance exam.",
  },
  {
    href: "/pyq",
    title: "ANM GNM Previous Year Questions",
    description:
      "Practice ANM & GNM previous year questions and understand the pattern of questions asked in earlier examinations.",
  },
  {
    href: "/current-affairs",
    title: "ANM GNM Current Affairs",
    description:
      "Study current affairs and general awareness material created for nursing entrance preparation.",
  },
  {
    href: "/resources",
    title: "Free Preparation Resources",
    description:
      "Access useful study resources, notes and preparation material for ANM & GNM aspirants.",
  },
  {
    href: "/blogs",
    title: "ANM GNM Preparation Guides",
    description:
      "Read exam strategies, study guides and preparation articles for West Bengal nursing entrance aspirants.",
  },
];

const FAQS = [
  {
    question: "What is medhaup?",
    answer:
      "medhaup is an education platform focused on preparation for the WBJEEB ANM(R) & GNM Common Entrance Test in West Bengal. The preparation approach includes concept learning, subject-wise practice, syllabus guidance and exam-focused resources.",
  },
  {
    question: "Which entrance exam does medhaup focus on?",
    answer:
      "medhaup focuses on the ANM(R) & GNM Common Entrance Test conducted by the West Bengal Joint Entrance Examinations Board for nursing admissions in West Bengal.",
  },
  {
    question: "Is medhaup preparing students for ANM GNM 2027?",
    answer:
      "Yes. medhaup's current preparation program is designed for students targeting the 2027 ANM and GNM entrance examination cycle. Candidates should always verify official examination dates, eligibility and notifications directly from WBJEEB when the official 2027 bulletin is published.",
  },
  {
    question: "Are medhaup classes available in Bengali and English?",
    answer:
      "Yes. medhaup explains concepts in Bengali and English so that students can understand the syllabus clearly while also becoming comfortable with the language used in the entrance examination.",
  },
  {
    question: "Which subjects are covered for ANM GNM preparation?",
    answer:
      "Preparation covers the major ANM and GNM entrance subjects including Life Science, Physical Science, Mathematics, Basic English, General Knowledge and Logical Reasoning.",
  },
  {
    question: "Can I get ANM GNM syllabus and previous year questions?",
    answer:
      "Yes. medhaup provides dedicated syllabus, previous year question, current affairs and preparation-resource sections so students can organise their preparation from one place.",
  },
];

/* -------------------------------------------------------------------------- */
/*                             STRUCTURED DATA                                */
/* -------------------------------------------------------------------------- */

const structuredData = {
  "@context": "https://schema.org",

  "@graph": [
    /* ---------------------------------------------------------------------- */
    /* Educational Organization                                               */
    /* ---------------------------------------------------------------------- */

    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,

      name: "medhaup",

      alternateName: ["Medha Up", "medhaup"],

      url: SITE_URL,

      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/logo.png`,
        contentUrl: `${SITE_URL}/logo.png`,
        caption: "medhaup",
      },

      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}/arushi.png`,
      },

      description:
        "medhaup provides focused preparation for the WBJEEB ANM(R) & GNM nursing entrance examination in West Bengal.",

      areaServed: {
        "@type": "AdministrativeArea",
        name: "West Bengal",
      },

      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
      },

      knowsAbout: [
        "WBJEEB ANM(R) & GNM Common Entrance Test",
        "ANM Nursing Entrance Examination",
        "GNM Nursing Entrance Examination",
        "Life Science",
        "Physical Science",
        "Mathematics",
        "Basic English",
        "General Knowledge",
        "Logical Reasoning",
        "Nursing Entrance Preparation",
      ],
    },

    /* ---------------------------------------------------------------------- */
    /* Website                                                                 */
    /* ---------------------------------------------------------------------- */

    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,

      url: SITE_URL,

      name: "medhaup",

      alternateName: "medhaup ANM GNM Preparation",

      description: PAGE_DESCRIPTION,

      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },

      inLanguage: ["en-IN", "bn-IN"],
    },

    /* ---------------------------------------------------------------------- */
    /* Homepage                                                                */
    /* ---------------------------------------------------------------------- */

    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,

      url: SITE_URL,

      name: PAGE_TITLE,

      headline: "WBJEEB ANM & GNM 2027 Preparation",

      description: PAGE_DESCRIPTION,

      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },

      about: {
        "@id": `${SITE_URL}/#organization`,
      },

      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/arushi.png`,
        width: 880,
        height: 1040,
      },

      inLanguage: ["en-IN", "bn-IN"],

      potentialAction: {
        "@type": "ReadAction",
        target: [SITE_URL],
      },
    },

    /* ---------------------------------------------------------------------- */
    /* Course                                                                  */
    /* ---------------------------------------------------------------------- */

    {
      "@type": "Course",
      "@id": `${SITE_URL}/course#course`,

      name: "WBJEEB ANM(R) & GNM 2027 Preparation",

      alternateName: [
        "ANM GNM 2027 Preparation",
        "ANM GNM Entrance Coaching",
      ],

      description:
        "Focused preparation for West Bengal's WBJEEB ANM(R) & GNM nursing entrance examination with Bengali and English concept classes, subject-wise preparation and exam-oriented practice.",

      url: `${SITE_URL}/course`,

      provider: {
        "@id": `${SITE_URL}/#organization`,
      },

      inLanguage: ["en-IN", "bn-IN"],

      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
      },

      about: [
        {
          "@type": "Thing",
          name: "Life Science",
        },
        {
          "@type": "Thing",
          name: "Physical Science",
        },
        {
          "@type": "Thing",
          name: "Mathematics",
        },
        {
          "@type": "Thing",
          name: "Basic English",
        },
        {
          "@type": "Thing",
          name: "General Knowledge",
        },
        {
          "@type": "Thing",
          name: "Logical Reasoning",
        },
      ],
    },

    /* ---------------------------------------------------------------------- */
    /* FAQ                                                                     */
    /* ---------------------------------------------------------------------- */

    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,

      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,

        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*                                  PAGE                                      */
/* -------------------------------------------------------------------------- */

export const revalidate = 60;

export default async function Home() {
  const [batches, subjects, downloads, posts] = await Promise.all([
    getBatches(),
    getSubjects(),
    getSyllabusDownloads(),
    getPosts(),
  ]);

  /* Latest three published posts for the homepage showcase */
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      {/* -------------------------------------------------------------------- */}
      {/* JSON-LD Structured Data                                              */}
      {/* -------------------------------------------------------------------- */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <main>
        {/* ------------------------------------------------------------------ */}
        {/* Existing Homepage Sections                                         */}
        {/* ------------------------------------------------------------------ */}

        <Hero downloads={downloads} />

        {/* No published batch → section disappears (admissions closed) */}
        {batches.length > 0 && <OngoingBatch batches={batches} />}

        <WhyMedhaUp />

        {subjects.length > 0 && (
          <SubjectSyllabus subjects={subjects} />
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Crawlable SEO + Internal Linking Section                           */}
        {/* ------------------------------------------------------------------ */}

        <section
          aria-labelledby="anm-gnm-preparation-heading"
          className="bg-white py-20 sm:py-28"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy">
                ANM &amp; GNM Preparation
              </span>

              <h2
                id="anm-gnm-preparation-heading"
                className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
              >
                WBJEEB ANM &amp; GNM 2027 preparation for{" "}
                <span className="text-orange">
                  West Bengal nursing aspirants
                </span>
              </h2>

              <p className="mt-5 text-base leading-8 text-navy/70">
                medhaup is built for students preparing for the WBJEEB
                ANM(R) &amp; GNM Common Entrance Test in West Bengal. Instead
                of mixing nursing entrance preparation with unrelated
                competitive exams, the learning experience focuses on the
                subjects, concepts and practice required by ANM and GNM
                aspirants.
              </p>

              <p className="mt-4 text-base leading-8 text-navy/70">
                Students preparing for ANM GNM 2027 can study Life Science,
                Physical Science, Mathematics, Basic English, General
                Knowledge and Logical Reasoning, while using syllabus
                resources, previous year questions, current affairs and
                exam-focused study material to build a structured preparation
                plan.
              </p>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* SEO Internal Links                                             */}
            {/* -------------------------------------------------------------- */}

            <nav
              aria-label="ANM GNM preparation resources"
              className="mt-14"
            >
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {SEO_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-2xl border border-navy/10 bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-lg hover:shadow-navy/10"
                  >
                    <h3 className="font-heading text-lg font-bold text-navy transition-colors group-hover:text-orange">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-navy/65">
                      {item.description}
                    </p>

                    <span className="mt-4 inline-flex items-center text-sm font-bold text-orange">
                      Explore
                      <span
                        aria-hidden="true"
                        className="ml-1 transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </nav>

            {/* -------------------------------------------------------------- */}
            {/* Additional semantic copy                                      */}
            {/* -------------------------------------------------------------- */}

            <div className="mt-16 grid gap-8 rounded-3xl bg-navy p-7 text-white sm:p-10 lg:grid-cols-2 lg:gap-12">
              <div>
                <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">
                  Prepare specifically for ANM &amp; GNM
                </h2>

                <p className="mt-4 leading-7 text-white/75">
                  Nursing entrance preparation becomes easier to organise when
                  the syllabus, previous questions, subject practice and
                  revision resources follow the same exam goal. medhaup brings
                  these parts together for students targeting ANM and GNM
                  admissions in West Bengal.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">
                  বাংলা + English learning support
                </h2>

                <p className="mt-4 leading-7 text-white/75">
                  Concepts are explained using Bengali and English so students
                  can understand difficult topics clearly while becoming
                  comfortable with the terminology they encounter during
                  entrance preparation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* Latest Blog Posts Showcase                                         */}
        {/* ------------------------------------------------------------------ */}

        {latestPosts.length > 0 && <BlogHighlights posts={latestPosts} />}

        {/* ------------------------------------------------------------------ */}
        {/* SEO FAQ Section                                                     */}
        {/* ------------------------------------------------------------------ */}

        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="bg-cream py-20 sm:py-28"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <span className="inline-block rounded-full border border-navy/15 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy">
                Frequently Asked Questions
              </span>

              <h2
                id="faq-heading"
                className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
              >
                ANM GNM preparation{" "}
                <span className="text-orange">FAQs</span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-navy/65">
                Common questions from students preparing for the West Bengal
                ANM(R) &amp; GNM nursing entrance examination.
              </p>
            </div>

            <div className="mt-12 space-y-4">
              {FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-navy/10 bg-white px-6 py-5 shadow-sm"
                >
                  <summary className="font-heading cursor-pointer list-none pr-8 text-base font-bold text-navy sm:text-lg">
                    <span className="flex items-center justify-between gap-4">
                      {faq.question}

                      <span
                        aria-hidden="true"
                        className="shrink-0 text-2xl font-normal leading-none text-orange transition-transform duration-200 group-open:rotate-45"
                      >
                        +
                      </span>
                    </span>
                  </summary>

                  <p className="mt-4 max-w-3xl pr-4 text-sm leading-7 text-navy/65 sm:text-base">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/admission"
                className="inline-flex items-center justify-center rounded-full bg-orange px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange/25 transition-all duration-200 hover:bg-orange-dark hover:shadow-xl"
              >
                Start ANM GNM 2027 Preparation
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}