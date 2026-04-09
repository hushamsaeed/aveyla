import type { Metadata } from "next";
import { getPageContent } from "@/lib/data/pages";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Privacy Policy | Aveyla Manta Village | Maldives",
  description: "Privacy policy for Aveyla Manta Village website — data collection, cookies, and your rights.",
};

export default async function PrivacyPolicyPage() {
  const c = await getPageContent("privacy");

  return (
    <section className="bg-linen px-6 pb-section-mobile pt-32 tablet:px-14 tablet:pb-section-tablet">
      <div className="mx-auto max-w-editorial space-y-8">
        <h1 className="font-display text-display-md font-semibold text-dark-driftwood">{c.hero?.title || "Privacy Policy"}</h1>
        <p className="font-body text-body-sm text-driftwood">Last updated: {c.updated?.body || "March 2026"}</p>

        <div className="space-y-6 font-body text-body-md leading-[1.7] text-driftwood">
          <h2 className="font-display text-heading-lg font-semibold text-dark-driftwood">{c.controller?.title || "Data Controller"}</h2>
          <p>{c.controller?.body || "SEARCH MALDIVES Private Limited (Company Registration C-295/2007), operating as Aveyla Manta Village, Dharavandhoo Island, Baa Atoll, Maldives."}</p>

          <h2 className="font-display text-heading-lg font-semibold text-dark-driftwood">{c.collection?.title || "Information We Collect"}</h2>
          <p>{c.collection?.body || "When you use our contact form or make a booking enquiry, we collect your name, email address, travel dates, number of guests, and any message you provide. We do not store payment information \u2014 all payments are processed securely by our booking engine provider (IPMS247)."}</p>

          <h2 className="font-display text-heading-lg font-semibold text-dark-driftwood">{c.usage?.title || "How We Use Your Information"}</h2>
          <p>{c.usage?.body || "We use your information solely to respond to your enquiry, process your booking, and improve our services. We do not sell, rent, or share your personal data with third parties for marketing purposes."}</p>

          <h2 className="font-display text-heading-lg font-semibold text-dark-driftwood">{c.cookies?.title || "Cookies"}</h2>
          <p>{c.cookies?.body || "This website uses cookies for analytics (Google Analytics 4) and session management. You can control cookie preferences through the consent banner displayed on your first visit. Analytics cookies are not loaded until you provide consent."}</p>

          <h2 className="font-display text-heading-lg font-semibold text-dark-driftwood">{c.rights?.title || "Your Rights"}</h2>
          <p>{c.rights?.body || "You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at info@aveyla.com."}</p>

          <h2 className="font-display text-heading-lg font-semibold text-dark-driftwood">{c.contact?.title || "Contact"}</h2>
          <p>{c.contact?.body || "For privacy-related enquiries: info@aveyla.com"}</p>
        </div>
      </div>
    </section>
  );
}
