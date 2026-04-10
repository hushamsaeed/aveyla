import { notFound } from "next/navigation";
import { getPackageById, getPricingTiers } from "@/lib/data/packages";
import AdminForm, { Field, Input, Textarea, Select } from "@/components/admin/AdminForm";
import ImageUpload from "@/components/admin/ImageUpload";
import PricingTiersForm from "@/components/admin/PricingTiersForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { updatePackageAction, deletePackageAction } from "../actions";

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pkg = await getPackageById(Number(id));
  if (!pkg) notFound();

  const tiers = await getPricingTiers(pkg.id);
  const updateAction = updatePackageAction.bind(null, pkg.id);
  const deleteAction = deletePackageAction.bind(null, pkg.id);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
            Edit Package
          </h1>
          <p className="mt-1 font-body text-sm text-driftwood">{pkg.name}</p>
        </div>
        <DeleteButton action={deleteAction} label="Delete Package" />
      </div>

      <div className="max-w-4xl">
        <AdminForm action={updateAction} cancelHref="/admin/packages">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Name" htmlFor="name" required>
              <Input id="name" name="name" type="text" required defaultValue={pkg.name} />
            </Field>

            <Field label="Slug" htmlFor="slug" required>
              <Input id="slug" name="slug" type="text" required defaultValue={pkg.slug} />
            </Field>
          </div>

          <Field label="Tagline" htmlFor="tagline">
            <Input id="tagline" name="tagline" type="text" defaultValue={pkg.tagline || ""} />
          </Field>

          <Field label="Description" htmlFor="description">
            <Textarea id="description" name="description" rows={5} defaultValue={pkg.description || ""} />
          </Field>

          <ImageUpload name="heroImage" label="Hero Image" defaultValue={pkg.heroImage || ""} />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Season" htmlFor="season">
              <Select id="season" name="season" defaultValue={pkg.season || ""}>
                <option value="">All year</option>
                <option value="manta-season">Manta Season</option>
                <option value="whale-shark">Whale Shark Season</option>
                <option value="dry-season">Dry Season</option>
                <option value="wet-season">Wet Season</option>
                <option value="year-round">Year Round</option>
              </Select>
            </Field>

            <Field label="Price From (USD)" htmlFor="priceFrom">
              <Input
                id="priceFrom"
                name="priceFrom"
                type="number"
                min="0"
                step="0.01"
                defaultValue={pkg.priceFrom?.toString() || ""}
              />
            </Field>
          </div>

          <Field label="Inclusions" htmlFor="inclusions" hint="One inclusion per line">
            <Textarea
              id="inclusions"
              name="inclusions"
              rows={6}
              defaultValue={pkg.inclusions.join("\n")}
            />
          </Field>

          <Field label="Season Notes" htmlFor="seasonNotes">
            <Textarea id="seasonNotes" name="seasonNotes" rows={3} defaultValue={pkg.seasonNotes || ""} />
          </Field>

          <Field label="Booking Link" htmlFor="bookingLink">
            <Input
              id="bookingLink"
              name="bookingLink"
              type="url"
              defaultValue={pkg.bookingLink || ""}
            />
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Sort Order" htmlFor="sortOrder">
              <Input
                id="sortOrder"
                name="sortOrder"
                type="number"
                defaultValue={pkg.sortOrder?.toString() || "0"}
              />
            </Field>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="active"
                name="active"
                value="1"
                defaultChecked={pkg.active === 1}
                className="h-4 w-4 accent-terracotta"
              />
              <label htmlFor="active" className="font-body text-sm text-dark-driftwood">
                Active (visible to guests)
              </label>
            </div>
          </div>

          <PricingTiersForm tiers={tiers} />
        </AdminForm>
      </div>
    </div>
  );
}
