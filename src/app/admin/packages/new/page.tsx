import AdminForm, { Field, Input, Textarea, Select } from "@/components/admin/AdminForm";
import ImageUpload from "@/components/admin/ImageUpload";
import PricingTiersForm from "@/components/admin/PricingTiersForm";
import { createPackageAction } from "../actions";

export default function NewPackagePage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
          New Package
        </h1>
        <p className="mt-1 font-body text-sm text-driftwood">
          Create a new dive/stay package
        </p>
      </div>

      <div className="max-w-4xl">
        <AdminForm action={createPackageAction} cancelHref="/admin/packages">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Name" htmlFor="name" required>
              <Input id="name" name="name" type="text" required />
            </Field>

            <Field label="Slug" htmlFor="slug" required hint="URL-friendly identifier">
              <Input id="slug" name="slug" type="text" required />
            </Field>
          </div>

          <Field label="Tagline" htmlFor="tagline" hint="Short marketing line">
            <Input id="tagline" name="tagline" type="text" />
          </Field>

          <Field label="Description" htmlFor="description">
            <Textarea id="description" name="description" rows={5} />
          </Field>

          <ImageUpload name="heroImage" label="Hero Image" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Season" htmlFor="season">
              <Select id="season" name="season">
                <option value="">All year</option>
                <option value="manta-season">Manta Season</option>
                <option value="whale-shark">Whale Shark Season</option>
                <option value="dry-season">Dry Season</option>
                <option value="wet-season">Wet Season</option>
                <option value="year-round">Year Round</option>
              </Select>
            </Field>

            <Field label="Price From (USD)" htmlFor="priceFrom" hint="Lowest tier price">
              <Input id="priceFrom" name="priceFrom" type="number" min="0" step="0.01" />
            </Field>
          </div>

          <Field label="Inclusions" htmlFor="inclusions" hint="One inclusion per line">
            <Textarea
              id="inclusions"
              name="inclusions"
              rows={6}
              placeholder="Full board accommodation&#10;Airport transfers&#10;Daily diving"
            />
          </Field>

          <Field label="Season Notes" htmlFor="seasonNotes">
            <Textarea id="seasonNotes" name="seasonNotes" rows={3} />
          </Field>

          <Field label="Booking Link" htmlFor="bookingLink">
            <Input id="bookingLink" name="bookingLink" type="url" placeholder="https://..." />
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
                Active (visible to guests)
              </label>
            </div>
          </div>

          <PricingTiersForm />
        </AdminForm>
      </div>
    </div>
  );
}
