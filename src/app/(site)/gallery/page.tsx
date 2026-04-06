import type { Metadata } from "next";
import { getAllGalleryImages } from "@/lib/data/gallery";
import GalleryClient from "./GalleryClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Gallery | Aveyla Manta Village | Maldives",
  description: "Photos of Aveyla Manta Village — underwater encounters, rooms, beach life, and dining on Dharavandhoo Island, Baa Atoll.",
};

export default async function GalleryPage() {
  const images = await getAllGalleryImages();
  return <GalleryClient images={images} />;
}
