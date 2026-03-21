import { defineType, defineField } from "sanity";

export default defineType({
  name: "room",
  title: "Room",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "roomType", title: "Room Type", type: "string", options: { list: ["Ocean Deluxe", "Beach Deluxe", "Village Deluxe"] } }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt Text", type: "string", validation: (r) => r.required() }] }],
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "priceFrom", title: "Price From (USD)", type: "number" }),
    defineField({ name: "noticeActive", title: "Notice Active", type: "boolean", initialValue: false }),
    defineField({ name: "noticeText", title: "Notice Text", type: "string" }),
  ],
  preview: {
    select: { title: "name", media: "heroImage" },
  },
});
