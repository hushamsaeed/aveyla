import Link from "next/link";
import { notFound } from "next/navigation";

interface Activity {
  name: string;
  desc: string;
  image: string;
  safety?: string[];
  related: string[];
}

const ACTIVITIES: Record<string, Activity> = {
  "scuba-diving": {
    name: "Scuba Diving",
    desc: "Aveyla's PADI dive centre operates daily guided dives across more than thirty sites in the Baa Atoll. From the shallow house reef — accessible from the beach — to the deep channels where pelagics patrol, every dive is led by instructors who have logged thousands of hours in these waters.",
    image: "/images/activities/scuba.jpg",
    safety: [
      "PADI Open Water certification or equivalent (minimum)",
      "Medical fitness declaration required",
      "Minimum age: 12 years (with guardian)",
      "Equipment provided: BCD, regulator, wetsuit, mask, fins",
      "All dives include certified dive guide",
    ],
    related: ["snorkelling", "freediving", "night-snorkelling"],
  },
  "snorkelling": {
    name: "Snorkelling",
    desc: "The house reef begins ten metres from the beach. Mask, snorkel, and fins are all that's needed to enter a world of reef sharks, eagle rays, and schooling fusiliers. Guided excursions reach outer reefs and Hanifaru Bay during manta season.",
    image: "/images/activities/snorkelling.jpg",
    related: ["scuba-diving", "night-snorkelling", "sandbank-trips"],
  },
  "night-snorkelling": {
    name: "Night Snorkelling",
    desc: "After dark, the reef transforms. Torch-lit excursions reveal bioluminescent plankton, hunting octopuses, and sleeping parrotfish. The experience is guided and begins from the beach.",
    image: "/images/activities/night-snorkelling.jpg",
    related: ["snorkelling", "scuba-diving", "freediving"],
  },
  "freediving": {
    name: "Freediving",
    desc: "Single-breath descents into the blue channels of the Baa Atoll. Guided sessions for certified freedivers, with safety divers on every excursion. The clarity here makes depth feel effortless.",
    image: "/images/activities/freediving.jpg",
    safety: [
      "AIDA or equivalent freediving certification recommended",
      "Medical fitness declaration required",
      "Minimum age: 16 years",
      "Safety diver accompanies every session",
      "Equipment provided on request",
    ],
    related: ["scuba-diving", "snorkelling", "night-snorkelling"],
  },
  "sandbank-trips": {
    name: "Sandbank Trips",
    desc: "Private sandbars emerge from the lagoon at low tide — islands that exist for hours before the ocean reclaims them. Picnic lunch, snorkelling gear, and nothing else for miles.",
    image: "/images/activities/sandbank.jpg",
    related: ["snorkelling", "big-game-fishing", "local-island-visits"],
  },
  "big-game-fishing": {
    name: "Big Game Fishing",
    desc: "Beyond the atoll edge, the Indian Ocean drops away. Sailfish, tuna, wahoo, and mahi-mahi run these waters. Half-day and full-day charters depart from Dharavandhoo harbour.",
    image: "/images/activities/fishing.jpg",
    related: ["sandbank-trips", "local-island-visits", "scuba-diving"],
  },
  "local-island-visits": {
    name: "Local Island Visits",
    desc: "Dharavandhoo is a living island — not a resort island. Walk the village, visit the school, meet the people who share this atoll with the mantas. Cultural excursions to neighbouring islands available.",
    image: "/images/activities/local-island.jpg",
    related: ["sandbank-trips", "big-game-fishing", "snorkelling"],
  },
};

const ACTIVITY_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(ACTIVITIES).map(([slug, a]) => [slug, a.name])
);

export function generateStaticParams() {
  return Object.keys(ACTIVITIES).map((slug) => ({ slug }));
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = ACTIVITIES[slug];
  if (!activity) notFound();

  return (
    <>
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${activity.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-driftwood/80" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 tablet:px-14">
          <h1 className="font-display text-display-lg font-light tracking-[-0.02em] text-pure-white">{activity.name}</h1>
        </div>
      </section>

      <section className="bg-linen px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto max-w-content space-y-12">
          <p className="max-w-editorial font-body text-body-lg leading-[1.7] text-driftwood">{activity.desc}</p>

          {activity.safety && (
            <div className="bg-salt-white p-8">
              <h2 className="font-display text-heading-lg font-semibold text-dark-driftwood">Requirements & Safety</h2>
              <ul className="mt-4 space-y-2">
                {activity.safety.map((item) => (
                  <li key={item} className="flex items-start gap-2 font-body text-body-md text-driftwood">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <Link href={process.env.NEXT_PUBLIC_IPMS247_URL || "/contact"} className="bg-coral-clay px-8 py-4 font-body text-[14px] font-semibold text-dark-driftwood">
              Book This Activity
            </Link>
            <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9607773998"}`} target="_blank" rel="noopener noreferrer" className="border border-dark-driftwood px-8 py-4 font-body text-[14px] font-medium text-dark-driftwood">
              Ask a Question
            </Link>
          </div>

          {/* Related */}
          <div>
            <h2 className="font-display text-heading-lg font-semibold text-dark-driftwood">You might also like</h2>
            <div className="mt-6 grid gap-6 tablet:grid-cols-3">
              {activity.related.map((relSlug) => (
                <Link key={relSlug} href={`/activities/${relSlug}`} className="group flex flex-col overflow-hidden bg-white">
                  <div className="h-[200px] bg-cover bg-center transition-transform duration-scroll-animation group-hover:scale-105" style={{ backgroundImage: `url(/images/activities/${relSlug.replace("big-game-", "").replace("local-island-", "local-")}.jpg)` }} />
                  <div className="p-4">
                    <h3 className="font-display text-heading-md font-semibold text-dark-driftwood">{ACTIVITY_NAMES[relSlug]}</h3>
                    <span className="font-body text-body-sm text-muted-ocean">Learn More →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
