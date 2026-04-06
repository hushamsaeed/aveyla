import { getAllNavItems } from "@/lib/data/navigation";
import Link from "next/link";
import { deleteNavItemAction } from "./actions";

const LOCATION_LABELS: Record<string, string> = {
  header: "Header Navigation",
  footer_explore: "Footer — Explore",
  footer_info: "Footer — Info",
};

export default async function AdminNavigationPage() {
  const allItems = await getAllNavItems();

  const grouped: Record<string, typeof allItems> = {};
  for (const item of allItems) {
    if (!grouped[item.location]) grouped[item.location] = [];
    grouped[item.location].push(item);
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Navigation
          </h1>
          <p className="mt-1 font-body text-sm text-driftwood">
            Manage header and footer navigation links
          </p>
        </div>
        <Link
          href="/admin/navigation/new"
          className="bg-terracotta px-5 py-2.5 font-body text-sm font-semibold text-white hover:bg-terracotta/90 transition-colors rounded-sm"
        >
          Add Nav Item
        </Link>
      </div>

      <div className="space-y-6">
        {["header", "footer_explore", "footer_info"].map((location) => {
          const items = grouped[location] || [];
          return (
            <div key={location} className="rounded-sm bg-white border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                <h2 className="font-body text-sm font-semibold text-dark-driftwood">
                  {LOCATION_LABELS[location] || location}
                </h2>
              </div>
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="px-4 py-2 text-left font-body text-xs font-medium text-driftwood">Label</th>
                    <th className="px-4 py-2 text-left font-body text-xs font-medium text-driftwood">Href</th>
                    <th className="px-4 py-2 text-left font-body text-xs font-medium text-driftwood">Sort</th>
                    <th className="px-4 py-2 text-left font-body text-xs font-medium text-driftwood">Active</th>
                    <th className="px-4 py-2 text-right font-body text-xs font-medium text-driftwood">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center font-body text-sm text-driftwood">
                        No items in this section.
                      </td>
                    </tr>
                  )}
                  {items.map((item, idx) => (
                    <tr key={item.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}>
                      <td className="px-4 py-2.5 font-body text-sm text-dark-driftwood font-medium">
                        {item.label}
                      </td>
                      <td className="px-4 py-2.5 font-body text-sm text-driftwood font-mono">
                        {item.href}
                      </td>
                      <td className="px-4 py-2.5 font-body text-sm text-driftwood">
                        {item.sortOrder}
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-body text-xs ${
                          item.active === 1 ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                        }`}>
                          {item.active === 1 ? "Active" : "Hidden"}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            href={`/admin/navigation/${item.id}`}
                            className="font-body text-sm text-muted-ocean hover:text-terracotta transition-colors"
                          >
                            Edit
                          </Link>
                          <form
                            action={async () => {
                              "use server";
                              await deleteNavItemAction(item.id);
                            }}
                          >
                            <button
                              type="submit"
                              className="font-body text-sm text-red-500 hover:text-red-700 transition-colors"
                            >
                              Delete
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}
