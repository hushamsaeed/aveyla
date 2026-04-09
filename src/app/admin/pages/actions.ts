"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createPageSection, updatePageSection, deletePageSection } from "@/lib/data/pages";
import { db } from "@/db";
import { pageContent } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createPageSectionAction(formData: FormData) {
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
}

export async function updatePageSectionByIdAction(id: number, formData: FormData) {
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
}

export async function deletePageSectionByIdAction(id: number) {
  const [existing] = db.select().from(pageContent).where(eq(pageContent.id, id)).limit(1).all();
  if (!existing) return;

  await deletePageSection(existing.pageSlug, existing.sectionKey);
  revalidatePath("/admin/pages");
  revalidatePath("/", "layout");
  redirect("/admin/pages");
}
