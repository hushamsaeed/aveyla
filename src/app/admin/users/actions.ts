"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createUser, updateUser, deleteUser } from "@/lib/data/users";
import { hashPassword } from "@/lib/auth";

export async function createUserAction(formData: FormData) {
  try {
    const password = formData.get("password") as string;
    if (!password || password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    const passwordHash = await hashPassword(password);

    await createUser({
      email: formData.get("email") as string,
      passwordHash,
      name: (formData.get("name") as string) || undefined,
      role: (formData.get("role") as string) || "admin",
    });

    revalidatePath("/admin/users");
    redirect("/admin/users");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("createUserAction failed:", e);
    redirect("/admin/users?error=1");
  }
}

export async function updateUserAction(id: number, formData: FormData) {
  try {
    const password = formData.get("password") as string;
    const updateData: Record<string, unknown> = {
      email: formData.get("email") as string,
      name: (formData.get("name") as string) || undefined,
      role: (formData.get("role") as string) || "admin",
    };

    if (password && password.length >= 8) {
      updateData.passwordHash = await hashPassword(password);
    }

    await updateUser(id, updateData as Parameters<typeof updateUser>[1]);

    revalidatePath("/admin/users");
    redirect("/admin/users");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("updateUserAction failed:", e);
    redirect("/admin/users?error=1");
  }
}

export async function deleteUserAction(id: number) {
  try {
    await deleteUser(id);
    revalidatePath("/admin/users");
    redirect("/admin/users");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("deleteUserAction failed:", e);
    redirect("/admin/users?error=1");
  }
}
