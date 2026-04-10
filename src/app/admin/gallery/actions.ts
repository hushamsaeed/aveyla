"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from "@/lib/data/gallery";

export async function createGalleryImageAction(formData: FormData) {
  try {
    await createGalleryImage({
      imagePath: formData.get("imagePath") as string,
      alt: formData.get("alt") as string,
      category: formData.get("category") as string,
      caption: (formData.get("caption") as string) || undefined,
      sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
    });

    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    redirect("/admin/gallery");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("createGalleryImageAction failed:", e);
    redirect("/admin/gallery?error=1");
  }
}

export async function updateGalleryImageAction(id: number, formData: FormData) {
  try {
    await updateGalleryImage(id, {
      imagePath: formData.get("imagePath") as string,
      alt: formData.get("alt") as string,
      category: formData.get("category") as string,
      caption: (formData.get("caption") as string) || undefined,
      sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
    });

    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    redirect("/admin/gallery");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("updateGalleryImageAction failed:", e);
    redirect("/admin/gallery?error=1");
  }
}

export async function deleteGalleryImageAction(id: number) {
  try {
    await deleteGalleryImage(id);
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    redirect("/admin/gallery");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("deleteGalleryImageAction failed:", e);
    redirect("/admin/gallery?error=1");
  }
}
