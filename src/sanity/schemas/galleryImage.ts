import { defineType, defineField } from "sanity";

export default defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Required for accessibility",
      validation: (r) => r.required().error("Alt text is required for accessibility"),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Underwater", value: "Underwater" },
          { title: "Rooms", value: "Rooms" },
          { title: "Beach", value: "Beach" },
          { title: "Dining", value: "Dining" },
          { title: "Activities", value: "Activities" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
  preview: {
    select: { title: "alt", media: "image", subtitle: "category" },
  },
});
