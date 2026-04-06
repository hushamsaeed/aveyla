import AdminForm, { Field, Input, Textarea, Select } from "@/components/admin/AdminForm";
import { createNoticeAction } from "../actions";

export default function NewNoticePage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
          Add Site Notice
        </h1>
        <p className="mt-1 font-body text-sm text-driftwood">
          Notices appear as banners on the specified pages
        </p>
      </div>

      <div className="max-w-2xl">
        <AdminForm action={createNoticeAction} cancelHref="/admin/notices">
          <Field label="Title" htmlFor="title" required>
            <Input id="title" name="title" type="text" required />
          </Field>

          <Field label="Body" htmlFor="body" hint="Optional additional detail">
            <Textarea id="body" name="body" rows={3} />
          </Field>

          <Field label="Severity" htmlFor="severity">
            <Select id="severity" name="severity" defaultValue="info">
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </Select>
          </Field>

          <Field
            label="Target Pages"
            htmlFor="targetPages"
            hint="One page path per line, e.g. /rooms. Leave empty for all pages."
          >
            <Textarea
              id="targetPages"
              name="targetPages"
              rows={4}
              placeholder="/rooms&#10;/packages&#10;/"
            />
          </Field>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="active"
              name="active"
              value="1"
              className="h-4 w-4 accent-terracotta"
            />
            <label htmlFor="active" className="font-body text-sm text-dark-driftwood">
              Active (visible to site visitors)
            </label>
          </div>
        </AdminForm>
      </div>
    </div>
  );
}
