"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "aveyla_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    // Enable GA4 if gtag is available
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-deep-ocean px-6 py-4 tablet:px-14"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto flex max-w-content flex-col items-start gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
        <p className="font-body text-body-sm text-white/80">
          We use cookies for analytics to improve your experience. No personal data is shared with third parties.{" "}
          <a href="/privacy-policy" className="text-sand-gold underline">
            Privacy Policy
          </a>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={decline}
            className="px-5 py-2 font-body text-body-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="bg-sand-gold px-5 py-2 font-body text-body-sm font-semibold text-deep-ocean transition-colors hover:bg-sand-gold/90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
