"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";

interface PricingTier {
  nights: number;
  label: string;
  dives?: number;
  snorkelTrips?: number;
  rooms: {
    village: { twin: number; single: number };
    beach: { twin: number; single: number };
  };
}

interface PackageData {
  name: string;
  tagline: string;
  description: string;
  season: string | null;
  image: string;
  inclusions: string[];
  pricing: PricingTier[];
}

const PACKAGES: Record<string, PackageData> = {
  "dive-dive-dive": {
    name: "Dive Dive Dive",
    tagline: "For those who want nothing but reef time",
    description: "Full-board accommodation with daily guided dives across the Baa Atoll UNESCO Biosphere Reserve. Tanks and weights included. Over 30 dive sites accessible from Dharavandhoo.",
    season: null,
    image: "/images/packages/dive-dive-dive.jpg",
    inclusions: [
      "Accommodation in preferred room category",
      "Full board meals (Breakfast, Lunch & Dinner)",
      "Local area dives (Tanks & Weights included)",
      "Return domestic flights Malé–Dharavandhoo–Malé",
      "10% Service Charge & 17% TGST included",
      "Green tax $6 per day per person",
    ],
    pricing: [
      { nights: 3, label: "3 Nights", dives: 6, rooms: { village: { twin: 1020, single: 1259 }, beach: { twin: 1110, single: 1439 } } },
      { nights: 4, label: "4 Nights", dives: 8, rooms: { village: { twin: 1249, single: 1576 }, beach: { twin: 1369, single: 1818 } } },
      { nights: 5, label: "5 Nights", dives: 10, rooms: { village: { twin: 1459, single: 1865 }, beach: { twin: 1610, single: 2159 } } },
      { nights: 6, label: "6 Nights", dives: 12, rooms: { village: { twin: 1688, single: 2177 }, beach: { twin: 1865, single: 2529 } } },
      { nights: 7, label: "7 Nights", dives: 14, rooms: { village: { twin: 1919, single: 2488 }, beach: { twin: 2125, single: 2899 } } },
    ],
  },
  "dive-hanifaru": {
    name: "Dive Hanifaru",
    tagline: "Diving and manta encounters, combined",
    description: "Combines scuba diving across the Baa Atoll with manta snorkelling excursions to Hanifaru Bay. The best of both worlds — reef dives and the greatest manta aggregation on earth.",
    season: "June – November",
    image: "/images/packages/dive-hanifaru.jpg",
    inclusions: [
      "Accommodation in preferred room category",
      "Full board meals (Breakfast, Lunch & Dinner)",
      "Guided dives (Tanks & Weights included)",
      "Manta snorkelling trips to Hanifaru Bay",
      "Return domestic flights Malé–Dharavandhoo–Malé",
      "10% Service Charge & 17% TGST included",
      "Green tax $6 per day per person",
    ],
    pricing: [
      { nights: 3, label: "3 Nights", dives: 4, snorkelTrips: 2, rooms: { village: { twin: 1020, single: 1255 }, beach: { twin: 1110, single: 1434 } } },
      { nights: 4, label: "4 Nights", dives: 6, snorkelTrips: 2, rooms: { village: { twin: 1249, single: 1579 }, beach: { twin: 1366, single: 1810 } } },
      { nights: 5, label: "5 Nights", dives: 9, snorkelTrips: 3, rooms: { village: { twin: 1626, single: 2030 }, beach: { twin: 1777, single: 2329 } } },
      { nights: 6, label: "6 Nights", dives: 12, snorkelTrips: 4, rooms: { village: { twin: 1977, single: 2510 }, beach: { twin: 2155, single: 2818 } } },
      { nights: 7, label: "7 Nights", dives: 14, snorkelTrips: 4, rooms: { village: { twin: 2210, single: 2777 }, beach: { twin: 2410, single: 3189 } } },
    ],
  },
  "manta-madness": {
    name: "Manta Madness",
    tagline: "The ultimate Hanifaru Bay snorkelling experience",
    description: "A snorkelling-focused package built around manta encounters at Hanifaru Bay. No certification needed — just mask, snorkel, and the largest manta ray congregation on earth.",
    season: "June – November",
    image: "/images/packages/manta-madness.jpg",
    inclusions: [
      "Accommodation in preferred room category",
      "Full board meals (Breakfast, Lunch & Dinner)",
      "Manta snorkelling trips to Hanifaru Bay",
      "Return domestic flights Malé–Dharavandhoo–Malé",
      "10% Service Charge & 17% TGST included",
      "Green tax $6 per day per person",
    ],
    pricing: [
      { nights: 3, label: "3 Nights", snorkelTrips: 2, rooms: { village: { twin: 720, single: 969 }, beach: { twin: 818, single: 1144 } } },
      { nights: 4, label: "4 Nights", snorkelTrips: 2, rooms: { village: { twin: 810, single: 1135 }, beach: { twin: 929, single: 1375 } } },
      { nights: 5, label: "5 Nights", snorkelTrips: 3, rooms: { village: { twin: 970, single: 1377 }, beach: { twin: 1119, single: 1677 } } },
      { nights: 6, label: "6 Nights", snorkelTrips: 4, rooms: { village: { twin: 1130, single: 1620 }, beach: { twin: 1310, single: 1977 } } },
      { nights: 7, label: "7 Nights", snorkelTrips: 4, rooms: { village: { twin: 1220, single: 1789 }, beach: { twin: 1429, single: 2200 } } },
    ],
  },
};

function formatPrice(amount: number) {
  return `$${amount.toLocaleString()}`;
}

export default function PackageDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const pkg = slug ? PACKAGES[slug] : undefined;
  if (!pkg) notFound();

  const [selectedDuration, setSelectedDuration] = useState(0);
  const tier = pkg.pricing[selectedDuration];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pkg.image})` }} />
        <div className="absolute inset-0 bg-deep-ocean/70" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 tablet:px-14">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-display-lg font-semibold text-pure-white">{pkg.name}</h1>
            {pkg.season && (
              <span className="rounded-sm bg-reef-teal/20 px-3 py-1 font-body text-body-sm font-medium text-reef-teal">
                {pkg.season}
              </span>
            )}
          </div>
          <p className="mt-2 font-body text-body-lg text-sand-gold">{pkg.tagline}</p>
        </div>
      </section>

      <section className="bg-coral-white px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto max-w-content space-y-12">
          {/* Description */}
          <p className="max-w-editorial font-body text-body-lg leading-[1.7] text-slate">
            {pkg.description}
          </p>

          {/* Inclusions */}
          <div>
            <h2 className="font-display text-heading-lg font-semibold text-deep-ocean">What&apos;s Included</h2>
            <ul className="mt-6 space-y-3">
              {pkg.inclusions.map((item) => (
                <li key={item} className="flex items-center gap-3 font-body text-body-md text-slate">
                  <svg className="h-5 w-5 shrink-0 text-reef-teal" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing Table */}
          <div>
            <h2 className="font-display text-heading-lg font-semibold text-deep-ocean">Pricing</h2>
            <p className="mt-2 font-body text-body-sm text-slate">Per person, in USD. All taxes and transfers included.</p>

            {/* Duration tabs */}
            <div className="mt-6 flex flex-wrap gap-2">
              {pkg.pricing.map((t, i) => (
                <button
                  key={t.nights}
                  onClick={() => setSelectedDuration(i)}
                  className={`px-4 py-2 font-body text-body-sm font-medium transition-colors ${
                    i === selectedDuration
                      ? "bg-deep-ocean text-pure-white"
                      : "bg-lagoon-light text-deep-ocean hover:bg-ocean-blue/10"
                  }`}
                >
                  {t.label}
                  {t.dives && <span className="ml-1 text-white/60">· {t.dives} dives</span>}
                  {t.snorkelTrips && <span className="ml-1 text-white/60">· {t.snorkelTrips} snorkel trips</span>}
                </button>
              ))}
            </div>

            {/* Activity summary */}
            <div className="mt-4 flex flex-wrap gap-4">
              {tier.dives && (
                <span className="flex items-center gap-2 font-body text-body-sm text-ocean-blue">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  {tier.dives} dives
                </span>
              )}
              {tier.snorkelTrips && (
                <span className="flex items-center gap-2 font-body text-body-sm text-ocean-blue">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {tier.snorkelTrips} manta snorkel trips
                </span>
              )}
            </div>

            {/* Price grid */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-left font-body text-body-sm font-semibold text-deep-ocean">Room Type</th>
                    <th className="py-3 text-right font-body text-body-sm font-semibold text-deep-ocean">Twin Share (pp)</th>
                    <th className="py-3 text-right font-body text-body-sm font-semibold text-deep-ocean">Single (pp)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 font-body text-body-md text-slate">Village Deluxe</td>
                    <td className="py-4 text-right font-body text-body-md font-medium text-deep-ocean">{formatPrice(tier.rooms.village.twin)}</td>
                    <td className="py-4 text-right font-body text-body-md text-slate">{formatPrice(tier.rooms.village.single)}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 font-body text-body-md text-slate">Beach Deluxe</td>
                    <td className="py-4 text-right font-body text-body-md font-medium text-deep-ocean">{formatPrice(tier.rooms.beach.twin)}</td>
                    <td className="py-4 text-right font-body text-body-md text-slate">{formatPrice(tier.rooms.beach.single)}</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-body text-body-md text-slate">Ocean Deluxe</td>
                    <td className="py-4 text-right font-body text-body-md font-medium text-deep-ocean">{formatPrice(tier.rooms.beach.twin)}</td>
                    <td className="py-4 text-right font-body text-body-md text-slate">{formatPrice(tier.rooms.beach.single)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/contact?package=${slug}`}
              className="bg-sand-gold px-8 py-4 font-body text-[14px] font-semibold text-deep-ocean transition-transform duration-cta hover:scale-[1.02]"
            >
              Enquire About This Package
            </Link>
            <Link
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9607773998"}?text=${encodeURIComponent(`Hi, I'm interested in the ${pkg.name} package.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-deep-ocean px-8 py-4 font-body text-[14px] font-medium text-deep-ocean"
            >
              Enquire via WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
