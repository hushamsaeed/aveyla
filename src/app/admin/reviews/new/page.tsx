import AdminForm, { Field, Input, Textarea, Select } from "@/components/admin/AdminForm";
import { createReviewAction } from "../actions";

export default function NewReviewPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
          Add Review
        </h1>
      </div>

      <div className="max-w-2xl">
        <AdminForm action={createReviewAction} cancelHref="/admin/reviews">
          <Field label="Quote" htmlFor="quote" required hint="The guest review text">
            <Textarea id="quote" name="quote" rows={4} required />
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Guest Name" htmlFor="guestName" required>
              <Input id="guestName" name="guestName" type="text" required />
            </Field>

            <Field label="Guest Country" htmlFor="guestCountry">
              <Input id="guestCountry" name="guestCountry" type="text" placeholder="e.g. United Kingdom" />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Star Rating" htmlFor="starRating">
              <Select id="starRating" name="starRating">
                <option value="">No rating</option>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </Select>
            </Field>

            <Field label="Date" htmlFor="date" hint="e.g. March 2024">
              <Input id="date" name="date" type="text" placeholder="March 2024" />
            </Field>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="active"
              name="active"
              value="1"
              defaultChecked
              className="h-4 w-4 accent-terracotta"
            />
            <label htmlFor="active" className="font-body text-sm text-dark-driftwood">
              Active (visible to guests)
            </label>
          </div>
        </AdminForm>
      </div>
    </div>
  );
}
