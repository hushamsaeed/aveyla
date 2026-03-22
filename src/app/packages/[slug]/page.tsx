"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { createClient } from "next-sanity";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "c1itog7c",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

interface SanityPricingTier {
  nights: number;
  label: string;
  dives?: number;
  snorkelTrips?: number;
  villageTwin: number;
  villageSingle: number;
  beachTwin: number;
  beachSingle: number;
}

interface SanityPackage {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  season: string | null;
  inclusions: string[];
  pricingTiers: SanityPricingTier[];
}

// Hardcoded fallback data
const FALLBACK_PACKAGES: Record<string, SanityPackage> = {
  "dive-dive-dive": {
    name: "Dive Dive Dive", slug: "dive-dive-dive",
    tagline: "For those who want nothing but reef time",
    description: "Full-board accommodation with daily guided dives across the Baa Atoll UNESCO Biosphere Reserve. Tanks and weights included.",
    season: null,
    inclusions: ["Accommodation in preferred room category", "Full board meals (Breakfast, Lunch & Dinner)", "Local area dives (Tanks & Weights included)", "Return domestic flights Malé–Dharavandhoo–Malé", "10% Service Charge & 17% TGST included", "Green tax $6 per day per person"],
    pricingTiers: [
      { nights: 3, label: "3 Nights", dives: 6, villageTwin: 1020, villageSingle: 1259, beachTwin: 1110, beachSingle: 1439 },
      { nights: 4, label: "4 Nights", dives: 8, villageTwin: 1249, villageSingle: 1576, beachTwin: 1369, beachSingle: 1818 },
      { nights: 5, label: "5 Nights", dives: 10, villageTwin: 1459, villageSingle: 1865, beachTwin: 1610, beachSingle: 2159 },
      { nights: 6, label: "6 Nights", dives: 12, villageTwin: 1688, villageSingle: 2177, beachTwin: 1865, beachSingle: 2529 },
      { nights: 7, label: "7 Nights", dives: 14, villageTwin: 1919, villageSingle: 2488, beachTwin: 2125, beachSingle: 2899 },
    ],
  },
  "dive-hanifaru": {
    name: "Dive Hanifaru", slug: "dive-hanifaru",
    tagline: "Diving and manta encounters, combined",
    description: "Combines scuba diving across the Baa Atoll with manta snorkelling excursions to Hanifaru Bay.",
    season: "June – November",
    inclusions: ["Accommodation in preferred room category", "Full board meals (Breakfast, Lunch & Dinner)", "Guided dives (Tanks & Weights included)", "Manta snorkelling trips to Hanifaru Bay", "Return domestic flights Malé–Dharavandhoo–Malé", "10% Service Charge & 17% TGST included", "Green tax $6 per day per person"],
    pricingTiers: [
      { nights: 3, label: "3 Nights", dives: 4, snorkelTrips: 2, villageTwin: 1020, villageSingle: 1255, beachTwin: 1110, beachSingle: 1434 },
      { nights: 4, label: "4 Nights", dives: 6, snorkelTrips: 2, villageTwin: 1249, villageSingle: 1579, beachTwin: 1366, beachSingle: 1810 },
      { nights: 5, label: "5 Nights", dives: 9, snorkelTrips: 3, villageTwin: 1626, villageSingle: 2030, beachTwin: 1777, beachSingle: 2329 },
      { nights: 6, label: "6 Nights", dives: 12, snorkelTrips: 4, villageTwin: 1977, villageSingle: 2510, beachTwin: 2155, beachSingle: 2818 },
      { nights: 7, label: "7 Nights", dives: 14, snorkelTrips: 4, villageTwin: 2210, villageSingle: 2777, beachTwin: 2410, beachSingle: 3189 },
    ],
  },
  "manta-madness": {
    name: "Manta Madness", slug: "manta-madness",
    tagline: "The ultimate Hanifaru Bay snorkelling experience",
    description: "A snorkelling-focused package built around manta encounters at Hanifaru Bay. No certification needed.",
    season: "June – November",
    inclusions: ["Accommodation in preferred room category", "Full board meals (Breakfast, Lunch & Dinner)", "Manta snorkelling trips to Hanifaru Bay", "Return domestic flights Malé–Dharavandhoo–Malé", "10% Service Charge & 17% TGST included", "Green tax $6 per day per person"],
    pricingTiers: [
      { nights: 3, label: "3 Nights", snorkelTrips: 2, villageTwin: 720, villageSingle: 969, beachTwin: 818, beachSingle: 1144 },
      { nights: 4, label: "4 Nights", snorkelTrips: 2, villageTwin: 810, villageSingle: 1135, beachTwin: 929, beachSingle: 1375 },
      { nights: 5, label: "5 Nights", snorkelTrips: 3, villageTwin: 970, villageSingle: 1377, beachTwin: 1119, beachSingle: 1677 },
      { nights: 6, label: "6 Nights", snorkelTrips: 4, villageTwin: 1130, villageSingle: 1620, beachTwin: 1310, beachSingle: 1977 },
      { nights: 7, label: "7 Nights", snorkelTrips: 4, villageTwin: 1220, villageSingle: 1789, beachTwin: 1429, beachSingle: 2200 },
    ],
  },
};

const PKG_IMAGES: Record<string, string> = {
  "dive-dive-dive": "/images/packages/dive-dive-dive.jpg",
  "dive-hanifaru": "/images/packages/dive-hanifaru.jpg",
  "manta-madness": "/images/packages/manta-madness.jpg",
};

function formatPrice(amount: number) {
  return `$${amount.toLocaleString()}`;
}

export default function PackageDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [pkg, setPkg] = useState<SanityPackage | null>(slug ? FALLBACK_PACKAGES[slug] || null : null);
  const [selectedDuration, setSelectedDuration] = useState(0);

  useEffect(() => {
    if (!slug) return;
    sanityClient
      .fetch<SanityPackage>(
        `*[_type == "package" && slug.current == $slug][0] { name, "slug": slug.current, tagline, description, season, inclusions, pricingTiers }`,
        { slug }
      )
      .then((data) => {
        if (data?.pricingTiers?.length) {
          setPkg(data);
          setSelectedDuration(0);
        }
      })
      .catch(() => { /* use fallback */ });
  }, [slug]);

  if (!pkg) return notFound();

  const tiers = pkg.pricingTiers || [];
  const tier = tiers[selectedDuration];
  const image = PKG_IMAGES[slug || ""] || "/images/packages/dive-dive-dive.jpg";

  return (
    <>
      {/* Hero */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
        <div className="absolute inset-0 bg-dark-driftwood/70" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 tablet:px-14">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="font-display text-display-lg font-semibold text-pure-white">{pkg.name}</h1>
            {pkg.season && (
              <span className="rounded-sm bg-terracotta/20 px-3 py-1 font-body text-body-sm font-medium text-terracotta">
                {pkg.season}
              </span>
            )}
          </div>
          <p className="mt-2 font-body text-body-lg text-coral-clay">{pkg.tagline}</p>
        </div>
      </section>

      <section className="bg-linen px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto max-w-content space-y-12">
          {/* Description */}
          {pkg.description && (
            <p className="max-w-editorial font-editorial text-body-lg leading-[1.7] text-driftwood">
              {pkg.description}
            </p>
          )}

          {/* Inclusions */}
          {pkg.inclusions?.length > 0 && (
            <div>
              <h2 className="font-display text-heading-lg font-semibold text-dark-driftwood">What&apos;s Included</h2>
              <ul className="mt-6 space-y-3">
                {pkg.inclusions.map((item) => (
                  <li key={item} className="flex items-center gap-3 font-body text-body-md text-driftwood">
                    <svg className="h-5 w-5 shrink-0 text-terracotta" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pricing Table */}
          {tiers.length > 0 && tier && (
            <div>
              <h2 className="font-display text-heading-lg font-semibold text-dark-driftwood">Pricing</h2>
              <p className="mt-2 font-body text-body-sm text-driftwood">Per person, in USD. All taxes and transfers included.</p>

              {/* Duration tabs */}
              <div className="mt-6 flex flex-wrap gap-2">
                {tiers.map((t, i) => (
                  <button
                    key={t.nights}
                    onClick={() => setSelectedDuration(i)}
                    className={`px-4 py-2 font-body text-body-sm font-medium transition-colors ${
                      i === selectedDuration
                        ? "bg-dark-driftwood text-pure-white"
                        : "bg-salt-white text-dark-driftwood hover:bg-muted-ocean/10"
                    }`}
                  >
                    {t.label || `${t.nights} Nights`}
                    {t.dives ? <span className="ml-1 opacity-60">· {t.dives} dives</span> : null}
                    {t.snorkelTrips ? <span className="ml-1 opacity-60">· {t.snorkelTrips} snorkel</span> : null}
                  </button>
                ))}
              </div>

              {/* Activity summary */}
              <div className="mt-4 flex flex-wrap gap-4">
                {tier.dives && (
                  <span className="flex items-center gap-2 font-body text-body-sm text-muted-ocean">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    {tier.dives} dives
                  </span>
                )}
                {tier.snorkelTrips && (
                  <span className="flex items-center gap-2 font-body text-body-sm text-muted-ocean">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {tier.snorkelTrips} manta snorkel trips
                  </span>
                )}
              </div>

              {/* Price grid */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-warm-sand/50">
                      <th className="py-3 text-left font-body text-body-sm font-semibold text-dark-driftwood">Room Type</th>
                      <th className="py-3 text-right font-body text-body-sm font-semibold text-dark-driftwood">Twin Share (pp)</th>
                      <th className="py-3 text-right font-body text-body-sm font-semibold text-dark-driftwood">Single (pp)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-warm-sand/30">
                      <td className="py-4 font-body text-body-md text-driftwood">Village Deluxe</td>
                      <td className="py-4 text-right font-body text-body-md font-medium text-dark-driftwood">{formatPrice(tier.villageTwin)}</td>
                      <td className="py-4 text-right font-body text-body-md text-driftwood">{formatPrice(tier.villageSingle)}</td>
                    </tr>
                    <tr className="border-b border-warm-sand/30">
                      <td className="py-4 font-body text-body-md text-driftwood">Beach Deluxe</td>
                      <td className="py-4 text-right font-body text-body-md font-medium text-dark-driftwood">{formatPrice(tier.beachTwin)}</td>
                      <td className="py-4 text-right font-body text-body-md text-driftwood">{formatPrice(tier.beachSingle)}</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-body text-body-md text-driftwood">Ocean Deluxe</td>
                      <td className="py-4 text-right font-body text-body-md font-medium text-dark-driftwood">{formatPrice(tier.beachTwin)}</td>
                      <td className="py-4 text-right font-body text-body-md text-driftwood">{formatPrice(tier.beachSingle)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/contact?package=${slug}`}
              className="bg-coral-clay px-8 py-4 font-body text-[14px] font-semibold text-dark-driftwood transition-transform duration-cta hover:scale-[1.02]"
            >
              Enquire About This Package
            </Link>
            <Link
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9607773998"}?text=${encodeURIComponent(`Hi, I'm interested in the ${pkg.name} package.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-dark-driftwood px-8 py-4 font-body text-[14px] font-medium text-dark-driftwood"
            >
              Enquire via WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
