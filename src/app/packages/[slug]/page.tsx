import Link from "next/link";
import { notFound } from "next/navigation";

interface Package {
  name: string;
  tagline: string;
  inclusions: string[];
  image: string;
}

const PACKAGES: Record<string, Package> = {
  "manta-madness": {
    name: "Manta Madness",
    tagline: "The ultimate Hanifaru Bay experience",
    inclusions: ["5 nights accommodation", "Ocean Deluxe room", "6 guided dives", "Hanifaru Bay excursion", "Full board meals", "Airport transfer"],
    image: "/images/packages/manta-madness.jpg",
  },
  "dive-dive-dive": {
    name: "Dive Dive Dive",
    tagline: "For those who want nothing but reef time",
    inclusions: ["7 nights accommodation", "Beach Deluxe room", "10 guided dives", "Full equipment included", "Half board meals", "Airport transfer"],
    image: "/images/packages/dive-dive-dive.jpg",
  },
  "dive-hanifaru": {
    name: "Dive Hanifaru",
    tagline: "Hanifaru Bay, concentrated",
    inclusions: ["4 nights accommodation", "Any room type", "4 Hanifaru Bay dives", "Snorkelling excursion", "Daily breakfast", "Airport transfer"],
    image: "/images/packages/dive-hanifaru.jpg",
  },
};

export function generateStaticParams() {
  return Object.keys(PACKAGES).map((slug) => ({ slug }));
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = PACKAGES[slug];
  if (!pkg) notFound();

  return (
    <>
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pkg.image})` }} />
        <div className="absolute inset-0 bg-deep-ocean/70" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 tablet:px-14">
          <h1 className="font-display text-display-lg font-semibold text-pure-white">{pkg.name}</h1>
          <p className="mt-2 font-body text-body-lg text-sand-gold">{pkg.tagline}</p>
        </div>
      </section>

      <section className="bg-coral-white px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto max-w-content space-y-10">
          <div>
            <h2 className="font-display text-heading-lg font-semibold text-deep-ocean">What&apos;s Included</h2>
            <ul className="mt-6 space-y-3">
              {pkg.inclusions.map((item) => (
                <li key={item} className="flex items-center gap-3 font-body text-body-lg text-slate">
                  <svg className="h-5 w-5 shrink-0 text-reef-teal" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href={process.env.NEXT_PUBLIC_IPMS247_URL || "/contact"} className="bg-sand-gold px-8 py-4 font-body text-[14px] font-semibold text-deep-ocean transition-transform duration-cta hover:scale-[1.02]">
              Book This Package
            </Link>
            <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9607773998"}`} target="_blank" rel="noopener noreferrer" className="border border-deep-ocean px-8 py-4 font-body text-[14px] font-medium text-deep-ocean">
              Enquire via WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
