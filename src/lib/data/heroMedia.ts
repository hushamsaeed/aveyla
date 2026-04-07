import { db } from "@/db";
import { heroMedia } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function getActiveHeroMedia() {
  return db.select().from(heroMedia).where(eq(heroMedia.active, 1)).orderBy(asc(heroMedia.sortOrder)).all();
}

export async function getAllHeroMedia() {
  return db.select().from(heroMedia).orderBy(asc(heroMedia.sortOrder)).all();
}

export async function getHeroMediaById(id: number) {
  const [item] = db.select().from(heroMedia).where(eq(heroMedia.id, id)).limit(1).all();
  return item || null;
}

export async function createHeroMedia(data: {
  mediaType: string;
  mediaPath: string;
  posterPath?: string;
  alt?: string;
  sortOrder?: number;
  active?: boolean;
}) {
  return db.insert(heroMedia).values({
    ...data,
    active: data.active === false ? 0 : 1,
  }).returning().all();
}

export async function updateHeroMedia(id: number, data: Record<string, unknown>) {
  return db.update(heroMedia).set(data).where(eq(heroMedia.id, id)).returning().all();
}

export async function deleteHeroMedia(id: number) {
  return db.delete(heroMedia).where(eq(heroMedia.id, id)).returning().all();
}
