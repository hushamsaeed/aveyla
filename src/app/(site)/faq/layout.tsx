import type { Metadata } from "next";
import { faqSchema } from "@/lib/structuredData";
import { getActiveFaq } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "FAQ | Aveyla Manta Village | Maldives",
  description: "Frequently asked questions about Aveyla Manta Village — transfers, diving certifications, manta season, dietary requirements, and booking.",
};

export default async function FAQLayout({ children }: { children: React.ReactNode }) {
  const faqItems = await getActiveFaq();
  const faqForSchema = faqItems.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqForSchema)).replace(/</g, "\\u003C") }}
      />
      {children}
    </>
  );
}
