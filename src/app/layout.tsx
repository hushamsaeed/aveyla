import type { Metadata } from "next";
import { Young_Serif, Lora, Instrument_Sans } from "next/font/google";
import NavBar from "@/components/global/NavBar";
import Footer from "@/components/global/Footer";
import SiteNotices from "@/components/global/SiteNotices";
import WhatsAppButton from "@/components/global/WhatsAppButton";
import CookieConsent from "@/components/global/CookieConsent";
import GoogleAnalytics from "@/lib/analytics/GoogleAnalytics";
import "./globals.css";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-young-serif",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-lora",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
  title: "Aveyla Manta Village | Maldives",
  description:
    "Beach house hotel on Dharavandhoo Island, Baa Atoll UNESCO Biosphere Reserve. Your home on the reef — manta ray encounters at Hanifaru Bay.",
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
    <html lang="en" className={`${youngSerif.variable} ${lora.variable} ${instrumentSans.variable}`}>
      <body className="font-body antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
