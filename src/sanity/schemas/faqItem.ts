import { defineType, defineField } from "sanity";

export default defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Transfer & Getting Here",
          "Diving & Activities",
          "Rooms & Facilities",
          "Booking & Payment",
          "Manta Season & Hanifaru Bay",
          "Conservation & Environment",
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number", initialValue: 0 }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true }),
  ],
  orderings: [{ title: "Sort Order", name: "sortOrder", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: {
    select: { title: "question", subtitle: "category" },
  },
});
