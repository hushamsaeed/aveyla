import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Activities | Aveyla Manta Village | Maldives",
  description: "Scuba diving, snorkelling, freediving, night snorkelling, sandbank trips, fishing, island visits, and dining at Aveyla Manta Village, Baa Atoll.",
};

const ACTIVITIES = [
  { name: "Scuba Diving", slug: "scuba-diving", desc: "PADI-certified encounters at 30+ dive sites", image: "/images/activities/scuba.jpg" },
  { name: "Snorkelling", slug: "snorkelling", desc: "Reef access directly from the shore", image: "/images/activities/snorkelling.jpg" },
  { name: "Night Snorkelling", slug: "night-snorkelling", desc: "Bioluminescent plankton under the stars", image: "/images/activities/night-snorkelling.jpg" },
  { name: "Freediving", slug: "freediving", desc: "Single-breath descents into the blue", image: "/images/activities/freediving.jpg" },
  { name: "Sandbank Trips", slug: "sandbank-trips", desc: "Private sandbars rising from the lagoon", image: "/images/activities/sandbank.jpg" },
  { name: "Big Game Fishing", slug: "big-game-fishing", desc: "Open-water pursuits beyond the atoll", image: "/images/activities/fishing.jpg" },
  { name: "Local Island Visits", slug: "local-island-visits", desc: "Dharavandhoo culture beyond the resort", image: "/images/activities/local-island.jpg" },
];

export default function ActivitiesPage() {
  return (
    <>
      <section className="bg-dark-driftwood px-6 pb-16 pt-32 tablet:px-14">
        <div className="mx-auto max-w-content">
          <h1 className="font-display text-display-lg font-light tracking-[-0.02em] text-pure-white">Activities</h1>
          <p className="mt-4 font-body text-body-lg text-white/60">Eight ways to meet the ocean.</p>
        </div>
      </section>
      <section className="bg-linen px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto grid max-w-content gap-6 tablet:grid-cols-2 desktop:grid-cols-4">
          {ACTIVITIES.map((act) => (
            <Link key={act.slug} href={`/activities/${act.slug}`} className="group relative flex h-[320px] flex-col justify-end overflow-hidden p-6">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-scroll-animation group-hover:scale-105" style={{ backgroundImage: `url(${act.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-driftwood/70 to-transparent" />
              <div className="relative z-10">
                <h2 className="font-display text-heading-lg font-semibold text-pure-white">{act.name}</h2>
                <p className="mt-1 font-body text-body-sm text-white/80">{act.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
