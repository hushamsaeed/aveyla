import Link from "next/link";

export default function HanifaruFeature() {
  return (
    <section className="bg-deep-ocean">
      <div className="flex flex-col tablet:flex-row">
        {/* Image */}
        <div className="relative h-[400px] w-full tablet:h-auto tablet:w-1/2">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/hanifaru-manta.jpg)" }}
          />
        </div>

        {/* Content */}
        <div className="flex w-full flex-col justify-center gap-8 px-6 py-16 tablet:w-1/2 tablet:px-14 tablet:py-20">
          <blockquote className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold leading-[1.3] text-sand-gold">
            Hanifaru Bay. The single greatest congregation of manta rays on
            earth.
          </blockquote>

          <div className="h-[2px] w-[60px] bg-sand-gold" />

          <p className="max-w-[560px] font-body text-body-lg leading-[1.7] text-white/80">
            Every year between June and November, the currents of the Baa Atoll
            funnel plankton into Hanifaru Bay&apos;s shallow lagoon, drawing
            hundreds of manta rays and whale sharks into a feeding congregation
            found nowhere else on earth. UNESCO designated the Baa Atoll a World
            Biosphere Reserve in 2011. Aveyla is the closest accommodation to
            Hanifaru Bay — a fifteen-minute boat ride from your room to the
            encounter.
          </p>

          <Link
            href="/hanifaru-bay"
            className="group flex items-center gap-2 font-body text-[14px] font-medium text-sand-gold"
          >
            Discover Hanifaru Bay
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
