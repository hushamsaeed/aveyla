import { db } from "@/db";
import { galleryImages } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function getAllGalleryImages() {
  return db.select().from(galleryImages).orderBy(asc(galleryImages.sortOrder)).all();
}

export async function getGalleryImageById(id: number) {
  const [image] = db.select().from(galleryImages).where(eq(galleryImages.id, id)).limit(1).all();
  return image || null;
}

export async function getGalleryImagesByCategory(category: string) {
  return db
    .select()
    .from(galleryImages)
    .where(eq(galleryImages.category, category))
    .orderBy(asc(galleryImages.sortOrder))
    .all();
}

export async function createGalleryImage(data: {
  imagePath: string;
  alt: string;
  category: string;
  caption?: string;
  sortOrder?: number;
}) {
  return db.insert(galleryImages).values(data).returning().all();
}

export async function updateGalleryImage(id: number, data: Partial<typeof galleryImages.$inferInsert>) {
  return db.update(galleryImages).set(data).where(eq(galleryImages.id, id)).returning().all();
}

export async function deleteGalleryImage(id: number) {
  return db.delete(galleryImages).where(eq(galleryImages.id, id)).returning().all();
}
