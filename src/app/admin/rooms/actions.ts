"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createRoom,
  updateRoom,
  deleteRoom,
} from "@/lib/data/rooms";

export async function createRoomAction(formData: FormData) {
  const amenitiesRaw = formData.get("amenities") as string;
  const amenities = amenitiesRaw
    ? amenitiesRaw.split("\n").map((s) => s.trim()).filter(Boolean)
    : [];

  await createRoom({
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    roomType: (formData.get("roomType") as string) || undefined,
    description: (formData.get("description") as string) || undefined,
    heroImage: (formData.get("heroImage") as string) || undefined,
    amenities,
    priceFrom: formData.get("priceFrom") ? Number(formData.get("priceFrom")) : undefined,
    noticeActive: formData.get("noticeActive") === "1",
    noticeText: (formData.get("noticeText") as string) || undefined,
    sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
  });

  revalidatePath("/admin/rooms");
  revalidatePath("/rooms");
  redirect("/admin/rooms");
}

export async function updateRoomAction(id: number, formData: FormData) {
  const amenitiesRaw = formData.get("amenities") as string;
  const amenities = amenitiesRaw
    ? amenitiesRaw.split("\n").map((s) => s.trim()).filter(Boolean)
    : [];

  await updateRoom(id, {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    roomType: (formData.get("roomType") as string) || undefined,
    description: (formData.get("description") as string) || undefined,
    heroImage: (formData.get("heroImage") as string) || undefined,
    amenities,
    priceFrom: formData.get("priceFrom") ? Number(formData.get("priceFrom")) : undefined,
    noticeActive: formData.get("noticeActive") === "1" ? 1 : 0,
    noticeText: (formData.get("noticeText") as string) || undefined,
    sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
  });

  revalidatePath("/admin/rooms");
  revalidatePath("/rooms");
  redirect("/admin/rooms");
}

export async function deleteRoomAction(id: number) {
  await deleteRoom(id);
  revalidatePath("/admin/rooms");
  revalidatePath("/rooms");
  redirect("/admin/rooms");
}
