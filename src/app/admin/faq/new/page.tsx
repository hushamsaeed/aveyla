import AdminForm, { Field, Input, Textarea, Select } from "@/components/admin/AdminForm";
import { createFaqAction } from "../actions";

export default function NewFaqPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
          Add FAQ Item
        </h1>
      </div>

      <div className="max-w-2xl">
        <AdminForm action={createFaqAction} cancelHref="/admin/faq">
          <Field label="Question" htmlFor="question" required>
            <Input id="question" name="question" type="text" required />
          </Field>

          <Field label="Answer" htmlFor="answer" required>
            <Textarea id="answer" name="answer" rows={5} required />
          </Field>

          <Field label="Category" htmlFor="category" required>
            <Select id="category" name="category" required>
              <option value="">Select category...</option>
              <option value="general">General</option>
              <option value="diving">Diving</option>
              <option value="accommodation">Accommodation</option>
              <option value="getting-here">Getting Here</option>
              <option value="booking">Booking</option>
              <option value="dining">Dining</option>
              <option value="activities">Activities</option>
            </Select>
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Sort Order" htmlFor="sortOrder">
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
