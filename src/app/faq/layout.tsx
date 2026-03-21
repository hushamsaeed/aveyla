import type { Metadata } from "next";
import { faqSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "FAQ | Aveyla Manta Village | Maldives",
  description: "Frequently asked questions about Aveyla Manta Village — transfers, diving certifications, manta season, dietary requirements, and booking.",
};

const FAQ_FOR_SCHEMA = [
  { question: "How do I get to Dharavandhoo Island?", answer: "Domestic flight from Velana International Airport (Malé) to Dharavandhoo Airport (approximately 20 minutes), followed by a short transfer to Aveyla." },
  { question: "When is the best time to see manta rays?", answer: "Manta season runs from June to November, with peak aggregations in August, September, and October." },
  { question: "Do I need a diving certification?", answer: "For scuba diving, a PADI Open Water certification or equivalent is required. Snorkelling and sandbank trips require no certification." },
  { question: "Is Aveyla really 100% solar powered?", answer: "Yes. The entire property runs on solar electricity. This is a fundamental part of our operating philosophy." },
  { question: "What dietary requirements can you accommodate?", answer: "We accommodate vegetarian, vegan, gluten-free, and halal dietary requirements with advance notice." },
  { question: "What payment methods do you accept?", answer: "We accept Visa, Mastercard, and American Express. Payment is processed securely through our booking engine." },
];

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQ_FOR_SCHEMA)) }}
      />
      {children}
    </>
  );
}
