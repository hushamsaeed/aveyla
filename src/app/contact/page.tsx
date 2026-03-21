"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot check
    if (data.get("website")) return;

    try {
      await fetch("/api/contact", { method: "POST", body: data });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try WhatsApp or email instead.");
    }
  };

  return (
    <>
      <section className="bg-deep-ocean px-6 pb-16 pt-32 tablet:px-14">
        <div className="mx-auto max-w-content">
          <h1 className="font-display text-display-lg font-light tracking-[-0.02em] text-pure-white">
            Get in Touch
          </h1>
          <p className="mt-4 font-body text-body-lg text-white/60">
            We respond within 24 hours. Or reach us instantly on WhatsApp.
          </p>
        </div>
      </section>

      <section className="bg-coral-white px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto flex max-w-content flex-col gap-14 tablet:flex-row">
          {/* Form */}
          <div className="flex-1">
            {submitted ? (
              <div className="bg-lagoon-light p-8">
                <h2 className="font-display text-heading-lg font-semibold text-deep-ocean">Message Sent</h2>
                <p className="mt-2 font-body text-body-md text-slate">Thank you. We&apos;ll reply within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot */}
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                <div>
                  <label htmlFor="name" className="font-body text-body-sm font-medium text-deep-ocean">Name</label>
                  <input id="name" name="name" required className="mt-1 w-full border border-gray-200 bg-white px-4 py-3 font-body text-body-md text-deep-ocean outline-none focus:border-ocean-blue" placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="email" className="font-body text-body-sm font-medium text-deep-ocean">Email</label>
                  <input id="email" name="email" type="email" required className="mt-1 w-full border border-gray-200 bg-white px-4 py-3 font-body text-body-md text-deep-ocean outline-none focus:border-ocean-blue" placeholder="you@example.com" />
                </div>
                <div className="flex gap-6">
                  <div className="flex-1">
                    <label htmlFor="arrival" className="font-body text-body-sm font-medium text-deep-ocean">Arrival Date</label>
                    <input id="arrival" name="arrival" type="date" className="mt-1 w-full border border-gray-200 bg-white px-4 py-3 font-body text-body-md text-deep-ocean outline-none focus:border-ocean-blue" />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="departure" className="font-body text-body-sm font-medium text-deep-ocean">Departure Date</label>
                    <input id="departure" name="departure" type="date" className="mt-1 w-full border border-gray-200 bg-white px-4 py-3 font-body text-body-md text-deep-ocean outline-none focus:border-ocean-blue" />
                  </div>
                </div>
                <div>
                  <label htmlFor="guests" className="font-body text-body-sm font-medium text-deep-ocean">Number of Guests</label>
                  <input id="guests" name="guests" type="number" min={1} defaultValue={2} className="mt-1 w-full border border-gray-200 bg-white px-4 py-3 font-body text-body-md text-deep-ocean outline-none focus:border-ocean-blue" />
                </div>
                <div>
                  <label htmlFor="message" className="font-body text-body-sm font-medium text-deep-ocean">Message</label>
                  <textarea id="message" name="message" rows={4} className="mt-1 w-full border border-gray-200 bg-white px-4 py-3 font-body text-body-md text-deep-ocean outline-none focus:border-ocean-blue" placeholder="Tell us about your trip..." />
                </div>
                <button type="submit" className="w-full bg-sand-gold py-4 font-body text-[14px] font-semibold text-deep-ocean transition-colors hover:bg-sand-gold/90">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full space-y-8 tablet:w-[400px]">
            <h2 className="font-display text-heading-lg font-semibold text-deep-ocean">Direct Contact</h2>
            <a href="https://wa.me/9607773998" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-body text-body-md text-ocean-blue hover:underline">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              +960 777 3998 (WhatsApp)
            </a>
            <a href="tel:+9607773998" className="flex items-center gap-3 font-body text-body-md text-slate">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              +960 777 3998
            </a>
            <a href="mailto:info@aveyla.com" className="flex items-center gap-3 font-body text-body-md text-slate">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              info@aveyla.com
            </a>
            <div className="h-[200px] w-full bg-lagoon-light flex items-center justify-center">
              <span className="font-body text-body-md text-slate">Map — Dharavandhoo Island</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
