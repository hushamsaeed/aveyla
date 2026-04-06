"use client";

import { useState } from "react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  sortOrder: number | null;
  active: number | null;
}

export default function FaqClient({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
          {items.map((item, i) => (
            <div key={item.id} className="border-b border-gray-200">
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
