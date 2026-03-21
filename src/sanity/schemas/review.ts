import { defineType, defineField } from "sanity";

export default defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "guestName", title: "Guest Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "guestCountry", title: "Guest Country", type: "string" }),
    defineField({ name: "starRating", title: "Star Rating", type: "number", validation: (r) => r.min(1).max(5) }),
    defineField({ name: "date", title: "Date", type: "date" }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "guestName", subtitle: "guestCountry" },
  },
});
