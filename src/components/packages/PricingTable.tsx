"use client";

import { useState } from "react";

interface PricingTier {
  id: number;
  packageId: number | null;
  nights: number;
  label: string | null;
  dives: number | null;
  snorkelTrips: number | null;
  villageTwin: number;
  villageSingle: number;
  beachTwin: number;
  beachSingle: number;
  sortOrder: number | null;
}

function formatPrice(amount: number) {
  return `$${amount.toLocaleString()}`;
}

export default function PricingTable({ tiers }: { tiers: PricingTier[] }) {
  const [selectedDuration, setSelectedDuration] = useState(0);

  if (!tiers.length) return null;

  const tier = tiers[selectedDuration];

  return (
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
        {tier.dives ? (
          <span className="flex items-center gap-2 font-body text-body-sm text-muted-ocean">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            {tier.dives} dives
          </span>
        ) : null}
        {tier.snorkelTrips ? (
          <span className="flex items-center gap-2 font-body text-body-sm text-muted-ocean">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {tier.snorkelTrips} manta snorkel trips
          </span>
        ) : null}
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
  );
}
