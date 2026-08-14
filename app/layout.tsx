import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import AnalyticsEvents from "@/components/provider/AnalyticsEvents";
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
  title: "MedhaUp — ANM/GNM Preparation",
  description: "Concept Clear. Score Up.",
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
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