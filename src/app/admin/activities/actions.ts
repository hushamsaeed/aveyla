"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createActivity,
  updateActivity,
  deleteActivity,
} from "@/lib/data/activities";

export async function createActivityAction(formData: FormData) {
  try {
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
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("createActivityAction failed:", e);
    redirect("/admin/activities?error=1");
  }
}

export async function updateActivityAction(id: number, formData: FormData) {
  try {
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
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("updateActivityAction failed:", e);
    redirect("/admin/activities?error=1");
  }
}

export async function deleteActivityAction(id: number) {
  try {
    await deleteActivity(id);
    revalidatePath("/admin/activities");
    revalidatePath("/activities");
    redirect("/admin/activities");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("deleteActivityAction failed:", e);
    redirect("/admin/activities?error=1");
  }
}
