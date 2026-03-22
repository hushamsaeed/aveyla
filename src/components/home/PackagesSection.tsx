import Link from "next/link";

const PACKAGES = [
  {
    name: "Dive Dive Dive",
    slug: "dive-dive-dive",
    tagline: "For those who want nothing but reef time",
    inclusions: "3–7 nights · 6–14 dives · Full board · Domestic flights · From $1,020 pp",
    image: "/images/packages/dive-dive-dive.jpg",
  },
  {
    name: "Dive Hanifaru",
    slug: "dive-hanifaru",
    tagline: "Diving and manta encounters, combined",
    inclusions: "3–7 nights · Dives + manta snorkelling · Full board · June–Nov · From $1,020 pp",
    image: "/images/packages/dive-hanifaru.jpg",
  },
  {
    name: "Manta Madness",
    slug: "manta-madness",
    tagline: "The ultimate Hanifaru Bay snorkelling experience",
    inclusions: "3–7 nights · Manta snorkelling trips · Full board · June–Nov · From $720 pp",
    image: "/images/packages/manta-madness.jpg",
  },
];

export default function PackagesSection() {
  return (
    <section className="bg-[#060E1A] px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet desktop:py-section-desktop">
      <div className="mx-auto max-w-content space-y-12">
        <h2 className="font-display text-display-md font-semibold tracking-[-0.01em] text-pure-white">
          Choose Your Depth.
        </h2>

        {PACKAGES.map((pkg) => (
          <div key={pkg.slug} className="flex flex-col overflow-hidden tablet:h-[360px] tablet:flex-row">
            <div
              className="h-[240px] bg-cover bg-center tablet:h-full tablet:w-1/2"
              style={{ backgroundImage: `url(${pkg.image})` }}
            />
            <div className="flex flex-col justify-center gap-4 bg-[#060E1A]/90 p-8 tablet:w-1/2 tablet:p-10">
              <h3 className="font-display text-display-md font-semibold text-pure-white">
                {pkg.name}
              </h3>
              <p className="font-body text-[14px] text-coral-clay">{pkg.tagline}</p>
              <p className="max-w-[480px] font-body text-[14px] leading-[1.7] text-white/60">
                {pkg.inclusions}
              </p>
              <Link
                href={`/packages/${pkg.slug}`}
                className="mt-2 w-fit bg-coral-clay px-7 py-3.5 font-body text-[13px] font-semibold text-dark-driftwood transition-transform duration-cta hover:scale-[1.02]"
              >
                Explore Package
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
