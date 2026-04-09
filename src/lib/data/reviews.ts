import { db } from "@/db";
import { reviews } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getActiveReviews() {
  return db.select().from(reviews).where(eq(reviews.active, 1)).orderBy(desc(reviews.createdAt)).all();
}

export async function getReviewById(id: number) {
  const [review] = db.select().from(reviews).where(eq(reviews.id, id)).limit(1).all();
  return review || null;
}

export async function getAllReviews() {
  return db.select().from(reviews).orderBy(desc(reviews.createdAt)).all();
}

export async function createReview(data: {
  quote: string;
  guestName: string;
  guestCountry?: string;
  starRating?: number;
  date?: string;
  active?: boolean;
}) {
  return db
    .insert(reviews)
    .values({ ...data, active: data.active === false ? 0 : 1 })
    .returning()
    .all();
}

export async function updateReview(id: number, data: Partial<typeof reviews.$inferInsert>) {
  return db.update(reviews).set(data).where(eq(reviews.id, id)).returning().all();
}

export async function deleteReview(id: number) {
  return db.delete(reviews).where(eq(reviews.id, id)).returning().all();
}
