import NavBar from "@/components/global/NavBar";
import Footer from "@/components/global/Footer";
import SiteNotices from "@/components/global/SiteNotices";
import WhatsAppButton from "@/components/global/WhatsAppButton";
import CookieConsent from "@/components/global/CookieConsent";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>
      <SiteNotices />
      <NavBar />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </>
  );
}
