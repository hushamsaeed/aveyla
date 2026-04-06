import { db } from "@/db";
import { pageContent } from "@/db/schema";
import { eq, and, asc } from "drizzle-orm";

export async function getPageSections(pageSlug: string) {
  return db
    .select()
    .from(pageContent)
    .where(eq(pageContent.pageSlug, pageSlug))
    .orderBy(asc(pageContent.sortOrder))
    .all();
}

export async function updatePageSection(
  pageSlug: string,
  sectionKey: string,
  data: Partial<typeof pageContent.$inferInsert>
) {
  return db
    .update(pageContent)
    .set({ ...data, updatedAt: new Date().toISOString() })
    .where(and(eq(pageContent.pageSlug, pageSlug), eq(pageContent.sectionKey, sectionKey)))
    .returning()
    .all();
}

export async function createPageSection(data: {
  pageSlug: string;
  sectionKey: string;
  title?: string;
  body?: string;
  imagePath?: string;
  sortOrder?: number;
}) {
  return db.insert(pageContent).values(data).returning().all();
}

export async function deletePageSection(pageSlug: string, sectionKey: string) {
  return db
    .delete(pageContent)
    .where(and(eq(pageContent.pageSlug, pageSlug), eq(pageContent.sectionKey, sectionKey)))
    .returning()
    .all();
}
