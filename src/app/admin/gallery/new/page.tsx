import AdminForm, { Field, Input, Textarea, Select } from "@/components/admin/AdminForm";
import ImageUpload from "@/components/admin/ImageUpload";
import { createGalleryImageAction } from "../actions";

export default function NewGalleryImagePage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
          Add Gallery Image
        </h1>
      </div>

      <div className="max-w-2xl">
        <AdminForm action={createGalleryImageAction} cancelHref="/admin/gallery">
          <ImageUpload name="imagePath" label="Image" />

          <Field label="Alt Text" htmlFor="alt" required hint="Describe the image for accessibility">
            <Input id="alt" name="alt" type="text" required />
          </Field>

          <Field label="Category" htmlFor="category" required>
            <Select id="category" name="category" required>
              <option value="">Select category...</option>
              <option value="underwater">Underwater</option>
              <option value="resort">Resort</option>
              <option value="rooms">Rooms</option>
              <option value="dining">Dining</option>
              <option value="activities">Activities</option>
              <option value="marine-life">Marine Life</option>
              <option value="aerial">Aerial</option>
            </Select>
          </Field>

          <Field label="Caption" htmlFor="caption">
            <Textarea id="caption" name="caption" rows={2} />
          </Field>

          <Field label="Sort Order" htmlFor="sortOrder">
            <Input id="sortOrder" name="sortOrder" type="number" defaultValue="0" />
          </Field>
        </AdminForm>
      </div>
    </div>
  );
}
