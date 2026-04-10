import NavBar from "@/components/global/NavBar";
import Footer from "@/components/global/Footer";
import SiteNotices from "@/components/global/SiteNotices";
import WhatsAppButton from "@/components/global/WhatsAppButton";
import CookieConsent from "@/components/global/CookieConsent";
import { getNavItems } from "@/lib/data/navigation";
import { getAllSettings } from "@/lib/data/settings";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headerLinks, footerExplore, footerInfo, settings] = await Promise.all([
    getNavItems("header"),
    getNavItems("footer_explore"),
    getNavItems("footer_info"),
    getAllSettings(),
  ]);

  const settingsMap: Record<string, string> = {};
  for (const s of settings) {
    if (s.value) settingsMap[s.key] = s.value;
  }

  return (
    <>
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>
      <SiteNotices />
      <NavBar links={headerLinks.map((l) => ({ label: l.label, href: l.href }))} />
      <main id="main-content">{children}</main>
      <Footer
        exploreLinks={footerExplore.map((l) => ({ label: l.label, href: l.href }))}
        infoLinks={footerInfo.map((l) => ({ label: l.label, href: l.href }))}
        phone={settingsMap.phone_number || "+960 668-0068"}
        email={settingsMap.contact_email || "info@aveyla.com"}
        whatsapp={settingsMap.whatsapp_number || "9606680068"}
      />
      <WhatsAppButton number={settingsMap.whatsapp_number} />
      <CookieConsent />
    </>
  );
}
