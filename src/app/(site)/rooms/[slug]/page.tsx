import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllRooms, getRoomBySlug, getRoomGallery } from "@/lib/data/rooms";
import { getRoomImage } from "@/lib/images";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const rooms = await getAllRooms();
  return rooms.map((r) => ({ slug: r.slug }));
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const room = await getRoomBySlug(slug);
  if (!room) notFound();

  const gallery = await getRoomGallery(room.id);
  const heroImage = getRoomImage(room.heroImage, slug);

  return (
    <>
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-driftwood/80" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 tablet:px-14">
          <h1 className="font-display text-display-lg font-light tracking-[-0.02em] text-pure-white">{room.name}</h1>
        </div>
      </section>

      {/* Gallery strip */}
      {gallery.length > 0 && (
        <section className="flex h-[120px] gap-1 overflow-x-auto bg-dark-driftwood">
          {gallery.map((g, i) => (
            <div key={i} className="h-full w-[200px] shrink-0 bg-cover bg-center" style={{ backgroundImage: `url(${g.imagePath})` }} />
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

          {!!room.noticeActive && room.noticeText && (
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
