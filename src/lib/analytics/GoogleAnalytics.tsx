"use client";

import Script from "next/script";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CONSENT_KEY = "aveyla_cookie_consent";

export default function GoogleAnalytics() {
  useEffect(() => {
    // Check if consent was previously granted
    if (typeof window !== "undefined" && window.gtag) {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (consent === "accepted") {
        window.gtag("consent", "update", { analytics_storage: "granted" });
      }
    }
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          // Default to denied — CookieConsent component will update on accept
          gtag('consent', 'default', {
            'analytics_storage': 'denied'
          });

          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
