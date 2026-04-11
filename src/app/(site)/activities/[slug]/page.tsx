import Link from "next/link";
import { notFound } from "next/navigation";
import { getActivityBySlug, getAllActivities } from "@/lib/data/activities";
import { getSetting } from "@/lib/data/settings";
import { getActivityImage } from "@/lib/images";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const activities = await getAllActivities();
  return activities.map((a) => ({ slug: a.slug }));
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [activity, whatsappRaw] = await Promise.all([getActivityBySlug(slug), getSetting("whatsapp")]);
  if (!activity) notFound();
  const whatsapp = (whatsappRaw || "9607773998").replace(/\D/g, "");

  const image = getActivityImage(activity.heroImage, activity.slug);

  const allActivities = await getAllActivities();
  const related = allActivities.filter((a) => a.slug !== slug).slice(0, 3);

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
            <Link href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="border border-dark-driftwood px-8 py-4 font-body text-[14px] font-medium text-dark-driftwood">
              Ask a Question
            </Link>
          </div>

          {/* Related */}
          <div>
            <h2 className="font-display text-heading-lg font-semibold text-dark-driftwood">You might also like</h2>
            <div className="mt-6 grid gap-6 tablet:grid-cols-3">
              {related.map((rel) => {
                const relImage = getActivityImage(rel.heroImage, rel.slug);
                return (
                  <Link key={rel.slug} href={`/activities/${rel.slug}`} className="group flex flex-col overflow-hidden bg-white">
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
