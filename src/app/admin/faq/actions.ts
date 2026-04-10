"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createFaqItem, updateFaqItem, deleteFaqItem } from "@/lib/data/faq";
import { formBool } from "@/lib/utils";

export async function createFaqAction(formData: FormData) {
  try {
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
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("createFaqAction failed:", e);
    redirect("/admin/faq?error=1");
  }
}

export async function updateFaqAction(id: number, formData: FormData) {
  try {
    await updateFaqItem(id, {
      question: formData.get("question") as string,
      answer: formData.get("answer") as string,
      category: formData.get("category") as string,
      sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
      active: formBool(formData.get("active")),
    });

    revalidatePath("/admin/faq");
    revalidatePath("/faq");
    redirect("/admin/faq");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("updateFaqAction failed:", e);
    redirect("/admin/faq?error=1");
  }
}

export async function deleteFaqAction(id: number) {
  try {
    await deleteFaqItem(id);
    revalidatePath("/admin/faq");
    revalidatePath("/faq");
    redirect("/admin/faq");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("deleteFaqAction failed:", e);
    redirect("/admin/faq?error=1");
  }
}
