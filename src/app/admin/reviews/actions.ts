"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createReview, updateReview, deleteReview } from "@/lib/data/reviews";
import { formBool } from "@/lib/utils";

export async function createReviewAction(formData: FormData) {
  try {
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
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("createReviewAction failed:", e);
    redirect("/admin/reviews?error=1");
  }
}

export async function updateReviewAction(id: number, formData: FormData) {
  try {
    await updateReview(id, {
      quote: formData.get("quote") as string,
      guestName: formData.get("guestName") as string,
      guestCountry: (formData.get("guestCountry") as string) || undefined,
      starRating: formData.get("starRating") ? Number(formData.get("starRating")) : undefined,
      date: (formData.get("date") as string) || undefined,
      active: formBool(formData.get("active")),
    });

    revalidatePath("/admin/reviews");
    revalidatePath("/", "layout");
    redirect("/admin/reviews");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("updateReviewAction failed:", e);
    redirect("/admin/reviews?error=1");
  }
}

export async function deleteReviewAction(id: number) {
  try {
    await deleteReview(id);
    revalidatePath("/admin/reviews");
    revalidatePath("/", "layout");
    redirect("/admin/reviews");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("deleteReviewAction failed:", e);
    redirect("/admin/reviews?error=1");
  }
}
