import AdminForm, { Field, Input, Textarea } from "@/components/admin/AdminForm";
import ImageUpload from "@/components/admin/ImageUpload";
import { createPageSectionAction } from "../actions";

export default function NewPageSectionPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
          Add Page Section
        </h1>
      </div>

      <div className="max-w-2xl">
        <AdminForm action={createPageSectionAction} cancelHref="/admin/pages">
          <Field label="Page Slug" htmlFor="pageSlug" required hint="e.g. home, about, contact">
            <Input id="pageSlug" name="pageSlug" type="text" required placeholder="home" />
          </Field>

          <Field label="Section Key" htmlFor="sectionKey" required hint="Unique key within the page, e.g. hero, intro">
            <Input id="sectionKey" name="sectionKey" type="text" required placeholder="hero" />
          </Field>

          <Field label="Title" htmlFor="title">
            <Input id="title" name="title" type="text" />
          </Field>

          <Field label="Body" htmlFor="body">
            <Textarea id="body" name="body" rows={6} />
          </Field>

          <ImageUpload name="imagePath" label="Image" />

          <Field label="Sort Order" htmlFor="sortOrder">
            <Input id="sortOrder" name="sortOrder" type="number" defaultValue="0" />
          </Field>
        </AdminForm>
      </div>
    </div>
  );
}
