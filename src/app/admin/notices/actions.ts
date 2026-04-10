"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createNotice, updateNotice, deleteNotice } from "@/lib/data/notices";
import { formBool } from "@/lib/utils";

export async function createNoticeAction(formData: FormData) {
  try {
    const targetPagesRaw = formData.get("targetPages") as string;
    const targetPages = targetPagesRaw
      ? targetPagesRaw.split("\n").map((s) => s.trim()).filter(Boolean)
      : [];

    await createNotice({
      title: formData.get("title") as string,
      body: (formData.get("body") as string) || undefined,
      targetPages,
      severity: (formData.get("severity") as string) || "info",
      active: formData.get("active") === "1",
    });

    revalidatePath("/admin/notices");
    revalidatePath("/", "layout");
    redirect("/admin/notices");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("createNoticeAction failed:", e);
    redirect("/admin/notices?error=1");
  }
}

export async function updateNoticeAction(id: number, formData: FormData) {
  try {
    const targetPagesRaw = formData.get("targetPages") as string;
    const targetPages = targetPagesRaw
      ? targetPagesRaw.split("\n").map((s) => s.trim()).filter(Boolean)
      : [];

    await updateNotice(id, {
      title: formData.get("title") as string,
      body: (formData.get("body") as string) || undefined,
      targetPages,
      severity: (formData.get("severity") as string) || "info",
      active: formBool(formData.get("active")),
    });

    revalidatePath("/admin/notices");
    revalidatePath("/", "layout");
    redirect("/admin/notices");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("updateNoticeAction failed:", e);
    redirect("/admin/notices?error=1");
  }
}

export async function deleteNoticeAction(id: number) {
  try {
    await deleteNotice(id);
    revalidatePath("/admin/notices");
    revalidatePath("/", "layout");
    redirect("/admin/notices");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("deleteNoticeAction failed:", e);
    redirect("/admin/notices?error=1");
  }
}
