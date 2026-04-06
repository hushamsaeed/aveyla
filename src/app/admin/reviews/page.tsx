import { getAllReviews } from "@/lib/data/reviews";
import Link from "next/link";
import { deleteReviewAction } from "./actions";

export default async function AdminReviewsPage() {
  const reviews = await getAllReviews();

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Reviews
          </h1>
          <p className="mt-1 font-body text-sm text-driftwood">
            {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/reviews/new"
          className="bg-terracotta px-5 py-2.5 font-body text-sm font-semibold text-white hover:bg-terracotta/90 transition-colors rounded-sm"
        >
          Add Review
        </Link>
      </div>

      <div className="overflow-x-auto rounded-sm border border-gray-100">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Guest</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Quote</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Rating</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Date</th>
              <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Active</th>
              <th className="px-4 py-3 text-right font-body text-xs font-semibold uppercase tracking-wide text-driftwood">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center font-body text-sm text-driftwood">
                  No reviews yet.
                </td>
              </tr>
            )}
            {reviews.map((review, idx) => (
              <tr key={review.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-4 py-3">
                  <p className="font-body text-sm text-dark-driftwood font-medium">{review.guestName}</p>
                  {review.guestCountry && (
                    <p className="font-body text-xs text-driftwood">{review.guestCountry}</p>
                  )}
                </td>
                <td className="px-4 py-3 font-body text-sm text-driftwood max-w-xs">
                  <p className="truncate">{review.quote}</p>
                </td>
                <td className="px-4 py-3 font-body text-sm text-driftwood">
                  {review.starRating ? `${review.starRating}/5` : "-"}
                </td>
                <td className="px-4 py-3 font-body text-sm text-driftwood">
                  {review.date || "-"}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-body text-xs ${
                    review.active === 1 ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {review.active === 1 ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/reviews/${review.id}`}
                      className="font-body text-sm text-muted-ocean hover:text-terracotta transition-colors"
                    >
                      Edit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteReviewAction(review.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="font-body text-sm text-red-500 hover:text-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
