"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MedhaupAI from "@/components/ai/MedhaupAI";
import {
  CampaignAnnouncementBar,
  MobileCampaignCTA,
} from "@/components/campaign/TeachersDayCampaign";
import {
  CampaignProvider,
  useTeachersDayCampaign,
} from "@/components/campaign/CampaignProvider";

export default function SiteChrome({
  children,
  initialNow,
  aiEnabled,
}: {
  children: React.ReactNode;
  initialNow: number;
  aiEnabled: boolean;
}) {
  return (
    <CampaignProvider initialNow={initialNow}>
      <PublicChrome aiEnabled={aiEnabled}>{children}</PublicChrome>
    </CampaignProvider>
  );
}

function PublicChrome({
  children,
  aiEnabled,
}: {
  children: React.ReactNode;
  aiEnabled: boolean;
}) {
  const pathname = usePathname();
  const { phase } = useTeachersDayCampaign();

  if (pathname.startsWith("/admin")) return <>{children}</>;
  const campaignVisible = phase === "live";

  return (
    <div className={campaignVisible ? "teachers-day-theme" : undefined}>
      {campaignVisible && <CampaignAnnouncementBar />}
      <Navbar campaignVisible={campaignVisible} />
      {children}
      <Footer />
      {aiEnabled && (
        <MedhaupAI key={pathname} campaignVisible={campaignVisible} />
      )}
      {campaignVisible && <MobileCampaignCTA />}
    </div>
  );
}
