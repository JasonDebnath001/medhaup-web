import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import AnalyticsEvents from "@/components/provider/AnalyticsEvents";
import AttributionCapture from "@/components/provider/AttributionCapture";
import SiteChrome from "@/components/layout/SiteChrome";
import { SiteProvider } from "@/components/provider/SiteProvider";
import JsonLd from "@/components/seo/JsonLd";
import { getAIConfig } from "@/lib/ai/config";
import { isPRLabsReady } from "@/lib/ai/prlabs";
import { getSiteSettings } from "@/lib/data";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  siteSchema,
} from "@/lib/seo";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  keywords: DEFAULT_KEYWORDS,
  manifest: "/manifest.webmanifest",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
    url: "/",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "medhaup ANM GNM 2027 preparation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  other: {
    "geo.region": "IN-WB",
    "geo.placename": "West Bengal",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a0c70",
  colorScheme: "light",
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const revalidate = 60;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  const aiConfig = getAIConfig();
  const aiEnabled =
    aiConfig.enabled &&
    (isPRLabsReady(aiConfig) || process.env.NODE_ENV !== "production");

  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} ${inter.variable} font-sans antialiased`}
      >
        <JsonLd data={siteSchema} />
        <SiteProvider settings={settings}>
          {/* Request-time seed keeps the client clock hydration-stable. */}
          {/* eslint-disable-next-line react-hooks/purity */}
          <SiteChrome initialNow={Date.now()} aiEnabled={aiEnabled}>
            {children}
          </SiteChrome>
        </SiteProvider>
        <AttributionCapture />
        {GA_ID && (
          <>
            <GoogleAnalytics gaId={GA_ID} />
            <AnalyticsEvents />
          </>
        )}
      </body>
    </html>
  );
}
