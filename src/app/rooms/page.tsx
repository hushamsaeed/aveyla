import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rooms | Aveyla Manta Village | Maldives",
  description: "Three room types at Aveyla Manta Village — Ocean Deluxe, Beach Deluxe, and Village Deluxe. All steps from the reef on Dharavandhoo Island.",
};

const ROOMS = [
  { name: "Ocean Deluxe", slug: "ocean-deluxe", desc: "Ocean-facing with private balcony. Four rooms.", amenities: "Ocean view · King bed · Balcony · A/C", image: "/images/rooms/ocean-deluxe.jpg" },
  { name: "Beach Deluxe", slug: "beach-deluxe", desc: "Steps from the sand, morning light on the lagoon.", amenities: "Beachfront · King bed · Terrace · A/C", image: "/images/rooms/beach-deluxe.jpg" },
  { name: "Village Deluxe", slug: "village-deluxe", desc: "Garden setting, quiet and cool. Eight rooms.", amenities: "Garden view · King bed · Private bath · A/C", image: "/images/rooms/village-deluxe.jpg" },
];

export default function RoomsPage() {
  return (
    <>
      <section className="bg-dark-driftwood px-6 pb-16 pt-32 tablet:px-14">
        <div className="mx-auto max-w-content">
          <h1 className="font-display text-display-lg font-light tracking-[-0.02em] text-pure-white">Rooms</h1>
          <p className="mt-4 font-body text-body-lg text-white/60">Three room types, all steps from the reef.</p>
        </div>
      </section>
      <section className="bg-linen px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto grid max-w-content gap-8 tablet:grid-cols-3">
          {ROOMS.map((room) => (
            <Link key={room.slug} href={`/rooms/${room.slug}`} className="group flex flex-col overflow-hidden bg-white transition-shadow hover:shadow-lg">
              <div className="h-[280px] bg-cover bg-center transition-transform duration-scroll-animation group-hover:scale-105" style={{ backgroundImage: `url(${room.image})` }} />
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h2 className="font-display text-heading-lg font-semibold text-dark-driftwood">{room.name}</h2>
                <p className="font-body text-body-md text-driftwood">{room.desc}</p>
                <p className="font-body text-body-sm text-driftwood/70">{room.amenities}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
