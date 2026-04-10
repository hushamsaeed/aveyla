import { notFound } from "next/navigation";
import { getActivityById } from "@/lib/data/activities";
import AdminForm, { Field, Input, Textarea, Select } from "@/components/admin/AdminForm";
import ImageUpload from "@/components/admin/ImageUpload";
import DeleteButton from "@/components/admin/DeleteButton";
import { updateActivityAction, deleteActivityAction } from "../actions";

export default async function EditActivityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activity = await getActivityById(Number(id));
  if (!activity) notFound();
  const updateAction = updateActivityAction.bind(null, activity.id);
  const deleteAction = deleteActivityAction.bind(null, activity.id);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Edit Activity
          </h1>
          <p className="mt-1 font-body text-sm text-driftwood">{activity.name}</p>
        </div>
        <DeleteButton action={deleteAction} label="Delete Activity" />
      </div>

      <div className="max-w-2xl">
        <AdminForm action={updateAction} cancelHref="/admin/activities">
          <Field label="Name" htmlFor="name" required>
            <Input id="name" name="name" type="text" required defaultValue={activity.name} />
          </Field>

          <Field label="Slug" htmlFor="slug" required hint="URL-friendly identifier">
            <Input id="slug" name="slug" type="text" required defaultValue={activity.slug} />
          </Field>

          <Field label="Category" htmlFor="category">
            <Select id="category" name="category" defaultValue={activity.category || ""}>
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
            <Input
              id="shortDescription"
              name="shortDescription"
              type="text"
              defaultValue={activity.shortDescription || ""}
            />
          </Field>

          <Field label="Description" htmlFor="description">
            <Textarea
              id="description"
              name="description"
              rows={5}
              defaultValue={activity.description || ""}
            />
          </Field>

          <ImageUpload name="heroImage" label="Hero Image" defaultValue={activity.heroImage || ""} />

          <Field label="Safety Requirements" htmlFor="safetyRequirements" hint="One requirement per line">
            <Textarea
              id="safetyRequirements"
              name="safetyRequirements"
              rows={5}
              defaultValue={activity.safetyRequirements.join("\n")}
            />
          </Field>

          <Field label="Seasonal Notes" htmlFor="seasonalNotes">
            <Textarea
              id="seasonalNotes"
              name="seasonalNotes"
              rows={3}
              defaultValue={activity.seasonalNotes || ""}
            />
          </Field>

          <Field label="Sort Order" htmlFor="sortOrder">
            <Input
              id="sortOrder"
              name="sortOrder"
              type="number"
              defaultValue={activity.sortOrder?.toString() || "0"}
            />
          </Field>
        </AdminForm>
      </div>
    </div>
  );
}
