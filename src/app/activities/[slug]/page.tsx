import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { activityBySlugQuery, allActivitiesQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

export const revalidate = 60;
export const dynamicParams = true;

interface Activity {
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  heroImage?: unknown;
  safetyRequirements?: string[];
  seasonalNotes?: string;
}

const FALLBACK_ACTIVITIES: Record<string, Activity> = {
  "scuba-diving": {
    name: "Scuba Diving", slug: "scuba-diving",
    description: "Aveyla's PADI dive centre operates daily guided dives across more than thirty sites in the Baa Atoll. From the shallow house reef — accessible from the beach — to the deep channels where pelagics patrol, every dive is led by instructors who have logged thousands of hours in these waters.",
    safetyRequirements: [
      "PADI Open Water certification or equivalent (minimum)",
      "Medical fitness declaration required",
      "Minimum age: 12 years (with guardian)",
      "Equipment provided: BCD, regulator, wetsuit, mask, fins",
      "All dives include certified dive guide",
    ],
  },
  "snorkelling": {
    name: "Snorkelling", slug: "snorkelling",
    description: "The house reef begins ten metres from the beach. Mask, snorkel, and fins are all that's needed to enter a world of reef sharks, eagle rays, and schooling fusiliers. Guided excursions reach outer reefs and Hanifaru Bay during manta season.",
  },
  "night-snorkelling": {
    name: "Night Snorkelling", slug: "night-snorkelling",
    description: "After dark, the reef transforms. Torch-lit excursions reveal bioluminescent plankton, hunting octopuses, and sleeping parrotfish. The experience is guided and begins from the beach.",
  },
  "freediving": {
    name: "Freediving", slug: "freediving",
    description: "Single-breath descents into the blue channels of the Baa Atoll. Guided sessions for certified freedivers, with safety divers on every excursion. The clarity here makes depth feel effortless.",
    safetyRequirements: [
      "AIDA or equivalent freediving certification recommended",
      "Medical fitness declaration required",
      "Minimum age: 16 years",
      "Safety diver accompanies every session",
      "Equipment provided on request",
    ],
  },
  "sandbank-trips": {
    name: "Sandbank Trips", slug: "sandbank-trips",
    description: "Private sandbars emerge from the lagoon at low tide — islands that exist for hours before the ocean reclaims them. Picnic lunch, snorkelling gear, and nothing else for miles.",
  },
  "big-game-fishing": {
    name: "Big Game Fishing", slug: "big-game-fishing",
    description: "Beyond the atoll edge, the Indian Ocean drops away. Sailfish, tuna, wahoo, and mahi-mahi run these waters. Half-day and full-day charters depart from Dharavandhoo harbour.",
  },
  "local-island-visits": {
    name: "Local Island Visits", slug: "local-island-visits",
    description: "Dharavandhoo is a living island — not a resort island. Walk the village, visit the school, meet the people who share this atoll with the mantas. Cultural excursions to neighbouring islands available.",
  },
};

const FALLBACK_IMAGES: Record<string, string> = {
  "scuba-diving": "/images/activities/scuba.jpg",
  "snorkelling": "/images/activities/snorkelling.jpg",
  "night-snorkelling": "/images/activities/night-snorkelling.jpg",
  "freediving": "/images/activities/freediving.jpg",
  "sandbank-trips": "/images/activities/sandbank.jpg",
  "big-game-fishing": "/images/activities/fishing.jpg",
  "local-island-visits": "/images/activities/local-island.jpg",
};

function getImage(activity: Activity) {
  if (activity.heroImage) {
    return urlFor(activity.heroImage).width(1200).height(600).format("webp").url();
  }
  return FALLBACK_IMAGES[activity.slug] || "/images/activities/scuba.jpg";
}

export async function generateStaticParams() {
  let activities: { slug: string }[] = [];
  try {
    activities = await client.fetch(allActivitiesQuery);
  } catch { /* use fallback slugs */ }

  if (!activities?.length) {
    activities = Object.keys(FALLBACK_ACTIVITIES).map((slug) => ({ slug }));
  }
  return activities.map((a) => ({ slug: a.slug }));
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let activity: Activity | null = null;
  try {
    activity = await client.fetch(activityBySlugQuery, { slug });
  } catch { /* use fallback */ }

  if (!activity) {
    activity = FALLBACK_ACTIVITIES[slug] || null;
  }
  if (!activity) notFound();

  const image = getImage(activity);
  const allActivities = Object.keys(FALLBACK_ACTIVITIES).filter((s) => s !== slug);
  const related = allActivities.slice(0, 3);

  return (
    <>
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-driftwood/80" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 tablet:px-14">
          <h1 className="font-display text-display-lg font-light tracking-[-0.02em] text-pure-white">{activity.name}</h1>
        </div>
      </section>

      <section className="bg-linen px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto max-w-content space-y-12">
          <p className="max-w-editorial font-body text-body-lg leading-[1.7] text-driftwood">{activity.description}</p>

          {activity.safetyRequirements && activity.safetyRequirements.length > 0 && (
            <div className="bg-salt-white p-8">
              <h2 className="font-display text-heading-lg font-semibold text-dark-driftwood">Requirements & Safety</h2>
              <ul className="mt-4 space-y-2">
                {activity.safetyRequirements.map((item) => (
                  <li key={item} className="flex items-start gap-2 font-body text-body-md text-driftwood">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activity.seasonalNotes && (
            <div className="bg-salt-white p-8">
              <h2 className="font-display text-heading-lg font-semibold text-dark-driftwood">Seasonal Notes</h2>
              <p className="mt-4 font-body text-body-md leading-[1.7] text-driftwood">{activity.seasonalNotes}</p>
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
              {related.map((relSlug) => {
                const rel = FALLBACK_ACTIVITIES[relSlug];
                if (!rel) return null;
                const relImage = FALLBACK_IMAGES[relSlug] || "/images/activities/scuba.jpg";
                return (
                  <Link key={relSlug} href={`/activities/${relSlug}`} className="group flex flex-col overflow-hidden bg-white">
                    <div className="h-[200px] bg-cover bg-center transition-transform duration-scroll-animation group-hover:scale-105" style={{ backgroundImage: `url(${relImage})` }} />
                    <div className="p-4">
                      <h3 className="font-display text-heading-md font-semibold text-dark-driftwood">{rel.name}</h3>
                      <span className="font-body text-body-sm text-muted-ocean">Learn More →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
