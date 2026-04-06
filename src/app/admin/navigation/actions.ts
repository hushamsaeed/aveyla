"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createNavItem, updateNavItem, deleteNavItem } from "@/lib/data/navigation";

export async function createNavItemAction(formData: FormData) {
  await createNavItem({
    location: formData.get("location") as string,
    label: formData.get("label") as string,
    href: formData.get("href") as string,
    sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
    active: formData.get("active") === "1",
  });

  revalidatePath("/admin/navigation");
  redirect("/admin/navigation");
}

export async function updateNavItemAction(id: number, formData: FormData) {
  await updateNavItem(id, {
    location: formData.get("location") as string,
    label: formData.get("label") as string,
    href: formData.get("href") as string,
    sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
    active: formData.get("active") === "1" ? 1 : 0,
  });

  revalidatePath("/admin/navigation");
  redirect("/admin/navigation");
}

export async function deleteNavItemAction(id: number) {
  await deleteNavItem(id);
  revalidatePath("/admin/navigation");
  redirect("/admin/navigation");
}
