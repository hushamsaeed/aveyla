interface Tier {
  nights?: number | null;
  label?: string | null;
  dives?: number | null;
  snorkelTrips?: number | null;
  villageTwin?: number | null;
  villageSingle?: number | null;
  beachTwin?: number | null;
  beachSingle?: number | null;
}

interface PricingTiersFormProps {
  tiers?: Tier[];
  maxTiers?: number;
}

export default function PricingTiersForm({
  tiers = [],
  maxTiers = 8,
}: PricingTiersFormProps) {
  const rows = Array.from({ length: maxTiers }, (_, i) => tiers[i] || {});

  return (
    <div>
      <h3 className="font-body text-sm font-semibold text-dark-driftwood mb-3">
        Pricing Tiers
      </h3>
      <p className="font-body text-xs text-driftwood mb-4">
        Leave nights empty to skip a row. All price fields required for a row to be saved.
      </p>
      <div className="overflow-x-auto rounded-sm border border-gray-100">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-3 py-2 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Nights</th>
              <th className="px-3 py-2 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Label</th>
              <th className="px-3 py-2 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Dives</th>
              <th className="px-3 py-2 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Snorkel</th>
              <th className="px-3 py-2 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Village Twin</th>
              <th className="px-3 py-2 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Village Single</th>
              <th className="px-3 py-2 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Beach Twin</th>
              <th className="px-3 py-2 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Beach Single</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((tier, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-2 py-1.5">
                  <input
                    type="number"
                    name={`tier_nights_${i}`}
                    defaultValue={tier.nights || ""}
                    min="1"
                    placeholder="e.g. 7"
                    className="w-16 border border-gray-200 px-2 py-1.5 font-body text-sm outline-none focus:border-muted-ocean"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    type="text"
                    name={`tier_label_${i}`}
                    defaultValue={tier.label || ""}
                    placeholder="e.g. 7N/8D"
                    className="w-24 border border-gray-200 px-2 py-1.5 font-body text-sm outline-none focus:border-muted-ocean"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    type="number"
                    name={`tier_dives_${i}`}
                    defaultValue={tier.dives || ""}
                    min="0"
                    className="w-16 border border-gray-200 px-2 py-1.5 font-body text-sm outline-none focus:border-muted-ocean"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    type="number"
                    name={`tier_snorkelTrips_${i}`}
                    defaultValue={tier.snorkelTrips || ""}
                    min="0"
                    className="w-16 border border-gray-200 px-2 py-1.5 font-body text-sm outline-none focus:border-muted-ocean"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    type="number"
                    name={`tier_villageTwin_${i}`}
                    defaultValue={tier.villageTwin || ""}
                    min="0"
                    step="0.01"
                    placeholder="USD"
                    className="w-24 border border-gray-200 px-2 py-1.5 font-body text-sm outline-none focus:border-muted-ocean"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    type="number"
                    name={`tier_villageSingle_${i}`}
                    defaultValue={tier.villageSingle || ""}
                    min="0"
                    step="0.01"
                    placeholder="USD"
                    className="w-24 border border-gray-200 px-2 py-1.5 font-body text-sm outline-none focus:border-muted-ocean"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    type="number"
                    name={`tier_beachTwin_${i}`}
                    defaultValue={tier.beachTwin || ""}
                    min="0"
                    step="0.01"
                    placeholder="USD"
                    className="w-24 border border-gray-200 px-2 py-1.5 font-body text-sm outline-none focus:border-muted-ocean"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    type="number"
                    name={`tier_beachSingle_${i}`}
                    defaultValue={tier.beachSingle || ""}
                    min="0"
                    step="0.01"
                    placeholder="USD"
                    className="w-24 border border-gray-200 px-2 py-1.5 font-body text-sm outline-none focus:border-muted-ocean"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
