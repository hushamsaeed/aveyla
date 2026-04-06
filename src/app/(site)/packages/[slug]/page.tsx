import Link from "next/link";
import { notFound } from "next/navigation";
import { getPackageBySlug, getAllPackages } from "@/lib/data/packages";
import { getPackageImage } from "@/lib/images";
import PricingTable from "@/components/packages/PricingTable";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const packages = await getAllPackages();
  return packages.map((p) => ({ slug: p.slug }));
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const pkg = await getPackageBySlug(slug);
  if (!pkg) notFound();

  const image = getPackageImage(pkg.heroImage, slug);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
        <div className="absolute inset-0 bg-dark-driftwood/70" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 tablet:px-14">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="font-display text-display-lg font-semibold text-pure-white">{pkg.name}</h1>
            {pkg.season && (
              <span className="rounded-sm bg-terracotta/20 px-3 py-1 font-body text-body-sm font-medium text-terracotta">
                {pkg.season}
              </span>
            )}
          </div>
          <p className="mt-2 font-body text-body-lg text-coral-clay">{pkg.tagline}</p>
        </div>
      </section>

      <section className="bg-linen px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto max-w-content space-y-12">
          {/* Description */}
          {pkg.description && (
            <p className="max-w-editorial font-editorial text-body-lg leading-[1.7] text-driftwood">
              {pkg.description}
            </p>
          )}

          {/* Inclusions */}
          {pkg.inclusions?.length > 0 && (
            <div>
              <h2 className="font-display text-heading-lg font-semibold text-dark-driftwood">What&apos;s Included</h2>
              <ul className="mt-6 space-y-3">
                {pkg.inclusions.map((item) => (
                  <li key={item} className="flex items-center gap-3 font-body text-body-md text-driftwood">
                    <svg className="h-5 w-5 shrink-0 text-terracotta" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Interactive Pricing Table */}
          {pkg.pricingTiers.length > 0 && (
            <PricingTable tiers={pkg.pricingTiers} />
          )}

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/contact?package=${slug}`}
              className="bg-coral-clay px-8 py-4 font-body text-[14px] font-semibold text-dark-driftwood transition-transform duration-cta hover:scale-[1.02]"
            >
              Enquire About This Package
            </Link>
            <Link
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9607773998"}?text=${encodeURIComponent(`Hi, I'm interested in the ${pkg.name} package.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-dark-driftwood px-8 py-4 font-body text-[14px] font-medium text-dark-driftwood"
            >
              Enquire via WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
