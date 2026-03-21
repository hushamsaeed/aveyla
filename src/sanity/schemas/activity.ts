import { defineType, defineField } from "sanity";

export default defineType({
  name: "activity",
  title: "Activity",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category", type: "string", options: { list: ["diving", "snorkelling", "excursion", "dining"] } }),
    defineField({ name: "shortDescription", title: "Short Description", type: "string" }),
    defineField({ name: "description", title: "Full Description", type: "text", rows: 6 }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt Text", type: "string", validation: (r) => r.required() }] }],
    }),
    defineField({
      name: "safetyRequirements",
      title: "Safety & Requirements",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "seasonalNotes", title: "Seasonal Notes", type: "text", rows: 2 }),
  ],
  preview: {
    select: { title: "name", media: "heroImage" },
  },
});
