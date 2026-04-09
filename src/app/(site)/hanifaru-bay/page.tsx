import type { Metadata } from "next";
import Link from "next/link";
import { getPageContent } from "@/lib/data/pages";

export const revalidate = 60;

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

export default async function HanifaruBayPage() {
  const c = await getPageContent("hanifaru");
  const heroImage = c.hero?.imagePath || "/images/hanifaru-hero.jpg";
  const title = c.hero?.title || "Hanifaru Bay";
  const introText = c.intro?.body || "Hanifaru Bay sits within the Baa Atoll, a UNESCO World Biosphere Reserve since 2011. It is a shallow, funnel-shaped bay approximately 350 metres long, and it produces what marine biologists describe as the largest known feeding aggregation of manta rays on earth.\n\nBetween June and November, the southwest monsoon drives nutrient-rich currents into the bay. Plankton concentrates in the shallows. And with it come the mantas \u2014 sometimes dozens, sometimes hundreds, spiralling in coordinated feeding chains that have been documented by the BBC, National Geographic, and the Manta Trust.\n\nAveyla Manta Village is the closest accommodation to Hanifaru Bay. A fifteen-minute boat ride from the dive centre jetty. No other property in the Maldives offers this proximity with this level of operational intimacy \u2014 small groups, personal dive guides, and a commitment to the ethical guidelines that protect this site.";
  const introParagraphs = introText.split("\n\n");
  const calendarNote = c.calendar_note?.body || "August\u2013October: highest probability of large manta aggregations.";
  const cta1Label = c.cta1?.title || "Manta Madness Package";
  const cta1Href = c.cta1?.body || "/packages/manta-madness";
  const cta2Label = c.cta2?.title || "Dive Hanifaru Package";
  const cta2Href = c.cta2?.body || "/packages/dive-hanifaru";

  return (
    <>
      {/* Opening image — no text overlay per FSD */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
      </section>

      <section className="bg-linen px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto max-w-editorial space-y-8">
          <h1 className="font-display text-display-md font-semibold tracking-[-0.01em] text-dark-driftwood">
            {title}
          </h1>
          {introParagraphs.map((para, i) => (
            <p key={i} className="font-body text-body-lg leading-[1.7] text-driftwood">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Seasonal calendar */}
      <section className="bg-salt-white px-6 py-16 tablet:px-14">
        <div className="mx-auto max-w-content">
          <h2 className="mb-8 font-display text-heading-xl font-semibold text-dark-driftwood">Seasonal Calendar</h2>
          <div className="grid grid-cols-4 gap-2 tablet:grid-cols-12">
            {MONTHS.map((m) => (
              <div
                key={m.name}
                className={`flex flex-col items-center gap-2 rounded-sm p-4 ${
                  m.peak ? "bg-terracotta text-pure-white" : m.active ? "bg-muted-ocean/20 text-dark-driftwood" : "bg-white text-driftwood"
                }`}
              >
                <span className="font-body text-body-sm font-medium">{m.name}</span>
                {m.peak && <span className="font-body text-[10px]">Peak</span>}
              </div>
            ))}
          </div>
          <p className="mt-4 font-body text-body-sm text-driftwood">
            {calendarNote}
          </p>
        </div>
      </section>

      <section className="bg-linen px-6 py-16 tablet:px-14">
        <div className="mx-auto flex max-w-content flex-wrap gap-4">
          <Link href={cta1Href} className="bg-coral-clay px-8 py-4 font-body text-[14px] font-semibold text-dark-driftwood">
            {cta1Label}
          </Link>
          <Link href={cta2Href} className="border border-dark-driftwood px-8 py-4 font-body text-[14px] font-medium text-dark-driftwood">
            {cta2Label}
          </Link>
        </div>
      </section>
    </>
  );
}
