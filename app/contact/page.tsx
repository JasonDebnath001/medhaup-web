import ContactPageContent from "@/components/sections/contact/ContactPageContent";
import JsonLd from "@/components/seo/JsonLd";
import { createPageMetadata, createPageSchema } from "@/lib/seo";

const title = "Contact medhaup for ANM/GNM Admission Help";
const description =
  "Contact medhaup by WhatsApp, phone or email for ANM/GNM course, fee, batch timing and admission questions. Support is available in Bengali and English.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/contact",
  keywords: [
    "contact medhaup",
    "ANM GNM admission help",
    "ANM GNM course enquiry",
  ],
});

const schema = createPageSchema({
  type: "ContactPage",
  path: "/contact",
  name: `${title} | medhaup`,
  description,
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ],
  mainEntity: {
    "@type": "ContactPoint",
    telephone: "+91-89108-40928",
    email: "contact@medhaup.com",
    contactType: "admissions and student support",
    availableLanguage: ["Bengali", "English"],
    areaServed: "IN-WB",
  },
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={schema} />
      <ContactPageContent />
    </>
  );
}
