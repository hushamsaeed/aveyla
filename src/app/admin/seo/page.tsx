import { getAllSeo } from "@/lib/data/seo";
import AdminForm, { Field, Input } from "@/components/admin/AdminForm";
import { upsertSeoAction } from "./actions";

const KNOWN_PAGES = [
  "/",
  "/rooms",
  "/activities",
  "/packages",
  "/gallery",
  "/about",
  "/contact",
  "/dive",
  "/faq",
];

export default async function AdminSeoPage() {
  const seoRows = await getAllSeo();
  const seoMap = Object.fromEntries(seoRows.map((r) => [r.page, r]));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-dark-driftwood">
          SEO Metadata
        </h1>
        <p className="mt-1 font-body text-sm text-driftwood">
          Manage meta titles, descriptions, and OG images for each page
        </p>
      </div>

      <div className="space-y-6">
        {KNOWN_PAGES.map((page) => {
          const existing = seoMap[page];
          const upsert = upsertSeoAction;

          return (
            <div key={page} className="rounded-sm bg-white p-6 shadow-sm border border-gray-100">
              <h2 className="font-body text-sm font-semibold text-dark-driftwood mb-4">
                Page: <span className="font-mono text-muted-ocean">{page}</span>
              </h2>
              <form action={upsert} className="space-y-4">
                <input type="hidden" name="page" value={page} />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Meta Title" htmlFor={`title-${page}`} hint="Recommended: 50-60 chars">
                    <Input
                      id={`title-${page}`}
                      name="metaTitle"
                      type="text"
                      defaultValue={existing?.metaTitle || ""}
                      maxLength={80}
                    />
                  </Field>

                  <Field label="Canonical URL" htmlFor={`canonical-${page}`}>
                    <Input
                      id={`canonical-${page}`}
                      name="canonicalUrl"
                      type="url"
                      defaultValue={existing?.canonicalUrl || ""}
                    />
                  </Field>
                </div>

                <Field label="Meta Description" htmlFor={`desc-${page}`} hint="Recommended: 120-160 chars">
                  <textarea
                    id={`desc-${page}`}
                    name="metaDescription"
                    rows={2}
                    defaultValue={existing?.metaDescription || ""}
                    maxLength={200}
                    className="w-full border border-gray-200 px-3 py-2.5 font-body text-sm outline-none focus:border-muted-ocean transition-colors resize-vertical"
                  />
                </Field>

                <Field label="OG Image URL" htmlFor={`og-${page}`}>
                  <Input
                    id={`og-${page}`}
                    name="ogImage"
                    type="text"
                    defaultValue={existing?.ogImage || ""}
                    placeholder="https://... or /uploads/..."
                  />
                </Field>

                <div>
                  <button
                    type="submit"
                    className="bg-terracotta px-5 py-2 font-body text-sm font-semibold text-white hover:bg-terracotta/90 transition-colors rounded-sm"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          );
        })}

        {/* Custom page entry */}
        <div className="rounded-sm bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="font-body text-sm font-semibold text-dark-driftwood mb-4">
            Add / Update Custom Page
          </h2>
          <form action={upsertSeoAction} className="space-y-4">
            <Field label="Page Path" htmlFor="custom-page" required hint="e.g. /packages/manta-special">
              <Input id="custom-page" name="page" type="text" required placeholder="/custom-page" />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Meta Title" htmlFor="custom-title">
                <Input id="custom-title" name="metaTitle" type="text" />
              </Field>
              <Field label="Canonical URL" htmlFor="custom-canonical">
                <Input id="custom-canonical" name="canonicalUrl" type="url" />
              </Field>
            </div>

            <Field label="Meta Description" htmlFor="custom-desc">
              <textarea
                id="custom-desc"
                name="metaDescription"
                rows={2}
                className="w-full border border-gray-200 px-3 py-2.5 font-body text-sm outline-none focus:border-muted-ocean transition-colors resize-vertical"
              />
            </Field>

            <Field label="OG Image URL" htmlFor="custom-og">
              <Input id="custom-og" name="ogImage" type="text" />
            </Field>

            <button
              type="submit"
              className="bg-terracotta px-5 py-2 font-body text-sm font-semibold text-white hover:bg-terracotta/90 transition-colors rounded-sm"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
