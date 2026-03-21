import { defineType, defineField } from "sanity";

export default defineType({
  name: "seoMetadata",
  title: "SEO Metadata",
  type: "document",
  fields: [
    defineField({ name: "page", title: "Page Path", type: "string", validation: (r) => r.required(), description: "e.g. / or /rooms or /activities/scuba-diving" }),
    defineField({ name: "metaTitle", title: "Meta Title", type: "string", description: "Max 60 characters", validation: (r) => r.max(60) }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 2, description: "Max 155 characters", validation: (r) => r.max(155) }),
    defineField({ name: "ogImage", title: "OG Image", type: "image", description: "1200x630 recommended" }),
    defineField({ name: "canonicalUrl", title: "Canonical URL Override", type: "url" }),
  ],
  preview: {
    select: { title: "page", subtitle: "metaTitle" },
  },
});
