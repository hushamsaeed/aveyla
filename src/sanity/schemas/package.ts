import { defineType, defineField } from "sanity";

export default defineType({
  name: "package",
  title: "Package",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "season",
      title: "Season",
      type: "string",
      description: "Leave empty for year-round. e.g. 'June – November'",
    }),
    defineField({
      name: "inclusions",
      title: "Standard Inclusions",
      description: "Applies to all variants of this package",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "pricingTiers",
      title: "Pricing Tiers",
      description: "One entry per duration option (e.g. 3 Nights, 4 Nights, etc.)",
      type: "array",
      of: [
        {
          type: "object",
          name: "pricingTier",
          title: "Pricing Tier",
          fields: [
            { name: "nights", title: "Number of Nights", type: "number", validation: (r) => r.required().min(1) },
            { name: "label", title: "Label", type: "string", description: "e.g. '3 Nights'" },
            { name: "dives", title: "Number of Dives", type: "number", description: "Leave empty if not applicable" },
            { name: "snorkelTrips", title: "Manta Snorkel Trips", type: "number", description: "Leave empty if not applicable" },
            { name: "villageTwin", title: "Village Deluxe — Twin Share (pp)", type: "number", validation: (r) => r.required() },
            { name: "villageSingle", title: "Village Deluxe — Single (pp)", type: "number", validation: (r) => r.required() },
            { name: "beachTwin", title: "Beach/Ocean Deluxe — Twin Share (pp)", type: "number", validation: (r) => r.required() },
            { name: "beachSingle", title: "Beach/Ocean Deluxe — Single (pp)", type: "number", validation: (r) => r.required() },
          ],
          preview: {
            select: { nights: "nights", dives: "dives", villageTwin: "villageTwin" },
            prepare({ nights, dives, villageTwin }: { nights?: number; dives?: number; villageTwin?: number }) {
              const subtitle = [dives ? `${dives} dives` : null, villageTwin ? `from $${villageTwin}` : null].filter(Boolean).join(" · ");
              return { title: `${nights} Nights`, subtitle };
            },
          },
        },
      ],
    }),
    defineField({ name: "priceFrom", title: "Starting Price (USD)", type: "number", description: "Lowest twin share price — auto-shown on listings" }),
    defineField({ name: "seasonNotes", title: "Season Notes", type: "text", rows: 2 }),
    defineField({ name: "bookingLink", title: "Booking Link Override", type: "url" }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "name", subtitle: "season", media: "heroImage" },
  },
});
