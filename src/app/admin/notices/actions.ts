"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createNotice, updateNotice, deleteNotice } from "@/lib/data/notices";

export async function createNoticeAction(formData: FormData) {
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
  redirect("/admin/notices");
}

export async function updateNoticeAction(id: number, formData: FormData) {
  const targetPagesRaw = formData.get("targetPages") as string;
  const targetPages = targetPagesRaw
    ? targetPagesRaw.split("\n").map((s) => s.trim()).filter(Boolean)
    : [];

  await updateNotice(id, {
    title: formData.get("title") as string,
    body: (formData.get("body") as string) || undefined,
    targetPages,
    severity: (formData.get("severity") as string) || "info",
    active: formData.get("active") === "1" ? 1 : 0,
  });

  revalidatePath("/admin/notices");
  redirect("/admin/notices");
}

export async function deleteNoticeAction(id: number) {
  await deleteNotice(id);
  revalidatePath("/admin/notices");
  redirect("/admin/notices");
}
