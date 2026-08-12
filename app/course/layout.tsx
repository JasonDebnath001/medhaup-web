import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SiteProvider } from "@/components/provider/SiteProvider";
import { getSiteSettings } from "@/lib/data";

export const revalidate = 60;

export default async function CourseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();

  return (
    <SiteProvider settings={settings}>
      <Navbar />

      {children}

      <Footer />
    </SiteProvider>
  );
}
