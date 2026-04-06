import { notFound } from "next/navigation";
import { db } from "@/db";
import { reviews } from "@/db/schema";
import { eq } from "drizzle-orm";
import AdminForm, { Field, Input, Textarea, Select } from "@/components/admin/AdminForm";
import { updateReviewAction, deleteReviewAction } from "../actions";

export default async function EditReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [review] = db.select().from(reviews).where(eq(reviews.id, Number(id))).limit(1).all();
  if (!review) notFound();

  const updateAction = updateReviewAction.bind(null, review.id);
  const deleteAction = deleteReviewAction.bind(null, review.id);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Edit Review
          </h1>
          <p className="mt-1 font-body text-sm text-driftwood">{review.guestName}</p>
        </div>
        <form action={deleteAction}>
          <button
            type="submit"
            className="border border-red-200 px-4 py-2 font-body text-sm text-red-600 hover:bg-red-50 transition-colors rounded-sm"
          >
            Delete Review
          </button>
        </form>
      </div>

      <div className="max-w-2xl">
        <AdminForm action={updateAction} cancelHref="/admin/reviews">
          <Field label="Quote" htmlFor="quote" required>
            <Textarea id="quote" name="quote" rows={4} required defaultValue={review.quote} />
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Guest Name" htmlFor="guestName" required>
              <Input id="guestName" name="guestName" type="text" required defaultValue={review.guestName} />
            </Field>

            <Field label="Guest Country" htmlFor="guestCountry">
              <Input id="guestCountry" name="guestCountry" type="text" defaultValue={review.guestCountry || ""} />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Star Rating" htmlFor="starRating">
              <Select id="starRating" name="starRating" defaultValue={review.starRating?.toString() || ""}>
                <option value="">No rating</option>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </Select>
            </Field>

            <Field label="Date" htmlFor="date">
              <Input id="date" name="date" type="text" defaultValue={review.date || ""} />
            </Field>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="active"
              name="active"
              value="1"
              defaultChecked={review.active === 1}
              className="h-4 w-4 accent-terracotta"
            />
            <label htmlFor="active" className="font-body text-sm text-dark-driftwood">
              Active (visible to guests)
            </label>
          </div>
        </AdminForm>
      </div>
    </div>
  );
}
