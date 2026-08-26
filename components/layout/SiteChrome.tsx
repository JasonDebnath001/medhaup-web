"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import {
  CampaignAnnouncementBar,
  MobileCampaignCTA,
  useCampaignClock,
} from "@/components/campaign/RakhiCampaign";

export default function SiteChrome({
  children,
  initialNow,
}: {
  children: React.ReactNode;
  initialNow: number;
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
      {campaignVisible && <MobileCampaignCTA phase={phase} />}
    </>
  );
}
