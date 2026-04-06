import { getAllGalleryImages } from "@/lib/data/gallery";
import Link from "next/link";
import { deleteGalleryImageAction } from "./actions";

export default async function AdminGalleryPage() {
  const images = await getAllGalleryImages();

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Gallery
          </h1>
          <p className="mt-1 font-body text-sm text-driftwood">
            {images.length} image{images.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="bg-terracotta px-5 py-2.5 font-body text-sm font-semibold text-white hover:bg-terracotta/90 transition-colors rounded-sm"
        >
          Add Image
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {images.length === 0 && (
          <div className="col-span-full py-12 text-center font-body text-sm text-driftwood">
            No gallery images yet.
          </div>
        )}
        {images.map((image) => (
          <div key={image.id} className="group relative rounded-sm overflow-hidden border border-gray-100 bg-white">
            <div className="aspect-square bg-gray-100 overflow-hidden">
              <img
                src={image.imagePath}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <p className="font-body text-xs text-dark-driftwood font-medium truncate">
                {image.alt}
              </p>
              <p className="font-body text-xs text-driftwood mt-0.5">
                {image.category}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Link
                  href={`/admin/gallery/${image.id}`}
                  className="font-body text-xs text-muted-ocean hover:text-terracotta transition-colors"
                >
                  Edit
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await deleteGalleryImageAction(image.id);
                  }}
                >
                  <button
                    type="submit"
                    className="font-body text-xs text-red-500 hover:text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
