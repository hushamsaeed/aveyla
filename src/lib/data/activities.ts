import { db } from "@/db";
import { activities, contentGallery } from "@/db/schema";
import { eq, asc, and } from "drizzle-orm";

function parseJsonField<T>(value: string | null): T {
  if (!value) return [] as unknown as T;
  try { return JSON.parse(value); } catch { return [] as unknown as T; }
}

export async function getAllActivities() {
  const rows = db.select().from(activities).orderBy(asc(activities.sortOrder), asc(activities.name)).all();
  return rows.map((a) => ({ ...a, safetyRequirements: parseJsonField<string[]>(a.safetyRequirements) }));
}

export async function getActivityById(id: number) {
  const [activity] = db.select().from(activities).where(eq(activities.id, id)).limit(1).all();
  if (!activity) return null;
  return { ...activity, safetyRequirements: parseJsonField<string[]>(activity.safetyRequirements) };
}

export async function getActivityBySlug(slug: string) {
  const [activity] = db.select().from(activities).where(eq(activities.slug, slug)).limit(1).all();
  if (!activity) return null;
  return { ...activity, safetyRequirements: parseJsonField<string[]>(activity.safetyRequirements) };
}

export async function getActivityGallery(activityId: number) {
  return db
    .select()
    .from(contentGallery)
    .where(and(eq(contentGallery.contentType, "activity"), eq(contentGallery.contentId, activityId)))
    .orderBy(asc(contentGallery.sortOrder))
    .all();
}

export async function createActivity(data: {
  name: string;
  slug: string;
  category?: string;
  shortDescription?: string;
  description?: string;
  heroImage?: string;
  safetyRequirements?: string[];
  seasonalNotes?: string;
  sortOrder?: number;
}) {
  return db
    .insert(activities)
    .values({
      ...data,
      safetyRequirements: data.safetyRequirements ? JSON.stringify(data.safetyRequirements) : null,
    })
    .returning()
    .all();
}

export async function updateActivity(id: number, data: Record<string, unknown>) {
  const values: Record<string, unknown> = { ...data, updatedAt: new Date().toISOString() };
  if (Array.isArray(data.safetyRequirements)) values.safetyRequirements = JSON.stringify(data.safetyRequirements);
  return db.update(activities).set(values).where(eq(activities.id, id)).returning().all();
}

export async function deleteActivity(id: number) {
  db.delete(contentGallery)
    .where(and(eq(contentGallery.contentType, "activity"), eq(contentGallery.contentId, id)))
    .run();
  return db.delete(activities).where(eq(activities.id, id)).returning().all();
}
