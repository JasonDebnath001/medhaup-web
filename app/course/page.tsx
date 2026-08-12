import type { Metadata } from "next";
import Link from "next/link";
import CourseHero from "@/components/sections/course/CourseHero";
import WhatsInside from "@/components/sections/course/WhatsInside";
import Syllabus from "@/components/sections/course/Syllabus";
import HowItWorks from "@/components/sections/course/HowItWorks";
import Fees from "@/components/sections/course/Fees";

const SITE_URL = "https://medhaup.com";
const COURSE_URL = `${SITE_URL}/course`;
const OFFICIAL_EXAM_URL = "https://wbjeeb.nic.in/anm-gnm/";

const SEO_TITLE = "ANM GNM 2027 Online Course | WBJEEB Coaching | MedhaUp";

const SEO_DESCRIPTION =
  "Prepare for WBJEEB ANM(R) & GNM 2027 with MedhaUp's 12-month online course: Bengali + English classes, recordings, mock tests, PYQs, notes and doubt support.";

const FAQS = [
  {
    question: "What is the MedhaUp ANM GNM 2027 online course?",
    answer:
      "It is a 12-month online preparation program for students targeting the West Bengal ANM(R) & GNM entrance examination. The course combines live classes, class recordings, bilingual notes, mock tests, previous-year-question practice and doubt support in one program.",
  },
  {
    question: "Is this course specifically for the WBJEEB ANM(R) & GNM exam?",
    answer:
      "Yes. The preparation is focused on the subjects and question-solving skills needed for the WBJEEB ANM(R) & GNM Common Entrance Test in West Bengal. Students should still use the latest official WBJEEB information bulletin as the final authority for the current year's rules and exam pattern.",
  },
  {
    question: "Which subjects are covered in the ANM GNM course?",
    answer:
      "The course covers Life Science, Physical Science, Mathematics, Basic English, General Knowledge and Logical Reasoning. Topic weightage and the exact examination structure can change, so MedhaUp recommends checking the latest official WBJEEB bulletin as well.",
  },
  {
    question: "Are classes available in Bengali and English?",
    answer:
      "Yes. MedhaUp teaches in Bengali and English so students can understand concepts comfortably while also practising the terminology used in the entrance examination.",
  },
  {
    question: "Will I get recordings if I miss a live class?",
    answer:
      "Yes. Class recordings are included, allowing enrolled students to revisit lessons and revise topics during the course period.",
  },
  {
    question: "Are mock tests, notes and previous year questions included?",
    answer:
      "Yes. The course includes mock-test practice, bilingual chapter-wise notes, PYQ solutions and regular revision support alongside the live classes.",
  },
  {
    question: "What is the duration and fee of the MedhaUp ANM GNM course?",
    answer:
      "The course duration is 12 months. The listed full-course fee is ₹1,800 for new students and ₹1,500 for returning MedhaUp students, with EMI availability shown on the course page. Check the admission page for the current payable amount before enrolling.",
  },
  {
    question: "Is MedhaUp an official WBJEEB website?",
    answer:
      "No. MedhaUp is an independent education and exam-preparation platform. It is not the West Bengal Joint Entrance Examinations Board and does not replace official WBJEEB notices, bulletins, applications or counselling information.",
  },
  {
    question:
      "Where should I check official ANM GNM 2027 dates and eligibility?",
    answer:
      "Use the official WBJEEB ANM & GNM website and the information bulletin published for the relevant examination year. Official dates, eligibility rules, application instructions, exam pattern and counselling requirements can change from one cycle to another.",
  },
] as const;

const RESOURCE_LINKS = [
  {
    href: "/syllabus",
    title: "ANM GNM syllabus",
    description:
      "Review the subject-wise syllabus and organise your preparation before starting revision.",
  },
  {
    href: "/pyq",
    title: "ANM GNM previous year papers",
    description:
      "Practise previous questions to understand recurring concepts and the style of the examination.",
  },
  {
    href: "/current-affairs",
    title: "ANM GNM current affairs",
    description:
      "Keep General Knowledge preparation active with MedhaUp's current-affairs material.",
  },
  {
    href: "/resources",
    title: "Free ANM GNM study materials",
    description:
      "Use downloadable notes and study resources alongside your regular course preparation.",
  },
  {
    href: "/blogs",
    title: "ANM GNM preparation articles",
    description:
      "Read exam-preparation guidance, revision ideas and subject-focused learning articles.",
  },
  {
    href: "/admission",
    title: "ANM GNM course admission",
    description:
      "View the admission process and join a MedhaUp ANM GNM preparation batch.",
  },
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: SEO_TITLE,
  description: SEO_DESCRIPTION,

  applicationName: "MedhaUp",
  category: "education",

  alternates: {
    canonical: "/course",
  },

  robots: {
    index: true,
    follow: true,
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
    alternateLocale: ["bn_IN"],
    url: COURSE_URL,
    siteName: "MedhaUp",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        alt: "MedhaUp ANM GNM 2027 online course",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [`${SITE_URL}/logo.png`],
  },
};

const structuredData = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${COURSE_URL}#webpage`,

      url: COURSE_URL,
      name: SEO_TITLE,
      description: SEO_DESCRIPTION,

      inLanguage: ["en-IN", "bn-IN"],

      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "MedhaUp",
      },

      about: {
        "@id": `${COURSE_URL}#course`,
      },

      breadcrumb: {
        "@id": `${COURSE_URL}#breadcrumb`,
      },
    },

    {
      "@type": "BreadcrumbList",
      "@id": `${COURSE_URL}#breadcrumb`,

      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "ANM GNM 2027 Online Course",
          item: COURSE_URL,
        },
      ],
    },

    {
      "@type": "Course",
      "@id": `${COURSE_URL}#course`,

      name: "ANM GNM 2027 Online Course",

      alternateName: [
        "WBJEEB ANM GNM 2027 Course",
        "West Bengal ANM GNM Online Coaching",
        "ANM(R) GNM Entrance Preparation Course",
      ],

      url: COURSE_URL,
      description: SEO_DESCRIPTION,

      provider: {
        "@type": "EducationalOrganization",
        name: "MedhaUp",
        url: SITE_URL,
      },

      availableLanguage: ["Bengali", "English"],
      inLanguage: ["bn-IN", "en-IN"],

      educationalLevel: "ANM(R) and GNM entrance examination preparation",

      learningResourceType: [
        "Live online classes",
        "Recorded classes",
        "Bilingual notes",
        "Mock tests",
        "Previous year question practice",
      ],

      teaches: [
        "Life Science",
        "Physical Science",
        "Mathematics",
        "Basic English",
        "General Knowledge",
        "Logical Reasoning",
      ],

      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
        audienceType: "ANM(R) and GNM entrance aspirants in West Bengal",
      },

      hasCourseInstance: {
        "@type": "CourseInstance",

        name: "MedhaUp ANM GNM 2027 Online Batch",

        courseMode: "Online",

        inLanguage: ["bn-IN", "en-IN"],

        offers: [
          {
            "@type": "Offer",
            name: "New student full-course fee",
            price: "1800",
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/admission`,
          },
          {
            "@type": "Offer",
            name: "Returning MedhaUp student full-course fee",
            price: "1500",
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/admission`,
          },
        ],
      },
    },

    {
      "@type": "FAQPage",
      "@id": `${COURSE_URL}#faq`,

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

function CourseSeoContent() {
  return (
    <section
      aria-labelledby="anm-gnm-course-guide"
      className="bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-dark">
            ANM GNM 2027 Preparation
          </span>

          <h2
            id="anm-gnm-course-guide"
            className="font-heading mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
          >
            ANM GNM 2027 online coaching for West Bengal nursing aspirants
          </h2>

          <p className="mt-5 text-base leading-8 text-navy/70">
            MedhaUp&apos;s ANM GNM 2027 online course is designed for students
            preparing for the WBJEEB ANM(R) &amp; GNM entrance examination in
            West Bengal. The goal is to make preparation consistent: learn the
            concept in class, revise it from notes and recordings, practise
            exam-style questions, and then measure progress through tests.
          </p>

          <p className="mt-4 text-base leading-8 text-navy/70">
            Because the course is online, students can prepare from home while
            still following a structured 12-month plan. Bengali + English
            teaching, recordings and chapter-wise material also make it easier
            to revisit difficult topics instead of depending on a single live
            explanation.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <article className="rounded-3xl border border-navy/10 bg-cream p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-dark">
              Focused preparation
            </p>

            <h3 className="font-heading mt-3 text-xl font-bold text-navy">
              Built around ANM(R) &amp; GNM entrance preparation
            </h3>

            <p className="mt-3 text-sm leading-7 text-navy/65">
              Study the six core areas covered by the course instead of jumping
              between unrelated material. The syllabus section on this page
              shows how MedhaUp organises Life Science, Physical Science,
              Mathematics, English, General Knowledge and Logical Reasoning
              preparation.
            </p>
          </article>

          <article className="rounded-3xl border border-navy/10 bg-cream p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-dark">
              Practice loop
            </p>

            <h3 className="font-heading mt-3 text-xl font-bold text-navy">
              Learn, practise, test and revise
            </h3>

            <p className="mt-3 text-sm leading-7 text-navy/65">
              Live lessons are supported by recordings, notes, mock tests and
              previous-year-question solutions. That gives students multiple
              ways to return to the same concept until recall and question
              solving become more reliable.
            </p>
          </article>

          <article className="rounded-3xl border border-navy/10 bg-cream p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-dark">
              Bilingual support
            </p>

            <h3 className="font-heading mt-3 text-xl font-bold text-navy">
              Bengali + English learning support
            </h3>

            <p className="mt-3 text-sm leading-7 text-navy/65">
              Explanations and study support are designed for students who are
              comfortable learning in Bengali, English or a mix of both. The
              emphasis stays on concept clarity and accurate exam practice.
            </p>
          </article>
        </div>

        <div className="mt-12 rounded-3xl border border-orange/25 bg-orange/5 p-6 sm:p-8">
          <h3 className="font-heading text-xl font-bold text-navy">
            Official ANM(R) &amp; GNM exam information
          </h3>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-navy/70">
            MedhaUp is an independent preparation platform, not WBJEEB. Exam
            dates, eligibility, application rules, paper structure and
            counselling requirements can change by year. For official notices
            and the information bulletin, always check the{" "}
            <a
              href={OFFICIAL_EXAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-orange-dark underline decoration-orange/35 underline-offset-4 transition-colors hover:text-orange"
            >
              official WBJEEB ANM &amp; GNM page
            </a>
            .
          </p>
        </div>

        <div className="mt-16">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-dark">
              Continue your preparation
            </p>

            <h2 className="font-heading mt-3 text-3xl font-extrabold text-navy">
              ANM GNM study resources on MedhaUp
            </h2>

            <p className="mt-3 text-navy/65">
              Use these pages with the course to build a stronger revision and
              question-practice routine.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RESOURCE_LINKS.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="group rounded-2xl border border-navy/10 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-orange/40 hover:shadow-lg hover:shadow-navy/5"
              >
                <h3 className="font-heading font-bold text-navy transition-colors group-hover:text-orange-dark">
                  {resource.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-navy/60">
                  {resource.description}
                </p>

                <span className="mt-4 inline-flex text-sm font-semibold text-orange-dark">
                  Explore resource →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CourseFaq() {
  return (
    <section
      id="faq"
      aria-labelledby="course-faq-title"
      className="bg-cream py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-block rounded-full border border-navy/15 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy">
            Frequently Asked Questions
          </span>

          <h2
            id="course-faq-title"
            className="font-heading mt-4 text-3xl font-extrabold text-navy sm:text-4xl"
          >
            ANM GNM 2027 course FAQs
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-navy/60">
            Quick answers about the MedhaUp course, included study support and
            where to verify official examination information.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-navy/10 bg-white px-5 py-4 shadow-sm open:border-orange/30"
            >
              <summary className="cursor-pointer list-none pr-8 font-heading font-bold leading-6 text-navy marker:hidden">
                {faq.question}
              </summary>

              <p className="mt-3 border-t border-navy/10 pt-3 text-sm leading-7 text-navy/65">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/admission"
            className="inline-flex items-center justify-center rounded-full bg-orange px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange/25 transition-all hover:bg-orange-dark hover:shadow-xl"
          >
            Join the ANM GNM 2027 course
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function CoursePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <CourseHero />
      <WhatsInside />
      <Syllabus />
      <CourseSeoContent />
      <HowItWorks />
      <Fees />
      <CourseFaq />
    </main>
  );
}
