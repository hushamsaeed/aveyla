import { getAllNotices } from "@/lib/data/notices";
import Link from "next/link";
import { deleteNoticeAction } from "./actions";

export default async function AdminNoticesPage() {
  const notices = await getAllNotices();

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Site Notices
          </h1>
          <p className="mt-1 font-body text-sm text-driftwood">
            {notices.length} notice{notices.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/notices/new"
          className="bg-terracotta px-5 py-2.5 font-body text-sm font-semibold text-white hover:bg-terracotta/90 transition-colors rounded-sm"
        >
          Add Notice
        </Link>
      </div>

      <div className="overflow-x-auto rounded-sm border border-gray-100">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Title</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Severity</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Target Pages</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Active</th>
              <th className="px-4 py-3 text-right font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notices.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center font-body text-sm text-driftwood">
                  No notices yet.
                </td>
              </tr>
            )}
            {notices.map((notice, idx) => (
              <tr key={notice.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-4 py-3">
                  <p className="font-body text-sm text-dark-driftwood font-medium">{notice.title}</p>
                  {notice.body && (
                    <p className="font-body text-xs text-driftwood mt-0.5 truncate max-w-xs">{notice.body}</p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-body text-xs ${
                    notice.severity === "warning"
                      ? "bg-yellow-50 text-yellow-700"
                      : notice.severity === "error"
                      ? "bg-red-50 text-red-700"
                      : "bg-blue-50 text-blue-700"
                  }`}>
                    {notice.severity}
                  </span>
                </td>
                <td className="px-4 py-3 font-body text-sm text-driftwood">
                  {Array.isArray(notice.targetPages) && notice.targetPages.length > 0
                    ? notice.targetPages.join(", ")
                    : "All pages"}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-body text-xs ${
                    notice.active === 1 ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {notice.active === 1 ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/notices/${notice.id}`}
                      className="font-body text-sm text-muted-ocean hover:text-terracotta transition-colors"
                    >
                      Edit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteNoticeAction(notice.id);
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
