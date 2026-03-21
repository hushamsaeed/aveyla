import Link from "next/link";

const ROOMS = [
  {
    name: "Ocean Deluxe",
    slug: "ocean-deluxe",
    amenities: "Ocean view · King bed · Balcony · A/C",
    image: "/images/rooms/ocean-deluxe.jpg",
  },
  {
    name: "Beach Deluxe",
    slug: "beach-deluxe",
    amenities: "Beachfront · King bed · Terrace · A/C",
    image: "/images/rooms/beach-deluxe.jpg",
  },
  {
    name: "Village Deluxe",
    slug: "village-deluxe",
    amenities: "Garden view · King bed · Private bath · A/C",
    image: "/images/rooms/village-deluxe.jpg",
    notice: "Temporary discount — nearby construction",
  },
];

export default function RoomsSection() {
  return (
    <section className="bg-lagoon-light px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet desktop:py-section-desktop">
      <div className="mx-auto max-w-content">
        <div className="mb-12">
          <h2 className="font-display text-display-md font-semibold tracking-[-0.01em] text-deep-ocean">
            Your Base Camp.
          </h2>
          <p className="mt-3 font-body text-body-lg text-slate">
            Three room types, all steps from the reef.
          </p>
        </div>

        <div className="grid gap-6 tablet:grid-cols-3">
          {ROOMS.map((room) => (
            <div key={room.slug} className="flex flex-col overflow-hidden bg-white">
              <div
                className="h-[280px] bg-cover bg-center"
                style={{ backgroundImage: `url(${room.image})` }}
              />
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="font-display text-heading-lg font-semibold text-deep-ocean">
                  {room.name}
                </h3>
                <p className="font-body text-body-sm text-slate">{room.amenities}</p>
                {room.notice && (
                  <div className="flex items-center gap-2 bg-amber-50 px-3 py-2">
                    <span className="text-amber-800" aria-hidden="true">⚠</span>
                    <span className="font-body text-[12px] text-amber-800">{room.notice}</span>
                  </div>
                )}
                <Link
                  href={`/rooms/${room.slug}`}
                  className="mt-auto flex items-center justify-center bg-deep-ocean px-6 py-3 font-body text-[13px] font-semibold text-pure-white transition-colors hover:bg-ocean-blue"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
