import Link from "next/link";

const PACKAGES = [
  { name: "Manta Madness", slug: "manta-madness", tagline: "The ultimate Hanifaru Bay experience", image: "/images/packages/manta-madness.jpg" },
  { name: "Dive Dive Dive", slug: "dive-dive-dive", tagline: "For those who want nothing but reef time", image: "/images/packages/dive-dive-dive.jpg" },
  { name: "Dive Hanifaru", slug: "dive-hanifaru", tagline: "Hanifaru Bay, concentrated", image: "/images/packages/dive-hanifaru.jpg" },
];

export default function PackagesPage() {
  return (
    <>
      <section className="bg-deep-ocean px-6 pb-16 pt-32 tablet:px-14">
        <div className="mx-auto max-w-content">
          <h1 className="font-display text-display-lg font-light tracking-[-0.02em] text-pure-white">Packages</h1>
          <p className="mt-4 font-body text-body-lg text-white/60">Choose your depth.</p>
        </div>
      </section>
      <section className="bg-[#060E1A] px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto max-w-content space-y-8">
          {PACKAGES.map((pkg) => (
            <Link key={pkg.slug} href={`/packages/${pkg.slug}`} className="group flex flex-col overflow-hidden tablet:h-[360px] tablet:flex-row">
              <div className="h-[240px] bg-cover bg-center transition-transform duration-scroll-animation group-hover:scale-105 tablet:h-full tablet:w-1/2" style={{ backgroundImage: `url(${pkg.image})` }} />
              <div className="flex flex-col justify-center gap-4 bg-[#060E1A]/90 p-8 tablet:w-1/2 tablet:p-10">
                <h2 className="font-display text-display-md font-semibold text-pure-white">{pkg.name}</h2>
                <p className="font-body text-[14px] text-sand-gold">{pkg.tagline}</p>
                <span className="font-body text-[14px] font-medium text-sand-gold">Explore Package →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
