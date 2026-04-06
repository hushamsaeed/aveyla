import { getAllActivities } from "@/lib/data/activities";
import Link from "next/link";
import { deleteActivityAction } from "./actions";

export default async function AdminActivitiesPage() {
  const activities = await getAllActivities();

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Activities
          </h1>
          <p className="mt-1 font-body text-sm text-driftwood">
            {activities.length} activit{activities.length !== 1 ? "ies" : "y"}
          </p>
        </div>
        <Link
          href="/admin/activities/new"
          className="bg-terracotta px-5 py-2.5 font-body text-sm font-semibold text-white hover:bg-terracotta/90 transition-colors rounded-sm"
        >
          Add Activity
        </Link>
      </div>

      <div className="overflow-x-auto rounded-sm border border-gray-100">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Name</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Slug</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Category</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Sort</th>
              <th className="px-4 py-3 text-right font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center font-body text-sm text-driftwood">
                  No activities yet.
                </td>
              </tr>
            )}
            {activities.map((activity, idx) => (
              <tr key={activity.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-4 py-3 font-body text-sm text-dark-driftwood font-medium">
                  {activity.name}
                </td>
                <td className="px-4 py-3 font-body text-sm text-driftwood font-mono">
                  {activity.slug}
                </td>
                <td className="px-4 py-3 font-body text-sm text-driftwood">
                  {activity.category || "-"}
                </td>
                <td className="px-4 py-3 font-body text-sm text-driftwood">
                  {activity.sortOrder}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/activities/${activity.id}`}
                      className="font-body text-sm text-muted-ocean hover:text-terracotta transition-colors"
                    >
                      Edit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteActivityAction(activity.id);
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
