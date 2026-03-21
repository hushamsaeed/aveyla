import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import NavBar from "@/components/global/NavBar";
import Footer from "@/components/global/Footer";
import WhatsAppButton from "@/components/global/WhatsAppButton";
import CookieConsent from "@/components/global/CookieConsent";
import GoogleAnalytics from "@/lib/analytics/GoogleAnalytics";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "600"],
  display: "swap",
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aveyla Manta Village | Maldives",
  description:
    "Affordable luxury resort on Dharavandhoo Island, Baa Atoll UNESCO Biosphere Reserve. PADI dive centre, manta ray encounters at Hanifaru Bay.",
  metadataBase: new URL("https://www.aveyla.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Aveyla Manta Village",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aveyla Manta Village — Maldives",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <GoogleAnalytics />
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <NavBar />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  );
}
