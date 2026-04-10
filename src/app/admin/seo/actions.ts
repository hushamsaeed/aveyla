"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { upsertSeo } from "@/lib/data/seo";

export async function upsertSeoAction(formData: FormData) {
  try {
    await upsertSeo({
      page: formData.get("page") as string,
      metaTitle: (formData.get("metaTitle") as string) || undefined,
      metaDescription: (formData.get("metaDescription") as string) || undefined,
      ogImage: (formData.get("ogImage") as string) || undefined,
      canonicalUrl: (formData.get("canonicalUrl") as string) || undefined,
    });

    revalidatePath("/admin/seo");
    revalidatePath("/", "layout");
    redirect("/admin/seo");
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "digest" in e) throw e;
    console.error("upsertSeoAction failed:", e);
    redirect("/admin/seo?error=1");
  }
}
