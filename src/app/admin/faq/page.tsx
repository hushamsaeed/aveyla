import { getAllFaq } from "@/lib/data/faq";
import Link from "next/link";
import { deleteFaqAction } from "./actions";

export default async function AdminFaqPage() {
  const items = await getAllFaq();

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            FAQ
          </h1>
          <p className="mt-1 font-body text-sm text-driftwood">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/faq/new"
          className="bg-terracotta px-5 py-2.5 font-body text-sm font-semibold text-white hover:bg-terracotta/90 transition-colors rounded-sm"
        >
          Add FAQ Item
        </Link>
      </div>

      <div className="overflow-x-auto rounded-sm border border-gray-100">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Question</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Category</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Sort</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Active</th>
              <th className="px-4 py-3 text-right font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center font-body text-sm text-driftwood">
                  No FAQ items yet.
                </td>
              </tr>
            )}
            {items.map((item, idx) => (
              <tr key={item.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-4 py-3 font-body text-sm text-dark-driftwood max-w-sm">
                  <p className="truncate">{item.question}</p>
                </td>
                <td className="px-4 py-3 font-body text-sm text-driftwood">
                  {item.category}
                </td>
                <td className="px-4 py-3 font-body text-sm text-driftwood">
                  {item.sortOrder}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-body text-xs ${
                    item.active === 1 ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {item.active === 1 ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/faq/${item.id}`}
                      className="font-body text-sm text-muted-ocean hover:text-terracotta transition-colors"
                    >
                      Edit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteFaqAction(item.id);
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
    </div>
  );
}
