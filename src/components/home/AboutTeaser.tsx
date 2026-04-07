import { getPageContent } from "@/lib/data/pages";
import Link from "next/link";

export default async function AboutTeaser() {
  const content = await getPageContent("home");
  const title = content.about_teaser?.title || "Built on the Reef. Powered by the Sun.";
  const body =
    content.about_teaser?.body ||
    "Aveyla Manta Village was established in 2014 on Dharavandhoo Island. Sixteen rooms. One hundred percent solar electricity. Licensed by the Maldives Ministry of Tourism, operated with the conviction that proximity to one of the world's great marine ecosystems demands responsibility, not luxury theatre.";
  const image = content.about_teaser?.imagePath || "/images/about-aerial.jpg";

  return (
    <section className="bg-linen px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet desktop:py-section-desktop">
      <div className="mx-auto flex max-w-content flex-col items-center gap-14 tablet:flex-row">
        {/* Image */}
        <div
          className="h-[300px] w-full bg-cover bg-center tablet:h-[400px] tablet:w-[560px] tablet:shrink-0"
          style={{ backgroundImage: `url(${image})` }}
          role="img"
          aria-label="Aerial view of Dharavandhoo Island"
        />

        {/* Content */}
        <div className="space-y-6">
          <h2 className="font-display text-[clamp(1.5rem,2vw,2.25rem)] font-semibold leading-[1.2] text-dark-driftwood">
            {title}
          </h2>
          <p className="max-w-[560px] font-body text-body-lg leading-[1.7] text-driftwood">
            {body}
          </p>
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 font-body text-[14px] font-medium text-muted-ocean"
          >
            Read Our Story
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
