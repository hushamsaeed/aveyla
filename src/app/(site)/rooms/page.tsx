import type { Metadata } from "next";
import Link from "next/link";
import { getAllRooms } from "@/lib/data/rooms";
import { getRoomImage } from "@/lib/images";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Rooms | Aveyla Manta Village | Maldives",
  description: "Three room types at Aveyla Manta Village — Ocean Deluxe, Beach Deluxe, and Village Deluxe. All steps from the reef on Dharavandhoo Island.",
};

export default async function RoomsPage() {
  const rooms = await getAllRooms();

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
            const image = getRoomImage(room.heroImage, room.slug);
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
