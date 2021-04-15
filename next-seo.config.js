const title =
  "Go Posto – The easiest way to handle clients and invoices for freelancers.";
const description =
  "The easiest way to handle clients and invoices for freelancers.";

const SEO = {
  title,
  description,
  canonical: "https://invoice-app-ivory.vercel.app/dashboard",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://invoice-app-ivory.vercel.app/dashboard",
    title,
    description,
    images: [
      {
        url: "https://invoice-app-ivory.vercel.app/dashboard/favicon.ico",
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    handle: "@BulkHaal",
    site: "@BulkHaal",
    cardType: "summary_large_image",
  },
};

export default SEO;
