import type { Metadata } from "next";
import Link from "next/link";
import { getAllActivities } from "@/lib/data/activities";
import { getActivityImage } from "@/lib/images";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Activities | Aveyla Manta Village | Maldives",
  description: "Scuba diving, snorkelling, freediving, night snorkelling, sandbank trips, fishing, island visits, and dining at Aveyla Manta Village, Baa Atoll.",
};

export default async function ActivitiesPage() {
  const activities = await getAllActivities();

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
            const image = getActivityImage(act.heroImage, act.slug);
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
