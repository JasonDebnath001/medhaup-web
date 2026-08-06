"use client";

import { createContext, useContext, useMemo } from "react";
import {
  buildSite,
  SITE_DEFAULTS,
  type SiteSettings,
  type SiteShape,
} from "@/lib/settings";

const SiteContext = createContext<SiteShape>(buildSite(SITE_DEFAULTS));

export function SiteProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  const site = useMemo(() => buildSite(settings), [settings]);
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
}

/** Drop-in replacement for the old `import { SITE } from "@/lib/site"` */
export function useSite() {
  return useContext(SiteContext);
}