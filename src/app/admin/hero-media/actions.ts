"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createHeroMedia, updateHeroMedia, deleteHeroMedia } from "@/lib/data/heroMedia";
import { formBool } from "@/lib/utils";

export async function createHeroMediaAction(formData: FormData) {
  try {
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
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("createHeroMediaAction failed:", e);
    redirect("/admin/hero-media?error=1");
  }
}

export async function updateHeroMediaAction(id: number, formData: FormData) {
  try {
    await updateHeroMedia(id, {
      mediaType: formData.get("mediaType") as string,
      mediaPath: formData.get("mediaPath") as string,
      posterPath: (formData.get("posterPath") as string) || null,
      alt: (formData.get("alt") as string) || null,
      sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
      active: formBool(formData.get("active")),
    });
    revalidatePath("/admin/hero-media");
    revalidatePath("/");
    redirect("/admin/hero-media");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("updateHeroMediaAction failed:", e);
    redirect("/admin/hero-media?error=1");
  }
}

export async function deleteHeroMediaAction(id: number) {
  try {
    await deleteHeroMedia(id);
    revalidatePath("/admin/hero-media");
    revalidatePath("/");
    redirect("/admin/hero-media");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("deleteHeroMediaAction failed:", e);
    redirect("/admin/hero-media?error=1");
  }
}
