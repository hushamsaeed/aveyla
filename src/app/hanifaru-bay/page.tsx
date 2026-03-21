import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hanifaru Bay | Aveyla Manta Village | Maldives",
  description: "Hanifaru Bay — UNESCO Biosphere Reserve, the largest known manta ray feeding aggregation on earth. Aveyla is the closest accommodation, 15 minutes by boat.",
};

const MONTHS = [
  { name: "Jan", active: false }, { name: "Feb", active: false }, { name: "Mar", active: false },
  { name: "Apr", active: false }, { name: "May", active: false }, { name: "Jun", active: true },
  { name: "Jul", active: true }, { name: "Aug", active: true, peak: true }, { name: "Sep", active: true, peak: true },
  { name: "Oct", active: true, peak: true }, { name: "Nov", active: true }, { name: "Dec", active: false },
];

export default function HanifaruBayPage() {
  return (
    <>
      {/* Opening image — no text overlay per FSD */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/images/hanifaru-hero.jpg)" }} />
      </section>

      <section className="bg-coral-white px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto max-w-editorial space-y-8">
          <h1 className="font-display text-display-md font-semibold tracking-[-0.01em] text-deep-ocean">
            Hanifaru Bay
          </h1>
          <p className="font-body text-body-lg leading-[1.7] text-slate">
            Hanifaru Bay sits within the Baa Atoll, a UNESCO World Biosphere Reserve since 2011. It is a shallow, funnel-shaped bay approximately 350 metres long, and it produces what marine biologists describe as the largest known feeding aggregation of manta rays on earth.
          </p>
          <p className="font-body text-body-lg leading-[1.7] text-slate">
            Between June and November, the southwest monsoon drives nutrient-rich currents into the bay. Plankton concentrates in the shallows. And with it come the mantas — sometimes dozens, sometimes hundreds, spiralling in coordinated feeding chains that have been documented by the BBC, National Geographic, and the Manta Trust.
          </p>
          <p className="font-body text-body-lg leading-[1.7] text-slate">
            Aveyla Manta Village is the closest accommodation to Hanifaru Bay. A fifteen-minute boat ride from the dive centre jetty. No other property in the Maldives offers this proximity with this level of operational intimacy — small groups, personal dive guides, and a commitment to the ethical guidelines that protect this site.
          </p>
        </div>
      </section>

      {/* Seasonal calendar */}
      <section className="bg-lagoon-light px-6 py-16 tablet:px-14">
        <div className="mx-auto max-w-content">
          <h2 className="mb-8 font-display text-heading-xl font-semibold text-deep-ocean">Seasonal Calendar</h2>
          <div className="grid grid-cols-4 gap-2 tablet:grid-cols-12">
            {MONTHS.map((m) => (
              <div
                key={m.name}
                className={`flex flex-col items-center gap-2 rounded-sm p-4 ${
                  m.peak ? "bg-reef-teal text-pure-white" : m.active ? "bg-ocean-blue/20 text-deep-ocean" : "bg-white text-slate"
                }`}
              >
                <span className="font-body text-body-sm font-medium">{m.name}</span>
                {m.peak && <span className="font-body text-[10px]">Peak</span>}
              </div>
            ))}
          </div>
          <p className="mt-4 font-body text-body-sm text-slate">
            August–October: highest probability of large manta aggregations.
          </p>
        </div>
      </section>

      <section className="bg-coral-white px-6 py-16 tablet:px-14">
        <div className="mx-auto flex max-w-content flex-wrap gap-4">
          <Link href="/packages/manta-madness" className="bg-sand-gold px-8 py-4 font-body text-[14px] font-semibold text-deep-ocean">
            Manta Madness Package
          </Link>
          <Link href="/packages/dive-hanifaru" className="border border-deep-ocean px-8 py-4 font-body text-[14px] font-medium text-deep-ocean">
            Dive Hanifaru Package
          </Link>
        </div>
      </section>
    </>
  );
}
