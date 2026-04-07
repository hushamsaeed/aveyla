import { notFound } from "next/navigation";
import { getHeroMediaById } from "@/lib/data/heroMedia";
import AdminForm, { Field, Input, Select } from "@/components/admin/AdminForm";
import ImageUpload from "@/components/admin/ImageUpload";
import DeleteButton from "@/components/admin/DeleteButton";
import { updateHeroMediaAction, deleteHeroMediaAction } from "../actions";

export default async function EditHeroMediaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getHeroMediaById(Number(id));
  if (!item) notFound();

  const updateAction = updateHeroMediaAction.bind(null, item.id);
  const deleteAction = deleteHeroMediaAction.bind(null, item.id);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
          Edit Hero Slide
        </h1>
        <DeleteButton action={deleteAction} label="Delete Slide" />
      </div>

      <div className="max-w-2xl">
        <AdminForm action={updateAction} cancelHref="/admin/hero-media">
          <Field label="Media Type" htmlFor="mediaType" required>
            <Select id="mediaType" name="mediaType" required defaultValue={item.mediaType}>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </Select>
          </Field>

          <ImageUpload name="mediaPath" label="Media File" defaultValue={item.mediaPath} acceptVideo />

          <ImageUpload name="posterPath" label="Poster Image (for videos)" defaultValue={item.posterPath || ""} />

          <Field label="Alt Text" htmlFor="alt">
            <Input id="alt" name="alt" type="text" defaultValue={item.alt || ""} />
          </Field>

          <Field label="Sort Order" htmlFor="sortOrder">
            <Input id="sortOrder" name="sortOrder" type="number" defaultValue={item.sortOrder?.toString() || "0"} />
          </Field>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="active" name="active" value="1" defaultChecked={item.active === 1} className="h-4 w-4 accent-terracotta" />
            <label htmlFor="active" className="font-body text-sm text-dark-driftwood">Active (visible on site)</label>
          </div>
        </AdminForm>
      </div>
    </div>
  );
}
