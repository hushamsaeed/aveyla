import { db } from "@/db";
import { packages } from "@/db/schema";
import { asc } from "drizzle-orm";
import Link from "next/link";
import { deletePackageAction } from "./actions";

export default async function AdminPackagesPage() {
  const allPackages = db.select().from(packages).orderBy(asc(packages.sortOrder), asc(packages.name)).all();

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Packages
          </h1>
          <p className="mt-1 font-body text-sm text-driftwood">
            {allPackages.length} package{allPackages.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/packages/new"
          className="bg-terracotta px-5 py-2.5 font-body text-sm font-semibold text-white hover:bg-terracotta/90 transition-colors rounded-sm"
        >
          Add Package
        </Link>
      </div>

      <div className="overflow-x-auto rounded-sm border border-gray-100">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Name</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Slug</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Season</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Price From</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Active</th>
              <th className="px-4 py-3 text-right font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allPackages.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center font-body text-sm text-driftwood">
                  No packages yet.
                </td>
              </tr>
            )}
            {allPackages.map((pkg, idx) => (
              <tr key={pkg.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-4 py-3 font-body text-sm text-dark-driftwood font-medium">
                  {pkg.name}
                </td>
                <td className="px-4 py-3 font-body text-sm text-driftwood font-mono">
                  {pkg.slug}
                </td>
                <td className="px-4 py-3 font-body text-sm text-driftwood">
                  {pkg.season || "-"}
                </td>
                <td className="px-4 py-3 font-body text-sm text-driftwood">
                  {pkg.priceFrom ? `$${pkg.priceFrom}` : "-"}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-body text-xs ${
                    pkg.active === 1 ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {pkg.active === 1 ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/packages/${pkg.id}`}
                      className="font-body text-sm text-muted-ocean hover:text-terracotta transition-colors"
                    >
                      Edit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deletePackageAction(pkg.id);
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
