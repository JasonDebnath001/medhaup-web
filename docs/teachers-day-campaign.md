# Teachers’ Day 2026

The special batch price is ₹1,300 for নার্সিংলক্ষ্য 1.0 (ANM/GNM 2027), with admission through WhatsApp **8910840928**. No coupon is needed.

The campaign runs from **5 September 2026, 00:00 IST**, through **6 September 2026, 23:59:59.999 IST**. The website brief’s Saturday–Sunday weekend takes precedence over the supplied artwork’s “5 September Only” wording. Dates, price, copy, and WhatsApp destination are maintained in `lib/teachersDayCampaign.ts`.

The Teachers’ Day decorations, banners, countdown, admission price, and offer links turn off automatically at Monday midnight IST. The website uses the navy, orange, and cream palette specified in `design.md` throughout the campaign and afterwards. Campaign components consume the existing theme tokens without overriding the global brand colors. The website assistant receives the offer only while it is live. Regular course plans remain available and explicitly labelled; the website does not change checkout prices in the separate medhaup app.

Home, course, and admission metadata and structured offers share a request-time clock with the UI. Public pages render per request while existing data caches remain in place, so an expired promotion is not held in the page cache. The dynamic Open Graph image also returns the regular artwork after expiry. Social networks and search engines control when they refresh copies already cached on their side.

Run the deadline, metadata, WhatsApp, and assistant-context checks with:

```sh
node --test scripts/teachers-day.test.mjs
```

Marketing links use `teachers-day-2026` and `/#teachers-day-offer` in the admin link builder.
