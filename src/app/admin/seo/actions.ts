"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { upsertSeo } from "@/lib/data/seo";

export async function upsertSeoAction(formData: FormData) {
  await upsertSeo({
    page: formData.get("page") as string,
    metaTitle: (formData.get("metaTitle") as string) || undefined,
    metaDescription: (formData.get("metaDescription") as string) || undefined,
    ogImage: (formData.get("ogImage") as string) || undefined,
    canonicalUrl: (formData.get("canonicalUrl") as string) || undefined,
  });

  revalidatePath("/admin/seo");
  redirect("/admin/seo");
}
