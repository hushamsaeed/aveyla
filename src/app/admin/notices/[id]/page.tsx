import { notFound } from "next/navigation";
import { db } from "@/db";
import { siteNotices } from "@/db/schema";
import { eq } from "drizzle-orm";
import AdminForm, { Field, Input, Textarea, Select } from "@/components/admin/AdminForm";
import { updateNoticeAction, deleteNoticeAction } from "../actions";

function parseJson(val: string | null): string[] {
  if (!val) return [];
  try { return JSON.parse(val); } catch { return []; }
}

export default async function EditNoticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [notice] = db.select().from(siteNotices).where(eq(siteNotices.id, Number(id))).limit(1).all();
  if (!notice) notFound();

  const targetPages = parseJson(notice.targetPages);
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
        <form action={deleteAction}>
          <button
            type="submit"
            className="border border-red-200 px-4 py-2 font-body text-sm text-red-600 hover:bg-red-50 transition-colors rounded-sm"
          >
            Delete Notice
          </button>
        </form>
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
              defaultValue={targetPages.join("\n")}
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
