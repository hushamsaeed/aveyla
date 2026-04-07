import { getPageContent } from "@/lib/data/pages";
import HeroClient from "./HeroClient";

export default async function HeroSection() {
  const content = await getPageContent("home");
  return (
    <HeroClient
      title={content.hero?.title || "Where the Manta Rays Are."}
      subtitle={content.hero?.body || "Hanifaru Bay. Baa Atoll UNESCO Biosphere Reserve. Dharavandhoo Island, Maldives."}
      posterImage={content.hero?.imagePath || "/images/hero-poster.jpg"}
      cta1Label={content.hero_cta1?.title || "Explore the Reef"}
      cta2Label={content.hero_cta2?.title || "Book Your Stay"}
    />
  );
}
