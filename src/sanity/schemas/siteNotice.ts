import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteNotice",
  title: "Site Notice",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "text", rows: 2 }),
    defineField({
      name: "targetPages",
      title: "Target Pages",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "All Pages", value: "all" },
          { title: "Homepage", value: "/" },
          { title: "Rooms", value: "/rooms" },
          { title: "Activities", value: "/activities" },
          { title: "Packages", value: "/packages" },
        ],
      },
    }),
    defineField({
      name: "severity",
      title: "Severity",
      type: "string",
      options: { list: ["info", "warning"] },
      initialValue: "info",
    }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "title", subtitle: "severity" },
  },
});
