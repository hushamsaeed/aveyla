import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string) {
  const [user] = db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1).all();
  return user || null;
}

export async function getUserById(id: number) {
  const [user] = db.select().from(adminUsers).where(eq(adminUsers.id, id)).limit(1).all();
  return user || null;
}

export async function createUser(data: {
  email: string;
  passwordHash: string;
  name?: string;
  role?: string;
}) {
  return db.insert(adminUsers).values(data).returning().all();
}

export async function updateUser(id: number, data: Partial<typeof adminUsers.$inferInsert>) {
  return db
    .update(adminUsers)
    .set(data)
    .where(eq(adminUsers.id, id))
    .returning()
    .all();
}

export async function getAllUsers() {
  return db.select().from(adminUsers).all();
}

export async function deleteUser(id: number) {
  return db.delete(adminUsers).where(eq(adminUsers.id, id)).returning().all();
}
