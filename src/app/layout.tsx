import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteSettings } from "@/data/site-settings";
import { indexable, siteUrl } from "@/lib/seo";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/motion/page-transition";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Research in clean energy, plasma technologies, and space propulsion — people, research areas, publications, news, and openings.";

// Defaults for every page. Pages set their own title (shown as
// "<title> — <lab name>"), description and link preview via lib/seo.ts.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteSettings.labName, template: `%s — ${siteSettings.labName}` },
  description,
  openGraph: {
    title: siteSettings.labName,
    description,
    siteName: siteSettings.labName,
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: indexable ? undefined : { index: false, follow: false },
};

// Tells search engines who the lab is, for the knowledge panel in results.
const socialLinks = Object.values(siteSettings.socials).filter((url) => url !== "#");
const organization = {
  "@context": "https://schema.org",
  "@type": "ResearchOrganization",
  name: siteSettings.labName,
  alternateName: siteSettings.shortName,
  url: siteUrl,
  description,
  email: siteSettings.email,
  telephone: siteSettings.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteSettings.postalAddress.street,
    addressLocality: siteSettings.postalAddress.city,
    postalCode: siteSettings.postalAddress.postalCode,
    addressRegion: siteSettings.postalAddress.region,
    addressCountry: siteSettings.postalAddress.countryCode,
  },
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "Indian Institute of Technology Madras",
    url: "https://www.iitm.ac.in",
  },
  ...(socialLinks.length > 0 && { sameAs: socialLinks }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Set the theme before paint so there's no flash of the wrong
            theme: the visitor's saved choice, else dark. Runs a fixed,
            author-written string — no user input. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var t='dark';try{if(localStorage.getItem('theme')==='light')t='light';}catch(e){}document.documentElement.dataset.theme=t;})();",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd data={organization} />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
