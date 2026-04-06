import AdminForm, { Field, Input, Textarea, Select } from "@/components/admin/AdminForm";
import ImageUpload from "@/components/admin/ImageUpload";
import { createRoomAction } from "../actions";

export default function NewRoomPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
          New Room
        </h1>
        <p className="mt-1 font-body text-sm text-driftwood">
          Create a new room listing
        </p>
      </div>

      <div className="max-w-2xl">
        <AdminForm action={createRoomAction} cancelHref="/admin/rooms">
          <Field label="Name" htmlFor="name" required>
            <Input id="name" name="name" type="text" required />
          </Field>

          <Field label="Slug" htmlFor="slug" required hint="URL-friendly identifier, e.g. beach-villa">
            <Input id="slug" name="slug" type="text" required />
          </Field>

          <Field label="Room Type" htmlFor="roomType">
            <Select id="roomType" name="roomType">
              <option value="">Select type...</option>
              <option value="village">Village Room</option>
              <option value="beach">Beach Villa</option>
              <option value="water">Water Bungalow</option>
              <option value="suite">Suite</option>
            </Select>
          </Field>

          <Field label="Description" htmlFor="description">
            <Textarea id="description" name="description" rows={5} />
          </Field>

          <ImageUpload name="heroImage" label="Hero Image" />

          <Field
            label="Amenities"
            htmlFor="amenities"
            hint="One amenity per line"
          >
            <Textarea id="amenities" name="amenities" rows={6} placeholder="Air conditioning&#10;Private bathroom&#10;Ocean view" />
          </Field>

          <Field label="Price From (USD/night)" htmlFor="priceFrom">
            <Input id="priceFrom" name="priceFrom" type="number" min="0" step="0.01" />
          </Field>

          <Field label="Sort Order" htmlFor="sortOrder">
            <Input id="sortOrder" name="sortOrder" type="number" defaultValue="0" />
          </Field>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="noticeActive"
              name="noticeActive"
              value="1"
              className="h-4 w-4 accent-terracotta"
            />
            <label htmlFor="noticeActive" className="font-body text-sm text-dark-driftwood">
              Show notice banner on room page
            </label>
          </div>

          <Field label="Notice Text" htmlFor="noticeText" hint="Shown when notice is active">
            <Input id="noticeText" name="noticeText" type="text" />
          </Field>
        </AdminForm>
      </div>
    </div>
  );
}
