"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createActivity,
  updateActivity,
  deleteActivity,
} from "@/lib/data/activities";

export async function createActivityAction(formData: FormData) {
  const safetyRaw = formData.get("safetyRequirements") as string;
  const safetyRequirements = safetyRaw
    ? safetyRaw.split("\n").map((s) => s.trim()).filter(Boolean)
    : [];

  await createActivity({
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    category: (formData.get("category") as string) || undefined,
    shortDescription: (formData.get("shortDescription") as string) || undefined,
    description: (formData.get("description") as string) || undefined,
    heroImage: (formData.get("heroImage") as string) || undefined,
    safetyRequirements,
    seasonalNotes: (formData.get("seasonalNotes") as string) || undefined,
    sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
  });

  revalidatePath("/admin/activities");
  revalidatePath("/activities");
  redirect("/admin/activities");
}

export async function updateActivityAction(id: number, formData: FormData) {
  const safetyRaw = formData.get("safetyRequirements") as string;
  const safetyRequirements = safetyRaw
    ? safetyRaw.split("\n").map((s) => s.trim()).filter(Boolean)
    : [];

  await updateActivity(id, {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    category: (formData.get("category") as string) || undefined,
    shortDescription: (formData.get("shortDescription") as string) || undefined,
    description: (formData.get("description") as string) || undefined,
    heroImage: (formData.get("heroImage") as string) || undefined,
    safetyRequirements,
    seasonalNotes: (formData.get("seasonalNotes") as string) || undefined,
    sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
  });

  revalidatePath("/admin/activities");
  revalidatePath("/activities");
  redirect("/admin/activities");
}

export async function deleteActivityAction(id: number) {
  await deleteActivity(id);
  revalidatePath("/admin/activities");
  revalidatePath("/activities");
  redirect("/admin/activities");
}
