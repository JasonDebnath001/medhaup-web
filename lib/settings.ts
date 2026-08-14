/* ----------------------------------------------------------------
   Site-wide settings: single source of truth for the type, the
   safe defaults, and the SITE-shaped object components consume.
   Edited from /admin/settings, stored in the site_settings table.
----------------------------------------------------------------- */

export type SiteSettings = {
  phone: string;
  phoneDisplay: string;
  email: string;
  callingHours: string;
  address: string;
  whatsappNumber: string;
  whatsappPrefill: string;
  channelUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  telegramUrl: string;
};

export const SITE_DEFAULTS: SiteSettings = {
  phone: "8910840928",
  phoneDisplay: "+91 89108 40928",
  email: "contact@medhaup.com",
  callingHours: "10 AM – 6 PM, every day",
  address: "Kolkata, West Bengal",
  whatsappNumber: "918910840928",
  whatsappPrefill: "Hi, I have a question about the ANM/GNM course.",
  channelUrl: "",
  youtubeUrl: "",
  instagramUrl: "",
  telegramUrl: "",
};

/* The derived object — same property shape as the old lib/site.ts
   SITE constant, so consumers barely change. */
export type SiteShape = {
  name: string;
  phone: string;
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  callingHours: string;
  address: string;
  socials: { youtube: string; instagram: string; telegram: string };
  whatsapp: {
    number: string;
    prefill: string;
    chatUrl: string;
    channelUrl: string;
  };
};

export function buildSite(s: SiteSettings): SiteShape {
  return {
    name: "medhaup",
    phone: s.phone,
    phoneDisplay: s.phoneDisplay,
    phoneHref: `tel:+${s.whatsappNumber}`,
    email: s.email,
    emailHref: `mailto:${s.email}`,
    callingHours: s.callingHours,
    address: s.address,
    socials: {
      youtube: s.youtubeUrl,
      instagram: s.instagramUrl,
      telegram: s.telegramUrl,
    },
    whatsapp: {
      number: s.whatsappNumber,
      prefill: s.whatsappPrefill,
      chatUrl: `https://wa.me/${s.whatsappNumber}?text=${encodeURIComponent(s.whatsappPrefill)}`,
      channelUrl: s.channelUrl,
    },
  };
}

export const waChatUrl = (s: SiteSettings, msg?: string) =>
  `https://wa.me/${s.whatsappNumber}?text=${encodeURIComponent(msg ?? s.whatsappPrefill)}`;