"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createRoom,
  updateRoom,
  deleteRoom,
} from "@/lib/data/rooms";
import { formBool } from "@/lib/utils";

export async function createRoomAction(formData: FormData) {
  try {
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
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("createRoomAction failed:", e);
    redirect("/admin/rooms?error=1");
  }
}

export async function updateRoomAction(id: number, formData: FormData) {
  try {
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
      noticeActive: formBool(formData.get("noticeActive")),
      noticeText: (formData.get("noticeText") as string) || undefined,
      sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
    });

    revalidatePath("/admin/rooms");
    revalidatePath("/rooms");
    redirect("/admin/rooms");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("updateRoomAction failed:", e);
    redirect("/admin/rooms?error=1");
  }
}

export async function deleteRoomAction(id: number) {
  try {
    await deleteRoom(id);
    revalidatePath("/admin/rooms");
    revalidatePath("/rooms");
    redirect("/admin/rooms");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("deleteRoomAction failed:", e);
    redirect("/admin/rooms?error=1");
  }
}
