import { notFound } from "next/navigation";
import { getGalleryImageById } from "@/lib/data/gallery";
import AdminForm, { Field, Input, Textarea, Select } from "@/components/admin/AdminForm";
import ImageUpload from "@/components/admin/ImageUpload";
import DeleteButton from "@/components/admin/DeleteButton";
import { updateGalleryImageAction, deleteGalleryImageAction } from "../actions";

export default async function EditGalleryImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const image = await getGalleryImageById(Number(id));
  if (!image) notFound();

  const updateAction = updateGalleryImageAction.bind(null, image.id);
  const deleteAction = deleteGalleryImageAction.bind(null, image.id);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Edit Gallery Image
          </h1>
        </div>
        <DeleteButton action={deleteAction} label="Delete Image" />
      </div>

      <div className="max-w-2xl">
        <div className="mb-6 w-48 aspect-square overflow-hidden rounded-sm border border-gray-200">
          <img src={image.imagePath} alt={image.alt} className="w-full h-full object-cover" />
        </div>

        <AdminForm action={updateAction} cancelHref="/admin/gallery">
          <ImageUpload name="imagePath" label="Image" defaultValue={image.imagePath} />

          <Field label="Alt Text" htmlFor="alt" required>
            <Input id="alt" name="alt" type="text" required defaultValue={image.alt} />
          </Field>

          <Field label="Category" htmlFor="category" required>
            <Select id="category" name="category" required defaultValue={image.category}>
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
            <Textarea id="caption" name="caption" rows={2} defaultValue={image.caption || ""} />
          </Field>

          <Field label="Sort Order" htmlFor="sortOrder">
            <Input
              id="sortOrder"
              name="sortOrder"
              type="number"
              defaultValue={image.sortOrder?.toString() || "0"}
            />
          </Field>
        </AdminForm>
      </div>
    </div>
  );
}
