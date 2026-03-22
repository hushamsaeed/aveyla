import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { roomBySlugQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

const FALLBACK_IMAGES: Record<string, string> = {
  "ocean-deluxe": "/images/rooms/ocean-deluxe.jpg",
  "beach-deluxe": "/images/rooms/beach-deluxe.jpg",
  "village-deluxe": "/images/rooms/village-deluxe.jpg",
};

const FALLBACK_ROOMS: Record<string, { name: string; description: string; amenities: string[]; heroImage?: unknown; gallery?: unknown[]; noticeActive?: boolean; noticeText?: string }> = {
  "ocean-deluxe": {
    name: "Ocean Deluxe",
    description: "The Ocean Deluxe rooms face directly onto the lagoon, with unobstructed views from a private balcony. King bed, air conditioning, boutique bath amenities, and the sound of the reef at night.",
    amenities: ["King Bed", "Air Conditioning", "In-Room Safe", "LCD TV 32\"", "Tea & Coffee", "Boutique Bath Amenities", "Private Balcony", "Ocean View"],
  },
  "beach-deluxe": {
    name: "Beach Deluxe",
    description: "Steps from the beach, the Beach Deluxe rooms open onto a private terrace where the lagoon fills the frame. Morning light arrives unfiltered.",
    amenities: ["King Bed", "Air Conditioning", "In-Room Safe", "LCD TV 32\"", "Tea & Coffee", "Boutique Bath Amenities", "Private Terrace", "Beach Access"],
  },
  "village-deluxe": {
    name: "Village Deluxe",
    description: "Set among the garden, the Village Deluxe rooms offer quiet retreat after a day on the reef. Eight rooms, each with private bathroom.",
    amenities: ["King Bed", "Air Conditioning", "In-Room Safe", "LCD TV 32\"", "Tea & Coffee", "Boutique Bath Amenities", "Private Bathroom", "Garden View"],
    noticeActive: true,
    noticeText: "Temporary discount — nearby construction",
  },
};

function getImage(heroImage: unknown, slug: string, width = 1440, height = 500) {
  if (heroImage) {
    return urlFor(heroImage).width(width).height(height).format("webp").url();
  }
  return FALLBACK_IMAGES[slug] || "/images/rooms/ocean-deluxe.jpg";
}

export async function generateStaticParams() {
  return Object.keys(FALLBACK_ROOMS).map((slug) => ({ slug }));
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let room = FALLBACK_ROOMS[slug];
  try {
    const sanityRoom = await client.fetch(roomBySlugQuery, { slug });
    if (sanityRoom) room = sanityRoom;
  } catch { /* use fallback */ }

  if (!room) notFound();

  const heroImage = getImage(room.heroImage, slug);

  // Build gallery images from Sanity or fallback
  const galleryImages: string[] = [];
  if (room.gallery && Array.isArray(room.gallery)) {
    for (const img of room.gallery) {
      galleryImages.push(urlFor(img).width(400).height(300).format("webp").url());
    }
  }

  return (
    <>
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-driftwood/80" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 tablet:px-14">
          <h1 className="font-display text-display-lg font-light tracking-[-0.02em] text-pure-white">{room.name}</h1>
        </div>
      </section>

      {/* Gallery strip from Sanity */}
      {galleryImages.length > 0 && (
        <section className="flex h-[120px] gap-1 overflow-x-auto bg-dark-driftwood">
          {galleryImages.map((src, i) => (
            <div key={i} className="h-full w-[200px] shrink-0 bg-cover bg-center" style={{ backgroundImage: `url(${src})` }} />
          ))}
        </section>
      )}

      <section className="bg-linen px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto max-w-content space-y-10">
          <p className="max-w-editorial font-editorial text-body-lg leading-[1.7] text-driftwood">{room.description}</p>

          <div>
            <h2 className="font-display text-heading-lg font-semibold text-dark-driftwood">Amenities</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 tablet:grid-cols-4">
              {room.amenities?.map((a: string) => (
                <div key={a} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-terracotta" />
                  <span className="font-body text-body-md text-driftwood">{a}</span>
                </div>
              ))}
            </div>
          </div>

          {room.noticeActive && room.noticeText && (
            <div className="flex items-center gap-3 bg-amber-50 px-4 py-3">
              <span className="text-amber-800" aria-hidden="true">⚠</span>
              <span className="font-body text-body-sm text-amber-800">{room.noticeText}</span>
            </div>
          )}

          <Link
            href={process.env.NEXT_PUBLIC_IPMS247_URL || "/contact"}
            className="block w-full bg-coral-clay py-4 text-center font-body text-[14px] font-semibold text-dark-driftwood transition-colors hover:bg-coral-clay/90"
          >
            Book This Room
          </Link>
        </div>
      </section>
    </>
  );
}
