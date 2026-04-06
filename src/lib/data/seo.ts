import { db } from "@/db";
import { seoMetadata } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getSeoByPage(page: string) {
  const [row] = db.select().from(seoMetadata).where(eq(seoMetadata.page, page)).limit(1).all();
  return row || null;
}

export async function getAllSeo() {
  return db.select().from(seoMetadata).all();
}

export async function upsertSeo(data: {
  page: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}) {
  const existing = db.select().from(seoMetadata).where(eq(seoMetadata.page, data.page)).limit(1).all();
  if (existing.length > 0) {
    return db
      .update(seoMetadata)
      .set(data)
      .where(eq(seoMetadata.page, data.page))
      .returning()
      .all();
  }
  return db.insert(seoMetadata).values(data).returning().all();
}
