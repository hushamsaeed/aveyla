import Link from "next/link";
import { getAllRooms } from "@/lib/data/rooms";
import { getPageContent } from "@/lib/data/pages";
import { getRoomImage } from "@/lib/images";

export default async function RoomsSection() {
  const [rooms, content] = await Promise.all([getAllRooms(), getPageContent("home")]);
  const title = content.rooms_section?.title || "Your Base Camp.";
  const subtitle = content.rooms_section?.body || "Three room types, all steps from the reef.";

  return (
    <section className="bg-salt-white px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet desktop:py-section-desktop">
      <div className="mx-auto max-w-content">
        <div className="mb-12">
          <h2 className="font-display text-display-md font-semibold tracking-[-0.01em] text-dark-driftwood">
            {title}
          </h2>
          <p className="mt-3 font-body text-body-lg text-driftwood">
            {subtitle}
          </p>
        </div>

        <div className="grid gap-6 tablet:grid-cols-3">
          {rooms.map((room) => {
            const image = getRoomImage(room.heroImage, room.slug);
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
                  {!!room.noticeActive && room.noticeText && (
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
