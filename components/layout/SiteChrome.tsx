"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MedhaupAI from "@/components/ai/MedhaupAI";

export default function SiteChrome({
  children,
  aiEnabled,
}: {
  children: React.ReactNode;
  aiEnabled: boolean;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return <>{children}</>;

  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      {aiEnabled && <MedhaupAI key={pathname} />}
    </div>
  );
}
