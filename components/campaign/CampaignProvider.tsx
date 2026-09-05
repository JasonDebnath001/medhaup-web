"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getCampaignPhase,
  type CampaignPhase,
} from "@/lib/teachersDayCampaign";

const CampaignContext = createContext<{ now: number; phase: CampaignPhase }>({
  now: 0,
  phase: "expired",
});

export function CampaignProvider({
  initialNow,
  children,
}: {
  initialNow: number;
  children: React.ReactNode;
}) {
  const [now, setNow] = useState(initialNow);
  useEffect(() => {
    // Keep elapsed time anchored to the server, even if a visitor's clock is wrong.
    const started = performance.now();
    const update = () => setNow(initialNow + performance.now() - started);
    const timer = window.setInterval(update, 1000);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
    };
  }, [initialNow]);
  return (
    <CampaignContext.Provider value={{ now, phase: getCampaignPhase(now) }}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useTeachersDayCampaign() {
  return useContext(CampaignContext);
}
