import Link from "next/link";

const ACTIVITIES = [
  { name: "Scuba Diving", slug: "scuba-diving", desc: "PADI-certified encounters at 30+ dive sites", image: "/images/activities/scuba.jpg" },
  { name: "Snorkelling", slug: "snorkelling", desc: "Reef access directly from the shore", image: "/images/activities/snorkelling.jpg" },
  { name: "Night Snorkelling", slug: "night-snorkelling", desc: "Bioluminescent plankton under the stars", image: "/images/activities/night-snorkelling.jpg" },
  { name: "Freediving", slug: "freediving", desc: "Single-breath descents into the blue", image: "/images/activities/freediving.jpg" },
  { name: "Sandbank Trips", slug: "sandbank-trips", desc: "Private sandbars rising from the lagoon", image: "/images/activities/sandbank.jpg" },
  { name: "Big Game Fishing", slug: "big-game-fishing", desc: "Open-water pursuits beyond the atoll", image: "/images/activities/fishing.jpg" },
  { name: "Local Island Visits", slug: "local-island-visits", desc: "Dharavandhoo culture beyond the resort", image: "/images/activities/local-island.jpg" },
  { name: "Dining", slug: "/dining", desc: "Fresh catch, ocean views, no pretension", image: "/images/activities/dining.jpg" },
];

export default function ActivitiesSection() {
  return (
    <section
      id="activities"
      className="bg-gradient-to-b from-ocean-blue to-deep-ocean px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet desktop:py-section-desktop"
    >
      <div className="mx-auto max-w-content">
        <div className="mb-12">
          <h2 className="font-display text-display-md font-semibold tracking-[-0.01em] text-pure-white">
            Go Deeper.
          </h2>
          <p className="mt-3 font-body text-body-lg text-white/60">
            Eight ways to meet the ocean.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-4">
          {ACTIVITIES.map((act) => {
            const href = act.slug.startsWith("/") ? act.slug : `/activities/${act.slug}`;
            return (
              <Link
                key={act.slug}
                href={href}
                className="group relative flex h-[320px] flex-col justify-end overflow-hidden p-6"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-scroll-animation group-hover:scale-105"
                  style={{ backgroundImage: `url(${act.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/70 to-transparent" />
                <div className="relative z-10">
                  <h3 className="font-display text-heading-lg font-semibold text-pure-white">
                    {act.name}
                  </h3>
                  <p className="mt-1 font-body text-body-sm text-white/80">
                    {act.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
