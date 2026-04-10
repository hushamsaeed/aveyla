"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createPageSection, updatePageSection, deletePageSection, getPageSectionById } from "@/lib/data/pages";

export async function createPageSectionAction(formData: FormData) {
  try {
    await createPageSection({
      pageSlug: formData.get("pageSlug") as string,
      sectionKey: formData.get("sectionKey") as string,
      title: (formData.get("title") as string) || undefined,
      body: (formData.get("body") as string) || undefined,
      imagePath: (formData.get("imagePath") as string) || undefined,
      sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
    });

    revalidatePath("/admin/pages");
    revalidatePath("/", "layout");
    redirect("/admin/pages");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("createPageSectionAction failed:", e);
    redirect("/admin/pages?error=1");
  }
}

export async function updatePageSectionByIdAction(id: number, formData: FormData) {
  try {
    const existing = await getPageSectionById(id);
    if (!existing) return;

    await updatePageSection(existing.pageSlug, existing.sectionKey, {
      title: (formData.get("title") as string) || null,
      body: (formData.get("body") as string) || null,
      imagePath: (formData.get("imagePath") as string) || null,
      sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
    });

    revalidatePath("/admin/pages");
    revalidatePath("/", "layout");
    redirect("/admin/pages");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("updatePageSectionByIdAction failed:", e);
    redirect("/admin/pages?error=1");
  }
}

export async function deletePageSectionByIdAction(id: number) {
  try {
    const existing = await getPageSectionById(id);
    if (!existing) return;

    await deletePageSection(existing.pageSlug, existing.sectionKey);
    revalidatePath("/admin/pages");
    revalidatePath("/", "layout");
    redirect("/admin/pages");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("deletePageSectionByIdAction failed:", e);
    redirect("/admin/pages?error=1");
  }
}
