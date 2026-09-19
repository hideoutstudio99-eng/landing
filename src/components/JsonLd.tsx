import { bedroom, gallery } from "@/lib/photos";
import { site } from "@/lib/site";

/** schema.org structured data. Add `address`, `telephone` and `sameAs` once those are final. */
export function JsonLd() {
  const abs = (path: string) => `${site.url}${path}`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": abs("/#website"),
        url: abs("/"),
        name: site.name,
        description: site.description,
        inLanguage: "en-IN",
      },
      {
        "@type": "LodgingBusiness",
        "@id": abs("/#lodging"),
        name: site.name,
        slogan: site.tagline,
        description: site.description,
        url: abs("/"),
        logo: abs("/icon-512.png"),
        image: [bedroom, ...gallery].map((p) => abs(p.src)),
        priceRange: `From ₹${site.fromPrice.toLocaleString("en-IN")} per night`,
        currenciesAccepted: site.currency,
        paymentAccepted: "UPI, Cash",
        checkinTime: site.checkIn,
        checkoutTime: site.checkOut,
        isPartOf: { "@id": abs("/#website") },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // "<" is escaped so the payload can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
