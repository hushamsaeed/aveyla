import Link from "next/link";
import { notFound } from "next/navigation";

const ROOMS: Record<string, { name: string; desc: string; amenities: string[]; image: string; notice?: string }> = {
  "ocean-deluxe": {
    name: "Ocean Deluxe",
    desc: "The Ocean Deluxe rooms face directly onto the lagoon, with unobstructed views from a private balcony. King bed, air conditioning, boutique bath amenities, and the sound of the reef at night. Four rooms, each identical in layout, each different in the light that enters.",
    amenities: ["King Bed", "Air Conditioning", "In-Room Safe", "LCD TV 32\"", "Tea & Coffee", "Boutique Bath Amenities", "Private Balcony", "Ocean View"],
    image: "/images/rooms/ocean-deluxe.jpg",
  },
  "beach-deluxe": {
    name: "Beach Deluxe",
    desc: "Steps from the beach, the Beach Deluxe rooms open onto a private terrace where the lagoon fills the frame. Morning light arrives unfiltered. Four rooms, oriented to catch the sunrise over the Baa Atoll.",
    amenities: ["King Bed", "Air Conditioning", "In-Room Safe", "LCD TV 32\"", "Tea & Coffee", "Boutique Bath Amenities", "Private Terrace", "Beach Access"],
    image: "/images/rooms/beach-deluxe.jpg",
  },
  "village-deluxe": {
    name: "Village Deluxe",
    desc: "Set among the garden, the Village Deluxe rooms offer quiet retreat after a day on the reef. Eight rooms, each with private bathroom and the cooling shade of tropical planting.",
    amenities: ["King Bed", "Air Conditioning", "In-Room Safe", "LCD TV 32\"", "Tea & Coffee", "Boutique Bath Amenities", "Private Bathroom", "Garden View"],
    image: "/images/rooms/village-deluxe.jpg",
    notice: "Temporary discount — nearby construction",
  },
};

export function generateStaticParams() {
  return Object.keys(ROOMS).map((slug) => ({ slug }));
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = ROOMS[slug];
  if (!room) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${room.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-ocean/80" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 tablet:px-14">
          <h1 className="font-display text-display-lg font-light tracking-[-0.02em] text-pure-white">{room.name}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-coral-white px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto max-w-content space-y-10">
          <p className="max-w-editorial font-body text-body-lg leading-[1.7] text-slate">{room.desc}</p>

          <div>
            <h2 className="font-display text-heading-lg font-semibold text-deep-ocean">Amenities</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 tablet:grid-cols-4">
              {room.amenities.map((a) => (
                <div key={a} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-reef-teal" />
                  <span className="font-body text-body-md text-slate">{a}</span>
                </div>
              ))}
            </div>
          </div>

          {room.notice && (
            <div className="flex items-center gap-3 bg-amber-50 px-4 py-3">
              <span className="text-amber-800" aria-hidden="true">⚠</span>
              <span className="font-body text-body-sm text-amber-800">{room.notice}</span>
            </div>
          )}

          <Link
            href={process.env.NEXT_PUBLIC_IPMS247_URL || "/contact"}
            className="block w-full bg-sand-gold py-4 text-center font-body text-[14px] font-semibold text-deep-ocean transition-colors hover:bg-sand-gold/90"
          >
            Book This Room
          </Link>
        </div>
      </section>
    </>
  );
}
