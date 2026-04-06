import AdminForm, { Field, Input, Textarea, Select } from "@/components/admin/AdminForm";
import ImageUpload from "@/components/admin/ImageUpload";
import { createActivityAction } from "../actions";

export default function NewActivityPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
          New Activity
        </h1>
        <p className="mt-1 font-body text-sm text-driftwood">
          Create a new activity listing
        </p>
      </div>

      <div className="max-w-2xl">
        <AdminForm action={createActivityAction} cancelHref="/admin/activities">
          <Field label="Name" htmlFor="name" required>
            <Input id="name" name="name" type="text" required />
          </Field>

          <Field label="Slug" htmlFor="slug" required hint="URL-friendly identifier, e.g. manta-diving">
            <Input id="slug" name="slug" type="text" required />
          </Field>

          <Field label="Category" htmlFor="category">
            <Select id="category" name="category">
              <option value="">Select category...</option>
              <option value="diving">Diving</option>
              <option value="snorkeling">Snorkeling</option>
              <option value="water-sports">Water Sports</option>
              <option value="land">Land Activities</option>
              <option value="cultural">Cultural</option>
              <option value="wellness">Wellness</option>
            </Select>
          </Field>

          <Field label="Short Description" htmlFor="shortDescription" hint="Brief summary for cards">
            <Input id="shortDescription" name="shortDescription" type="text" />
          </Field>

          <Field label="Description" htmlFor="description">
            <Textarea id="description" name="description" rows={5} />
          </Field>

          <ImageUpload name="heroImage" label="Hero Image" />

          <Field
            label="Safety Requirements"
            htmlFor="safetyRequirements"
            hint="One requirement per line"
          >
            <Textarea
              id="safetyRequirements"
              name="safetyRequirements"
              rows={5}
              placeholder="Must be able to swim&#10;Minimum age 10"
            />
          </Field>

          <Field label="Seasonal Notes" htmlFor="seasonalNotes">
            <Textarea id="seasonalNotes" name="seasonalNotes" rows={3} />
          </Field>

          <Field label="Sort Order" htmlFor="sortOrder">
            <Input id="sortOrder" name="sortOrder" type="number" defaultValue="0" />
          </Field>
        </AdminForm>
      </div>
    </div>
  );
}
