import AdminForm, { Field, Input, Select } from "@/components/admin/AdminForm";
import { createNavItemAction } from "../actions";

export default function NewNavItemPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
          Add Navigation Item
        </h1>
      </div>

      <div className="max-w-lg">
        <AdminForm action={createNavItemAction} cancelHref="/admin/navigation">
          <Field label="Location" htmlFor="location" required>
            <Select id="location" name="location" required>
              <option value="">Select location...</option>
              <option value="header">Header Navigation</option>
              <option value="footer_explore">Footer — Explore</option>
              <option value="footer_info">Footer — Info</option>
            </Select>
          </Field>

          <Field label="Label" htmlFor="label" required hint="Text displayed in navigation">
            <Input id="label" name="label" type="text" required />
          </Field>

          <Field label="Href" htmlFor="href" required hint="URL path, e.g. /rooms">
            <Input id="href" name="href" type="text" required placeholder="/rooms" />
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Sort Order" htmlFor="sortOrder" hint="Lower numbers appear first">
              <Input id="sortOrder" name="sortOrder" type="number" defaultValue="0" />
            </Field>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="active"
                name="active"
                value="1"
                defaultChecked
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
