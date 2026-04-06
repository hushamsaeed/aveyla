import { getAllUsers } from "@/lib/data/users";
import Link from "next/link";
import { deleteUserAction } from "./actions";

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Admin Users
          </h1>
          <p className="mt-1 font-body text-sm text-driftwood">
            {users.length} user{users.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/users/new"
          className="bg-terracotta px-5 py-2.5 font-body text-sm font-semibold text-white hover:bg-terracotta/90 transition-colors rounded-sm"
        >
          Add User
        </Link>
      </div>

      <div className="overflow-x-auto rounded-sm border border-gray-100 max-w-3xl">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Name</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Email</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Role</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Created</th>
              <th className="px-4 py-3 text-right font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center font-body text-sm text-driftwood">
                  No users found.
                </td>
              </tr>
            )}
            {users.map((user, idx) => (
              <tr key={user.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-4 py-3 font-body text-sm text-dark-driftwood font-medium">
                  {user.name || "-"}
                </td>
                <td className="px-4 py-3 font-body text-sm text-driftwood">
                  {user.email}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-linen px-2 py-0.5 font-body text-xs text-dark-driftwood">
                    {user.role || "admin"}
                  </span>
                </td>
                <td className="px-4 py-3 font-body text-sm text-driftwood">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="font-body text-sm text-muted-ocean hover:text-terracotta transition-colors"
                    >
                      Edit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteUserAction(user.id);
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
