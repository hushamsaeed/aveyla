"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createReview, updateReview, deleteReview } from "@/lib/data/reviews";

export async function createReviewAction(formData: FormData) {
  await createReview({
    quote: formData.get("quote") as string,
    guestName: formData.get("guestName") as string,
    guestCountry: (formData.get("guestCountry") as string) || undefined,
    starRating: formData.get("starRating") ? Number(formData.get("starRating")) : undefined,
    date: (formData.get("date") as string) || undefined,
    active: formData.get("active") === "1",
  });

  revalidatePath("/admin/reviews");
  revalidatePath("/", "layout");
  redirect("/admin/reviews");
}

export async function updateReviewAction(id: number, formData: FormData) {
  await updateReview(id, {
    quote: formData.get("quote") as string,
    guestName: formData.get("guestName") as string,
    guestCountry: (formData.get("guestCountry") as string) || undefined,
    starRating: formData.get("starRating") ? Number(formData.get("starRating")) : undefined,
    date: (formData.get("date") as string) || undefined,
    active: formData.get("active") === "1" ? 1 : 0,
  });

  revalidatePath("/admin/reviews");
  revalidatePath("/", "layout");
  redirect("/admin/reviews");
}

export async function deleteReviewAction(id: number) {
  await deleteReview(id);
  revalidatePath("/admin/reviews");
  revalidatePath("/", "layout");
  redirect("/admin/reviews");
}
