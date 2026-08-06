import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/data";
import { SiteProvider } from "@/components/provider/SiteProvider";

export const revalidate = 60;

export default async function SiteLayout({
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