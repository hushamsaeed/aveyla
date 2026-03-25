"use client";

import { useState, useEffect } from "react";
import { createClient } from "next-sanity";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "c1itog7c",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  category: string;
}

const FALLBACK_FAQ: FaqItem[] = [
  { _id: "1", category: "Transfer & Getting Here", question: "How do I get to Dharavandhoo Island?", answer: "Domestic flight from Velana International Airport (Malé) to Dharavandhoo Airport (approximately 20 minutes), followed by a short transfer to Aveyla." },
  { _id: "2", category: "Transfer & Getting Here", question: "How long is the transfer from Malé?", answer: "The domestic flight is approximately 20 minutes. From Dharavandhoo Airport to Aveyla is a 5-minute drive." },
  { _id: "3", category: "Diving & Activities", question: "Do I need a diving certification?", answer: "For scuba diving, a PADI Open Water certification or equivalent is required. Snorkelling requires no certification." },
  { _id: "4", category: "Diving & Activities", question: "When is the best time to see manta rays?", answer: "Manta season runs from June to November, with peak aggregations in August, September, and October." },
  { _id: "5", category: "Rooms & Facilities", question: "Is Aveyla really 100% solar powered?", answer: "Yes. The entire property runs on solar electricity." },
  { _id: "6", category: "Rooms & Facilities", question: "What dietary requirements can you accommodate?", answer: "We accommodate vegetarian, vegan, gluten-free, and halal dietary requirements with advance notice." },
  { _id: "7", category: "Booking & Payment", question: "What payment methods do you accept?", answer: "We accept Visa, Mastercard, and American Express." },
  { _id: "8", category: "Booking & Payment", question: "What is your cancellation policy?", answer: "Please refer to the booking confirmation or contact us at info@aveyla.com." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqItems, setFaqItems] = useState<FaqItem[]>(FALLBACK_FAQ);

  useEffect(() => {
    sanityClient
      .fetch<FaqItem[]>(`*[_type == "faqItem" && active == true] | order(sortOrder asc) { _id, question, answer, category }`)
      .then((data) => {
        if (data?.length) setFaqItems(data);
      })
      .catch(() => { /* use fallback */ });
  }, []);

  return (
    <>
      <section className="bg-dark-driftwood px-6 pb-16 pt-32 tablet:px-14">
        <div className="mx-auto max-w-content">
          <h1 className="font-display text-display-lg font-light tracking-[-0.02em] text-pure-white">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 font-body text-body-lg text-white/60">
            Everything you need to know before you arrive.
          </p>
        </div>
      </section>

      <section className="bg-linen px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto max-w-[800px]">
          {faqItems.map((item, i) => (
            <div key={item._id} className="border-b border-gray-200">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between py-6 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="font-body text-body-lg font-medium text-dark-driftwood">{item.question}</span>
                <svg
                  className={`h-5 w-5 shrink-0 text-driftwood transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="pb-6">
                  <p className="font-body text-body-md leading-[1.7] text-driftwood">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
