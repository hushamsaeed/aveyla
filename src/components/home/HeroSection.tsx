import { getPageContent } from "@/lib/data/pages";
import { getActiveHeroMedia } from "@/lib/data/heroMedia";
import HeroClient from "./HeroClient";

export default async function HeroSection() {
  const content = await getPageContent("home");
  const media = await getActiveHeroMedia();

  // Fall back to default slides if none in DB
  const slides = media.length > 0 ? media.map((m) => ({
    type: m.mediaType as "image" | "video",
    src: m.mediaPath,
    poster: m.posterPath || undefined,
    alt: m.alt || "",
  })) : [
    { type: "video" as const, src: "/videos/hero.mp4", poster: "/images/hero-poster.jpg", alt: "Underwater dive footage" },
  ];

  return (
    <HeroClient
      title={content.hero?.title || "Where the Manta Rays Are."}
      subtitle={content.hero?.body || "Hanifaru Bay. Baa Atoll UNESCO Biosphere Reserve. Dharavandhoo Island, Maldives."}
      cta1Label={content.hero_cta1?.title || "Explore the Reef"}
      cta2Label={content.hero_cta2?.title || "Book Your Stay"}
      slides={slides}
    />
  );
}
