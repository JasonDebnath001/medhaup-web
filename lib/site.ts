export const SITE = {
  name: "medhaup",
  phone: "8910840928",
  phoneDisplay: "+91 89108 40928",
  phoneHref: "tel:+918910840928",
  email: "contact@medhaup.com",
  emailHref: "mailto:contact@medhaup.com",
  callingHours: "10 AM – 6 PM, every day",
  whatsapp: {
    number: "918910840928",
    prefill: "Hi, I have a question about the ANM/GNM course.",
    get chatUrl() {
      return `https://wa.me/${this.number}?text=${encodeURIComponent(
        this.prefill,
      )}`;
    },
    channelUrl: "https://whatsapp.com/channel/YOUR_CHANNEL_ID", // ← replace
  },
} as const;
