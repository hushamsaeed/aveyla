import { groq } from "next-sanity";

// Rooms
export const allRoomsQuery = groq`*[_type == "room"] | order(name asc) {
  _id, name, "slug": slug.current, roomType, description, heroImage, amenities,
  priceFrom, noticeActive, noticeText
}`;

export const roomBySlugQuery = groq`*[_type == "room" && slug.current == $slug][0] {
  _id, name, "slug": slug.current, roomType, description, heroImage, gallery,
  amenities, priceFrom, noticeActive, noticeText
}`;

// Activities
export const allActivitiesQuery = groq`*[_type == "activity"] | order(name asc) {
  _id, name, "slug": slug.current, category, shortDescription, heroImage
}`;

export const activityBySlugQuery = groq`*[_type == "activity" && slug.current == $slug][0] {
  _id, name, "slug": slug.current, category, shortDescription, description,
  heroImage, gallery, safetyRequirements, seasonalNotes
}`;

// Packages
export const allPackagesQuery = groq`*[_type == "package" && active != false] | order(name asc) {
  _id, name, "slug": slug.current, tagline, description, season, heroImage,
  inclusions, priceFrom, pricingTiers
}`;

export const packageBySlugQuery = groq`*[_type == "package" && slug.current == $slug][0] {
  _id, name, "slug": slug.current, tagline, description, season, heroImage,
  inclusions, priceFrom, pricingTiers, seasonNotes, bookingLink
}`;

// Gallery
export const galleryImagesQuery = groq`*[_type == "galleryImage"] | order(_createdAt desc) {
  _id, image, alt, category, caption
}`;

// Reviews
export const activeReviewsQuery = groq`*[_type == "review" && active == true] | order(date desc) {
  _id, quote, guestName, guestCountry, starRating, date
}`;

// FAQ
export const activeFaqQuery = groq`*[_type == "faqItem" && active == true] | order(sortOrder asc) {
  _id, question, answer, category
}`;

// Site Notices
export const activeNoticesQuery = groq`*[_type == "siteNotice" && active == true] {
  _id, title, body, targetPages, severity
}`;

// SEO
export const seoByPageQuery = groq`*[_type == "seoMetadata" && page == $page][0] {
  metaTitle, metaDescription, ogImage, canonicalUrl
}`;
