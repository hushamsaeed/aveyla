"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createPageSection, updatePageSection, deletePageSection } from "@/lib/data/pages";
import { db } from "@/db";
import { pageContent } from "@/db/schema";
import { eq } from "drizzle-orm";

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
    const [existing] = db.select().from(pageContent).where(eq(pageContent.id, id)).limit(1).all();
    if (!existing) return;

    await updatePageSection(existing.pageSlug, existing.sectionKey, {
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
    console.error("updatePageSectionByIdAction failed:", e);
    redirect("/admin/pages?error=1");
  }
}

export async function deletePageSectionByIdAction(id: number) {
  try {
    const [existing] = db.select().from(pageContent).where(eq(pageContent.id, id)).limit(1).all();
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
