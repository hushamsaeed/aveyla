import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/client";
import { allPackagesQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Packages | Aveyla Manta Village | Maldives",
  description: "Dive and snorkelling packages at Aveyla — Dive Dive Dive, Dive Hanifaru, and Manta Madness. 3–7 night all-inclusive stays in the Baa Atoll.",
};

const FALLBACK_IMAGES: Record<string, string> = {
  "dive-dive-dive": "/images/packages/dive-dive-dive.jpg",
  "dive-hanifaru": "/images/packages/dive-hanifaru.jpg",
  "manta-madness": "/images/packages/manta-madness.jpg",
};

const FALLBACK_PACKAGES = [
  {
    name: "Dive Dive Dive",
    slug: "dive-dive-dive",
    tagline: "For those who want nothing but reef time",
    season: null,
    priceFrom: 1020,
    heroImage: null,
  },
  {
    name: "Dive Hanifaru",
    slug: "dive-hanifaru",
    tagline: "Diving and manta encounters, combined",
    season: "June – November",
    priceFrom: 1020,
    heroImage: null,
  },
  {
    name: "Manta Madness",
    slug: "manta-madness",
    tagline: "The ultimate Hanifaru Bay snorkelling experience",
    season: "June – November",
    priceFrom: 720,
    heroImage: null,
  },
];

function getPackageImage(pkg: { heroImage?: unknown; slug: string }) {
  if (pkg.heroImage) {
    return urlFor(pkg.heroImage).width(800).height(500).format("webp").url();
  }
  return FALLBACK_IMAGES[pkg.slug] || "/images/packages/dive-dive-dive.jpg";
}

export default async function PackagesPage() {
  let packages = FALLBACK_PACKAGES;
  try {
    const sanityPackages = await client.fetch(allPackagesQuery);
    if (sanityPackages?.length) packages = sanityPackages;
  } catch { /* use fallback */ }

  return (
    <>
      <section className="bg-dark-driftwood px-6 pb-16 pt-32 tablet:px-14">
        <div className="mx-auto max-w-content">
          <h1 className="font-display text-display-lg font-light tracking-[-0.02em] text-pure-white">Packages</h1>
          <p className="mt-4 font-body text-body-lg text-white/60">
            3–7 night all-inclusive packages. Full board, flights, and guided experiences included.
          </p>
        </div>
      </section>
      <section className="bg-[#060E1A] px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto max-w-content space-y-8">
          {packages.map((pkg) => {
            const image = getPackageImage(pkg);
            return (
              <Link key={pkg.slug} href={`/packages/${pkg.slug}`} className="group flex flex-col overflow-hidden tablet:h-[360px] tablet:flex-row">
                <div className="h-[240px] bg-cover bg-center transition-transform duration-scroll-animation group-hover:scale-105 tablet:h-full tablet:w-1/2" style={{ backgroundImage: `url(${image})` }} />
                <div className="flex flex-col justify-center gap-4 bg-[#060E1A]/90 p-8 tablet:w-1/2 tablet:p-10">
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-display-md font-semibold text-pure-white">{pkg.name}</h2>
                    {pkg.season && (
                      <span className="rounded-sm bg-terracotta/20 px-2 py-0.5 font-body text-[11px] font-medium text-terracotta">
                        {pkg.season}
                      </span>
                    )}
                  </div>
                  <p className="font-body text-[14px] text-coral-clay">{pkg.tagline}</p>
                  <p className="font-body text-[14px] text-white/50">From ${pkg.priceFrom} pp twin share · 3–7 nights</p>
                  <span className="font-body text-[14px] font-medium text-coral-clay">View Pricing & Details →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
