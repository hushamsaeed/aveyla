import { db } from "@/db";
import {
  rooms,
  activities,
  packages,
  galleryImages,
  reviews,
  faqItems,
  siteNotices,
  navItems,
  adminUsers,
  pageContent,
} from "@/db/schema";
import Link from "next/link";

async function getCounts() {
  return {
    rooms: db.select().from(rooms).all().length,
    activities: db.select().from(activities).all().length,
    packages: db.select().from(packages).all().length,
    gallery: db.select().from(galleryImages).all().length,
    reviews: db.select().from(reviews).all().length,
    faq: db.select().from(faqItems).all().length,
    notices: db.select().from(siteNotices).all().length,
    navItems: db.select().from(navItems).all().length,
    users: db.select().from(adminUsers).all().length,
    pages: db.select().from(pageContent).all().length,
  };
}

const STAT_CARDS = [
  { label: "Rooms", key: "rooms" as const, href: "/admin/rooms" },
  { label: "Activities", key: "activities" as const, href: "/admin/activities" },
  { label: "Packages", key: "packages" as const, href: "/admin/packages" },
  { label: "Gallery Images", key: "gallery" as const, href: "/admin/gallery" },
  { label: "Reviews", key: "reviews" as const, href: "/admin/reviews" },
  { label: "FAQ Items", key: "faq" as const, href: "/admin/faq" },
  { label: "Site Notices", key: "notices" as const, href: "/admin/notices" },
  { label: "Nav Items", key: "navItems" as const, href: "/admin/navigation" },
  { label: "Users", key: "users" as const, href: "/admin/users" },
  { label: "Page Sections", key: "pages" as const, href: "/admin/pages" },
];

export default async function AdminDashboard() {
  const counts = await getCounts();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
          Dashboard
        </h1>
        <p className="mt-1 font-body text-sm text-driftwood">
          Overview of all content
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {STAT_CARDS.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="rounded-sm bg-white p-5 shadow-sm border border-gray-100 hover:border-terracotta/30 transition-colors group"
          >
            <div className="font-display text-3xl font-semibold text-dark-driftwood group-hover:text-terracotta transition-colors">
              {counts[card.key]}
            </div>
            <div className="mt-1 font-body text-sm text-driftwood">
              {card.label}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-sm bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="font-body text-sm font-semibold text-dark-driftwood mb-4 uppercase tracking-wide">
            Quick Actions
          </h2>
          <div className="space-y-2">
            {[
              { label: "Add new room", href: "/admin/rooms/new" },
              { label: "Add new activity", href: "/admin/activities/new" },
              { label: "Add new package", href: "/admin/packages/new" },
              { label: "Upload gallery image", href: "/admin/gallery/new" },
              { label: "Add review", href: "/admin/reviews/new" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="block font-body text-sm text-muted-ocean hover:text-terracotta transition-colors"
              >
                + {action.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-sm bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="font-body text-sm font-semibold text-dark-driftwood mb-4 uppercase tracking-wide">
            Site Configuration
          </h2>
          <div className="space-y-2">
            {[
              { label: "Manage SEO metadata", href: "/admin/seo" },
              { label: "Edit navigation", href: "/admin/navigation" },
              { label: "Site settings", href: "/admin/settings" },
              { label: "Manage users", href: "/admin/users" },
              { label: "Edit page content", href: "/admin/pages" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="block font-body text-sm text-muted-ocean hover:text-terracotta transition-colors"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
