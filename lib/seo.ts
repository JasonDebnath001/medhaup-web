import type { Metadata } from "next";

export const SITE_URL = "https://medhaup.com";
export const SITE_NAME = "medhaup";
export const DEFAULT_TITLE =
  "ANM GNM 2027 Preparation & Online Coaching | medhaup";
export const DEFAULT_DESCRIPTION =
  "Prepare for the WBJEEB ANM(R) & GNM 2027 entrance exam with bilingual classes, syllabus guidance, PYQs, current affairs, mock tests and free study resources from medhaup.";

export const DEFAULT_KEYWORDS = [
  "ANM GNM 2027",
  "ANM GNM preparation",
  "WBJEEB ANM GNM",
  "ANM GNM online coaching",
  "West Bengal nursing entrance exam",
  "ANM GNM syllabus",
  "ANM GNM previous year question papers",
  "ANM GNM study material",
  "Bengali ANM GNM coaching",
  "medhaup",
];

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  absoluteTitle?: boolean;
};

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = "/opengraph-image",
  imageAlt = "medhaup ANM GNM 2027 preparation",
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const imageUrl = absoluteUrl(image);

  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          type: "article",
          locale: "en_IN",
          alternateLocale: ["bn_IN"],
          url: path,
          siteName: SITE_NAME,
          title: fullTitle,
          description,
          publishedTime,
          modifiedTime,
          authors: [SITE_NAME],
          tags,
          images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }],
        }
      : {
          type: "website",
          locale: "en_IN",
          alternateLocale: ["bn_IN"],
          url: path,
          siteName: SITE_NAME,
          title: fullTitle,
          description,
          images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }],
        };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    alternates: { canonical: path },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
  };
}

type Breadcrumb = {
  name: string;
  path: `/${string}` | "/";
};

type PageSchemaOptions = {
  type?: string;
  path: `/${string}` | "/";
  name: string;
  description: string;
  breadcrumbs?: Breadcrumb[];
  datePublished?: string;
  dateModified?: string;
  image?: string;
  mainEntity?: Record<string, unknown> | Record<string, unknown>[];
  extraEntities?: Record<string, unknown>[];
};

export function createPageSchema({
  type = "WebPage",
  path,
  name,
  description,
  breadcrumbs = [],
  datePublished,
  dateModified,
  image,
  mainEntity,
  extraEntities = [],
}: PageSchemaOptions) {
  const url = absoluteUrl(path);
  const breadcrumbId = `${url}#breadcrumb`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": type,
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      inLanguage: ["en-IN", "bn-IN"],
      ...(datePublished ? { datePublished } : {}),
      ...(dateModified ? { dateModified } : {}),
      ...(image ? { primaryImageOfPage: absoluteUrl(image) } : {}),
      ...(mainEntity ? { mainEntity } : {}),
      ...(breadcrumbs.length > 0
        ? { breadcrumb: { "@id": breadcrumbId } }
        : {}),
    },
  ];

  if (breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      })),
    });
  }

  graph.push(...extraEntities);

  return { "@context": "https://schema.org", "@graph": graph };
}

export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "Medha Up",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/logo.png`,
        contentUrl: `${SITE_URL}/logo.png`,
        caption: SITE_NAME,
      },
      image: `${SITE_URL}/arushi.png`,
      description: DEFAULT_DESCRIPTION,
      email: "contact@medhaup.com",
      telephone: "+91-89108-40928",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kolkata",
        addressRegion: "West Bengal",
        addressCountry: "IN",
      },
      areaServed: { "@type": "AdministrativeArea", name: "West Bengal" },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-89108-40928",
        contactType: "admissions and student support",
        areaServed: "IN-WB",
        availableLanguage: ["Bengali", "English"],
      },
      knowsAbout: [
        "WBJEEB ANM(R) & GNM Common Entrance Test",
        "ANM and GNM nursing entrance preparation",
        "Life Science",
        "Physical Science",
        "Mathematics",
        "Basic English",
        "General Knowledge",
        "Logical Reasoning",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: "medhaup ANM GNM Preparation",
      description: DEFAULT_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: ["en-IN", "bn-IN"],
    },
  ],
};
