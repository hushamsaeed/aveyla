import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
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
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Aveyla Manta Village",
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
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
