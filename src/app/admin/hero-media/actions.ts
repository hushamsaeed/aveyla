"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createHeroMedia, updateHeroMedia, deleteHeroMedia } from "@/lib/data/heroMedia";

export async function createHeroMediaAction(formData: FormData) {
  await createHeroMedia({
    mediaType: formData.get("mediaType") as string,
    mediaPath: formData.get("mediaPath") as string,
    posterPath: (formData.get("posterPath") as string) || undefined,
    alt: (formData.get("alt") as string) || undefined,
    sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
    active: formData.get("active") === "1",
  });
  revalidatePath("/admin/hero-media");
  revalidatePath("/");
  redirect("/admin/hero-media");
}

export async function updateHeroMediaAction(id: number, formData: FormData) {
  await updateHeroMedia(id, {
    mediaType: formData.get("mediaType") as string,
    mediaPath: formData.get("mediaPath") as string,
    posterPath: (formData.get("posterPath") as string) || null,
    alt: (formData.get("alt") as string) || null,
    sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
    active: formData.get("active") === "1" ? 1 : 0,
  });
  revalidatePath("/admin/hero-media");
  revalidatePath("/");
  redirect("/admin/hero-media");
}

export async function deleteHeroMediaAction(id: number) {
  await deleteHeroMedia(id);
  revalidatePath("/admin/hero-media");
  revalidatePath("/");
  redirect("/admin/hero-media");
}
