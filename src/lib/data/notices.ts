import { db } from "@/db";
import { siteNotices } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

function parseJsonField<T>(value: string | null): T {
  if (!value) return [] as unknown as T;
  try { return JSON.parse(value); } catch { return [] as unknown as T; }
}

export async function getActiveNotices() {
  const rows = db.select().from(siteNotices).where(eq(siteNotices.active, 1)).all();
  return rows.map((n) => ({ ...n, targetPages: parseJsonField<string[]>(n.targetPages) }));
}

export async function getAllNotices() {
  const rows = db.select().from(siteNotices).orderBy(desc(siteNotices.createdAt)).all();
  return rows.map((n) => ({ ...n, targetPages: parseJsonField<string[]>(n.targetPages) }));
}

export async function createNotice(data: {
  title: string;
  body?: string;
  targetPages?: string[];
  severity?: string;
  active?: boolean;
}) {
  return db
    .insert(siteNotices)
    .values({
      ...data,
      targetPages: data.targetPages ? JSON.stringify(data.targetPages) : null,
      active: data.active ? 1 : 0,
    })
    .returning()
    .all();
}

export async function updateNotice(id: number, data: Partial<typeof siteNotices.$inferInsert>) {
  const values: Record<string, unknown> = { ...data, updatedAt: new Date().toISOString() };
  if (Array.isArray(data.targetPages)) values.targetPages = JSON.stringify(data.targetPages);
  return db.update(siteNotices).set(values).where(eq(siteNotices.id, id)).returning().all();
}

export async function deleteNotice(id: number) {
  return db.delete(siteNotices).where(eq(siteNotices.id, id)).returning().all();
}
