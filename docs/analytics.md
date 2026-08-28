# GA4 conversion tracking

The website emits these funnel events when `NEXT_PUBLIC_GA_ID` is configured:

| Event | Trigger |
| --- | --- |
| `whatsapp_click` | A visitor opens a WhatsApp chat or channel link |
| `phone_click` | A visitor taps a `tel:` link |
| `enroll_click` | A visitor clicks an internal link to `/admission` |
| `app_download_click` | A visitor opens a real Google Play or Apple App Store listing |
| `generate_lead` | An admission or contact form is accepted successfully |
| `begin_checkout` | A visitor starts a product order through WhatsApp |
| `purchase` | Available through `trackPurchase`; call only after verified payment |

## GA4 setup required after deployment

Receiving an event does not automatically make every event a GA4 Key Event. In
Google Analytics, first verify the events in Realtime/DebugView. Then open
**Admin → Data display → Key events** and add the exact event names. They can be
registered before the first event arrives.

Use `generate_lead` and `purchase` as primary Key Events. If calls and WhatsApp
chats are treated as leads operationally, also mark `phone_click` and
`whatsapp_click`. Keep `enroll_click`, `app_download_click`, and `begin_checkout`
as funnel steps unless the business intentionally wants those intent signals in
its headline Key Event total.

Checkout and payment for course admission happen inside the medhaup app, outside
this website. The app must use the same GA4/Firebase property and emit
`begin_checkout` when its checkout starts and `purchase` only after payment is
confirmed. A purchase should include a unique `transaction_id`, `currency`,
`value`, and `items` so revenue is deduplicated and reported correctly.

To analyze the custom parameters (`placement`, `lead_type`, `app_store`, and
`checkout_type`) in standard GA4 reports, register them as event-scoped custom
dimensions in the GA4 property.
