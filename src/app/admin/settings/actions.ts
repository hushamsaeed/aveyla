"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setSetting } from "@/lib/data/settings";

export async function saveSettingsAction(formData: FormData) {
  const keys = formData.getAll("key") as string[];
  const values = formData.getAll("value") as string[];

  for (let i = 0; i < keys.length; i++) {
    if (keys[i]) {
      await setSetting(keys[i], values[i] || "");
    }
  }

  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
  redirect("/admin/settings");
}

export async function addSettingAction(formData: FormData) {
  const key = formData.get("newKey") as string;
  const value = (formData.get("newValue") as string) || "";

  if (key) {
    await setSetting(key, value);
  }

  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
  redirect("/admin/settings");
}
