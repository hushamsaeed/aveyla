import { defineType, defineField } from "sanity";

export default defineType({
  name: "package",
  title: "Package",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "inclusions",
      title: "Inclusions",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "priceFrom", title: "Price From (USD)", type: "number" }),
    defineField({ name: "seasonNotes", title: "Season Notes", type: "text", rows: 2 }),
    defineField({ name: "bookingLink", title: "Booking Link Override", type: "url" }),
  ],
  preview: {
    select: { title: "name", media: "heroImage" },
  },
});
