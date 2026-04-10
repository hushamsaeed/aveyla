import { db } from "@/db";
import { pageContent } from "@/db/schema";
import { asc } from "drizzle-orm";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";
import { deletePageSectionByIdAction } from "./actions";

export default async function AdminPagesPage() {
  const sections = db.select().from(pageContent).orderBy(asc(pageContent.pageSlug), asc(pageContent.sortOrder)).all();

  // Group by pageSlug
  const grouped: Record<string, typeof sections> = {};
  for (const section of sections) {
    if (!grouped[section.pageSlug]) grouped[section.pageSlug] = [];
    grouped[section.pageSlug].push(section);
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Page Content
          </h1>
          <p className="mt-1 font-body text-sm text-driftwood">
            Manage page-specific content sections
          </p>
        </div>
        <Link
          href="/admin/pages/new"
          className="bg-terracotta px-5 py-2.5 font-body text-sm font-semibold text-white hover:bg-terracotta/90 transition-colors rounded-sm"
        >
          Add Section
        </Link>
      </div>

      {sections.length === 0 && (
        <div className="rounded-sm bg-white border border-gray-100 p-12 text-center">
          <p className="font-body text-sm text-driftwood">
            No page sections yet. Add your first content section.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {Object.entries(grouped).map(([slug, pageSections]) => (
          <div key={slug} className="rounded-sm bg-white border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <h2 className="font-body text-sm font-semibold text-dark-driftwood">
                Page: <span className="font-mono text-muted-ocean">{slug}</span>
              </h2>
            </div>
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-4 py-2 text-left font-body text-xs font-medium text-driftwood">Section Key</th>
                  <th className="px-4 py-2 text-left font-body text-xs font-medium text-driftwood">Title</th>
                  <th className="px-4 py-2 text-left font-body text-xs font-medium text-driftwood">Body</th>
                  <th className="px-4 py-2 text-left font-body text-xs font-medium text-driftwood">Sort</th>
                  <th className="px-4 py-2 text-right font-body text-xs font-medium text-driftwood">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageSections.map((section, idx) => (
                  <tr key={section.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}>
                    <td className="px-4 py-2.5 font-body text-sm text-dark-driftwood font-mono">
                      {section.sectionKey}
                    </td>
                    <td className="px-4 py-2.5 font-body text-sm text-driftwood max-w-xs">
                      <p className="truncate">{section.title || "-"}</p>
                    </td>
                    <td className="px-4 py-2.5 font-body text-sm text-driftwood max-w-xs">
                      <p className="truncate">{section.body || "-"}</p>
                    </td>
                    <td className="px-4 py-2.5 font-body text-sm text-driftwood">
                      {section.sortOrder}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/pages/${section.id}`}
                          className="font-body text-sm text-muted-ocean hover:text-terracotta transition-colors"
                        >
                          Edit
                        </Link>
                        <DeleteButton action={deletePageSectionByIdAction.bind(null, section.id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
