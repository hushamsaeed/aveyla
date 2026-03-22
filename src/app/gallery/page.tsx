"use client";

import { useState, useEffect } from "react";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "c1itog7c",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

interface GalleryImage {
  _id?: string;
  src?: string;
  image?: unknown;
  alt: string;
  category: string;
  caption?: string;
}

const FALLBACK_IMAGES: GalleryImage[] = [
  { src: "/images/gallery/manta-1.jpg", alt: "Manta ray in Hanifaru Bay", category: "Underwater" },
  { src: "/images/gallery/reef-1.jpg", alt: "Coral reef Baa Atoll", category: "Underwater" },
  { src: "/images/gallery/room-1.jpg", alt: "Ocean Deluxe room interior", category: "Rooms" },
  { src: "/images/gallery/beach-1.jpg", alt: "Dharavandhoo beach sunset", category: "Beach" },
  { src: "/images/gallery/dining-1.jpg", alt: "Beachside dinner setting", category: "Dining" },
  { src: "/images/gallery/dive-1.jpg", alt: "Guided dive excursion", category: "Activities" },
  { src: "/images/gallery/aerial-1.jpg", alt: "Aerial view of island", category: "Beach" },
  { src: "/images/gallery/night-1.jpg", alt: "Night snorkelling torchlight", category: "Activities" },
  { src: "/images/gallery/room-2.jpg", alt: "Beach Deluxe terrace", category: "Rooms" },
];

function getImageUrl(img: GalleryImage) {
  if (img.image) {
    return builder.image(img.image as Parameters<typeof builder.image>[0]).width(800).height(600).format("webp").url();
  }
  return img.src || "/images/gallery/manta-1.jpg";
}

function getFullImageUrl(img: GalleryImage) {
  if (img.image) {
    return builder.image(img.image as Parameters<typeof builder.image>[0]).width(1600).height(1200).format("webp").url();
  }
  return img.src || "/images/gallery/manta-1.jpg";
}

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [images, setImages] = useState<GalleryImage[]>(FALLBACK_IMAGES);
  const [categories, setCategories] = useState<string[]>(["All", "Underwater", "Rooms", "Beach", "Dining", "Activities"]);

  useEffect(() => {
    sanityClient
      .fetch<GalleryImage[]>(`*[_type == "galleryImage"] | order(_createdAt desc) { _id, image, alt, category, caption }`)
      .then((data) => {
        if (data?.length) {
          setImages(data);
          const cats = ["All", ...Array.from(new Set(data.map((img) => img.category).filter(Boolean)))];
          setCategories(cats);
        }
      })
      .catch(() => { /* use fallback */ });
  }, []);

  const filtered = filter === "All" ? images : images.filter((img) => img.category === filter);

  return (
    <>
      <section className="bg-dark-driftwood px-6 pb-8 pt-32 tablet:px-14">
        <div className="mx-auto max-w-content">
          <h1 className="font-display text-display-lg font-light tracking-[-0.02em] text-pure-white">Gallery</h1>
          <div className="mt-6 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 font-body text-[13px] transition-colors ${
                  filter === cat
                    ? "bg-coral-clay font-semibold text-dark-driftwood"
                    : "border border-white/40 text-white/60 hover:border-white hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-linen px-6 py-8 tablet:px-14">
        <div className="mx-auto max-w-content columns-1 gap-2 tablet:columns-2 desktop:columns-3">
          {filtered.map((img, i) => (
            <button
              key={img._id || img.src || i}
              onClick={() => setLightbox(i)}
              className="mb-2 block w-full overflow-hidden"
            >
              <div
                className="h-[250px] w-full bg-cover bg-center transition-transform duration-scroll-animation hover:scale-105 tablet:h-[300px]"
                style={{ backgroundImage: `url(${getImageUrl(img)})` }}
                role="img"
                aria-label={img.alt}
              />
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-dark-driftwood/95"
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setLightbox(null);
            if (e.key === "ArrowRight") setLightbox((prev) => (prev !== null && prev < filtered.length - 1 ? prev + 1 : prev));
            if (e.key === "ArrowLeft") setLightbox((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          tabIndex={0}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 text-pure-white"
            aria-label="Close lightbox"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div
            className="h-[80vh] w-[90vw] max-w-[1200px] bg-cover bg-center"
            style={{ backgroundImage: `url(${getFullImageUrl(filtered[lightbox])})` }}
            role="img"
            aria-label={filtered[lightbox].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-body-sm text-white/60">
            {filtered[lightbox].caption || filtered[lightbox].alt}
          </p>
        </div>
      )}
    </>
  );
}
