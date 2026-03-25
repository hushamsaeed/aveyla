import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import { allActivitiesQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Activities | Aveyla Manta Village | Maldives",
  description: "Scuba diving, snorkelling, freediving, night snorkelling, sandbank trips, fishing, island visits, and dining at Aveyla Manta Village, Baa Atoll.",
};

const FALLBACK_ACTIVITIES = [
  { name: "Scuba Diving", slug: "scuba-diving", shortDescription: "PADI-certified encounters at 30+ dive sites", heroImage: null },
  { name: "Snorkelling", slug: "snorkelling", shortDescription: "Reef access directly from the shore", heroImage: null },
  { name: "Night Snorkelling", slug: "night-snorkelling", shortDescription: "Bioluminescent plankton under the stars", heroImage: null },
  { name: "Freediving", slug: "freediving", shortDescription: "Single-breath descents into the blue", heroImage: null },
  { name: "Sandbank Trips", slug: "sandbank-trips", shortDescription: "Private sandbars rising from the lagoon", heroImage: null },
  { name: "Big Game Fishing", slug: "big-game-fishing", shortDescription: "Open-water pursuits beyond the atoll", heroImage: null },
  { name: "Local Island Visits", slug: "local-island-visits", shortDescription: "Dharavandhoo culture beyond the resort", heroImage: null },
];

const FALLBACK_IMAGES: Record<string, string> = {
  "scuba-diving": "/images/activities/scuba.jpg",
  "snorkelling": "/images/activities/snorkelling.jpg",
  "night-snorkelling": "/images/activities/night-snorkelling.jpg",
  "freediving": "/images/activities/freediving.jpg",
  "sandbank-trips": "/images/activities/sandbank.jpg",
  "big-game-fishing": "/images/activities/fishing.jpg",
  "local-island-visits": "/images/activities/local-island.jpg",
};

function getActivityImage(activity: { heroImage?: unknown; slug: string }) {
  if (activity.heroImage) {
    return urlFor(activity.heroImage).width(600).height(400).format("webp").url();
  }
  return FALLBACK_IMAGES[activity.slug] || "/images/activities/scuba.jpg";
}

export default async function ActivitiesPage() {
  let activities = FALLBACK_ACTIVITIES;
  try {
    const sanityActivities = await client.fetch(allActivitiesQuery);
    if (sanityActivities?.length) activities = sanityActivities;
  } catch { /* use fallback */ }

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
          {activities.map((act) => {
            const image = getActivityImage(act);
            return (
              <Link key={act.slug} href={`/activities/${act.slug}`} className="group relative flex h-[320px] flex-col justify-end overflow-hidden p-6">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-scroll-animation group-hover:scale-105" style={{ backgroundImage: `url(${image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-driftwood/70 to-transparent" />
                <div className="relative z-10">
                  <h2 className="font-display text-heading-lg font-semibold text-pure-white">{act.name}</h2>
                  <p className="mt-1 font-body text-body-sm text-white/80">{act.shortDescription}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
