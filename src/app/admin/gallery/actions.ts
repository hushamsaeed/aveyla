"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from "@/lib/data/gallery";

export async function createGalleryImageAction(formData: FormData) {
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
}

export async function updateGalleryImageAction(id: number, formData: FormData) {
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
}

export async function deleteGalleryImageAction(id: number) {
  await deleteGalleryImage(id);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  redirect("/admin/gallery");
}
