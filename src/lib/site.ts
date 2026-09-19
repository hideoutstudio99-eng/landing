const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  name: "Hideout Studios",
  tagline: "Your space. Your escape.",
  title: "Hideout Studios — Private studio stay, book direct",
  description:
    "One private studio that sleeps 4, from ₹2,500 a night. Live availability, honest pricing and no platform fees — book direct and message the host on WhatsApp.",
  keywords: [
    "Hideout Studios",
    "private studio stay",
    "book direct",
    "studio apartment for rent",
    "short stay",
    "no platform fees",
  ],
  // Set NEXT_PUBLIC_SITE_URL in production; every canonical, OG and sitemap URL derives from it.
  url: configuredUrl.replace(/\/+$/, ""),
  locale: "en_IN",
  themeColor: "#E9474E",
  checkIn: "14:00",
  checkOut: "11:00",
  fromPrice: 2500,
  currency: "INR",
} as const;
