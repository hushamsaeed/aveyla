"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  { category: "Transfer & Getting Here", q: "How do I get to Dharavandhoo Island?", a: "Domestic flight from Velana International Airport (Malé) to Dharavandhoo Airport (approximately 20 minutes), followed by a short transfer to Aveyla. Alternatively, speedboat transfer can be arranged." },
  { category: "Transfer & Getting Here", q: "How long is the transfer from Malé?", a: "The domestic flight is approximately 20 minutes. From Dharavandhoo Airport to Aveyla is a 5-minute drive. Total transfer time is under 30 minutes from landing." },
  { category: "Diving & Activities", q: "Do I need a diving certification?", a: "For scuba diving, a PADI Open Water certification or equivalent is required. Snorkelling and sandbank trips require no certification. Freediving sessions are recommended for certified freedivers." },
  { category: "Diving & Activities", q: "When is the best time to see manta rays?", a: "Manta season runs from June to November, with peak aggregations in August, September, and October. Outside this season, individual mantas are still regularly encountered on dives." },
  { category: "Rooms & Facilities", q: "Is Aveyla really 100% solar powered?", a: "Yes. The entire property runs on solar electricity. This is a fundamental part of our operating philosophy, not a marketing claim." },
  { category: "Rooms & Facilities", q: "What dietary requirements can you accommodate?", a: "We accommodate vegetarian, vegan, gluten-free, and halal dietary requirements with advance notice. Please inform us at the time of booking." },
  { category: "Booking & Payment", q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, and American Express. Payment is processed securely through our booking engine." },
  { category: "Booking & Payment", q: "What is your cancellation policy?", a: "Please refer to the booking confirmation for specific cancellation terms, or contact us directly at info@aveyla.com for details." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <section className="bg-deep-ocean px-6 pb-16 pt-32 tablet:px-14">
        <div className="mx-auto max-w-content">
          <h1 className="font-display text-display-lg font-light tracking-[-0.02em] text-pure-white">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 font-body text-body-lg text-white/60">
            Everything you need to know before you arrive.
          </p>
        </div>
      </section>

      <section className="bg-coral-white px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto max-w-[800px]">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border-b border-gray-200">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between py-6 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="font-body text-body-lg font-medium text-deep-ocean">{item.q}</span>
                <svg
                  className={`h-5 w-5 shrink-0 text-slate transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="pb-6">
                  <p className="font-body text-body-md leading-[1.7] text-slate">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
