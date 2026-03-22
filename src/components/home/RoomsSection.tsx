import Link from "next/link";
import { client } from "@/sanity/client";
import { allRoomsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

const FALLBACK_IMAGES: Record<string, string> = {
  "ocean-deluxe": "/images/rooms/ocean-deluxe.jpg",
  "beach-deluxe": "/images/rooms/beach-deluxe.jpg",
  "village-deluxe": "/images/rooms/village-deluxe.jpg",
};

const FALLBACK_ROOMS = [
  { name: "Ocean Deluxe", slug: "ocean-deluxe", amenities: ["Ocean view", "King bed", "Balcony", "A/C"], heroImage: null, noticeActive: false, noticeText: "" },
  { name: "Beach Deluxe", slug: "beach-deluxe", amenities: ["Beachfront", "King bed", "Terrace", "A/C"], heroImage: null, noticeActive: false, noticeText: "" },
  { name: "Village Deluxe", slug: "village-deluxe", amenities: ["Garden view", "King bed", "Private bath", "A/C"], heroImage: null, noticeActive: true, noticeText: "Temporary discount — nearby construction" },
];

function getRoomImage(room: { heroImage?: unknown; slug: string }) {
  if (room.heroImage) {
    return urlFor(room.heroImage).width(600).height(450).format("webp").url();
  }
  return FALLBACK_IMAGES[room.slug] || "/images/rooms/ocean-deluxe.jpg";
}

export default async function RoomsSection() {
  let rooms = FALLBACK_ROOMS;
  try {
    const sanityRooms = await client.fetch(allRoomsQuery);
    if (sanityRooms?.length) rooms = sanityRooms;
  } catch { /* use fallback */ }

  return (
    <section className="bg-salt-white px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet desktop:py-section-desktop">
      <div className="mx-auto max-w-content">
        <div className="mb-12">
          <h2 className="font-display text-display-md font-semibold tracking-[-0.01em] text-dark-driftwood">
            Your Base Camp.
          </h2>
          <p className="mt-3 font-body text-body-lg text-driftwood">
            Three room types, all steps from the reef.
          </p>
        </div>

        <div className="grid gap-6 tablet:grid-cols-3">
          {rooms.map((room) => {
            const image = getRoomImage(room);
            return (
              <div key={room.slug} className="flex flex-col overflow-hidden bg-white">
                <div
                  className="h-[280px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="font-display text-heading-lg font-semibold text-dark-driftwood">
                    {room.name}
                  </h3>
                  <p className="font-body text-body-sm text-driftwood">{room.amenities?.join(" · ")}</p>
                  {room.noticeActive && room.noticeText && (
                    <div className="flex items-center gap-2 bg-amber-50 px-3 py-2">
                      <span className="text-amber-800" aria-hidden="true">⚠</span>
                      <span className="font-body text-[12px] text-amber-800">{room.noticeText}</span>
                    </div>
                  )}
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="mt-auto flex items-center justify-center bg-dark-driftwood px-6 py-3 font-body text-[13px] font-semibold text-pure-white transition-colors hover:bg-muted-ocean"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
