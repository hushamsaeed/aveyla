import { db } from "@/db";
import { rooms, contentGallery } from "@/db/schema";
import { eq, asc, and } from "drizzle-orm";

function parseJsonField<T>(value: string | null): T {
  if (!value) return [] as unknown as T;
  try { return JSON.parse(value); } catch { return [] as unknown as T; }
}

export async function getAllRooms() {
  const rows = db.select().from(rooms).orderBy(asc(rooms.sortOrder), asc(rooms.name)).all();
  return rows.map((r) => ({ ...r, amenities: parseJsonField<string[]>(r.amenities) }));
}

export async function getRoomById(id: number) {
  const [room] = db.select().from(rooms).where(eq(rooms.id, id)).limit(1).all();
  if (!room) return null;
  return { ...room, amenities: parseJsonField<string[]>(room.amenities) };
}

export async function getRoomBySlug(slug: string) {
  const [room] = db.select().from(rooms).where(eq(rooms.slug, slug)).limit(1).all();
  if (!room) return null;
  return { ...room, amenities: parseJsonField<string[]>(room.amenities) };
}

export async function getRoomGallery(roomId: number) {
  return db
    .select()
    .from(contentGallery)
    .where(and(eq(contentGallery.contentType, "room"), eq(contentGallery.contentId, roomId)))
    .orderBy(asc(contentGallery.sortOrder))
    .all();
}

export async function createRoom(data: {
  name: string;
  slug: string;
  roomType?: string;
  description?: string;
  heroImage?: string;
  amenities?: string[];
  priceFrom?: number;
  noticeActive?: boolean;
  noticeText?: string;
  sortOrder?: number;
}) {
  return db
    .insert(rooms)
    .values({
      ...data,
      amenities: data.amenities ? JSON.stringify(data.amenities) : null,
      noticeActive: data.noticeActive ? 1 : 0,
    })
    .returning()
    .all();
}

export async function updateRoom(id: number, data: Record<string, unknown>) {
  const values: Record<string, unknown> = { ...data, updatedAt: new Date().toISOString() };
  if (Array.isArray(data.amenities)) values.amenities = JSON.stringify(data.amenities);
  if (data.noticeActive !== undefined) values.noticeActive = data.noticeActive ? 1 : 0;
  return db.update(rooms).set(values).where(eq(rooms.id, id)).returning().all();
}

export async function deleteRoom(id: number) {
  db.delete(contentGallery)
    .where(and(eq(contentGallery.contentType, "room"), eq(contentGallery.contentId, id)))
    .run();
  return db.delete(rooms).where(eq(rooms.id, id)).returning().all();
}
