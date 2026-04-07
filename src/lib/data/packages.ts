import { db } from "@/db";
import { packages, pricingTiers } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

function parseJsonField<T>(value: string | null): T {
  if (!value) return [] as unknown as T;
  try { return JSON.parse(value); } catch { return [] as unknown as T; }
}

export async function getAllPackages() {
  const rows = db
    .select()
    .from(packages)
    .where(eq(packages.active, 1))
    .orderBy(asc(packages.sortOrder), asc(packages.name))
    .all();
  return rows.map((p) => ({ ...p, inclusions: parseJsonField<string[]>(p.inclusions) }));
}

export async function getPackageBySlug(slug: string) {
  const [pkg] = db.select().from(packages).where(eq(packages.slug, slug)).limit(1).all();
  if (!pkg) return null;
  const tiers = db
    .select()
    .from(pricingTiers)
    .where(eq(pricingTiers.packageId, pkg.id))
    .orderBy(asc(pricingTiers.sortOrder))
    .all();
  return {
    ...pkg,
    inclusions: parseJsonField<string[]>(pkg.inclusions),
    pricingTiers: tiers,
  };
}

export async function getPricingTiers(packageId: number) {
  return db
    .select()
    .from(pricingTiers)
    .where(eq(pricingTiers.packageId, packageId))
    .orderBy(asc(pricingTiers.sortOrder))
    .all();
}

export async function setPricingTiers(
  packageId: number,
  tiers: Array<{
    nights: number;
    label?: string;
    dives?: number;
    snorkelTrips?: number;
    villageTwin: number;
    villageSingle: number;
    beachTwin: number;
    beachSingle: number;
    sortOrder?: number;
  }>
) {
  db.delete(pricingTiers).where(eq(pricingTiers.packageId, packageId)).run();
  if (tiers.length === 0) return [];
  return db
    .insert(pricingTiers)
    .values(tiers.map((t) => ({ ...t, packageId })))
    .returning()
    .all();
}

export async function createPackage(data: {
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  heroImage?: string;
  season?: string;
  inclusions?: string[];
  priceFrom?: number;
  active?: boolean;
  seasonNotes?: string;
  bookingLink?: string;
  sortOrder?: number;
}) {
  return db
    .insert(packages)
    .values({
      ...data,
      inclusions: data.inclusions ? JSON.stringify(data.inclusions) : null,
      active: data.active === false ? 0 : 1,
    })
    .returning()
    .all();
}

export async function updatePackage(id: number, data: Record<string, unknown>) {
  const values: Record<string, unknown> = { ...data, updatedAt: new Date().toISOString() };
  if (Array.isArray(data.inclusions)) values.inclusions = JSON.stringify(data.inclusions);
  return db.update(packages).set(values).where(eq(packages.id, id)).returning().all();
}

export async function deletePackage(id: number) {
  db.delete(pricingTiers).where(eq(pricingTiers.packageId, id)).run();
  return db.delete(packages).where(eq(packages.id, id)).returning().all();
}
