import { db } from "@/db";
import { faqItems } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function getActiveFaq() {
  return db
    .select()
    .from(faqItems)
    .where(eq(faqItems.active, 1))
    .orderBy(asc(faqItems.sortOrder))
    .all();
}

export async function getFaqItemById(id: number) {
  const [item] = db.select().from(faqItems).where(eq(faqItems.id, id)).limit(1).all();
  return item || null;
}

export async function getAllFaq() {
  return db.select().from(faqItems).orderBy(asc(faqItems.sortOrder)).all();
}

export async function createFaqItem(data: {
  question: string;
  answer: string;
  category: string;
  sortOrder?: number;
  active?: boolean;
}) {
  return db
    .insert(faqItems)
    .values({ ...data, active: data.active === false ? 0 : 1 })
    .returning()
    .all();
}

export async function updateFaqItem(id: number, data: Partial<typeof faqItems.$inferInsert>) {
  return db.update(faqItems).set(data).where(eq(faqItems.id, id)).returning().all();
}

export async function deleteFaqItem(id: number) {
  return db.delete(faqItems).where(eq(faqItems.id, id)).returning().all();
}
