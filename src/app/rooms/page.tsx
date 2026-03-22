import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import { allRoomsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

export const metadata: Metadata = {
  title: "Rooms | Aveyla Manta Village | Maldives",
  description: "Three room types at Aveyla Manta Village — Ocean Deluxe, Beach Deluxe, and Village Deluxe. All steps from the reef on Dharavandhoo Island.",
};

const FALLBACK_IMAGES: Record<string, string> = {
  "ocean-deluxe": "/images/rooms/ocean-deluxe.jpg",
  "beach-deluxe": "/images/rooms/beach-deluxe.jpg",
  "village-deluxe": "/images/rooms/village-deluxe.jpg",
};

const FALLBACK_ROOMS = [
  { name: "Ocean Deluxe", slug: "ocean-deluxe", description: "Ocean-facing with private balcony. Four rooms.", amenities: ["Ocean view", "King bed", "Balcony", "A/C"], heroImage: null },
  { name: "Beach Deluxe", slug: "beach-deluxe", description: "Steps from the sand, morning light on the lagoon.", amenities: ["Beachfront", "King bed", "Terrace", "A/C"], heroImage: null },
  { name: "Village Deluxe", slug: "village-deluxe", description: "Garden setting, quiet and cool. Eight rooms.", amenities: ["Garden view", "King bed", "Private bath", "A/C"], heroImage: null },
];

function getRoomImage(room: { heroImage?: unknown; slug: string }) {
  if (room.heroImage) {
    return urlFor(room.heroImage).width(800).height(600).format("webp").url();
  }
  return FALLBACK_IMAGES[room.slug] || "/images/rooms/ocean-deluxe.jpg";
}

export default async function RoomsPage() {
  let rooms = FALLBACK_ROOMS;
  try {
    const sanityRooms = await client.fetch(allRoomsQuery);
    if (sanityRooms?.length) rooms = sanityRooms;
  } catch { /* use fallback */ }

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
          {rooms.map((room) => {
            const image = getRoomImage(room);
            return (
              <Link key={room.slug} href={`/rooms/${room.slug}`} className="group flex flex-col overflow-hidden bg-white transition-shadow hover:shadow-lg">
                <div className="h-[280px] bg-cover bg-center transition-transform duration-scroll-animation group-hover:scale-105" style={{ backgroundImage: `url(${image})` }} />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h2 className="font-display text-heading-lg font-semibold text-dark-driftwood">{room.name}</h2>
                  <p className="font-body text-body-md text-driftwood">{room.description}</p>
                  <p className="font-body text-body-sm text-driftwood/70">{room.amenities?.join(" · ")}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
