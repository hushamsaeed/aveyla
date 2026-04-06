import { db } from "@/db";
import { navItems } from "@/db/schema";
import { eq, asc, and } from "drizzle-orm";

export async function getNavItems(location: string) {
  return db
    .select()
    .from(navItems)
    .where(and(eq(navItems.location, location), eq(navItems.active, 1)))
    .orderBy(asc(navItems.sortOrder))
    .all();
}

export async function getAllNavItems() {
  return db.select().from(navItems).orderBy(asc(navItems.location), asc(navItems.sortOrder)).all();
}

export async function createNavItem(data: {
  location: string;
  label: string;
  href: string;
  sortOrder?: number;
  active?: boolean;
}) {
  return db
    .insert(navItems)
    .values({ ...data, active: data.active === false ? 0 : 1 })
    .returning()
    .all();
}

export async function updateNavItem(id: number, data: Partial<typeof navItems.$inferInsert>) {
  return db.update(navItems).set(data).where(eq(navItems.id, id)).returning().all();
}

export async function deleteNavItem(id: number) {
  return db.delete(navItems).where(eq(navItems.id, id)).returning().all();
}

export async function reorderNavItems(items: Array<{ id: number; sortOrder: number }>) {
  return Promise.all(
    items.map(({ id, sortOrder }) =>
      db.update(navItems).set({ sortOrder }).where(eq(navItems.id, id)).run()
    )
  );
}
