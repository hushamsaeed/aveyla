import Link from "next/link";
import { getAllPackages } from "@/lib/data/packages";
import { getPackageImage } from "@/lib/images";

export default async function PackagesSection() {
  const packages = await getAllPackages();

  return (
    <section className="bg-[#060E1A] px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet desktop:py-section-desktop">
      <div className="mx-auto max-w-content space-y-12">
        <h2 className="font-display text-display-md font-semibold tracking-[-0.01em] text-pure-white">
          Choose Your Depth.
        </h2>

        {packages.map((pkg) => {
          const image = getPackageImage(pkg.heroImage, pkg.slug);
          return (
            <div key={pkg.slug} className="flex flex-col overflow-hidden tablet:h-[360px] tablet:flex-row">
              <div
                className="h-[240px] bg-cover bg-center tablet:h-full tablet:w-1/2"
                style={{ backgroundImage: `url(${image})` }}
              />
              <div className="flex flex-col justify-center gap-4 bg-[#060E1A]/90 p-8 tablet:w-1/2 tablet:p-10">
                <h3 className="font-display text-display-md font-semibold text-pure-white">
                  {pkg.name}
                </h3>
                <p className="font-body text-[14px] text-coral-clay">{pkg.tagline}</p>
                <p className="max-w-[480px] font-body text-[14px] leading-[1.7] text-white/60">
                  From ${pkg.priceFrom} pp twin share · 3–7 nights
                </p>
                <Link
                  href={`/packages/${pkg.slug}`}
                  className="mt-2 w-fit bg-coral-clay px-7 py-3.5 font-body text-[13px] font-semibold text-dark-driftwood transition-transform duration-cta hover:scale-[1.02]"
                >
                  Explore Package
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
