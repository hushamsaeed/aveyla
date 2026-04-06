import { notFound } from "next/navigation";
import { db } from "@/db";
import { pageContent } from "@/db/schema";
import { eq } from "drizzle-orm";
import AdminForm, { Field, Input, Textarea } from "@/components/admin/AdminForm";
import ImageUpload from "@/components/admin/ImageUpload";
import { updatePageSectionByIdAction, deletePageSectionByIdAction } from "../actions";

export default async function EditPageSectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [section] = db.select().from(pageContent).where(eq(pageContent.id, Number(id))).limit(1).all();
  if (!section) notFound();

  const updateAction = updatePageSectionByIdAction.bind(null, section.id);
  const deleteAction = deletePageSectionByIdAction.bind(null, section.id);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Edit Page Section
          </h1>
          <p className="mt-1 font-body text-sm text-driftwood">
            <span className="font-mono">{section.pageSlug}</span> / <span className="font-mono">{section.sectionKey}</span>
          </p>
        </div>
        <form action={deleteAction}>
          <button
            type="submit"
            className="border border-red-200 px-4 py-2 font-body text-sm text-red-600 hover:bg-red-50 transition-colors rounded-sm"
          >
            Delete Section
          </button>
        </form>
      </div>

      <div className="max-w-2xl">
        <div className="mb-4 rounded-sm border border-driftwood/20 bg-linen px-4 py-3">
          <p className="font-body text-xs text-driftwood">
            Page: <span className="font-mono font-medium text-dark-driftwood">{section.pageSlug}</span>
            {" "}&bull;{" "}
            Section: <span className="font-mono font-medium text-dark-driftwood">{section.sectionKey}</span>
          </p>
        </div>

        <AdminForm action={updateAction} cancelHref="/admin/pages">
          <Field label="Title" htmlFor="title">
            <Input id="title" name="title" type="text" defaultValue={section.title || ""} />
          </Field>

          <Field label="Body" htmlFor="body">
            <Textarea id="body" name="body" rows={6} defaultValue={section.body || ""} />
          </Field>

          <ImageUpload name="imagePath" label="Image" defaultValue={section.imagePath || ""} />

          <Field label="Sort Order" htmlFor="sortOrder">
            <Input
              id="sortOrder"
              name="sortOrder"
              type="number"
              defaultValue={section.sortOrder?.toString() || "0"}
            />
          </Field>
        </AdminForm>
      </div>
    </div>
  );
}
