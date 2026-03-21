import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Aveyla Manta Village | Maldives",
  description: "Aveyla Manta Village — 16 rooms, 100% solar powered, PADI dive centre on Dharavandhoo Island, Baa Atoll UNESCO Biosphere Reserve since 2014.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/images/about-aerial.jpg)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-ocean/80" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 tablet:px-14">
          <h1 className="font-display text-display-lg font-light tracking-[-0.02em] text-pure-white">About Aveyla</h1>
        </div>
      </section>

      <section className="bg-coral-white px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto max-w-editorial space-y-8">
          <p className="font-body text-body-lg leading-[1.7] text-slate">
            Aveyla Manta Village was established in 2014 on Dharavandhoo Island in the Baa Atoll — the Maldives&apos; only UNESCO Marine Biosphere Reserve. Sixteen rooms in three categories. A PADI dive centre with direct access to Hanifaru Bay. One hundred percent solar electricity.
          </p>
          <p className="font-body text-body-lg leading-[1.7] text-slate">
            We are operated by SEARCH MALDIVES Private Limited (Company Registration C-295/2007, Ministry of Economic Development) under Tourism Licence No. 88-QARS/GH/2015/35, issued by the Ministry of Tourism, Arts &amp; Culture.
          </p>
          <p className="font-body text-body-lg leading-[1.7] text-slate">
            The property is built on the principle that proximity to one of the world&apos;s most significant marine ecosystems demands responsibility. Solar power is not a feature — it is how we operate. Small group dives are not a luxury offering — they are how we protect the reef. Hanifaru Bay is not a marketing asset — it is the reason this place exists, and the reason we take its stewardship seriously.
          </p>

          <div className="mt-12 grid gap-8 tablet:grid-cols-3">
            <div className="text-center">
              <span className="font-display text-display-md font-semibold text-reef-teal">16</span>
              <p className="mt-2 font-body text-body-md text-slate">Rooms</p>
            </div>
            <div className="text-center">
              <span className="font-display text-display-md font-semibold text-reef-teal">100%</span>
              <p className="mt-2 font-body text-body-md text-slate">Solar Powered</p>
            </div>
            <div className="text-center">
              <span className="font-display text-display-md font-semibold text-reef-teal">2014</span>
              <p className="mt-2 font-body text-body-md text-slate">Established</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
