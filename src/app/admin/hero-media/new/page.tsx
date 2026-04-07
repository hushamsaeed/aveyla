import AdminForm, { Field, Input, Select } from "@/components/admin/AdminForm";
import ImageUpload from "@/components/admin/ImageUpload";
import { createHeroMediaAction } from "../actions";

export default function NewHeroMediaPage() {
  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-semibold text-dark-driftwood mb-6">
        Add Hero Slide
      </h1>

      <div className="max-w-2xl">
        <AdminForm action={createHeroMediaAction} cancelHref="/admin/hero-media">
          <Field label="Media Type" htmlFor="mediaType" required>
            <Select id="mediaType" name="mediaType" required>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </Select>
          </Field>

          <ImageUpload name="mediaPath" label="Media File (image or video)" acceptVideo />

          <ImageUpload name="posterPath" label="Poster Image (for videos — shown while loading)" />

          <Field label="Alt Text" htmlFor="alt">
            <Input id="alt" name="alt" type="text" placeholder="Describe the image/video" />
          </Field>

          <Field label="Sort Order" htmlFor="sortOrder">
            <Input id="sortOrder" name="sortOrder" type="number" defaultValue="0" />
          </Field>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="active" name="active" value="1" defaultChecked className="h-4 w-4 accent-terracotta" />
            <label htmlFor="active" className="font-body text-sm text-dark-driftwood">Active (visible on site)</label>
          </div>
        </AdminForm>
      </div>
    </div>
  );
}
