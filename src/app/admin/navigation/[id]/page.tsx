import { notFound } from "next/navigation";
import { db } from "@/db";
import { navItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import AdminForm, { Field, Input, Select } from "@/components/admin/AdminForm";
import { updateNavItemAction, deleteNavItemAction } from "../actions";

export default async function EditNavItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [item] = db.select().from(navItems).where(eq(navItems.id, Number(id))).limit(1).all();
  if (!item) notFound();

  const updateAction = updateNavItemAction.bind(null, item.id);
  const deleteAction = deleteNavItemAction.bind(null, item.id);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Edit Navigation Item
          </h1>
          <p className="mt-1 font-body text-sm text-driftwood">{item.label}</p>
        </div>
        <form action={deleteAction}>
          <button
            type="submit"
            className="border border-red-200 px-4 py-2 font-body text-sm text-red-600 hover:bg-red-50 transition-colors rounded-sm"
          >
            Delete
          </button>
        </form>
      </div>

      <div className="max-w-lg">
        <AdminForm action={updateAction} cancelHref="/admin/navigation">
          <Field label="Location" htmlFor="location" required>
            <Select id="location" name="location" required defaultValue={item.location}>
              <option value="">Select location...</option>
              <option value="header">Header Navigation</option>
              <option value="footer_explore">Footer — Explore</option>
              <option value="footer_info">Footer — Info</option>
            </Select>
          </Field>

          <Field label="Label" htmlFor="label" required>
            <Input id="label" name="label" type="text" required defaultValue={item.label} />
          </Field>

          <Field label="Href" htmlFor="href" required>
            <Input id="href" name="href" type="text" required defaultValue={item.href} />
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Sort Order" htmlFor="sortOrder">
              <Input
                id="sortOrder"
                name="sortOrder"
                type="number"
                defaultValue={item.sortOrder?.toString() || "0"}
              />
            </Field>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="active"
                name="active"
                value="1"
                defaultChecked={item.active === 1}
                className="h-4 w-4 accent-terracotta"
              />
              <label htmlFor="active" className="font-body text-sm text-dark-driftwood">
                Active
              </label>
            </div>
          </div>
        </AdminForm>
      </div>
    </div>
  );
}
