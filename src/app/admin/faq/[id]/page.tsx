import { notFound } from "next/navigation";
import { getFaqItemById } from "@/lib/data/faq";
import AdminForm, { Field, Input, Textarea, Select } from "@/components/admin/AdminForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { updateFaqAction, deleteFaqAction } from "../actions";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getFaqItemById(Number(id));
  if (!item) notFound();

  const updateAction = updateFaqAction.bind(null, item.id);
  const deleteAction = deleteFaqAction.bind(null, item.id);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Edit FAQ Item
          </h1>
        </div>
        <DeleteButton action={deleteAction} label="Delete" />
      </div>

      <div className="max-w-2xl">
        <AdminForm action={updateAction} cancelHref="/admin/faq">
          <Field label="Question" htmlFor="question" required>
            <Input id="question" name="question" type="text" required defaultValue={item.question} />
          </Field>

          <Field label="Answer" htmlFor="answer" required>
            <Textarea id="answer" name="answer" rows={5} required defaultValue={item.answer} />
          </Field>

          <Field label="Category" htmlFor="category" required>
            <Select id="category" name="category" required defaultValue={item.category}>
              <option value="">Select category...</option>
              <option value="general">General</option>
              <option value="diving">Diving</option>
              <option value="accommodation">Accommodation</option>
              <option value="getting-here">Getting Here</option>
              <option value="booking">Booking</option>
              <option value="dining">Dining</option>
              <option value="activities">Activities</option>
            </Select>
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Sort Order" htmlFor="sortOrder">
              <Input
                id="sortOrder"
                name="sortOrder"
                type="number"
                defaultValue={item.sortOrder?.toString() || "0"}
              />
            </Field>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="active"
                name="active"
                value="1"
                defaultChecked={item.active === 1}
                className="h-4 w-4 accent-terracotta"
              />
              <label htmlFor="active" className="font-body text-sm text-dark-driftwood">
                Active
              </label>
            </div>
          </div>
        </AdminForm>
      </div>
    </div>
  );
}
