import Link from "next/link";
import { getAllActivities } from "@/lib/data/activities";
import { getActivityImage } from "@/lib/images";

export default async function ActivitiesSection() {
  const activities = await getAllActivities();

  return (
    <section
      id="activities"
      className="bg-gradient-to-b from-muted-ocean to-dark-driftwood px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet desktop:py-section-desktop"
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
          {activities.map((act) => {
            const image = getActivityImage(act.heroImage, act.slug);
            return (
              <Link
                key={act.slug}
                href={`/activities/${act.slug}`}
                className="group relative flex h-[320px] flex-col justify-end overflow-hidden p-6"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-scroll-animation group-hover:scale-105"
                  style={{ backgroundImage: `url(${image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-driftwood/70 to-transparent" />
                <div className="relative z-10">
                  <h3 className="font-display text-heading-lg font-semibold text-pure-white">
                    {act.name}
                  </h3>
                  <p className="mt-1 font-body text-body-sm text-white/80">
                    {act.shortDescription}
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
