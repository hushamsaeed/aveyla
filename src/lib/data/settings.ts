import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getSetting(key: string) {
  const [row] = db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1).all();
  return row?.value ?? null;
}

export async function getAllSettings() {
  return db.select().from(siteSettings).all();
}

export async function setSetting(key: string, value: string) {
  const existing = db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1).all();
  if (existing.length > 0) {
    return db
      .update(siteSettings)
      .set({ value, updatedAt: new Date().toISOString() })
      .where(eq(siteSettings.key, key))
      .returning()
      .all();
  }
  return db.insert(siteSettings).values({ key, value }).returning().all();
}
