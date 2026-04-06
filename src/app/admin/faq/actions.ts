"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createFaqItem, updateFaqItem, deleteFaqItem } from "@/lib/data/faq";

export async function createFaqAction(formData: FormData) {
  await createFaqItem({
    question: formData.get("question") as string,
    answer: formData.get("answer") as string,
    category: formData.get("category") as string,
    sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
    active: formData.get("active") === "1",
  });

  revalidatePath("/admin/faq");
  revalidatePath("/faq");
  redirect("/admin/faq");
}

export async function updateFaqAction(id: number, formData: FormData) {
  await updateFaqItem(id, {
    question: formData.get("question") as string,
    answer: formData.get("answer") as string,
    category: formData.get("category") as string,
    sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
    active: formData.get("active") === "1" ? 1 : 0,
  });

  revalidatePath("/admin/faq");
  revalidatePath("/faq");
  redirect("/admin/faq");
}

export async function deleteFaqAction(id: number) {
  await deleteFaqItem(id);
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
  redirect("/admin/faq");
}
