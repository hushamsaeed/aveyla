import { notFound } from "next/navigation";
import { getNoticeById } from "@/lib/data/notices";
import AdminForm, { Field, Input, Textarea, Select } from "@/components/admin/AdminForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { updateNoticeAction, deleteNoticeAction } from "../actions";

export default async function EditNoticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = await getNoticeById(Number(id));
  if (!notice) notFound();
  const updateAction = updateNoticeAction.bind(null, notice.id);
  const deleteAction = deleteNoticeAction.bind(null, notice.id);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Edit Notice
          </h1>
          <p className="mt-1 font-body text-sm text-driftwood">{notice.title}</p>
        </div>
        <DeleteButton action={deleteAction} label="Delete Notice" />
      </div>

      <div className="max-w-2xl">
        <AdminForm action={updateAction} cancelHref="/admin/notices">
          <Field label="Title" htmlFor="title" required>
            <Input id="title" name="title" type="text" required defaultValue={notice.title} />
          </Field>

          <Field label="Body" htmlFor="body">
            <Textarea id="body" name="body" rows={3} defaultValue={notice.body || ""} />
          </Field>

          <Field label="Severity" htmlFor="severity">
            <Select id="severity" name="severity" defaultValue={notice.severity || "info"}>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </Select>
          </Field>

          <Field
            label="Target Pages"
            htmlFor="targetPages"
            hint="One page path per line. Leave empty for all pages."
          >
            <Textarea
              id="targetPages"
              name="targetPages"
              rows={4}
              defaultValue={notice.targetPages.join("\n")}
            />
          </Field>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="active"
              name="active"
              value="1"
              defaultChecked={notice.active === 1}
              className="h-4 w-4 accent-terracotta"
            />
            <label htmlFor="active" className="font-body text-sm text-dark-driftwood">
              Active (visible to site visitors)
            </label>
          </div>
        </AdminForm>
      </div>
    </div>
  );
}
