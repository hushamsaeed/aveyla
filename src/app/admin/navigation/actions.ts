"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createNavItem, updateNavItem, deleteNavItem } from "@/lib/data/navigation";
import { formBool } from "@/lib/utils";

export async function createNavItemAction(formData: FormData) {
  try {
    await createNavItem({
      location: formData.get("location") as string,
      label: formData.get("label") as string,
      href: formData.get("href") as string,
      sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
      active: formData.get("active") === "1",
    });

    revalidatePath("/admin/navigation");
    revalidatePath("/", "layout");
    redirect("/admin/navigation");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("createNavItemAction failed:", e);
    redirect("/admin/navigation?error=1");
  }
}

export async function updateNavItemAction(id: number, formData: FormData) {
  try {
    await updateNavItem(id, {
      location: formData.get("location") as string,
      label: formData.get("label") as string,
      href: formData.get("href") as string,
      sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
      active: formBool(formData.get("active")),
    });

    revalidatePath("/admin/navigation");
    revalidatePath("/", "layout");
    redirect("/admin/navigation");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("updateNavItemAction failed:", e);
    redirect("/admin/navigation?error=1");
  }
}

export async function deleteNavItemAction(id: number) {
  try {
    await deleteNavItem(id);
    revalidatePath("/admin/navigation");
    revalidatePath("/", "layout");
    redirect("/admin/navigation");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("deleteNavItemAction failed:", e);
    redirect("/admin/navigation?error=1");
  }
}
