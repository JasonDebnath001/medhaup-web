/* ----------------------------------------------------------------
  80th INDEPENDENCE DAY OFFER — the single source of truth.
  Everything festive on the site reads from this file and is
  gated by isOfferLive(), so the theme appears and disappears
  on its own. To run a future offer, just edit the dates here.
----------------------------------------------------------------- */

export const OFFER = {
  title: "80th Independence Day Offer",
  badge: "80TH INDEPENDENCE DAY · WEEKEND ONLY",
  price: 1500,
  regularPrice: 1800,
  /* Live: Saturday 15 Aug 00:00 IST → Sunday 16 Aug midnight IST */
  start: "2026-08-15T00:00:00+05:30",
  end: "2026-08-17T00:00:00+05:30",
  endsLabel: "Ends Sunday midnight",
  whatsappPrefill:
    "Hi! I want to claim the 80th Independence Day offer (Rs 1500) for the ANM/GNM course.",
  shareText:
    "medhaup Independence Day Sale — full 12-month ANM/GNM course at Rs 1500 for EVERYONE, this weekend only. Check it out: https://medhaup.com/course#fees",
} as const;

export const isOfferLive = (now: number = Date.now()) =>
  now >= Date.parse(OFFER.start) && now < Date.parse(OFFER.end);

export const offerMsLeft = (now: number = Date.now()) =>
  Math.max(0, Date.parse(OFFER.end) - now);

export const offerWaUrl = (waNumber: string) =>
  `https://wa.me/${waNumber}?text=${encodeURIComponent(OFFER.whatsappPrefill)}`;

export const offerShareUrl = () =>
  `https://wa.me/?text=${encodeURIComponent(OFFER.shareText)}`;