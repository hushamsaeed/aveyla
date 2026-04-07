import { getAllHeroMedia } from "@/lib/data/heroMedia";
import Link from "next/link";
import { deleteHeroMediaAction } from "./actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminHeroMediaPage() {
  const items = await getAllHeroMedia();

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Hero Media
          </h1>
          <p className="mt-1 font-body text-sm text-driftwood">
            Manage homepage carousel slides — images and videos cycle automatically.
          </p>
        </div>
        <Link
          href="/admin/hero-media/new"
          className="bg-terracotta px-5 py-2.5 font-body text-sm font-semibold text-white hover:bg-terracotta/90 transition-colors rounded-sm"
        >
          Add Slide
        </Link>
      </div>

      {items.length === 0 && (
        <div className="rounded-sm bg-white border border-gray-100 p-12 text-center">
          <p className="font-body text-sm text-driftwood">No hero media yet. Add your first slide.</p>
        </div>
      )}

      <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-sm border border-gray-100 bg-white">
            <div className="relative h-48 bg-gray-100">
              {item.mediaType === "video" ? (
                <video
                  className="h-full w-full object-cover"
                  src={item.mediaPath}
                  poster={item.posterPath || undefined}
                  muted
                  playsInline
                />
              ) : (
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.mediaPath})` }}
                />
              )}
              <span className={`absolute top-2 left-2 rounded px-2 py-0.5 font-body text-xs font-semibold ${
                item.mediaType === "video" ? "bg-muted-ocean text-white" : "bg-coral-clay text-dark-driftwood"
              }`}>
                {item.mediaType}
              </span>
              {item.active !== 1 && (
                <span className="absolute top-2 right-2 rounded bg-gray-500 px-2 py-0.5 font-body text-xs text-white">
                  Hidden
                </span>
              )}
            </div>
            <div className="p-4">
              <p className="font-body text-sm text-dark-driftwood truncate">{item.alt || "No alt text"}</p>
              <p className="font-body text-xs text-driftwood mt-1">Order: {item.sortOrder}</p>
              <div className="mt-3 flex items-center gap-3">
                <Link
                  href={`/admin/hero-media/${item.id}`}
                  className="font-body text-sm text-muted-ocean hover:text-terracotta transition-colors"
                >
                  Edit
                </Link>
                <DeleteButton
                  action={async () => {
                    "use server";
                    await deleteHeroMediaAction(item.id);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
