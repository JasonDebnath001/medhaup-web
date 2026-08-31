"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MedhaupAI from "@/components/ai/MedhaupAI";
import {
  CampaignAnnouncementBar,
  MobileCampaignCTA,
  useCampaignClock,
} from "@/components/campaign/RakhiCampaign";

export default function SiteChrome({
  children,
  initialNow,
  aiEnabled,
}: {
  children: React.ReactNode;
  initialNow: number;
  aiEnabled: boolean;
}) {
  const pathname = usePathname();
  const { phase } = useCampaignClock(initialNow);

  if (pathname.startsWith("/admin")) return <>{children}</>;
  const campaignVisible = phase !== "expired";

  return (
    <>
      {campaignVisible && <CampaignAnnouncementBar phase={phase} />}
      <Navbar campaignVisible={campaignVisible} />
      {children}
      <Footer />
      {aiEnabled && (
        <MedhaupAI key={pathname} campaignVisible={campaignVisible} />
      )}
      {campaignVisible && <MobileCampaignCTA phase={phase} />}
    </>
  );
}
