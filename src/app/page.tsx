import { hotelSchema } from "@/lib/structuredData";
import HeroSection from "@/components/home/HeroSection";
import BrandStatement from "@/components/home/BrandStatement";
import HanifaruFeature from "@/components/home/HanifaruFeature";
import RoomsSection from "@/components/home/RoomsSection";
import ActivitiesSection from "@/components/home/ActivitiesSection";
import PackagesSection from "@/components/home/PackagesSection";
import SocialProof from "@/components/home/SocialProof";
import AboutTeaser from "@/components/home/AboutTeaser";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema()) }}
      />
      <HeroSection />
      <BrandStatement />
      <HanifaruFeature />
      <RoomsSection />
      <ActivitiesSection />
      <PackagesSection />
      <SocialProof />
      <AboutTeaser />
    </>
  );
}
