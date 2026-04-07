import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

// ─── rooms ────────────────────────────────────────────────────────────────────
export const rooms = sqliteTable("rooms", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  roomType: text("room_type"),
  description: text("description"),
  heroImage: text("hero_image"),
  amenities: text("amenities"), // JSON array
  priceFrom: real("price_from"),
  noticeActive: integer("notice_active").default(0),
  noticeText: text("notice_text"),
  sortOrder: integer("sort_order").default(0),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// ─── activities ───────────────────────────────────────────────────────────────
export const activities = sqliteTable("activities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category"),
  shortDescription: text("short_description"),
  description: text("description"),
  heroImage: text("hero_image"),
  safetyRequirements: text("safety_requirements"), // JSON array
  seasonalNotes: text("seasonal_notes"),
  sortOrder: integer("sort_order").default(0),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// ─── packages ─────────────────────────────────────────────────────────────────
export const packages = sqliteTable("packages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  tagline: text("tagline"),
  description: text("description"),
  heroImage: text("hero_image"),
  season: text("season"),
  inclusions: text("inclusions"), // JSON array
  priceFrom: real("price_from"),
  active: integer("active").default(1),
  seasonNotes: text("season_notes"),
  bookingLink: text("booking_link"),
  sortOrder: integer("sort_order").default(0),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// ─── pricingTiers ─────────────────────────────────────────────────────────────
export const pricingTiers = sqliteTable("pricing_tiers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  packageId: integer("package_id").references(() => packages.id),
  nights: integer("nights").notNull(),
  label: text("label"),
  dives: integer("dives"),
  snorkelTrips: integer("snorkel_trips"),
  villageTwin: real("village_twin").notNull(),
  villageSingle: real("village_single").notNull(),
  beachTwin: real("beach_twin").notNull(),
  beachSingle: real("beach_single").notNull(),
  sortOrder: integer("sort_order").default(0),
});

// ─── galleryImages ────────────────────────────────────────────────────────────
export const galleryImages = sqliteTable("gallery_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  imagePath: text("image_path").notNull(),
  alt: text("alt").notNull(),
  category: text("category").notNull(),
  caption: text("caption"),
  sortOrder: integer("sort_order").default(0),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ─── reviews ──────────────────────────────────────────────────────────────────
export const reviews = sqliteTable("reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  quote: text("quote").notNull(),
  guestName: text("guest_name").notNull(),
  guestCountry: text("guest_country"),
  starRating: integer("star_rating"),
  date: text("date"),
  active: integer("active").default(1),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ─── faqItems ─────────────────────────────────────────────────────────────────
export const faqItems = sqliteTable("faq_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").notNull(),
  sortOrder: integer("sort_order").default(0),
  active: integer("active").default(1),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ─── siteNotices ──────────────────────────────────────────────────────────────
export const siteNotices = sqliteTable("site_notices", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  body: text("body"),
  targetPages: text("target_pages"), // JSON array
  severity: text("severity").default("info"),
  active: integer("active").default(0),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// ─── seoMetadata ──────────────────────────────────────────────────────────────
export const seoMetadata = sqliteTable("seo_metadata", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  page: text("page").notNull().unique(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  ogImage: text("og_image"),
  canonicalUrl: text("canonical_url"),
});

// ─── contentGallery ───────────────────────────────────────────────────────────
export const contentGallery = sqliteTable("content_gallery", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  contentType: text("content_type").notNull(), // 'room' or 'activity'
  contentId: integer("content_id").notNull(),
  imagePath: text("image_path").notNull(),
  alt: text("alt"),
  sortOrder: integer("sort_order").default(0),
});

// ─── adminUsers ───────────────────────────────────────────────────────────────
export const adminUsers = sqliteTable("admin_users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  role: text("role").default("admin"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  lastLoginAt: text("last_login_at"),
});

// ─── siteSettings ─────────────────────────────────────────────────────────────
export const siteSettings = sqliteTable("site_settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  key: text("key").notNull().unique(),
  value: text("value"),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// ─── navItems ─────────────────────────────────────────────────────────────────
export const navItems = sqliteTable("nav_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  location: text("location").notNull(), // 'header', 'footer_explore', 'footer_info'
  label: text("label").notNull(),
  href: text("href").notNull(),
  sortOrder: integer("sort_order").default(0),
  active: integer("active").default(1),
});

// ─── pageContent ──────────────────────────────────────────────────────────────
export const pageContent = sqliteTable("page_content", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  pageSlug: text("page_slug").notNull(),
  sectionKey: text("section_key").notNull(),
  title: text("title"),
  body: text("body"),
  imagePath: text("image_path"),
  sortOrder: integer("sort_order").default(0),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// ─── heroMedia ───────────────────────────────────────────────────────────────
export const heroMedia = sqliteTable("hero_media", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  mediaType: text("media_type").notNull(), // 'image' or 'video'
  mediaPath: text("media_path").notNull(),
  posterPath: text("poster_path"),
  alt: text("alt"),
  sortOrder: integer("sort_order").default(0),
  active: integer("active").default(1),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// ─── Relations ────────────────────────────────────────────────────────────────

export const packagesRelations = relations(packages, ({ many }) => ({
  pricingTiers: many(pricingTiers),
}));

export const pricingTiersRelations = relations(pricingTiers, ({ one }) => ({
  package: one(packages, {
    fields: [pricingTiers.packageId],
    references: [packages.id],
  }),
}));

export const roomsRelations = relations(rooms, ({ many }) => ({
  contentGallery: many(contentGallery),
}));

export const activitiesRelations = relations(activities, ({ many }) => ({
  contentGallery: many(contentGallery),
}));
