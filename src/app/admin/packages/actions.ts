"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createPackage,
  updatePackage,
  deletePackage,
  setPricingTiers,
} from "@/lib/data/packages";

function parseTiers(formData: FormData) {
  const tiers: Array<{
    nights: number;
    label?: string;
    dives?: number;
    snorkelTrips?: number;
    villageTwin: number;
    villageSingle: number;
    beachTwin: number;
    beachSingle: number;
    sortOrder: number;
  }> = [];

  for (let i = 0; i < 8; i++) {
    const nights = formData.get(`tier_nights_${i}`);
    const villageTwin = formData.get(`tier_villageTwin_${i}`);
    const villageSingle = formData.get(`tier_villageSingle_${i}`);
    const beachTwin = formData.get(`tier_beachTwin_${i}`);
    const beachSingle = formData.get(`tier_beachSingle_${i}`);

    if (
      nights &&
      villageTwin &&
      villageSingle &&
      beachTwin &&
      beachSingle
    ) {
      tiers.push({
        nights: Number(nights),
        label: (formData.get(`tier_label_${i}`) as string) || undefined,
        dives: formData.get(`tier_dives_${i}`) ? Number(formData.get(`tier_dives_${i}`)) : undefined,
        snorkelTrips: formData.get(`tier_snorkelTrips_${i}`) ? Number(formData.get(`tier_snorkelTrips_${i}`)) : undefined,
        villageTwin: Number(villageTwin),
        villageSingle: Number(villageSingle),
        beachTwin: Number(beachTwin),
        beachSingle: Number(beachSingle),
        sortOrder: i,
      });
    }
  }

  return tiers;
}

export async function createPackageAction(formData: FormData) {
  const inclusionsRaw = formData.get("inclusions") as string;
  const inclusions = inclusionsRaw
    ? inclusionsRaw.split("\n").map((s) => s.trim()).filter(Boolean)
    : [];

  const [pkg] = await createPackage({
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    tagline: (formData.get("tagline") as string) || undefined,
    description: (formData.get("description") as string) || undefined,
    heroImage: (formData.get("heroImage") as string) || undefined,
    season: (formData.get("season") as string) || undefined,
    inclusions,
    priceFrom: formData.get("priceFrom") ? Number(formData.get("priceFrom")) : undefined,
    active: formData.get("active") === "1",
    seasonNotes: (formData.get("seasonNotes") as string) || undefined,
    bookingLink: (formData.get("bookingLink") as string) || undefined,
    sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
  });

  if (pkg) {
    const tiers = parseTiers(formData);
    if (tiers.length > 0) {
      await setPricingTiers(pkg.id, tiers);
    }
  }

  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  redirect("/admin/packages");
}

export async function updatePackageAction(id: number, formData: FormData) {
  const inclusionsRaw = formData.get("inclusions") as string;
  const inclusions = inclusionsRaw
    ? inclusionsRaw.split("\n").map((s) => s.trim()).filter(Boolean)
    : [];

  await updatePackage(id, {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    tagline: (formData.get("tagline") as string) || undefined,
    description: (formData.get("description") as string) || undefined,
    heroImage: (formData.get("heroImage") as string) || undefined,
    season: (formData.get("season") as string) || undefined,
    inclusions,
    priceFrom: formData.get("priceFrom") ? Number(formData.get("priceFrom")) : undefined,
    active: formData.get("active") === "1" ? 1 : 0,
    seasonNotes: (formData.get("seasonNotes") as string) || undefined,
    bookingLink: (formData.get("bookingLink") as string) || undefined,
    sortOrder: formData.get("sortOrder") ? Number(formData.get("sortOrder")) : 0,
  });

  const tiers = parseTiers(formData);
  await setPricingTiers(id, tiers);

  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  redirect("/admin/packages");
}

export async function deletePackageAction(id: number) {
  await deletePackage(id);
  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  redirect("/admin/packages");
}
